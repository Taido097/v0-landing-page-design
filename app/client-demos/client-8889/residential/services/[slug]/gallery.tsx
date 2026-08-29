'use client';

import { useMemo, useState } from 'react';
import type { GalleryShot } from '../services-data';

export default function Gallery({ shots }: { shots: GalleryShot[] }) {
  const filters = useMemo(() => {
    const cats: string[] = [];
    for (const s of shots) if (!cats.includes(s.cat)) cats.push(s.cat);
    return ['All', ...cats];
  }, [shots]);
  const [active, setActive] = useState('All');
  const visible = active === 'All' ? shots : shots.filter((s) => s.cat === active);

  return (
    <div>
      <div className="nrd-chips" role="tablist" aria-label="Gallery filters">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            className={`nrd-chip${f === active ? ' is-active' : ''}`}
            aria-pressed={f === active}
            onClick={() => setActive(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="nrd-gallery">
        {visible.map((s) => (
          <figure className="nrd-shot" key={s.src}>
            <img src={s.src} alt={s.alt} loading="lazy" />
          </figure>
        ))}
      </div>
    </div>
  );
}
