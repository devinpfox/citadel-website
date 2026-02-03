'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ThankYouPage() {
  useEffect(() => {
    // Auto-download the PDF guide when the page loads
    const link = document.createElement('a');
    link.href = '/Precious Metals Citadel Gold Guide.pdf';
    link.download = 'Precious Metals Citadel Gold Guide.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return (
    <div className="thank-you-root">
      <Header />

      <section className="thank-you-hero">
        <div className="thank-you-bg" />

        <div className="thank-you-content">
          <div className="thank-you-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>

          <p className="thank-you-tagline">Your Request Has Been Received</p>

          <h1 className="thank-you-title">
            <span>Thank You for Your</span>
            <span className="thank-you-title-gold">Interest in Precious Metals</span>
          </h1>

          <p className="thank-you-subtitle">
            We appreciate your interest in our Precious Metals Investment Guide.
            A member of our team will be reaching out shortly to share this valuable
            resource and answer any questions you may have about protecting your wealth with gold and silver.
          </p>

          <div className="thank-you-details">
            <div className="detail-item">
              <span className="detail-icon">&#9830;</span>
              <span>Expect a call within 1 business day</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">&#9830;</span>
              <span>Your guide will be sent to your email</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">&#9830;</span>
              <span>No obligation consultation available</span>
            </div>
          </div>

          <div className="thank-you-buttons">
            <a href="/" className="btn-primary">Return to Homepage</a>
            <a href="tel:8006055597" className="btn-secondary">Call Us Now: 800-605-5597</a>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=Montserrat:wght@300;400;500;600&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        .thank-you-root {
          min-height: 100vh;
          background: #2a3328;
          font-family: 'Cormorant Garamond', Georgia, serif;
          color: #f5f0e8;
          overflow-x: hidden;
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
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(212, 175, 55, 0.15);
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

        /* Thank You Page Specific */
        .thank-you-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 160px 60px 80px;
          overflow: hidden;
        }

        .thank-you-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(42, 51, 40, 0.97), rgba(35, 43, 33, 0.98));
          z-index: 1;
        }

        .thank-you-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url('/green-texture-bg.jpg');
          background-size: cover;
          background-position: center;
          opacity: 0.4;
        }

        .thank-you-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .thank-you-icon {
          margin-bottom: 32px;
          animation: fadeInScale 0.6s ease-out;
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .thank-you-tagline {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #d4af37;
          margin-bottom: 24px;
        }

        .thank-you-title {
          font-size: 52px;
          font-weight: 400;
          color: #f5f0e8;
          line-height: 1.2;
          margin-bottom: 32px;
        }

        .thank-you-title span {
          display: block;
        }

        .thank-you-title-gold {
          color: #d4af37;
          font-style: italic;
          font-weight: 500;
        }

        .thank-you-subtitle {
          font-family: 'Montserrat', sans-serif;
          font-size: 16px;
          line-height: 1.8;
          color: #a89f8c;
          max-width: 600px;
          margin: 0 auto 48px;
        }

        .thank-you-details {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 48px;
        }

        .detail-item {
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          color: #f5f0e8;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .detail-icon {
          color: #d4af37;
          font-size: 10px;
        }

        .thank-you-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary {
          padding: 16px 40px;
          background: linear-gradient(135deg, #d4af37, #b8860b);
          border: none;
          color: #2a3328;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          text-decoration: none;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(212, 175, 55, 0.3);
        }

        .btn-secondary {
          padding: 16px 40px;
          background: transparent;
          border: 1px solid rgba(212, 175, 55, 0.4);
          color: #d4af37;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .btn-secondary:hover {
          background: rgba(212, 175, 55, 0.1);
          border-color: #d4af37;
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

          .thank-you-hero {
            padding: 140px 24px 60px;
          }

          .thank-you-title {
            font-size: 36px;
          }

          .thank-you-subtitle {
            font-size: 14px;
          }

          .thank-you-buttons {
            flex-direction: column;
            align-items: center;
          }

          .btn-primary,
          .btn-secondary {
            width: 100%;
            max-width: 300px;
            text-align: center;
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
