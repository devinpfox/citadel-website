'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function Footer() {
  const [showPdfModal, setShowPdfModal] = useState(false);

  return (
    <>
      <footer className="footer green-bg-overlay">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-trust-badges">
              <Image
                src="/trust-badge-footer.png"
                alt="Secure Payments, Fast & Free Shipping, Premium Quality, 24/7 Customer Support"
                width={300}
                height={60}
                className="footer-badges-img"
              />
            </div>
            <div className="footer-logo">
              <Image
                src="/citadel-logo-official.png"
                alt="Citadel Gold"
                width={180}
                height={44}
                className="nav-logo-official"
              />
            </div>
            <p className="footer-tagline">
              Guiding families toward lasting financial security through precious metals.
            </p>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Company</h4>
            <p className="footer-link">About Us</p>
            <p className="footer-link">Our Team</p>
            <p className="footer-link">Careers</p>
            <p className="footer-link">Press</p>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Resources</h4>
            <p className="footer-link">Gold IRA Guide</p>
            <p className="footer-link">Market News</p>
            <p className="footer-link">FAQ</p>
            <p className="footer-link">Blog</p>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Private Client Line</h4>
            <p className="footer-link">800-605-5597</p>
            <p className="footer-link">info@citadelgold.com</p>
            <p className="footer-link">Los Angeles, CA</p>
          </div>
        </div>

        <div className="footer-legal">
          <a href="/terms-and-conditions" className="footer-legal-link">Terms & Conditions</a>
          <span className="footer-legal-divider">|</span>
          <button
            onClick={() => setShowPdfModal(true)}
            className="footer-legal-link footer-legal-btn"
          >
            Shipping & Transaction Agreement
          </button>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Citadel Gold. All rights reserved.</p>
        </div>
      </footer>

      {/* PDF Modal */}
      {showPdfModal && (
        <div className="pdf-modal-overlay" onClick={() => setShowPdfModal(false)}>
          <div className="pdf-modal" onClick={(e) => e.stopPropagation()}>
            <div className="pdf-modal-header">
              <h2>Shipping & Transaction Agreement</h2>
              <div className="pdf-modal-actions">
                <a
                  href="/shipping-transaction-agreement.pdf"
                  download="Citadel Gold - Shipping & Transaction Agreement.pdf"
                  className="pdf-download-btn"
                >
                  Download PDF
                </a>
                <button
                  onClick={() => setShowPdfModal(false)}
                  className="pdf-close-btn"
                  aria-label="Close"
                >
                  &times;
                </button>
              </div>
            </div>
            <div className="pdf-modal-content">
              <iframe
                src="/shipping-transaction-agreement.pdf"
                title="Shipping & Transaction Agreement"
                className="pdf-iframe"
              />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .footer-legal {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          padding: 24px 0;
          border-top: 1px solid rgba(212, 175, 55, 0.1);
          margin-top: 40px;
        }

        .footer-legal-link {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          color: #6a6358;
          text-decoration: none;
          cursor: pointer;
          transition: color 0.3s;
        }

        .footer-legal-link:hover {
          color: #d4af37;
        }

        .footer-legal-btn {
          background: none;
          border: none;
          padding: 0;
          font: inherit;
        }

        .footer-legal-divider {
          color: #4a4740;
        }

        /* PDF Modal Styles */
        .pdf-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .pdf-modal {
          background: #2a3328;
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 8px;
          width: 100%;
          max-width: 900px;
          height: 85vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .pdf-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
          background: #232b21;
        }

        .pdf-modal-header h2 {
          font-family: 'Montserrat', sans-serif;
          font-size: 16px;
          font-weight: 600;
          color: #f5f0e8;
          margin: 0;
        }

        .pdf-modal-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .pdf-download-btn {
          padding: 10px 20px;
          background: linear-gradient(135deg, #d4af37, #b8860b);
          border: none;
          color: #1a1f18;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .pdf-download-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
        }

        .pdf-close-btn {
          width: 36px;
          height: 36px;
          background: transparent;
          border: 1px solid rgba(212, 175, 55, 0.3);
          color: #d4af37;
          font-size: 24px;
          line-height: 1;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pdf-close-btn:hover {
          background: rgba(212, 175, 55, 0.1);
          border-color: #d4af37;
        }

        .pdf-modal-content {
          flex: 1;
          overflow: hidden;
        }

        .pdf-iframe {
          width: 100%;
          height: 100%;
          border: none;
          background: #fff;
        }

        @media (max-width: 768px) {
          .pdf-modal-overlay {
            padding: 20px;
          }

          .pdf-modal {
            height: 90vh;
          }

          .pdf-modal-header {
            padding: 16px;
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
          }

          .pdf-modal-header h2 {
            font-size: 14px;
          }

          .pdf-modal-actions {
            width: 100%;
            justify-content: space-between;
          }

          .footer-legal {
            flex-direction: column;
            gap: 12px;
          }

          .footer-legal-divider {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
