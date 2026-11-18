'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';

type HeroCard = {
  name: string;
  tag: string;
  href: string;
  image: string;
};

// Static screenshots of the live demos, shown as an arched row in the hero.
// Kept small so they decode fast and don't jank the load-in animation.
const shot = (path: string) =>
  `https://image.thum.io/get/width/600/crop/430/noanimate/wait/2/https://designedbytd.com${path}`;

const cards: HeroCard[] = [
  { name: 'Orkan', tag: 'Photography', href: '/portfolio/orkan', image: shot('/portfolio/orkan') },
  { name: 'Forma', tag: 'Creative studio', href: '/portfolio/forma-studio', image: 'https://image.thum.io/get/width/600/crop/430/noanimate/wait/3/https://forma-design-studio.framer.website/' },
  { name: 'Fuel', tag: 'Creative agency', href: '/portfolio/fuel-agency', image: shot('/portfolio/fuel-agency') },
  { name: 'Akjo', tag: 'Portfolio', href: '/portfolio/akjo-portfolio', image: shot('/portfolio/akjo-portfolio') },
  { name: 'Jorge', tag: 'Personal brand', href: '/portfolio/jorge-portfolio', image: shot('/portfolio/jorge-portfolio') },
];

export function HeroSection() {
  const center = (cards.length - 1) / 2;
  const [count, setCount] = useState(0);
  const [skipIntro, setSkipIntro] = useState(false);

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
      setCount(100);
      return;
    }

    try {
      sessionStorage.setItem('td-intro-seen', '1');
    } catch {
      // ignore storage failures
    }

    const start = performance.now();
    const duration = 1700;
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setCount(Math.round(progress * 100));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#f7f6f4] pt-28 pb-16 text-[#121212] sm:pt-32 lg:pt-36"
    >
      <div className={`intro-overlay${skipIntro ? ' intro-skip' : ''}`} aria-hidden="true">
        <div className="intro-panels">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="intro-panel" style={{ ['--p']: `${i * 85}ms` } as CSSProperties} />
          ))}
        </div>
        <div className="intro-inner">
          <span className="intro-word">DesignedbyTD Studio</span>
          <span className="intro-count">{String(count).padStart(3, '0')}<i>%</i></span>
          <span className="intro-bar"><i /></span>
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
        .intro-panels {
          position: absolute;
          inset: 0;
          display: flex;
        }
        .intro-panel {
          flex: 1 1 0;
          height: 100%;
          background: #0e0e0e;
          transform: translateY(0);
          will-change: transform;
          animation: introPanelUp .78s cubic-bezier(.76, 0, .24, 1) forwards;
          animation-delay: calc(1.95s + var(--p));
          /* hide hairline gaps between panels */
          box-shadow: 1px 0 0 #0e0e0e, -1px 0 0 #0e0e0e;
        }
        .intro-inner {
          position: relative;
          z-index: 2;
          width: min(78vw, 360px);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 18px;
          animation: introText 2.1s ease forwards;
        }
        .intro-word {
          font-size: clamp(15px, 2.4vw, 19px);
          font-weight: 500;
          letter-spacing: -.01em;
        }
        .intro-count {
          display: flex;
          align-items: flex-start;
          font-size: clamp(56px, 12vw, 120px);
          font-weight: 600;
          line-height: .9;
          letter-spacing: -.05em;
          font-variant-numeric: tabular-nums;
        }
        .intro-count i {
          font-size: .28em;
          font-style: normal;
          margin-top: .35em;
          margin-left: .12em;
          opacity: .6;
        }
        .intro-bar {
          width: 100%;
          height: 2px;
          background: rgba(255,255,255,.16);
          overflow: hidden;
        }
        .intro-bar i {
          display: block;
          height: 100%;
          background: #fff;
          transform-origin: left center;
          transform: scaleX(0);
          animation: introFill 1.7s cubic-bezier(.4, 0, .1, 1) forwards;
        }
        @keyframes introPanelUp {
          to { transform: translateY(-101%); }
        }
        @keyframes introText {
          0%   { opacity: 0; transform: translateY(14px); }
          10%  { opacity: 1; transform: translateY(0); }
          80%  { opacity: 1; transform: translateY(0); }
          92%  { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        @keyframes introFill {
          to { transform: scaleX(1); }
        }
        @keyframes introClear {
          to { visibility: hidden; }
        }
        @media (prefers-reduced-motion: reduce) {
          .intro-overlay { display: none; }
        }

        .ekon-stage {
          position: relative;
          height: 540px;
          perspective: 1700px;
          perspective-origin: 50% 38%;
        }
        .ekon-card {
          position: absolute;
          top: 50%;
          left: 50%;
          width: clamp(240px, 24vw, 360px);
          aspect-ratio: 16 / 11;
          margin-left: calc(clamp(240px, 24vw, 360px) / -2);
          margin-top: calc(clamp(240px, 24vw, 360px) * 11 / 16 / -2);
          border-radius: 18px;
          overflow: hidden;
          background: #e9e7e3;
          box-shadow: 0 14px 34px rgba(18, 18, 18, .14);
          transition: box-shadow .3s ease;
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          outline: 1px solid rgba(18,18,18,.06);
          outline-offset: -1px;
        }
        .ekon-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
        }
        .ekon-card-label {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 12px 16px;
          background: linear-gradient(to top, rgba(10,10,10,.78), rgba(10,10,10,0));
          color: #fff;
          font-size: 13px;
          letter-spacing: -.01em;
        }
        .ekon-card-label span:last-child {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: .12em;
          opacity: .72;
        }
        .ekon-card:hover {
          box-shadow: 0 26px 60px rgba(18,18,18,.22);
        }

        /* Staggered load-in: each card stays hidden until its delay, then rises
           and settles into the arch. Plays on every page load. */
        @keyframes ekonRise {
          0%   { opacity: 0; transform: var(--start); }
          100% { opacity: 1; transform: var(--final); }
        }
        .ekon-card {
          opacity: 1;
          transform: var(--final);
          animation: ekonRise 1.1s cubic-bezier(.16, 1, .3, 1) both;
          animation-delay: calc(var(--introDelay, 0ms) + var(--delay));
        }
        @media (prefers-reduced-motion: reduce) {
          .ekon-card { animation: none; }
        }

        @media (max-width: 900px) {
          .ekon-stage { height: 460px; perspective: 1200px; }
          .ekon-card { width: clamp(190px, 52vw, 280px); margin-left: calc(clamp(190px, 52vw, 280px) / -2); margin-top: calc(clamp(190px, 52vw, 280px) * 11 / 16 / -2); }
        }
        @media (max-width: 560px) {
          .ekon-stage { height: 400px; }
          .ekon-card { width: clamp(180px, 66vw, 260px); margin-left: calc(clamp(180px, 66vw, 260px) / -2); margin-top: calc(clamp(180px, 66vw, 260px) * 11 / 16 / -2); }
        }
      `}</style>

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/40">DesignedbyTD Studio</p>
        <h1 className="mx-auto mt-5 max-w-3xl text-[clamp(2.6rem,6vw,4.6rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
          Make every visit count.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-black/60 sm:text-lg">
          Custom, mobile-friendly websites for local businesses—built to look professional, load fast, and turn visitors into customers.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
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
      </div>

      <div
        className="ekon-stage mx-auto mt-14 w-full max-w-[1280px] px-4 sm:mt-16 sm:px-6 lg:px-8"
        aria-label="Featured website demos"
        style={{ ['--introDelay']: skipIntro ? '0ms' : '2000ms' } as CSSProperties}
      >
        {cards.map((card, index) => {
          const offset = index - center;
          // Arched "smile": center sits lowest/front, sides lift and tilt outward.
          const spread = 210; // horizontal distance between neighbours
          const x = offset * spread;
          const y = (offset * offset) * -26; // sides rise
          const rotateZ = offset * 5.2;
          const rotateY = offset * -11;
          const scale = 1 - Math.abs(offset) * 0.06;
          const depth = -Math.abs(offset) * 90;
          const zIndex = 50 - Math.abs(offset) * 10;

          const finalTransform = `translate3d(${x}px, ${y}px, ${depth}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`;
          // Keep rotation identical in both keyframes so only position + scale
          // animate — the GPU handles that cheaply, no shadow re-raster.
          const startTransform = `translate3d(${x}px, ${y + 120}px, ${depth}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale * 0.86})`;

          return (
            <Link
              key={card.name}
              href={card.href}
              prefetch={false}
              className="ekon-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              style={{
                zIndex,
                ['--final']: finalTransform,
                ['--start']: startTransform,
                ['--delay']: `${index * 130}ms`,
              } as CSSProperties}
              aria-label={`Open ${card.name} demo`}
            >
              <img src={card.image} alt={`${card.name} website preview`} loading="eager" decoding="async" />
              <span className="ekon-card-label">
                <span>{card.name}</span>
                <span>{card.tag}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
