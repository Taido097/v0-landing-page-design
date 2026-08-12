import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Orange County Web Design Services for Small Businesses',
  description:
    'Orange County web design services for small businesses. Custom, responsive, mobile-friendly websites with clear calls to action, basic SEO, and launch support.',
  keywords: [
    'Orange County web design services',
    'website design Orange County',
    'website designer Orange County',
    'web design company Orange County',
    'responsive website design Orange County CA',
    'mobile friendly website design Orange County CA',
    'small business web design Orange County',
  ],
  alternates: {
    canonical: 'https://designedbytd.com/orange-county-web-design',
  },
  openGraph: {
    title: 'Orange County Web Design Services for Small Businesses',
    description:
      'Custom, responsive website design for Orange County small businesses, with real demos and packages starting at $500.',
    url: 'https://designedbytd.com/orange-county-web-design',
    type: 'website',
  },
};

const services = [
  'Custom design built around your business and services',
  'Responsive layouts for phones, tablets, and desktops',
  'Clear contact forms and calls to action',
  'Basic on-page and local SEO setup',
  'Fast-loading page structure',
  'Launch and post-launch support',
];

const faqs = [
  {
    question: 'How much does web design cost in Orange County?',
    answer:
      'Starter websites begin at $500. Final pricing depends on the number of pages, custom features, booking tools, e-commerce, integrations, and the amount of content required.',
  },
  {
    question: 'Will my website be mobile friendly and responsive?',
    answer:
      'Yes. Every website is designed to adapt across phones, tablets, laptops, and desktop screens so customers can browse and contact your business comfortably from any device.',
  },
  {
    question: 'Do you work with businesses throughout Orange County?',
    answer:
      'Yes. Website design is available for businesses throughout Orange County, including Irvine, Anaheim, Costa Mesa, Huntington Beach, Garden Grove, Westminster, Santa Ana, Tustin, and nearby communities.',
  },
];

export default function OrangeCountyWebDesignPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'Orange County Web Design Services',
        serviceType: 'Custom website design for small businesses',
        provider: {
          '@type': 'ProfessionalService',
          name: 'Designed by TD',
          url: 'https://designedbytd.com',
        },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'Orange County, California',
        },
        url: 'https://designedbytd.com/orange-county-web-design',
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#fafafa] pt-24 text-[#121212]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

        <section className="border-b border-black/10 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-black/45">
              Orange County, California · Small Business Web Design
            </p>
            <h1 className="max-w-5xl text-[clamp(3.5rem,7vw,6.25rem)] font-medium leading-[.9] tracking-[-0.06em]">
              Orange County web design services built for small businesses.
            </h1>
            <p className="mt-7 max-w-3xl text-lg font-light leading-relaxed text-black/65">
              Designed by TD creates custom, mobile-friendly websites for Orange County businesses that need a cleaner online presence, clearer services, and an easier way for customers to call, request a quote, book, or get in touch.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="rounded-full bg-black px-7 py-6 text-white hover:bg-black/85">
                <Link href="/contact">Request a Website Quote</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-black/20 bg-white px-7 py-6 hover:bg-black hover:text-white">
                <Link href="/demos">View Website Demos</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <h2 className="text-4xl font-medium leading-[1] tracking-[-0.045em] sm:text-5xl">
                Responsive websites designed around how customers choose a business.
              </h2>
              <p className="mt-6 font-light leading-relaxed text-black/65">
                Most visitors want quick answers: what you do, where you work, whether they can trust you, and how to contact you. The site structure is built around those decisions instead of filling pages with unnecessary content.
              </p>
              <p className="mt-5 font-light leading-relaxed text-black/65">
                Service is available throughout Orange County, including Irvine, Anaheim, Costa Mesa, Huntington Beach, Garden Grove, Westminster, Santa Ana, Tustin, and nearby communities. For a city-focused option, see <Link href="/web-design-irvine" className="font-medium text-black underline underline-offset-4">web design in Irvine</Link>.
              </p>
            </div>

            <div className="rounded-xl border border-black/10 bg-white p-7 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-black/40">What is included</p>
              <div className="mt-7 space-y-4">
                {services.map((service) => (
                  <div key={service} className="flex gap-3 border-b border-black/10 pb-4 last:border-b-0 last:pb-0">
                    <Check className="mt-0.5 h-5 w-5 shrink-0" />
                    <span className="text-sm font-light leading-relaxed text-black/70">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-black/10 bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-3 md:grid-cols-3">
              <article className="rounded-xl border border-black/10 p-6">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-black/35">01</p>
                <h2 className="mt-10 text-3xl font-medium tracking-[-0.04em]">Mobile friendly</h2>
                <p className="mt-4 text-sm font-light leading-relaxed text-black/60">
                  Responsive layouts make services, menus, forms, and contact buttons easy to use on smaller screens.
                </p>
              </article>
              <article className="rounded-xl border border-black/10 p-6">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-black/35">02</p>
                <h2 className="mt-10 text-3xl font-medium tracking-[-0.04em]">Clear conversion paths</h2>
                <p className="mt-4 text-sm font-light leading-relaxed text-black/60">
                  Strong calls to action help visitors move from browsing to calling, requesting a quote, booking, or sending a message.
                </p>
              </article>
              <article className="rounded-xl border border-black/10 p-6">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-black/35">03</p>
                <h2 className="mt-10 text-3xl font-medium tracking-[-0.04em]">Search-ready structure</h2>
                <p className="mt-4 text-sm font-light leading-relaxed text-black/60">
                  Descriptive headings, crawlable pages, internal links, and basic on-page SEO give search engines a clearer understanding of the business.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-medium tracking-[-0.045em] sm:text-5xl">Orange County web design questions</h2>
            <div className="mt-10 border-t border-black/10">
              {faqs.map((item) => (
                <article key={item.question} className="border-b border-black/10 py-7">
                  <h3 className="text-xl font-medium tracking-[-0.025em]">{item.question}</h3>
                  <p className="mt-3 font-light leading-relaxed text-black/60">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-black py-20 text-white sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="max-w-4xl text-5xl font-medium leading-[.95] tracking-[-0.055em] sm:text-6xl">
              Need a better website for your Orange County business?
            </h2>
            <p className="mt-6 max-w-2xl font-light leading-relaxed text-white/65">
              Browse the full demo library, then send a few details about your business and the type of website you need.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="rounded-full bg-white px-8 py-6 text-black hover:bg-white/90">
                <Link href="/contact">Start Your Project</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-white/25 bg-transparent px-8 py-6 text-white hover:bg-white hover:text-black">
                <Link href="/demos">Explore All Demos</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
