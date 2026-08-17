import type { Metadata } from 'next';
import { SheltaStyleHomepage } from '@/components/shelta-style-homepage';

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
  return <SheltaStyleHomepage />;
}
