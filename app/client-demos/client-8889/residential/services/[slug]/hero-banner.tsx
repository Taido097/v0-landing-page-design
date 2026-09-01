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
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);

  // Mark loaded once the hero image is decoded (handles the cached case too).
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (img.complete && img.naturalWidth > 0) {
      setLoaded(true);
      return;
    }
    const onLoad = () => setLoaded(true);
    img.addEventListener('load', onLoad);
    // Safety fallback: never hold the content hidden for longer than 900ms.
    const t = window.setTimeout(() => setLoaded(true), 900);
    return () => {
      img.removeEventListener('load', onLoad);
      window.clearTimeout(t);
    };
  }, []);

  // Only start once the hero is actually on screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const animate = loaded && inView;

  return (
    <section className="nrd-banner" data-animate={animate ? 'on' : 'off'} ref={ref}>
      <img ref={imgRef} src={hero} alt={title} />
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
