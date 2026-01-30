'use client';

import Image from 'next/image';

export default function LogoPage() {
  return (
    <div className="logo-page">
      <div className="logo-container">
        <Image
          src="/citadel-gold-face.png"
          alt="Citadel Gold"
          width={200}
          height={200}
          className="logo-img"
        />
        <div className="logo-text">
          <span>CITADEL</span>
          <span>GOLD</span>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&display=swap');

        html, body {
          background: #2a3328 !important;
        }

        .logo-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #2a3328;
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 48px;
        }

        .logo-img {
          border-radius: 50%;
          box-shadow: 0 16px 80px rgba(212, 175, 55, 0.4);
          width: 200px;
          height: 200px;
        }

        .logo-text {
          display: flex;
          flex-direction: column;
          align-items: center;
          line-height: 1;
        }

        .logo-text span {
          font-size: 80px;
          font-weight: 600;
          letter-spacing: 12px;
          background: linear-gradient(180deg, #d4af37, #f4e4a6, #d4af37);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-family: 'Cormorant Garamond', Georgia, serif;
        }
      `}</style>
    </div>
  );
}
