'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { serviceProducts } from '@/lib/service-products';

export function PortfolioSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProduct = serviceProducts[activeIndex];

  return (
    <section
      id="portfolio"
      className="scroll-mt-24 overflow-hidden border-y border-black/10 bg-[#f5f5f1] py-20 sm:py-24"
    >
      <style>{`
        @keyframes productPreviewIn {
          from { opacity: 0; transform: translateY(10px) scale(.99); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .product-preview-in { animation: productPreviewIn .45s ease both; }
        @media (prefers-reduced-motion: reduce) {
          .product-preview-in { animation: none; }
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl sm:mb-16">
          <p className="text-xs font-medium uppercase tracking-[0.26em] text-black/45">
            What I can build
          </p>
          <h2 className="mt-4 text-4xl font-medium leading-[1.04] tracking-[-0.035em] text-black sm:text-5xl lg:text-6xl">
            Website products built around your business.
          </h2>
          <p className="mt-5 max-w-2xl text-base font-light leading-7 text-black/60 sm:text-lg">
            Hover over a website type to see the sample and what is included.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,.92fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[1.75rem] bg-[#e7e5df] p-3 shadow-[0_25px_70px_rgba(0,0,0,.08)] sm:p-5">
              <div className="overflow-hidden rounded-[1.2rem] border border-black/10 bg-white">
                <div className="flex h-12 items-center gap-3 border-b border-black/10 bg-white px-4">
                  <div className="flex gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-black/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-black/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-black/20" />
                  </div>
                  <div className="mx-auto rounded-full bg-black/[0.04] px-5 py-1.5 text-[10px] tracking-[0.08em] text-black/45">
                    DESIGNEDBYTD.COM
                  </div>
                </div>

                <div
                  key={activeProduct.title}
                  className="product-preview-in relative min-h-[470px] overflow-hidden sm:min-h-[560px]"
                >
                  <img
                    src={activeProduct.image}
                    alt={`${activeProduct.title} sample website preview`}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/5 to-black/75" />

                  <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-white/25 bg-black/10 px-5 py-4 text-white backdrop-blur-md sm:px-7">
                    <span className="text-xs font-semibold tracking-[0.16em]">TD / STUDIO</span>
                    <div className="hidden gap-5 text-[10px] uppercase tracking-[0.16em] text-white/75 sm:flex">
                      <span>About</span>
                      <span>Services</span>
                      <span>Contact</span>
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
                    <div className="max-w-xl rounded-[1.4rem] border border-white/25 bg-black/45 p-6 text-white shadow-2xl backdrop-blur-xl sm:p-8">
                      <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/60">
                        {activeProduct.label}
                      </p>
                      <h3 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.025em] sm:text-4xl">
                        {activeProduct.previewTitle}
                      </h3>
                      <div className="mt-6 flex flex-wrap items-center gap-3">
                        <Link
                          href={`/services/${activeProduct.slug}`}
                          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-medium text-black transition hover:gap-3"
                        >
                          Explore service
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                        <span className="rounded-full border border-white/30 px-4 py-2.5 text-xs text-white/80">
                          Mobile ready
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-black/15">
            {serviceProducts.map((product, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={product.title}
                  onMouseEnter={() => setActiveIndex(index)}
                  className="border-b border-black/15"
                >
                  <button
                    type="button"
                    onFocus={() => setActiveIndex(index)}
                    onClick={() => setActiveIndex(index)}
                    aria-expanded={isActive}
                    className={`group w-full cursor-pointer py-5 text-left transition sm:py-6 ${
                      isActive ? 'text-black' : 'text-black/30 hover:text-black/65'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-3xl font-light tracking-[-0.035em] sm:text-4xl lg:text-[2.7rem]">
                        {product.title}
                      </span>
                      <ArrowRight
                        className={`h-5 w-5 shrink-0 transition duration-300 ${
                          isActive
                            ? 'translate-x-0 opacity-100'
                            : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-60'
                        }`}
                      />
                    </div>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ${
                      isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-xl pb-6 text-sm font-light leading-6 text-black/60 sm:text-base">
                        {product.description}{' '}
                        <Link
                          href={`/services/${product.slug}`}
                          className="inline-flex items-center gap-1 font-medium text-black underline decoration-black/25 underline-offset-4 transition hover:decoration-black"
                        >
                          View service
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="pt-8">
              <Link
                href={`/services/${activeProduct.slug}`}
                className="inline-flex items-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:gap-4 hover:bg-black/80"
              >
                Explore {activeProduct.title}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
