import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Tai Do - Custom Web Design Services',
  description:
    'Get in touch with Tai Do for custom web design services. Free consultation for small businesses and entrepreneurs.',
  openGraph: {
    title: 'Contact Tai Do - Custom Web Design Services',
    description:
      'Get in touch with Tai Do for custom web design services.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Tai Do - Custom Web Design Services',
    description:
      'Get in touch with Tai Do for custom web design services.',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
