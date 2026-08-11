'use client';

import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Variant = 'photography' | 'auto' | 'salon' | 'restaurant';

type AnimatedDemoPreviewProps = {
  variant: Variant;
  name: string;
  image: string;
  isCenter: boolean;
};

const assets = {
  photography: [
    'https://framerusercontent.com/images/gPkgBcGwatmPdwzMlpToFBHNSs.png?width=912&height=1170',
    'https://framerusercontent.com/images/yIrZXCStv1OSKgU3LeSDNUk8.png?width=1200&height=1799',
    'https://framerusercontent.com/images/hy8DPmqfuubnG4z6KVW21Noim3k.png?width=750&height=1125',
    'https://framerusercontent.com/images/YN7uZ6616b5EToA62ayKCfXDN8.png?width=609&height=768',
  ],
  auto: [
    'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1000&q=84',
    'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=900&q=84',
  ],
  salon: [
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=84',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=84',
  ],
  restaurant: [
    'https://framerusercontent.com/images/10I4GJR5nYsUsYnoOPIDjoapkA.webp?height=1400&width=1100',
    'https://framerusercontent.com/images/quqbVpcYdgH65rZqF71BSohYQ.webp?height=600&width=900',
    'https://framerusercontent.com/images/I8AGYbzHAG3DaCqU2wYCmWnrFLw.webp?height=1000&width=1000',
    'https://framerusercontent.com/images/SMJY8uQcFDPv5vRNMRmZijjygkM.webp?height=1400&width=1100',
  ],
};

export function AnimatedDemoPreview({ variant, name, isCenter }: AnimatedDemoPreviewProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const running = isCenter && inView;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio > 0.35),
      { threshold: [0, 0.35, 0.7] },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-running={running ? 'true' : 'false'}
      className={`demo-preview relative overflow-hidden border border-white/20 bg-[#111] shadow-[0_30px_80px_rgba(0,0,0,.42)] ${
        isCenter
          ? 'h-[300px] rounded-[1.35rem] sm:h-[350px] lg:h-[400px]'
          : 'h-[225px] rounded-[1.1rem] sm:h-[270px] lg:h-[310px]'
      }`}
    >
      <style>{`
        @keyframes previewPageScroll {
          0%, 12% { transform: translate3d(0, 0, 0); }
          43%, 56% { transform: translate3d(0, -27%, 0); }
          88%, 100% { transform: translate3d(0, -52%, 0); }
        }
        @keyframes previewPhotoZoom {
          0% { transform: scale(1.02); }
          100% { transform: scale(1.09) translate3d(-1.25%, -1%, 0); }
        }
        .demo-preview .auto-timeline,
        .demo-preview .preview-photo-zoom {
          animation-play-state: paused !important;
        }
        .demo-preview[data-running='true'] .auto-timeline,
        .demo-preview[data-running='true'] .preview-photo-zoom {
          animation-play-state: running !important;
        }
        .auto-timeline {
          animation: previewPageScroll 6.8s cubic-bezier(.65,0,.35,1) both;
          will-change: transform;
        }
        .preview-photo-zoom {
          animation: previewPhotoZoom 6.8s cubic-bezier(.22,1,.36,1) both;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .auto-timeline,.preview-photo-zoom { animation: none !important; }
        }
      `}</style>

      {variant === 'photography' && <PhotographyPreview isCenter={isCenter} />}
      {variant === 'auto' && <AutoPreview isCenter={isCenter} />}
      {variant === 'salon' && <SalonPreview isCenter={isCenter} />}
      {variant === 'restaurant' && <RestaurantPreview isCenter={isCenter} />}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 flex items-center justify-between border-t border-white/10 bg-black/72 px-4 py-2.5 text-[8px] uppercase tracking-[.14em] text-white/65 backdrop-blur-md sm:px-5">
        <span>{name}</span>
        <span className="inline-flex items-center gap-1.5 text-white/85">Live preview <ArrowUpRight className="h-3 w-3" /></span>
      </div>
    </div>
  );
}

