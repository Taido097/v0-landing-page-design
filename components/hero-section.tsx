'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';

const introWords = ['DesignedbyTD', 'Studio'];

export function HeroSection() {
  const [skipIntro, setSkipIntro] = useState(false);
  const [clock, setClock] = useState('');

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem('td-intro-seen') === '1';
    } catch {
      seen = false;
    }
    if (reduce || seen) {
      setSkipIntro(true);
      return;
    }
    try {
      sessionStorage.setItem('td-intro-seen', '1');
    } catch {
      // ignore storage failures
    }
  }, []);

  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString('en-US', { hour12: true }));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="hero" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#f7f6f4] text-[#121212]">
      <div className={`intro-overlay${skipIntro ? ' intro-skip' : ''}`} aria-hidden="true">
        <div className="intro-panels">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="intro-panel" style={{ ['--p']: `${i * 85}ms` } as CSSProperties} />
          ))}
        </div>
        <div className="intro-inner">
          <div className="intro-name">
            {introWords.map((w, i) => (
              <span key={w} className="intro-w" style={{ ['--wd']: `${0.15 + i * 0.35}s` } as CSSProperties}>
                {w}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .intro-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          pointer-events: none;
          animation: introClear .01s linear 3.1s forwards;
        }
        .intro-overlay.intro-skip { display: none; }
        .intro-panels { position: absolute; inset: 0; display: flex; }
        .intro-panel {
          flex: 1 1 0;
          height: 100%;
          background: #000;
          transform-origin: top center;
          transform: scaleY(1);
          will-change: transform;
          animation: introPanelUp .82s cubic-bezier(.76, 0, .24, 1) forwards;
          animation-delay: calc(1.95s + var(--p));
          box-shadow: 1px 0 0 #000, -1px 0 0 #000;
        }
        .intro-inner {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: introHold 2.1s ease forwards;
        }
        .intro-name {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: .3em;
          text-align: center;
          font-size: clamp(30px, 7vw, 76px);
          font-weight: 600;
          letter-spacing: -.045em;
          line-height: 1;
        }
        .intro-w {
          display: inline-block;
          opacity: 0;
          transform: translateY(26px);
          animation: introWord .7s cubic-bezier(.2, .8, .2, 1) var(--wd) forwards;
        }
        @keyframes introWord { to { opacity: 1; transform: translateY(0); } }
        @keyframes introPanelUp { to { transform: scaleY(0); } }
        @keyframes introHold { 0%, 86% { opacity: 1; } 100% { opacity: 0; } }
        @keyframes introClear { to { visibility: hidden; } }
        @media (prefers-reduced-motion: reduce) { .intro-overlay { display: none; } }

        .hero-feature {
          opacity: 0;
          transform: translateY(44px) scale(.97);
          animation: heroUp 1.1s cubic-bezier(.16, 1, .3, 1) var(--heroDelay) forwards;
          will-change: transform, opacity;
        }
        @keyframes heroUp { to { opacity: 1; transform: translateY(0) scale(1); } }
        @media (prefers-reduced-motion: reduce) {
          .hero-feature { opacity: 1; transform: none; animation: none; }
        }
      `}</style>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-10 pt-28 text-center sm:px-6 sm:pt-32 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/40">DesignedbyTD Studio</p>
        <h1 className="mt-5 max-w-3xl text-[clamp(2.3rem,5.2vw,4.2rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
          Make every visit count.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-black/60 sm:text-lg">
          Custom, mobile-friendly websites for local businesses—built to look professional, load fast, and turn visitors into customers.
        </p>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="group rounded-none bg-[#121212] px-8 py-6 text-xs font-semibold tracking-[0.09em] text-white hover:bg-black/85">
            <Link href="/contact" prefetch={false} className="flex items-center gap-3">
              Start Your Project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="group rounded-none border-black/20 bg-white px-8 py-6 text-xs font-semibold tracking-[0.09em] text-black hover:bg-black hover:text-white">
            <Link href="/demos" prefetch={false} className="flex items-center gap-3">
              Explore the Work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div
          className="hero-feature mt-10 w-full max-w-[1120px]"
          style={{ ['--heroDelay']: skipIntro ? '0.1s' : '2.15s' } as CSSProperties}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-feature.webp"
            alt="Selected website demos by DesignedbyTD"
            className="h-auto w-full"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-black/10 px-4 py-4 text-[11px] font-medium uppercase tracking-[0.14em] text-black/55 sm:px-6 lg:px-8">
        <span>Custom Website Studio</span>
        <span className="hidden sm:inline">Orange County, CA</span>
        <span suppressHydrationWarning>{clock || '—'}</span>
        <span>100% Custom Built</span>
      </div>
    </section>
  );
}
