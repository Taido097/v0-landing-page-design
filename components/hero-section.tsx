'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import type { MouseEvent } from 'react';
import { useEffect, useState } from 'react';

type Project = {
  name: string;
  category: string;
  headline: string;
  image: string;
  href: string;
  accent: string;
};

const projects: Project[] = [
  {
    name: 'Luna Frame Studio',
    category: 'Photography',
    headline: 'Stories that feel as beautiful as they looked.',
    image: '/portfolio-photography.jpg',
    href: '/portfolio/photography-studio',
    accent: 'bg-[#e9d8c5] text-[#241c16]',
  },
  {
    name: 'Apex Auto Care',
    category: 'Auto Repair',
    headline: 'Fast repairs. Honest pricing. No surprises.',
    image: '/portfolio-auto-repair.jpg',
    href: '/portfolio/auto-repair-shop',
    accent: 'bg-red-600 text-white',
  },
  {
    name: 'Velvet Glow Salon',
    category: 'Salon & Spa',
    headline: 'Beauty that feels personal and effortless.',
    image: '/portfolio-salon.jpg',
    href: '/portfolio/salon-spa',
    accent: 'bg-[#e5b9c5] text-[#341c24]',
  },
  {
    name: 'Harvest & Ember',
    category: 'Restaurant',
    headline: 'Seasonal food. Warm hospitality. Memorable nights.',
    image: '/portfolio-restaurant.jpg',
    href: '/portfolio/restaurant-website',
    accent: 'bg-amber-300 text-[#28170a]',
  },
];

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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

    event.currentTarget.style.setProperty('--center-x', `${x * 10}px`);
    event.currentTarget.style.setProperty('--center-y', `${y * 8}px`);
    event.currentTarget.style.setProperty('--left-x', `${x * -15}px`);
    event.currentTarget.style.setProperty('--left-y', `${y * -9}px`);
    event.currentTarget.style.setProperty('--right-x', `${x * 15}px`);
    event.currentTarget.style.setProperty('--right-y', `${y * 9}px`);
  };

  return (
    <section
      id="hero"
      onMouseMove={handlePointerMove}
      className="showcase-hero relative min-h-screen overflow-hidden bg-black pb-10 pt-28 text-white"
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
          50% { transform: scale(1.13) translate3d(0, -10px, 0); }
        }

        @keyframes showcaseCenterFloat {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -12px, 0); }
        }

        @keyframes showcaseLeftFloat {
          0%, 100% { transform: rotate(-7deg) translate3d(0, 0, 0); }
          50% { transform: rotate(-5deg) translate3d(0, -15px, 0); }
        }

        @keyframes showcaseRightFloat {
          0%, 100% { transform: rotate(7deg) translate3d(0, 0, 0); }
          50% { transform: rotate(5deg) translate3d(0, 14px, 0); }
        }

        @keyframes showcaseShine {
          0% { transform: translateX(-160%) skewX(-20deg); }
          55%, 100% { transform: translateX(280%) skewX(-20deg); }
        }

        @keyframes showcaseRise {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .showcase-background { animation: showcaseBackground 14s ease-in-out infinite; }
        .showcase-center-card { animation: showcaseCenterFloat 6s ease-in-out infinite; }
        .showcase-left-card { animation: showcaseLeftFloat 7.5s ease-in-out infinite; }
        .showcase-right-card { animation: showcaseRightFloat 8.2s ease-in-out infinite; }
        .showcase-rise { animation: showcaseRise .9s ease both; }

        .showcase-shine::after {
          content: '';
          position: absolute;
          inset: -35% auto -35% -25%;
          width: 27%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.3), transparent);
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
          .showcase-rise,
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
          priority
          sizes="100vw"
          className="showcase-background object-cover opacity-40 blur-[5px] transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,.08),transparent_34%),linear-gradient(to_bottom,rgba(0,0,0,.36),rgba(0,0,0,.82)_62%,#000)]" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_65%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-7rem)] max-w-[1500px] flex-col px-4 sm:px-6 lg:px-8">
        <div
          className={`mx-auto max-w-4xl text-center transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/75 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            Designed for real businesses
          </p>

          <h1 className="mt-6 text-5xl font-light leading-[0.92] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            Your website should feel
            <br />
            <span className="font-semibold">impossible to ignore.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            Custom websites with strong visuals, smooth interactions, and clear calls-to-action—built to make small businesses look established online.
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

        <div
          className={`relative mt-9 h-[390px] flex-1 transition-all delay-200 duration-1000 sm:h-[470px] lg:mt-10 lg:h-[535px] ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          <div className="showcase-left-wrap absolute -left-[36%] top-16 z-10 w-[72%] transition-transform duration-200 sm:-left-[18%] sm:w-[57%] lg:-left-[5%] lg:top-20 lg:w-[39%]">
            <button
              type="button"
              onClick={() => setActiveIndex(previousIndex)}
              className="group showcase-left-card block w-full text-left opacity-70 transition-opacity duration-300 hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              aria-label={`Show ${projects[previousIndex].name}`}
            >
              <WebsiteCard project={projects[previousIndex]} position="side" />
            </button>
          </div>

          <div className="showcase-center-wrap absolute left-1/2 top-0 z-30 w-[88%] transition-transform duration-200 sm:w-[72%] lg:w-[55%]">
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

          <div className="showcase-right-wrap absolute -right-[36%] top-20 z-20 w-[72%] transition-transform duration-200 sm:-right-[18%] sm:w-[57%] lg:-right-[5%] lg:top-24 lg:w-[39%]">
            <button
              type="button"
              onClick={() => setActiveIndex(nextIndex)}
              className="group showcase-right-card block w-full text-left opacity-70 transition-opacity duration-300 hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              aria-label={`Show ${projects[nextIndex].name}`}
            >
              <WebsiteCard project={projects[nextIndex]} position="side" />
            </button>
          </div>
        </div>

        <div className="relative z-40 -mt-1 flex flex-col items-center gap-4 pb-3 sm:flex-row sm:justify-between">
          <p className="text-xs uppercase tracking-[0.22em] text-white/50">
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
      className={`showcase-shine relative overflow-hidden border border-white/15 bg-[#141414] shadow-[0_40px_120px_rgba(0,0,0,.58)] ${
        isCenter ? 'rounded-[1.35rem]' : 'rounded-[1.1rem]'
      }`}
    >
      <div className={`flex items-center justify-between border-b border-white/10 bg-[#1c1c1c] ${isCenter ? 'px-5 py-4' : 'px-4 py-3'}`}>
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="max-w-[58%] truncate text-[9px] uppercase tracking-[0.2em] text-white/40 sm:text-[10px]">
          {project.name.replaceAll(' ', '').toLowerCase()}.com
        </span>
      </div>

      <div className={`relative overflow-hidden bg-black ${isCenter ? 'h-[310px] sm:h-[380px] lg:h-[420px]' : 'h-[245px] sm:h-[310px] lg:h-[350px]'}`}>
        <Image
          src={project.image}
          alt={`${project.name} website design preview`}
          fill
          sizes={isCenter ? '(max-width: 1024px) 72vw, 55vw' : '(max-width: 1024px) 57vw, 39vw'}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/20" />

        <div className={`absolute inset-x-0 top-0 flex items-center justify-between text-white/75 ${isCenter ? 'p-5 sm:p-6' : 'p-4'}`}>
          <span className="text-xs font-semibold tracking-wide">{project.name}</span>
          <div className="hidden gap-4 text-[9px] uppercase tracking-[0.18em] sm:flex">
            <span>Services</span>
            <span>Gallery</span>
            <span>Contact</span>
          </div>
        </div>

        <div className={`absolute inset-x-0 bottom-0 text-white ${isCenter ? 'p-6 sm:p-8' : 'p-5'}`}>
          <p className="text-[9px] uppercase tracking-[0.26em] text-white/60 sm:text-[10px]">{project.category}</p>
          <h2 className={`mt-3 max-w-xl font-light leading-[1.02] ${isCenter ? 'text-3xl sm:text-4xl lg:text-5xl' : 'text-xl sm:text-2xl'}`}>
            {project.headline}
          </h2>
          <div className={`mt-5 inline-flex items-center gap-2 px-4 py-2 text-xs font-medium ${project.accent} ${isCenter ? 'rounded-full' : 'rounded-lg'}`}>
            {isCenter ? 'View live demo' : 'Bring to center'}
            {isCenter && <ExternalLink className="h-3.5 w-3.5" />}
          </div>
        </div>
      </div>
    </div>
  );
}
