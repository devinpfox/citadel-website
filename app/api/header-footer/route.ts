import { NextResponse } from 'next/server';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://citadelgold.com';

export async function GET() {
  const headerHTML = `
<nav class="cg-nav" id="cg-nav">
  <div class="nav-logo">
    <a href="${SITE_URL}">
      <img src="${SITE_URL}/citadel-logo-official.png" alt="Citadel Gold" class="nav-logo-official" />
    </a>
  </div>

  <div class="nav-links-desktop">
    <a href="${SITE_URL}" class="nav-link">Home</a>
    <a href="${SITE_URL}/buy-gold" class="nav-link">Buy Gold</a>
    <a href="${SITE_URL}/buy-silver" class="nav-link">Buy Silver</a>

    <div class="nav-dropdown-wrapper" onmouseenter="this.querySelector('.nav-dropdown').style.display='block'" onmouseleave="this.querySelector('.nav-dropdown').style.display='none'">
      <span class="nav-link nav-link-has-dropdown">
        Gold IRA/401K <span class="nav-chevron">&#9662;</span>
      </span>
      <div class="nav-dropdown" style="display:none">
        <a class="nav-dropdown-link" href="${SITE_URL}/gold-ira">Gold IRA</a>
        <a class="nav-dropdown-link" href="${SITE_URL}/gold-ira-guide">Gold IRA Guide</a>
        <a class="nav-dropdown-link" href="${SITE_URL}/ira-intake-form">IRA Intake Form</a>
        <a class="nav-dropdown-link" href="${SITE_URL}/gold-ira-rollover">What is a Gold IRA Rollover?</a>
        <a class="nav-dropdown-link" href="${SITE_URL}/why-invest-in-gold">Why Invest in Gold</a>
        <a class="nav-dropdown-link" href="${SITE_URL}/free-gold-ira-kit">Free Gold IRA Kit</a>
      </div>
    </div>

    <div class="nav-dropdown-wrapper" onmouseenter="this.querySelector('.nav-dropdown').style.display='block'" onmouseleave="this.querySelector('.nav-dropdown').style.display='none'">
      <span class="nav-link nav-link-has-dropdown">
        Resources <span class="nav-chevron">&#9662;</span>
      </span>
      <div class="nav-dropdown" style="display:none">
        <a class="nav-dropdown-link" href="${SITE_URL}/delaware-depository">Delaware Depository</a>
        <a class="nav-dropdown-link" href="${SITE_URL}/gold-ira-steps">Gold IRA Steps</a>
        <a class="nav-dropdown-link" href="${SITE_URL}/gold-vs-other-assets">Gold vs. Other Assets</a>
      </div>
    </div>

    <div class="nav-dropdown-wrapper" onmouseenter="this.querySelector('.nav-dropdown').style.display='block'" onmouseleave="this.querySelector('.nav-dropdown').style.display='none'">
      <span class="nav-link nav-link-has-dropdown">
        About Us <span class="nav-chevron">&#9662;</span>
      </span>
      <div class="nav-dropdown" style="display:none">
        <a class="nav-dropdown-link" href="${SITE_URL}/about-us">About Us</a>
        <a class="nav-dropdown-link" href="${SITE_URL}/why-choose-us">Why Choose Us?</a>
        <a class="nav-dropdown-link" href="${SITE_URL}/our-commitment">Our Commitment</a>
        <a class="nav-dropdown-link" href="${SITE_URL}/risk-disclosures">Risk Disclosures</a>
        <a class="nav-dropdown-link" href="${SITE_URL}/careers">Careers</a>
        <a class="nav-dropdown-link" href="${SITE_URL}/faqs">FAQs</a>
        <a class="nav-dropdown-link" href="${SITE_URL}/terms-and-conditions">Terms and Conditions</a>
        <a class="nav-dropdown-link" href="${SITE_URL}/contact">Contact</a>
      </div>
    </div>
  </div>

  <a href="tel:8006055597" class="nav-cta-desktop">Call Now 800-605-5597</a>

  <button class="hamburger" onclick="document.getElementById('cg-mobile-menu').classList.toggle('open');document.body.style.overflow=document.getElementById('cg-mobile-menu').classList.contains('open')?'hidden':'unset'" aria-label="Toggle menu">
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
  </button>
</nav>

<div class="mobile-menu" id="cg-mobile-menu">
  <div class="mobile-menu-content">
    <a class="mobile-menu-link" href="${SITE_URL}">Home</a>
    <a class="mobile-menu-link" href="${SITE_URL}/buy-gold">Buy Gold</a>
    <a class="mobile-menu-link" href="${SITE_URL}/buy-silver">Buy Silver</a>
    <a class="mobile-menu-link" href="${SITE_URL}/gold-ira">Gold IRA/401K</a>
    <a class="mobile-menu-link" href="${SITE_URL}/about-us">About Us</a>
    <a href="tel:8006055597" class="mobile-menu-cta">Call Now 800-605-5597</a>
  </div>
</div>`;

  const footerHTML = `
<footer class="footer cg-footer" style="background:#2a3328;padding:80px 60px 40px;">
  <div class="footer-grid">
    <div class="footer-brand">
      <div class="footer-trust-badges">
        <img src="${SITE_URL}/trust-badge-footer.png" alt="Secure Payments, Fast & Free Shipping, Premium Quality, 24/7 Customer Support" class="footer-badges-img" />
      </div>
      <div class="footer-logo">
        <a href="${SITE_URL}">
          <img src="${SITE_URL}/citadel-logo-official.png" alt="Citadel Gold" class="nav-logo-official" />
        </a>
      </div>
      <p class="footer-tagline">Guiding families toward lasting financial security through precious metals.</p>
    </div>
    <div class="footer-col">
      <h4 class="footer-col-title">Company</h4>
      <p class="footer-link"><a href="${SITE_URL}/about-us">About Us</a></p>
      <p class="footer-link"><a href="${SITE_URL}/our-team">Our Team</a></p>
      <p class="footer-link"><a href="${SITE_URL}/careers">Careers</a></p>
      <p class="footer-link"><a href="${SITE_URL}/press">Press</a></p>
    </div>
    <div class="footer-col">
      <h4 class="footer-col-title">Resources</h4>
      <p class="footer-link"><a href="${SITE_URL}/gold-ira-guide">Gold IRA Guide</a></p>
      <p class="footer-link"><a href="${SITE_URL}/market-news">Market News</a></p>
      <p class="footer-link"><a href="${SITE_URL}/faqs">FAQ</a></p>
      <p class="footer-link"><a href="${SITE_URL}/blog">Blog</a></p>
    </div>
    <div class="footer-col">
      <h4 class="footer-col-title">Private Client Line</h4>
      <p class="footer-link"><a href="tel:8006055597">800-605-5597</a></p>
      <p class="footer-link"><a href="mailto:info@citadelgold.com">info@citadelgold.com</a></p>
      <p class="footer-link">Los Angeles, CA</p>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2025 Citadel Gold. All rights reserved.</p>
  </div>
</footer>`;

  const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=Montserrat:wght@300;400;500;600&display=swap');

.cg-nav, .cg-footer, .cg-nav *, .cg-footer * { margin: 0; padding: 0; box-sizing: border-box; }

.cg-nav {
  position: fixed; top: 0; left: 0; right: 0;
  padding: 24px 60px; display: flex; justify-content: space-between; align-items: center;
  background: rgba(42, 51, 40, 0.97); backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(212, 175, 55, 0.15);
  z-index: 100; font-family: 'Cormorant Garamond', Georgia, serif;
}
.nav-logo { display: flex; align-items: center; gap: 12px; }
.nav-logo-official { height: 48px; width: auto; object-fit: contain; }
.nav-links-desktop { display: flex; gap: 36px; align-items: center; font-family: 'Montserrat', sans-serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; }
.nav-link { cursor: pointer; color: #a89f8c; transition: color 0.3s; text-decoration: none; }
.nav-link:hover { color: #d4af37; }
.nav-link-has-dropdown { display: flex; align-items: center; gap: 4px; }
.nav-chevron { font-size: 8px; transition: transform 0.3s; }
.nav-dropdown-wrapper { position: relative; }
.nav-dropdown-wrapper:hover .nav-chevron { transform: rotate(180deg); }
.nav-dropdown { position: absolute; top: 100%; left: 50%; transform: translateX(-50%); margin-top: 20px; background: rgba(42, 51, 40, 0.98); backdrop-filter: blur(20px); border: 1px solid rgba(212, 175, 55, 0.15); padding: 16px 0; min-width: 260px; z-index: 200; }
.nav-dropdown::before { content: ''; position: absolute; top: -20px; left: 0; right: 0; height: 20px; }
.nav-dropdown-link { display: block; padding: 12px 32px; font-family: 'Montserrat', sans-serif; font-size: 12px; letter-spacing: 1px; color: #a89f8c; text-decoration: none; cursor: pointer; transition: all 0.2s; }
.nav-dropdown-link:hover { color: #d4af37; background: rgba(212, 175, 55, 0.06); }
.nav-cta-desktop { padding: 14px 32px; background: transparent; border: 1px solid #d4af37; color: #d4af37; font-family: 'Montserrat', sans-serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; transition: all 0.3s; text-decoration: none; }
.nav-cta-desktop:hover { background: #d4af37; color: #2a3328; }
.hamburger { display: none; flex-direction: column; justify-content: space-between; width: 28px; height: 20px; background: transparent; border: none; cursor: pointer; padding: 0; z-index: 110; }
.hamburger-line { width: 100%; height: 2px; background: #d4af37; transition: all 0.3s ease; }
.mobile-menu { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(42, 51, 40, 0.98); z-index: 99; display: flex; align-items: center; justify-content: center; opacity: 0; visibility: hidden; transition: all 0.3s ease; }
.mobile-menu.open { opacity: 1; visibility: visible; }
.mobile-menu-content { display: flex; flex-direction: column; align-items: center; gap: 32px; }
.mobile-menu-link { font-family: 'Montserrat', sans-serif; font-size: 14px; letter-spacing: 3px; text-transform: uppercase; color: #a89f8c; cursor: pointer; transition: color 0.3s; text-decoration: none; }
.mobile-menu-link:hover { color: #d4af37; }
.mobile-menu-cta { margin-top: 24px; padding: 16px 40px; background: linear-gradient(135deg, #d4af37, #b8860b); border: none; color: #2a3328; font-family: 'Montserrat', sans-serif; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; font-weight: 600; text-decoration: none; display: inline-block; }

/* Footer */
.cg-footer { font-family: 'Cormorant Garamond', Georgia, serif; color: #f5f0e8; }
.footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 60px; max-width: 1200px; margin: 0 auto; }
.footer-logo { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
.footer-tagline { font-family: 'Montserrat', sans-serif; font-size: 13px; line-height: 1.8; color: #6a6358; max-width: 300px; }
.footer-col-title { font-family: 'Montserrat', sans-serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #d4af37; margin-bottom: 24px; }
.footer-link { font-family: 'Montserrat', sans-serif; font-size: 13px; color: #6a6358; margin-bottom: 12px; cursor: pointer; transition: color 0.3s; }
.footer-link:hover { color: #a89f8c; }
.footer-link a { color: inherit; text-decoration: none; }
.footer-link a:hover { color: #a89f8c; }
.footer-trust-badges { margin-bottom: 24px; }
.footer-badges-img { width: auto; height: 50px; object-fit: contain; }
.footer-bottom { margin-top: 60px; padding-top: 32px; border-top: 1px solid rgba(212, 175, 55, 0.08); text-align: center; }
.footer-bottom p { font-family: 'Montserrat', sans-serif; font-size: 11px; color: #4a4740; }

@media (max-width: 1024px) {
  .cg-nav { padding: 20px 40px; }
  .nav-links-desktop { display: none; }
  .nav-cta-desktop { display: none; }
  .hamburger { display: flex; }
  .cg-footer { padding: 60px 40px 40px !important; }
  .footer-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
}

@media (max-width: 640px) {
  .cg-nav { padding: 16px 20px; }
  .nav-logo-official { height: 36px !important; width: auto !important; }
  .cg-footer { padding: 48px 20px 32px !important; }
  .footer-grid { grid-template-columns: 1fr; gap: 32px; text-align: center; }
  .footer-trust-badges { display: flex; justify-content: center; }
  .footer-logo { justify-content: center; }
  .footer-tagline { margin: 0 auto; }
  .footer-col-title { margin-bottom: 16px; }
}
`;

  const scrollScript = `
<script>
(function() {
  var nav = document.getElementById('cg-nav');
  if (!nav) return;
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      nav.style.background = 'rgba(42, 51, 40, 0.97)';
      nav.style.backdropFilter = 'blur(20px)';
      nav.style.borderBottom = '1px solid rgba(212, 175, 55, 0.15)';
    } else {
      nav.style.background = 'rgba(42, 51, 40, 0.97)';
    }
  });
})();
</script>`;

  return NextResponse.json(
    {
      header: headerHTML,
      footer: footerHTML,
      css,
      script: scrollScript,
      // Convenience: full snippet WordPress can drop in
      snippet: `<style>${css}</style>\n${headerHTML}\n${scrollScript}`,
      footerSnippet: `<style>${css}</style>\n${footerHTML}`,
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    }
  );
}
