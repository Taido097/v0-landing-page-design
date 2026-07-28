'use client';

import { useState } from 'react';
import type { SyntheticEvent } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  Droplets,
  Flower2,
  Heart,
  Leaf,
  Scissors,
  Sparkles,
  Star,
} from 'lucide-react';

type StyleKey = 'luxury' | 'professional' | 'minimal-spa' | 'aesthetic';

type StyleOption = {
  key: StyleKey;
  name: string;
  description: string;
};

const styles: StyleOption[] = [
  {
    key: 'luxury',
    name: 'Luxury Beauty',
    description: 'Editorial fashion imagery, dramatic contrast, and premium booking.',
  },
  {
    key: 'professional',
    name: 'Professional Salon',
    description: 'Organized services, staff trust, pricing, and a clear appointment flow.',
  },
  {
    key: 'minimal-spa',
    name: 'Minimal Spa',
    description: 'A calm wellness ritual with sage tones, treatment menus, and soft space.',
  },
  {
    key: 'aesthetic',
    name: 'Soft Aesthetic',
    description: 'Playful collage, rounded photography, social-first beauty branding.',
  },
];

const images = {
  luxury:
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1800&q=88',
  professional:
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1800&q=88',
  spa:
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=88',
  facial:
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1400&q=86',
  massage:
    'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1400&q=86',
  hair:
    'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1400&q=86',
  lashes:
    'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1400&q=86',
  aesthetic:
    'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1500&q=86',
};

const fallbackImage = '/portfolio-salon.jpg';

