import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'NGUYEN Architecture & Engineering — Concept 04',
  description:
    'Private client demo for NGUYEN Architecture & Engineering featuring commercial, residential, ADU, engineering and permit services.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    title: 'NGUYEN Architecture & Engineering — Concept 04',
    description:
      'Architecture, engineering and permit solutions for commercial, residential and ADU projects.',
    type: 'website',
  },
};

export default function NguyenConcept04Layout({ children }: { children: ReactNode }) {
  return children;
}
