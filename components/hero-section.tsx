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
  const copyDelay = { ['--cd']: skipIntro ? '0.25s' : '2.3s' } as CSSProperties;

  return (
    <section id="hero" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#f5f4f2] text-[#121212]">
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
          position: fixed; inset: 0; z-index: 9999; color: #fff;
          display: flex; align-items: center; justify-content: center;
          background: transparent; pointer-events: none;
          animation: introClear .01s linear 3.1s forwards;
        }
        .intro-overlay.intro-skip { display: none; }
        .intro-panels { position: absolute; inset: 0; display: flex; }
        .intro-panel {
          flex: 1 1 0; height: 100%; background: #000;
          transform-origin: top center; transform: scaleY(1); will-change: transform;
          animation: introPanelUp .82s cubic-bezier(.76, 0, .24, 1) forwards;
          animation-delay: calc(1.95s + var(--p));
          box-shadow: 1px 0 0 #000, -1px 0 0 #000;
        }
        .intro-inner {
          position: absolute; inset: 0; z-index: 2;
          display: flex; align-items: center; justify-content: center; padding: 24px;
          animation: introHold 2.1s ease forwards;
        }
        .intro-name {
          display: flex; flex-wrap: wrap; justify-content: center; gap: .3em; text-align: center;
          font-size: clamp(30px, 7vw, 76px); font-weight: 600; letter-spacing: -.045em; line-height: 1;
        }
        .intro-w {
          display: inline-block; opacity: 0; transform: translateY(26px);
          animation: introWord .7s cubic-bezier(.2, .8, .2, 1) var(--wd) forwards;
        }
        @keyframes introWord { to { opacity: 1; transform: translateY(0); } }
        @keyframes introPanelUp { to { transform: scaleY(0); } }
        @keyframes introHold { 0%, 86% { opacity: 1; } 100% { opacity: 0; } }
        @keyframes introClear { to { visibility: hidden; } }

        .hero-word {
          opacity: 0;
          transform: translateY(34px);
          animation: heroWordIn 1s cubic-bezier(.16, 1, .3, 1) var(--cd) forwards;
          will-change: transform, opacity;
        }
        .hero-img {
          opacity: 0;
          transform: translate(-50%, calc(-50% + 26px)) scale(.96);
          animation: heroImgIn 1.2s cubic-bezier(.16, 1, .3, 1) var(--heroDelay) forwards;
          will-change: transform, opacity;
        }
        @keyframes heroWordIn { to { opacity: 1; transform: translateY(0); } }
        @keyframes heroImgIn { to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }
        @media (prefers-reduced-motion: reduce) {
          .intro-overlay { display: none; }
          .hero-word { opacity: 1; transform: none; animation: none; }
          .hero-img { opacity: 1; transform: translate(-50%, -50%); animation: none; }
        }
      `}</style>

      {/* stage: big word behind, image on top of its middle */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
        {/* the words — sit BEHIND the image (z-10); ends stick out on each side */}
        <h1 className="pointer-events-none absolute left-1/2 top-1/2 z-[10] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center text-[clamp(2.4rem,9vw,7rem)] font-semibold leading-none tracking-[-0.06em]">
          <span className="hero-word inline-block" style={copyDelay}>
            DesignedbyTD <span className="text-black/35">Studio®</span>
          </span>
        </h1>

        {/* the image — ON TOP (z-20), covering the middle of the words */}
        <img
          src="/hero-feature.webp"
          alt="Selected website demos by DesignedbyTD"
          className="hero-img absolute left-1/2 top-1/2 z-[20] w-[min(68vw,860px)]"
          style={heroDelay}
          loading="eager"
          decoding="async"
        />
      </div>

      {/* bottom info bar */}
      <div className="relative z-30 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-4 text-[11px] font-medium uppercase tracking-[0.14em] text-black/55 sm:px-6 lg:px-8">
        <span>Custom Website Studio</span>
        <span className="hidden sm:inline">Orange County, CA</span>
        <span suppressHydrationWarning>{clock || '—'}</span>
        <span>100% Custom Built</span>
      </div>
    </section>
  );
}
