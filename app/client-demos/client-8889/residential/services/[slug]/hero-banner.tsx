'use client';

import { useEffect, useRef, useState } from 'react';

export default function HeroBanner({
  hero,
  title,
  label,
  caption,
}: {
  hero: string;
  title: string;
  label: string;
  caption?: string[];
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Fallback: always show after 1.8s in case IO or rAF never fires
    const fallback = window.setTimeout(() => setShown(true), 1800);

    const reveal = () => {
      window.clearTimeout(fallback);
      // Force a synchronous reflow so the browser has committed the initial
      // opacity:0 paint before we schedule the transition to opacity:1.
      void el.getBoundingClientRect();
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setShown(true))
      );
    };

    if (typeof IntersectionObserver === 'undefined') {
      reveal();
      return () => window.clearTimeout(fallback);
    }

    // Low threshold so the large above-fold banner triggers immediately on load
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            reveal();
            io.disconnect();
          }
        }
      },
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <section className={`nrd-banner nrd-anim${shown ? ' is-in' : ''}`} ref={ref}>
      <img src={hero} alt={title} />
      <div className="nrd-banner-inner">
        <h1 className="nrd-banner-h1">{label}</h1>
        <div className="nrd-banner-rule" aria-hidden="true">
          <span className="nrd-rule-h nrd-rule-l" />
          <span className="nrd-rule-h nrd-rule-r" />
        </div>
        {caption ? (
          <div className="nrd-banner-cap">
            {caption.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