function PhotographyPreview({ isCenter }: { isCenter: boolean }) {
  return (
    <div className="h-full overflow-hidden bg-black text-white">
      <div className="auto-timeline min-h-[205%] bg-black">
        <section className="relative flex min-h-[300px] items-center justify-center overflow-hidden bg-black px-4">
          <figure className="absolute left-1/2 top-[48%] z-0 h-[46%] w-[24%] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
            <img src={assets.photography[0]} alt="" className="preview-photo-zoom h-full w-full object-cover" />
          </figure>
          <h3 className={`relative z-10 whitespace-nowrap font-serif font-normal leading-[.82] tracking-[-.07em] mix-blend-difference ${isCenter ? 'text-[clamp(4.1rem,10vw,7.8rem)]' : 'text-[3.2rem]'}`}>
            Luca Mori
          </h3>
          <div className="absolute inset-x-0 bottom-7 flex justify-center text-[7px] text-white/65">Photographer — Amsterdam</div>
        </section>

        <section className="min-h-[300px] bg-black px-4 py-6">
          <div className="mb-4 flex items-center justify-between text-[7px] text-white/45"><span>Selected frames</span><span>01—03</span></div>
          <div className="grid grid-cols-3 gap-3">
            {assets.photography.slice(1).map((src, index) => (
              <figure key={src} className="overflow-hidden" style={{ transform: `rotate(${[-3, 2, -2][index]}deg)` }}>
                <img src={src} alt="" className="aspect-[4/5] w-full object-cover" />
              </figure>
            ))}
          </div>
        </section>

        <section className="flex min-h-[250px] items-center justify-center bg-black px-8 text-center">
          <div>
            <p className="text-[7px] text-white/40">• Intro</p>
            <p className="mt-5 font-serif text-[28px] leading-[.95] tracking-[-.04em] text-white/85">I photograph the moment before the moment.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

function AutoPreview({ isCenter }: { isCenter: boolean }) {
  return (
    <div className="h-full overflow-hidden bg-[#0a0a0a] text-white">
      <div className="auto-timeline min-h-[205%]">
        <section className="relative h-[40%] min-h-[260px] overflow-hidden bg-black">
          <img src={assets.auto[0]} alt="" className="preview-photo-zoom absolute inset-0 h-full w-full object-cover opacity-72" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/35 to-transparent" />
          <div className="relative flex h-full flex-col justify-between p-5 sm:p-7">
            <div className="flex items-center justify-between text-[7px] uppercase tracking-[.17em] text-white/55"><span>APEX / AUTO CARE</span><span>BOOK SERVICE</span></div>
            <div className="pb-6">
              <p className="text-[7px] uppercase tracking-[.2em] text-red-400">Orange County mechanics</p>
              <h3 className={`${isCenter ? 'text-4xl sm:text-5xl' : 'text-2xl'} mt-2 max-w-[78%] font-semibold uppercase leading-[.84] tracking-[-.06em]`}>Built to keep you moving.</h3>
            </div>
          </div>
        </section>
        <section className="grid min-h-[250px] grid-cols-2 gap-px bg-white/10 p-px">
          {['Brakes','Diagnostics','Oil Service','Fleet'].map((item, index) => (
            <div key={item} className="flex min-h-[125px] flex-col justify-between bg-[#111] p-4">
              <span className="text-[7px] text-white/30">0{index + 1}</span><span className="text-sm font-semibold uppercase tracking-[-.03em]">{item}</span>
            </div>
          ))}
        </section>
        <section className="relative min-h-[250px] overflow-hidden">
          <img src={assets.auto[1]} alt="" className="absolute inset-0 h-full w-full object-cover opacity-48" />
          <div className="absolute inset-0 bg-red-600/55 mix-blend-multiply" />
          <div className="relative p-6"><p className="text-[8px] uppercase tracking-[.2em]">Transparent estimates</p><p className="mt-4 max-w-sm text-3xl font-semibold leading-none tracking-[-.05em]">Know the repair before the wrench turns.</p></div>
        </section>
      </div>
    </div>
  );
}

function SalonPreview({ isCenter }: { isCenter: boolean }) {
  return (
    <div className="h-full overflow-hidden bg-[#eadde1] text-[#25191d]">
      <div className="auto-timeline min-h-[205%]">
        <section className="relative h-[40%] min-h-[260px] overflow-hidden">
          <img src={assets.salon[0]} alt="" className="preview-photo-zoom absolute right-0 top-0 h-full w-[57%] object-cover" />
          <div className="relative flex h-full w-[50%] flex-col justify-between p-5 sm:p-7">
            <span className="text-[7px] uppercase tracking-[.2em] text-black/45">VELVET GLOW</span>
            <div className="pb-7"><p className={`${isCenter ? 'text-4xl sm:text-5xl' : 'text-2xl'} font-medium leading-[.88] tracking-[-.06em]`}>Beauty,<br />in your own light.</p><p className="mt-4 text-[7px] uppercase tracking-[.16em] text-black/45">Hair · Skin · Bridal</p></div>
          </div>
        </section>
        <section className="bg-[#f3ebe8] p-6 sm:p-8">
          <p className="text-[7px] uppercase tracking-[.2em] text-black/35">The ritual</p>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {['Cut + Color','Facial','Bridal'].map((item) => <div key={item} className="border border-black/12 p-3 text-[9px] font-medium">{item}</div>)}
          </div>
          <img src={assets.salon[1]} alt="" className="mt-5 h-[160px] w-full object-cover" />
        </section>
        <section className="min-h-[220px] bg-[#322328] p-7 text-[#f5ecea]"><p className="text-[7px] uppercase tracking-[.2em] text-white/45">Appointments</p><p className="mt-5 max-w-xs text-3xl font-light leading-none tracking-[-.05em]">A little time that feels entirely yours.</p></section>
      </div>
    </div>
  );
}

function RestaurantPreview({ isCenter }: { isCenter: boolean }) {
  return (
    <div className="h-full overflow-hidden bg-[#090909] text-white">
      <div className="auto-timeline min-h-[205%] bg-[#090909]">
        <section className="relative min-h-[290px] overflow-hidden bg-black">
          <img src={assets.restaurant[0]} alt="" className="preview-photo-zoom absolute inset-0 h-full w-full object-cover opacity-88" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/20" />
          <div className="absolute inset-x-0 bottom-[12%] p-5 sm:p-7">
            <p className="text-[6px] uppercase tracking-[.24em] text-white/55">Qitchen presents</p>
            <p className={`${isCenter ? 'text-4xl sm:text-6xl' : 'text-2xl'} mt-2 font-medium uppercase leading-[.78] tracking-[-.06em]`}>Sushi<br /><span className="font-light">Sensation</span></p>
          </div>
        </section>

        <section className="grid min-h-[270px] grid-cols-3 gap-1 bg-[#090909] p-1">
          {[
            { image: assets.restaurant[1], label: 'Menu' },
            { image: assets.restaurant[2], label: 'Reservation' },
            { image: assets.restaurant[3], label: 'Restaurant' },
          ].map((panel) => (
            <div key={panel.label} className="relative overflow-hidden">
              <img src={panel.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-68" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/5" />
              <div className="absolute inset-x-0 bottom-0 p-3 text-[8px] font-medium uppercase tracking-[.08em]">{panel.label}</div>
            </div>
          ))}
        </section>

        <section className="min-h-[250px] bg-[#111] p-7">
          <p className="text-[7px] uppercase tracking-[.22em] text-white/40">The experience</p>
          <p className="mt-5 max-w-sm font-serif text-3xl leading-[.95] tracking-[-.04em]">Precision, texture, season — served one piece at a time.</p>
        </section>
      </div>
    </div>
  );
}
