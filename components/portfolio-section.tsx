'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { serviceProducts } from '@/lib/service-products';

function getImageKey(image: string) {
  try {
    const url = new URL(image, 'https://designedbytd.com');
    return url.pathname.toLowerCase();
  } catch {
    return image.split('?')[0].toLowerCase();
  }
}

const cardPositions = [
  { left: '8%', top: '25%', width: '58%', height: '55%', rotate: -7, z: 24 },
  { left: '28%', top: '18%', width: '58%', height: '58%', rotate: 5, z: 20 },
  { left: '47%', top: '27%', width: '47%', height: '50%', rotate: 9, z: 16 },
  { left: '58%', top: '35%', width: '37%', height: '43%', rotate: 13, z: 12 },
];

export function PortfolioSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProduct = serviceProducts[activeIndex];

  const previewImages = useMemo(() => {
    const images = [
      ...(activeProduct.demos ?? []).map((demo) => demo.image),
      activeProduct.image,
    ].filter(Boolean);

    return images.filter((image, index) => {
      const key = getImageKey(image);
      return images.findIndex((candidate) => getImageKey(candidate) === key) === index;
    });
  }, [activeProduct]);

  const stackImages = Array.from({ length: 4 }, (_, index) =>
    previewImages[index % Math.max(previewImages.length, 1)] ?? activeProduct.image,
  );

  return (
    <section
      id="portfolio"
      className="scroll-mt-24 overflow-hidden border-y border-black/10 bg-white py-20 sm:py-24 lg:py-28"
    >
      <style>{`
        @keyframes serviceStackEnter {
          0% { opacity: 0; transform: translate3d(0, 34px, 0) rotate(var(--card-rotate)) scale(.94); }
          100% { opacity: 1; transform: translate3d(0, 0, 0) rotate(var(--card-rotate)) scale(1); }
        }

        @keyframes serviceStackFloat {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(var(--card-rotate)); }
          50% { transform: translate3d(0, -7px, 0) rotate(calc(var(--card-rotate) + 1.2deg)); }
        }

        @keyframes serviceCopyEnter {
          0% { opacity: 0; transform: translate3d(0, 12px, 0); }
          100% { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        .service-stack-card {
          animation:
            serviceStackEnter .72s cubic-bezier(.22, 1, .36, 1) both,
            serviceStackFloat 6s ease-in-out 1s infinite;
          transform-origin: 50% 80%;
          backface-visibility: hidden;
          will-change: transform;
        }

        .service-stack-card:nth-child(2) { animation-delay: .07s, 1.1s; }
        .service-stack-card:nth-child(3) { animation-delay: .14s, 1.2s; }
        .service-stack-card:nth-child(4) { animation-delay: .21s, 1.3s; }
        .service-copy-enter { animation: serviceCopyEnter .45s cubic-bezier(.22, 1, .36, 1) both; }

        @media (prefers-reduced-motion: reduce) {
          .service-stack-card,
          .service-copy-enter {
            animation: none !important;
          }
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1.05fr_.72fr] lg:items-end sm:mb-16">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-black/45">
              What I can build
            </p>
            <h2 className="mt-5 max-w-4xl text-4xl font-medium leading-[1.03] tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
              Website products shaped around your business.
            </h2>
          </div>

          <p className="max-w-xl text-base font-light leading-7 text-black/55 lg:justify-self-end sm:text-lg">
            Hover over a service to preview the design direction, what is included, and the full service page.
          </p>
        </div>

        <div className="grid overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_24px_70px_rgba(0,0,0,.06)] lg:grid-cols-[1.18fr_.82fr] sm:rounded-[2.5rem]">
          <div className="relative min-h-[520px] overflow-hidden border-b border-black/10 bg-[#f7f7f5] p-5 sm:min-h-[650px] sm:p-8 lg:min-h-[720px] lg:border-b-0 lg:border-r">
            <div className="relative z-40 flex items-center justify-between gap-4">
              <span className="rounded-full border border-black/10 bg-white/90 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-black/45 shadow-sm backdrop-blur-md">
                DesignedbyTD preview
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-black/35">
                0{activeIndex + 1} / 0{serviceProducts.length}
              </span>
            </div>

            <div
              key={activeProduct.slug}
              className="absolute inset-x-0 bottom-14 top-16 sm:bottom-16 sm:top-20"
              aria-hidden="true"
            >
              {stackImages.map((image, index) => {
                const position = cardPositions[index];
                const isFront = index === 0;

                return (
                  <div
                    key={`${activeProduct.slug}-${index}-${image}`}
                    className="service-stack-card absolute overflow-hidden rounded-[1.35rem] border-[5px] border-white bg-white shadow-[0_30px_70px_rgba(0,0,0,.16)] sm:rounded-[1.7rem] sm:border-[6px]"
                    style={{
                      left: position.left,
                      top: position.top,
                      width: position.width,
                      height: position.height,
                      zIndex: position.z,
                      ['--card-rotate' as string]: `${position.rotate}deg`,
                    }}
                  >
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 65vw, (max-width: 1024px) 52vw, 38vw"
                      className="object-cover"
                    />
                    <div className={`pointer-events-none absolute inset-0 ${isFront ? 'bg-black/[0.03]' : 'bg-black/[0.12]'}`} />
                  </div>
                );
              })}
            </div>

            <div className="absolute inset-x-0 bottom-5 z-40 flex justify-center gap-2.5 sm:bottom-7">
              {serviceProducts.map((product, index) => (
                <button
                  key={product.slug}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 w-2.5 rounded-full border transition-all duration-300 ${
                    index === activeIndex
                      ? 'scale-110 border-black bg-black'
                      : 'border-black/35 bg-transparent hover:border-black/70'
                  }`}
                  aria-label={`Preview ${product.title}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                />
              ))}
            </div>
          </div>

          <div className="flex min-h-[520px] flex-col bg-white p-6 sm:min-h-[650px] sm:p-9 lg:min-h-[720px] lg:p-10 xl:p-12">
            <div className="border-t border-black/12">
              {serviceProducts.map((product, index) => {
                const isActive = index === activeIndex;

                return (
                  <Link
                    key={product.slug}
                    href={`/services/${product.slug}`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`group relative block border-b border-black/12 transition-all duration-500 ${
                      isActive ? 'py-5 sm:py-6' : 'py-4 sm:py-5'
                    }`}
                  >
                    <div
                      className={`flex items-center gap-4 rounded-2xl transition-all duration-500 ${
                        isActive
                          ? 'bg-black px-5 py-5 text-white shadow-[0_16px_40px_rgba(0,0,0,.14)] sm:px-6 sm:py-6'
                          : 'px-1 text-black/45 group-hover:text-black'
                      }`}
                    >
                      <span
                        className={`h-2.5 w-2.5 shrink-0 rounded-full border transition-all duration-300 ${
                          isActive ? 'border-white bg-white' : 'border-black/30 bg-transparent group-hover:border-black/70'
                        }`}
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-xl font-medium tracking-[-0.03em] sm:text-2xl">
                            {product.title}
                          </span>
                          <ArrowUpRight
                            className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                              isActive ? 'text-white' : 'text-black/25 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black'
                            }`}
                          />
                        </div>

                        <div
                          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                            isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                          }`}
                        >
                          <div className="overflow-hidden">
                            <p className="max-w-md pt-4 text-sm font-light leading-6 text-white/68 sm:text-base sm:leading-7">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div key={`details-${activeProduct.slug}`} className="service-copy-enter mt-auto pt-8 sm:pt-10">
              <div className="flex flex-wrap gap-2">
                {activeProduct.features.slice(0, 3).map((feature) => (
                  <span
                    key={feature}
                    className="rounded-full border border-black/10 bg-[#f7f7f5] px-3 py-2 text-xs font-light text-black/55"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <Link
                href={`/services/${activeProduct.slug}`}
                className="group mt-6 inline-flex items-center gap-3 text-sm font-medium text-black"
              >
                Explore {activeProduct.title}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
