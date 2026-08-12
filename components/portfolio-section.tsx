'use client';

import Link from 'next/link';
import {
  ArrowUpRight,
  CalendarDays,
  Code2,
  Images,
  MousePointerClick,
  ShoppingBag,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { serviceProducts } from '@/lib/service-products';

const headingWords = 'Website products shaped around your business.'.split(' ');

const buildStack = ['Figma', 'Next.js', 'Tailwind', 'Vercel', 'Google', 'Stripe'];

const serviceIcons = [Code2, ShoppingBag, CalendarDays, MousePointerClick, Images];

export function PortfolioSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { threshold: 0.5 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="scroll-mt-24 overflow-hidden border-y border-black/10 bg-white py-24 text-black sm:py-28 lg:py-32"
    >
      <style>{`
        .launchfolio-word {
          opacity: .001;
          filter: blur(5px);
          transform: translate3d(0, 10px, 0);
          transition-property: opacity, filter, transform;
          transition-duration: .8s;
          transition-timing-function: cubic-bezier(.4, 0, .2, 1);
          will-change: opacity, filter, transform;
        }

        .launchfolio-word.is-visible {
          opacity: 1;
          filter: blur(0);
          transform: translate3d(0, 0, 0);
        }

        .launchfolio-tool {
          opacity: 0;
          transform: translate3d(var(--tool-start-x), 0, 0);
          transition-property: opacity, transform;
          transition-duration: .6s;
          transition-timing-function: cubic-bezier(.4, 0, .2, 1);
          transition-delay: var(--tool-delay);
          will-change: opacity, transform;
        }

        .launchfolio-tool.is-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        .launchfolio-service {
          transition: transform .4s cubic-bezier(.2, .8, .2, 1);
        }

        .launchfolio-service:hover {
          transform: translate3d(6px, 0, 0);
        }

        @media (prefers-reduced-motion: reduce) {
          .launchfolio-word,
          .launchfolio-tool,
          .launchfolio-service {
            opacity: 1 !important;
            filter: none !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <div className="mx-auto grid w-full max-w-[1180px] gap-16 px-5 sm:px-8 lg:grid-cols-[1.5fr_1fr] lg:gap-20 lg:px-10">
        <div className="flex flex-col gap-16">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-black/40">
              What I can build
            </p>

            <h2 className="mt-6 max-w-[760px] text-4xl font-medium leading-[1.02] tracking-[-0.045em] text-black sm:text-5xl lg:text-[64px]">
              {headingWords.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className={`launchfolio-word mr-[0.22em] inline-block ${inView ? 'is-visible' : ''}`}
                  style={{ transitionDelay: `${0.05 + index * 0.05}s` }}
                >
                  {word}
                </span>
              ))}
            </h2>
          </div>

          <div>
            <p className="text-base font-medium tracking-[-0.02em] text-black sm:text-lg">
              My build stack
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {buildStack.map((tool, index) => (
                <div
                  key={tool}
                  className={`launchfolio-tool group relative flex h-14 w-14 items-center justify-center rounded-xl border border-black/10 bg-white shadow-[0_0.6px_0.6px_rgba(0,0,0,.07),0_1.8px_1.8px_rgba(0,0,0,.07),0_4.8px_4.8px_rgba(0,0,0,.06),0_15px_15px_rgba(0,0,0,.03)] ${
                    inView ? 'is-visible' : ''
                  }`}
                  style={{
                    ['--tool-start-x' as string]: `${-5 * (index + 1)}px`,
                    ['--tool-delay' as string]: `${index * 0.1}s`,
                  }}
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[-0.03em] text-black">
                    {tool.slice(0, 2)}
                  </span>

                  <span className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 rounded-full bg-black px-3 py-1.5 text-[10px] font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    {tool}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-10 lg:gap-12">
          {serviceProducts.map((product, index) => {
            const Icon = serviceIcons[index] ?? Code2;

            return (
              <Link
                key={product.slug}
                href={`/services/${product.slug}`}
                className="launchfolio-service group flex w-fit max-w-full items-center gap-3 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black bg-black shadow-[inset_0_2px_4px_rgba(255,255,255,.4),0_.74px_.74px_rgba(0,0,0,.33),0_2px_2px_rgba(0,0,0,.32),0_4.4px_4.4px_rgba(0,0,0,.3),0_9.8px_9.8px_rgba(0,0,0,.25),0_25px_25px_rgba(0,0,0,.11)]">
                  <Icon className="h-5 w-5 text-white" strokeWidth={1.5} />
                </span>

                <span className="text-xl font-medium tracking-[-0.03em] text-black sm:text-2xl">
                  {product.title}
                </span>

                <ArrowUpRight className="ml-1 h-4 w-4 text-black/35 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
