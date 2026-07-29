'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';
import { serviceProducts } from '@/lib/service-products';

const previewThemes = [
  'bg-[#dbe7ff]',
  'bg-[#ffd9c7]',
  'bg-[#dff2e7]',
  'bg-[#dceeff]',
  'bg-[#eadff7]',
  'bg-[#f4dfb7]',
];

export function PortfolioSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProduct = serviceProducts[activeIndex];
  const primaryDemo = activeProduct.demos?.[0];
  const secondaryDemo = activeProduct.demos?.[1];
  const thirdDemo = activeProduct.demos?.[2];

  return (
    <section
      id="portfolio"
      className="scroll-mt-24 overflow-hidden border-y border-black/10 bg-[#f3f1ec] py-20 sm:py-24"
    >
      <style>{`
        @keyframes tdShowcaseIn {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes tdMiniCardIn {
          from { opacity: 0; transform: translateY(14px) rotate(2deg); }
          to { opacity: 1; transform: translateY(0) rotate(0); }
        }
        .td-showcase-in { animation: tdShowcaseIn .48s ease both; }
        .td-mini-card-in { animation: tdMiniCardIn .58s ease .08s both; }
        @media (prefers-reduced-motion: reduce) {
          .td-showcase-in, .td-mini-card-in { animation: none; }
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
            Move across the services to preview the design direction, what is included, and the full service page.
          </p>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_28px_90px_rgba(30,25,18,.08)] sm:rounded-[2.5rem]">
          <div className="grid lg:grid-cols-[1.15fr_.85fr]">
            <div
              key={`visual-${activeProduct.slug}`}
              className={`td-showcase-in relative min-h-[520px] overflow-hidden p-5 sm:min-h-[650px] sm:p-8 lg:min-h-[690px] ${previewThemes[activeIndex % previewThemes.length]}`}
            >
              <div className="relative z-20 flex items-center justify-between gap-4">
                <div className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-black/55 backdrop-blur-md">
                  DesignedbyTD preview
                </div>
                <span className="text-xs font-medium tracking-[0.18em] text-black/35">
                  0{activeIndex + 1} / 0{serviceProducts.length}
                </span>
              </div>

              <div className="absolute inset-x-5 top-24 sm:inset-x-8 sm:top-28">
                <div className="relative overflow-hidden rounded-[1.7rem] border border-black/10 bg-white p-2 shadow-[0_30px_80px_rgba(20,20,20,.17)] sm:rounded-[2rem] sm:p-3">
                  <div className="absolute inset-x-8 top-6 z-10 flex items-center justify-between text-white drop-shadow-md sm:inset-x-10 sm:top-8">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">
                      {activeProduct.label}
                    </span>
                    <span className="rounded-full border border-white/35 bg-black/10 px-3 py-1 text-[9px] uppercase tracking-[0.16em] backdrop-blur-md">
                      Sample direction
                    </span>
                  </div>
                  <img
                    src={primaryDemo?.image ?? activeProduct.image}
                    alt={`${activeProduct.title} primary sample`}
                    className="aspect-[16/11] w-full rounded-[1.35rem] object-cover sm:rounded-[1.6rem]"
                  />
                  <div className="absolute inset-x-2 bottom-2 rounded-b-[1.35rem] bg-gradient-to-t from-black/75 via-black/20 to-transparent p-6 pt-24 text-white sm:inset-x-3 sm:bottom-3 sm:rounded-b-[1.6rem] sm:p-8 sm:pt-32">
                    <p className="max-w-lg text-2xl font-medium leading-tight tracking-[-0.025em] sm:text-4xl">
                      {activeProduct.previewTitle}
                    </p>
                  </div>
                </div>
              </div>

              {secondaryDemo && (
                <div
                  key={`mini-one-${activeProduct.slug}`}
                  className="td-mini-card-in absolute bottom-6 left-5 z-30 hidden w-[32%] overflow-hidden rounded-[1.2rem] border-4 border-white bg-white shadow-[0_24px_60px_rgba(0,0,0,.2)] sm:block sm:bottom-8 sm:left-8"
                >
                  <img
                    src={secondaryDemo.image}
                    alt={secondaryDemo.title}
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <div className="p-3">
                    <p className="text-[9px] uppercase tracking-[0.16em] text-black/40">
                      {secondaryDemo.category}
                    </p>
                    <p className="mt-1 text-sm font-medium text-black">{secondaryDemo.title}</p>
                  </div>
                </div>
              )}

              {thirdDemo && (
                <div
                  key={`mini-two-${activeProduct.slug}`}
                  className="td-mini-card-in absolute bottom-9 right-5 z-30 hidden w-[27%] rotate-[3deg] overflow-hidden rounded-[1.2rem] border-4 border-white bg-white shadow-[0_24px_60px_rgba(0,0,0,.2)] sm:block sm:right-8"
                >
                  <img
                    src={thirdDemo.image}
                    alt={thirdDemo.title}
                    className="aspect-[3/4] w-full object-cover"
                  />
                </div>
              )}
            </div>

            <div
              key={`content-${activeProduct.slug}`}
              className="td-showcase-in flex flex-col border-t border-black/10 bg-[#fbfaf7] p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12"
            >
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-black/40">
                  {activeProduct.label}
                </p>
                <h3 className="mt-5 text-4xl font-medium leading-[1.02] tracking-[-0.04em] text-black sm:text-5xl">
                  {activeProduct.title}
                </h3>
                <p className="mt-6 text-base font-light leading-7 text-black/60 sm:text-lg">
                  {activeProduct.description}
                </p>
              </div>

              <div className="mt-9 border-y border-black/10 py-6">
                <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.2em] text-black/35">
                  Included in this service
                </p>
                <div className="space-y-3">
                  {activeProduct.features.slice(0, 3).map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black text-white">
                        <Check className="h-3 w-3" />
                      </span>
                      <p className="text-sm font-light leading-6 text-black/65">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-8">
                <Link
                  href={`/services/${activeProduct.slug}`}
                  className="group inline-flex items-center gap-3 rounded-full bg-black px-6 py-3.5 text-sm font-medium text-white transition hover:bg-black/80"
                >
                  View {activeProduct.title}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-black/10 bg-white p-3 sm:p-4">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
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
                    className={`group flex min-h-24 items-center justify-between gap-5 rounded-[1.2rem] border p-5 text-left transition duration-300 ${
                      isActive
                        ? 'border-black bg-black text-white shadow-[0_14px_35px_rgba(0,0,0,.14)]'
                        : 'border-black/8 bg-[#f7f6f2] text-black hover:-translate-y-0.5 hover:border-black/20 hover:bg-white'
                    }`}
                  >
                    <div>
                      <p className={`text-[9px] uppercase tracking-[0.18em] ${isActive ? 'text-white/45' : 'text-black/30'}`}>
                        0{index + 1}
                      </p>
                      <p className="mt-2 text-lg font-medium tracking-[-0.02em] sm:text-xl">
                        {product.title}
                      </p>
                    </div>
                    <ArrowUpRight
                      className={`h-5 w-5 shrink-0 transition ${
                        isActive
                          ? 'text-white'
                          : 'text-black/25 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-black'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
