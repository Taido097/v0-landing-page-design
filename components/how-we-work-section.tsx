'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';

type ShowcaseDemo = {
  name: string;
  category: 'Portfolio' | 'Scheduling' | 'Restaurant' | 'Custom Website';
  industry: string;
  href: string;
};

const demos: ShowcaseDemo[] = [
  {
    name: 'Luna Frame Studio',
    category: 'Portfolio',
    industry: 'Photography studio',
    href: '/portfolio/photography-studio',
  },
  {
    name: 'Alex Kabiru',
    category: 'Portfolio',
    industry: 'Designer portfolio',
    href: '/portfolio/minimal-portfolio',
  },
  {
    name: 'Fuel',
    category: 'Portfolio',
    industry: 'Premium creative agency',
    href: '/portfolio/fuel-agency',
  },
  {
    name: 'JORGE',
    category: 'Portfolio',
    industry: 'Creative portfolio',
    href: '/portfolio/jorge-portfolio',
  },
  {
    name: 'Akjo',
    category: 'Portfolio',
    industry: 'Creative studio',
    href: '/portfolio/akjo-portfolio',
  },
  {
    name: 'Beanro Coffee',
    category: 'Restaurant',
    industry: 'Coffee shop',
    href: '/portfolio/auto-repair-shop',
  },
  {
    name: 'Salonix',
    category: 'Scheduling',
    industry: 'Hair & beauty salon',
    href: '/portfolio/salon-spa',
  },
  {
    name: 'Dentalo',
    category: 'Scheduling',
    industry: 'Dental clinic & hospital',
    href: '/portfolio/dentalo-clinic',
  },
  {
    name: 'DesignedbyTD Dental',
    category: 'Scheduling',
    industry: 'Dental clinic',
    href: '/portfolio/tai-do-dental',
  },
  {
    name: 'Éclat Aesthetics',
    category: 'Scheduling',
    industry: 'Aesthetic clinic & beauty studio',
    href: '/portfolio/eclat-aesthetics',
  },
  {
    name: 'Qitchen Sushi',
    category: 'Restaurant',
    industry: 'Restaurant',
    href: '/portfolio/restaurant-website',
  },
  {
    name: 'Foodee',
    category: 'Restaurant',
    industry: 'Food & restaurant',
    href: '/portfolio/foodee-restaurant',
  },
  {
    name: 'Refit',
    category: 'Custom Website',
    industry: 'Construction & renovation',
    href: '/portfolio/refit-construction',
  },
  {
    name: 'LeapFly',
    category: 'Custom Website',
    industry: 'Landscaping & lawn care',
    href: '/portfolio/leapfly-landscaping',
  },
];

const benefits = [
  {
    number: '01',
    title: 'Custom Designs Only',
    description:
      'No random templates. Every design is created to match the business and make it easy for customers to take action.',
  },
  {
    number: '02',
    title: 'Fast Turnaround',
    description:
      'Most simple business websites can be designed and launched quickly, so you can start using it with customers.',
  },
  {
    number: '03',
    title: 'Ongoing Support',
    description:
      'After launch, you can get help with small updates, text changes, and improvements.',
  },
  {
    number: '04',
    title: 'Built for Local Businesses',
    description:
      'The goal is not just a pretty site. The goal is to help customers trust you, call you, and request your service.',
  },
];

function DemoCard({ demo, index }: { demo: ShowcaseDemo; index: number }) {
  return (
    <>
      <div className="demo-showcase-preview">
        <iframe
          src={demo.href}
          title={`${demo.name} live demo preview`}
          loading="lazy"
          tabIndex={-1}
        />
        <Link
          href={demo.href}
          aria-label={`Open ${demo.name} demo`}
          className="absolute inset-0 z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-black"
        />
      </div>

      <div className="demo-showcase-info">
        <div className="min-w-0">
          <h3 className="demo-showcase-title truncate">{demo.name}</h3>
          <p className="demo-showcase-industry truncate">{demo.industry}</p>
        </div>
        <span className="demo-showcase-count">
          {String(index + 1).padStart(2, '0')} / {String(demos.length).padStart(2, '0')}
        </span>
      </div>
    </>
  );
}