export function SalonSpaDemo() {
  const [activeStyle, setActiveStyle] = useState<StyleKey>('luxury');

  const changeStyle = (style: StyleKey) => {
    setActiveStyle(style);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @keyframes salonFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes salonFloat {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-12px) rotate(1deg); }
        }
        @keyframes salonFloatTwo {
          0%, 100% { transform: translateY(0) rotate(3deg); }
          50% { transform: translateY(10px) rotate(-1deg); }
        }
        @keyframes salonBreathe {
          0%, 100% { transform: scale(1); opacity: .48; }
          50% { transform: scale(1.08); opacity: .72; }
        }
        .salon-enter { animation: salonFadeUp .7s ease both; }
        .salon-float { animation: salonFloat 5.4s ease-in-out infinite; }
        .salon-float-two { animation: salonFloatTwo 6.2s ease-in-out infinite; }
        .salon-breathe { animation: salonBreathe 7s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .salon-enter, .salon-float, .salon-float-two, .salon-breathe { animation: none !important; }
        }
      `}</style>

      <DemoToolbar activeStyle={activeStyle} onChange={changeStyle} />

      <div key={activeStyle} className="salon-enter">
        {activeStyle === 'luxury' && <LuxuryBeautyPage />}
        {activeStyle === 'professional' && <ProfessionalSalonPage />}
        {activeStyle === 'minimal-spa' && <MinimalSpaPage />}
        {activeStyle === 'aesthetic' && <SoftAestheticPage />}
      </div>

      <StyleChooser activeStyle={activeStyle} onChange={changeStyle} />
    </div>
  );
}

function DemoToolbar({
  activeStyle,
  onChange,
}: {
  activeStyle: StyleKey;
  onChange: (style: StyleKey) => void;
}) {
  return (
    <div className="sticky top-0 z-[80] border-b border-black/10 bg-white/95 text-black backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/#portfolio"
          className="inline-flex shrink-0 items-center gap-2 text-sm text-black/60 transition hover:text-black"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Portfolio
        </Link>

        <div className="flex max-w-full gap-2 overflow-x-auto py-1">
          {styles.map((style) => (
            <button
              key={style.key}
              type="button"
              onClick={() => onChange(style.key)}
              className={`shrink-0 border px-4 py-2 text-xs font-medium transition ${
                activeStyle === style.key
                  ? 'border-black bg-black text-white'
                  : 'border-black/15 bg-white hover:border-black/40'
              } ${
                style.key === 'aesthetic'
                  ? 'rounded-full'
                  : style.key === 'professional'
                    ? 'rounded-lg'
                    : style.key === 'minimal-spa'
                      ? 'rounded-full border-[#7d927e]/35'
                      : 'rounded-none'
              }`}
            >
              {style.name}
            </button>
          ))}
        </div>

        <Link
          href="/contact"
          className="hidden shrink-0 bg-black px-5 py-2 text-sm font-medium text-white sm:inline-flex"
        >
          Get This Style
        </Link>
      </div>
    </div>
  );
}

function LuxuryBeautyPage() {
  return (
    <div className="bg-[#130f10] text-[#fff7f8]">
      <header className="relative min-h-[760px] overflow-hidden">
        <ImageWithFallback
          src={images.luxury}
          alt="Luxury salon interior"
          className="absolute inset-0 h-full w-full object-cover contrast-110 saturate-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#130f10] via-black/35 to-black/20" />
        <div className="relative mx-auto flex min-h-[760px] max-w-7xl flex-col px-4 py-9 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between border-b border-white/25 pb-6">
            <div className="font-serif text-2xl tracking-wide">Velvet Glow</div>
            <div className="hidden gap-8 text-sm text-white/65 md:flex">
              <a href="#luxury-services">Services</a>
              <a href="#luxury-services">Artists</a>
              <a href="#luxury-services">Gallery</a>
              <a href="#luxury-services">Book</a>
            </div>
          </nav>

          <div className="mt-auto max-w-5xl pb-8">
            <p className="mb-5 text-xs uppercase tracking-[0.35em] text-[#e1aab6]">
              Hair • Skin • Lashes • Bridal
            </p>
            <h1 className="max-w-5xl font-serif text-5xl leading-[0.9] sm:text-7xl lg:text-8xl">
              Beauty, elevated into an experience.
            </h1>
            <div className="mt-8 flex flex-col justify-between gap-7 border-t border-white/25 pt-7 md:flex-row md:items-end">
              <p className="max-w-xl text-lg leading-relaxed text-white/70">
                Editorial beauty services, personal attention, and a space designed to feel special from the moment you arrive.
              </p>
              <a
                href="#luxury-services"
                className="inline-flex w-fit items-center bg-[#e7bdc6] px-7 py-4 font-medium text-[#27161a]"
              >
                Book Appointment <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <section id="luxury-services" className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-6 md:grid-cols-2 md:items-end">
            <h2 className="font-serif text-5xl leading-tight sm:text-6xl">Signature beauty, photographed like fashion.</h2>
            <p className="max-w-md text-sm leading-relaxed text-[#d5bdc2] md:ml-auto">
              Large imagery, editorial typography, and immersive service stories create a premium salon experience.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden border border-[#51333a] bg-[#51333a] md:grid-cols-3">
            {[
              ['Hair Artistry', images.hair],
              ['Skin Rituals', images.facial],
              ['Lash Design', images.lashes],
            ].map(([title, image]) => (
              <article key={title} className="group relative min-h-[500px] overflow-hidden bg-black">
                <ImageWithFallback
                  src={image}
                  alt={title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/50">Signature service</p>
                  <h3 className="mt-3 font-serif text-3xl">{title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ProfessionalSalonPage() {
  const services = [
    ['Signature Cut & Style', '60 min', 'From $85'],
    ['Dimensional Color', '150 min', 'From $180'],
    ['Glow Facial', '75 min', 'From $125'],
  ];

  return (
    <div className="bg-[#fffafb] text-rose-950">
      <header className="border-b border-rose-100">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between gap-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-rose-800 font-bold text-white">VG</div>
              <div>
                <p className="font-semibold">Velvet Glow Salon</p>
                <p className="text-xs text-rose-900/55">Licensed artists • Online booking</p>
              </div>
            </div>
            <div className="hidden gap-7 text-sm md:flex">
              <a href="#professional-services">Services</a>
              <a href="#professional-services">Artists</a>
              <a href="#professional-services">Reviews</a>
            </div>
            <a href="#professional-services" className="hidden rounded-lg bg-rose-800 px-5 py-3 text-sm font-medium text-white sm:inline-flex">
              Book Now
            </a>
          </nav>

          <div className="grid gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="mb-6 inline-flex rounded-lg border border-rose-200 px-4 py-2 text-xs uppercase tracking-[0.18em]">
                Trusted local salon
              </div>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-rose-700">Hair • Skin • Lashes</p>
              <h1 className="text-5xl font-bold leading-[0.96] tracking-tight sm:text-6xl lg:text-7xl">
                A polished look, without the booking stress.
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-rose-900/60">
                View services, meet your artist, see transparent starting prices, and reserve your appointment online.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#professional-services" className="inline-flex items-center justify-center rounded-lg bg-rose-800 px-7 py-4 font-medium text-white">
                  Book Appointment <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a href="#professional-services" className="inline-flex items-center justify-center rounded-lg border border-rose-200 px-7 py-4 font-medium">
                  View Services
                </a>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-rose-100 pt-6">
                <MiniStat icon={<Star className="h-4 w-4" />} value="4.9★" label="Guest rating" />
                <MiniStat icon={<Clock3 className="h-4 w-4" />} value="2 min" label="Easy booking" />
                <MiniStat icon={<Heart className="h-4 w-4" />} value="98%" label="Return clients" />
              </div>
            </div>

            <div className="relative pb-10">
              <div className="overflow-hidden rounded-2xl border border-rose-100 bg-white shadow-2xl">
                <ImageWithFallback
                  src={images.professional}
                  alt="Professional salon styling"
                  className="h-[520px] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -left-3 w-[92%] rounded-xl border border-rose-100 bg-white p-5 shadow-xl sm:w-[390px]">
                <p className="text-xs uppercase tracking-[0.2em] text-rose-700">Quick booking</p>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg border border-rose-100 px-3 py-3">Choose service</div>
                  <div className="rounded-lg border border-rose-100 px-3 py-3">Select artist</div>
                </div>
                <div className="mt-3 flex items-center justify-between rounded-lg bg-rose-800 px-4 py-3 text-white">
                  <span className="text-sm font-medium">Find a time</span>
                  <CalendarDays className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="professional-services" className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-5 md:grid-cols-2 md:items-end">
            <h2 className="text-4xl font-bold sm:text-5xl">Popular services with clear details.</h2>
            <p className="max-w-lg text-rose-900/60 md:ml-auto">
              A practical service menu helps clients compare time, pricing, and treatment before booking.
            </p>
          </div>
          <div className="overflow-hidden rounded-xl border border-rose-100 bg-white">
            {services.map(([name, time, price], index) => (
              <div key={name} className={`grid gap-4 px-6 py-6 md:grid-cols-[50px_1fr_120px_120px] md:items-center ${index < services.length - 1 ? 'border-b border-rose-100' : ''}`}>
                <span className="text-sm text-rose-900/40">0{index + 1}</span>
                <h3 className="text-xl font-semibold">{name}</h3>
                <span className="text-sm text-rose-900/55">{time}</span>
                <span className="font-semibold">{price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function MinimalSpaPage() {
  const treatments = [
    {
      name: 'Restore Facial',
      detail: 'Deep hydration • facial massage • calming mask',
      duration: '75 min',
      price: '$135',
      icon: <Droplets className="h-5 w-5" />,
    },
    {
      name: 'Quiet Body Ritual',
      detail: 'Warm oil • slow massage • aromatherapy',
      duration: '90 min',
      price: '$165',
      icon: <Leaf className="h-5 w-5" />,
    },
    {
      name: 'Scalp & Hair Renewal',
      detail: 'Scalp cleanse • steam • restorative treatment',
      duration: '60 min',
      price: '$110',
      icon: <Flower2 className="h-5 w-5" />,
    },
  ];

  return (
    <div className="bg-[#f2f5ef] text-[#24372b]">
      <header className="relative overflow-hidden">
        <div className="salon-breathe absolute -left-28 top-24 h-80 w-80 rounded-full bg-[#dfe8da] blur-3xl" />
        <div className="absolute -right-20 bottom-16 h-72 w-72 rounded-full bg-white/70 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between border-b border-[#c9d6c9] pb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#8aa08c]">
                <Leaf className="h-4 w-4" />
              </div>
              <span className="font-serif text-xl">Velvet Glow Wellness</span>
            </div>
            <div className="hidden gap-8 text-sm text-[#5d735f] md:flex">
              <a href="#spa-treatments">Treatments</a>
              <a href="#spa-ritual">Our Ritual</a>
              <a href="#spa-book">Visit</a>
            </div>
            <a href="#spa-book" className="rounded-full border border-[#7d927e] px-5 py-2.5 text-sm transition hover:bg-[#355b45] hover:text-white">
              Reserve
            </a>
          </nav>

          <div className="grid gap-14 py-16 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div className="relative z-10">
              <p className="mb-7 text-xs uppercase tracking-[0.34em] text-[#718573]">A slower kind of beauty</p>
              <h1 className="font-serif text-5xl font-light leading-[0.98] sm:text-6xl lg:text-7xl">
                Space to exhale.<br />Care that restores.
              </h1>
              <p className="mt-7 max-w-lg text-lg leading-relaxed text-[#617267]">
                Thoughtful skin, scalp, and body rituals designed around rest—not rushing from one appointment to the next.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#spa-treatments" className="inline-flex items-center justify-center rounded-full bg-[#355b45] px-7 py-4 font-medium text-white">
                  Explore Treatments <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a href="#spa-ritual" className="inline-flex items-center justify-center rounded-full border border-[#cad8ce] bg-white/50 px-7 py-4 font-medium">
                  Our Approach
                </a>
              </div>

              <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#c9d6c9] pt-6 text-sm text-[#617267]">
                <span className="inline-flex items-center gap-2"><Check className="h-4 w-4" /> Private treatment rooms</span>
                <span className="inline-flex items-center gap-2"><Check className="h-4 w-4" /> Plant-based products</span>
              </div>
            </div>

            <div className="relative min-h-[610px]">
              <div className="absolute left-[8%] top-0 h-[520px] w-[72%] overflow-hidden rounded-[12rem_12rem_2rem_2rem] shadow-[0_30px_80px_rgba(52,82,61,.18)]">
                <ImageWithFallback
                  src={images.spa}
                  alt="Calm spa treatment room"
                  className="h-full w-full object-cover saturate-75"
                />
              </div>
              <div className="absolute bottom-0 right-0 h-64 w-48 overflow-hidden rounded-[6rem_6rem_1.5rem_1.5rem] border-[10px] border-[#f2f5ef] shadow-xl sm:w-56">
                <ImageWithFallback
                  src={images.facial}
                  alt="Restorative facial treatment"
                  className="h-full w-full object-cover saturate-75"
                />
              </div>
              <div className="absolute left-0 top-20 rounded-full border border-[#9eb09f] bg-[#f2f5ef]/90 px-5 py-3 text-xs uppercase tracking-[0.22em] text-[#617267] backdrop-blur">
                Ritual 01<br /><span className="normal-case tracking-normal">Arrive & settle</span>
              </div>
              <div className="absolute bottom-10 left-0 hidden rounded-2xl bg-[#355b45] p-5 text-white shadow-xl sm:block">
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">Today’s pause</p>
                <p className="mt-2 font-serif text-2xl">90 minutes for you</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="spa-treatments" className="border-y border-[#c9d6c9] bg-[#f8faf6] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-xs uppercase tracking-[0.3em] text-[#718573]">Treatment menu</p>
              <h2 className="mt-5 max-w-md font-serif text-5xl leading-tight">Choose what your body needs today.</h2>
              <p className="mt-6 max-w-sm leading-relaxed text-[#617267]">
                The Minimal Spa style replaces gallery cards with a calm treatment menu, durations, pricing, and a wellness-first booking path.
              </p>
            </div>

            <div className="border-t border-[#c9d6c9]">
              {treatments.map((treatment, index) => (
                <article key={treatment.name} className="group grid gap-5 border-b border-[#c9d6c9] py-8 md:grid-cols-[50px_1fr_90px_80px] md:items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#9eb09f] text-[#355b45] transition group-hover:bg-[#355b45] group-hover:text-white">
                    {treatment.icon}
                  </div>
                  <div>
                    <p className="text-xs text-[#718573]">0{index + 1}</p>
                    <h3 className="mt-2 font-serif text-3xl">{treatment.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#617267]">{treatment.detail}</p>
                  </div>
                  <span className="text-sm text-[#617267]">{treatment.duration}</span>
                  <span className="font-medium">{treatment.price}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="spa-ritual" className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div className="grid grid-cols-2 gap-4">
            <ImageWithFallback
              src={images.massage}
              alt="Spa massage ritual"
              className="h-[430px] w-full rounded-[8rem_8rem_1.5rem_1.5rem] object-cover saturate-75"
            />
            <ImageWithFallback
              src={images.facial}
              alt="Spa skincare ritual"
              className="mt-20 h-[430px] w-full rounded-[1.5rem_1.5rem_8rem_8rem] object-cover saturate-75"
            />
          </div>
          <div className="lg:pl-10">
            <p className="text-xs uppercase tracking-[0.3em] text-[#718573]">The ritual</p>
            <h2 className="mt-5 font-serif text-5xl leading-tight">No bright counters. No crowded service cards. No rush.</h2>
            <div className="mt-10 space-y-7">
              {[
                ['01', 'Arrive', 'Tea, a quiet consultation, and time to settle into the space.'],
                ['02', 'Restore', 'A treatment paced around your skin, scalp, and nervous system.'],
                ['03', 'Return slowly', 'Simple aftercare and a calm transition back into your day.'],
              ].map(([number, title, copy]) => (
                <div key={number} className="grid grid-cols-[48px_1fr] gap-5 border-t border-[#c9d6c9] pt-5">
                  <span className="text-sm text-[#718573]">{number}</span>
                  <div><h3 className="font-serif text-2xl">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[#617267]">{copy}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="spa-book" className="bg-[#355b45] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Your next pause</p>
            <h2 className="mt-4 max-w-2xl font-serif text-4xl sm:text-5xl">Reserve a ritual that meets you where you are.</h2>
          </div>
          <Link href="/contact" className="inline-flex w-fit items-center rounded-full bg-white px-7 py-4 font-medium text-[#24372b]">
            Book a Treatment <CalendarDays className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function SoftAestheticPage() {
  return (
    <div className="relative overflow-hidden bg-[#fff1f6] text-[#682f48]">
      <div className="salon-breathe absolute -left-20 top-28 h-72 w-72 rounded-full bg-[#ffdce9] blur-3xl" />
      <div className="absolute -right-24 top-[500px] h-80 w-80 rounded-full bg-white blur-3xl" />

      <header className="relative mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#a84f76] font-semibold text-white">VG</div>
          <div className="hidden gap-7 text-sm sm:flex">
            <a href="#aesthetic-services">Services</a>
            <a href="#aesthetic-services">Artists</a>
            <a href="#aesthetic-services">Gallery</a>
          </div>
          <a href="#aesthetic-services" className="rounded-full border border-[#e6b7ca] px-5 py-3 text-sm">Let’s glow</a>
        </nav>

        <div className="grid gap-12 py-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="relative z-10">
            <div className="mb-6 inline-flex rounded-full border border-[#f0cede] bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.22em]">Soft aesthetic ✦</div>
            <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#bd5f88]">Hair • Skin • Lashes</p>
            <h1 className="font-serif text-5xl italic leading-[0.94] sm:text-6xl lg:text-7xl">Your prettiest appointment of the week.</h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#9c6b80]">
              A playful, social-first beauty experience with dreamy imagery and easy booking.
            </p>
            <a href="#aesthetic-services" className="mt-9 inline-flex items-center rounded-full bg-[#a84f76] px-8 py-4 font-medium text-white">
              Book Your Glow <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>

          <div className="relative min-h-[620px]">
            <div className="salon-float absolute left-0 top-6 h-[430px] w-[64%] overflow-hidden rounded-[45%_55%_42%_58%/48%_42%_58%_52%] shadow-2xl">
              <ImageWithFallback src={images.aesthetic} alt="Soft beauty styling" className="h-full w-full object-cover saturate-110" />
            </div>
            <div className="salon-float-two absolute bottom-0 right-0 h-[330px] w-[48%] overflow-hidden rounded-[2.5rem] border-[10px] border-white/75 shadow-2xl">
              <ImageWithFallback src={images.lashes} alt="Lash beauty detail" className="h-full w-full object-cover" />
            </div>
            <div className="absolute right-4 top-8 rotate-6 rounded-full border border-[#f0cede] bg-white/75 px-6 py-8 text-center text-xs uppercase tracking-[0.22em] shadow-lg">made to<br />stand out</div>
            <div className="absolute bottom-20 left-[38%] -rotate-6 rounded-full bg-[#a84f76] px-5 py-3 font-serif italic text-white shadow-lg">soft • glossy • you</div>
          </div>
        </div>
      </header>

      <section id="aesthetic-services" className="relative px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#bd5f88]">Pick your glow</p>
            <h2 className="mt-4 font-serif text-5xl italic sm:text-6xl">Made to feel personal</h2>
          </div>
          <div className="grid gap-7 md:grid-cols-12">
            {[
              ['Glossy Hair', images.hair, 'md:col-span-7'],
              ['Skin Reset', images.facial, 'md:col-span-5 md:mt-20'],
              ['Soft Lashes', images.lashes, 'md:col-span-7 md:col-start-3'],
            ].map(([title, image, layout], index) => (
              <article key={title} className={`overflow-hidden rounded-[2.5rem] border border-[#f0cede] bg-white/75 shadow-sm ${layout}`}>
                <ImageWithFallback src={image} alt={title} className="h-72 w-full object-cover transition duration-500 hover:scale-105" />
                <div className="p-7">
                  <p className="text-xs uppercase tracking-[0.25em] text-[#bd5f88]">0{index + 1}</p>
                  <h3 className="mt-3 font-serif text-3xl italic">{title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function StyleChooser({
  activeStyle,
  onChange,
}: {
  activeStyle: StyleKey;
  onChange: (style: StyleKey) => void;
}) {
  return (
    <section className="border-t border-black/10 bg-[#f4f4f2] px-4 py-24 text-black sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.28em] text-black/50">Interactive design directions</p>
          <h2 className="mt-4 text-4xl font-medium sm:text-5xl">Four different salon websites—not four color filters.</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {styles.map((style) => (
            <button
              key={style.key}
              type="button"
              onClick={() => onChange(style.key)}
              className={`overflow-hidden border bg-white text-left transition hover:-translate-y-1 ${
                activeStyle === style.key
                  ? 'ring-2 ring-black ring-offset-4 ring-offset-[#f4f4f2]'
                  : 'border-black/10'
              } ${
                style.key === 'aesthetic'
                  ? 'rounded-[2rem]'
                  : style.key === 'professional'
                    ? 'rounded-xl'
                    : style.key === 'minimal-spa'
                      ? 'rounded-[3rem_3rem_1rem_1rem]'
                      : 'rounded-none'
              }`}
            >
              <SalonStyleThumbnail style={style.key} />
              <div className="p-5">
                <h3 className="text-lg font-semibold">{style.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/55">{style.description}</p>
                <div className="mt-5 flex items-center gap-2 text-sm font-medium">
                  {activeStyle === style.key ? (
                    <><Check className="h-4 w-4" /> Active style</>
                  ) : (
                    <>Open this website <ArrowRight className="h-4 w-4" /></>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function SalonStyleThumbnail({ style }: { style: StyleKey }) {
  if (style === 'luxury') {
    return (
      <div className="relative h-60 overflow-hidden bg-black">
        <ImageWithFallback src={images.luxury} alt="Luxury beauty preview" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
        <div className="absolute inset-x-5 bottom-5 text-white">
          <div className="mb-3 h-px bg-white/40" />
          <p className="font-serif text-2xl">Velvet Glow</p>
          <p className="text-xs uppercase tracking-[0.22em] text-white/55">Luxury beauty</p>
        </div>
      </div>
    );
  }

  if (style === 'professional') {
    return (
      <div className="grid h-60 grid-cols-[0.9fr_1.1fr] bg-[#fffafb] text-rose-950">
        <div className="flex flex-col justify-between p-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-rose-800 text-[9px] text-white">VG</div>
          <div>
            <div className="mb-3 h-2 w-16 bg-rose-700" />
            <div className="mb-2 h-4 w-full bg-rose-950" />
            <div className="h-4 w-3/4 bg-rose-200" />
            <div className="mt-5 h-8 w-24 rounded-md bg-rose-800" />
          </div>
        </div>
        <ImageWithFallback src={images.professional} alt="Professional salon preview" className="h-full w-full object-cover" />
      </div>
    );
  }

  if (style === 'minimal-spa') {
    return (
      <div className="relative h-60 overflow-hidden bg-[#f2f5ef] p-5 text-[#24372b]">
        <div className="flex items-center justify-between border-b border-[#c9d6c9] pb-3 text-[10px] uppercase tracking-widest">
          <span>Velvet Glow Wellness</span><Leaf className="h-3.5 w-3.5" />
        </div>
        <div className="grid h-[175px] grid-cols-[0.85fr_1.15fr] gap-4 pt-4">
          <div className="flex flex-col justify-between">
            <div>
              <div className="mb-2 h-3 w-20 bg-[#78907b]" />
              <div className="mb-2 h-5 w-full bg-[#24372b]" />
              <div className="h-5 w-4/5 bg-[#24372b]" />
            </div>
            <div className="space-y-2 border-t border-[#c9d6c9] pt-3">
              <div className="h-2 w-full bg-[#aab9aa]" />
              <div className="h-2 w-3/4 bg-[#c9d6c9]" />
            </div>
          </div>
          <div className="overflow-hidden rounded-[5rem_5rem_1rem_1rem]">
            <ImageWithFallback src={images.spa} alt="Minimal spa preview" className="h-full w-full object-cover saturate-75" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-60 overflow-hidden bg-[#fff1f6]">
      <div className="absolute left-5 top-5 h-36 w-32 rotate-[-5deg] overflow-hidden rounded-[2rem] shadow-lg">
        <ImageWithFallback src={images.aesthetic} alt="Soft aesthetic preview" className="h-full w-full object-cover" />
      </div>
      <div className="absolute right-5 top-12 h-32 w-28 rotate-6 overflow-hidden rounded-full border-4 border-white shadow-lg">
        <ImageWithFallback src={images.lashes} alt="Beauty detail preview" className="h-full w-full object-cover" />
      </div>
      <div className="absolute bottom-4 left-5 rounded-full bg-[#a84f76] px-4 py-2 font-serif text-sm italic text-white">soft glow</div>
    </div>
  );
}

function MiniStat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">{icon}<strong className="text-xl">{value}</strong></div>
      <span className="text-xs text-rose-900/55">{label}</span>
    </div>
  );
}

function ImageWithFallback({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(event) => replaceBrokenImage(event, fallbackImage)}
    />
  );
}

function replaceBrokenImage(event: SyntheticEvent<HTMLImageElement>, fallback: string) {
  event.currentTarget.onerror = null;
  event.currentTarget.src = fallback;
}
