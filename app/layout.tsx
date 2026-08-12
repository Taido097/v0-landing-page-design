import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { EcommerceGalleryAutoScrollLoader } from '@/components/ecommerce-gallery-autoscroll-loader'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://designedbytd.com'),
  title: {
    default: 'Orange County Web Designer | Designed by TD',
    template: '%s | Designed by TD',
  },
  description:
    'Custom, mobile-friendly website design for Orange County small businesses, including portfolio, eCommerce, scheduling, lead-capture, and custom website builds.',
  keywords: [
    'Designed by TD',
    'DesignedbyTD Studio',
    'Orange County web designer',
    'web design Orange County',
    'small business web design',
    'custom website design',
    'eCommerce website design',
    'booking website design',
    'portfolio website design',
  ],
  applicationName: 'Designed by TD',
  authors: [{ name: 'Tai Do', url: 'https://designedbytd.com' }],
  creator: 'Designed by TD',
  publisher: 'Designed by TD',
  category: 'web design',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'Orange County Web Designer | Designed by TD',
    description:
      'Custom websites for Orange County small businesses, including portfolio, eCommerce, scheduling, lead-capture, and custom builds.',
    type: 'website',
    locale: 'en_US',
    url: 'https://designedbytd.com',
    siteName: 'Designed by TD',
    images: [
      {
        url: '/icon.png',
        width: 512,
        height: 512,
        alt: 'Designed by TD logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Orange County Web Designer | Designed by TD',
    description:
      'Custom websites for Orange County small businesses, including portfolio, eCommerce, scheduling, and lead-capture builds.',
    images: ['/icon.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Designed by TD',
    alternateName: 'DesignedbyTD Studio',
    url: 'https://designedbytd.com',
    logo: 'https://designedbytd.com/icon.png',
    image: 'https://designedbytd.com/icon.png',
    description:
      'Custom, mobile-friendly website design for small businesses in Orange County, California.',
    email: 'designedbytd.studio@gmail.com',
    priceRange: '$500+',
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Orange County, California',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Website Design Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom Website Design',
            serviceType: 'Custom website design',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Portfolio Website Design',
            serviceType: 'Portfolio website design',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'eCommerce Website Design',
            serviceType: 'eCommerce website design',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Scheduling Website Design',
            serviceType: 'Booking and scheduling website design',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Lead Capture Website Design',
            serviceType: 'Lead capture website design',
          },
        },
      ],
    },
  }

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <EcommerceGalleryAutoScrollLoader />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
