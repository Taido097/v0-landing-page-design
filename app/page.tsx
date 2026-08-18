import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { PortfolioSection } from '@/components/portfolio-section';
import { HowWeWorkSection } from '@/components/how-we-work-section';
import { PricingSection } from '@/components/pricing-section';
import { FAQSection } from '@/components/faq-section';
import { CTASection } from '@/components/cta-section';
import { Footer } from '@/components/footer';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: {
    absolute: 'DesignedbyTD Studio | Custom Websites for Small Businesses',
  },
  description:
    'Custom, mobile-friendly websites for small businesses. Explore DesignedbyTD website demos, transparent packages starting at $500, and web design services across Orange County.',
  alternates: {
    canonical: 'https://designedbytd.com/',
  },
  openGraph: {
    title: 'DesignedbyTD Studio | Custom Websites for Small Businesses',
    description:
      'Custom, mobile-friendly websites for small businesses. Explore real website demos and transparent packages starting at $500.',
    type: 'website',
    url: 'https://designedbytd.com/',
    siteName: 'Designed by TD',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DesignedbyTD Studio | Custom Websites for Small Businesses',
    description:
      'Custom, mobile-friendly websites for small businesses. Explore real website demos and transparent packages starting at $500.',
  },
};

export default function Home() {
  return (
    <div className="designedbytd-site">
      <style>{`
        .designedbytd-site,
        .designedbytd-site *:not(svg):not(path) {
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
        }
      `}</style>
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
    </div>
  );
}
