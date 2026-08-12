'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';

type FiberCardData = {
  number: string;
  title: string;
  href: string;
  ariaLabel: string;
  images: string[];
};

const cards: FiberCardData[] = [
  {
    number: '01',
    title: 'Portfolio',
    href: '/portfolio/photography-studio',
    ariaLabel: 'Portfolio service — Luna Frame Studio demo',
    images: [
      'https://framerusercontent.com/images/gPkgBcGwatmPdwzMlpToFBHNSs.png?width=912&height=1170',
      'https://framerusercontent.com/images/yIrZXCStv1OSKgU3LeSDNUk8.png?width=1200&height=1799',
      'https://framerusercontent.com/images/hy8DPmqfuubnG4z6KVW21Noim3k.png?width=750&height=1125',
      'https://framerusercontent.com/images/YN7uZ6616b5EToA62ayKCfXDN8.png?width=609&height=768',
      'https://framerusercontent.com/images/4vdqIXoUGYvEAYjE1bGxf2b99U.png?width=736&height=1104',
    ],
  },
  {
    number: '02',
    title: 'Restaurant',
    href: '/portfolio/auto-repair-shop',
    ariaLabel: 'Restaurant service — Beanro Coffee demo',
    images: [
      'https://framerusercontent.com/images/9BOQjMuTjInl3CMPRrkdP4QKJZU.png?width=2440&height=2344',
      'https://framerusercontent.com/images/snawRh3kduwUM969MzVgQuJ8JM.png?width=4096&height=1712',
      'https://framerusercontent.com/images/mAJ49eFrnsg4sH11nksIz5FP0.png',
      'https://framerusercontent.com/images/tY8YxgotM6gMQRc5vO5l6zlamE.png',
      'https://framerusercontent.com/images/sMRY0L6VTBO99vZ4afLEdx5uI.png?width=5280&height=570',
    ],
  },
  {
    number: '03',
    title: 'Scheduling',
    href: '/portfolio/salon-spa',
    ariaLabel: 'Scheduling service — Salonix demo',
    images: [
      'https://framerusercontent.com/images/dIylQwKI5TLfITTBRdEzEwYx7TY.jpg?width=2330&height=1536',
      'https://framerusercontent.com/images/0Ta2C6nFSV7xHeyaBtzWshdMJ7Y.png?width=480&height=518',
      'https://framerusercontent.com/images/lJExXEGT0SmfjlAZmiGFw8Mb18.png?width=480&height=518',
      'https://framerusercontent.com/images/f1qC2lR4myStW2KtLzTaO5ugjw.png?width=480&height=518',
      'https://framerusercontent.com/images/PC4iC5riUtDaAZildAdHgRXg0.png?width=904&height=1200',
    ],
  },
  {
    number: '04',
    title: 'Custom Website',
    href: '/portfolio/restaurant-website',
    ariaLabel: 'Custom Website service — Qitchen Sushi demo',
    images: [
      'https://framerusercontent.com/images/10I4GJR5nYsUsYnoOPIDjoapkA.webp?height=2400&width=2000',
      'https://framerusercontent.com/images/QAnUAEBWAkCE4NM4Ja4aQy9Tu4.webp?height=600&width=900',
      'https://framerusercontent.com/images/quqbVpcYdgH65rZqF71BSohYQ.webp?height=600&width=900',
      'https://framerusercontent.com/images/27vE5qIMgg0IarFBK9fDPTLr9ZA.webp?height=600&width=900',
      'https://framerusercontent.com/images/SMJY8uQcFDPv5vRNMRmZijjygkM.webp?height=2400&width=2000',
    ],
  },
];

function ProgressiveBlur() {
  return (
    <div className="fiber-blur" aria-hidden="true">
      {Array.from({ length: 8 }, (_, index) => (
        <span key={index} className={`fiber-blur-${index + 1}`} />
      ))}
    </div>
  );
}

function FiberCard({ card }: { card: FiberCardData }) {
  const [active, setActive] = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const enter = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setActive(true);
  };

  const leave = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => setActive(false), 100);
  };

  return (
    <Link
      href={card.href}
      aria-label={card.ariaLabel}
      onMouseEnter={enter}
      onMouseLeave={leave}
      onFocus={enter}
      onBlur={leave}
      className="fiber-card group relative block min-w-0 overflow-hidden rounded-xl bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
    >
      {card.images.map((image, index) => (
        <div
          key={`${card.number}-${index}`}
          className={`fiber-image-layer absolute inset-0 overflow-hidden ${index === 0 || active ? 'is-visible' : ''}`}
          style={{
            zIndex: index + 1,
            ['--fiber-delay' as string]: index === 0 ? '0ms' : `${(index - 1) * 300}ms`,
          }}
        >
          <Image
            src={image}
            alt=""
            fill
            sizes="(max-width: 640px) 94vw, (max-width: 1024px) 46vw, 24vw"
            className="object-cover"
          />
        </div>
      ))}

      <ProgressiveBlur />

      <span className="absolute left-0 top-0 z-20 p-4 text-xs leading-none tracking-[-0.02em] text-[#fafafa]">
        {card.number}
      </span>
      <span className="absolute inset-x-0 bottom-0 z-20 p-4 text-xs leading-none tracking-[-0.02em] text-[#fafafa]">
        {card.title}
      </span>
    </Link>
  );
}

