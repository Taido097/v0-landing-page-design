'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

type HeroCard = {
  name: string;
  tag: string;
  href: string;
  image: string;
};

// Static screenshots of the live demos, shown as an arched row in the hero.
const shot = (path: string) =>
  `https://image.thum.io/get/width/900/crop/640/noanimate/wait/2/https://designedbytd.com${path}`;

const cards: HeroCard[] = [
  { name: 'Orkan', tag: 'Photography', href: '/portfolio/orkan', image: shot('/portfolio/orkan') },
  { name: 'Forma', tag: 'Creative studio', href: '/portfolio/forma-studio', image: 'https://image.thum.io/get/width/900/crop/640/noanimate/wait/3/https://forma-design-studio.framer.website/' },
  { name: 'Fuel', tag: 'Creative agency', href: '/portfolio/fuel-agency', image: shot('/portfolio/fuel-agency') },
  { name: 'Akjo', tag: 'Portfolio', href: '/portfolio/akjo-portfolio', image: shot('/portfolio/akjo-portfolio') },
  { name: 'Jorge', tag: 'Personal brand', href: '/portfolio/jorge-portfolio', image: shot('/portfolio/jorge-portfolio') },
];

export function HeroSection() {
  const [entered, setEntered] = useState(false);
  const center = (cards.length - 1) / 2;

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setEntered(true);
      return;
    }
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setEntered(true)));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#f7f6f4] pt-28 pb-16 text-[#121212] sm:pt-32 lg:pt-36"
    >
      <style>{`
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
          box-shadow: 0 30px 70px rgba(18, 18, 18, .18), 0 2px 6px rgba(18,18,18,.08);
          transition: transform 1.05s cubic-bezier(.19, 1, .22, 1), opacity .9s ease;
          will-change: transform, opacity;
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
          box-shadow: 0 40px 90px rgba(18,18,18,.26), 0 2px 6px rgba(18,18,18,.1);
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

      <div className="ekon-stage mx-auto mt-14 w-full max-w-[1280px] px-4 sm:mt-16 sm:px-6 lg:px-8" aria-label="Featured website demos">
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
          const startTransform = `translate3d(${x * 0.6}px, ${y + 150}px, ${depth - 60}px) rotateY(${rotateY}deg) rotateZ(${rotateZ * 0.4}deg) scale(${scale * 0.8})`;

          return (
            <Link
              key={card.name}
              href={card.href}
              prefetch={false}
              className="ekon-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              style={{
                zIndex,
                opacity: entered ? 1 : 0,
                transform: entered ? finalTransform : startTransform,
                transitionDelay: entered ? `${index * 95}ms` : '0ms',
              }}
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
