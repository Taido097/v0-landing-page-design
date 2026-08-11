'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

const projectImages = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=88',
  'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=900&q=88',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=88',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=88',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=88',
  'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=900&q=88',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=88',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=88',
  'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=900&q=88',
  'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=88',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=88',
  'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=88',
];

const cardRotations = [-2, 1, -1, 2, -1.5, 1, 1.5, -2, 1, -1, 2, -1.5];
const cardDepth = [90, 150, 70, 125, 185, 95, 140, 80, 170, 115, 75, 155];

const portrait =
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=88';
const workOne =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=90';
const workTwo =
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1800&q=90';

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function PhotographyEditorialDemo() {
  const heroRef = useRef<HTMLElement | null>(null);
  const projectsRef = useRef<HTMLElement | null>(null);
  const [heroProgress, setHeroProgress] = useState(0);
  const [projectProgress, setProjectProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const hero = heroRef.current;
        const projects = projectsRef.current;

        if (hero) {
          const rect = hero.getBoundingClientRect();
          const distance = Math.max(window.innerHeight, hero.offsetHeight);
          setHeroProgress(clamp(-rect.top / distance));
        }

        if (projects) {
          const rect = projects.getBoundingClientRect();
          const start = window.innerHeight * 0.88;
          const end = window.innerHeight * 0.12;
          setProjectProgress(clamp((start - rect.top) / (start - end)));
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('lm-visible');
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -7% 0px' },
    );

    document.querySelectorAll('.lm-observe').forEach((element) => observer.observe(element));

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const heroTitleY = heroProgress * -95;
  const heroTitleScale = 1 - heroProgress * 0.075;
  const heroTitleOpacity = 1 - heroProgress * 0.78;
  const heroPortraitY = heroProgress * -42;
  const heroPortraitX = heroProgress * 74;
  const heroPortraitRotate = heroProgress * 5;

  return (
    <main className="lm-page min-h-screen overflow-x-hidden bg-[#050505] text-[#f0eee8] selection:bg-[#f0eee8] selection:text-black">
      <style>{`
        .lm-page {
          --paper: #f0eee8;
          --dim: rgba(240, 238, 232, .42);
          --serif: 'Times New Roman', Times, Georgia, serif;
        }

        .lm-serif { font-family: var(--serif); }

        .lm-observe {
          opacity: 0;
          transform: translate3d(0, 72px, 0);
          transition:
            opacity 1.05s cubic-bezier(.22,1,.36,1),
            transform 1.2s cubic-bezier(.22,1,.36,1);
        }

        .lm-observe.lm-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        .lm-image-reveal {
          clip-path: inset(10% 0 10% 0);
          transform: scale(1.08);
          transition:
            clip-path 1.35s cubic-bezier(.22,1,.36,1),
            transform 1.7s cubic-bezier(.22,1,.36,1);
        }

        .lm-visible .lm-image-reveal,
        .lm-image-reveal.lm-visible {
          clip-path: inset(0 0 0 0);
          transform: scale(1);
        }

        .lm-story-image {
          transform: translate3d(0, 82px, 0) rotate(-3deg);
          opacity: 0;
          transition:
            opacity 1.05s cubic-bezier(.22,1,.36,1),
            transform 1.35s cubic-bezier(.22,1,.36,1);
        }

        .lm-visible .lm-story-image {
          opacity: 1;
          transform: translate3d(0,0,0) rotate(0deg);
        }

        .lm-stagger-1 { transition-delay: 80ms; }
        .lm-stagger-2 { transition-delay: 170ms; }
        .lm-stagger-3 { transition-delay: 260ms; }

        @media (prefers-reduced-motion: reduce) {
          .lm-observe,
          .lm-image-reveal,
          .lm-story-image {
            opacity: 1 !important;
            transform: none !important;
            clip-path: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <header className="fixed inset-x-0 top-0 z-[100] bg-[#050505]/82 backdrop-blur-[3px]">
        <div className="grid h-10 grid-cols-[1fr_auto_1fr] items-center px-3 text-[7px] font-medium tracking-[-.01em] text-white sm:px-4 lg:grid-cols-[1fr_2fr_1fr]">
          <Link href="/#portfolio" className="lm-serif text-[13px] leading-none tracking-[-.04em] text-white">
            Luna Frame
          </Link>

          <nav className="hidden items-center justify-around gap-8 sm:flex">
            <a href="#projects" className="transition hover:text-white/55">Projects</a>
            <a href="#services" className="transition hover:text-white/55">Services</a>
            <a href="#about" className="transition hover:text-white/55">About</a>
            <a href="#contact" className="transition hover:text-white/55">Contact</a>
          </nav>

          <span className="justify-self-end text-white/28">© 2026</span>
        </div>
      </header>

      <section ref={heroRef} className="relative flex min-h-[120svh] items-start overflow-hidden px-4 pt-10 sm:px-7 lg:px-10">
        <div className="sticky top-0 mx-auto flex h-screen w-full max-w-[1800px] items-center justify-center overflow-hidden">
          <h1
            className="lm-serif relative z-10 whitespace-nowrap text-center text-[clamp(5.2rem,15.7vw,16rem)] font-normal leading-[.76] tracking-[-.09em] text-[#f3f1eb] will-change-transform"
            style={{
              transform: `translate3d(0, ${heroTitleY}px, 0) scale(${heroTitleScale})`,
              opacity: heroTitleOpacity,
            }}
          >
            Luna Frame
          </h1>

          <figure
            className="absolute left-1/2 top-[44%] z-20 w-[clamp(118px,15vw,235px)] bg-[#aaa] will-change-transform"
            style={{
              transform: `translate3d(calc(-32% + ${heroPortraitX}px), calc(-50% + ${heroPortraitY}px), 0) rotate(${heroPortraitRotate}deg)`,
            }}
          >
            <img
              src={portrait}
              alt="Luna Frame photographer portrait"
              className="aspect-[4/5] w-full object-cover grayscale"
            />
            <figcaption className="absolute left-1/2 top-[calc(100%+18px)] w-[210px] -translate-x-1/2 text-center text-[7px] leading-[1.7] text-white/82">
              <span className="block">Photographer — Orange County</span>
              <span className="block text-white/45">Editorial · Weddings · Commercial</span>
            </figcaption>
          </figure>

          <div
            className="absolute bottom-5 left-0 right-0 flex justify-between text-[7px] text-white/28"
            style={{ opacity: 1 - heroProgress * 2 }}
          >
            <span>Scroll to explore</span>
            <span>01 — 04</span>
          </div>
        </div>
      </section>

      <section ref={projectsRef} id="projects" className="relative min-h-[100svh] scroll-mt-10 px-4 pb-24 pt-20 sm:px-7 lg:px-10">
        <div className="mx-auto max-w-[1700px]">
          <div className="mb-10 flex items-center justify-between text-[7px] text-white/46">
            <span>Projects</span>
            <span>Selected frames · 01—12</span>
          </div>

          <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-7 lg:gap-y-14">
            {projectImages.map((src, index) => {
              const delayed = clamp(projectProgress * 1.35 - index * 0.035);
              const y = (1 - delayed) * cardDepth[index];
              const rotation = cardRotations[index] * delayed;
              const scale = 0.91 + delayed * 0.09;
              const opacity = clamp(delayed * 1.35);

              return (
                <figure
                  key={src}
                  className="group relative will-change-transform"
                  style={{
                    opacity,
                    transform: `translate3d(0, ${y}px, 0) rotate(${rotation}deg) scale(${scale})`,
                    transition: 'transform 70ms linear, opacity 120ms linear',
                  }}
                >
                  <div className="overflow-hidden bg-[#111]">
                    <img
                      src={src}
                      alt={`Luna Frame selected project ${index + 1}`}
                      className="aspect-[4/5] w-full object-cover transition duration-[1100ms] ease-out group-hover:scale-[1.045]"
                    />
                  </div>
                  <figcaption className="mt-2 flex items-center justify-between text-[6px] text-white/36">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <span>{index % 3 === 0 ? 'Editorial' : index % 3 === 1 ? 'Portrait' : 'Campaign'}</span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      <section id="services" className="flex min-h-[100svh] scroll-mt-10 items-center justify-center px-5 py-28">
        <div className="lm-observe w-full max-w-[760px] text-center">
          <p className="mb-8 text-[7px] text-white/40">• Intro</p>
          <p className="lm-serif text-[clamp(2rem,4.1vw,4.5rem)] font-normal leading-[.92] tracking-[-.045em] text-white/48">
            I photograph the second before the story reveals itself — the tension, the light, the feeling that something is about to happen.
          </p>
          <p className="mt-20 text-[7px] text-white/28">• Commissioned by people, brands, and stories worth remembering</p>
        </div>
      </section>

      <section className="flex min-h-[78svh] items-center px-4 py-20 sm:px-7 lg:px-10">
        <div className="lm-observe mx-auto flex w-full max-w-[1700px] items-center justify-between text-[7px] text-white/48">
          <span>Selected Works</span>
          <span>• Projects</span>
        </div>
      </section>

      <section className="min-h-[100svh] px-2 pb-28 sm:px-3 lg:px-4">
        <div className="grid gap-3 md:grid-cols-2">
          <figure className="lm-observe overflow-hidden bg-[#111]">
            <img src={workOne} alt="Luna Frame landscape project" className="lm-image-reveal h-[42vh] min-h-[300px] w-full object-cover" />
          </figure>
          <figure className="lm-observe lm-stagger-2 overflow-hidden bg-[#111]">
            <img src={workTwo} alt="Luna Frame fashion project" className="lm-image-reveal h-[42vh] min-h-[300px] w-full object-cover" />
          </figure>
        </div>
      </section>

      <section id="about" className="flex min-h-[100svh] scroll-mt-10 items-center px-4 py-28 sm:px-7 lg:px-10">
        <div className="lm-observe mx-auto grid w-full max-w-[1500px] gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-3 lg:col-start-3">
            <p className="mb-5 text-[7px] text-white/42">• My story</p>
            <h2 className="lm-serif text-[clamp(2.2rem,3.8vw,4.3rem)] font-normal leading-[.88] tracking-[-.045em] text-white/82">
              California-born.<br />Orange County-based.<br />Obsessed with light.
            </h2>
          </div>

          <figure className="lg:col-span-2">
            <img src={portrait} alt="Luna Frame portrait" className="lm-story-image aspect-[4/5] w-full max-w-[250px] object-cover grayscale" />
          </figure>

          <div className="lm-stagger-2 max-w-xl text-[8px] leading-[1.8] text-white/42 lg:col-span-4">
            <p>
              I grew up watching small moments turn cinematic when the light was right. I did not know then that I was learning how to see.
            </p>
            <p className="mt-5">
              I have spent years photographing people and brands that understand the difference between a photograph and an image that stays with you. The work lives somewhere between editorial precision and honest observation.
            </p>
            <p className="mt-5 text-white/28">Based in Orange County · Available worldwide.</p>
          </div>
        </div>
      </section>

      <section id="contact" className="relative flex min-h-[100svh] scroll-mt-10 items-center px-4 py-28 sm:px-7 lg:px-10">
        <div className="lm-observe mx-auto grid w-full max-w-[1500px] lg:grid-cols-12">
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="mb-7 text-[7px] text-white/42">• Available for commission</p>
            <h2 className="lm-serif text-[clamp(3.3rem,6vw,7rem)] font-normal leading-[.84] tracking-[-.055em] text-[#f0eee8]">
              Let&apos;s make something worth remembering.
            </h2>
            <p className="mt-8 text-[7px] uppercase tracking-[.08em] text-white/30">Orange County — Worldwide</p>
            <Link href="/contact" className="mt-12 inline-block border-b border-white/35 pb-1 text-[8px] text-white/72 transition hover:border-white hover:text-white">
              Start a project
            </Link>
          </div>
        </div>

        <footer className="absolute inset-x-4 bottom-5 grid grid-cols-1 gap-3 text-[7px] text-white/34 sm:inset-x-7 sm:grid-cols-3 sm:items-end lg:inset-x-10">
          <span className="lm-serif text-[16px] tracking-[-.04em] text-white/82">Luna Frame</span>
          <span className="sm:text-center">© 2026 Luna Frame Studio. All rights reserved.</span>
          <div className="flex gap-4 sm:justify-end">
            <a href="#about" className="hover:text-white">About</a>
            <a href="#projects" className="hover:text-white">Projects</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
        </footer>
      </section>
    </main>
  );
}
