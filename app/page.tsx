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
  title: 'Orange County Web Designer for Small Businesses',
  description:
    'Designed by TD builds custom, mobile-friendly websites for Orange County small businesses, including portfolio, eCommerce, scheduling, and lead-capture sites. Packages start at $500.',
  keywords: [
    'Orange County web designer',
    'web design Orange County',
    'small business website design Orange County',
    'custom website design Orange County',
    'eCommerce web design Orange County',
    'booking website design',
    'portfolio website designer',
    'lead capture website design',
    'affordable web design Orange County',
    'website design starting at $500',
    'Designed by TD',
  ],
  alternates: {
    canonical: 'https://designedbytd.com/',
  },
  openGraph: {
    title: 'Orange County Web Designer for Small Businesses',
    description:
      'Custom websites for Orange County small businesses, including portfolio, eCommerce, scheduling, and lead-capture experiences. Packages start at $500.',
    type: 'website',
    url: 'https://designedbytd.com/',
    siteName: 'Designed by TD',
    images: ['/icon.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Orange County Web Designer for Small Businesses',
    description:
      'Custom websites for Orange County small businesses, with portfolio, eCommerce, scheduling, and lead-capture options starting at $500.',
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
