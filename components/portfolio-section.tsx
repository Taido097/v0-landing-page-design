'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Code2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { serviceProducts } from '@/lib/service-products';

const headingWords = 'Website products shaped around your business.'.split(' ');

const demos = [
  {
    name: 'Luna Frame Studio',
    type: 'Photography portfolio',
    href: '/portfolio/photography-studio',
    image:
      'https://framerusercontent.com/images/gPkgBcGwatmPdwzMlpToFBHNSs.png?width=912&height=1170',
  },
  {
    name: 'Beanro Coffee',
    type: 'Coffee shop website',
    href: '/portfolio/auto-repair-shop',
    image:
      'https://framerusercontent.com/images/9BOQjMuTjInl3CMPRrkdP4QKJZU.png?width=2440&height=2344',
  },
  {
    name: 'Salonix',
    type: 'Hair & beauty salon',
    href: '/portfolio/salon-spa',
    image:
      'https://framerusercontent.com/images/dIylQwKI5TLfITTBRdEzEwYx7TY.jpg?width=2330&height=1536',
  },
  {
    name: 'Qitchen Sushi',
    type: 'Restaurant website',
    href: '/portfolio/restaurant-website',
    image:
      'https://framerusercontent.com/images/10I4GJR5nYsUsYnoOPIDjoapkA.webp?height=1400&width=1100',
  },
];

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
      { threshold: 0.28 },
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

        /* LaunchFolio project group: opacity .001, scale .8, y 200 -> full size at y 0 in .5s. */
        .launchfolio-demos {
          opacity: .001;
          transform: translate3d(0, 200px, 0) scale(.8);
          transform-origin: 50% 50%;
          transition-property: opacity, transform;
          transition-duration: .5s;
          transition-timing-function: cubic-bezier(.4, 0, .2, 1);
          will-change: opacity, transform;
        }

        .launchfolio-demos.is-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1);
        }

        .launchfolio-demo-image {
          transition: transform .45s cubic-bezier(.4, 0, .2, 1);
        }

        .launchfolio-demo:hover .launchfolio-demo-image {
          transform: scale(1.025);
        }

        .launchfolio-service {
          transition: transform .4s cubic-bezier(.2, .8, .2, 1);
        }

        .launchfolio-service:hover {
          transform: translate3d(6px, 0, 0);
        }

        @media (prefers-reduced-motion: reduce) {
          .launchfolio-word,
          .launchfolio-demos,
          .launchfolio-service {
            opacity: 1 !important;
            filter: none !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.55fr_.72fr] lg:gap-20">
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

            <div
              className={`launchfolio-demos mt-14 grid gap-8 sm:grid-cols-2 ${inView ? 'is-visible' : ''}`}
            >
              {demos.map((demo) => (
                <Link
                  key={demo.name}
                  href={demo.href}
                  className="launchfolio-demo group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#f0f0f0]">
                    <Image
                      src={demo.image}
                      alt={`${demo.name} website demo`}
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 44vw, 32vw"
                      className="launchfolio-demo-image object-cover"
                    />
                  </div>

                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-medium tracking-[-0.025em] text-black sm:text-xl">
                        {demo.name}
                      </p>
                      <p className="mt-1 text-sm text-black/45">{demo.type}</p>
                    </div>

                    <div className="mt-1 flex items-center gap-2 text-xs font-medium text-black/45 transition-colors group-hover:text-black">
                      <span className="hidden sm:inline">View demo</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center gap-9 border-t border-black/10 pt-10 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-black/35">
              Services
            </p>

            {serviceProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/services/${product.slug}`}
                className="launchfolio-service group flex w-fit max-w-full items-center gap-3 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black bg-black shadow-[inset_0_2px_4px_rgba(255,255,255,.4),0_.74px_.74px_rgba(0,0,0,.33),0_2px_2px_rgba(0,0,0,.32),0_4.4px_4.4px_rgba(0,0,0,.3),0_9.8px_9.8px_rgba(0,0,0,.25),0_25px_25px_rgba(0,0,0,.11)]">
                  <Code2 className="h-4.5 w-4.5 text-white" strokeWidth={1.5} />
                </span>

                <span className="text-lg font-medium tracking-[-0.03em] text-black sm:text-xl">
                  {product.title}
                </span>

                <ArrowUpRight className="ml-1 h-4 w-4 text-black/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