export function HowWeWorkSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="process"
      className="scroll-mt-24 border-t border-black/10 bg-[#fafafa] py-20 text-[#121212] sm:py-24 lg:py-28"
    >
      <style>{`
        .demo-showcase-stack {
          position: relative;
          isolation: isolate;
        }

        .demo-showcase-slide {
          position: sticky;
          top: 88px;
          height: min(72vw, 720px);
          min-height: 560px;
          margin-bottom: -470px;
          overflow: hidden;
          background: #d8d8d8;
          box-shadow: 0 1px 0 rgba(18,18,18,.08);
        }

        .demo-showcase-slide:last-child {
          margin-bottom: 0;
        }

        .demo-showcase-bg {
          position: absolute;
          inset: -8%;
          overflow: hidden;
          background: #d8d8d8;
          filter: blur(24px) saturate(.82) brightness(.76);
          transform: scale(1.1);
        }

        .demo-showcase-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 2;
          background: rgba(255,255,255,.08);
          pointer-events: none;
        }

        .demo-showcase-bg iframe,
        .demo-showcase-preview iframe {
          position: absolute;
          left: 0;
          top: 0;
          width: 200%;
          height: 200%;
          border: 0;
          background: #fff;
          pointer-events: none;
          transform: scale(.5);
          transform-origin: top left;
        }

        .demo-showcase-card {
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 5;
          width: min(58%, 840px);
          min-width: 650px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 28px 70px rgba(0,0,0,.18);
          transform: translate(-50%, -50%);
        }

        .demo-showcase-preview {
          position: relative;
          height: 470px;
          overflow: hidden;
          background: #fff;
        }

        .demo-showcase-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          min-height: 118px;
          padding: 24px 28px 26px;
          background: #fff;
        }

        .demo-showcase-title {
          font-size: clamp(20px, 2vw, 28px);
          font-weight: 500;
          line-height: 1;
          letter-spacing: -.045em;
        }

        .demo-showcase-industry {
          margin-top: 8px;
          font-size: 15px;
          color: rgba(18,18,18,.52);
        }

        .demo-showcase-count {
          flex: none;
          font-size: 11px;
          letter-spacing: .12em;
          color: rgba(18,18,18,.42);
        }

        .demo-showcase-category {
          position: absolute;
          left: 24px;
          bottom: 24px;
          z-index: 8;
          border: 1px solid rgba(255,255,255,.9);
          border-radius: 999px;
          background: rgba(255,255,255,.14);
          padding: 11px 20px;
          color: #fff;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: .02em;
          text-transform: uppercase;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        @media (max-width: 900px) {
          .demo-showcase-slide {
            top: 76px;
            height: 620px;
            min-height: 620px;
            margin-bottom: -400px;
          }

          .demo-showcase-card {
            width: calc(100% - 84px);
            min-width: 0;
          }

          .demo-showcase-preview {
            height: 390px;
          }

          .demo-showcase-info {
            min-height: 104px;
            padding: 20px;
          }

          .demo-showcase-category {
            left: 12px;
            bottom: 14px;
            padding: 9px 14px;
            font-size: 10px;
          }
        }

        @media (max-width: 560px) {
          .demo-showcase-slide {
            top: 68px;
            height: 520px;
            min-height: 520px;
            margin-bottom: -330px;
          }

          .demo-showcase-card {
            top: 46%;
            width: calc(100% - 44px);
          }

          .demo-showcase-preview {
            height: 300px;
          }

          .demo-showcase-info {
            min-height: 92px;
            padding: 16px;
          }

          .demo-showcase-title {
            font-size: 19px;
          }

          .demo-showcase-industry {
            margin-top: 5px;
            font-size: 12px;
          }
        }
      `}</style>

      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="border-t border-black/10 pt-7 sm:pt-8">
          <div className="mb-8 flex items-end justify-between gap-6 sm:mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.13em] text-black/45">
                Selected demos
              </p>
              <h2 className="mt-3 max-w-[850px] text-[clamp(2.7rem,5.5vw,5rem)] font-medium leading-[.92] tracking-[-0.055em]">
                Websites built for different businesses
              </h2>
            </div>
            <Link
              href="/demos"
              className="group hidden shrink-0 items-center gap-3 bg-black px-5 py-4 text-xs font-semibold uppercase tracking-[0.04em] text-white sm:inline-flex"
            >
              View all demos
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="demo-showcase-stack">
            {demos.map((demo, index) => (
              <div
                key={demo.href}
                className="demo-showcase-slide"
                style={{ zIndex: index + 1 }}
              >
                <div className="demo-showcase-bg" aria-hidden="true">
                  <iframe src={demo.href} title="" loading="lazy" tabIndex={-1} />
                </div>

                <div className="demo-showcase-card">
                  <DemoCard demo={demo} index={index} />
                </div>

                <span className="demo-showcase-category">{demo.category}</span>
              </div>
            ))}
          </div>

          <Link
            href="/demos"
            className="mt-5 inline-flex items-center gap-2 bg-black px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.04em] text-white sm:hidden"
          >
            View all demos <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div
          id="about"
          className="mt-20 scroll-mt-24 border-t border-black/10 pt-20 lg:mt-28 lg:pt-24"
        >
          <div className="border-t border-black/10 pt-7 sm:pt-8">
            <h3 className="max-w-[1000px] text-[clamp(3rem,6vw,5.5rem)] font-medium leading-[.92] tracking-[-0.06em]">
              Why Choose DesignedbyTD Studio?
            </h3>
            <p className="mt-6 max-w-[520px] text-base font-light leading-[1.45] tracking-[-0.02em] text-black/70">
              A focused website process built for local businesses that want to look professional and make it easier for customers to take action.
            </p>
          </div>

          <div className="mt-12 grid gap-3 md:grid-cols-2 lg:mt-14">
            {benefits.map((benefit, index) => (
              <article
                key={benefit.number}
                className={`group min-h-[235px] rounded-xl border border-black/10 bg-white p-6 transition-all duration-700 [transition-timing-function:cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_14px_38px_rgba(0,0,0,.06)] ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
                style={{ transitionDelay: `${240 + index * 80}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-[38px] w-[38px] place-items-center rounded-full bg-[#121212] text-base font-semibold text-white transition-transform duration-500 [transition-timing-function:cubic-bezier(.22,1.2,.36,1)] group-hover:-rotate-[8deg] group-hover:scale-110">
                    ✓
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.14em] text-black/35">
                    {benefit.number}
                  </span>
                </div>
                <h4 className="mt-10 text-[clamp(26px,2.5vw,38px)] font-medium leading-none tracking-[-0.05em]">
                  {benefit.title}
                </h4>
                <p className="mt-3 max-w-[54ch] text-sm font-light leading-relaxed text-black/60">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
