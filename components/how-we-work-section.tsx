'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type ShowcaseDemo = {
  name: string;
  category: 'Portfolio' | 'Scheduling' | 'Restaurant' | 'Custom Website';
  industry: string;
  href: string;
};

const demos: ShowcaseDemo[] = [
  {
    name: 'Fuel',
    category: 'Portfolio',
    industry: 'Premium creative agency',
    href: '/portfolio/fuel-agency',
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
    name: 'Refit',
    category: 'Custom Website',
    industry: 'Construction & renovation',
    href: '/portfolio/refit-construction',
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
          loading={index === 0 ? 'eager' : 'lazy'}
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
  const stackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const sceneRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    let frame = 0;

    const updateStack = () => {
      frame = 0;

      const stack = stackRef.current;
      const stage = stageRef.current;
      if (!stack || !stage) return;

      const stickyTop = Number.parseFloat(window.getComputedStyle(stage).top) || 0;
      const stackRect = stack.getBoundingClientRect();
      const maxTravel = Math.max(1, stack.offsetHeight - stage.offsetHeight);
      const travelled = Math.min(maxTravel, Math.max(0, stickyTop - stackRect.top));
      const position = (travelled / maxTravel) * (demos.length - 1);
      const gap = window.innerWidth <= 560 ? 18 : window.innerWidth <= 900 ? 20 : 24;

      sceneRefs.current.forEach((scene, index) => {
        if (!scene) return;

        if (index === 0) {
          scene.style.transform = 'translateY(0)';
          return;
        }

        const localProgress = Math.min(1, Math.max(0, position - (index - 1)));
        const translateY = (1 - localProgress) * (stage.offsetHeight + gap);
        scene.style.transform = `translateY(${translateY}px)`;
      });
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateStack);
    };

    updateStack();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      id="process"
      className="scroll-mt-24 border-t border-black/10 bg-[#fafafa] py-20 text-[#121212] sm:py-24 lg:py-28"
    >
      <style>{`
        .demo-showcase-scroll {
          position: relative;
          height: 2400px;
        }

        .demo-showcase-stage {
          position: sticky;
          top: 88px;
          height: min(72vw, 720px);
          min-height: 560px;
          overflow: hidden;
          isolation: isolate;
          background: #fafafa;
        }

        .demo-showcase-scene {
          position: absolute;
          inset: 0;
          overflow: visible;
          background: transparent;
          will-change: transform;
        }

        .demo-showcase-scene-content {
          position: absolute;
          inset: 0;
          overflow: hidden;
          background: #d8d8d8;
        }

        .demo-showcase-scene:not(:first-child)::before {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          top: -24px;
          z-index: 100;
          height: 24px;
          background: #fafafa;
          pointer-events: none;
        }

        .demo-showcase-bg {
          position: absolute;
          inset: -8%;
          z-index: 0;
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
          z-index: 30;
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

        .view-all-demos-button {
          border-radius: 0 !important;
        }

        @media (max-width: 900px) {
          .demo-showcase-scroll {
            height: 1940px;
          }

          .demo-showcase-stage {
            top: 76px;
            height: 620px;
            min-height: 620px;
          }

          .demo-showcase-scene:not(:first-child)::before {
            top: -20px;
            height: 20px;
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
          .demo-showcase-scroll {
            height: 1540px;
          }

          .demo-showcase-stage {
            top: 68px;
            height: 520px;
            min-height: 520px;
          }

          .demo-showcase-scene:not(:first-child)::before {
            top: -18px;
            height: 18px;
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

        @media (prefers-reduced-motion: reduce) {
          .demo-showcase-scene {
            will-change: auto;
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
              style={{ borderRadius: 0 }}
              className="view-all-demos-button group hidden shrink-0 items-center gap-3 !rounded-none bg-black px-5 py-4 text-xs font-semibold uppercase tracking-[0.04em] text-white sm:inline-flex"
            >
              View all demos
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div ref={stackRef} className="demo-showcase-scroll">
            <div ref={stageRef} className="demo-showcase-stage">
              {demos.map((demo, index) => (
                <div
                  key={demo.href}
                  ref={(node) => {
                    sceneRefs.current[index] = node;
                  }}
                  className="demo-showcase-scene"
                  style={{
                    zIndex: 10 + index,
                    transform:
                      index === 0
                        ? 'translateY(0)'
                        : 'translateY(calc(100% + 24px))',
                  }}
                >
                  <div className="demo-showcase-scene-content">
                    <div className="demo-showcase-bg" aria-hidden="true">
                      <iframe
                        src={demo.href}
                        title=""
                        loading={index === 0 ? 'eager' : 'lazy'}
                        tabIndex={-1}
                      />
                    </div>

                    <div className="demo-showcase-card">
                      <DemoCard demo={demo} index={index} />
                    </div>

                    <span className="demo-showcase-category">{demo.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center py-16 sm:py-20">
            <Link
              href="/demos"
              style={{ borderRadius: 0 }}
              className="view-all-demos-button group inline-flex min-w-[190px] items-center justify-center gap-3 !rounded-none bg-black px-7 py-4 text-xs font-semibold uppercase tracking-[0.04em] text-white transition-colors duration-300 hover:bg-black/80"
            >
              View all demos
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
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
