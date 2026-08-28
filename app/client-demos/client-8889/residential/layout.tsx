import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'NGUYEN Architecture & Engineering — Residential',
  description:
    'Private client demo for NGUYEN Architecture & Engineering — residential architecture, engineering and permitting: custom homes, additions, remodels, ADUs and multifamily.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    title: 'NGUYEN Architecture & Engineering — Residential',
    description:
      'Residential architecture, engineering and permitting: custom homes, additions, remodels, ADUs and multifamily.',
    type: 'website',
  },
};

export default function NguyenResidentialLayout({ children }: { children: ReactNode }) {
  return <div className={inter.variable}>{children}</div>;
}
