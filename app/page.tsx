import { Metadata } from 'next';
import CitadelGoldRedesignV2 from './homepage/page';

export const metadata: Metadata = {
  title: "Citadel Gold | Buy Physical Gold & Silver with Trusted Experts",
  description: "Invest in physical gold and silver with transparent pricing, dedicated advisors, and a trusted buyback program. Protect your wealth with Citadel Gold.",
};

export default function Home() {
  return <CitadelGoldRedesignV2 />;
}
