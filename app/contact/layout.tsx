import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get a Website Quote in Orange County',
  description:
    'Contact Designed by TD for a custom website quote in Orange County. Ask about portfolio, eCommerce, scheduling, lead-capture, or custom small-business websites starting at $500.',
  keywords: [
    'website quote Orange County',
    'web designer Orange County contact',
    'small business website quote',
    'custom website quote',
    'Designed by TD contact',
  ],
  alternates: {
    canonical: 'https://designedbytd.com/contact',
  },
  openGraph: {
    title: 'Get a Website Quote in Orange County',
    description:
      'Tell Designed by TD about your business and get a quote for a custom small-business website in Orange County.',
    type: 'website',
    url: 'https://designedbytd.com/contact',
    siteName: 'Designed by TD',
    images: ['/icon.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get a Website Quote in Orange County',
    description:
      'Request a quote for a custom portfolio, eCommerce, scheduling, lead-capture, or small-business website.',
    images: ['/icon.png'],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
