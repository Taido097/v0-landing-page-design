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

  const heroDelay = { ['--heroDelay']: skipIntro ? '0.1s' : '2.15s' } as CSSProperties;

  return (
    <section id="hero" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#0e0e0e] text-white">
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

        .hero-bg {
          opacity: 0;
          transform: scale(1.06);
          animation: heroBgIn 1.6s cubic-bezier(.16, 1, .3, 1) var(--heroDelay) forwards;
          will-change: transform, opacity;
        }
        .hero-copy > * {
          opacity: 0;
          transform: translateY(22px);
          animation: heroCopyIn .9s cubic-bezier(.16, 1, .3, 1) forwards;
          animation-delay: var(--cd);
        }
        @keyframes heroBgIn { to { opacity: 1; transform: scale(1); } }
        @keyframes heroCopyIn { to { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) {
          .intro-overlay { display: none; }
          .hero-bg, .hero-copy > * { opacity: 1; transform: none; animation: none; }
        }
      `}</style>

      {/* full-bleed background image */}
      <img
        src="/hero-feature.webp"
        alt="Selected website demos by DesignedbyTD"
        className="hero-bg absolute inset-0 h-full w-full object-cover object-center"
        style={heroDelay}
        loading="eager"
        decoding="async"
      />
      {/* legibility scrim */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(0,0,0,.52) 0%, rgba(0,0,0,.28) 45%, rgba(0,0,0,.08) 72%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,.28), rgba(0,0,0,.12) 30%, rgba(0,0,0,.2) 100%)',
        }}
        aria-hidden="true"
      />

      {/* centered copy */}
      <div className="hero-copy relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1
          className="max-w-5xl text-[clamp(2.8rem,8vw,6.4rem)] font-semibold leading-[0.92] tracking-[-0.055em] drop-shadow-[0_2px_24px_rgba(0,0,0,.4)]"
          style={{ ['--cd']: skipIntro ? '0.2s' : '2.25s' } as CSSProperties}
        >
          DesignedbyTD <span className="text-white/45">Studio®</span>
        </h1>
        <p
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/80 drop-shadow-[0_1px_16px_rgba(0,0,0,.35)] sm:text-lg"
          style={{ ['--cd']: skipIntro ? '0.32s' : '2.37s' } as CSSProperties}
        >
          Custom, mobile-friendly websites for local businesses—built to look professional, load fast, and turn visitors into customers.
        </p>
        <div
          className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
          style={{ ['--cd']: skipIntro ? '0.44s' : '2.49s' } as CSSProperties}
        >
          <Button asChild size="lg" className="group rounded-none bg-white px-8 py-6 text-xs font-semibold tracking-[0.09em] text-black hover:bg-white/88">
            <Link href="/contact" prefetch={false} className="flex items-center gap-3">
              Start Your Project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="group rounded-none border-white/55 bg-white/5 px-8 py-6 text-xs font-semibold tracking-[0.09em] text-white backdrop-blur-sm hover:bg-white hover:text-black">
            <Link href="/demos" prefetch={false} className="flex items-center gap-3">
              Explore the Work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>

      {/* bottom info bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-4 text-[11px] font-medium uppercase tracking-[0.14em] text-white/70 sm:px-6 lg:px-8">
        <span>Custom Website Studio</span>
        <span className="hidden sm:inline">Orange County, CA</span>
        <span suppressHydrationWarning>{clock || '—'}</span>
        <span>100% Custom Built</span>
      </div>
    </section>
  );
}
