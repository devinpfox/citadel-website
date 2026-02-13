'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import { EngagementTracker } from '../components/engagement-tracker';

export default function FreeSilverCoinPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to ByeTalk CRM
      await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form_id: 'free-silver-coin',
          form_name: 'Free Silver Coin QR Campaign',
          ...formData,
        }),
      });
    } catch (error) {
      console.error('Form submission error:', error);
    }

    // Redirect to thank you page
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
      {/* Citadel Gold Tracking - free-silver-coin */}
      <Script id="citadel-tracking" strategy="afterInteractive">
        {`
          (function() {
            try {
              var tc = 'tc_7b13524028f1';
              var base = 'https://www.byetalk.com/api/t/' + tc;

              // Generate visitor ID
              var vid = '';
              try {
                vid = localStorage.getItem('_cg_vid') || '';
                if (!vid) {
                  vid = 'v_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
                  localStorage.setItem('_cg_vid', vid);
                }
              } catch(e) {
                vid = 'v_' + Math.random().toString(36).substr(2, 9);
              }

              // Generate session ID
              var sid = '';
              try {
                sid = sessionStorage.getItem('_cg_sid') || '';
                if (!sid) {
                  sid = 's_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
                  sessionStorage.setItem('_cg_sid', sid);
                }
              } catch(e) {
                sid = 's_' + Math.random().toString(36).substr(2, 9);
              }

              // Get UTM params
              var params = new URLSearchParams(window.location.search);

              // Build tracking URL
              var url = base + '?' + new URLSearchParams({
                vid: vid,
                sid: sid,
                url: window.location.href,
                title: document.title || '',
                path: window.location.pathname,
                ref: document.referrer || '',
                sw: String(screen.width || 0),
                sh: String(screen.height || 0),
                vw: String(window.innerWidth || 0),
                vh: String(window.innerHeight || 0),
                utm_source: params.get('utm_source') || '',
                utm_medium: params.get('utm_medium') || '',
                utm_campaign: params.get('utm_campaign') || '',
                utm_content: params.get('utm_content') || '',
                utm_term: params.get('utm_term') || ''
              }).toString();

              // Send tracking pixel
              new Image().src = url;
            } catch(e) {}
          })();
        `}
      </Script>

      {/* Engagement & Form Abandonment Tracker */}
      <EngagementTracker trackingCode="tc_7b13524028f1" />

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
            <span className="header-cta-label">CALL NOW</span>
            <a href="tel:8006055597" className="header-phone">1-800-605-5597</a>
          </div>
        </header>

        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-container">
            <div className="hero-form-side">
              <h1 className="hero-title">
                Claim Your <span className="gold-text">FREE Silver Coin!</span>
              </h1>
              <div className="hero-divider" />
              <p className="hero-subtitle">
                As a thank you for scanning our mailer, we&apos;re offering you a FREE 1oz American Silver Eagle
                with your first qualifying purchase. Fill out the form below to claim your coin and receive
                your complimentary Precious Metals Investor&apos;s Guide!
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
                  {isSubmitting ? 'Submitting...' : 'Claim My Free Silver Coin'}
                </button>
              </form>
            </div>

            <div className="hero-image-side">
              <div className="welcome-badge">
                <span className="badge-title">FREE</span>
                <span className="badge-subtitle">SILVER!</span>
                <span className="badge-note">WITH QUALIFYING PURCHASE</span>
              </div>
              <div className="hero-product-image">
                <Image
                  src="/silver-american-eagle.png"
                  alt="Free Silver American Eagle Coin"
                  width={350}
                  height={350}
                  className="product-img"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
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

        {/* Why Silver Section */}
        <section className="why-section">
          <h2>Why Smart Investors Are Adding Silver to Their Portfolios</h2>
          <p>
            Silver has been a store of value for thousands of years. Today, it offers unique advantages:
            industrial demand is soaring (solar panels, electronics, medical devices), supply is constrained,
            and it remains significantly undervalued compared to gold. Many analysts believe silver is
            poised for substantial gains. Don&apos;t miss this opportunity to start or expand your precious
            metals holdings with a FREE American Silver Eagle.
          </p>
        </section>

        {/* Offer Details */}
        <section className="offers-section">
          <div className="offers-header">
            <p>Limited Time <span className="gold-text">Mail-In Offer</span></p>
            <h2>Your Free Silver Coin Awaits</h2>
          </div>

          <div className="single-offer">
            <div className="offer-card featured">
              <div className="offer-image">
                <Image
                  src="/silver-american-eagle.png"
                  alt="Silver American Eagle"
                  width={200}
                  height={200}
                  className="offer-img"
                />
              </div>
              <h3>FREE 1oz Silver American Eagle</h3>
              <p className="offer-value">$35+ Value - Yours FREE</p>
              <p className="offer-condition">*with qualified purchases over $10,000</p>
              <ul className="offer-benefits">
                <li>✓ .999 Fine Silver</li>
                <li>✓ US Mint Official Coin</li>
                <li>✓ Recognized Worldwide</li>
                <li>✓ IRA Eligible</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="promo-footer">
          <div className="footer-disclaimer">
            <p>
              Offer valid for recipients of Citadel Gold direct mail only. Valid for first-time qualifying
              purchases of $10,000 or more. Limit one per household. Not combinable with other offers.
              Precious metals involve risk and may fluctuate in value. Citadel Gold representatives are not
              licensed financial advisors. All purchases subject to <a href="/terms-and-conditions">Terms & Conditions</a>.
              © Citadel Gold. All rights reserved.
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
            background: linear-gradient(135deg, #C0C0C0, #808080);
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
            box-shadow: 0 8px 24px rgba(192, 192, 192, 0.3);
          }

          .submit-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }

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
            background: radial-gradient(circle, #C0C0C0 60%, #808080 100%);
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            box-shadow: 0 0 0 8px rgba(192, 192, 192, 0.3);
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
            font-size: 6px;
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

          .offers-section {
            background: #1a1f18;
            padding: 80px 60px;
            text-align: center;
          }

          .offers-header p {
            font-size: 16px;
            color: #a89f8c;
            margin-bottom: 8px;
          }

          .offers-header h2 {
            font-family: 'Cormorant Garamond', serif;
            font-size: 28px;
            color: #f5f0e8;
            margin-bottom: 50px;
          }

          .single-offer {
            display: flex;
            justify-content: center;
          }

          .offer-card {
            background: #2a3328;
            padding: 40px;
            border: 2px solid rgba(192, 192, 192, 0.3);
            text-align: center;
            max-width: 400px;
            border-radius: 8px;
          }

          .offer-card.featured {
            border-color: #C0C0C0;
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
            color: #f5f0e8;
            margin-bottom: 8px;
          }

          .offer-value {
            font-size: 18px;
            font-weight: 600;
            color: #C0C0C0;
            margin-bottom: 8px;
          }

          .offer-condition {
            font-size: 12px;
            color: #6a6358;
            margin-bottom: 24px;
          }

          .offer-benefits {
            list-style: none;
            text-align: left;
            padding: 0;
          }

          .offer-benefits li {
            padding: 8px 0;
            color: #a89f8c;
            font-size: 14px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
          }

          .offer-benefits li:last-child {
            border-bottom: none;
          }

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

          @media (max-width: 1024px) {
            .hero-container {
              grid-template-columns: 1fr;
              gap: 40px;
            }

            .hero-image-side {
              order: -1;
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

            .trust-badges-section,
            .why-section,
            .offers-section {
              padding: 50px 24px;
            }

            .trust-badges {
              gap: 30px;
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
          }
        `}</style>
      </div>
    </>
  );
}
