import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { PortfolioSection } from '@/components/portfolio-section';
import { HowWeWorkSection } from '@/components/how-we-work-section';
import { PricingSection } from '@/components/pricing-section';
import { FAQSection } from '@/components/faq-section';
import { CTASection } from '@/components/cta-section';
import { Footer } from '@/components/footer';

export const dynamic = 'force-static';

export const metadata = {
  title: {
    absolute: 'Orange County Web Design | Designed by TD',
  },
  description:
    'Orange County web design for small businesses. Custom, mobile-friendly websites for local service businesses, restaurants, salons, and more. Packages start at $500.',
  keywords: [
    'Orange County web design',
    'web design Orange County',
    'Orange County website design',
    'website design Orange County CA',
    'website designer Orange County',
    'web design company Orange County',
    'small business web design Orange County',
    'responsive website design Orange County',
    'mobile friendly website design Orange County',
    'custom website design Orange County',
    'Designed by TD',
  ],
  alternates: {
    canonical: 'https://designedbytd.com/',
  },
  openGraph: {
    title: 'Orange County Web Design | Designed by TD',
    description:
      'Custom, mobile-friendly web design for Orange County small businesses. Explore real website demos and packages starting at $500.',
    type: 'website',
    url: 'https://designedbytd.com/',
    siteName: 'Designed by TD',
    images: ['/icon.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Orange County Web Design | Designed by TD',
    description:
      'Custom, mobile-friendly web design for Orange County small businesses. Explore real website demos and packages starting at $500.',
    images: ['/icon.png'],
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col">
        <HeroSection />
        <PortfolioSection />
        <HowWeWorkSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
