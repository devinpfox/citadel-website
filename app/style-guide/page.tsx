'use client';

import React from 'react';
import Image from 'next/image';

const colors = {
  primary: [
    { name: 'Dark Green', hex: '#2a3328', textLight: true },
    { name: 'Bright Gold', hex: '#d4af37', textLight: false },
    { name: 'Dark Gold', hex: '#b8860b', textLight: true },
  ],
  neutral: [
    { name: 'Cream', hex: '#f5f0e8', textLight: false },
    { name: 'Light Cream', hex: '#faf9f6', textLight: false },
    { name: 'White', hex: '#ffffff', textLight: false },
    { name: 'Warm Gray', hex: '#a89f8c', textLight: false },
    { name: 'Muted Tan', hex: '#8a8278', textLight: true },
    { name: 'Body Text (Light BG)', hex: '#5a5650', textLight: true },
    { name: 'Dark Text', hex: '#1a1915', textLight: true },
  ],
};

export default function StyleGuide() {
  return (
    <div className="sg-root">
      {/* Header */}
      <header className="sg-header">
        <div className="sg-header-inner">
          <p className="sg-header-label">Citadel Gold Brand Guidelines</p>
          <h1 className="sg-header-title">Style Guide</h1>
          <p className="sg-header-subtitle">A comprehensive reference for the Citadel Gold visual identity — logos, color palette, typography, and UI components.</p>
        </div>
      </header>

      {/* 1.0 Logo */}
      <section className="sg-section">
        <div className="sg-section-header">
          <span className="sg-section-number">1.0</span>
          <h2 className="sg-section-title">Logo</h2>
        </div>

        <div className="sg-subsection">
          <h3 className="sg-subsection-title">1.1 &mdash; Primary Logo</h3>
          <p className="sg-body">The primary logo combines the emblem mark with the Citadel Gold logotype. It should always be used with adequate clear space.</p>
          <div className="sg-logo-grid">
            <div className="sg-logo-card sg-logo-dark">
              <div className="sg-logo-display">
                <Image src="/new-emblem.png" alt="Citadel Gold Emblem" width={56} height={56} style={{ objectFit: 'contain' }} />
                <div className="sg-logo-text-block">
                  <span className="sg-logo-citadel">CITADEL</span>
                  <span className="sg-logo-gold">GOLD</span>
                </div>
              </div>
              <p className="sg-logo-bg-label">On Dark Background</p>
            </div>
            <div className="sg-logo-card sg-logo-light">
              <div className="sg-logo-display">
                <Image src="/new-emblem.png" alt="Citadel Gold Emblem" width={56} height={56} style={{ objectFit: 'contain' }} />
                <div className="sg-logo-text-block sg-logo-text-dark">
                  <span className="sg-logo-citadel">CITADEL</span>
                  <span className="sg-logo-gold">GOLD</span>
                </div>
              </div>
              <p className="sg-logo-bg-label sg-logo-bg-label-dark">On Light Background</p>
            </div>
          </div>
        </div>

        <div className="sg-subsection">
          <h3 className="sg-subsection-title">1.2 &mdash; Emblem Mark</h3>
          <p className="sg-body">The emblem can be used independently as an icon, favicon, or social avatar.</p>
          <div className="sg-emblem-grid">
            <div className="sg-emblem-card sg-logo-dark">
              <Image src="/new-emblem.png" alt="Emblem on dark" width={80} height={80} style={{ objectFit: 'contain' }} />
            </div>
            <div className="sg-emblem-card sg-logo-light">
              <Image src="/new-emblem.png" alt="Emblem on light" width={80} height={80} style={{ objectFit: 'contain' }} />
            </div>
            <div className="sg-emblem-card" style={{ background: '#d4af37' }}>
              <Image src="/new-emblem.png" alt="Emblem on gold" width={80} height={80} style={{ objectFit: 'contain' }} />
            </div>
          </div>
        </div>

        <div className="sg-subsection">
          <h3 className="sg-subsection-title">1.3 &mdash; Clear Space</h3>
          <p className="sg-body">Maintain a minimum clear space equal to the height of the emblem on all sides. Never crowd the logo with other elements.</p>
          <div className="sg-clearspace">
            <div className="sg-clearspace-inner">
              <div className="sg-clearspace-border">
                <Image src="/new-emblem.png" alt="Clear space" width={64} height={64} style={{ objectFit: 'contain' }} />
                <div className="sg-logo-text-block sg-logo-text-dark">
                  <span className="sg-logo-citadel">CITADEL</span>
                  <span className="sg-logo-gold">GOLD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2.0 Color Palette */}
      <section className="sg-section sg-section-alt">
        <div className="sg-section-header">
          <span className="sg-section-number">2.0</span>
          <h2 className="sg-section-title">Color Palette</h2>
        </div>

        <div className="sg-subsection">
          <h3 className="sg-subsection-title">2.1 &mdash; Primary Colors</h3>
          <p className="sg-body">The core brand palette centers on dark green and gold, evoking wealth preservation, trust, and timeless elegance.</p>
          <div className="sg-color-grid">
            {colors.primary.map((c) => (
              <div key={c.hex} className="sg-color-swatch">
                <div className="sg-swatch-block" style={{ background: c.hex }}>
                  <span className="sg-swatch-hex" style={{ color: c.textLight ? '#f5f0e8' : '#1a1915' }}>{c.hex}</span>
                </div>
                <p className="sg-swatch-name">{c.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="sg-subsection">
          <h3 className="sg-subsection-title">2.2 &mdash; Neutral &amp; Supporting Colors</h3>
          <p className="sg-body">These tones support the primary palette for backgrounds, body text, cards, and subtle UI elements.</p>
          <div className="sg-color-grid sg-color-grid-sm">
            {colors.neutral.map((c) => (
              <div key={c.hex} className="sg-color-swatch">
                <div className="sg-swatch-block" style={{ background: c.hex, border: c.hex === '#ffffff' ? '1px solid #e0ddd6' : 'none' }}>
                  <span className="sg-swatch-hex" style={{ color: c.textLight ? '#f5f0e8' : '#1a1915' }}>{c.hex}</span>
                </div>
                <p className="sg-swatch-name">{c.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3.0 Typography */}
      <section className="sg-section">
        <div className="sg-section-header">
          <span className="sg-section-number">3.0</span>
          <h2 className="sg-section-title">Typography</h2>
        </div>

        <div className="sg-subsection">
          <h3 className="sg-subsection-title">3.1 &mdash; Cormorant Garamond</h3>
          <p className="sg-body">Used for all headings, titles, and editorial taglines. Conveys refinement and heritage.</p>
          <div className="sg-type-specimens">
            <div className="sg-type-row">
              <span className="sg-type-meta">Light 300 &middot; 48px</span>
              <p className="sg-type-sample" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: 48 }}>Preserve Your Legacy with Gold</p>
            </div>
            <div className="sg-type-row">
              <span className="sg-type-meta">Regular 400 &middot; 36px</span>
              <p className="sg-type-sample" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontSize: 36 }}>A Heritage of Trust & Excellence</p>
            </div>
            <div className="sg-type-row">
              <span className="sg-type-meta">Medium 500 &middot; 28px</span>
              <p className="sg-type-sample" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500, fontSize: 28 }}>Current Precious Metal Prices</p>
            </div>
            <div className="sg-type-row">
              <span className="sg-type-meta">Italic 400 &middot; 24px</span>
              <p className="sg-type-sample" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontSize: 24, fontStyle: 'italic', color: '#b8860b' }}>Smart investors don&apos;t just grow wealth — they protect it.</p>
            </div>
            <div className="sg-type-row">
              <span className="sg-type-meta">SemiBold 600 &middot; 24px</span>
              <p className="sg-type-sample" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: 24 }}>Curious About Gold?</p>
            </div>
          </div>
        </div>

        <div className="sg-subsection">
          <h3 className="sg-subsection-title">3.2 &mdash; Montserrat</h3>
          <p className="sg-body">Used for body copy, navigation, buttons, labels, and form elements. Clean and modern.</p>
          <div className="sg-type-specimens">
            <div className="sg-type-row">
              <span className="sg-type-meta">Light 300 &middot; 15px</span>
              <p className="sg-type-sample" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: 15, lineHeight: 1.8 }}>Precious metals markets move continuously — and informed timing can meaningfully impact long-term value.</p>
            </div>
            <div className="sg-type-row">
              <span className="sg-type-meta">Regular 400 &middot; 14px</span>
              <p className="sg-type-sample" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: 1.8 }}>At Citadel Gold, we believe the strongest investment decisions are made with clarity — not pressure.</p>
            </div>
            <div className="sg-type-row">
              <span className="sg-type-meta">Medium 500 &middot; 18px</span>
              <p className="sg-type-sample" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: 18 }}>Clear, Transparent Pricing</p>
            </div>
            <div className="sg-type-row">
              <span className="sg-type-meta">SemiBold 600 &middot; 12px &middot; Uppercase &middot; 2px tracking</span>
              <p className="sg-type-sample" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase' as const }}>About Citadel Gold</p>
            </div>
            <div className="sg-type-row">
              <span className="sg-type-meta">Regular 400 &middot; 11px &middot; Uppercase &middot; 2px tracking</span>
              <p className="sg-type-sample" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase' as const }}>Home &nbsp;&nbsp; Buy Gold &nbsp;&nbsp; Buy Silver &nbsp;&nbsp; Gold IRA/401K &nbsp;&nbsp; Resources &nbsp;&nbsp; About Us</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4.0 UI Elements */}
      <section className="sg-section sg-section-alt">
        <div className="sg-section-header">
          <span className="sg-section-number">4.0</span>
          <h2 className="sg-section-title">UI Elements</h2>
        </div>

        <div className="sg-subsection">
          <h3 className="sg-subsection-title">4.1 &mdash; Buttons</h3>
          <div className="sg-buttons-grid">
            <div className="sg-button-example">
              <button className="sg-btn-primary">Learn More</button>
              <p className="sg-element-label">Primary Button</p>
              <p className="sg-element-desc">Gold gradient background, dark text. Main CTA.</p>
            </div>
            <div className="sg-button-example">
              <button className="sg-btn-secondary">Contact Us</button>
              <p className="sg-element-label">Secondary Button</p>
              <p className="sg-element-desc">Gold border, transparent fill. Supporting actions.</p>
            </div>
            <div className="sg-button-example">
              <a className="sg-btn-cta">Private Client Line: 800-605-5597</a>
              <p className="sg-element-label">CTA Link Button</p>
              <p className="sg-element-desc">Gold border on light BG. Fills on hover.</p>
            </div>
          </div>
        </div>

        <div className="sg-subsection">
          <h3 className="sg-subsection-title">4.2 &mdash; Section Labels &amp; Taglines</h3>
          <div className="sg-labels-grid">
            <div className="sg-label-example sg-label-on-dark">
              <p className="sg-section-label-demo">A Guided Process</p>
              <p className="sg-element-label" style={{ color: '#a89f8c' }}>Section Label (Dark BG)</p>
            </div>
            <div className="sg-label-example sg-label-on-light">
              <p className="sg-section-label-demo-dark">The Citadel Difference</p>
              <p className="sg-element-label">Section Label (Light BG)</p>
            </div>
            <div className="sg-label-example sg-label-on-light">
              <p className="sg-tagline-demo">Transparency isn&apos;t a feature. It&apos;s how we operate.</p>
              <p className="sg-element-label">Gold Italic Tagline</p>
            </div>
          </div>
        </div>

        <div className="sg-subsection">
          <h3 className="sg-subsection-title">4.3 &mdash; Form Inputs</h3>
          <div className="sg-form-demo">
            <input type="text" placeholder="First Name" className="sg-input-demo" readOnly />
            <input type="email" placeholder="Email Address" className="sg-input-demo" readOnly />
          </div>
        </div>
      </section>

      {/* 5.0 Texture & Pattern */}
      <section className="sg-section">
        <div className="sg-section-header">
          <span className="sg-section-number">5.0</span>
          <h2 className="sg-section-title">Texture &amp; Layout Pattern</h2>
        </div>

        <div className="sg-subsection">
          <h3 className="sg-subsection-title">5.1 &mdash; Background Texture Overlay</h3>
          <p className="sg-body">Dark sections use a subtle green texture overlay at 20% opacity over the base dark green (#2a3328).</p>
          <div className="sg-texture-demo">
            <div className="sg-texture-sample">
              <p className="sg-texture-text">Dark Section with Texture Overlay</p>
            </div>
          </div>
        </div>

        <div className="sg-subsection">
          <h3 className="sg-subsection-title">5.2 &mdash; Section Alternation</h3>
          <p className="sg-body">The homepage alternates between dark (green-black with texture) and light (cream gradient) sections to create visual rhythm.</p>
          <div className="sg-alternation-demo">
            <div className="sg-alt-block sg-alt-dark">Dark Section &mdash; #2a3328</div>
            <div className="sg-alt-block sg-alt-light">Light Section &mdash; #faf9f6 &rarr; #f5f3ed</div>
            <div className="sg-alt-block sg-alt-dark">Dark Section &mdash; #2a3328</div>
            <div className="sg-alt-block sg-alt-light">Light Section &mdash; #faf9f6 &rarr; #f5f3ed</div>
          </div>
        </div>
      </section>

      <footer className="sg-footer">
        <p>&copy; 2025 Citadel Gold. Internal brand reference document.</p>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=Montserrat:wght@300;400;500;600&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        .sg-root {
          font-family: 'Montserrat', sans-serif;
          background: #faf9f6;
          color: #1a1915;
          min-height: 100vh;
        }

        /* Header */
        .sg-header {
          padding: 100px 60px 80px;
          border-bottom: 1px solid rgba(184, 134, 11, 0.15);
        }

        .sg-header-inner {
          max-width: 1100px;
          margin: 0 auto;
        }

        .sg-header-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #b8860b;
          margin-bottom: 16px;
        }

        .sg-header-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 64px;
          font-weight: 300;
          color: #1a1915;
          margin-bottom: 16px;
        }

        .sg-header-subtitle {
          font-size: 14px;
          color: #6a6358;
          line-height: 1.7;
          max-width: 600px;
        }

        /* Sections */
        .sg-section {
          padding: 80px 60px;
          max-width: 1220px;
          margin: 0 auto;
        }

        .sg-section-alt {
          background: #f5f3ed;
          max-width: none;
          padding: 80px 60px;
        }

        .sg-section-alt > .sg-section-header,
        .sg-section-alt > .sg-subsection {
          max-width: 1100px;
          margin-left: auto;
          margin-right: auto;
        }

        .sg-section-header {
          display: flex;
          align-items: baseline;
          gap: 20px;
          margin-bottom: 60px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(184, 134, 11, 0.2);
        }

        .sg-section-number {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 14px;
          font-weight: 300;
          color: #b8860b;
        }

        .sg-section-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 36px;
          font-weight: 300;
          color: #1a1915;
        }

        .sg-subsection {
          margin-bottom: 60px;
        }

        .sg-subsection-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #b8860b;
          margin-bottom: 12px;
        }

        .sg-body {
          font-size: 14px;
          line-height: 1.8;
          color: #5a5650;
          margin-bottom: 32px;
          max-width: 700px;
        }

        /* Logo Section */
        .sg-logo-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .sg-logo-card {
          padding: 60px 48px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
        }

        .sg-logo-dark {
          background: #2a3328;
        }

        .sg-logo-light {
          background: #f5f0e8;
          border: 1px solid #e0ddd6;
        }

        .sg-logo-display {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .sg-logo-text-block {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }

        .sg-logo-citadel {
          font-family: 'Montserrat', sans-serif;
          font-size: 18px;
          font-weight: 500;
          letter-spacing: 4px;
          color: #d4af37;
        }

        .sg-logo-gold {
          font-family: 'Montserrat', sans-serif;
          font-size: 18px;
          font-weight: 300;
          letter-spacing: 4px;
          color: #d4af37;
        }

        .sg-logo-text-dark .sg-logo-citadel,
        .sg-logo-text-dark .sg-logo-gold {
          color: #2a3328;
        }

        .sg-logo-bg-label {
          font-size: 11px;
          letter-spacing: 1px;
          color: #8a8278;
        }

        .sg-logo-bg-label-dark {
          color: #6a6358;
        }

        .sg-emblem-grid {
          display: flex;
          gap: 24px;
        }

        .sg-emblem-card {
          width: 160px;
          height: 160px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Clear Space */
        .sg-clearspace {
          display: flex;
          justify-content: center;
          padding: 40px 0;
        }

        .sg-clearspace-inner {
          padding: 48px;
          background: #f5f0e8;
        }

        .sg-clearspace-border {
          display: flex;
          align-items: center;
          gap: 16px;
          border: 2px dashed rgba(184, 134, 11, 0.3);
          padding: 32px 48px;
        }

        /* Color Swatches */
        .sg-color-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .sg-color-grid-sm {
          grid-template-columns: repeat(4, 1fr);
        }

        .sg-color-swatch {
          display: flex;
          flex-direction: column;
        }

        .sg-swatch-block {
          height: 140px;
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
          padding: 16px;
        }

        .sg-color-grid-sm .sg-swatch-block {
          height: 100px;
        }

        .sg-swatch-hex {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 1px;
        }

        .sg-swatch-name {
          font-size: 12px;
          font-weight: 500;
          color: #1a1915;
          margin-top: 10px;
        }

        /* Typography */
        .sg-type-specimens {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .sg-type-row {
          padding-bottom: 32px;
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }

        .sg-type-meta {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #a89f8c;
          display: block;
          margin-bottom: 8px;
        }

        .sg-type-sample {
          color: #1a1915;
          line-height: 1.3;
        }

        /* Buttons */
        .sg-buttons-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }

        .sg-button-example {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 16px;
        }

        .sg-btn-primary {
          padding: 16px 48px;
          background: linear-gradient(135deg, #d4af37, #b8860b);
          border: none;
          color: #2a3328;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
        }

        .sg-btn-secondary {
          padding: 16px 48px;
          background: transparent;
          border: 1px solid #d4af37;
          color: #d4af37;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
        }

        .sg-btn-cta {
          padding: 18px 48px;
          border: 1px solid rgba(184, 134, 11, 0.4);
          color: #b8860b;
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          letter-spacing: 2px;
          display: inline-block;
          cursor: pointer;
          transition: all 0.3s;
          text-decoration: none;
        }

        .sg-btn-cta:hover {
          background: #b8860b;
          color: #ffffff;
        }

        .sg-element-label {
          font-size: 12px;
          font-weight: 600;
          color: #1a1915;
        }

        .sg-element-desc {
          font-size: 12px;
          color: #8a8278;
          line-height: 1.5;
        }

        /* Labels & Taglines */
        .sg-labels-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .sg-label-example {
          padding: 40px 32px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .sg-label-on-dark {
          background: #2a3328;
        }

        .sg-label-on-light {
          background: #f5f0e8;
          border: 1px solid #e0ddd6;
        }

        .sg-section-label-demo {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #d4af37;
        }

        .sg-section-label-demo-dark {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #b8860b;
        }

        .sg-tagline-demo {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 20px;
          font-style: italic;
          color: #b8860b;
          line-height: 1.5;
        }

        /* Form */
        .sg-form-demo {
          display: flex;
          gap: 16px;
          max-width: 500px;
        }

        .sg-input-demo {
          flex: 1;
          padding: 14px 16px;
          background: rgba(42, 51, 40, 0.08);
          border: 1px solid rgba(184, 134, 11, 0.3);
          color: #1a1915;
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          outline: none;
        }

        .sg-input-demo::placeholder {
          color: #8a8278;
        }

        /* Texture */
        .sg-texture-demo {
          margin-top: 24px;
        }

        .sg-texture-sample {
          position: relative;
          background: #2a3328;
          padding: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .sg-texture-sample::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: url('/green-background.png');
          background-size: cover;
          background-position: center;
          opacity: 0.20;
          pointer-events: none;
        }

        .sg-texture-text {
          position: relative;
          z-index: 1;
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #d4af37;
        }

        /* Alternation */
        .sg-alternation-demo {
          display: flex;
          flex-direction: column;
        }

        .sg-alt-block {
          padding: 32px;
          text-align: center;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          letter-spacing: 1px;
        }

        .sg-alt-dark {
          background: #2a3328;
          color: #d4af37;
        }

        .sg-alt-light {
          background: linear-gradient(90deg, #faf9f6, #f5f3ed);
          color: #5a5650;
        }

        /* Footer */
        .sg-footer {
          padding: 40px 60px;
          text-align: center;
          border-top: 1px solid rgba(184, 134, 11, 0.15);
        }

        .sg-footer p {
          font-size: 11px;
          color: #8a8278;
          letter-spacing: 1px;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .sg-header {
            padding: 60px 24px 48px;
          }

          .sg-header-title {
            font-size: 40px;
          }

          .sg-section,
          .sg-section-alt {
            padding: 48px 24px;
          }

          .sg-logo-grid,
          .sg-buttons-grid,
          .sg-labels-grid {
            grid-template-columns: 1fr;
          }

          .sg-color-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .sg-color-grid-sm {
            grid-template-columns: repeat(2, 1fr);
          }

          .sg-emblem-grid {
            flex-wrap: wrap;
          }

          .sg-form-demo {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
