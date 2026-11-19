'use client';

import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';

const introWords = ['DesignedbyTD', 'Studio®'];

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
    <section id="hero" className="sticky top-0 z-0 flex h-auto flex-col overflow-hidden bg-white text-white sm:h-[100svh] sm:bg-[#0e0e0e]">
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
        .hero-reveal {
          display: inline-block;
          transform: translateY(115%);
          animation: heroReveal 1.1s cubic-bezier(.76, 0, .24, 1) var(--cd) forwards;
          will-change: transform;
        }
        @keyframes heroBgIn { to { opacity: 1; transform: scale(1); } }
        @keyframes heroReveal { to { transform: translateY(0); } }

        /* Mobile spiral hero: five PNG slices of one 969x1623 illustration,
           positioned with container-query units so everything scales with
           the container width. Matches the provided reference. */
        .hero-mobile {
          container-type: inline-size;
          position: relative;
          width: min(100%, 520px);
          margin-inline: auto;
          aspect-ratio: 969 / 1623;
          opacity: 0;
          animation: heroFade 1s ease var(--heroDelay) forwards;
        }
        @keyframes heroFade { to { opacity: 1; } }
        .hero-mobile .m-part { position: absolute; display: block; }
        .hero-mobile img.m-part { height: auto; }
        .hero-mobile .orkan { left: 0; top: 6.77757%; width: 100%; }
        .hero-mobile .forma { left: 0; top: 22.48922%; width: 100%; }
        .hero-mobile .center-ribbon { left: 0; top: 46.51879%; width: 100%; }
        .hero-mobile .fuel { left: 0; top: 53.48121%; width: 100%; }
        .hero-mobile .akjo { left: 0; top: 69.00801%; width: 100%; }
        .hero-mobile .m-title {
          left: 24.7678%;
          top: 47.31978%;
          width: 50.4644%;
          margin: 0;
          text-align: center;
          color: #000;
          font-size: 3.85cqw;
          line-height: 1;
          font-weight: 750;
          letter-spacing: -0.055em;
        }
        .hero-mobile .m-title sup { font-size: 0.46em; vertical-align: super; }

        @media (prefers-reduced-motion: reduce) {
          .intro-overlay { display: none; }
          .hero-bg { opacity: 1; transform: none; animation: none; }
          .hero-reveal { transform: none; animation: none; }
          .hero-mobile { opacity: 1; animation: none; }
        }
      `}</style>

      {/* MOBILE: spiral hero assembled from the illustration slices, with the
          small two-line studio title in the white center ribbon. The top bar
          (logo + MENU) and navigation come from the site Header. */}
      <div className="relative z-10 w-full px-4 pb-6 pt-16 sm:hidden">
        <div className="hero-mobile" style={heroDelay}>
          <img className="m-part orkan" src="/mobile-hero/orkan.png" alt="Orkan website demo" loading="eager" decoding="async" />
          <img className="m-part forma" src="/mobile-hero/forma.png" alt="Forma website demo" loading="eager" decoding="async" />
          <img className="m-part center-ribbon" src="/mobile-hero/center-ribbon.png" alt="" aria-hidden="true" loading="eager" decoding="async" />
          <img className="m-part fuel" src="/mobile-hero/fuel.png" alt="Fuel website demo" loading="eager" decoding="async" />
          <img className="m-part akjo" src="/mobile-hero/akjo.png" alt="Akjo Studio website demo" loading="eager" decoding="async" />
          <h1 className="m-part m-title">
            DesignedbyTD<br />Studio<sup>®</sup>
          </h1>
        </div>
      </div>

      {/* DESKTOP/TABLET: full-bleed background image with overlaid copy */}
      <img
        src="/hero-feature.webp"
        alt="Selected website demos by DesignedbyTD"
        className="hero-bg absolute inset-0 hidden !h-full w-full object-cover object-center sm:block"
        style={heroDelay}
        loading="eager"
        decoding="async"
      />

      {/* desktop centered copy */}
      <div className="hero-copy relative z-10 hidden flex-1 flex-col items-center justify-center px-4 py-24 text-center sm:flex sm:px-6 lg:px-8">
        <h1 className="max-w-5xl overflow-hidden pb-[0.14em] text-[clamp(2.8rem,8vw,6.4rem)] font-semibold leading-[0.92] tracking-[-0.055em] drop-shadow-[0_2px_24px_rgba(0,0,0,.4)]">
          <span className="hero-reveal" style={{ ['--cd']: skipIntro ? '0.2s' : '2.25s' } as CSSProperties}>
            DesignedbyTD <span className="text-white/45">Studio®</span>
          </span>
        </h1>
      </div>

      {/* desktop bottom info bar */}
      <div className="relative z-10 hidden flex-wrap items-center justify-between gap-x-6 gap-y-1.5 px-4 py-4 text-[11px] font-medium uppercase tracking-[0.14em] text-black/80 sm:flex sm:px-6 lg:px-8">
        <span>Custom Website Studio</span>
        <span className="hidden sm:inline">Orange County, CA</span>
        <span suppressHydrationWarning>{clock || '—'}</span>
        <span>100% Custom Built</span>
      </div>
    </section>
  );
}
