'use client';

import { ArrowUpRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

type Variant = 'photography' | 'auto' | 'salon' | 'restaurant';

type AnimatedDemoPreviewProps = {
  variant: Variant;
  name: string;
  image: string;
  href: string;
  isCenter: boolean;
};

export function AnimatedDemoPreview({ name, image, href, isCenter }: AnimatedDemoPreviewProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const rafRef = useRef<number>(0);
  const [inView, setInView] = useState(false);
  const running = isCenter && inView;

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio > 0.4),
      { threshold: [0, 0.4, 0.75] },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const stopPreview = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
  }, []);

  const startPreview = useCallback(() => {
    stopPreview();
    if (!running) return;

    const frame = iframeRef.current;
    const win = frame?.contentWindow;
    const doc = frame?.contentDocument;
    if (!frame || !win || !doc) return;

    // The iframe is same-origin. Disable CSS smooth scrolling inside the preview
    // so the animation is driven by one consistent requestAnimationFrame timeline.
    doc.documentElement.style.scrollBehavior = 'auto';
    if (doc.body) doc.body.style.scrollBehavior = 'auto';

    win.scrollTo(0, 0);

    const holdAtTop = 1100;
    const scrollDuration = 14500;
    const holdAtEnd = 1200;
    const startedAt = performance.now();

    const ease = (t: number) => {
      // Smoothstep keeps the real page's scroll-triggered animation feeling natural.
      return t * t * (3 - 2 * t);
    };

    const getHalfPageTarget = () => {
      const maxScroll = Math.max(
        0,
        doc.documentElement.scrollHeight - win.innerHeight,
        doc.body ? doc.body.scrollHeight - win.innerHeight : 0,
      );
      return maxScroll * 0.5;
    };

    const tick = (now: number) => {
      if (!running || iframeRef.current !== frame) return;

      const elapsed = now - startedAt;
      const scrollingFor = elapsed - holdAtTop;
      const targetScroll = getHalfPageTarget();

      if (elapsed <= holdAtTop) {
        win.scrollTo(0, 0);
      } else if (scrollingFor < scrollDuration) {
        const progress = Math.min(1, Math.max(0, scrollingFor / scrollDuration));
        win.scrollTo(0, targetScroll * ease(progress));
      } else {
        // Recalculate the halfway point in case lazy-loaded content changed the page height.
        win.scrollTo(0, getHalfPageTarget());
      }

      if (elapsed < holdAtTop + scrollDuration + holdAtEnd) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [running, stopPreview]);

  useEffect(() => {
    if (!running) {
      stopPreview();
      return;
    }

    const frame = iframeRef.current;
    if (frame?.contentDocument?.readyState === 'complete') {
      startPreview();
    }

    return stopPreview;
  }, [href, running, startPreview, stopPreview]);

  return (
    <div
      ref={rootRef}
      className={`demo-preview relative overflow-hidden border border-white/20 bg-[#111] shadow-[0_30px_80px_rgba(0,0,0,.42)] ${
        isCenter
          ? 'h-[300px] rounded-[1.35rem] sm:h-[350px] lg:h-[400px]'
          : 'h-[225px] rounded-[1.1rem] sm:h-[270px] lg:h-[310px]'
      }`}
    >
      {isCenter ? (
        <div className="absolute inset-0 overflow-hidden bg-black">
          <iframe
            key={href}
            ref={iframeRef}
            src={href}
            title={`${name} live website preview`}
            onLoad={startPreview}
            tabIndex={-1}
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 border-0 bg-black"
            style={{
              width: '200%',
              height: '200%',
              transform: 'scale(.5)',
              transformOrigin: 'top left',
            }}
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-black">
          <img src={image} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 flex items-center justify-between border-t border-white/10 bg-black/72 px-4 py-2.5 text-[8px] uppercase tracking-[.14em] text-white/65 backdrop-blur-md sm:px-5">
        <span>{name}</span>
        <span className="inline-flex items-center gap-1.5 text-white/85">
          {isCenter ? 'Real demo · auto scroll' : 'Preview paused'}
          <ArrowUpRight className="h-3 w-3" />
        </span>
      </div>
    </div>
  );
}
