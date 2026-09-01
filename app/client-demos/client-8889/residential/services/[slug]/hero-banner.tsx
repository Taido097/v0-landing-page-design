'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

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

    // Fallback: reveal no matter what, so the hero can never get stuck hidden.
    const fallback = window.setTimeout(() => setShown(true), 1400);

    const reveal = () => {
      window.clearTimeout(fallback);
      // rAF so the browser paints the hidden state first, guaranteeing a transition.
      requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
    };

    if (typeof IntersectionObserver === 'undefined') {
      reveal();
      return () => window.clearTimeout(fallback);
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            reveal();
            io.disconnect();
          }
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  const styleVar = { '--play': shown ? '1' : '0' } as CSSProperties;

  return (
    <section className={`nrd-banner nrd-anim${shown ? ' is-in' : ''}`} ref={ref} style={styleVar}>
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
