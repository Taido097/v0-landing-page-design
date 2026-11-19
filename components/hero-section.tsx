'use client';

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
        /* On phones the composite is wide, so cover crops the demos off the
           sides. Show the whole image instead and nudge it up a touch so the
           centered title doesn't sit on top of it. */
        @media (max-width: 640px) {
          .hero-bg {
            object-fit: contain;
            object-position: center 38%;
          }
        }
        .hero-reveal {
          display: inline-block;
          transform: translateY(115%);
          animation: heroReveal 1.1s cubic-bezier(.76, 0, .24, 1) var(--cd) forwards;
          will-change: transform;
        }
        @keyframes heroBgIn { to { opacity: 1; transform: scale(1); } }
        @keyframes heroReveal { to { transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) {
          .intro-overlay { display: none; }
          .hero-bg { opacity: 1; transform: none; animation: none; }
          .hero-reveal { transform: none; animation: none; }
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

      {/* centered copy */}
      <div className="hero-copy relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
        <h1 className="max-w-5xl overflow-hidden pb-[0.14em] text-[clamp(2rem,10vw,6.4rem)] font-semibold leading-[0.95] tracking-[-0.045em] drop-shadow-[0_2px_24px_rgba(0,0,0,.4)] sm:leading-[0.92] sm:tracking-[-0.055em]">
          <span className="hero-reveal" style={{ ['--cd']: skipIntro ? '0.2s' : '2.25s' } as CSSProperties}>
            DesignedbyTD <span className="text-white/45">Studio®</span>
          </span>
        </h1>
      </div>

      {/* bottom info bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 px-4 py-4 text-center text-[10px] font-medium uppercase tracking-[0.1em] text-black/80 sm:justify-between sm:gap-x-6 sm:px-6 sm:text-[11px] sm:tracking-[0.14em] lg:px-8">
        <span>Custom Website Studio</span>
        <span className="hidden sm:inline">Orange County, CA</span>
        <span suppressHydrationWarning>{clock || '—'}</span>
        <span>100% Custom Built</span>
      </div>
    </section>
  );
}
