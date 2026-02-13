'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Script from 'next/script';

export default function GoldSilverPromoPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    consent: false
  });
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [stickyDismissed, setStickyDismissed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling 400px, hide if dismissed
      if (!stickyDismissed) {
        setShowStickyCta(window.scrollY > 400);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [stickyDismissed]);

  const scrollToForm = () => {
    const formElement = document.getElementById('promo-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const dismissSticky = () => {
    setStickyDismissed(true);
    setShowStickyCta(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to ByeTalk CRM
      await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form_id: 'gold-silver-promo',
          form_name: 'Gold & Silver Promo Form',
          ...formData,
        }),
      });
    } catch (error) {
      console.error('Form submission error:', error);
    }

    // Redirect to thank you page regardless of API result
    window.location.href = '/thank-you';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <>
      {/* Citadel Gold Tracking - First Mail Out */}
      <Script id="citadel-tracking" strategy="afterInteractive">
        {`
(function() {
  var tc = 'tc_acbc9fa041ac';
  var base = 'https://www.byetalk.com/api/t/' + tc;
  var engageBase = 'https://www.byetalk.com/api/t/engagement';
  var abandonBase = 'https://www.byetalk.com/api/t/abandonment';

  // Generate visitor ID
  var vid = '';
  try {
    vid = localStorage.getItem('_cg_vid') || '';
    if (!vid) {
      vid = 'v_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
      localStorage.setItem('_cg_vid', vid);
    }
  } catch(e) { vid = 'v_' + Math.random().toString(36).substr(2, 9); }

  // Generate session ID
  var sid = '';
  try {
    sid = sessionStorage.getItem('_cg_sid') || '';
    if (!sid) {
      sid = 's_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
      sessionStorage.setItem('_cg_sid', sid);
    }
  } catch(e) { sid = 's_' + Math.random().toString(36).substr(2, 9); }

  // Get UTM params
  var params = new URLSearchParams(window.location.search);
  var utms = {
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_content: params.get('utm_content') || '',
    utm_term: params.get('utm_term') || ''
  };

  // Send initial pageview
  new Image().src = base + '?' + new URLSearchParams({
    vid: vid, sid: sid,
    url: window.location.href,
    title: document.title || '',
    path: window.location.pathname,
    ref: document.referrer || '',
    sw: String(screen.width || 0),
    sh: String(screen.height || 0),
    vw: String(window.innerWidth || 0),
    vh: String(window.innerHeight || 0),
    ...utms
  }).toString();

  // ========== ENGAGEMENT TRACKING ==========
  var startTime = Date.now();
  var maxScroll = 0;
  var clicks = 0;
  var formInt = 0;
  var fieldsTouched = [];
  var formFields = {};
  var submitted = false;

  // Track scroll depth
  window.addEventListener('scroll', function() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (pct > maxScroll) maxScroll = pct;
  }, {passive: true});

  // Track clicks
  document.addEventListener('click', function() { clicks++; });

  // Calculate engagement score (0-100)
  function calcScore() {
    var time = (Date.now() - startTime) / 1000;
    var timeScore = Math.min(30, (time / 120) * 30);
    var scrollScore = Math.min(25, (maxScroll / 75) * 25);
    var clickScore = Math.min(20, (clicks / 5) * 20);
    var formScore = Math.min(25, (formInt / 4) * 25);
    return Math.round(timeScore + scrollScore + clickScore + formScore);
  }

  // Track form interactions
  document.addEventListener('input', function(e) {
    var t = e.target;
    if (!t.name && !t.id) return;
    var name = t.name || t.id;
    formInt++;
    if (fieldsTouched.indexOf(name) === -1) fieldsTouched.push(name);

    // Capture field value (masked)
    var val = t.value || '';
    if (t.type === 'email' && val.indexOf('@') > -1) {
      var parts = val.split('@');
      val = parts[0].slice(0,2) + '***@' + parts[1];
    } else if (t.type === 'tel' || name.toLowerCase().indexOf('phone') > -1) {
      val = '***' + val.replace(/\\D/g, '').slice(-4);
    }
    if (val) formFields[name] = val;
  });

  // Track form submit
  document.addEventListener('submit', function() { submitted = true; });

  // Send engagement data
  function sendEngagement(final) {
    var score = calcScore();
    var time = Math.round((Date.now() - startTime) / 1000);
    var url = engageBase + '?' + new URLSearchParams({
      tc: tc, vid: vid, sid: sid,
      url: window.location.href,
      path: window.location.pathname,
      event: final ? 'exit' : 'engagement',
      score: String(score),
      time: String(time),
      scroll: String(Math.round(maxScroll)),
      clicks: String(clicks),
      formInt: String(formInt),
      fields: fieldsTouched.join(',')
    }).toString();
    if (final && navigator.sendBeacon) {
      navigator.sendBeacon(url);
    } else {
      new Image().src = url;
    }
  }

  // Send form abandonment
  function sendAbandonment() {
    if (submitted || Object.keys(formFields).length === 0) return;
    var data = JSON.stringify({
      tc: tc, vid: vid, sid: sid,
      url: window.location.href,
      path: window.location.pathname,
      formId: 'form',
      fields: formFields,
      engagementScore: calcScore(),
      timeOnPage: Math.round((Date.now() - startTime) / 1000),
      scrollDepth: Math.round(maxScroll)
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon(abandonBase, data);
    } else {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', abandonBase, false);
      xhr.send(data);
    }
  }

  // Periodic engagement updates (every 15s)
  setInterval(function() { sendEngagement(false); }, 15000);

  // Send on page exit
  window.addEventListener('beforeunload', function() {
    sendEngagement(true);
    sendAbandonment();
  });
  window.addEventListener('pagehide', function() {
    sendEngagement(true);
    sendAbandonment();
  });
})();
        `}
      </Script>

      <div className="promo-page">
        {/* Header */}
        <header className="promo-header">
        <div className="header-logo">
          <Image
            src="/citadel-logo-official.png"
            alt="Citadel Gold"
            width={180}
            height={44}
            className="logo-img"
          />
        </div>
        <div className="header-cta">
          <span className="header-cta-label">GET FREE CONSULTATION</span>
          <a href="tel:8006055597" className="header-phone">1-800-605-5597</a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-form-side">
            <h1 className="hero-title">
              Claim Your <span className="gold-text">Special Welcome Offer!</span>
            </h1>
            <div className="hero-divider" />
            <p className="hero-subtitle">
              Fill out the form and receive this special offer plus a comprehensive investor guide
              where you'll learn how to protect your wealth with precious metals!
            </p>

            <form onSubmit={handleSubmit} className="promo-form" id="promo-form">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="First Name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Last Name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Phone"
                />
              </div>

              <div className="form-checkbox">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                />
                <label htmlFor="consent">
                  I agree to receive calls, texts, and prerecorded messages from Citadel Gold.
                  Consent is not a condition of purchase. <a href="/terms-and-conditions">Terms & Conditions</a>
                </label>
              </div>

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Request Your Guide'}
              </button>
            </form>
          </div>

          <div className="hero-image-side">
            <div className="welcome-badge">
              <span className="badge-title">WELCOME</span>
              <span className="badge-subtitle">OFFER!</span>
              <span className="badge-note">FOR NEW CUSTOMERS ONLY!</span>
            </div>
            {/* Placeholder for gold bar/coin image */}
            <div className="hero-product-image">
              <Image
                src="/liberty-2026.png"
                alt="Gold Liberty Coin"
                width={350}
                height={350}
                className="product-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Bar */}
      <section className="trust-badges-section">
        <p className="trust-intro">Trusted by thousands of investors nationwide</p>
        <div className="trust-badges">
          <div className="trust-badge">
            <div className="badge-icon">A+</div>
            <span>BBB Rating</span>
          </div>
          <div className="trust-badge">
            <div className="badge-icon">★★★★★</div>
            <span>Google Reviews</span>
          </div>
          <div className="trust-badge">
            <div className="badge-icon">🏛</div>
            <span>Delaware Depository</span>
          </div>
          <div className="trust-badge">
            <div className="badge-icon">🔒</div>
            <span>Secure Storage</span>
          </div>
        </div>
      </section>

      {/* Why Precious Metals Section */}
      <section className="why-section">
        <h2>Learn How Buying Gold Can Help Shelter Your Portfolio From Volatility</h2>
        <p>
          Our FREE Gold & Silver Investor's Guide enables you to take the first step towards diversifying your
          financial portfolio, protecting your assets, and preserving the purchasing power of your dollar for
          many years to come. Gold is commonly thought of as a hedge against inflation and should be strongly
          considered to help protect your wealth. Our Gold & Silver Investor's Guide will show you how to
          protect your savings and maximize your potential returns by investing in gold.
        </p>
      </section>

      {/* CTA Bar */}
      <section className="cta-bar">
        <span>GET YOUR INVESTOR'S GUIDE TO PRECIOUS METALS</span>
        <a href="#top" className="cta-btn">Request Your Guide</a>
      </section>

      {/* Special Offers Section */}
      <section className="offers-section">
        <div className="offers-header">
          <p>Experience the <span className="gold-text">Citadel Gold</span> Difference</p>
          <h2>With an Introductory Special Offer</h2>
        </div>

        <div className="offers-grid">
          <div className="offer-card">
            <div className="offer-image">
              {/* Placeholder for silver coin */}
              <Image
                src="/silver-american-eagle.png"
                alt="Silver American Eagle"
                width={200}
                height={200}
                className="offer-img"
              />
            </div>
            <h3>FREE 1oz Silver Coin</h3>
            <p className="offer-condition">*with qualified purchases over $10,000</p>
            <a href="#top" className="offer-btn">Claim My Silver Coin</a>
          </div>

          <div className="offer-divider">
            <span>OR</span>
          </div>

          <div className="offer-card">
            <div className="offer-image">
              {/* Placeholder for gold bars */}
              <Image
                src="/gold-american-eagle.png"
                alt="Gold Bars"
                width={200}
                height={200}
                className="offer-img"
              />
            </div>
            <h3>$5,000 in FREE Gold</h3>
            <p className="offer-condition">*with qualified purchases over $100,000</p>
            <a href="#top" className="offer-btn gold-btn">Claim My Free Gold</a>
          </div>
        </div>
      </section>

      {/* Why Citadel Gold Section */}
      <section className="why-us-section">
        <div className="stars">★ ★ ★ ★ ★</div>
        <h3>Why Citadel Gold</h3>
        <p className="why-tagline">
          We make it easy and straightforward for you to protect your portfolio with precious metals.
          <strong> No Gimmicks. No Celebrity Endorsements.</strong> Just a great selection and honest service at fair prices.
        </p>

        <div className="features-grid">
          <div className="feature">
            <div className="feature-icon">✓</div>
            <span>Trusted Dealer</span>
          </div>
          <div className="feature">
            <div className="feature-icon">↩</div>
            <span>Buyback Guarantee</span>
          </div>
          <div className="feature">
            <div className="feature-icon">🚚</div>
            <span>Secure Shipping</span>
          </div>
          <div className="feature">
            <div className="feature-icon">📋</div>
            <span>IRA Services</span>
          </div>
          <div className="feature">
            <div className="feature-icon">🏦</div>
            <span>Secure Storage</span>
          </div>
          <div className="feature">
            <div className="feature-icon">👤</div>
            <span>White Glove Service</span>
          </div>
        </div>
      </section>

      {/* Depository Section */}
      <section className="depository-section">
        <div className="depository-container">
          <div className="depository-info">
            <h2>ENSURE YOUR INVESTMENT IS SAFE</h2>
            <h3 className="gold-text">WITH FULLY INSURED DEPOSITORY STORAGE</h3>
            <p className="depository-subtitle">SAFEGUARD YOUR METALS AT THE DELAWARE DEPOSITORY</p>

            <p>
              When you make an acquisition through Citadel Gold, we can help arrange to have your precious
              metal coins and bars delivered to your account at the Delaware Depository. The Delaware
              Depository insures all depository account holder contents against loss through Lloyd's of London
              insurance market.
            </p>

            <h4 className="gold-text">THE DELAWARE DEPOSITORY OFFERS PEACE OF MIND</h4>

            <p>
              Your trust is everything. That's why Citadel Gold will help you arrange for storage at the
              Delaware Depository, one of the most respected precious metals depositories in the world.
            </p>

            <p>
              The Delaware Depository guarantees that your precious metals assets are safe. The facility
              uses multiple, overlapping layers of security to ensure proper chain of custody – from the
              time your metals are deposited to the time you withdraw them and they are shipped back to you.
            </p>
          </div>

          <div className="depository-image">
            {/* Placeholder for depository/vault image */}
            <div className="vault-placeholder">
              <span>🏦</span>
              <p>Delaware Depository</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta-bar final-cta">
        <span>GET YOUR INVESTOR'S GUIDE TO PRECIOUS METALS</span>
        <a href="#top" className="cta-btn">Request Your Guide</a>
      </section>

      {/* Sticky CTA Bubble */}
      {showStickyCta && (
        <div className="sticky-cta">
          <button className="sticky-close" onClick={dismissSticky} aria-label="Close">
            ×
          </button>
          <div className="sticky-content">
            <p>
              <a href="tel:8006055597" className="sticky-call-btn">Call</a>
              {' '}or{' '}
              <button onClick={scrollToForm} className="sticky-form-link">fill out the form</button>
              {' '}to get your free precious metals
            </p>
            <span className="sticky-disclaimer">*with qualifying purchases</span>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="promo-footer">
        <div className="footer-disclaimer">
          <p>
            Offers subject to availability. Valid for first-time qualifying purchases only. Limit one per
            household. Not combinable with other offers. Individual retail clients only; dealers not eligible.
            Qualification determined solely by Citadel Gold; non-qualifying orders may be canceled. Precious
            metals involve risk and may fluctuate in value. Citadel Gold representatives are not licensed
            financial advisors. Consult an independent financial professional before investing. All purchases
            are subject to our <a href="/terms-and-conditions">Terms & Conditions</a>.
            Calls and communications may be recorded. © Citadel Gold. All rights reserved.
          </p>
        </div>

        <div className="footer-bottom">
          <div className="footer-badges">
            <span className="bbb-badge">BBB A+ Rating</span>
            <span className="google-badge">Google Reviews ★★★★★</span>
          </div>
          <a href="tel:8006055597" className="footer-phone">1-800-605-5597</a>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .promo-page {
          min-height: 100vh;
          background: #1a1f18;
          font-family: 'Montserrat', sans-serif;
          color: #f5f0e8;
        }

        .gold-text {
          color: #d4af37;
        }

        /* Header */
        .promo-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 60px;
          background: #2a3328;
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
        }

        .logo-img {
          height: 44px;
          width: auto;
        }

        .header-cta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .header-cta-label {
          font-size: 10px;
          letter-spacing: 2px;
          color: #a89f8c;
          margin-bottom: 4px;
        }

        .header-phone {
          font-size: 20px;
          font-weight: 600;
          color: #d4af37;
          text-decoration: none;
        }

        /* Hero Section */
        .hero-section {
          background: linear-gradient(135deg, #2a3328 0%, #1a1f18 100%);
          padding: 60px;
        }

        .hero-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          font-weight: 600;
          line-height: 1.2;
          margin-bottom: 20px;
        }

        .hero-divider {
          width: 80px;
          height: 3px;
          background: #d4af37;
          margin-bottom: 20px;
        }

        .hero-subtitle {
          font-size: 14px;
          line-height: 1.7;
          color: #a89f8c;
          margin-bottom: 30px;
        }

        /* Form */
        .promo-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group label {
          font-size: 12px;
          font-weight: 500;
          color: #a89f8c;
        }

        .form-group input {
          padding: 14px 16px;
          background: #ffffff;
          border: 1px solid #ddd;
          font-size: 14px;
          font-family: 'Montserrat', sans-serif;
          color: #333;
        }

        .form-group input:focus {
          outline: none;
          border-color: #d4af37;
        }

        .form-checkbox {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          margin-top: 8px;
        }

        .form-checkbox input {
          margin-top: 4px;
        }

        .form-checkbox label {
          font-size: 11px;
          color: #6a6358;
          line-height: 1.5;
        }

        .form-checkbox a {
          color: #d4af37;
        }

        .submit-btn {
          padding: 18px 40px;
          background: linear-gradient(135deg, #d4af37, #b8860b);
          border: none;
          color: #1a1f18;
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s;
          margin-top: 8px;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(212, 175, 55, 0.3);
        }

        /* Hero Image Side */
        .hero-image-side {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .welcome-badge {
          position: absolute;
          top: 0;
          right: 20px;
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, #d4af37 60%, #b8860b 100%);
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          box-shadow: 0 0 0 8px rgba(212, 175, 55, 0.3);
          z-index: 10;
        }

        .badge-title {
          font-size: 14px;
          font-weight: 700;
          color: #1a1f18;
        }

        .badge-subtitle {
          font-size: 18px;
          font-weight: 700;
          color: #1a1f18;
        }

        .badge-note {
          font-size: 7px;
          font-weight: 600;
          color: #1a1f18;
          margin-top: 4px;
        }

        .hero-product-image {
          position: relative;
        }

        .product-img {
          max-width: 350px;
          height: auto;
        }

        /* Trust Badges */
        .trust-badges-section {
          background: #232b21;
          padding: 40px 60px;
          text-align: center;
        }

        .trust-intro {
          font-size: 14px;
          color: #a89f8c;
          margin-bottom: 24px;
        }

        .trust-badges {
          display: flex;
          justify-content: center;
          gap: 60px;
          flex-wrap: wrap;
        }

        .trust-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .badge-icon {
          font-size: 24px;
          color: #d4af37;
        }

        .trust-badge span {
          font-size: 11px;
          color: #a89f8c;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* Why Section */
        .why-section {
          background: #f5f0e8;
          padding: 60px;
          text-align: center;
          color: #2a3328;
        }

        .why-section h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 600;
          margin-bottom: 24px;
          color: #1a1f18;
        }

        .why-section p {
          max-width: 900px;
          margin: 0 auto;
          font-size: 14px;
          line-height: 1.8;
          color: #4a4740;
        }

        /* CTA Bar */
        .cta-bar {
          background: #1a1f18;
          padding: 30px 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 40px;
          flex-wrap: wrap;
        }

        .cta-bar span {
          font-size: 14px;
          letter-spacing: 2px;
          color: #a89f8c;
        }

        .cta-btn {
          padding: 14px 32px;
          background: transparent;
          border: 2px solid #d4af37;
          color: #d4af37;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.3s;
        }

        .cta-btn:hover {
          background: #d4af37;
          color: #1a1f18;
        }

        /* Offers Section */
        .offers-section {
          background: #f5f0e8;
          padding: 80px 60px;
          text-align: center;
        }

        .offers-header p {
          font-size: 16px;
          color: #4a4740;
          margin-bottom: 8px;
        }

        .offers-header h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          color: #1a1f18;
          margin-bottom: 50px;
        }

        .offers-grid {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 40px;
          flex-wrap: wrap;
        }

        .offer-card {
          background: #fff;
          padding: 40px;
          border: 1px solid #e0e0e0;
          text-align: center;
          max-width: 320px;
        }

        .offer-image {
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }

        .offer-img {
          max-height: 180px;
          width: auto;
        }

        .offer-card h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          color: #1a1f18;
          margin-bottom: 8px;
        }

        .offer-condition {
          font-size: 12px;
          color: #6a6358;
          margin-bottom: 24px;
        }

        .offer-btn {
          display: inline-block;
          padding: 14px 28px;
          border: 2px solid #2a3328;
          color: #2a3328;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.3s;
        }

        .offer-btn:hover {
          background: #2a3328;
          color: #fff;
        }

        .offer-btn.gold-btn {
          border-color: #d4af37;
          color: #d4af37;
        }

        .offer-btn.gold-btn:hover {
          background: #d4af37;
          color: #1a1f18;
        }

        .offer-divider {
          font-size: 24px;
          font-weight: 300;
          color: #4a4740;
        }

        /* Why Us Section */
        .why-us-section {
          background: #232b21;
          padding: 60px;
          text-align: center;
        }

        .stars {
          color: #d4af37;
          font-size: 24px;
          letter-spacing: 8px;
          margin-bottom: 16px;
        }

        .why-us-section h3 {
          font-size: 14px;
          letter-spacing: 2px;
          color: #a89f8c;
          margin-bottom: 16px;
        }

        .why-tagline {
          font-size: 16px;
          color: #f5f0e8;
          max-width: 700px;
          margin: 0 auto 40px;
          line-height: 1.6;
        }

        .features-grid {
          display: flex;
          justify-content: center;
          gap: 40px;
          flex-wrap: wrap;
        }

        .feature {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          min-width: 100px;
        }

        .feature-icon {
          width: 60px;
          height: 60px;
          border: 2px solid #d4af37;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: #d4af37;
        }

        .feature span {
          font-size: 11px;
          color: #a89f8c;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* Depository Section */
        .depository-section {
          background: #1a1f18;
          padding: 80px 60px;
        }

        .depository-container {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .depository-info h2 {
          font-family: 'Montserrat', sans-serif;
          font-size: 20px;
          font-weight: 600;
          letter-spacing: 2px;
          margin-bottom: 8px;
        }

        .depository-info h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .depository-subtitle {
          font-size: 12px;
          letter-spacing: 2px;
          color: #6a6358;
          margin-bottom: 30px;
        }

        .depository-info p {
          font-size: 14px;
          line-height: 1.8;
          color: #a89f8c;
          margin-bottom: 20px;
        }

        .depository-info h4 {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .vault-placeholder {
          background: #232b21;
          border: 2px solid rgba(212, 175, 55, 0.3);
          padding: 60px;
          text-align: center;
          border-radius: 8px;
        }

        .vault-placeholder span {
          font-size: 80px;
          display: block;
          margin-bottom: 16px;
        }

        .vault-placeholder p {
          font-size: 16px;
          color: #d4af37;
          font-weight: 500;
        }

        /* Footer */
        .promo-footer {
          background: #0f1310;
          padding: 40px 60px;
        }

        .footer-disclaimer {
          max-width: 1000px;
          margin: 0 auto 30px;
        }

        .footer-disclaimer p {
          font-size: 11px;
          line-height: 1.7;
          color: #6a6358;
          text-align: center;
        }

        .footer-disclaimer a {
          color: #d4af37;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 20px;
          border-top: 1px solid rgba(212, 175, 55, 0.1);
        }

        .footer-badges {
          display: flex;
          gap: 24px;
        }

        .bbb-badge, .google-badge {
          font-size: 12px;
          color: #a89f8c;
        }

        .footer-phone {
          font-size: 18px;
          font-weight: 600;
          color: #d4af37;
          text-decoration: none;
        }

        /* Sticky CTA Bubble */
        .sticky-cta {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: linear-gradient(135deg, #2a3328 0%, #1f2620 100%);
          border: 1px solid rgba(212, 175, 55, 0.4);
          border-radius: 16px;
          padding: 20px 24px;
          max-width: 320px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(212, 175, 55, 0.1);
          z-index: 999;
          animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .sticky-close {
          position: absolute;
          top: 8px;
          right: 12px;
          background: transparent;
          border: none;
          color: #6a6358;
          font-size: 20px;
          cursor: pointer;
          padding: 4px 8px;
          line-height: 1;
          transition: color 0.2s;
        }

        .sticky-close:hover {
          color: #d4af37;
        }

        .sticky-content p {
          font-size: 14px;
          line-height: 1.6;
          color: #f5f0e8;
          margin: 0;
          padding-right: 16px;
        }

        .sticky-call-btn {
          display: inline-block;
          background: linear-gradient(135deg, #d4af37, #b8860b);
          color: #1a1f18;
          font-weight: 700;
          font-size: 13px;
          text-decoration: none;
          padding: 6px 14px;
          border-radius: 20px;
          transition: all 0.3s;
        }

        .sticky-call-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(212, 175, 55, 0.4);
        }

        .sticky-form-link {
          background: none;
          border: none;
          color: #d4af37;
          font-size: 14px;
          font-weight: 500;
          font-family: inherit;
          text-decoration: underline;
          text-underline-offset: 3px;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s;
        }

        .sticky-form-link:hover {
          color: #f5f0e8;
        }

        .sticky-disclaimer {
          display: block;
          font-size: 11px;
          color: #6a6358;
          margin-top: 8px;
          font-style: italic;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .hero-image-side {
            order: -1;
          }

          .depository-container {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .promo-header {
            padding: 16px 24px;
            flex-direction: column;
            gap: 16px;
          }

          .header-cta {
            align-items: center;
          }

          .hero-section {
            padding: 40px 24px;
          }

          .hero-title {
            font-size: 28px;
          }

          .welcome-badge {
            width: 100px;
            height: 100px;
            right: 10px;
          }

          .badge-title {
            font-size: 12px;
          }

          .badge-subtitle {
            font-size: 14px;
          }

          .trust-badges-section {
            padding: 30px 24px;
          }

          .trust-badges {
            gap: 30px;
          }

          .why-section,
          .offers-section,
          .why-us-section,
          .depository-section {
            padding: 50px 24px;
          }

          .cta-bar {
            padding: 24px;
            flex-direction: column;
            gap: 20px;
          }

          .cta-bar span {
            font-size: 12px;
            text-align: center;
          }

          .offers-grid {
            flex-direction: column;
          }

          .offer-divider {
            transform: rotate(90deg);
          }

          .features-grid {
            gap: 24px;
          }

          .feature-icon {
            width: 50px;
            height: 50px;
            font-size: 16px;
          }

          .promo-footer {
            padding: 30px 24px;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }

          .footer-badges {
            flex-direction: column;
            gap: 12px;
          }

          .sticky-cta {
            bottom: 16px;
            right: 16px;
            left: 16px;
            max-width: none;
            padding: 16px 20px;
            border-radius: 12px;
          }

          .sticky-content p {
            font-size: 13px;
          }

          .sticky-call-btn {
            font-size: 12px;
            padding: 5px 12px;
          }

          .sticky-form-link {
            font-size: 13px;
          }

          .sticky-disclaimer {
            font-size: 10px;
          }
        }
      `}</style>
    </div>
    </>
  );
}
