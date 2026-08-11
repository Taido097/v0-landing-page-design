'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink } from 'lucide-react';
import type { MouseEvent } from 'react';
import { useEffect, useState } from 'react';

type Project = {
  name: string;
  category: string;
  headline: string;
  image: string;
  video: string;
  objectPosition: string;
  href: string;
  accent: string;
};

const projects: Project[] = [
  {
    name: 'Luna Frame Studio',
    category: 'Photography',
    headline: 'Stories that feel as beautiful as they looked.',
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=82',
    video: 'https://www.pexels.com/download/video/25839108/',
    objectPosition: 'center 42%',
    href: '/portfolio/photography-studio',
    accent: 'bg-[#efe3d5] text-[#241c16]',
  },
  {
    name: 'Apex Auto Care',
    category: 'Auto Repair',
    headline: 'Fast repairs. Honest pricing. No surprises.',
    image:
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1600&q=82',
    video: 'https://www.pexels.com/download/video/4823674/',
    objectPosition: 'center 48%',
    href: '/portfolio/auto-repair-shop',
    accent: 'bg-red-600 text-white',
  },
  {
    name: 'Velvet Glow Salon',
    category: 'Salon & Spa',
    headline: 'Beauty that feels personal and effortless.',
    image:
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=82',
    video: 'https://www.pexels.com/download/video/7754397/',
    objectPosition: 'center 44%',
    href: '/portfolio/salon-spa',
    accent: 'bg-[#ead5dc] text-[#341c24]',
  },
  {
    name: 'Harvest & Ember',
    category: 'Restaurant',
    headline: 'Seasonal food. Warm hospitality. Memorable nights.',
    image:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=82',
    video: 'https://www.pexels.com/download/video/4253333/',
    objectPosition: 'center 55%',
    href: '/portfolio/restaurant-website',
    accent: 'bg-amber-300 text-[#28170a]',
  },
];

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % projects.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  const previousIndex = (activeIndex - 1 + projects.length) % projects.length;
  const nextIndex = (activeIndex + 1) % projects.length;
  const activeProject = projects[activeIndex];

  const handlePointerMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    event.currentTarget.style.setProperty('--center-x', `${x * 8}px`);
    event.currentTarget.style.setProperty('--center-y', `${y * 6}px`);
    event.currentTarget.style.setProperty('--left-x', `${x * -12}px`);
    event.currentTarget.style.setProperty('--left-y', `${y * -7}px`);
    event.currentTarget.style.setProperty('--right-x', `${x * 12}px`);
    event.currentTarget.style.setProperty('--right-y', `${y * 7}px`);
  };

  return (
    <section
      id="hero"
      onMouseMove={handlePointerMove}
      className="showcase-hero relative overflow-hidden bg-black pb-20 pt-28 font-sans text-white"
    >
      <style>{`
        .showcase-hero {
          --center-x: 0px;
          --center-y: 0px;
          --left-x: 0px;
          --left-y: 0px;
          --right-x: 0px;
          --right-y: 0px;
        }

        @keyframes showcaseBackground {
          0%, 100% { transform: scale(1.08) translate3d(0, 0, 0); }
          50% { transform: scale(1.12) translate3d(0, -8px, 0); }
        }

        @keyframes showcaseCenterFloat {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -9px, 0); }
        }

        @keyframes showcaseLeftFloat {
          0%, 100% { transform: rotate(-6deg) translate3d(0, 0, 0); }
          50% { transform: rotate(-4deg) translate3d(0, -11px, 0); }
        }

        @keyframes showcaseRightFloat {
          0%, 100% { transform: rotate(6deg) translate3d(0, 0, 0); }
          50% { transform: rotate(4deg) translate3d(0, 10px, 0); }
        }

        @keyframes showcaseShine {
          0% { transform: translateX(-160%) skewX(-20deg); }
          55%, 100% { transform: translateX(280%) skewX(-20deg); }
        }

        .showcase-background { animation: showcaseBackground 14s ease-in-out infinite; }
        .showcase-center-card { animation: showcaseCenterFloat 6s ease-in-out infinite; }
        .showcase-left-card { animation: showcaseLeftFloat 7.5s ease-in-out infinite; }
        .showcase-right-card { animation: showcaseRightFloat 8.2s ease-in-out infinite; }

        .showcase-shine::after {
          content: '';
          position: absolute;
          inset: -35% auto -35% -25%;
          width: 27%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.16), transparent);
          animation: showcaseShine 5.8s ease-in-out infinite;
          pointer-events: none;
        }

        .showcase-center-wrap {
          transform: translate3d(var(--center-x), var(--center-y), 0) translateX(-50%);
        }

        .showcase-left-wrap {
          transform: translate3d(var(--left-x), var(--left-y), 0);
        }

        .showcase-right-wrap {
          transform: translate3d(var(--right-x), var(--right-y), 0);
        }

        @media (prefers-reduced-motion: reduce) {
          .showcase-background,
          .showcase-center-card,
          .showcase-left-card,
          .showcase-right-card,
          .showcase-shine::after {
            animation: none !important;
          }
        }
      `}</style>

      <div className="absolute inset-0 overflow-hidden">
        <Image
          key={activeProject.image}
          src={activeProject.image}
          alt=""
          fill
          sizes="100vw"
          style={{ objectPosition: activeProject.objectPosition }}
          className="showcase-background object-cover opacity-32 blur-[8px] transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,.09),transparent_34%),linear-gradient(to_bottom,rgba(0,0,0,.34),rgba(0,0,0,.82)_64%,#000)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_65%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-semibold leading-[0.92] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            Make every visit count.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            Modern websites built to turn visitors into customers.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="group rounded-lg bg-white px-8 py-6 text-base font-medium text-black hover:bg-white/90">
              <Link href="/contact" className="flex items-center gap-2">
                Start Your Project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-lg border-white/30 bg-black/20 px-8 py-6 text-base font-medium text-white backdrop-blur-md hover:bg-white hover:text-black">
              <Link href="/#portfolio">Explore the Work</Link>
            </Button>
          </div>
        </div>

        <div className="relative mt-10 h-[330px] flex-none sm:h-[400px] lg:h-[460px]">
          <div className="showcase-left-wrap absolute -left-[29%] top-14 z-10 w-[59%] transition-transform duration-200 sm:-left-[12%] sm:w-[46%] lg:left-[1%] lg:top-20 lg:w-[32%]">
            <button
              type="button"
              onClick={() => setActiveIndex(previousIndex)}
              className="group showcase-left-card block w-full text-left opacity-90 transition-opacity duration-300 hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              aria-label={`Show ${projects[previousIndex].name}`}
            >
              <WebsiteCard project={projects[previousIndex]} position="side" />
            </button>
          </div>

          <div className="showcase-center-wrap absolute left-1/2 top-0 z-30 w-[78%] transition-transform duration-200 sm:w-[62%] lg:w-[47%]">
            <div key={activeProject.name} className="showcase-center-card">
              <Link
                href={activeProject.href}
                className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                aria-label={`Open ${activeProject.name} demo`}
              >
                <WebsiteCard project={activeProject} position="center" />
              </Link>
            </div>
          </div>

          <div className="showcase-right-wrap absolute -right-[29%] top-16 z-20 w-[59%] transition-transform duration-200 sm:-right-[12%] sm:w-[46%] lg:right-[1%] lg:top-24 lg:w-[32%]">
            <button
              type="button"
              onClick={() => setActiveIndex(nextIndex)}
              className="group showcase-right-card block w-full text-left opacity-90 transition-opacity duration-300 hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              aria-label={`Show ${projects[nextIndex].name}`}
            >
              <WebsiteCard project={projects[nextIndex]} position="side" />
            </button>
          </div>
        </div>

        <div className="relative z-40 mt-5 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/55">
            Click the side previews to explore · Click the center to open
          </p>
          <div className="flex items-center gap-2" aria-label="Choose featured demo">
            {projects.map((project, index) => (
              <button
                key={project.name}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'w-9 bg-white' : 'w-2.5 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Show ${project.name}`}
                aria-current={index === activeIndex ? 'true' : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WebsiteCard({ project, position }: { project: Project; position: 'center' | 'side' }) {
  const isCenter = position === 'center';

  return (
    <div
      className={`showcase-shine relative overflow-hidden border border-white/25 bg-[#262626] font-sans shadow-[0_30px_80px_rgba(0,0,0,.42)] ${
        isCenter
          ? 'h-[300px] rounded-[1.35rem] sm:h-[350px] lg:h-[400px]'
          : 'h-[225px] rounded-[1.1rem] sm:h-[270px] lg:h-[310px]'
      }`}
    >
      <Image
        src={project.image}
        alt={`${project.name} website design preview`}
        fill
        sizes={isCenter ? '(max-width: 1024px) 62vw, 47vw' : '(max-width: 1024px) 46vw, 32vw'}
        style={{ objectPosition: project.objectPosition }}
        className="object-cover brightness-[1.08] saturate-[1.03] transition-transform duration-700 group-hover:scale-[1.025]"
      />

      <video
        key={project.video}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={project.image}
        aria-hidden="true"
        tabIndex={-1}
        style={{ objectPosition: project.objectPosition }}
        className="pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover brightness-[1.08] saturate-[1.05] motion-reduce:hidden"
      >
        <source src={project.video} type="video/mp4" />
      </video>

      <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(90deg,rgba(0,0,0,.58)_0%,rgba(0,0,0,.28)_40%,rgba(0,0,0,.03)_72%),linear-gradient(to_bottom,rgba(0,0,0,.22),transparent_38%,rgba(0,0,0,.2))]" />

      <div
        className={`absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-white/15 bg-black/12 text-white backdrop-blur-[2px] ${
          isCenter ? 'px-5 py-4 sm:px-7 sm:py-5' : 'px-4 py-3.5'
        }`}
      >
        <span
          className={`${
            isCenter ? 'text-xs sm:text-sm' : 'text-[10px] sm:text-xs'
          } font-semibold tracking-[-0.01em]`}
        >
          {project.name}
        </span>
        <div
          className={`items-center font-medium uppercase tracking-[0.12em] text-white/82 ${
            isCenter
              ? 'hidden gap-5 text-[8px] sm:flex lg:text-[9px]'
              : 'hidden gap-3 text-[7px] md:flex'
          }`}
        >
          <span>Services</span>
          <span>About</span>
          <span>Gallery</span>
          <span>Contact</span>
        </div>
      </div>

      <div
        className={`absolute z-10 text-white ${
          isCenter
            ? 'left-5 top-[29%] max-w-[66%] sm:left-7 sm:top-[28%]'
            : 'bottom-5 left-4 right-4 sm:bottom-6 sm:left-5'
        }`}
      >
        <p
          className={`${
            isCenter ? 'text-[9px] sm:text-[10px]' : 'text-[8px]'
          } font-semibold uppercase tracking-[0.2em] text-white/80`}
        >
          {project.category}
        </p>
        <h2
          className={`mt-2 font-semibold tracking-[-0.04em] drop-shadow-[0_2px_12px_rgba(0,0,0,.45)] ${
            isCenter
              ? 'text-2xl leading-[1.02] sm:text-3xl lg:text-[2.45rem]'
              : 'max-w-[90%] text-lg leading-[1.06] sm:text-xl'
          }`}
        >
          {project.headline}
        </h2>

        {isCenter && (
          <div
            className={`mt-5 inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.06em] shadow-sm sm:text-xs ${project.accent}`}
          >
            View project
            <ExternalLink className="h-3.5 w-3.5" />
          </div>
        )}
      </div>

      {isCenter && (
        <div className="absolute inset-x-0 bottom-0 z-10 hidden border-t border-white/60 bg-white/92 text-black backdrop-blur-md sm:grid sm:grid-cols-4">
          {['Custom design', 'Mobile ready', 'Fast & clear', 'Built to convert'].map((item) => (
            <div key={item} className="border-r border-black/10 px-3 py-3.5 text-center last:border-r-0">
              <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-black/62 lg:text-[9px]">
                {item}
              </p>
            </div>
          ))}
        </div>
      )}

      {!isCenter && (
        <div className="absolute bottom-4 right-4 z-10 rounded-full border border-white/50 bg-white/88 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.1em] text-black/70 backdrop-blur-md sm:bottom-5 sm:right-5">
          Bring to center
        </div>
      )}
    </div>
  );
}
