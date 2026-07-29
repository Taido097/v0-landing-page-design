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
  const demos = activeProduct.demos ?? [];
  const mainDemo = demos[0];
  const backDemo = demos[1] ?? demos[0];
  const sideDemo = demos[2] ?? demos[0];

  return (
    <section
      id="portfolio"
      className="scroll-mt-24 overflow-hidden border-y border-black/10 bg-[#f4f2ed] py-20 sm:py-24"
    >
      <style>{`
        @keyframes layeredPreviewIn {
          from { opacity: 0; transform: translateY(18px) scale(.985); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes serviceCopyIn {
          from { opacity: 0; transform: translateX(12px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .layered-preview-in { animation: layeredPreviewIn .5s ease both; }
        .service-copy-in { animation: serviceCopyIn .35s ease both; }
        @media (prefers-reduced-motion: reduce) {
          .layered-preview-in, .service-copy-in { animation: none; }
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
            Hover over a service to preview the design direction, what is included, and the full service page.
          </p>
        </div>

        <div className="grid overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_28px_90px_rgba(25,22,18,.08)] lg:grid-cols-[1.13fr_.87fr] sm:rounded-[2.5rem]">
          <div
            key={`preview-${activeProduct.slug}`}
            className={`layered-preview-in relative min-h-[500px] overflow-hidden p-5 sm:min-h-[650px] sm:p-8 lg:min-h-[720px] ${previewThemes[activeIndex % previewThemes.length]}`}
          >
            <div className="relative z-30 flex items-center justify-between gap-4">
              <span className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-black/50 backdrop-blur-md">
                DesignedbyTD preview
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-black/35">
                0{activeIndex + 1} / 0{serviceProducts.length}
              </span>
            </div>

            <div className="absolute left-[4%] top-[22%] z-0 hidden w-[40%] -rotate-[7deg] overflow-hidden rounded-[1.3rem] border border-black/10 bg-[#171717] shadow-[0_30px_70px_rgba(0,0,0,.2)] sm:block">
              <div className="flex h-9 items-center gap-1.5 border-b border-white/10 px-3">
                <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
              </div>
              <img
                src={backDemo?.image ?? activeProduct.image}
                alt={`${activeProduct.title} supporting sample`}
                className="aspect-[3/4] w-full object-cover opacity-75"
              />
            </div>

            <div className="absolute right-[3%] top-[17%] z-10 hidden w-[38%] rotate-[6deg] overflow-hidden rounded-[1.3rem] border border-black/10 bg-white shadow-[0_30px_70px_rgba(0,0,0,.18)] sm:block">
              <div className="flex h-9 items-center gap-1.5 border-b border-black/10 px-3">
                <span className="h-1.5 w-1.5 rounded-full bg-black/15" />
                <span className="h-1.5 w-1.5 rounded-full bg-black/15" />
                <span className="h-1.5 w-1.5 rounded-full bg-black/15" />
              </div>
              <img
                src={sideDemo?.image ?? activeProduct.image}
                alt={`${activeProduct.title} secondary sample`}
                className="aspect-[3/4] w-full object-cover"
              />
            </div>

            <div className="absolute inset-x-[7%] bottom-[7%] z-20 overflow-hidden rounded-[1.7rem] border border-black/10 bg-white p-2 shadow-[0_35px_90px_rgba(0,0,0,.23)] sm:inset-x-[12%] sm:bottom-[8%] sm:rounded-[2rem] sm:p-3">
              <div className="flex h-11 items-center justify-between border-b border-black/8 px-3 sm:h-12 sm:px-4">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full bg-black/15" />
                  <span className="h-2 w-2 rounded-full bg-black/15" />
                  <span className="h-2 w-2 rounded-full bg-black/15" />
                </div>
                <span className="rounded-full bg-black/[.04] px-4 py-1.5 text-[9px] uppercase tracking-[.16em] text-black/40">
                  {activeProduct.label}
                </span>
              </div>

              <div className="relative overflow-hidden rounded-b-[1.35rem] sm:rounded-b-[1.6rem]">
                <img
                  src={mainDemo?.image ?? activeProduct.image}
                  alt={`${activeProduct.title} main sample website`}
                  className="aspect-[16/11] w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-5 pt-24 text-white sm:p-8 sm:pt-32">
                  <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-white/60">
                    {activeProduct.label}
                  </p>
                  <p className="mt-3 max-w-xl text-2xl font-medium leading-tight tracking-[-0.025em] sm:text-4xl">
                    {activeProduct.previewTitle}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col border-t border-black/10 bg-[#fbfaf7] p-6 sm:p-9 lg:border-l lg:border-t-0 lg:p-10 xl:p-12">
            <div className="border-t border-black/12">
              {serviceProducts.map((product, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={product.slug}
                    type="button"
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    onClick={() => setActiveIndex(index)}
                    aria-pressed={isActive}
                    className={`group flex w-full items-center justify-between gap-5 border-b border-black/12 px-1 py-4 text-left transition sm:py-5 ${
                      isActive
                        ? 'my-2 rounded-xl border-b-transparent bg-black px-4 text-white shadow-[0_14px_35px_rgba(0,0,0,.12)]'
                        : 'text-black/45 hover:text-black'
                    }`}
                  >
                    <span className="text-xl font-medium tracking-[-0.025em] sm:text-2xl">
                      {product.title}
                    </span>
                    <ArrowRight
                      className={`h-4 w-4 shrink-0 transition ${
                        isActive
                          ? 'translate-x-0 text-white'
                          : '-translate-x-1 text-black/20 group-hover:translate-x-0 group-hover:text-black'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div key={`copy-${activeProduct.slug}`} className="service-copy-in mt-8 sm:mt-10">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-black/35">
                What is included
              </p>
              <p className="mt-4 text-base font-light leading-7 text-black/65 sm:text-lg">
                {activeProduct.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {activeProduct.features.slice(0, 3).map((feature) => (
                  <span
                    key={feature}
                    className="rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-light text-black/55"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <Link
                href={`/services/${activeProduct.slug}`}
                className="group mt-7 inline-flex items-center gap-3 rounded-full bg-black px-6 py-3.5 text-sm font-medium text-white transition hover:bg-black/80"
              >
                View service
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
