import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { getServiceProduct, serviceProducts } from '@/lib/service-products';

export function generateStaticParams() {
  return serviceProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getServiceProduct(slug);

  if (!product) return {};

  return {
    title: `${product.title} Service | Designed by TD`,
    description: product.heroDescription,
    alternates: {
      canonical: `https://designedbytd.com/services/${product.slug}`,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getServiceProduct(slug);

  if (!product) notFound();

  const contactHref = `/contact?service=${encodeURIComponent(product.title)}`;

  return (
    <>
      <Header />
      <main className="bg-white pt-20 text-[#121212]">
        <section className="overflow-hidden border-b border-black/10 bg-[#d9d4ff] py-14 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/#portfolio"
              className="inline-flex items-center gap-2 text-sm text-black/60 transition hover:text-black"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to services
            </Link>

            <div className="mt-12 grid gap-14 lg:grid-cols-[minmax(0,.84fr)_minmax(0,1.16fr)] lg:items-center lg:gap-16">
              <div className="relative z-10">
                <p className="text-xs font-medium uppercase tracking-[0.26em] text-black/50">
                  {product.label}
                </p>
                <h1 className="mt-5 max-w-3xl text-5xl font-medium leading-[.98] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                  {product.heroTitle}
                </h1>
                <p className="mt-7 max-w-2xl text-lg font-light leading-8 text-black/65">
                  {product.heroDescription}
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Link
                    href={contactHref}
                    className="inline-flex items-center gap-3 rounded-full bg-black px-7 py-3.5 text-sm font-medium text-white transition hover:gap-4 hover:bg-black/80"
                  >
                    Start this project
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href="#samples"
                    className="inline-flex items-center rounded-full border border-black/20 bg-white/35 px-7 py-3.5 text-sm font-medium backdrop-blur-sm transition hover:border-black hover:bg-white/60"
                  >
                    View samples
                  </a>
                </div>
              </div>

              <div className="relative min-h-[500px] sm:min-h-[620px] lg:min-h-[660px]">
                <div className="absolute left-[2%] top-[17%] w-[58%] rotate-[-7deg] overflow-hidden rounded-2xl border border-black/15 bg-white shadow-[0_24px_65px_rgba(0,0,0,.2)] sm:left-[5%] sm:w-[55%]">
                  <BrowserBar label={product.demos[0].category} />
                  <img
                    src={product.demos[0].image}
                    alt={product.demos[0].title}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>

                <div className="absolute right-[1%] top-[2%] z-10 w-[64%] rotate-[5deg] overflow-hidden rounded-2xl border border-black/15 bg-white shadow-[0_30px_80px_rgba(0,0,0,.24)] sm:right-[3%] sm:w-[61%]">
                  <BrowserBar label={product.demos[1].category} />
                  <img
                    src={product.demos[1].image}
                    alt={product.demos[1].title}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>

                <div className="absolute bottom-[3%] right-[8%] z-20 w-[58%] rotate-[-2deg] overflow-hidden rounded-2xl border border-black/15 bg-white shadow-[0_32px_90px_rgba(0,0,0,.28)] sm:right-[13%] sm:w-[56%]">
                  <BrowserBar label={product.demos[2].category} />
                  <div className="relative">
                    <img
                      src={product.demos[2].image}
                      alt={product.demos[2].title}
                      className="aspect-[4/3] w-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-5 pt-16 text-white">
                      <p className="text-[10px] uppercase tracking-[.2em] text-white/65">
                        Sample concept
                      </p>
                      <p className="mt-2 text-xl font-medium">{product.previewTitle}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-black/10 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-20">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.26em] text-black/45">
                  What is included
                </p>
                <h2 className="mt-4 text-4xl font-medium leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                  Everything needed to make the service useful for your business.
                </h2>
              </div>

              <div className="grid gap-px overflow-hidden border border-black/10 bg-black/10 sm:grid-cols-2">
                {product.features.map((feature) => (
                  <div key={feature} className="flex min-h-32 gap-4 bg-white p-6 sm:p-7">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black text-white">
                      <Check className="h-4 w-4" />
                    </span>
                    <p className="text-base font-light leading-7 text-black/70">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="samples" className="bg-[#f5f5f1] py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.26em] text-black/45">
                Sample website directions
              </p>
              <h2 className="mt-4 text-4xl font-medium leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                Your design will be customized, but these show what is possible.
              </h2>
            </div>

            <div className="mt-12 grid gap-7 lg:grid-cols-3">
              {product.demos.map((demo, index) => (
                <article
                  key={demo.title}
                  className={`overflow-hidden rounded-[1.5rem] border border-black/10 bg-white shadow-[0_20px_55px_rgba(0,0,0,.08)] ${
                    index === 1 ? 'lg:translate-y-10' : ''
                  }`}
                >
                  <BrowserBar label={demo.category} />
                  <img
                    src={demo.image}
                    alt={`${demo.title} sample website`}
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <div className="p-6">
                    <p className="text-[10px] font-medium uppercase tracking-[.22em] text-black/40">
                      {demo.category}
                    </p>
                    <h3 className="mt-3 text-2xl font-medium tracking-[-.025em]">{demo.title}</h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-black py-20 text-white sm:py-24">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.26em] text-white/45">
                Ready to begin?
              </p>
              <h2 className="mt-4 text-4xl font-medium leading-[1.04] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                Let’s build your {product.title.toLowerCase()} around the way your business works.
              </h2>
            </div>
            <Link
              href={contactHref}
              className="inline-flex shrink-0 items-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition hover:gap-4 hover:bg-white/85"
            >
              Get started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function BrowserBar({ label }: { label: string }) {
  return (
    <div className="flex h-10 items-center gap-3 border-b border-black/10 bg-white px-3">
      <div className="flex gap-1.5" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-black/15" />
        <span className="h-2 w-2 rounded-full bg-black/15" />
        <span className="h-2 w-2 rounded-full bg-black/15" />
      </div>
      <div className="truncate rounded-full bg-black/[.04] px-3 py-1 text-[9px] uppercase tracking-[.14em] text-black/40">
        {label}
      </div>
    </div>
  );
}
