'use client';

import { useEffect, useRef, useCallback } from 'react';

interface EngagementData {
  timeOnPage: number;
  maxScrollDepth: number;
  clickCount: number;
  engagementScore: number;
  formInteractions: number;
  formFieldsFilled: string[];
}

interface FormAbandonmentData {
  formId: string;
  fields: Record<string, string>;
  engagementScore: number;
  timeOnPage: number;
  scrollDepth: number;
}

const TRACKING_ENDPOINT = 'https://www.byetalk.com/api/t/engagement';
const ABANDONMENT_ENDPOINT = 'https://www.byetalk.com/api/t/abandonment';

export function EngagementTracker({
  trackingCode,
  formSelector = '#promo-form, .promo-form, form'
}: {
  trackingCode: string;
  formSelector?: string;
}) {
  const startTime = useRef(Date.now());
  const maxScroll = useRef(0);
  const clicks = useRef(0);
  const formInteractions = useRef(0);
  const formFields = useRef<Record<string, string>>({});
  const fieldsTouched = useRef<Set<string>>(new Set());
  const hasSubmitted = useRef(false);
  const lastSentScore = useRef(0);

  // Get or create visitor/session IDs
  const getIds = useCallback(() => {
    let vid = '';
    let sid = '';
    try {
      vid = localStorage.getItem('_cg_vid') || '';
      if (!vid) {
        vid = 'v_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
        localStorage.setItem('_cg_vid', vid);
      }
    } catch {
      vid = 'v_' + Math.random().toString(36).substr(2, 9);
    }
    try {
      sid = sessionStorage.getItem('_cg_sid') || '';
      if (!sid) {
        sid = 's_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
        sessionStorage.setItem('_cg_sid', sid);
      }
    } catch {
      sid = 's_' + Math.random().toString(36).substr(2, 9);
    }
    return { vid, sid };
  }, []);

  // Calculate engagement score (0-100)
  const calculateScore = useCallback(() => {
    const timeOnPage = (Date.now() - startTime.current) / 1000; // seconds
    const scrollDepth = maxScroll.current;
    const clickCount = clicks.current;
    const formInts = formInteractions.current;

    // Scoring weights
    // Time: up to 30 points (max at 120 seconds)
    const timeScore = Math.min(30, (timeOnPage / 120) * 30);

    // Scroll: up to 25 points (max at 75% scroll)
    const scrollScore = Math.min(25, (scrollDepth / 75) * 25);

    // Clicks: up to 20 points (max at 5 clicks)
    const clickScore = Math.min(20, (clickCount / 5) * 20);

    // Form interactions: up to 25 points (max at 4 fields touched)
    const formScore = Math.min(25, (formInts / 4) * 25);

    return Math.round(timeScore + scrollScore + clickScore + formScore);
  }, []);

  // Send engagement data
  const sendEngagement = useCallback((final = false) => {
    const score = calculateScore();

    // Only send if score changed significantly or it's final
    if (!final && Math.abs(score - lastSentScore.current) < 10) return;
    lastSentScore.current = score;

    const { vid, sid } = getIds();
    const timeOnPage = Math.round((Date.now() - startTime.current) / 1000);

    const data: EngagementData = {
      timeOnPage,
      maxScrollDepth: Math.round(maxScroll.current),
      clickCount: clicks.current,
      engagementScore: score,
      formInteractions: formInteractions.current,
      formFieldsFilled: Array.from(fieldsTouched.current),
    };

    const params = new URLSearchParams({
      tc: trackingCode,
      vid,
      sid,
      url: window.location.href,
      path: window.location.pathname,
      event: final ? 'exit' : 'engagement',
      score: String(score),
      time: String(timeOnPage),
      scroll: String(Math.round(maxScroll.current)),
      clicks: String(clicks.current),
      formInt: String(formInteractions.current),
      fields: Array.from(fieldsTouched.current).join(','),
    });

    // Use sendBeacon for reliability on page exit
    if (final && navigator.sendBeacon) {
      navigator.sendBeacon(`${TRACKING_ENDPOINT}?${params.toString()}`);
    } else {
      new Image().src = `${TRACKING_ENDPOINT}?${params.toString()}`;
    }

    return data;
  }, [trackingCode, calculateScore, getIds]);

  // Send form abandonment data
  const sendAbandonment = useCallback(() => {
    if (hasSubmitted.current) return;
    if (Object.keys(formFields.current).length === 0) return;

    const { vid, sid } = getIds();
    const score = calculateScore();
    const timeOnPage = Math.round((Date.now() - startTime.current) / 1000);

    const abandonmentData: FormAbandonmentData = {
      formId: 'promo-form',
      fields: { ...formFields.current },
      engagementScore: score,
      timeOnPage,
      scrollDepth: Math.round(maxScroll.current),
    };

    // Send to abandonment endpoint
    const payload = JSON.stringify({
      tc: trackingCode,
      vid,
      sid,
      url: window.location.href,
      path: window.location.pathname,
      ...abandonmentData,
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon(ABANDONMENT_ENDPOINT, payload);
    } else {
      fetch(ABANDONMENT_ENDPOINT, {
        method: 'POST',
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  }, [trackingCode, calculateScore, getIds]);

  useEffect(() => {
    // Track scroll depth
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      maxScroll.current = Math.max(maxScroll.current, scrollPercent);
    };

    // Track clicks
    const handleClick = () => {
      clicks.current++;
    };

    // Track form field interactions
    const handleFormInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (!target.name && !target.id) return;

      const fieldName = target.name || target.id;
      formInteractions.current++;
      fieldsTouched.current.add(fieldName);

      // Capture field value (mask sensitive data)
      let value = target.value;
      if (target.type === 'email' && value.includes('@')) {
        // Partially mask email: jo***@gmail.com
        const [local, domain] = value.split('@');
        value = local.slice(0, 2) + '***@' + domain;
      } else if (target.type === 'tel' || fieldName.toLowerCase().includes('phone')) {
        // Mask phone: keep last 4 digits
        value = '***' + value.replace(/\D/g, '').slice(-4);
      } else if (fieldName.toLowerCase().includes('name')) {
        // Keep names for personalization
        value = value.trim();
      }

      if (value) {
        formFields.current[fieldName] = value;
      }
    };

    // Track form submission
    const handleSubmit = () => {
      hasSubmitted.current = true;
    };

    // Setup form tracking
    const setupFormTracking = () => {
      const forms = document.querySelectorAll(formSelector);
      forms.forEach(form => {
        form.addEventListener('input', handleFormInput);
        form.addEventListener('submit', handleSubmit);
      });
    };

    // Send periodic engagement updates
    const intervalId = setInterval(() => {
      sendEngagement(false);
    }, 15000); // Every 15 seconds

    // Handle page exit
    const handleExit = () => {
      sendEngagement(true);
      sendAbandonment();
    };

    // Setup listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleClick);
    window.addEventListener('beforeunload', handleExit);
    window.addEventListener('pagehide', handleExit);

    // Setup form tracking after DOM is ready
    if (document.readyState === 'complete') {
      setupFormTracking();
    } else {
      window.addEventListener('load', setupFormTracking);
    }

    // Initial scroll check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
      window.removeEventListener('beforeunload', handleExit);
      window.removeEventListener('pagehide', handleExit);
      window.removeEventListener('load', setupFormTracking);
      clearInterval(intervalId);

      const forms = document.querySelectorAll(formSelector);
      forms.forEach(form => {
        form.removeEventListener('input', handleFormInput);
        form.removeEventListener('submit', handleSubmit);
      });
    };
  }, [formSelector, sendEngagement, sendAbandonment]);

  return null; // This is a tracking component, no UI
}
