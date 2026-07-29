import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { PortfolioSection } from '@/components/portfolio-section';
import { HowWeWorkSection } from '@/components/how-we-work-section';
import { CaseStudiesSection } from '@/components/case-studies-section';
import { PricingSection } from '@/components/pricing-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { CTASection } from '@/components/cta-section';
import { Footer } from '@/components/footer';

export const metadata = {
  title: 'Affordable Web Designer in Orange County | Designed by TD',
  description:
    'Affordable website design for Orange County small businesses. Custom, mobile-friendly websites starting at $500. Get a free website quote from Designed by TD.',
  keywords: [
    'website designer Orange County',
    'affordable web design Orange County',
    'small business website design',
    'local web designer near me',
    'website builder Orange County',
    'custom website design',
    'web design starting at $500',
    'Designed by TD',
  ],
  alternates: {
    canonical: 'https://designedbytd.com/',
  },
  openGraph: {
    title: 'Affordable Web Designer in Orange County | Designed by TD',
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
        <PortfolioSection />
        <HowWeWorkSection />
        <CaseStudiesSection />
        <PricingSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
