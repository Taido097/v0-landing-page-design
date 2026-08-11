'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Instagram } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const photos = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=88',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=88',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1400&q=88',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=88',
  'https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&w=1600&q=88',
  'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1600&q=88',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=88',
];

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function PhotographyEditorialDemo() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const section = heroRef.current;
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const travel = Math.max(1, section.offsetHeight - window.innerHeight);
        setProgress(clamp(-rect.top / travel));
      });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const titleOpacity = 1 - clamp((progress - 0.28) / 0.42);
  const settle = clamp(progress / 0.72);
  const galleryReveal = clamp((progress - 0.38) / 0.5);

  const cards = [
    { src: photos[0], startX: -38, startY: 18, endX: -31, endY: -14, startR: -11, endR: -2, w: 25 },
    { src: photos[1], startX: -15, startY: -27, endX: -11, endY: -20, startR: 8, endR: 1, w: 20 },
    { src: photos[2], startX: 19, startY: -22, endX: 15, endY: -12, startR: -7, endR: 2, w: 18 },
    { src: photos[3], startX: 35, startY: 15, endX: 32, endY: 6, startR: 12, endR: 3, w: 22 },
    { src: photos[4], startX: -10, startY: 32, endX: -7, endY: 25, startR: 5, endR: -1, w: 23 },
  ];

  return (
    <main className="bg-[#050505] text-white selection:bg-white selection:text-black">
      <header className="fixed inset-x-0 top-0 z-[80] border-b border-white/10 bg-black/55 backdrop-blur-xl">
        <div className="mx-auto flex h-[70px] max-w-[1600px] items-center justify-between px-4 sm:px-7 lg:px-10">
          <Link href="/#portfolio" className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.18em] text-white/60 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Portfolio
          </Link>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-sm font-semibold uppercase tracking-[.34em]">
            Luna Frame
          </button>
          <Link href="/contact" className="border border-white/25 px-4 py-2 text-[9px] font-semibold uppercase tracking-[.16em] transition hover:bg-white hover:text-black">
            Book a shoot
          </Link>
        </div>
      </header>

      <section ref={heroRef} className="relative h-[320vh] bg-[#050505]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,.05),transparent_36%)]" />

          <div
            className="absolute inset-0 grid place-items-center transition-opacity duration-75"
            style={{ opacity: titleOpacity }}
          >
            <div className="text-center">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[.42em] text-white/42">Editorial photography · Orange County</p>
              <h1 className="select-none text-[clamp(5rem,16vw,15rem)] font-semibold uppercase leading-[.72] tracking-[-.085em] text-[#efede7]">
                Luna
                <span className="block font-light">Frame</span>
              </h1>
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            {cards.map((card, index) => {
              const x = card.startX + (card.endX - card.startX) * settle;
              const y = card.startY + (card.endY - card.startY) * settle;
              const rotation = card.startR + (card.endR - card.startR) * settle;
              const scale = 0.78 + settle * 0.22;
              return (
                <figure
                  key={`${card.src}-${index}`}
                  className="absolute overflow-hidden border border-white/10 bg-[#111] shadow-[0_30px_80px_rgba(0,0,0,.55)]"
                  style={{
                    width: `${card.w}vw`,
                    maxWidth: '390px',
                    minWidth: '150px',
                    aspectRatio: index % 2 === 0 ? '4 / 5' : '3 / 4',
                    transform: `translate3d(${x}vw, ${y}vh, 0) rotate(${rotation}deg) scale(${scale})`,
                    zIndex: 10 + index,
                    transition: 'transform 80ms linear',
                  }}
                >
                  <img src={card.src} alt="Luna Frame editorial work" className="h-full w-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-3 pt-10 text-[8px] uppercase tracking-[.2em] text-white/65">
                    0{index + 1} / Selected work
                  </div>
                </figure>
              );
            })}
          </div>

          <div
            className="absolute inset-x-0 bottom-8 z-40 flex items-end justify-between px-5 text-[9px] uppercase tracking-[.2em] text-white/42 sm:px-10"
            style={{ opacity: 1 - galleryReveal * 0.9 }}
          >
            <span>Scroll to explore</span>
            <span>Weddings · Portraits · Brands</span>
          </div>

          <div
            className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
            style={{ opacity: galleryReveal }}
          >
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-[.38em] text-white/45">Stories worth keeping</p>
              <p className="mt-3 text-[clamp(2rem,5vw,4.6rem)] font-light leading-none tracking-[-.05em] text-white/92">Quiet moments.<br />Bold frames.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0a0a0a] px-4 py-24 sm:px-7 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-14 flex flex-col justify-between gap-6 border-b border-white/12 pb-8 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[.32em] text-white/40">Selected stories · 2026</p>
              <h2 className="mt-4 text-5xl font-light tracking-[-.06em] sm:text-7xl">The gallery</h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-white/45">Wedding, portrait, and brand photography shaped with editorial restraint and a natural sense of movement.</p>
          </div>

          <div className="grid gap-3 md:grid-cols-12">
            <GalleryImage src={photos[5]} className="md:col-span-7 md:h-[720px]" label="Wedding story" />
            <div className="grid gap-3 md:col-span-5">
              <GalleryImage src={photos[2]} className="h-[350px]" label="Portrait study" />
              <GalleryImage src={photos[4]} className="h-[350px]" label="Brand editorial" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#efede7] px-4 py-24 text-black sm:px-7 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <p className="text-[10px] font-semibold uppercase tracking-[.32em] text-black/45">Available for commissions</p>
          <div>
            <h2 className="max-w-4xl text-5xl font-medium leading-[.92] tracking-[-.065em] sm:text-7xl lg:text-8xl">Let the photographs speak before you do.</h2>
            <Link href="/contact" className="mt-10 inline-flex items-center gap-3 border-b border-black pb-2 text-xs font-semibold uppercase tracking-[.16em]">
              Start a project <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="flex flex-col gap-5 border-t border-white/10 bg-black px-5 py-8 text-[9px] uppercase tracking-[.18em] text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <span>© Luna Frame Studio</span>
        <a href="#" className="inline-flex items-center gap-2 hover:text-white"><Instagram className="h-3.5 w-3.5" /> Instagram</a>
        <Link href="/" className="hover:text-white">Designed by DesignedbyTD Studio</Link>
      </footer>
    </main>
  );
}

function GalleryImage({ src, className, label }: { src: string; className: string; label: string }) {
  return (
    <figure className={`group relative overflow-hidden bg-[#151515] ${className}`}>
      <img src={src} alt={label} className="h-full w-full object-cover transition duration-[1400ms] ease-out group-hover:scale-[1.035]" />
      <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/65 to-transparent p-5 pt-20 text-[9px] uppercase tracking-[.18em] text-white/65">
        <span>{label}</span>
        <ArrowRight className="h-4 w-4" />
      </figcaption>
    </figure>
  );
}
