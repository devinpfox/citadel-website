'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Gem, RefreshCw, Landmark, Compass } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface MetalPriceData {
  price: number;
  change: number;
  changePercent: number;
  history: number[];
}

interface MetalPrices {
  gold: MetalPriceData;
  silver: MetalPriceData;
  platinum: MetalPriceData;
  palladium: MetalPriceData;
}

const CitadelGoldRedesignV2 = () => {
  const [activeTab, setActiveTab] = useState('gold');
  const [metalPrices, setMetalPrices] = useState<MetalPrices | null>(null);
  const [coinsFront, setCoinsFront] = useState<'gold' | 'silver'>('gold');

  // Calculator state
  const [calcAmount, setCalcAmount] = useState('10000');
  const [calcYears, setCalcYears] = useState(10);
  const [calcAsset, setCalcAsset] = useState<'stocks' | 'bonds' | 'savings' | 'cds'>('stocks');
  const [goldData, setGoldData] = useState<{ cagr: number; loading: boolean }>({ cagr: 0.165, loading: true });
  const [showCalcPopup, setShowCalcPopup] = useState(false);

  // Consultation modal state
  const [showConsultationModal, setShowConsultationModal] = useState(false);

  // Video playback state
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showVideoControls, setShowVideoControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [consultationForm, setConsultationForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    goals: '',
    metalInterest: '',
  });

  // Guide form state
  const [guideForm, setGuideForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    marketingConsent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Current market prices - January 2026 with 30-day history
    setMetalPrices({
      gold: {
        price: 5080.00, change: 52.00, changePercent: 1.03,
        history: [4890, 4920, 4905, 4935, 4960, 4940, 4975, 4990, 4965, 4980, 5010, 5025, 4995, 5005, 5030, 5050, 5020, 5035, 5060, 5045, 5055, 5070, 5040, 5058, 5065, 5048, 5072, 5060, 5075, 5080]
      },
      silver: {
        price: 111.71, change: 2.17, changePercent: 1.98,
        history: [105.20, 106.10, 105.50, 106.80, 107.40, 106.90, 107.80, 108.50, 107.60, 108.20, 109.00, 108.40, 107.90, 108.80, 109.50, 110.20, 109.30, 109.80, 110.60, 109.90, 110.30, 111.00, 110.10, 110.50, 111.20, 110.80, 111.40, 111.10, 111.50, 111.71]
      },
      platinum: {
        price: 1285.00, change: 15.40, changePercent: 1.21,
        history: [1240, 1248, 1235, 1252, 1260, 1245, 1258, 1270, 1255, 1262, 1275, 1268, 1250, 1265, 1278, 1272, 1258, 1270, 1282, 1276, 1265, 1280, 1290, 1275, 1283, 1270, 1278, 1288, 1280, 1285]
      },
      palladium: {
        price: 1156.00, change: -8.30, changePercent: -0.71,
        history: [1210, 1205, 1215, 1198, 1208, 1195, 1200, 1188, 1195, 1182, 1190, 1178, 1185, 1172, 1180, 1175, 1168, 1178, 1170, 1165, 1175, 1168, 1160, 1172, 1165, 1158, 1168, 1162, 1160, 1156]
      }
    });
  }, []);

  // Auto-swap coins every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCoinsFront(prev => prev === 'gold' ? 'silver' : 'gold');
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Show calculator popup after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      // Only show if user hasn't already dismissed or interacted
      const dismissed = sessionStorage.getItem('calcPopupDismissed');
      if (!dismissed) {
        setShowCalcPopup(true);
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleCalcPopupYes = () => {
    setShowCalcPopup(false);
    sessionStorage.setItem('calcPopupDismissed', 'true');
    // Scroll to calculator
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCalcPopupNo = () => {
    setShowCalcPopup(false);
    sessionStorage.setItem('calcPopupDismissed', 'true');
  };

  // Fetch real gold data from Metals API
  useEffect(() => {
    const fetchGoldData = async () => {
      setGoldData(prev => ({ ...prev, loading: true }));
      try {
        const response = await fetch(`/api/metals/historical?years=${calcYears}`);
        const data = await response.json();
        if (data.success && data.gold?.cagr) {
          setGoldData({ cagr: data.gold.cagr / 100, loading: false });
        } else {
          // Fallback to historical averages if API fails
          const fallbackRates: Record<number, number> = {
            5: 0.22, 10: 0.165, 15: 0.088, 20: 0.117, 30: 0.089
          };
          setGoldData({ cagr: fallbackRates[calcYears] || 0.10, loading: false });
        }
      } catch {
        // Fallback to historical averages
        const fallbackRates: Record<number, number> = {
          5: 0.22, 10: 0.165, 15: 0.088, 20: 0.117, 30: 0.089
        };
        setGoldData({ cagr: fallbackRates[calcYears] || 0.10, loading: false });
      }
    };
    fetchGoldData();
  }, [calcYears]);

  // Historical returns for other assets (S&P 500 via Yahoo Finance historical data)
  // S&P 500: ~3,800 (2021), ~1,940 (2016), ~1,280 (2011), ~1,280 (2006), ~740 (1996) → ~6,000 (2026)
  const otherAssetReturns: Record<number, Record<string, number>> = {
    5: { stocks: 0.095, bonds: 0.02, savings: 0.04, cds: 0.045 },
    10: { stocks: 0.12, bonds: 0.025, savings: 0.02, cds: 0.022 },
    15: { stocks: 0.108, bonds: 0.03, savings: 0.015, cds: 0.018 },
    20: { stocks: 0.08, bonds: 0.035, savings: 0.02, cds: 0.025 },
    30: { stocks: 0.072, bonds: 0.04, savings: 0.025, cds: 0.03 },
  };

  const assetLabels: Record<string, string> = {
    stocks: 'S&P 500',
    bonds: '10-Year Treasury',
    savings: 'Savings Account',
    cds: 'CDs',
    gold: 'Gold',
  };

  const calculateReturns = (amount: number, years: number, asset: string) => {
    const rates = otherAssetReturns[years] || otherAssetReturns[10];
    const assetRate = rates[asset] || 0.05;
    // Use real gold CAGR from API
    const goldRate = goldData.cagr;

    return {
      original: amount * Math.pow(1 + assetRate, years),
      gold: amount * Math.pow(1 + goldRate, years),
      assetRate: assetRate * 100,
      goldRate: goldRate * 100,
    };
  };

  const parsedAmount = parseFloat(calcAmount.replace(/,/g, '')) || 0;
  const calcResults = calculateReturns(parsedAmount, calcYears, calcAsset);
  const goldAdvantage = calcResults.gold - calcResults.original;

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
  };

  const handleCalcAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const formatted = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setCalcAmount(formatted);
  };

  // Consultation form handlers
  const handleConsultationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setConsultationForm(prev => ({ ...prev, [name]: value }));
  };

  const handleConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'consultation',
          ...consultationForm,
        }),
      });

      if (response.ok) {
        window.location.href = '/thank-you';
      } else {
        alert('There was an error submitting the form. Please try again or call us at 800-605-5597.');
      }
    } catch {
      alert('There was an error submitting the form. Please try again or call us at 800-605-5597.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Guide form handlers
  const handleGuideChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setGuideForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleGuideSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'guide',
          ...guideForm,
        }),
      });

      if (response.ok) {
        window.location.href = '/thank-you';
      } else {
        alert('There was an error submitting the form. Please try again or call us at 800-605-5597.');
      }
    } catch {
      alert('There was an error submitting the form. Please try again or call us at 800-605-5597.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle video play from overlay
  const handleVideoPlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setShowVideoControls(true);
    }
  };

  // Scroll to free guide section
  const scrollToGuide = () => {
    document.getElementById('free-guide')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="citadel-root">
      <Header />

      {/* Hero Section - DARK */}
      <section className="hero green-bg-overlay">
        <div className="hero-bg" />

        <div className="hero-content">
          <p className="hero-tagline">A Refined Approach to Precious Metals</p>

          <h1 className="hero-title">
            <span>Preserve Your</span>
            <span className="hero-title-gold">Legacy with Gold</span>
          </h1>

          <p className="hero-subtitle">
          Built to Last. Wealth Preserved. Legacy Secured.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => setShowConsultationModal(true)}>Request a Private Consultation</button>
            <a href="tel:8006055597" className="btn-secondary">Chat with a Precious Metals Specialist</a>
          </div>

        </div>
      </section>

      {/* Video About Section */}
      <section className="video-about">
        <div className="video-about-grid">
          <div className="video-about-player">
            <video
              ref={videoRef}
              controls={showVideoControls}
              poster="/citadel-video-lead-in.jpg"
              className="video-element"
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
              onEnded={() => setIsVideoPlaying(false)}
            >
              <source src="https://wp.citadelgold.com/wp-content/uploads/2026/02/CITADEL-GOLD-VIDEO.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div
              className={`video-play-overlay ${isVideoPlaying ? 'hidden' : ''}`}
              onClick={handleVideoPlay}
            >
              <div className="video-play-button">
                <svg viewBox="0 0 24 24" fill="currentColor" className="play-icon">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="video-about-content">
            <h2 className="video-about-title">ABOUT US</h2>
            <div className="video-about-divider"></div>
            <p className="video-about-text">
              With over a decade of experience, Citadel Gold has helped thousands of Americans protect their savings through physical gold and silver. Our team is made up of industry veterans, knowledgeable financial educators, and real people who genuinely care about your financial future.
            </p>
            <p className="video-about-text">
              At Citadel Gold, we don't just sell metals—we build long-term relationships rooted in trust, integrity, and transparency.
            </p>
            <button className="video-about-btn">Learn More</button>
          </div>
        </div>
      </section>

      {/* About Section - LIGHT */}
      <section className="about">
        <div className="about-grid">
          <div className="about-content">
            <p className="section-label">About Citadel Gold</p>

            <h2 className="about-title">
              A Heritage of <br />
              <span className="text-gold-italic">Trust & Excellence</span>
            </h2>

            <p className="about-text">
              For over two decades, Citadel Gold has served as a trusted steward for investors
              who value stability, discretion, and the enduring protection of tangible assets.
            </p>

            <div className="about-features">
              {[
                { title: 'IRS-Approved Custody', desc: 'Fully compliant depositories' },
                { title: 'Insured Storage', desc: 'Delaware Depository vault' },
                { title: 'Personalized Guidance', desc: 'Dedicated account specialists' },
                { title: 'Transparent Pricing', desc: 'Clear, straightforward fees' }
              ].map((item, i) => (
                <div key={i} className="about-feature">
                  <span className="about-feature-icon">◆</span>
                  <h4 className="about-feature-title">{item.title}</h4>
                  <p className="about-feature-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="about-visual">
            <div className={`about-visual-bg ${coinsFront === 'silver' ? 'coins-front' : 'coins-back'}`}>
              <Image
                src="/silver-coins.png"
                alt="Silver Coins"
                width={400}
                height={300}
                className="silver-coins-img"
              />
              <p className="silver-coins-tagline">Stability you can hold. Strength you can trust.</p>
            </div>
            <div className={`about-visual-card ${coinsFront === 'gold' ? 'coins-front' : 'coins-back'}`}>
              <div className="about-visual-content">
                <Image
                  src="/gold-coins.png"
                  alt="Gold Coins"
                  width={400}
                  height={300}
                  className="gold-coins-img"
                />
                <p className="about-visual-caption">Elevate your portfolio with the stability of gold and silver.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Retirement Section - LIGHT */}
      <section className="retirement">
        <div className="retirement-grid">
          <div className="retirement-text">
            <h2 className="retirement-title">
              Protect Your Retirement. <br />
              <span className="text-gold-italic">Enjoy the Life You Earned.</span>
            </h2>
            <p className="retirement-desc">
              You&apos;ve worked a lifetime to build your future. Now it&apos;s time to protect it. At Citadel Gold, we help safeguard your wealth with tangible assets designed to bring stability, confidence, and peace of mind — so you can focus on living well, not worrying about what&apos;s next.
            </p>
            <button className="btn-primary" onClick={scrollToGuide}>Secure My Retirement</button>
          </div>
          <div className="retirement-image">
            <Image
              src="/elderly-couple.jpg"
              alt="Happy retired couple enjoying life"
              width={600}
              height={500}
              className="retirement-img"
            />
          </div>
        </div>
      </section>

      {/* Commitment - DARK */}
      <section className="commitment green-bg-overlay">
        <div className="commitment-container">
          <p className="section-label">A Standard of Integrity</p>

          <h2 className="commitment-title">
            Our Commitment to <span className="text-gold-italic">Excellence</span>
          </h2>

          <div className="commitment-content">
            <p className="commitment-text">
              At Citadel Gold, excellence isn&apos;t aspirational — it&apos;s operational. We are dedicated to providing high-quality products, from coins to bars, that meet the highest standards of purity, authenticity, and value. Our commitment extends to transparency in pricing, so there are no hidden fees and no surprises.
            </p>
            <p className="commitment-text">
              We build long-term relationships rooted in trust, integrity, and a client-first philosophy. Every interaction — from your first consultation to ongoing portfolio guidance — is handled with the care and discretion you deserve. Your goals become our goals, and your confidence is our measure of success.
            </p>
            <p className="commitment-tagline">
              Every interaction reflects our commitment to earning — and keeping — your trust.
            </p>
          </div>
        </div>
      </section>

      {/* Guide - LIGHT BG with green container */}
      <section className="guide guide-light-bg" id="free-guide">
        <div className="guide-container green-bg-overlay">
          <Image
            src="/precious-metals-guide.png"
            alt="Free Investment Guide - Precious Metals Investing"
            width={280}
            height={360}
            className="guide-book-img"
          />

          <div className="guide-text">
            <p className="section-label">Your First Step</p>
            <h2 className="guide-title">
              Get Your Free <span className="text-gold-italic">Precious Metals Guide</span>
            </h2>
            <p className="guide-desc">
              Whether you&apos;re exploring gold for the first time or looking to expand an existing portfolio, this complimentary guide covers everything you need to know — from IRA structures and tax advantages to choosing the right metals for your goals.
            </p>
            <p className="guide-desc guide-desc-highlight">
              Join thousands of informed investors who started their journey with this guide.
            </p>
            <form className="guide-form" onSubmit={handleGuideSubmit}>
              <div className="guide-form-row">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="guide-input"
                  value={guideForm.firstName}
                  onChange={handleGuideChange}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="guide-input"
                  value={guideForm.lastName}
                  onChange={handleGuideChange}
                  required
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="guide-input guide-input-full"
                value={guideForm.email}
                onChange={handleGuideChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone (Optional)"
                className="guide-input guide-input-full"
                value={guideForm.phone}
                onChange={handleGuideChange}
              />
              <label className="guide-checkbox">
                <input
                  type="checkbox"
                  name="marketingConsent"
                  checked={guideForm.marketingConsent}
                  onChange={handleGuideChange}
                />
                <span>I agree to receive marketing communications from Citadel Gold</span>
              </label>
              <button type="submit" className="btn-primary guide-cta-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Download My Free Guide'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Why Choose Section - LIGHT CREAM */}
      <section className="why-choose">
        <p className="section-label-dark">The Citadel Difference</p>

        <h2 className="why-choose-title">
          Why Discerning Investors <span className="text-gold-italic-dark">Choose Us</span>
        </h2>

        <div className="why-choose-grid">
          <div className="why-choose-card">
            <div className="why-choose-icon">
              <Gem size={44} strokeWidth={1.25} color="#b8860b" />
            </div>
            <h3 className="why-choose-card-title">Clear, Transparent Pricing</h3>
            <p className="why-choose-card-desc">Every transaction is quoted with full visibility — no hidden fees, no ambiguity. You see exactly what you pay and what you own.</p>
          </div>

          <div className="why-choose-card">
            <div className="why-choose-icon">
              <RefreshCw size={44} strokeWidth={1.25} color="#b8860b" />
            </div>
            <h3 className="why-choose-card-title">Guaranteed Liquidity</h3>
            <p className="why-choose-card-desc">When the time comes to sell, Citadel Gold offers a straightforward buyback program — ensuring your metals remain a liquid, accessible asset.</p>
          </div>

          <div className="why-choose-card">
            <div className="why-choose-icon">
              <Landmark size={44} strokeWidth={1.25} color="#b8860b" />
            </div>
            <h3 className="why-choose-card-title">Institutional-Grade Pricing</h3>
            <p className="why-choose-card-desc">Our long-standing relationships with leading mints and refineries allow us to offer pricing typically reserved for institutional buyers.</p>
          </div>

          <div className="why-choose-card">
            <div className="why-choose-icon">
              <Compass size={44} strokeWidth={1.25} color="#b8860b" />
            </div>
            <h3 className="why-choose-card-title">Dedicated White-Glove Service</h3>
            <p className="why-choose-card-desc">Every client is paired with a personal advisor who provides guidance from first conversation through long-term portfolio management.</p>
          </div>
        </div>
      </section>

      {/* Featured Products - DARK */}
      <section className="products green-bg-overlay">
        <div className="products-header">
          <p className="section-label">IRA-Eligible Metals</p>

          <h2 className="products-title">
            Select Offerings for <span className="text-gold-italic">Retirement Portfolios</span>
          </h2>
        </div>

        <div className="products-grid">
          {[
            { name: 'Gold American Eagle', type: '1 oz Pure Gold', metal: 'gold', premium: 85, image: '/gold-american-eagle.png' },
            { name: 'Silver American Eagle', type: '1 oz Pure Silver', metal: 'silver', premium: 4, image: '/silver-american-eagle.png' },
            { name: 'Gold Canadian Maple', type: '1 oz Pure Gold', metal: 'gold', premium: 65, image: '/gold-canadian-maple.png' },
            { name: 'Silver Canadian Maple', type: '1 oz Pure Silver', metal: 'silver', premium: 3.50, image: '/silver-canadian-maple.png' }
          ].map((product, i) => {
            const spotPrice = metalPrices ? metalPrices[product.metal as keyof MetalPrices].price : 0;
            const totalPrice = spotPrice + product.premium;
            return (
              <div key={i} className="product-card">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={120}
                  height={120}
                  className="product-coin-img"
                />
                <h3 className="product-name">{product.name}</h3>
                <p className="product-type">{product.type}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Own Precious Metals Directly - LIGHT */}
      <section className="direct-ownership">
        <div className="direct-ownership-container">
          <p className="section-label-dark">Own Precious Metals Directly</p>

          <h2 className="direct-ownership-title">
            Beyond Retirement Accounts — <span className="text-gold-italic-dark">Personal Ownership, Fully Allocated</span>
          </h2>

          <div className="direct-ownership-content">
            <p className="direct-ownership-text">
              Not every investment belongs inside a retirement account. For clients seeking direct control over their holdings, Citadel Gold offers fully allocated gold and silver available for secure home delivery or private vault storage.
            </p>
            <p className="direct-ownership-text">
              Whether diversifying outside of traditional markets or establishing a tangible reserve, direct ownership provides complete autonomy — with no custodians, no intermediaries, and no restrictions.
            </p>
            <p className="direct-ownership-tagline">
              Your metals. Your possession. Your terms.
            </p>
          </div>

          <div className="direct-ownership-cta">
            <a href="tel:8006055597" className="private-client-line">Private Client Line: 800-605-5597</a>
          </div>
        </div>
      </section>

      {/* Live Pricing - WARM LIGHT */}
      <section className="pricing">
        <div className="pricing-grid">
          <div className="pricing-text">
            <p className="section-label-dark">Real-Time Market Visibility</p>

            <h2 className="pricing-title">
              Current Precious <br /><span className="text-gold-italic-dark">Metal Prices</span>
            </h2>

            <p className="pricing-desc">
              Precious metals markets move continuously — and informed timing can meaningfully impact long-term value. Citadel Gold provides clients with access to live spot pricing and market insights, allowing you to monitor conditions alongside your advisor.
            </p>
            <p className="pricing-desc pricing-desc-tagline">
              Transparency isn't a feature. It's how we operate.
            </p>
          </div>

          <div className="pricing-card">
            <div className="pricing-tabs">
              {['gold', 'silver', 'platinum'].map((metal) => (
                <button
                  key={metal}
                  onClick={() => setActiveTab(metal)}
                  className={`pricing-tab ${activeTab === metal ? 'active' : ''}`}
                >{metal}</button>
              ))}
            </div>

            <div className="pricing-display">
              <div>
                <p className="pricing-label">SPOT PRICE</p>
                {metalPrices && (
                  <p className="pricing-value">
                    ${Math.floor(metalPrices[activeTab as keyof MetalPrices].price).toLocaleString()}
                    <span>.{(metalPrices[activeTab as keyof MetalPrices].price % 1).toFixed(2).slice(2)}</span>
                  </p>
                )}
              </div>
              {metalPrices && (
                <div className={`pricing-change ${metalPrices[activeTab as keyof MetalPrices].change >= 0 ? 'positive' : 'negative'}`}>
                  <span>
                    {metalPrices[activeTab as keyof MetalPrices].change >= 0 ? '▲' : '▼'} {metalPrices[activeTab as keyof MetalPrices].change >= 0 ? '+' : ''}{metalPrices[activeTab as keyof MetalPrices].changePercent.toFixed(2)}%
                  </span>
                </div>
              )}
            </div>

            <div className="pricing-chart">
              {metalPrices && (() => {
                const data = metalPrices[activeTab as keyof MetalPrices].history;
                const min = Math.min(...data);
                const max = Math.max(...data);
                const range = max - min || 1;
                const w = 600;
                const h = 90;
                const pad = 5;
                const points = data.map((v, i) => ({
                  x: (i / (data.length - 1)) * w,
                  y: pad + (1 - (v - min) / range) * (h - pad * 2)
                }));
                const line = points.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(' ');
                const fill = `${line} L${w},${h} L0,${h} Z`;
                const changePositive = metalPrices[activeTab as keyof MetalPrices].change >= 0;
                const strokeColor = changePositive ? '#b8860b' : '#a05050';
                const fillColor = changePositive ? 'rgba(184, 134, 11, 0.12)' : 'rgba(160, 80, 80, 0.12)';
                return (
                  <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
                    <defs>
                      <linearGradient id={`chartGrad-${activeTab}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={fillColor} />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                    <path d={fill} fill={`url(#chartGrad-${activeTab})`} />
                    <path d={line} fill="none" stroke={strokeColor} strokeWidth="2" vectorEffect="non-scaling-stroke" />
                  </svg>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* 3 Steps Section - DARK */}
      <section className="steps green-bg-overlay">
        <div className="steps-header">
          <p className="section-label">A Guided Process</p>

          <h2 className="steps-title">
            How We Work <span className="text-gold-italic">With You</span>
          </h2>
        </div>

        <div className="steps-grid">
          {[
            { num: '01', title: 'Private Consultation', desc: 'Begin with a confidential conversation. Your advisor will take time to understand your financial objectives, timeline, and preferences — with no obligation.' },
            { num: '02', title: 'Selection & Price Lock', desc: 'Together, we identify the metals best suited to your goals. Once you approve, pricing is locked in — protecting you from market fluctuation during the transaction.' },
            { num: '03', title: 'Secure Delivery or Storage', desc: 'Your fully insured metals are shipped directly to your door or transferred to a private depository — whichever you prefer. Every step is tracked, verified, and documented.' }
          ].map((step, i) => (
            <div key={i} className="step-card">
              <div className="step-number">
                <span>{step.num}</span>
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Invest in Gold & Silver - LIGHT */}
      <section className="why-invest">
        <div className="why-invest-container">
          <p className="section-label-dark">The Case for Precious Metals</p>

          <h2 className="why-invest-title">
            Why Invest in <span className="text-gold-italic-dark">Gold &amp; Silver?</span>
          </h2>

          <p className="why-invest-intro">
            Gold and silver have been valued for centuries due to their ability to hold value. Here&apos;s why they remain a cornerstone of sound financial strategy.
          </p>

          <div className="why-invest-grid">
            {[
              {
                title: 'Hedge Against Inflation',
                desc: 'When the cost of living rises, the value of paper currency declines. Gold has historically preserved purchasing power during inflationary periods, helping investors maintain the real value of their wealth over time.'
              },
              {
                title: 'Portfolio Diversification',
                desc: 'Precious metals move independently of stocks and bonds. Adding gold and silver to your portfolio reduces overall risk and provides a stabilizing counterweight when traditional markets decline.'
              },
              {
                title: 'Protection from Volatility',
                desc: 'When the market fluctuates, gold and silver often maintain or even increase in value. Physical assets provide a tangible layer of stability that paper investments simply cannot match.'
              },
              {
                title: 'Long-Term Store of Value',
                desc: 'Gold has maintained its value for thousands of years, outlasting every fiat currency in history. Strong demand, limited supply, and intrinsic worth make it one of the most reliable long-term stores of value available.'
              }
            ].map((item, i) => (
              <div key={i} className="why-invest-card">
                <h3 className="why-invest-card-title">{item.title}</h3>
                <p className="why-invest-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="why-invest-tagline">
            Smart investors don&apos;t just grow wealth — they protect it.
          </p>
        </div>
      </section>

      {/* Investment Calculator Section - DARK */}
      <section id="calculator" className="calculator green-bg-overlay">
        <div className="calculator-container">
          <p className="section-label">Investment Comparison</p>

          <h2 className="calculator-title">
            What If You Had <span className="text-gold-italic">Invested in Gold?</span>
          </h2>

          <p className="calculator-subtitle">
            Compare what your investment would be worth today if you had chosen gold instead.
          </p>

          <div className="calculator-grid">
            <div className="calculator-inputs">
              <div className="calc-input-group">
                <label className="calc-label">Investment Amount</label>
                <div className="calc-input-wrapper">
                  <span className="calc-currency">$</span>
                  <input
                    type="text"
                    value={calcAmount}
                    onChange={handleCalcAmountChange}
                    className="calc-input"
                    placeholder="10,000"
                  />
                </div>
              </div>

              <div className="calc-input-group">
                <label className="calc-label">What I Invested In</label>
                <div className="calc-asset-buttons">
                  {(['stocks', 'bonds', 'savings', 'cds'] as const).map((asset) => (
                    <button
                      key={asset}
                      onClick={() => setCalcAsset(asset)}
                      className={`calc-asset-btn ${calcAsset === asset ? 'active' : ''}`}
                    >
                      {assetLabels[asset]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="calc-input-group">
                <label className="calc-label">Years Ago</label>
                <div className="calc-years-buttons">
                  {[5, 10, 15, 20, 30].map((year) => (
                    <button
                      key={year}
                      onClick={() => setCalcYears(year)}
                      className={`calc-year-btn ${calcYears === year ? 'active' : ''}`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="calculator-results-comparison">
              <div className="calc-comparison-card original">
                <p className="calc-comparison-label">Your {assetLabels[calcAsset]}</p>
                <p className="calc-comparison-rate">{calcResults.assetRate.toFixed(1)}% avg annual return</p>
                <p className="calc-comparison-value">{formatCurrency(calcResults.original)}</p>
                <p className="calc-comparison-gain">+{formatCurrency(calcResults.original - parsedAmount)} gained</p>
              </div>

              <div className="calc-vs">
                <span>VS</span>
              </div>

              <div className="calc-comparison-card gold">
                <p className="calc-comparison-label">If You Chose Gold</p>
                <p className="calc-comparison-rate">
                  {goldData.loading ? 'Loading...' : `${calcResults.goldRate.toFixed(1)}% avg annual return`}
                </p>
                <p className="calc-comparison-value">
                  {goldData.loading ? '...' : formatCurrency(calcResults.gold)}
                </p>
                <p className="calc-comparison-gain">
                  {goldData.loading ? '' : `+${formatCurrency(calcResults.gold - parsedAmount)} gained`}
                </p>
              </div>

              {goldAdvantage > 0 && (
                <div className="calc-advantage">
                  <p className="calc-advantage-text">
                    Gold would have earned you <span className="calc-advantage-amount">{formatCurrency(goldAdvantage)} more</span>
                  </p>
                </div>
              )}
              {goldAdvantage < 0 && (
                <div className="calc-advantage neutral">
                  <p className="calc-advantage-text">
                    {assetLabels[calcAsset]} outperformed gold by <span className="calc-advantage-amount">{formatCurrency(Math.abs(goldAdvantage))}</span> in this period
                  </p>
                </div>
              )}
            </div>
          </div>

          <p className="calculator-disclaimer">
            *Based on historical market data from Federal Reserve, World Gold Council, and S&P Global. S&P 500 figures reflect price returns only and do not include reinvested dividends. Past performance does not guarantee future results. For educational purposes only.
          </p>
        </div>
      </section>

      {/* CTA Section - LIGHT */}
      <section className="cta">
        <div className="cta-card">
          <h2 className="cta-title">
            Begin a Conversation <span className="text-gold-italic-dark">About Your Future</span>
          </h2>

          <p className="cta-desc">
            Let us help you explore how precious metals can strengthen and protect your retirement portfolio.
          </p>

          <div className="cta-buttons">
            <button className="btn-primary-dark" onClick={scrollToGuide}>Request Your Free Guide</button>
            <a href="tel:8006055597" className="btn-secondary-dark">Private Client Line: 800-605-5597</a>
          </div>
        </div>
      </section>

      <Footer />

      {/* Calculator Popup */}
      {showCalcPopup && (
        <div className="calc-popup-overlay">
          <div className="calc-popup">
            <button className="calc-popup-close" onClick={handleCalcPopupNo}>×</button>
            <div className="calc-popup-icon">
              <Image
                src="/citadel-logo-official.png"
                alt="Citadel Gold"
                width={180}
                height={44}
                style={{ objectFit: 'contain' }}
              />
            </div>
            <h3 className="calc-popup-title">Curious About Gold?</h3>
            <p className="calc-popup-text">
              Want to see what your investments would look like today if you had chosen gold?
            </p>
            <div className="calc-popup-buttons">
              <button className="calc-popup-yes" onClick={handleCalcPopupYes}>
                Yes, Show Me
              </button>
              <button className="calc-popup-no" onClick={handleCalcPopupNo}>
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Consultation Modal */}
      {showConsultationModal && (
        <div className="consultation-modal-overlay" onClick={() => setShowConsultationModal(false)}>
          <div className="consultation-modal" onClick={(e) => e.stopPropagation()}>
            <button className="consultation-modal-close" onClick={() => setShowConsultationModal(false)}>×</button>

            <div className="consultation-modal-header">
              <Image
                src="/citadel-logo-official.png"
                alt="Citadel Gold"
                width={160}
                height={40}
                style={{ objectFit: 'contain' }}
              />
              <h2 className="consultation-modal-title">Request a Private Consultation</h2>
              <p className="consultation-modal-subtitle">
                Connect with a dedicated precious metals specialist who will guide you through every step of your investment journey.
              </p>
            </div>

            <form onSubmit={handleConsultationSubmit} className="consultation-form">
              <div className="consultation-form-row">
                <div className="consultation-form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={consultationForm.firstName}
                    onChange={handleConsultationChange}
                    required
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="consultation-form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={consultationForm.lastName}
                    onChange={handleConsultationChange}
                    required
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="consultation-form-row">
                <div className="consultation-form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={consultationForm.email}
                    onChange={handleConsultationChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>
                <div className="consultation-form-group">
                  <label htmlFor="phone">Phone *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={consultationForm.phone}
                    onChange={handleConsultationChange}
                    required
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="consultation-form-group">
                <label htmlFor="goals">What are your goals?</label>
                <select
                  id="goals"
                  name="goals"
                  value={consultationForm.goals}
                  onChange={handleConsultationChange}
                >
                  <option value="">Select your goal</option>
                  <option value="protect-retirement">Protect retirement account</option>
                  <option value="protect-savings">Protect cash savings</option>
                  <option value="both">Both</option>
                </select>
              </div>

              <div className="consultation-form-group">
                <label htmlFor="metalInterest">What are you most interested in?</label>
                <select
                  id="metalInterest"
                  name="metalInterest"
                  value={consultationForm.metalInterest}
                  onChange={handleConsultationChange}
                >
                  <option value="">Select your interest</option>
                  <option value="gold">Gold</option>
                  <option value="silver">Silver</option>
                  <option value="platinum">Platinum</option>
                  <option value="palladium">Palladium</option>
                  <option value="all-metals">All metals</option>
                </select>
              </div>

              <button type="submit" className="consultation-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Schedule My Consultation'}
              </button>

              <p className="consultation-privacy">
                Your information is secure and will never be shared. By submitting, you agree to receive communications from Citadel Gold.
              </p>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=Montserrat:wght@300;400;500;600&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        .citadel-root {
          font-family: 'Cormorant Garamond', Georgia, serif;
          background: #2a3328;
          color: #f5f0e8;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .green-bg-overlay {
          position: relative;
        }

        .green-bg-overlay::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url('/green-background.png');
          background-size: cover;
          background-position: center;
          opacity: 0.20;
          pointer-events: none;
          z-index: 0;
        }

        .green-bg-overlay > * {
          position: relative;
          z-index: 1;
        }

        /* Navigation */
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          padding: 24px 60px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: transparent;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 100;
        }

        .nav-scrolled {
          background: rgba(42, 51, 40, 0.97);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(212, 175, 55, 0.15);
        }

        /* Price Ticker */
        .price-ticker {
          position: absolute;
          top: 96px;
          left: 0;
          right: 0;
          background: #1a2118;
          overflow: hidden;
          z-index: 50;
          border-bottom: 1px solid rgba(212, 175, 55, 0.1);
        }

        .price-ticker-inner {
          display: flex;
          animation: ticker-scroll 30s linear infinite;
          width: fit-content;
        }

        @keyframes ticker-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .price-ticker-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 40px;
          white-space: nowrap;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
        }

        .ticker-metal {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1px;
          color: #d4af37;
        }

        .ticker-price {
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #ffffff;
        }

        .ticker-change {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          font-weight: 500;
        }

        .ticker-percent {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          font-weight: 500;
        }

        .ticker-change.positive,
        .ticker-percent.positive {
          color: #4ade80;
        }

        .ticker-change.negative,
        .ticker-percent.negative {
          color: #f87171;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .nav-logo-official {
          height: 48px;
          width: auto;
          object-fit: contain;
        }

        .nav-links-desktop {
          display: flex;
          gap: 36px;
          align-items: center;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .nav-link {
          cursor: pointer;
          color: #a89f8c;
          transition: color 0.3s;
        }

        .nav-link:hover {
          color: #d4af37;
        }

        .nav-link-has-dropdown {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .nav-chevron {
          font-size: 8px;
          transition: transform 0.3s;
        }

        .nav-dropdown-wrapper {
          position: relative;
        }

        .nav-dropdown-wrapper:hover .nav-chevron {
          transform: rotate(180deg);
        }

        /* Standard Dropdown */
        .nav-dropdown {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-top: 20px;
          background: rgba(42, 51, 40, 0.98);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(212, 175, 55, 0.15);
          padding: 16px 0;
          min-width: 260px;
          z-index: 200;
          animation: dropdownFade 0.2s ease;
        }

        .nav-dropdown::before {
          content: '';
          position: absolute;
          top: -20px;
          left: 0;
          right: 0;
          height: 20px;
        }

        @keyframes dropdownFade {
          from { opacity: 0; transform: translateX(-50%) translateY(8px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        .nav-dropdown-link {
          display: block;
          padding: 12px 32px;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          letter-spacing: 1px;
          color: #a89f8c;
          text-decoration: none;
          text-transform: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .nav-dropdown-link:hover {
          color: #d4af37;
          background: rgba(212, 175, 55, 0.06);
        }

        /* Mega Menu */
        .nav-megamenu {
          position: fixed;
          top: 96px;
          left: 0;
          right: 0;
          background: rgba(42, 51, 40, 0.98);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(212, 175, 55, 0.15);
          padding: 48px 60px;
          display: grid;
          grid-template-columns: 1fr 1.5fr 1fr;
          gap: 48px;
          z-index: 200;
          animation: megamenuFade 0.25s ease;
        }

        @keyframes megamenuFade {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .megamenu-heading {
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1px;
          color: #d4af37;
          margin-bottom: 24px;
          text-transform: none;
        }

        .megamenu-link {
          display: block;
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          color: #a89f8c;
          text-decoration: none;
          text-transform: none;
          line-height: 1.6;
          padding: 8px 0;
          cursor: pointer;
          transition: color 0.2s;
        }

        .megamenu-link:hover {
          color: #f5f0e8;
        }

        .megamenu-link strong {
          color: #f5f0e8;
          font-weight: 500;
        }

        .megamenu-products {
          display: flex;
          gap: 48px;
          margin-top: 8px;
        }

        .megamenu-product {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          cursor: pointer;
        }

        .megamenu-product-img {
          width: 120px !important;
          height: 120px !important;
          object-fit: contain;
          transition: transform 0.3s;
        }

        .megamenu-product:hover .megamenu-product-img {
          transform: scale(1.05);
        }

        .megamenu-product-name {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: #f5f0e8;
          text-transform: none;
        }

        .megamenu-col-guide {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .megamenu-guide-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          color: #d4af37;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .megamenu-guide-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #f5f0e8;
          text-transform: none;
          margin-bottom: 20px;
        }

        .megamenu-guide-img {
          width: 140px !important;
          height: auto !important;
          object-fit: contain;
          margin-bottom: 20px;
          box-shadow: 10px 10px 30px rgba(0,0,0,0.4);
        }

        .megamenu-guide-btn {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          letter-spacing: 1px;
          color: #d4af37;
          border: 1px solid rgba(212, 175, 55, 0.4);
          padding: 10px 24px;
          text-decoration: none;
          text-transform: none;
          cursor: pointer;
          transition: all 0.3s;
        }

        .megamenu-guide-btn:hover {
          background: #d4af37;
          color: #2a3328;
        }

        .nav-cta-desktop {
          padding: 14px 32px;
          background: transparent;
          border: 1px solid #d4af37;
          color: #d4af37;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s;
          text-decoration: none;
        }

        .nav-cta-desktop:hover {
          background: #d4af37;
          color: #2a3328;
        }

        /* Hamburger */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 28px;
          height: 20px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          z-index: 110;
        }

        .hamburger-line {
          width: 100%;
          height: 2px;
          background: #d4af37;
          transition: all 0.3s ease;
        }

        .hamburger-line.open:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }

        .hamburger-line.open:nth-child(2) {
          opacity: 0;
        }

        .hamburger-line.open:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }

        /* Mobile Menu */
        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(42, 51, 40, 0.98);
          z-index: 99;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .mobile-menu.open {
          opacity: 1;
          visibility: visible;
        }

        .mobile-menu-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
        }

        .mobile-menu-link {
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #a89f8c;
          cursor: pointer;
          transition: color 0.3s;
        }

        .mobile-menu-link:hover {
          color: #d4af37;
        }

        .mobile-menu-cta {
          margin-top: 24px;
          padding: 16px 40px;
          background: linear-gradient(135deg, #d4af37, #b8860b);
          border: none;
          color: #2a3328;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          font-weight: 600;
          text-decoration: none;
          display: inline-block;
        }

        .mobile-submenu-wrapper {
          width: 100%;
        }

        .mobile-chevron {
          font-size: 10px;
          display: inline-block;
          transition: transform 0.3s;
          margin-left: 4px;
        }

        .mobile-chevron.open {
          transform: rotate(180deg);
        }

        .mobile-submenu {
          padding: 8px 0 8px 24px;
          border-left: 1px solid rgba(212, 175, 55, 0.2);
          margin-left: 8px;
        }

        .mobile-submenu-link {
          display: block;
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          color: #8a8278;
          text-decoration: none;
          padding: 10px 0;
          cursor: pointer;
          transition: color 0.2s;
        }

        .mobile-submenu-link:hover {
          color: #d4af37;
        }

        /* Hero */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: #2a3328;
          padding: 160px 20px 60px;
        }

        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background:
            radial-gradient(ellipse at 20% 30%, rgba(212, 175, 55, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(184, 134, 11, 0.06) 0%, transparent 50%);
        }

        .hero-content {
          text-align: center;
          z-index: 10;
          max-width: 800px;
        }

        .hero-tagline {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          letter-spacing: 6px;
          text-transform: uppercase;
          color: #d4af37;
          margin-bottom: 32px;
        }

        .hero-title {
          font-size: clamp(36px, 8vw, 96px);
          font-weight: 300;
          line-height: 1.2;
          margin-bottom: 24px;
          overflow: visible;
        }

        .hero-title span {
          display: block;
        }

        .hero-title-gold {
          background: linear-gradient(90deg, #d4af37, #f4e4a6, #d4af37, #b8860b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 500;
        }

        .hero-subtitle {
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          color: white;
          max-width: 500px;
          margin: 0 auto 48px;
          line-height: 1.8;
        }

        .hero-buttons {
          display: flex;
          gap: 24px;
          justify-content: center;
        }

        .hero-buttons .btn-primary,
        .hero-buttons .btn-secondary {
          min-width: 320px;
          text-align: center;
          white-space: nowrap;
        }

        .btn-primary {
          padding: 18px 48px;
          background: linear-gradient(135deg, #d4af37, #b8860b);
          border: none;
          color: #2a3328;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          font-weight: 600;
          box-shadow: 0 8px 32px rgba(212, 175, 55, 0.35);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(212, 175, 55, 0.45);
        }

        .btn-secondary {
          padding: 18px 48px;
          background: transparent;
          border: 1px solid rgba(212, 175, 55, 0.4);
          color: #d4af37;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s;
          text-decoration: none;
          display: inline-block;
        }

        .btn-secondary:hover {
          background: rgba(212, 175, 55, 0.1);
          border-color: #d4af37;
        }

        .hero-stats {
          margin-top: 80px;
          display: flex;
          justify-content: center;
          gap: 64px;
          flex-wrap: wrap;
        }

        .trust-logo {
          height: 50px;
          width: auto;
          object-fit: contain;
        }

        /* Video About Section */
        .video-about {
          padding: 100px 60px;
          background: #f8f6f1;
        }

        .video-about-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .video-about-player {
          position: relative;
          cursor: pointer;
        }

        .video-element {
          width: 100%;
          border-radius: 4px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .video-play-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: opacity 0.3s;
        }

        .video-play-overlay.hidden {
          opacity: 0;
          pointer-events: none;
        }

        .video-play-button {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 3px solid #ffffff;
          background: rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .play-icon {
          width: 32px;
          height: 32px;
          color: #ffffff;
          margin-left: 4px;
          transition: color 0.3s ease;
        }

        .video-about-player:hover .video-play-button {
          border-color: #d4af37;
          background: rgba(0, 0, 0, 0.5);
        }

        .video-about-player:hover .play-icon {
          color: #d4af37;
        }

        .video-about-content {
          text-align: center;
        }

        .video-about-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 32px;
          font-weight: 700;
          letter-spacing: 4px;
          color: #1a1915;
          margin-bottom: 20px;
        }

        .video-about-divider {
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #d4af37, transparent);
          margin-bottom: 32px;
        }

        .video-about-text {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 20px;
          line-height: 1.7;
          color: #1a1915;
          margin-bottom: 24px;
        }

        .video-about-btn {
          margin-top: 16px;
          padding: 18px 48px;
          background: linear-gradient(135deg, #d4af37, #b8860b);
          border: none;
          color: #2a3328;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .video-about-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(212, 175, 55, 0.45);
        }

        /* About */
        .about {
          padding: 160px 60px;
          background: linear-gradient(180deg, #f8f6f1 0%, #f2efe8 100%);
          color: #1a1915;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 100px;
          max-width: 1400px;
          margin: 0 auto;
          align-items: center;
        }

        .section-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #d4af37;
          margin-bottom: 24px;
        }

        .section-label-dark {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #b8860b;
          margin-bottom: 24px;
        }

        .about-title {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 300;
          line-height: 1.2;
          margin-bottom: 32px;
        }

        .text-gold-italic {
          color: #d4af37;
          font-style: italic;
        }

        .text-gold-italic-dark {
          color: #b8860b;
          font-style: italic;
        }

        .about-text {
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          line-height: 2;
          color: #5a5650;
          margin-bottom: 40px;
        }

        .about-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .about-feature {
          padding: 24px;
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(184, 134, 11, 0.15);
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }

        .about-feature-icon {
          color: #b8860b;
          font-size: 12px;
        }

        .about-feature-title {
          font-size: 16px;
          font-weight: 500;
          margin-top: 12px;
          margin-bottom: 8px;
        }

        .about-feature-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          color: #7a756d;
        }

        .about-visual {
          position: relative;
          height: 600px;
        }

        .about-visual-bg {
          position: absolute;
          width: 75%;
          height: 80%;
          background: linear-gradient(135deg, #f5f2eb, #ebe7de);
          border: 1px solid rgba(184, 134, 11, 0.2);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 20px;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .silver-coins-img {
          width: auto;
          height: auto;
          max-width: 90%;
          max-height: 70%;
          object-fit: contain;
          opacity: 0.85;
        }

        .silver-coins-tagline {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 16px;
          font-style: italic;
          color: #2a3328;
          text-align: center;
          margin-top: 16px;
          padding: 0 20px;
          line-height: 1.5;
        }

        .about-visual-card {
          position: absolute;
          width: 75%;
          height: 80%;
          background: linear-gradient(135deg, #2a3328, #2a3328);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.25);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Carousel animation states - horizontal swap */
        .about-visual-bg.coins-front {
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.15);
        }

        .about-visual-bg.coins-back {
          left: 25%;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1;
          box-shadow: none;
        }

        .about-visual-card.coins-front {
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.25);
        }

        .about-visual-card.coins-back {
          left: 25%;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .about-visual-content {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .gold-coins-img {
          width: auto;
          height: auto;
          max-width: 100%;
          max-height: 350px;
          object-fit: contain;
        }

        .about-visual-caption {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 18px;
          font-style: italic;
          color: #d4af37;
          margin-top: 24px;
          text-align: center;
          max-width: 280px;
          line-height: 1.5;
        }

        /* Retirement */
        .retirement {
          padding: 140px 60px;
          background: linear-gradient(180deg, #f8f6f1, #f2efe8);
        }

        .retirement-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .retirement-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 300;
          color: #2a3328;
          line-height: 1.2;
          margin-bottom: 32px;
        }

        .retirement-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: 15px;
          color: #5a5549;
          line-height: 1.8;
          margin-bottom: 40px;
        }

        .retirement-image {
          overflow: hidden;
        }

        .retirement-img {
          width: 100%;
          height: auto;
          object-fit: cover;
          display: block;
        }

        /* Commitment + Guide Wrapper */
        /* Commitment to Excellence */
        .commitment {
          padding: 140px 60px 80px;
          background: #2a3328;
        }

        .commitment-container {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }

        .commitment-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 300;
          color: #f5f0e8;
          margin-bottom: 48px;
          line-height: 1.3;
        }

        .commitment-content {
          margin-bottom: 32px;
        }

        .commitment-text {
          font-family: 'Montserrat', sans-serif;
          font-size: 15px;
          line-height: 2;
          color: #a89f8c;
          margin-bottom: 24px;
        }

        .commitment-tagline {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 24px;
          font-style: italic;
          color: #d4af37;
          margin-top: 32px;
          line-height: 1.5;
        }

        /* Guide */
        .guide {
          padding: 80px 60px 160px;
        }

        .guide-light-bg {
          background: linear-gradient(180deg, #faf9f6, #f5f3ed);
        }

        .guide-container {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 80px;
          align-items: center;
          padding: 60px 80px;
          border: 1px solid rgba(212, 175, 55, 0.15);
          background: rgba(42, 51, 40, 0.95);
          position: relative;
          overflow: hidden;
        }

        .guide-book-img {
          box-shadow: 20px 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(212, 175, 55, 0.1);
        }

        .guide-title {
          font-size: clamp(28px, 4vw, 36px);
          font-weight: 300;
          margin-bottom: 24px;
          color: #f5f0e8;
        }

        .guide-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          line-height: 1.9;
          color: #a89f8c;
          margin-bottom: 20px;
        }

        .guide-desc-highlight {
          color: #d4af37;
          font-style: italic;
          margin-bottom: 32px;
        }

        .guide-cta-btn {
          font-size: 14px;
          padding: 18px 48px;
          letter-spacing: 2px;
        }

        .guide-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .guide-form-row {
          display: flex;
          gap: 12px;
        }

        .guide-input {
          padding: 14px 16px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(212, 175, 55, 0.3);
          color: #f5f0e8;
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.3s;
          flex: 1;
        }

        .guide-input::placeholder {
          color: #8a8278;
        }

        .guide-input:focus {
          border-color: #d4af37;
        }

        .guide-input-full {
          width: 100%;
        }

        .guide-checkbox {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          cursor: pointer;
          margin: 8px 0;
        }

        .guide-checkbox input {
          width: 18px;
          height: 18px;
          accent-color: #d4af37;
          margin-top: 2px;
          cursor: pointer;
        }

        .guide-checkbox span {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          color: #a89f8c;
          line-height: 1.5;
        }

        .guide-form .btn-primary {
          margin-top: 8px;
        }

        /* Why Choose */
        .why-choose {
          padding: 160px 60px;
          text-align: center;
          background: linear-gradient(180deg, #faf9f6, #f5f3ed);
          color: #1a1915;
        }

        .why-choose-title {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 300;
          margin-bottom: 80px;
        }

        .why-choose-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .why-choose-card {
          padding: 48px 32px;
          background: #ffffff;
          border: 1px solid rgba(184, 134, 11, 0.12);
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
        }

        .why-choose-icon {
          margin-bottom: 28px;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 48px;
        }

        .why-choose-card-title {
          font-size: 18px;
          font-weight: 500;
          margin-bottom: 16px;
        }

        .why-choose-card-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          line-height: 1.8;
          color: #6a6358;
        }

        /* Products */
        .products {
          padding: 160px 60px;
          background: linear-gradient(180deg, #2a3328, #2a3328, #2a3328);
        }

        .products-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .products-title {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 300;
          color: #f5f0e8;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .product-card {
          background: linear-gradient(180deg, #2a3328, #2a3328);
          border: 1px solid rgba(212, 175, 55, 0.1);
          padding: 40px 32px;
          text-align: center;
        }

        .product-coin-img {
          width: 120px;
          height: 120px;
          margin: 0 auto 32px;
          object-fit: contain;
        }

        .product-name {
          font-size: 18px;
          font-weight: 500;
          margin-bottom: 8px;
          color: #f5f0e8;
        }

        .product-type {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          color: #6a6358;
        }

        /* Pricing */
        .pricing {
          padding: 140px 60px;
          background: linear-gradient(180deg, #f5f2eb, #ebe7de);
          color: #1a1915;
        }

        .pricing-grid {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 80px;
          align-items: center;
        }

        .pricing-title {
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 300;
          margin-bottom: 24px;
        }

        .pricing-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          line-height: 1.9;
          color: #5a5650;
        }

        .pricing-card {
          background: #ffffff;
          border: 1px solid rgba(184, 134, 11, 0.15);
          padding: 40px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.06);
        }

        .pricing-tabs {
          display: flex;
          gap: 12px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }

        .pricing-tab {
          padding: 12px 24px;
          background: transparent;
          border: 1px solid rgba(184, 134, 11, 0.25);
          color: #5a5650;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s;
        }

        .pricing-tab.active {
          background: linear-gradient(135deg, #d4af37, #b8860b);
          border: none;
          color: #2a3328;
        }

        .pricing-display {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 32px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .pricing-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          color: #8a8278;
          margin-bottom: 8px;
        }

        .pricing-value {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 300;
          color: #b8860b;
        }

        .pricing-value span {
          font-size: clamp(16px, 2vw, 20px);
        }

        .pricing-change {
          padding: 8px 16px;
          background: rgba(76, 175, 80, 0.1);
          border: 1px solid rgba(76, 175, 80, 0.25);
        }

        .pricing-change.positive {
          background: rgba(76, 175, 80, 0.1);
          border: 1px solid rgba(76, 175, 80, 0.25);
        }

        .pricing-change.negative {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.25);
        }

        .pricing-change span {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          color: #2e7d32;
        }

        .pricing-change.positive span {
          color: #2e7d32;
        }

        .pricing-change.negative span {
          color: #dc2626;
        }

        .pricing-chart {
          height: 100px;
          border-radius: 4px;
          overflow: hidden;
        }

        /* Steps */
        .steps {
          padding: 160px 60px;
          background: linear-gradient(180deg, #2a3328, #2a3328, #2a3328);
        }

        .steps-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .steps-title {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 300;
          color: #f5f0e8;
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 60px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .step-card {
          text-align: center;
        }

        .step-number {
          width: 120px;
          height: 120px;
          margin: 0 auto 32px;
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #2a3328;
        }

        .step-number span {
          font-size: 36px;
          font-weight: 200;
          color: #d4af37;
        }

        .step-title {
          font-size: 22px;
          font-weight: 500;
          margin-bottom: 16px;
          color: #f5f0e8;
        }

        .step-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          line-height: 1.9;
          color: #8a8278;
        }

        /* CTA */
        .cta {
          padding: 140px 60px;
          text-align: center;
          background: linear-gradient(180deg, #f8f6f1, #f2efe8);
          color: #1a1915;
        }

        .cta-card {
          max-width: 800px;
          margin: 0 auto;
          padding: 80px 60px;
          border: 1px solid rgba(184, 134, 11, 0.2);
          background: #ffffff;
          box-shadow: 0 20px 60px rgba(0,0,0,0.06);
        }

        .cta-title {
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 300;
          margin-bottom: 24px;
        }

        .cta-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          color: #5a5650;
          margin-bottom: 40px;
          line-height: 1.8;
        }

        .cta-buttons {
          display: flex;
          gap: 24px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary-dark {
          padding: 18px 48px;
          background: linear-gradient(135deg, #d4af37, #b8860b);
          border: none;
          color: #2a3328;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          font-weight: 600;
          transition: transform 0.3s;
        }

        .btn-primary-dark:hover {
          transform: translateY(-2px);
        }

        .btn-secondary-dark {
          padding: 18px 48px;
          background: transparent;
          border: 1px solid rgba(184, 134, 11, 0.4);
          color: #b8860b;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s;
          text-decoration: none;
          display: inline-block;
          text-align: center;
        }

        .btn-secondary-dark:hover {
          background: rgba(184, 134, 11, 0.1);
        }

        /* Footer */
        .footer {
          padding: 80px 60px 40px;
          background: #2a3328;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 60px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .footer-logo-img {
          border-radius: 50%;
        }

        .footer-logo-text {
          display: flex;
          flex-direction: column;
          align-items: center;
          line-height: 1;
        }

        .footer-logo-text span {
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 2px;
          color: #d4af37;
        }

        .footer-tagline {
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          line-height: 1.8;
          color: #6a6358;
          max-width: 300px;
        }

        .footer-col-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #d4af37;
          margin-bottom: 24px;
        }

        .footer-link {
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          color: #6a6358;
          margin-bottom: 12px;
          cursor: pointer;
          transition: color 0.3s;
        }

        .footer-link:hover {
          color: #a89f8c;
        }

        .footer-trust-badges {
          margin-bottom: 24px;
        }

        .footer-badges-img {
          width: auto;
          height: 50px;
          object-fit: contain;
        }

        .footer-bottom {
          margin-top: 60px;
          padding-top: 32px;
          border-top: 1px solid rgba(212, 175, 55, 0.08);
          text-align: center;
        }

        .footer-bottom p {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          color: #4a4740;
        }

        /* Direct Ownership Section */
        .direct-ownership {
          padding: 140px 60px;
          background: linear-gradient(180deg, #f8f6f1, #f2efe8);
          color: #1a1915;
        }

        .direct-ownership-container {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }

        .direct-ownership-title {
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 300;
          margin-bottom: 48px;
          line-height: 1.3;
        }

        .direct-ownership-content {
          margin-bottom: 48px;
        }

        .direct-ownership-text {
          font-family: 'Montserrat', sans-serif;
          font-size: 15px;
          line-height: 2;
          color: #5a5650;
          margin-bottom: 24px;
        }

        .direct-ownership-tagline {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 24px;
          font-style: italic;
          color: #b8860b;
          margin-top: 32px;
        }

        .direct-ownership-cta {
          margin-top: 40px;
        }

        .private-client-line {
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          letter-spacing: 2px;
          color: #b8860b;
          padding: 18px 48px;
          border: 1px solid rgba(184, 134, 11, 0.4);
          display: inline-block;
          text-decoration: none;
          cursor: pointer;
          transition: background-color 0.3s, color 0.3s;
        }

        .private-client-line:hover {
          background-color: #b8860b;
          color: #ffffff;
        }

        /* Why Invest Section */
        .why-invest {
          padding: 140px 60px;
          background: linear-gradient(180deg, #faf9f6, #f5f3ed);
          color: #1a1915;
        }

        .why-invest-container {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        .why-invest-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 300;
          margin-bottom: 24px;
          line-height: 1.3;
        }

        .why-invest-intro {
          font-family: 'Montserrat', sans-serif;
          font-size: 15px;
          line-height: 1.8;
          color: #5a5650;
          max-width: 700px;
          margin: 0 auto 64px;
        }

        .why-invest-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
          margin-bottom: 48px;
        }

        .why-invest-card {
          padding: 48px 40px;
          background: #ffffff;
          border: 1px solid rgba(184, 134, 11, 0.12);
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
          text-align: left;
        }

        .why-invest-card-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 18px;
          font-weight: 500;
          color: #1a1915;
          margin-bottom: 16px;
        }

        .why-invest-card-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          line-height: 1.9;
          color: #6a6358;
        }

        .why-invest-tagline {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 24px;
          font-style: italic;
          color: #b8860b;
          margin-top: 16px;
        }

        /* Pricing tagline */
        .pricing-desc-tagline {
          font-style: italic;
          color: #b8860b;
          margin-top: 16px;
        }

        /* Calculator Section */
        .calculator {
          padding: 140px 60px;
          background: #2a3328;
        }

        .calculator-container {
          max-width: 1000px;
          margin: 0 auto;
          text-align: center;
        }

        .calculator-title {
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 300;
          margin-bottom: 16px;
          color: #f5f0e8;
        }

        .calculator-subtitle {
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          color: #a89f8c;
          margin-bottom: 48px;
          line-height: 1.8;
        }

        .calculator-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 48px;
          align-items: start;
        }

        .calculator-inputs {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(212, 175, 55, 0.2);
          padding: 32px;
          text-align: left;
        }

        .calc-input-group {
          margin-bottom: 28px;
        }

        .calc-input-group:last-child {
          margin-bottom: 0;
        }

        .calc-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #d4af37;
          margin-bottom: 12px;
          display: block;
        }

        .calc-input-wrapper {
          position: relative;
        }

        .calc-currency {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          font-family: 'Montserrat', sans-serif;
          font-size: 18px;
          color: #d4af37;
          font-weight: 500;
        }

        .calc-input {
          width: 100%;
          padding: 16px 16px 16px 36px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(212, 175, 55, 0.3);
          color: #f5f0e8;
          font-family: 'Montserrat', sans-serif;
          font-size: 24px;
          font-weight: 500;
          outline: none;
          transition: border-color 0.3s;
        }

        .calc-input:focus {
          border-color: #d4af37;
        }

        .calc-input::placeholder {
          color: #6a6358;
        }

        .calc-years-buttons {
          display: flex;
          gap: 8px;
        }

        .calc-year-btn {
          flex: 1;
          padding: 14px 8px;
          background: transparent;
          border: 1px solid rgba(212, 175, 55, 0.3);
          color: #a89f8c;
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
        }

        .calc-year-btn:hover {
          border-color: #d4af37;
          color: #d4af37;
        }

        .calc-year-btn.active {
          background: linear-gradient(135deg, #d4af37, #b8860b);
          border-color: #d4af37;
          color: #2a3328;
        }

        .calc-asset-buttons {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }

        .calc-asset-btn {
          padding: 12px 8px;
          background: transparent;
          border: 1px solid rgba(212, 175, 55, 0.3);
          color: #a89f8c;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
        }

        .calc-asset-btn:hover {
          border-color: #d4af37;
          color: #d4af37;
        }

        .calc-asset-btn.active {
          background: rgba(212, 175, 55, 0.15);
          border-color: #d4af37;
          color: #d4af37;
        }

        .calculator-results-comparison {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .calc-comparison-card {
          flex: 1;
          min-width: 200px;
          max-width: 280px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 32px 24px;
          text-align: center;
          transition: all 0.3s;
        }

        .calc-comparison-card.gold {
          background: rgba(212, 175, 55, 0.08);
          border-color: rgba(212, 175, 55, 0.4);
        }

        .calc-comparison-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #a89f8c;
          margin-bottom: 8px;
        }

        .calc-comparison-card.gold .calc-comparison-label {
          color: #d4af37;
        }

        .calc-comparison-rate {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          color: #6a6358;
          margin-bottom: 20px;
        }

        .calc-comparison-value {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 36px;
          font-weight: 500;
          color: #f5f0e8;
          margin-bottom: 8px;
        }

        .calc-comparison-card.gold .calc-comparison-value {
          color: #d4af37;
        }

        .calc-comparison-gain {
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          color: #4ade80;
        }

        .calc-vs {
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #6a6358;
          padding: 16px;
        }

        .calc-advantage {
          width: 100%;
          margin-top: 24px;
          padding: 20px;
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.3);
          text-align: center;
        }

        .calc-advantage.neutral {
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .calc-advantage-text {
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          color: #a89f8c;
        }

        .calc-advantage-amount {
          color: #d4af37;
          font-weight: 600;
        }

        .calc-advantage.neutral .calc-advantage-amount {
          color: #f5f0e8;
        }

        .calculator-disclaimer {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          color: #6a6358;
          margin-top: 32px;
          line-height: 1.6;
        }

        /* Calculator Popup */
        .calc-popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .calc-popup {
          background: linear-gradient(135deg, #2a3328, #1a2118);
          border: 1px solid rgba(212, 175, 55, 0.3);
          padding: 48px;
          max-width: 420px;
          width: 90%;
          text-align: center;
          position: relative;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .calc-popup-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: transparent;
          border: none;
          color: #6a6358;
          font-size: 24px;
          cursor: pointer;
          transition: color 0.3s;
          line-height: 1;
        }

        .calc-popup-close:hover {
          color: #d4af37;
        }

        .calc-popup-icon {
          margin-bottom: 20px;
          display: flex;
          justify-content: center;
        }

        .calc-popup-logo {
          border-radius: 50%;
          box-shadow: 0 4px 20px rgba(212, 175, 55, 0.4);
        }

        .calc-popup-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 28px;
          font-weight: 400;
          color: #f5f0e8;
          margin-bottom: 16px;
        }

        .calc-popup-text {
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          color: #a89f8c;
          line-height: 1.7;
          margin-bottom: 32px;
        }

        .calc-popup-buttons {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .calc-popup-yes {
          padding: 16px 32px;
          background: linear-gradient(135deg, #d4af37, #b8860b);
          border: none;
          color: #2a3328;
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .calc-popup-yes:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(212, 175, 55, 0.4);
        }

        .calc-popup-no {
          padding: 14px 32px;
          background: transparent;
          border: 1px solid rgba(168, 159, 140, 0.3);
          color: #a89f8c;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .calc-popup-no:hover {
          border-color: rgba(168, 159, 140, 0.6);
          color: #f5f0e8;
        }

        /* Consultation Modal */
        .consultation-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 20px;
          animation: modalFadeIn 0.3s ease;
        }

        @keyframes modalFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .consultation-modal {
          background: linear-gradient(145deg, #2a3328, #1a2118);
          border: 1px solid rgba(212, 175, 55, 0.3);
          padding: 48px;
          max-width: 580px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 40px 100px rgba(0, 0, 0, 0.6), 0 0 60px rgba(212, 175, 55, 0.1);
          animation: modalSlideIn 0.3s ease;
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .consultation-modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: transparent;
          border: none;
          color: #6a6358;
          font-size: 28px;
          cursor: pointer;
          transition: color 0.3s;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .consultation-modal-close:hover {
          color: #d4af37;
        }

        .consultation-modal-header {
          text-align: center;
          margin-bottom: 36px;
        }

        .consultation-modal-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 32px;
          font-weight: 400;
          color: #d4af37;
          margin-top: 24px;
          margin-bottom: 12px;
        }

        .consultation-modal-subtitle {
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          color: #a89f8c;
          line-height: 1.7;
          max-width: 420px;
          margin: 0 auto;
        }

        .consultation-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .consultation-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .consultation-form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .consultation-form-group label {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #d4af37;
        }

        .consultation-form-group input,
        .consultation-form-group select {
          padding: 14px 18px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(212, 175, 55, 0.2);
          color: #f5f0e8;
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          transition: all 0.3s;
          outline: none;
        }

        .consultation-form-group input::placeholder {
          color: #6a6358;
        }

        .consultation-form-group input:focus,
        .consultation-form-group select:focus {
          border-color: rgba(212, 175, 55, 0.5);
          background: rgba(0, 0, 0, 0.4);
        }

        .consultation-form-group select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23d4af37' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          padding-right: 40px;
        }

        .consultation-form-group select option {
          background: #2a3328;
          color: #f5f0e8;
        }

        .consultation-submit-btn {
          margin-top: 12px;
          padding: 18px 48px;
          background: linear-gradient(135deg, #d4af37, #b8860b);
          border: none;
          color: #2a3328;
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s;
        }

        .consultation-submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(212, 175, 55, 0.4);
        }

        .consultation-privacy {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          color: #6a6358;
          text-align: center;
          line-height: 1.6;
          margin-top: 8px;
        }

        /* TABLET STYLES */
        @media (max-width: 1024px) {
          .nav {
            padding: 20px 40px;
          }

          .nav-links-desktop {
            display: none;
          }

          .nav-cta-desktop {
            display: none;
          }

          .hamburger {
            display: flex;
          }

          .video-about {
            padding: 80px 40px;
          }

          .video-about-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }

          .video-about-title {
            font-size: 28px;
          }

          .video-about-text {
            font-size: 18px;
          }

          .about {
            padding: 100px 40px;
          }

          .about-grid {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .about-visual {
            height: 400px;
            order: -1;
          }

          .commitment {
            padding: 100px 40px;
          }

          .retirement {
            padding: 100px 40px;
          }

          .retirement-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }

          .why-invest {
            padding: 100px 40px;
          }

          .why-invest-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .guide {
            padding: 100px 40px;
          }

          .guide-container {
            grid-template-columns: 1fr;
            gap: 48px;
            padding: 40px;
          }

          .guide-book-img {
            margin: 0 auto;
          }

          .guide-text {
            text-align: center;
          }

          .why-choose {
            padding: 100px 40px;
          }

          .why-choose-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .products {
            padding: 100px 40px;
          }

          .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .pricing {
            padding: 100px 40px;
          }

          .pricing-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }

          .pricing-text {
            text-align: center;
          }

          .steps {
            padding: 100px 40px;
          }

          .steps-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }

          .cta {
            padding: 100px 40px;
          }

          .cta-card {
            padding: 60px 40px;
          }

          .footer {
            padding: 60px 40px 40px;
          }

          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }

          .direct-ownership {
            padding: 100px 40px;
          }

          .calculator {
            padding: 100px 40px;
          }

          .calculator-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        /* MOBILE STYLES */
        @media (max-width: 640px) {
          .nav {
            padding: 16px 20px;
          }

          .nav-logo-official {
            height: 36px !important;
            width: auto !important;
          }

          .hero {
            min-height: 85vh;
            padding: 120px 20px 50px;
          }

          .price-ticker {
            top: 72px;
          }

          .price-ticker-item {
            padding: 10px 24px;
            gap: 8px;
          }

          .ticker-metal {
            font-size: 10px;
          }

          .ticker-price {
            font-size: 12px;
          }

          .ticker-change,
          .ticker-percent {
            font-size: 10px;
          }

          .video-about {
            padding: 60px 20px;
          }

          .video-about-grid {
            gap: 32px;
          }

          .video-about-title {
            font-size: 24px;
            letter-spacing: 2px;
          }

          .video-about-text {
            font-size: 16px;
          }

          .video-about-btn {
            padding: 16px 32px;
            font-size: 11px;
          }

          .hero-tagline {
            font-size: 9px;
            letter-spacing: 3px;
            margin-bottom: 24px;
          }

          .hero-subtitle {
            font-size: 13px;
            margin-bottom: 32px;
          }

          .hero-buttons {
            flex-wrap: wrap;
          }

          .hero-buttons .btn-primary,
          .hero-buttons .btn-secondary {
            min-width: auto;
            flex: 1;
            padding: 14px 20px;
            font-size: 9px;
            white-space: nowrap;
          }

          .btn-primary,
          .btn-secondary {
            padding: 16px 32px;
          }

          .hero-stats {
            margin-top: 80px;
            gap: 8px;
            width: 100%;
            justify-content: space-between;
            padding: 0;
            margin-left: 0;
            margin-right: 0;
            box-sizing: border-box;
          }

          .hero-content {
            width: 100%;
            padding-left: 20px;
            padding-right: 20px;
          }

          .trust-logo {
            height: 30px;
            flex: 1;
            object-fit: contain;
          }

          .hero-stat-value {
            font-size: 24px;
          }

          .about {
            padding: 60px 20px;
          }

          .about-features {
            grid-template-columns: 1fr;
          }

          .about-visual {
            position: relative;
            width: calc(100% - 40px);
            max-width: 320px;
            margin: 0 auto;
            aspect-ratio: 1 / 1;
            padding: 0;
          }

          .about-visual-bg,
          .about-visual-card {
            position: absolute;
            width: 100%;
            height: 100%;
            padding: 24px;
          }

          .about-visual-bg.coins-front,
          .about-visual-card.coins-front {
            left: 0;
            top: 0;
            transform: none;
            z-index: 10;
          }

          .about-visual-bg.coins-back,
          .about-visual-card.coins-back {
            left: 0;
            top: 0;
            transform: none;
            z-index: 1;
            opacity: 0;
          }

          .gold-coins-img,
          .silver-coins-img {
            max-height: 60%;
          }

          .about-visual-caption,
          .silver-coins-tagline {
            font-size: 14px;
            margin-top: 12px;
          }

          .guide {
            padding: 60px 20px;
          }

          .retirement {
            padding: 60px 20px;
          }

          .retirement-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .retirement-title {
            margin-bottom: 24px;
          }

          .retirement-desc {
            margin-bottom: 32px;
          }

          .guide-container {
            padding: 32px 24px;
          }

          .guide-book-img {
            width: 220px !important;
            height: auto !important;
          }

          .guide-form-row {
            flex-direction: row;
            width: 100%;
          }

          .guide-input {
            padding: 12px 14px;
            font-size: 13px;
          }

          .guide-form {
            align-items: center;
          }

          .guide-checkbox {
            justify-content: center;
            text-align: center;
          }

          .guide-form .btn-primary {
            width: 100%;
            text-align: center;
          }

          .why-choose {
            padding: 60px 20px;
          }

          .why-choose-title {
            margin-bottom: 48px;
          }

          .why-choose-grid {
            grid-template-columns: 1fr;
          }

          .why-choose-card {
            padding: 32px 24px;
          }

          .products {
            padding: 60px 20px;
          }

          .products-header {
            margin-bottom: 48px;
          }

          .products-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .product-card {
            padding: 32px 24px;
          }

          .product-coin {
            width: 100px;
            height: 100px;
            margin-bottom: 24px;
          }

          .product-coin span {
            font-size: 28px;
          }

          .pricing {
            padding: 60px 20px;
          }

          .pricing-card {
            padding: 32px 24px;
          }

          .pricing-tabs {
            justify-content: center;
          }

          .pricing-tab {
            padding: 10px 16px;
            font-size: 10px;
          }

          .steps {
            padding: 60px 20px;
          }

          .steps-header {
            margin-bottom: 48px;
          }

          .step-number {
            width: 100px;
            height: 100px;
          }

          .step-number span {
            font-size: 28px;
          }

          .cta {
            padding: 60px 20px;
          }

          .cta-card {
            padding: 32px 24px;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .btn-primary-dark,
          .btn-secondary-dark {
            width: 100%;
            max-width: 280px;
            padding: 16px 32px;
          }

          /* Consultation Modal Mobile */
          .consultation-modal {
            padding: 32px 24px;
            max-height: 95vh;
          }

          .consultation-modal-close {
            top: 12px;
            right: 12px;
          }

          .consultation-modal-title {
            font-size: 26px;
          }

          .consultation-modal-subtitle {
            font-size: 13px;
          }

          .consultation-form-row {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .consultation-form-group input,
          .consultation-form-group select {
            padding: 12px 14px;
            font-size: 16px; /* Prevents iOS zoom */
          }

          .consultation-submit-btn {
            padding: 16px 32px;
            font-size: 12px;
          }

          .footer {
            padding: 48px 20px 32px;
          }

          .footer-grid {
            grid-template-columns: 1fr;
            gap: 32px;
            text-align: center;
          }

          .footer-trust-badges {
            display: flex;
            justify-content: center;
          }

          .footer-logo {
            justify-content: center;
          }

          .footer-tagline {
            margin: 0 auto;
          }

          .footer-col-title {
            margin-bottom: 16px;
          }

          .direct-ownership {
            padding: 60px 20px;
          }

          .direct-ownership-title {
            margin-bottom: 48px;
          }

          .direct-ownership-text {
            font-size: 14px;
          }

          .direct-ownership-tagline {
            font-size: 20px;
          }

          .private-client-line {
            font-size: 12px;
            padding: 14px 24px;
          }

          .commitment {
            padding: 60px 20px;
          }

          .commitment-tagline {
            font-size: 20px;
          }

          .why-invest {
            padding: 60px 20px;
          }

          .why-invest-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .why-invest-card {
            padding: 32px 24px;
          }

          .why-invest-tagline {
            font-size: 20px;
          }

          .calculator {
            padding: 60px 20px;
          }

          .calculator-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .calculator-inputs {
            padding: 32px 24px;
          }

          .calc-input {
            font-size: 20px;
          }

          .calc-years-buttons {
            flex-wrap: wrap;
          }

          .calc-year-btn {
            padding: 12px 6px;
            font-size: 13px;
          }

          .calc-asset-buttons {
            grid-template-columns: 1fr 1fr;
          }

          .calculator-results-comparison {
            flex-direction: column;
          }

          .calc-comparison-card {
            width: 100%;
            max-width: none;
          }

          .calc-vs {
            padding: 8px;
          }

          .calc-comparison-value {
            font-size: 28px;
          }
        }
      `}</style>
    </div>
  );
};

export default CitadelGoldRedesignV2;
