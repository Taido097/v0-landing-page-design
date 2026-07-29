'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { serviceProducts } from '@/lib/service-products';

const previewThemes = [
  'bg-[#e7e1d8]',
  'bg-[#dce8f7]',
  'bg-[#dfeee6]',
  'bg-[#dce9f3]',
  'bg-[#ebe3f1]',
  'bg-[#efe1c8]',
];

export function PortfolioSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProduct = serviceProducts[activeIndex];

  return (
    <section
      id="portfolio"
      className="scroll-mt-24 overflow-hidden border-y border-black/10 bg-[#f4f2ed] py-20 sm:py-24"
    >
      <style>{`
        @keyframes directPreviewIn {
          from { opacity: 0; transform: translateY(14px) scale(.99); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes serviceCopyIn {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .direct-preview-in { animation: directPreviewIn .45s ease both; }
        .service-copy-in { animation: serviceCopyIn .32s ease both; }
        @media (prefers-reduced-motion: reduce) {
          .direct-preview-in, .service-copy-in { animation: none; }
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-7 lg:grid-cols-[1fr_.72fr] lg:items-end sm:mb-16">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.26em] text-black/45">
              What I can build
            </p>
            <h2 className="mt-4 max-w-4xl text-4xl font-medium leading-[1.04] tracking-[-0.04em] text-black sm:text-5xl lg:text-6xl">
              Website products shaped around your business.
            </h2>
          </div>
          <p className="max-w-xl text-base font-light leading-7 text-black/60 lg:justify-self-end sm:text-lg">
            Hover to preview a service. Click any card to view everything included.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-start lg:gap-10">
          <Link
            key={activeProduct.slug}
            href={`/services/${activeProduct.slug}`}
            className={`direct-preview-in group relative min-h-[460px] overflow-hidden rounded-[2rem] border border-black/10 shadow-[0_28px_80px_rgba(25,22,18,.12)] sm:min-h-[620px] ${previewThemes[activeIndex % previewThemes.length]}`}
            aria-label={`View ${activeProduct.title} service`}
          >
            <img
              src={activeProduct.image}
              alt={`${activeProduct.title} service preview`}
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80" />

            <div className="absolute left-5 top-5 rounded-full border border-white/30 bg-black/20 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white backdrop-blur-md sm:left-7 sm:top-7">
              DesignedbyTD preview
            </div>

            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-9">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/65">
                {activeProduct.label}
              </p>
              <h3 className="mt-3 max-w-2xl text-4xl font-medium leading-[1.02] tracking-[-0.04em] sm:text-5xl">
                {activeProduct.previewTitle}
              </h3>
              <span className="mt-6 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-medium text-black">
                View service
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </Link>

          <div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {serviceProducts.map((product, index) => {
                const isActive = index === activeIndex;

                return (
                  <Link
                    key={product.slug}
                    href={`/services/${product.slug}`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`group flex min-h-28 items-center gap-4 rounded-[1.35rem] border p-3.5 transition duration-300 sm:p-4 ${
                      isActive
                        ? 'border-black bg-black text-white shadow-[0_16px_40px_rgba(0,0,0,.14)]'
                        : 'border-black/10 bg-white text-black hover:-translate-y-0.5 hover:border-black/25 hover:shadow-[0_12px_32px_rgba(0,0,0,.08)]'
                    }`}
                  >
                    <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-28">
                      <img
                        src={product.image}
                        alt={`${product.title} service`}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-black/5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className={`text-[9px] font-medium uppercase tracking-[0.18em] ${isActive ? 'text-white/45' : 'text-black/35'}`}>
                        {product.label}
                      </p>
                      <p className="mt-2 text-xl font-medium tracking-[-0.025em] sm:text-2xl">
                        {product.title}
                      </p>
                    </div>

                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition ${
                        isActive
                          ? 'border-white/25 bg-white text-black'
                          : 'border-black/12 bg-[#f7f5f0] text-black group-hover:bg-black group-hover:text-white'
                      }`}
                    >
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                );
              })}
            </div>

            <div key={`copy-${activeProduct.slug}`} className="service-copy-in mt-7 rounded-[1.5rem] border border-black/10 bg-white p-6 sm:p-7">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-black/35">
                What is included
              </p>
              <p className="mt-4 text-base font-light leading-7 text-black/65">
                {activeProduct.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {activeProduct.features.slice(0, 3).map((feature) => (
                  <span
                    key={feature}
                    className="rounded-full border border-black/10 bg-[#f7f5f0] px-3 py-2 text-xs font-light text-black/55"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <Link
                href={`/services/${activeProduct.slug}`}
                className="group mt-6 inline-flex items-center gap-3 rounded-full bg-black px-6 py-3.5 text-sm font-medium text-white transition hover:bg-black/80"
              >
                View {activeProduct.title}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
