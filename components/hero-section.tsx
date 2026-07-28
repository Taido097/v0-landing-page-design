'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, MousePointer2, Sparkles } from 'lucide-react';
import { MouseEvent, useEffect, useState } from 'react';

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handlePointerMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    event.currentTarget.style.setProperty('--pointer-x', `${x}%`);
    event.currentTarget.style.setProperty('--pointer-y', `${y}%`);
  };

  return (
    <section
      id="hero"
      onMouseMove={handlePointerMove}
      className="hero-stage relative min-h-screen overflow-hidden bg-[#fbfbfa] pb-16 pt-28"
    >
      <style>{`
        .hero-stage {
          --pointer-x: 72%;
          --pointer-y: 30%;
        }

        .hero-pointer-glow {
          background: radial-gradient(
            520px circle at var(--pointer-x) var(--pointer-y),
            rgba(0, 0, 0, 0.075),
            transparent 62%
          );
          transition: background 120ms linear;
        }

        .hero-grid {
          background-image:
            linear-gradient(rgba(15, 23, 42, 0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15, 23, 42, 0.045) 1px, transparent 1px);
          background-size: 54px 54px;
          mask-image: linear-gradient(to bottom, black, transparent 88%);
        }

        @keyframes heroFloatOne {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(-2deg); }
          50% { transform: translate3d(0, -18px, 0) rotate(1deg); }
        }

        @keyframes heroFloatTwo {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(3deg); }
          50% { transform: translate3d(0, 14px, 0) rotate(0deg); }
        }

        @keyframes heroOrbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes heroShimmer {
          0% { transform: translateX(-140%) skewX(-18deg); }
          55%, 100% { transform: translateX(240%) skewX(-18deg); }
        }

        @keyframes heroPulseDot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, .35); }
          50% { box-shadow: 0 0 0 8px rgba(34, 197, 94, 0); }
        }

        .hero-float-one { animation: heroFloatOne 7s ease-in-out infinite; }
        .hero-float-two { animation: heroFloatTwo 8.5s ease-in-out infinite; }
        .hero-orbit { animation: heroOrbit 24s linear infinite; }
        .hero-live-dot { animation: heroPulseDot 2.2s ease-out infinite; }

        .hero-shimmer::after {
          content: '';
          position: absolute;
          inset: -30% auto -30% -20%;
          width: 32%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.48), transparent);
          animation: heroShimmer 5.2s ease-in-out infinite;
          pointer-events: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-float-one,
          .hero-float-two,
          .hero-orbit,
          .hero-live-dot,
          .hero-shimmer::after {
            animation: none !important;
          }
        }
      `}</style>

      <div className="hero-grid pointer-events-none absolute inset-0 opacity-70" />
      <div className="hero-pointer-glow pointer-events-none absolute inset-0" />

      <div className="pointer-events-none absolute right-[8%] top-[19%] hidden h-[460px] w-[460px] rounded-full border border-black/10 lg:block">
        <div className="hero-orbit h-full w-full rounded-full border border-dashed border-black/10">
          <span className="absolute -left-2 top-1/2 h-4 w-4 rounded-full bg-black" />
          <span className="absolute right-[12%] top-[7%] h-3 w-3 rounded-full border border-black bg-white" />
        </div>
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8">
          <div
            className={`space-y-7 transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white/80 px-4 py-1.5 text-xs uppercase tracking-[0.22em] text-gray-600 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Websites that actually convert
            </p>

            <h1 className="text-5xl font-light leading-[0.95] tracking-tight text-black sm:text-6xl lg:text-7xl">
              Your Website,
              <br />
              <span className="font-semibold">Made Real</span>
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-gray-700 sm:text-xl">
              Beautiful web design for small business owners and entrepreneurs. Build your online presence with a website that looks premium and sells your offer.
            </p>

            <div className="flex flex-col gap-4 pt-2 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="group bg-black px-8 py-6 text-base font-medium text-white hover:bg-gray-800"
              >
                <Link href="/contact" className="flex items-center gap-2">
                  Start Free
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-black bg-white/75 px-8 py-6 text-base font-medium text-black backdrop-blur hover:bg-black hover:text-white"
              >
                <Link href="/#portfolio">View Work</Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-gray-200 pt-5">
              <div className="transition-transform duration-300 hover:-translate-y-1">
                <div className="text-2xl font-semibold text-black sm:text-3xl">48+</div>
                <div className="mt-1 text-xs text-gray-600 sm:text-sm">Websites Created</div>
              </div>
              <div className="transition-transform duration-300 hover:-translate-y-1">
                <div className="text-2xl font-semibold text-black sm:text-3xl">2–4</div>
                <div className="mt-1 text-xs text-gray-600 sm:text-sm">Week Turnaround</div>
              </div>
              <div className="transition-transform duration-300 hover:-translate-y-1">
                <div className="text-2xl font-semibold text-black sm:text-3xl">100%</div>
                <div className="mt-1 text-xs text-gray-600 sm:text-sm">Custom Design</div>
              </div>
            </div>
          </div>

          <div
            className={`relative mx-auto h-[540px] w-full max-w-[650px] transition-all delay-200 duration-1000 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
            }`}
          >
            <div className="hero-float-one absolute left-0 top-14 z-20 w-[82%] overflow-hidden rounded-[1.75rem] border border-black/10 bg-white p-3 shadow-[0_35px_90px_rgba(15,23,42,.16)]">
              <div className="flex items-center justify-between border-b border-black/10 px-3 pb-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Live website</span>
              </div>

              <div className="hero-shimmer relative mt-3 overflow-hidden rounded-[1.25rem] bg-black">
                <Image
                  src="/portfolio-photography.jpg"
                  alt="Premium photography website preview"
                  width={900}
                  height={620}
                  priority
                  className="h-[335px] w-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-white/65">Photography studio</p>
                  <p className="max-w-sm text-3xl font-light leading-tight">Stories that feel as beautiful as they looked.</p>
                  <div className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-xs font-medium text-black">View the gallery</div>
                </div>
              </div>
            </div>

            <div className="hero-float-two absolute bottom-16 right-0 z-30 w-[56%] overflow-hidden rounded-[1.5rem] border border-black/10 bg-white p-3 shadow-[0_28px_70px_rgba(15,23,42,.17)]">
              <div className="relative overflow-hidden rounded-[1rem]">
                <Image
                  src="/portfolio-auto-repair.jpg"
                  alt="Professional service business website preview"
                  width={650}
                  height={460}
                  className="h-44 w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="text-xs text-white/65">Service business</p>
                  <p className="mt-1 text-lg font-medium">Built to earn trust fast.</p>
                </div>
              </div>
            </div>

            <div className="absolute right-6 top-2 z-40 rounded-2xl border border-black/10 bg-white/90 p-4 shadow-xl backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <span className="hero-live-dot h-2.5 w-2.5 rounded-full bg-green-500" />
                <div>
                  <p className="text-xs font-medium text-black">Website live</p>
                  <p className="text-[10px] text-gray-500">Optimized for mobile</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-5 left-[10%] z-40 flex items-center gap-3 rounded-2xl border border-black/10 bg-black px-4 py-3 text-white shadow-xl">
              <MousePointer2 className="h-4 w-4" />
              <div>
                <p className="text-xs font-medium">Designed to convert</p>
                <p className="text-[10px] text-white/55">Clear CTA · Fast load · Mobile ready</p>
              </div>
            </div>

            <div className="absolute left-[6%] top-[47%] z-40 hidden rounded-2xl border border-black/10 bg-white/90 p-3 shadow-xl backdrop-blur sm:block">
              <div className="flex items-center gap-2 text-xs font-medium text-black">
                <CheckCircle2 className="h-4 w-4" />
                Custom design
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
