'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

type ScrollRevealProps = {
  children: ReactNode;
  /** Stagger, in ms, before this block animates once it enters the viewport. */
  delay?: number;
  className?: string;
};

/**
 * Wraps a section and reveals it (fade + gentle lift) the first time it
 * scrolls into view. Honors prefers-reduced-motion and degrades to visible
 * when IntersectionObserver is unavailable.
 */
export function ScrollReveal({ children, delay = 0, className }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-shown={shown ? 'true' : 'false'}
      className={`td-reveal${className ? ` ${className}` : ''}`}
      style={{ ['--reveal-delay']: `${delay}ms` } as CSSProperties}
    >
      <style>{`
        .td-reveal {
          opacity: 0;
          transform: translateY(34px);
          transition:
            opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) var(--reveal-delay),
            transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) var(--reveal-delay);
          will-change: opacity, transform;
        }
        .td-reveal[data-shown='true'] {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .td-reveal {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
      {children}
    </div>
  );
}
