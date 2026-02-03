'use client';

import React from 'react';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ThankYouPage() {
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

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=Montserrat:wght@300;400;500;600&display=swap');

        .thank-you-root {
          min-height: 100vh;
          background: #2a3328;
          font-family: 'Cormorant Garamond', Georgia, serif;
        }

        .thank-you-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 120px 60px 80px;
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

        @media (max-width: 768px) {
          .thank-you-hero {
            padding: 100px 24px 60px;
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
        }
      `}</style>
    </div>
  );
}
