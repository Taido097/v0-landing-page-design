'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type DemoCategory = 'All' | 'Portfolio' | 'Scheduling' | 'Restaurant' | 'Custom Website';

type Demo = {
  name: string;
  category: Exclude<DemoCategory, 'All'>;
  industry: string;
  href: string;
};

const categories: DemoCategory[] = ['All', 'Portfolio', 'Scheduling', 'Restaurant', 'Custom Website'];

const demos: Demo[] = [
  { name: 'Luna Frame Studio', category: 'Portfolio', industry: 'Photography studio', href: '/portfolio/photography-studio' },
  { name: 'Alex Kabiru', category: 'Portfolio', industry: 'Designer portfolio', href: '/portfolio/minimal-portfolio' },
  { name: 'Fuel', category: 'Portfolio', industry: 'Premium creative agency', href: '/portfolio/fuel-agency' },
  { name: 'JORGE', category: 'Portfolio', industry: 'Creative portfolio', href: '/portfolio/jorge-portfolio' },
  { name: 'Akjo', category: 'Portfolio', industry: 'Creative portfolio', href: '/portfolio/akjo-portfolio' },
  { name: 'Beanro Coffee', category: 'Restaurant', industry: 'Coffee shop', href: '/portfolio/auto-repair-shop' },
  { name: 'Salonix', category: 'Scheduling', industry: 'Hair & beauty salon', href: '/portfolio/salon-spa' },
  { name: 'Dentalo', category: 'Scheduling', industry: 'Dental clinic & hospital', href: '/portfolio/dentalo-clinic' },
  { name: 'DesignedbyTD Studio', category: 'Scheduling', industry: 'Dental clinic', href: '/portfolio/tai-do-dental' },
  { name: 'Éclat Aesthetics', category: 'Scheduling', industry: 'Aesthetic clinic & beauty studio', href: '/portfolio/eclat-aesthetics' },
  { name: 'Qitchen Sushi', category: 'Restaurant', industry: 'Restaurant', href: '/portfolio/restaurant-website' },
  { name: 'Foodee', category: 'Restaurant', industry: 'Food & restaurant', href: '/portfolio/foodee-restaurant' },
  { name: 'Refit', category: 'Custom Website', industry: 'Construction & renovation', href: '/portfolio/refit-construction' },
  { name: 'LeapFly', category: 'Custom Website', industry: 'Landscaping & lawn care', href: '/portfolio/leapfly-landscaping' },
];

const snapshot = (path: string) =>
  `https://image.thum.io/get/width/1000/crop/750/noanimate/wait/2/https://designedbytd.com${path}`;

function AutoScrollDemoCard({
  demo,
  index,
  isMobile,
  activeMobileIndex,
  setActiveMobileIndex,
}: {
  demo: Demo;
  index: number;
  isMobile: boolean;
  activeMobileIndex: number;
  setActiveMobileIndex: (index: number) => void;
}) {
  const cardRef = useRef<HTMLElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const rafRef = useRef<number>(0);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const mobileActive = isMobile && activeMobileIndex === index;
  const shouldMountIframe = !isMobile || mobileActive;

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (isMobile) {
          const rect = entry.boundingClientRect;
          const viewportCenter = window.innerHeight / 2;
          const cardCenter = rect.top + rect.height / 2;
          const closeToCenter = Math.abs(cardCenter - viewportCenter) < Math.min(window.innerHeight * 0.32, 260);

          if (entry.isIntersecting && closeToCenter) {
            setActiveMobileIndex(index);
          }
          setInView(entry.isIntersecting && closeToCenter);
        } else {
          setInView(entry.isIntersecting && entry.intersectionRatio > 0.12);
        }
      },
      isMobile
        ? { rootMargin: '-18% 0px -18% 0px', threshold: [0, 0.2, 0.5, 0.8] }
        : { threshold: [0, 0.12, 0.35] },
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, [index, isMobile, setActiveMobileIndex]);

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);

    const frame = iframeRef.current;
    const win = frame?.contentWindow;
    const doc = frame?.contentDocument;
    const canAnimate = shouldMountIframe && inView && loaded;

    if (!canAnimate || !frame || !win || !doc) return;

    doc.documentElement.style.scrollBehavior = 'auto';
    if (doc.body) doc.body.style.scrollBehavior = 'auto';
    win.scrollTo(0, 0);

    const holdAtTop = isMobile ? 280 : 450;
    const scrollDuration = isMobile ? 7200 : 10500;
    const holdAtBottom = isMobile ? 700 : 900;
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
  }, [inView, loaded, isMobile, shouldMountIframe]);

  useEffect(() => {
    if (!shouldMountIframe) {
      setLoaded(false);
      cancelAnimationFrame(rafRef.current);
    }
  }, [shouldMountIframe]);

  return (
    <article ref={cardRef} className="group min-w-0">
      <Link
        href={demo.href}
        className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-black/10 bg-[#ececec] shadow-[0_1px_0_rgba(0,0,0,.03)] transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
          {isMobile && !mobileActive && (
            <img
              src={snapshot(demo.href)}
              alt={`${demo.name} website preview`}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          )}

          {shouldMountIframe && (
            <iframe
              ref={iframeRef}
              src={demo.href}
              title={`${demo.name} live demo preview`}
              loading={isMobile ? 'eager' : 'lazy'}
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
          )}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-white/15 bg-black/72 px-4 py-2.5 text-[10px] uppercase tracking-[.14em] text-white/70 backdrop-blur-md">
            <span>{mobileActive || !isMobile ? 'Live demo' : 'Preview'}</span>
            <span>{mobileActive || !isMobile ? 'Auto-scroll' : 'Scroll to play'}</span>
          </div>
        </div>

        <div className="flex items-start justify-between gap-4 pt-3">
          <div className="min-w-0">
            <h2 className="truncate text-[15px] font-medium tracking-[-0.025em] text-black">{demo.name}</h2>
            <p className="mt-1 text-xs text-black/45">{demo.category} · {demo.industry}</p>
          </div>
          <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-black/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black" />
        </div>
      </Link>
    </article>
  );
}

export function AllDemosGallery() {
  const [activeCategory, setActiveCategory] = useState<DemoCategory>('All');
  const [isMobile, setIsMobile] = useState(false);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener?.('change', sync);
    return () => media.removeEventListener?.('change', sync);
  }, []);

  const visibleDemos = activeCategory === 'All' ? demos : demos.filter((demo) => demo.category === activeCategory);

  useEffect(() => {
    setActiveMobileIndex(0);
  }, [activeCategory]);

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
          <span>{isMobile ? 'One live preview at a time' : 'Live previews · auto-scroll'}</span>
        </div>

        <div className="grid gap-x-5 gap-y-10 pt-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleDemos.map((demo, index) => (
            <AutoScrollDemoCard
              key={demo.name}
              demo={demo}
              index={index}
              isMobile={isMobile}
              activeMobileIndex={activeMobileIndex}
              setActiveMobileIndex={setActiveMobileIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
