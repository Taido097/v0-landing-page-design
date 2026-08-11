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
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=84',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=84',
    'https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&w=900&q=84',
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

export function AnimatedDemoPreview({ variant, name, image, isCenter }: AnimatedDemoPreviewProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setRunning(entry.isIntersecting && entry.intersectionRatio > 0.35),
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
          42%, 58% { transform: translate3d(0, -26%, 0); }
          88%, 100% { transform: translate3d(0, -51%, 0); }
        }
        @keyframes previewFloatOne {
          0%, 100% { transform: translate3d(-8%, 12%, 0) rotate(-8deg); }
          50% { transform: translate3d(-2%, -6%, 0) rotate(-2deg); }
        }
        @keyframes previewFloatTwo {
          0%, 100% { transform: translate3d(12%, -5%, 0) rotate(7deg); }
          50% { transform: translate3d(4%, 12%, 0) rotate(1deg); }
        }
        @keyframes previewPhotoZoom {
          0%, 100% { transform: scale(1.02); }
          50% { transform: scale(1.1) translate3d(-1.5%, -1%, 0); }
        }
        @keyframes qitchenPanelScroll {
          0%, 17% { transform: translateY(0); }
          42%, 58% { transform: translateY(-33.333%); }
          83%, 100% { transform: translateY(-66.666%); }
        }
        .demo-preview .auto-timeline,
        .demo-preview .preview-float-one,
        .demo-preview .preview-float-two,
        .demo-preview .preview-photo-zoom,
        .demo-preview .qitchen-panel-timeline {
          animation-play-state: paused !important;
        }
        .demo-preview[data-running='true'] .auto-timeline,
        .demo-preview[data-running='true'] .preview-float-one,
        .demo-preview[data-running='true'] .preview-float-two,
        .demo-preview[data-running='true'] .preview-photo-zoom,
        .demo-preview[data-running='true'] .qitchen-panel-timeline {
          animation-play-state: running !important;
        }
        .auto-timeline { animation: previewPageScroll 9.5s cubic-bezier(.65,0,.35,1) infinite; }
        .preview-float-one { animation: previewFloatOne 5.8s ease-in-out infinite; }
        .preview-float-two { animation: previewFloatTwo 6.6s ease-in-out infinite; }
        .preview-photo-zoom { animation: previewPhotoZoom 8s ease-in-out infinite; }
        .qitchen-panel-timeline { animation: qitchenPanelScroll 8.8s cubic-bezier(.65,0,.35,1) infinite; }
        @media (prefers-reduced-motion: reduce) {
          .auto-timeline,.preview-float-one,.preview-float-two,.preview-photo-zoom,.qitchen-panel-timeline { animation: none !important; }
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
    <div className="relative h-full overflow-hidden bg-[#050505] text-white">
      <div className="absolute inset-0 grid place-items-center">
        <div className="select-none text-center text-[clamp(2.1rem,5vw,4.8rem)] font-semibold uppercase leading-[.72] tracking-[-.08em] text-[#eeeae2]">
          Luna
          <span className="block font-light">Frame</span>
        </div>
      </div>
      <div className="preview-float-one absolute left-[8%] top-[12%] z-10 w-[34%] overflow-hidden border border-white/10 shadow-2xl" style={{ aspectRatio: '4/5' }}>
        <img src={assets.photography[0]} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="preview-float-two absolute right-[8%] top-[14%] z-20 w-[28%] overflow-hidden border border-white/10 shadow-2xl" style={{ aspectRatio: '3/4' }}>
        <img src={assets.photography[1]} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="preview-float-one absolute bottom-[10%] left-[38%] z-30 w-[29%] overflow-hidden border border-white/10 shadow-2xl [animation-delay:-2.5s]" style={{ aspectRatio: '4/5' }}>
        <img src={assets.photography[2]} alt="" className="h-full w-full object-cover" />
      </div>
      {isCenter && <div className="absolute left-5 top-4 z-30 text-[7px] font-semibold uppercase tracking-[.24em] text-white/48 sm:left-7">Editorial photography</div>}
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
  const panels = [
    { image: assets.restaurant[1], label: 'Menu' },
    { image: assets.restaurant[2], label: 'Reservation' },
    { image: assets.restaurant[3], label: 'Our Restaurant' },
  ];

  return (
    <div className="grid h-full grid-cols-[1.6fr_.8fr] gap-1 bg-[#090909] p-1 text-white">
      <div className="relative overflow-hidden bg-black">
        <img src={assets.restaurant[0]} alt="" className="preview-photo-zoom absolute inset-0 h-full w-full object-cover opacity-88" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/68 via-transparent to-black/15" />
        <div className="absolute inset-x-0 bottom-[12%] p-4 sm:p-6">
          <p className="text-[6px] uppercase tracking-[.24em] text-white/55">Qitchen presents</p>
          <p className={`${isCenter ? 'text-3xl sm:text-5xl' : 'text-xl'} mt-2 font-medium uppercase leading-[.78] tracking-[-.06em]`}>Sushi<br /><span className="font-light">Sensation</span></p>
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="qitchen-panel-timeline h-[300%]">
          {panels.map((panel) => (
            <div key={panel.label} className="relative h-1/3 overflow-hidden border-b border-black">
              <img src={panel.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-62" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/5" />
              <div className="absolute inset-x-0 bottom-0 p-3 text-[8px] font-medium uppercase tracking-[.08em] sm:text-[10px]">{panel.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
