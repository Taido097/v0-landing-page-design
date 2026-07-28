import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { TrustSection } from '@/components/trust-section';
import { VisualServicesSection } from '@/components/visual-services-section';
import { PortfolioSection } from '@/components/portfolio-section';
import { HowWeWorkSection } from '@/components/how-we-work-section';
import { CaseStudiesSection } from '@/components/case-studies-section';
import { PricingSection } from '@/components/pricing-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { FAQSection } from '@/components/faq-section';
import { CTASection } from '@/components/cta-section';
import { Footer } from '@/components/footer';

export const metadata = {
  title: 'Affordable Website Design in Orange County | Designed by TD',
  description:
    'Affordable local website design for small businesses in Orange County, California. Custom mobile-friendly websites starting at $500 from Designed by TD.',
  keywords: [
    'website design Orange County',
    'affordable website design Orange County',
    'cheap website design Orange County',
    'local website designer',
    'website builder near me',
    'small business website designer',
    'Orange County web designer',
    'Designed by TD',
    'DesignedbyTD Studio',
  ],
  alternates: {
    canonical: 'https://designedbytd.com/',
  },
  openGraph: {
    title: 'Affordable Website Design in Orange County | Designed by TD',
    description:
      'Custom, mobile-friendly websites for Orange County small businesses, with packages starting at $500.',
    type: 'website',
    url: 'https://designedbytd.com/',
    siteName: 'Designed by TD',
    images: ['/icon.png'],
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col">
        <HeroSection />
        <TrustSection />
        <VisualServicesSection />
        <PortfolioSection />
        <HowWeWorkSection />
        <CaseStudiesSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
