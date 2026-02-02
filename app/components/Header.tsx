'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

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

export default function Header() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState<string | null>(null);
  const [metalPrices, setMetalPrices] = useState<MetalPrices | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
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

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Navigation */}
      <nav className={`nav ${scrollY > 50 ? 'nav-scrolled' : ''}`}>
        <div className="nav-logo">
          <Image
            src="/citadel-logo-official.png"
            alt="Citadel Gold"
            width={200}
            height={48}
            className="nav-logo-official"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="nav-links-desktop">
          <a href="/" className="nav-link">Home</a>
          <a href="/buy-gold/" className="nav-link">Buy Gold</a>
          <a href="/buy-silver/" className="nav-link">Buy Silver</a>

          {/* Gold IRA/401K Dropdown */}
          <div
            className="nav-dropdown-wrapper"
            onMouseEnter={() => setActiveDropdown('ira')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <span className="nav-link nav-link-has-dropdown">
              Gold IRA/401K <span className="nav-chevron">&#9662;</span>
            </span>
            {activeDropdown === 'ira' && (
              <div className="nav-dropdown">
                {[
                  { label: 'Gold IRA', href: '/gold-ira/' },
                  { label: 'Gold IRA Guide', href: '/gold-ira-guide/' },
                  { label: 'IRA Intake Form', href: '/ira-intake-form/' },
                  { label: 'What is a Gold IRA Rollover?', href: '/what-is-a-gold-ira-rollover/' },
                  { label: 'Why Invest in Gold', href: '/why-invest-in-gold/' },
                  { label: 'Free Gold IRA Kit', href: '/free-gold-ira-kit/' },
                ].map((item) => (
                  <a key={item.label} href={item.href} className="nav-dropdown-link">{item.label}</a>
                ))}
              </div>
            )}
          </div>

          {/* Resources Mega Menu */}
          <div
            className="nav-dropdown-wrapper"
            onMouseEnter={() => setActiveDropdown('resources')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <span className="nav-link nav-link-has-dropdown">
              Resources <span className="nav-chevron">&#9662;</span>
            </span>
            {activeDropdown === 'resources' && (
              <div className="nav-megamenu">
                <div className="megamenu-col">
                  <h4 className="megamenu-heading">Important Information</h4>
                  <a className="megamenu-link"><strong>Delaware Depository</strong> — Security, insurance &amp; audits</a>
                  <a className="megamenu-link"><strong>Gold IRA Steps</strong> — How to open, fund &amp; stay compliant</a>
                  <a className="megamenu-link"><strong>Gold vs. Other Assets</strong> — 20-year performance at a glance</a>
                </div>
                <div className="megamenu-col megamenu-col-products">
                  <h4 className="megamenu-heading">Retirement Plans — Investment Grade Quality</h4>
                  <div className="megamenu-products">
                    <div className="megamenu-product">
                      <Image src="/gold-american-eagle.png" alt="Gold American Eagle" width={120} height={120} className="megamenu-product-img" />
                      <span className="megamenu-product-name">Gold American Eagle Proof</span>
                    </div>
                    <div className="megamenu-product">
                      <Image src="/silver-american-eagle.png" alt="Silver American Eagle" width={120} height={120} className="megamenu-product-img" />
                      <span className="megamenu-product-name">Silver American Eagle Proof</span>
                    </div>
                  </div>
                </div>
                <div className="megamenu-col megamenu-col-guide">
                  <p className="megamenu-guide-label">Get Our Free Guide</p>
                  <h4 className="megamenu-guide-title">Precious Metals Investment Guide</h4>
                  <Image src="/precious-metals-guide.png" alt="Investment Guide" width={140} height={180} className="megamenu-guide-img" />
                  <a className="megamenu-guide-btn">Get Gold Investment Guide</a>
                </div>
              </div>
            )}
          </div>

          {/* About Us Dropdown */}
          <div
            className="nav-dropdown-wrapper"
            onMouseEnter={() => setActiveDropdown('about')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <span className="nav-link nav-link-has-dropdown">
              About Us <span className="nav-chevron">&#9662;</span>
            </span>
            {activeDropdown === 'about' && (
              <div className="nav-dropdown">
                {[
                  { label: 'About Us', href: '/about/' },
                  { label: 'Why Choose Us?', href: '/why-choose-us/' },
                  { label: 'Our Commitment', href: '/our-commitment/' },
                  { label: 'Risk Disclosures', href: '/risk-disclosures/' },
                  { label: 'Careers', href: '/carees/' },
                  { label: 'FAQs', href: '/faqs/' },
                  { label: 'Terms and Conditions', href: '/terms-and-conditions/' },
                  { label: 'Contact', href: '/contact/' },
                ].map((item) => (
                  <a key={item.label} href={item.href} className="nav-dropdown-link">{item.label}</a>
                ))}
              </div>
            )}
          </div>
        </div>

        <a href="tel:8006055597" className="nav-cta-desktop">Call Now 800-605-5597</a>

        {/* Hamburger Button */}
        <button
          className="hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <a href="/" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="/buy-gold/" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>Buy Gold</a>
          <a href="/buy-silver/" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>Buy Silver</a>

          {/* Gold IRA/401K */}
          <div className="mobile-submenu-wrapper">
            <a className="mobile-menu-link" onClick={() => setActiveMobileSubmenu(activeMobileSubmenu === 'ira' ? null : 'ira')}>
              Gold IRA/401K <span className={`mobile-chevron ${activeMobileSubmenu === 'ira' ? 'open' : ''}`}>&#9662;</span>
            </a>
            {activeMobileSubmenu === 'ira' && (
              <div className="mobile-submenu">
                {[
                  { label: 'Gold IRA', href: '/gold-ira/' },
                  { label: 'Gold IRA Guide', href: '/gold-ira-guide/' },
                  { label: 'IRA Intake Form', href: '/ira-intake-form/' },
                  { label: 'What is a Gold IRA Rollover?', href: '/what-is-a-gold-ira-rollover/' },
                  { label: 'Why Invest in Gold', href: '/why-invest-in-gold/' },
                  { label: 'Free Gold IRA Kit', href: '/free-gold-ira-kit/' },
                ].map((item) => (
                  <a key={item.label} href={item.href} className="mobile-submenu-link" onClick={() => setMobileMenuOpen(false)}>{item.label}</a>
                ))}
              </div>
            )}
          </div>

          {/* Resources */}
          <div className="mobile-submenu-wrapper">
            <a className="mobile-menu-link" onClick={() => setActiveMobileSubmenu(activeMobileSubmenu === 'resources' ? null : 'resources')}>
              Resources <span className={`mobile-chevron ${activeMobileSubmenu === 'resources' ? 'open' : ''}`}>&#9662;</span>
            </a>
            {activeMobileSubmenu === 'resources' && (
              <div className="mobile-submenu">
                {[
                  { label: 'Delaware Depository', href: '/delaware-depository/' },
                  { label: 'Gold IRA Steps', href: '/gold-ira-steps/' },
                  { label: 'Gold vs. Other Assets', href: '/gold-vs-other-assets/' },
                  { label: 'Gold American Eagle', href: '/gold-american-eagle/' },
                  { label: 'Silver American Eagle', href: '/silver-american-eagle/' },
                  { label: 'Get Gold Investment Guide', href: '/free-gold-ira-kit/' },
                ].map((item) => (
                  <a key={item.label} href={item.href} className="mobile-submenu-link" onClick={() => setMobileMenuOpen(false)}>{item.label}</a>
                ))}
              </div>
            )}
          </div>

          {/* About Us */}
          <div className="mobile-submenu-wrapper">
            <a className="mobile-menu-link" onClick={() => setActiveMobileSubmenu(activeMobileSubmenu === 'about' ? null : 'about')}>
              About Us <span className={`mobile-chevron ${activeMobileSubmenu === 'about' ? 'open' : ''}`}>&#9662;</span>
            </a>
            {activeMobileSubmenu === 'about' && (
              <div className="mobile-submenu">
                {[
                  { label: 'About Us', href: '/about/' },
                  { label: 'Why Choose Us?', href: '/why-choose-us/' },
                  { label: 'Our Commitment', href: '/our-commitment/' },
                  { label: 'Risk Disclosures', href: '/risk-disclosures/' },
                  { label: 'Careers', href: '/carees/' },
                  { label: 'FAQs', href: '/faqs/' },
                  { label: 'Terms and Conditions', href: '/terms-and-conditions/' },
                  { label: 'Contact', href: '/contact/' },
                ].map((item) => (
                  <a key={item.label} href={item.href} className="mobile-submenu-link" onClick={() => setMobileMenuOpen(false)}>{item.label}</a>
                ))}
              </div>
            )}
          </div>

          <a href="tel:8006055597" className="mobile-menu-cta">Call Now 800-605-5597</a>
        </div>
      </div>

      {/* Price Ticker Banner */}
      {metalPrices && (
        <div className="price-ticker">
          <div className="price-ticker-inner">
            {[
              { name: 'GOLD', ...metalPrices.gold },
              { name: 'SILVER', ...metalPrices.silver },
              { name: 'PLATINUM', ...metalPrices.platinum },
              { name: 'PALLADIUM', ...metalPrices.palladium },
              { name: 'GOLD', ...metalPrices.gold },
              { name: 'SILVER', ...metalPrices.silver },
              { name: 'PLATINUM', ...metalPrices.platinum },
              { name: 'PALLADIUM', ...metalPrices.palladium },
            ].map((metal, i) => (
              <div key={i} className="price-ticker-item">
                <span className="ticker-metal">{metal.name}</span>
                <span className="ticker-price">${metal.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span className={`ticker-change ${metal.change >= 0 ? 'positive' : 'negative'}`}>
                  {metal.change >= 0 ? '+' : ''}{metal.change.toFixed(2)}
                </span>
                <span className={`ticker-percent ${metal.change >= 0 ? 'positive' : 'negative'}`}>
                  {metal.change >= 0 ? '+' : ''}{metal.changePercent.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
