'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type DemoCategory = 'All' | 'Portfolio' | 'eCommerce' | 'Scheduling' | 'Restaurant';

type Demo = {
  name: string;
  category: Exclude<DemoCategory, 'All'>;
  industry: string;
  href: string;
};

const categories: DemoCategory[] = ['All', 'Portfolio', 'eCommerce', 'Scheduling', 'Restaurant'];

const demos: Demo[] = [
  {
    name: 'Luna Frame Studio',
    category: 'Portfolio',
    industry: 'Photography studio',
    href: '/portfolio/photography-studio',
  },
  {
    name: 'Alex Kabiru',
    category: 'Portfolio',
    industry: 'Designer portfolio',
    href: '/portfolio/minimal-portfolio',
  },
  {
    name: 'Fuel',
    category: 'Portfolio',
    industry: 'Premium creative agency',
    href: '/portfolio/fuel-agency',
  },
  {
    name: 'JORGE',
    category: 'Portfolio',
    industry: 'Creative portfolio',
    href: '/portfolio/jorge-portfolio',
  },
  {
    name: 'Beanro Coffee',
    category: 'eCommerce',
    industry: 'Coffee shop',
    href: '/portfolio/auto-repair-shop',
  },
  {
    name: 'Salonix',
    category: 'Scheduling',
    industry: 'Hair & beauty salon',
    href: '/portfolio/salon-spa',
  },
  {
    name: 'Qitchen Sushi',
    category: 'Restaurant',
    industry: 'Restaurant',
    href: '/portfolio/restaurant-website',
  },
];

function AutoScrollDemoCard({ demo }: { demo: Demo }) {
  const cardRef = useRef<HTMLElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const rafRef = useRef<number>(0);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio > 0.12),
      { threshold: [0, 0.12, 0.35] },
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);

    const frame = iframeRef.current;
    const win = frame?.contentWindow;
    const doc = frame?.contentDocument;

    if (!inView || !loaded || !frame || !win || !doc) {
      return;
    }

    doc.documentElement.style.scrollBehavior = 'auto';
    if (doc.body) doc.body.style.scrollBehavior = 'auto';
    win.scrollTo(0, 0);

    const holdAtTop = 450;
    const scrollDuration = 10500;
    const holdAtBottom = 900;
    const cycleDuration = holdAtTop + scrollDuration + holdAtBottom;
    const startedAt = performance.now();

    const ease = (t: number) => 0.5 - Math.cos(Math.PI * t) / 2;

    const getTarget = () => {
      const maxScroll = Math.max(
        0,
        doc.documentElement.scrollHeight - win.innerHeight,
        doc.body ? doc.body.scrollHeight - win.innerHeight : 0,
      );
      return maxScroll * 0.62;
    };

    const tick = (now: number) => {
      const elapsed = (now - startedAt) % cycleDuration;
      const target = getTarget();

      if (elapsed < holdAtTop) {
        win.scrollTo(0, 0);
      } else if (elapsed < holdAtTop + scrollDuration) {
        const progress = (elapsed - holdAtTop) / scrollDuration;
        win.scrollTo(0, target * ease(progress));
      } else {
        win.scrollTo(0, target);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [inView, loaded]);

  return (
    <article ref={cardRef} className="group min-w-0">
      <Link
        href={demo.href}
        className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-black/10 bg-[#ececec] shadow-[0_1px_0_rgba(0,0,0,.03)] transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
          <iframe
            ref={iframeRef}
            src={demo.href}
            title={`${demo.name} live demo preview`}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            tabIndex={-1}
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 border-0 bg-white"
            style={{
              width: '200%',
              height: '200%',
              transform: 'scale(.5)',
              transformOrigin: 'top left',
            }}
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-white/15 bg-black/72 px-4 py-2.5 text-[10px] uppercase tracking-[.14em] text-white/70 backdrop-blur-md">
            <span>Live demo</span>
            <span>Auto-scroll</span>
          </div>
        </div>

        <div className="flex items-start justify-between gap-4 pt-3">
          <div className="min-w-0">
            <h2 className="truncate text-[15px] font-medium tracking-[-0.025em] text-black">
              {demo.name}
            </h2>
            <p className="mt-1 text-xs text-black/45">
              {demo.category} · {demo.industry}
            </p>
          </div>

          <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-black/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black" />
        </div>
      </Link>
    </article>
  );
}

export function AllDemosGallery() {
  const [activeCategory, setActiveCategory] = useState<DemoCategory>('All');

  const visibleDemos =
    activeCategory === 'All' ? demos : demos.filter((demo) => demo.category === activeCategory);

  return (
    <section className="pb-24 sm:pb-28">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2 overflow-x-auto border-y border-black/10 py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((category) => {
            const count = category === 'All' ? demos.length : demos.filter((demo) => demo.category === category).length;
            const active = category === activeCategory;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-xs transition-colors ${
                  active
                    ? 'border-black bg-black text-white'
                    : 'border-black/10 bg-white text-black/65 hover:border-black/25 hover:text-black'
                }`}
              >
                <span>{category}</span>
                <span className={active ? 'text-white/55' : 'text-black/35'}>{count}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between border-b border-black/10 py-6 text-xs text-black/45">
          <span>{visibleDemos.length} demos</span>
          <span>Live previews · auto-scroll</span>
        </div>

        <div className="grid gap-x-5 gap-y-10 pt-6 md:grid-cols-2">
          {visibleDemos.map((demo) => (
            <AutoScrollDemoCard key={demo.name} demo={demo} />
          ))}
        </div>
      </div>
    </section>
  );
}
