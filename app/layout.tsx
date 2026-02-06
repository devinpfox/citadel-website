import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "name": "Citadel Gold",
  "url": "https://www.citadelgold.com",
  "logo": "https://www.citadelgold.com/images/logo.png",
  "description": "Citadel Gold helps investors protect their wealth through physical gold and silver with transparent pricing and dedicated advisors.",
  "areaServed": "US",
  "telephone": "+1-800-605-5597",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "30851 Agoura Rd #205",
    "addressLocality": "Agoura Hills",
    "addressRegion": "CA",
    "postalCode": "91301",
    "addressCountry": "US"
  }
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Citadel Gold – Precious Metals",
    template: "%s | Citadel Gold",
  },
  description: "Invest in physical gold and silver with transparent pricing, dedicated advisors, and a trusted buyback program. Protect your wealth with Citadel Gold.",
  keywords: ["buy physical gold", "gold bullion for sale", "invest in gold and silver", "precious metals investment", "gold wealth protection", "buy silver bullion", "trusted gold dealer"],
  authors: [{ name: "Citadel Gold" }],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    title: "Citadel Gold | Trusted Gold & Silver Advisors",
    description: "Protect your wealth with physical gold and silver. Transparent pricing, expert advisors, and guaranteed liquidity.",
    url: "https://www.citadelgold.com/",
    siteName: "Citadel Gold",
    images: [
      {
        url: "https://www.citadelgold.com/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Citadel Gold - Trusted Gold & Silver Advisors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Citadel Gold | Physical Gold & Silver Investment Experts",
    description: "Secure your wealth with physical gold and silver. White-glove service and a trusted buyback program.",
    images: ["https://www.citadelgold.com/images/og-home.jpg"],
  },
  alternates: {
    canonical: "https://www.citadelgold.com/",
  },
  other: {
    "og:type": "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