export function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="scroll-mt-24 overflow-hidden border-y border-black/10 bg-[#fafafa] py-20 text-[#121212] sm:py-24 lg:py-28"
    >
      <style>{`
        .fiber-card {
          aspect-ratio: 5 / 6;
          isolation: isolate;
        }

        .fiber-image-layer {
          transform: scale(0);
          transform-origin: 50% 50%;
          transition-property: transform;
          transition-duration: .4s;
          transition-timing-function: cubic-bezier(.2, .75, .25, 1);
          transition-delay: 100ms;
          will-change: transform;
        }

        .fiber-image-layer.is-visible {
          transform: scale(1);
          transition-delay: var(--fiber-delay);
        }

        .fiber-blur {
          position: absolute;
          inset: auto 0 0;
          z-index: 12;
          height: 30%;
          overflow: hidden;
          pointer-events: none;
        }

        .fiber-blur span {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .fiber-blur-1 {
          z-index: 1;
          backdrop-filter: blur(.28125px);
          -webkit-backdrop-filter: blur(.28125px);
          mask-image: linear-gradient(to bottom, transparent 0%, #000 12.5%, #000 25%, transparent 37.5%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 12.5%, #000 25%, transparent 37.5%);
        }
        .fiber-blur-2 {
          z-index: 2;
          backdrop-filter: blur(.5625px);
          -webkit-backdrop-filter: blur(.5625px);
          mask-image: linear-gradient(to bottom, transparent 12.5%, #000 25%, #000 37.5%, transparent 50%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 12.5%, #000 25%, #000 37.5%, transparent 50%);
        }
        .fiber-blur-3 {
          z-index: 3;
          backdrop-filter: blur(1.125px);
          -webkit-backdrop-filter: blur(1.125px);
          mask-image: linear-gradient(to bottom, transparent 25%, #000 37.5%, #000 50%, transparent 62.5%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 25%, #000 37.5%, #000 50%, transparent 62.5%);
        }
        .fiber-blur-4 {
          z-index: 4;
          backdrop-filter: blur(2.25px);
          -webkit-backdrop-filter: blur(2.25px);
          mask-image: linear-gradient(to bottom, transparent 37.5%, #000 50%, #000 62.5%, transparent 75%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 37.5%, #000 50%, #000 62.5%, transparent 75%);
        }
        .fiber-blur-5 {
          z-index: 5;
          backdrop-filter: blur(4.5px);
          -webkit-backdrop-filter: blur(4.5px);
          mask-image: linear-gradient(to bottom, transparent 50%, #000 62.5%, #000 75%, transparent 87.5%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 50%, #000 62.5%, #000 75%, transparent 87.5%);
        }
        .fiber-blur-6 {
          z-index: 6;
          backdrop-filter: blur(9px);
          -webkit-backdrop-filter: blur(9px);
          mask-image: linear-gradient(to bottom, transparent 62.5%, #000 75%, #000 87.5%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 62.5%, #000 75%, #000 87.5%, transparent 100%);
        }
        .fiber-blur-7 {
          z-index: 7;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          mask-image: linear-gradient(to bottom, transparent 75%, #000 87.5%, #000 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 75%, #000 87.5%, #000 100%);
        }
        .fiber-blur-8 {
          z-index: 8;
          backdrop-filter: blur(36px);
          -webkit-backdrop-filter: blur(36px);
          mask-image: linear-gradient(to bottom, transparent 87.5%, #000 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 87.5%, #000 100%);
        }

        @media (prefers-reduced-motion: reduce) {
          .fiber-image-layer {
            transition: none !important;
          }
        }
      `}</style>

      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="border-t border-black/10 pt-7 sm:pt-8">
          <h2 className="max-w-[720px] text-[clamp(3.5rem,7vw,6.25rem)] font-medium leading-[.9] tracking-[-0.06em]">
            Services
          </h2>
          <p className="mt-6 max-w-[460px] text-base font-light leading-[1.45] tracking-[-0.02em] text-black/70">
            Custom website services built around how your business attracts customers, takes bookings, and presents its work.
          </p>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {cards.map((card) => (
            <FiberCard key={card.number} card={card} />
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:justify-end">
          <Link
            href="/demos"
            className="group inline-flex items-center gap-3 rounded-full bg-black px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,.14)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/85 hover:shadow-[0_14px_34px_rgba(0,0,0,.2)]"
          >
            <span>View all demos</span>
            <span className="text-base transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              ↗
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
