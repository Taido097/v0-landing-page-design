import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { TrustSection } from '@/components/trust-section';
import { PortfolioSection } from '@/components/portfolio-section';
import { HowWeWorkSection } from '@/components/how-we-work-section';
import { CaseStudiesSection } from '@/components/case-studies-section';
import { PricingSection } from '@/components/pricing-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { FAQSection } from '@/components/faq-section';
import { CTASection } from '@/components/cta-section';
import { Footer } from '@/components/footer';

export const metadata = {
  title: 'Tai Do - Custom Web Design for Small Businesses',
  description:
    'Award-winning web design for small business owners and entrepreneurs. Beautiful, high-converting websites that help you grow online.',
  keywords: 'web design, custom websites, small business, portfolio, services',
  openGraph: {
    title: 'Tai Do - Custom Web Design for Small Businesses',
    description:
      'Award-winning web design for small business owners and entrepreneurs.',
    type: 'website',
    url: 'https://taido.com',
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col">
        <HeroSection />
        <TrustSection />
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
