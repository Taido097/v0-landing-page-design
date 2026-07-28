import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Orange County Website Designer | Affordable Small Business Websites',
  description:
    'Local Orange County website designer creating affordable, mobile-friendly websites for small businesses. Website packages start at $500.',
  keywords: [
    'Orange County website designer',
    'website design Orange County',
    'affordable website designer Orange County',
    'local website builder',
    'small business website design Orange County',
  ],
  alternates: {
    canonical: 'https://designedbytd.com/orange-county-web-design',
  },
};

const services = [
  'Custom design built around your business',
  'Mobile-friendly layout',
  'Contact forms and clear calls to action',
  'Basic local SEO setup',
  'Fast-loading pages',
  'Launch and post-launch support',
];

export default function OrangeCountyWebDesignPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-24 text-black">
        <section className="border-b border-gray-200 py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-gray-600">
              Local Web Design · Orange County, California
            </p>
            <h1 className="max-w-4xl text-5xl font-light leading-tight sm:text-6xl">
              Affordable website design for Orange County small businesses
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-700">
              Designed by TD builds modern, mobile-friendly websites for local businesses that need a stronger online presence without agency-level pricing. Starter websites begin at $500.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="rounded-none bg-black px-7 py-6 text-white hover:bg-gray-800">
                <Link href="/contact">Request a Website Quote</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-none border-black px-7 py-6">
                <Link href="/#portfolio">View Website Examples</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto grid max-w-5xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <h2 className="text-3xl font-light">A local website builder for real small businesses</h2>
              <p className="mt-5 leading-relaxed text-gray-700">
                I work with service businesses, restaurants, salons, auto shops, photographers, retailers, and other local companies throughout Orange County. Every website is designed to look professional, explain your services clearly, and make it easy for customers to contact you.
              </p>
              <p className="mt-4 leading-relaxed text-gray-700">
                Service is available throughout Garden Grove, Westminster, Huntington Beach, Costa Mesa, Santa Ana, Anaheim, Irvine, and nearby Orange County communities.
              </p>
            </div>
            <div className="border border-gray-300 p-8">
              <h2 className="text-2xl font-light">What is included</h2>
              <div className="mt-6 space-y-4">
                {services.map((service) => (
                  <div key={service} className="flex gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0" />
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-black py-20 text-white">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-4xl font-light">Need an affordable local website?</h2>
            <p className="mx-auto mt-5 max-w-2xl text-gray-300">
              Tell me about your business, the pages you need, and your budget. I will recommend the best starting option.
            </p>
            <Button asChild className="mt-8 rounded-none bg-white px-8 py-6 text-black hover:bg-gray-100">
              <Link href="/contact">Start Your Project</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
