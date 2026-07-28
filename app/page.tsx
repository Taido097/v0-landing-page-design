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
  title: 'Designed by TD | Custom Web Design in Orange County',
  description:
    'Designed by TD creates modern, mobile-friendly websites for small businesses in Orange County, California. View services, pricing, and recent work.',
  keywords: [
    'Designed by TD',
    'DesignedbyTD Studio',
    'Orange County web designer',
    'small business web design',
    'custom website design',
  ],
  alternates: {
    canonical: 'https://designedbytd.com/',
  },
  openGraph: {
    title: 'Designed by TD | Custom Web Design in Orange County',
    description:
      'Modern, mobile-friendly websites for small businesses in Orange County, California.',
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
