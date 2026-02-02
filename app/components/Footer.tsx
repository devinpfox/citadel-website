'use client';

import React from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
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

        {[
          { title: 'Company', links: ['About Us', 'Our Team', 'Careers', 'Press'] },
          { title: 'Resources', links: ['Gold IRA Guide', 'Market News', 'FAQ', 'Blog'] },
          { title: 'Private Client Line', links: ['800-605-5597', 'info@citadelgold.com', 'Los Angeles, CA'] }
        ].map((col, i) => (
          <div key={i} className="footer-col">
            <h4 className="footer-col-title">{col.title}</h4>
            {col.links.map((link, j) => (
              <p key={j} className="footer-link">{link}</p>
            ))}
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Citadel Gold. All rights reserved.</p>
      </div>
    </footer>
  );
}
