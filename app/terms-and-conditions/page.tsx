'use client';

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function TermsAndConditionsPage() {
  return (
    <div className="terms-page">
      <Header />

      <main className="terms-main">
        <div className="terms-container">
          <h1 className="terms-main-title">TERMS AND CONDITIONS</h1>

          <div className="terms-divider" />

          <h2 className="terms-subtitle">Terms & Conditions</h2>

          <section className="terms-section">
            <h3>All Sales Are Final:</h3>
            <p>
              Due to the nature of precious metals and market price fluctuations, all sales are final.
              Once an order is confirmed and payment is processed, it cannot be canceled, returned, or refunded.
              Citadel Gold is not responsible for market gains or losses after a purchase has been completed.
            </p>
          </section>

          <section className="terms-section">
            <h3>Consent for SMS Communication:</h3>
            <p>
              The information (Phone Numbers) obtained as part of the SMS consent process will not be shared
              with third parties for marketing purposes.
            </p>
            <p>
              In addition to SMS messages, you agree to receive calls, text messages, and prerecorded messages
              via an automated dialing system about promotions from or on behalf of Citadel Gold.
              Consent is not a condition of purchase.
            </p>
          </section>

          <section className="terms-section">
            <h3>Types of SMS Communications:</h3>
            <p>
              If you have consented to receive text messages from Citadel Gold, you may receive messages
              related to the following:
            </p>
            <ul>
              <li>Appointment reminders</li>
              <li>Follow-up messages</li>
            </ul>
          </section>

          <section className="terms-section">
            <h3>Message Frequency:</h3>
            <p>
              Message frequency may vary depending on the type of communication. For example, you may receive
              up to 2 SMS messages per week about information.
            </p>
          </section>

          <section className="terms-section">
            <h3>Potential Fees for SMS Messaging:</h3>
            <p>
              Please note that standard message and data rates may apply, depending on your carrier's pricing plan.
              These fees may vary if the message is sent domestically or internationally.
            </p>
          </section>

          <section className="terms-section">
            <h3>Opt-In Method:</h3>
            <p>You may opt-in to receive SMS messages from Citadel Gold in the following way:</p>
            <ul>
              <li>By submitting an online form</li>
            </ul>
          </section>

          <section className="terms-section">
            <h3>Opt-Out Method:</h3>
            <p>
              You can opt out of receiving SMS messages at any time. To do so, simply reply "STOP" to any
              SMS message you receive. Alternatively, you can contact us directly to request removal from
              our messaging list.
            </p>
          </section>

          <section className="terms-section">
            <h3>Help:</h3>
            <p>
              If you are experiencing any issues, you can reply with the keyword HELP. Or, you can get help
              directly from us at 310.209.8166.
            </p>
          </section>

          <section className="terms-section">
            <h3>Additional Options:</h3>
            <p>
              If you do not wish to receive SMS messages, you can choose not to check the SMS consent box
              on our form.
            </p>
          </section>

          <section className="terms-section">
            <h3>Standard Messaging Disclosures:</h3>
            <ul>
              <li>Message and data rates may apply.</li>
              <li>You can opt out at any time by texting "STOP."</li>
              <li>For assistance, text "HELP" or visit our Privacy Policy & Terms and Conditions page.</li>
              <li>Message frequency may vary.</li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=Montserrat:wght@300;400;500;600&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .terms-page {
          min-height: 100vh;
          background: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          color: #2d3748;
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
          background: rgba(42, 51, 40, 0.97);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(212, 175, 55, 0.15);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 100;
        }

        .nav-scrolled {
          background: rgba(42, 51, 40, 0.97);
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
          text-decoration: none;
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
          text-decoration: none;
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

        /* Price Ticker */
        .price-ticker {
          position: fixed;
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
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
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

        .ticker-change, .ticker-percent {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          font-weight: 500;
        }

        .ticker-change.positive, .ticker-percent.positive { color: #4ade80; }
        .ticker-change.negative, .ticker-percent.negative { color: #f87171; }

        /* Main Content */
        .terms-main {
          padding: 160px 20px 80px;
          background: #ffffff;
        }

        .terms-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .terms-main-title {
          font-size: 32px;
          font-weight: 700;
          text-align: center;
          color: #1a202c;
          margin-bottom: 30px;
          letter-spacing: 1px;
        }

        .terms-divider {
          width: 300px;
          height: 3px;
          background: #c9a227;
          margin: 0 auto 50px;
        }

        .terms-subtitle {
          font-size: 28px;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 30px;
        }

        .terms-section {
          margin-bottom: 32px;
        }

        .terms-section h3 {
          font-size: 16px;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 12px;
        }

        .terms-section p {
          font-size: 15px;
          line-height: 1.7;
          color: #4a5568;
          margin-bottom: 12px;
        }

        .terms-section p:last-child {
          margin-bottom: 0;
        }

        .terms-section ul {
          margin: 12px 0 0 20px;
        }

        .terms-section ul li {
          font-size: 15px;
          line-height: 1.7;
          color: #4a5568;
          margin-bottom: 6px;
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

        /* TABLET STYLES */
        @media (max-width: 1024px) {
          .nav {
            padding: 20px 40px;
          }

          .nav-links-desktop, .nav-cta-desktop {
            display: none;
          }

          .hamburger {
            display: flex;
          }

          .nav-megamenu {
            display: none;
          }

          .footer {
            padding: 60px 40px 40px;
          }

          .footer-grid {
            grid-template-columns: 1fr 1fr;
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

          .price-ticker {
            top: 72px;
          }

          .price-ticker-item {
            padding: 10px 24px;
            gap: 8px;
          }

          .ticker-metal { font-size: 10px; }
          .ticker-price { font-size: 12px; }
          .ticker-change, .ticker-percent { font-size: 10px; }

          .terms-main {
            padding: 140px 16px 60px;
          }

          .terms-main-title {
            font-size: 24px;
          }

          .terms-divider {
            width: 200px;
          }

          .terms-subtitle {
            font-size: 22px;
          }

          .terms-section h3 {
            font-size: 15px;
          }

          .terms-section p,
          .terms-section ul li {
            font-size: 14px;
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
        }
      `}</style>
    </div>
  );
}
