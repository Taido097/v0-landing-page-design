import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { EcommerceGalleryAutoScrollLoader } from '@/components/ecommerce-gallery-autoscroll-loader'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://designedbytd.com'),
  title: {
    default: 'Designed by TD | Custom Web Design in Orange County',
    template: '%s | Designed by TD',
  },
  description:
    'Designed by TD creates modern, mobile-friendly websites for small businesses in Orange County, California.',
  keywords: [
    'Designed by TD',
    'DesignedbyTD Studio',
    'Orange County web designer',
    'small business web design',
    'custom website design',
  ],
  applicationName: 'Designed by TD',
  authors: [{ name: 'Tai Do', url: 'https://designedbytd.com' }],
  creator: 'Designed by TD',
  publisher: 'Designed by TD',
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
    title: 'Designed by TD | Custom Web Design in Orange County',
    description:
      'Modern, mobile-friendly websites for small businesses in Orange County, California.',
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
    title: 'Designed by TD | Custom Web Design in Orange County',
    description:
      'Modern, mobile-friendly websites for small businesses in Orange County, California.',
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
      'Custom website design for small businesses in Orange County, California.',
    email: 'designedbytd.studio@gmail.com',
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Orange County, California',
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
