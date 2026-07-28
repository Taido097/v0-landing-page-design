'use client';

import { useState } from 'react';
import type { SyntheticEvent } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Car,
  CheckCircle,
  Scissors,
  Sparkles,
  Utensils,
} from 'lucide-react';

type BusinessType = 'camera' | 'car' | 'salon' | 'food';
type LayoutType = 'luxury' | 'professional' | 'minimal' | 'aesthetic';

type Service = {
  title: string;
  description: string;
  image: string;
};

type StyleOption = {
  name: string;
  mood: string;
  layout: LayoutType;
  pageBg: string;
  text: string;
  muted: string;
  accent: string;
  button: string;
  secondaryButton: string;
  card: string;
  font: string;
  radius: string;
  heroImage: string;
  imageTreatment: string;
};

type DemoConfig = {
  slug: string;
  name: string;
  logo: string;
  eyebrow: string;
  headline: string;
  subtext: string;
  primaryCta: string;
  nav: string[];
  type: BusinessType;
  fallbackImage: string;
  services: Service[];
  styles: StyleOption[];
};

const photo = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=84`;

const configs: Record<string, DemoConfig> = {
  'photography-studio': {
    slug: 'photography-studio',
    name: 'Luna Frame Studio',
    logo: 'LF',
    eyebrow: 'Wedding • Portrait • Brand Photography',
    headline: 'Editorial photography for stories worth keeping.',
    subtext:
      'Natural, cinematic images with a calm guided experience from inquiry to final gallery.',
    primaryCta: 'Book a Session',
    nav: ['Portfolio', 'Sessions', 'About', 'Contact'],
    type: 'camera',
    fallbackImage: '/portfolio-photography.jpg',
    services: [
      {
        title: 'Wedding Stories',
        description: 'Emotional wedding coverage with an editorial, timeless finish.',
        image: photo('photo-1519741497674-611481863552'),
      },
      {
        title: 'Portrait Sessions',
        description: 'Relaxed portraits with guided posing and natural expression.',
        image: photo('photo-1494790108377-be9c29b29330'),
      },
      {
        title: 'Brand Shoots',
        description: 'Polished visual content for founders, creators, and local brands.',
        image: photo('photo-1452780212940-6f5c0d14d848'),
      },
    ],
    styles: [
      {
        name: 'Luxury Editorial',
        mood: 'Full-screen imagery, elegant serif type, dramatic spacing',
        layout: 'luxury',
        pageBg: 'bg-[#171411]',
        text: 'text-[#fffaf2]',
        muted: 'text-[#d8cabb]',
        accent: 'text-[#d9b98c]',
        button: 'bg-[#f1dfc5] text-[#211b16] hover:bg-white',
        secondaryButton: 'border-[#f1dfc5]/50 text-[#fffaf2] hover:bg-white/10',
        card: 'bg-[#211d18] border-[#4a4035]',
        font: 'font-serif',
        radius: 'rounded-none',
        heroImage: photo('photo-1511285560929-80b456fea0bc'),
        imageTreatment: 'contrast-110 saturate-90',
      },
      {
        name: 'Professional Studio',
        mood: 'Structured split layout, clean navigation, confident presentation',
        layout: 'professional',
        pageBg: 'bg-slate-50',
        text: 'text-slate-950',
        muted: 'text-slate-600',
        accent: 'text-blue-700',
        button: 'bg-slate-950 text-white hover:bg-slate-800',
        secondaryButton: 'border-slate-300 text-slate-900 hover:bg-slate-100',
        card: 'bg-white border-slate-200',
        font: 'font-sans',
        radius: 'rounded-xl',
        heroImage: photo('photo-1524504388940-b1c1722653e1'),
        imageTreatment: 'contrast-105',
      },
      {
        name: 'Minimal Gallery',
        mood: 'Lots of white space, thin lines, quiet gallery-first design',
        layout: 'minimal',
        pageBg: 'bg-white',
        text: 'text-neutral-950',
        muted: 'text-neutral-500',
        accent: 'text-neutral-950',
        button: 'bg-neutral-950 text-white hover:bg-neutral-800',
        secondaryButton: 'border-neutral-300 text-neutral-950 hover:bg-neutral-50',
        card: 'bg-white border-neutral-200',
        font: 'font-sans',
        radius: 'rounded-none',
        heroImage: photo('photo-1452780212940-6f5c0d14d848'),
        imageTreatment: 'grayscale contrast-105',
      },
      {
        name: 'Romantic Aesthetic',
        mood: 'Soft collage, curved images, warm tones, social-media appeal',
        layout: 'aesthetic',
        pageBg: 'bg-[#fff4ef]',
        text: 'text-[#572f35]',
        muted: 'text-[#8b6268]',
        accent: 'text-[#b05d6b]',
        button: 'bg-[#8c4855] text-white hover:bg-[#733843]',
        secondaryButton: 'border-[#d9aeb5] text-[#572f35] hover:bg-white/60',
        card: 'bg-white/75 border-[#efd5d9]',
        font: 'font-serif',
        radius: 'rounded-[2rem]',
        heroImage: photo('photo-1519741497674-611481863552'),
        imageTreatment: 'sepia-[.12] saturate-110',
      },
    ],
  },
  'auto-repair-shop': {
    slug: 'auto-repair-shop',
    name: 'Apex Auto Care',
    logo: 'AA',
    eyebrow: 'Diagnostics • Brakes • Maintenance',
    headline: 'Fast repairs. Honest pricing. No surprises.',
    subtext:
      'Trusted local mechanics with online scheduling, transparent estimates, and same-day service options.',
    primaryCta: 'Schedule Service',
    nav: ['Services', 'Reviews', 'Fleet', 'Contact'],
    type: 'car',
    fallbackImage: '/portfolio-auto-repair.jpg',
    services: [
      {
        title: 'Brake Repair',
        description: 'Inspection, pad replacement, rotor service, and safe stopping performance.',
        image: photo('photo-1486262715619-67b85e0b08d3'),
      },
      {
        title: 'Oil Change',
        description: 'Fast preventive maintenance with fluid and filter checks included.',
        image: photo('photo-1487754180451-c456f719a1fc'),
      },
      {
        title: 'Engine Diagnostics',
        description: 'Computer diagnostics and clear repair recommendations before work begins.',
        image: photo('photo-1530046339160-ce3e530c7d2f'),
      },
    ],
    styles: [
      {
        name: 'Luxury Performance',
        mood: 'Premium automotive imagery, dramatic black layout, bold performance feel',
        layout: 'luxury',
        pageBg: 'bg-[#090909]',
        text: 'text-white',
        muted: 'text-zinc-400',
        accent: 'text-red-500',
        button: 'bg-red-600 text-white hover:bg-red-500',
        secondaryButton: 'border-white/30 text-white hover:bg-white/10',
        card: 'bg-[#121212] border-zinc-800',
        font: 'font-sans',
        radius: 'rounded-none',
        heroImage: photo('photo-1503376780353-7e6692767b70'),
        imageTreatment: 'contrast-125 saturate-90',
      },
      {
        name: 'Professional Trust',
        mood: 'Clear service layout, neighborhood credibility, easy booking flow',
        layout: 'professional',
        pageBg: 'bg-slate-50',
        text: 'text-slate-950',
        muted: 'text-slate-600',
        accent: 'text-blue-700',
        button: 'bg-blue-700 text-white hover:bg-blue-600',
        secondaryButton: 'border-slate-300 text-slate-950 hover:bg-white',
        card: 'bg-white border-slate-200',
        font: 'font-sans',
        radius: 'rounded-xl',
        heroImage: photo('photo-1486262715619-67b85e0b08d3'),
        imageTreatment: 'contrast-105',
      },
      {
        name: 'Minimal Service',
        mood: 'Simple information hierarchy, sharp type, no visual clutter',
        layout: 'minimal',
        pageBg: 'bg-white',
        text: 'text-neutral-950',
        muted: 'text-neutral-500',
        accent: 'text-neutral-950',
        button: 'bg-neutral-950 text-white hover:bg-neutral-800',
        secondaryButton: 'border-neutral-300 text-neutral-950 hover:bg-neutral-50',
        card: 'bg-white border-neutral-200',
        font: 'font-sans',
        radius: 'rounded-none',
        heroImage: photo('photo-1530046339160-ce3e530c7d2f'),
        imageTreatment: 'grayscale contrast-115',
      },
      {
        name: 'Retro Aesthetic',
        mood: 'Warm garage colors, vintage badges, energetic custom-shop personality',
        layout: 'aesthetic',
        pageBg: 'bg-[#f4e5cc]',
        text: 'text-[#312219]',
        muted: 'text-[#735947]',
        accent: 'text-[#a53f2b]',
        button: 'bg-[#a53f2b] text-white hover:bg-[#84311f]',
        secondaryButton: 'border-[#b98e6d] text-[#312219] hover:bg-white/50',
        card: 'bg-[#fff9ee] border-[#d7b995]',
        font: 'font-sans',
        radius: 'rounded-[1.75rem]',
        heroImage: photo('photo-1492144534655-ae79c964c9d7'),
        imageTreatment: 'sepia-[.18] saturate-125 contrast-105',
      },
    ],
  },
  'salon-spa': {
    slug: 'salon-spa',
    name: 'Velvet Glow Salon',
    logo: 'VG',
    eyebrow: 'Hair • Skin • Lashes • Bridal',
    headline: 'Beauty that feels personal, polished, and effortless.',
    subtext: 'Explore services, meet the artists, and book your next appointment in minutes.',
    primaryCta: 'Book Appointment',
    nav: ['Services', 'Artists', 'Gallery', 'Book'],
    type: 'salon',
    fallbackImage: '/portfolio-salon.jpg',
    services: [
      {
        title: 'Hair Styling',
        description: 'Cuts, color, blowouts, and event styling personalized to every client.',
        image: photo('photo-1522337360788-8b13dee7a37e'),
      },
      {
        title: 'Facials',
        description: 'Restorative skin treatments in a calm, elevated setting.',
        image: photo('photo-1540555700478-4be289fbecef'),
      },
      {
        title: 'Lash Extensions',
        description: 'Natural to full-volume lash sets designed around your eye shape.',
        image: photo('photo-1487412947147-5cebf100ffc2'),
      },
    ],
    styles: [
      {
        name: 'Luxury Beauty',
        mood: 'High-fashion photography, elegant serif type, premium black-and-blush finish',
        layout: 'luxury',
        pageBg: 'bg-[#130f10]',
        text: 'text-[#fff7f8]',
        muted: 'text-[#d5bdc2]',
        accent: 'text-[#e1aab6]',
        button: 'bg-[#e7bdc6] text-[#27161a] hover:bg-white',
        secondaryButton: 'border-[#e7bdc6]/50 text-white hover:bg-white/10',
        card: 'bg-[#201719] border-[#51333a]',
        font: 'font-serif',
        radius: 'rounded-none',
        heroImage: photo('photo-1560066984-138dadb4c035'),
        imageTreatment: 'contrast-110 saturate-80',
      },
      {
        name: 'Professional Salon',
        mood: 'Clear service menu, polished staff presentation, booking-first layout',
        layout: 'professional',
        pageBg: 'bg-[#fffafb]',
        text: 'text-rose-950',
        muted: 'text-rose-900/60',
        accent: 'text-rose-700',
        button: 'bg-rose-800 text-white hover:bg-rose-700',
        secondaryButton: 'border-rose-200 text-rose-950 hover:bg-rose-50',
        card: 'bg-white border-rose-100',
        font: 'font-sans',
        radius: 'rounded-xl',
        heroImage: photo('photo-1522337360788-8b13dee7a37e'),
        imageTreatment: 'saturate-90',
      },
      {
        name: 'Minimal Spa',
        mood: 'Quiet white space, muted sage, wellness-focused simplicity',
        layout: 'minimal',
        pageBg: 'bg-[#f7f9f5]',
        text: 'text-[#24372b]',
        muted: 'text-[#617267]',
        accent: 'text-[#355b45]',
        button: 'bg-[#355b45] text-white hover:bg-[#294735]',
        secondaryButton: 'border-[#cad8ce] text-[#24372b] hover:bg-white',
        card: 'bg-white border-[#dce7df]',
        font: 'font-sans',
        radius: 'rounded-none',
        heroImage: photo('photo-1540555700478-4be289fbecef'),
        imageTreatment: 'saturate-70 brightness-105',
      },
      {
        name: 'Soft Aesthetic',
        mood: 'Dreamy collage, rounded cards, soft pink details, social-first visual style',
        layout: 'aesthetic',
        pageBg: 'bg-[#fff1f6]',
        text: 'text-[#682f48]',
        muted: 'text-[#9c6b80]',
        accent: 'text-[#bd5f88]',
        button: 'bg-[#a84f76] text-white hover:bg-[#8d3f62]',
        secondaryButton: 'border-[#e6b7ca] text-[#682f48] hover:bg-white/60',
        card: 'bg-white/75 border-[#f0cede]',
        font: 'font-serif',
        radius: 'rounded-[2rem]',
        heroImage: photo('photo-1487412947147-5cebf100ffc2'),
        imageTreatment: 'saturate-90 brightness-105',
      },
    ],
  },
  'restaurant-website': {
    slug: 'restaurant-website',
    name: 'Harvest & Ember',
    logo: 'H&E',
    eyebrow: 'Seasonal Menu • Private Events • Reservations',
    headline: 'Seasonal food, warm hospitality, unforgettable nights.',
    subtext: 'Reserve a table, explore the latest menu, or plan a private gathering with us.',
    primaryCta: 'Reserve a Table',
    nav: ['Menu', 'Events', 'Hours', 'Reserve'],
    type: 'food',
    fallbackImage: '/portfolio-restaurant.jpg',
    services: [
      {
        title: 'Dinner Menu',
        description: 'Seasonal dishes, local ingredients, and chef-led weekly features.',
        image: photo('photo-1504674900247-0877df9cc836'),
      },
      {
        title: 'Private Events',
        description: 'A warm private dining experience for celebrations and company dinners.',
        image: photo('photo-1414235077428-338989a2e8c0'),
      },
      {
        title: 'Catering',
        description: 'Restaurant-quality menus prepared for off-site gatherings and events.',
        image: photo('photo-1515003197210-e0cd71810b5f'),
      },
    ],
    styles: [
      {
        name: 'Luxury Fine Dining',
        mood: 'Immersive food photography, elegant type, dark reservation-focused experience',
        layout: 'luxury',
        pageBg: 'bg-[#140d08]',
        text: 'text-[#fff4dd]',
        muted: 'text-[#d6bea2]',
        accent: 'text-amber-300',
        button: 'bg-amber-300 text-[#28170a] hover:bg-amber-200',
        secondaryButton: 'border-amber-200/40 text-amber-50 hover:bg-white/10',
        card: 'bg-[#21150d] border-[#59391f]',
        font: 'font-serif',
        radius: 'rounded-none',
        heroImage: photo('photo-1414235077428-338989a2e8c0'),
        imageTreatment: 'contrast-115 saturate-105',
      },
      {
        name: 'Professional Neighborhood',
        mood: 'Friendly information layout, clear hours and menu access, easy reservations',
        layout: 'professional',
        pageBg: 'bg-[#fffdf8]',
        text: 'text-[#2b2119]',
        muted: 'text-[#6f6258]',
        accent: 'text-[#9a4c2a]',
        button: 'bg-[#9a4c2a] text-white hover:bg-[#7f3d21]',
        secondaryButton: 'border-[#dccabd] text-[#2b2119] hover:bg-white',
        card: 'bg-white border-[#eadfd5]',
        font: 'font-sans',
        radius: 'rounded-xl',
        heroImage: photo('photo-1552566626-52f8b828add9'),
        imageTreatment: 'brightness-105 saturate-95',
      },
      {
        name: 'Minimal Menu',
        mood: 'Editorial menu typography, simple sections, food-first white space',
        layout: 'minimal',
        pageBg: 'bg-white',
        text: 'text-neutral-950',
        muted: 'text-neutral-500',
        accent: 'text-neutral-950',
        button: 'bg-neutral-950 text-white hover:bg-neutral-800',
        secondaryButton: 'border-neutral-300 text-neutral-950 hover:bg-neutral-50',
        card: 'bg-white border-neutral-200',
        font: 'font-serif',
        radius: 'rounded-none',
        heroImage: photo('photo-1473093295043-cdd812d0e601'),
        imageTreatment: 'contrast-105 saturate-80',
      },
      {
        name: 'Bold Aesthetic',
        mood: 'Expressive collage, oversized type, energetic bistro and nightlife personality',
        layout: 'aesthetic',
        pageBg: 'bg-[#f4d84a]',
        text: 'text-[#1a1111]',
        muted: 'text-[#65451c]',
        accent: 'text-red-800',
        button: 'bg-red-800 text-white hover:bg-red-700',
        secondaryButton: 'border-black/30 text-black hover:bg-white/30',
        card: 'bg-[#fff4bf] border-black/15',
        font: 'font-sans',
        radius: 'rounded-[2rem]',
        heroImage: photo('photo-1504674900247-0877df9cc836'),
        imageTreatment: 'contrast-125 saturate-125',
      },
    ],
  },
};

export function InteractiveBusinessDemo({ slug }: { slug: string }) {
  const demo = configs[slug];
  const [styleIndex, setStyleIndex] = useState(0);

  if (!demo) return null;
  const style = demo.styles[styleIndex];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${style.pageBg} ${style.text} ${style.font}`}>
      <style>{`
        @keyframes demoRise { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes demoFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes demoDrift { 0%, 100% { transform: rotate(-2deg) translateY(0); } 50% { transform: rotate(1deg) translateY(-8px); } }
        .demo-rise { animation: demoRise .7s ease both; }
        .demo-float { animation: demoFloat 4s ease-in-out infinite; }
        .demo-drift { animation: demoDrift 5s ease-in-out infinite; }
      `}</style>

      <StyleToolbar demo={demo} style={style} styleIndex={styleIndex} onChange={setStyleIndex} />
      <Hero demo={demo} style={style} />

      <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <ServiceSection demo={demo} style={style} />
        <StyleSelector demo={demo} style={style} styleIndex={styleIndex} onChange={setStyleIndex} />

        <section className={`border p-8 text-center md:p-14 ${style.card} ${style.radius}`}>
          <Sparkles className="mx-auto mb-5 h-8 w-8" />
          <h2 className="mx-auto max-w-3xl text-4xl font-normal sm:text-5xl">
            Want this exact direction customized for a real business?
          </h2>
          <p className={`mx-auto mt-5 max-w-2xl text-lg ${style.muted}`}>
            The selected layout, photography, typography, services, booking links, and contact information can all be customized.
          </p>
          <Link href="/contact" className={`mt-8 inline-flex items-center px-8 py-4 font-medium ${style.button} ${buttonShape(style.layout)}`}>
            Start a Project <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </section>
      </main>
    </div>
  );
}

function StyleToolbar({
  demo,
  style,
  styleIndex,
  onChange,
}: {
  demo: DemoConfig;
  style: StyleOption;
  styleIndex: number;
  onChange: (index: number) => void;
}) {
  return (
    <div className="sticky top-0 z-50 border-b border-current/10 bg-inherit/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/#portfolio" className="inline-flex shrink-0 items-center gap-2 text-sm opacity-70 hover:opacity-100">
          <ArrowLeft className="h-4 w-4" /> Back to Portfolio
        </Link>
        <div className="flex max-w-full gap-2 overflow-x-auto py-1">
          {demo.styles.map((item, index) => (
            <button
              key={item.name}
              type="button"
              onClick={() => onChange(index)}
              className={`shrink-0 border px-4 py-2 text-xs font-medium transition ${buttonShape(item.layout)} ${
                index === styleIndex
                  ? `${style.button} border-transparent`
                  : 'border-current/20 opacity-65 hover:opacity-100'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
        <Link href="/contact" className={`hidden shrink-0 px-5 py-2 text-sm font-medium sm:inline-flex ${style.button} ${buttonShape(style.layout)}`}>
          Get This Style
        </Link>
      </div>
    </div>
  );
}

function Hero({ demo, style }: { demo: DemoConfig; style: StyleOption }) {
  if (style.layout === 'luxury') return <LuxuryHero demo={demo} style={style} />;
  if (style.layout === 'professional') return <ProfessionalHero demo={demo} style={style} />;
  if (style.layout === 'minimal') return <MinimalHero demo={demo} style={style} />;
  return <AestheticHero demo={demo} style={style} />;
}

function LuxuryHero({ demo, style }: { demo: DemoConfig; style: StyleOption }) {
  return (
    <header className="relative min-h-[720px] overflow-hidden">
      <img
        src={style.heroImage}
        alt={`${demo.name} luxury hero`}
        onError={(event) => replaceBrokenImage(event, demo.fallbackImage)}
        className={`absolute inset-0 h-full w-full object-cover ${style.imageTreatment}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/25" />
      <div className="relative mx-auto flex min-h-[720px] max-w-7xl flex-col px-4 py-10 text-white sm:px-6 lg:px-8">
        <BusinessNav demo={demo} logoClass="border-white/30 bg-black/20 text-white" linkClass="text-white/70 hover:text-white" />
        <div className="demo-rise mt-auto max-w-4xl pb-10">
          <p className="mb-5 text-xs uppercase tracking-[0.32em] text-white/65">{demo.eyebrow}</p>
          <h1 className="text-5xl font-normal leading-[0.94] tracking-tight sm:text-7xl lg:text-8xl">{demo.headline}</h1>
          <div className="mt-8 flex max-w-3xl flex-col justify-between gap-7 border-t border-white/25 pt-7 md:flex-row md:items-end">
            <p className="max-w-xl text-lg leading-relaxed text-white/75">{demo.subtext}</p>
            <HeroButtons demo={demo} style={style} />
          </div>
        </div>
      </div>
    </header>
  );
}

function ProfessionalHero({ demo, style }: { demo: DemoConfig; style: StyleOption }) {
  return (
    <header className="border-b border-current/10">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <BusinessNav demo={demo} logoClass={style.button} linkClass="opacity-65 hover:opacity-100" />
        <div className="grid gap-12 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="demo-rise">
            <div className={`mb-6 inline-flex border border-current/15 px-4 py-2 text-xs uppercase tracking-[0.22em] ${style.radius}`}>
              Trusted local service
            </div>
            <p className={`mb-4 text-xs uppercase tracking-[0.28em] ${style.accent}`}>{demo.eyebrow}</p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">{demo.headline}</h1>
            <p className={`mt-7 max-w-xl text-lg leading-relaxed ${style.muted}`}>{demo.subtext}</p>
            <div className="mt-9"><HeroButtons demo={demo} style={style} /></div>
            <div className="mt-10 grid grid-cols-3 gap-3 border-t border-current/10 pt-6 text-sm">
              <div><strong className="block text-xl">4.9★</strong><span className={style.muted}>Customer rating</span></div>
              <div><strong className="block text-xl">24h</strong><span className={style.muted}>Fast response</span></div>
              <div><strong className="block text-xl">100%</strong><span className={style.muted}>Clear pricing</span></div>
            </div>
          </div>
          <div className={`demo-rise overflow-hidden border shadow-xl ${style.radius} ${style.card}`}>
            <img
              src={style.heroImage}
              alt={`${demo.name} professional service preview`}
              onError={(event) => replaceBrokenImage(event, demo.fallbackImage)}
              className={`h-[520px] w-full object-cover ${style.imageTreatment}`}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

function MinimalHero({ demo, style }: { demo: DemoConfig; style: StyleOption }) {
  return (
    <header>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <BusinessNav demo={demo} logoClass="border border-current/25" linkClass="opacity-55 hover:opacity-100" />
        <div className="grid gap-10 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="demo-rise">
            <p className={`mb-8 text-xs uppercase tracking-[0.34em] ${style.muted}`}>{demo.eyebrow}</p>
            <h1 className="max-w-5xl text-6xl font-light leading-[0.9] tracking-[-0.04em] sm:text-7xl lg:text-8xl">{demo.headline}</h1>
          </div>
          <div className="border-l border-current/15 pl-7">
            <p className={`text-lg leading-relaxed ${style.muted}`}>{demo.subtext}</p>
            <div className="mt-8"><HeroButtons demo={demo} style={style} /></div>
          </div>
        </div>
        <div className="grid gap-4 border-y border-current/15 py-4 sm:grid-cols-[1fr_auto] sm:items-center">
          <p className={`text-sm ${style.muted}`}>Selected work / services / contact</p>
          <p className="text-sm uppercase tracking-[0.25em]">Scroll to explore</p>
        </div>
        <img
          src={style.heroImage}
          alt={`${demo.name} minimal feature image`}
          onError={(event) => replaceBrokenImage(event, demo.fallbackImage)}
          className={`mt-8 h-[420px] w-full object-cover ${style.imageTreatment}`}
        />
      </div>
    </header>
  );
}

function AestheticHero({ demo, style }: { demo: DemoConfig; style: StyleOption }) {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute -left-20 top-24 h-56 w-56 rounded-full bg-white/35 blur-3xl" />
      <div className="absolute -right-10 bottom-10 h-64 w-64 rounded-full bg-white/25 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <BusinessNav demo={demo} logoClass={style.button} linkClass="opacity-65 hover:opacity-100" />
        <div className="grid gap-12 py-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="demo-rise">
            <div className={`mb-6 inline-flex px-4 py-2 text-xs uppercase tracking-[0.24em] ${style.card} ${style.radius}`}>Aesthetic concept</div>
            <p className={`mb-4 text-xs uppercase tracking-[0.28em] ${style.accent}`}>{demo.eyebrow}</p>
            <h1 className="text-5xl font-normal leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">{demo.headline}</h1>
            <p className={`mt-7 max-w-xl text-lg leading-relaxed ${style.muted}`}>{demo.subtext}</p>
            <div className="mt-9"><HeroButtons demo={demo} style={style} /></div>
          </div>
          <div className="relative min-h-[590px]">
            <img
              src={style.heroImage}
              alt={`${demo.name} aesthetic hero collage`}
              onError={(event) => replaceBrokenImage(event, demo.fallbackImage)}
              className={`demo-drift absolute left-0 top-4 h-[430px] w-[68%] object-cover shadow-xl ${style.radius} ${style.imageTreatment}`}
            />
            <img
              src={demo.services[0].image}
              alt={`${demo.services[0].title} aesthetic detail`}
              onError={(event) => replaceBrokenImage(event, demo.fallbackImage)}
              className={`absolute bottom-0 right-0 h-[310px] w-[48%] object-cover shadow-xl ${style.radius} ${style.imageTreatment}`}
            />
            <div className={`absolute right-4 top-10 flex h-28 w-28 rotate-6 items-center justify-center border text-center text-xs uppercase tracking-[0.2em] ${style.card} ${style.radius}`}>
              Made to<br />stand out
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function BusinessNav({ demo, logoClass, linkClass }: { demo: DemoConfig; logoClass: string; linkClass: string }) {
  return (
    <nav className="flex flex-wrap items-center justify-between gap-6">
      <div className={`flex h-12 w-12 items-center justify-center font-semibold ${logoClass} rounded-full`}>{demo.logo}</div>
      <div className="flex flex-wrap items-center gap-6 text-sm">
        {demo.nav.map((item) => <a key={item} href="#services" className={linkClass}>{item}</a>)}
      </div>
    </nav>
  );
}

function HeroButtons({ demo, style }: { demo: DemoConfig; style: StyleOption }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a href="#services" className={`inline-flex items-center justify-center px-7 py-4 font-medium ${style.button} ${buttonShape(style.layout)}`}>
        {demo.primaryCta}<ArrowRight className="ml-2 h-4 w-4" />
      </a>
      <a href="#styles" className={`inline-flex items-center justify-center border px-7 py-4 font-medium ${style.secondaryButton} ${buttonShape(style.layout)}`}>
        Change Style
      </a>
    </div>
  );
}

function ServiceSection({ demo, style }: { demo: DemoConfig; style: StyleOption }) {
  return (
    <section id="services" className="pb-20">
      <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className={`mb-3 text-xs uppercase tracking-[0.28em] ${style.accent}`}>What we offer</p>
          <h2 className="text-4xl font-normal sm:text-5xl">Pictures and sections that match the service</h2>
        </div>
        <p className={`max-w-md text-sm leading-relaxed ${style.muted}`}>Every card uses business-specific photography and the selected design style changes how the content is presented.</p>
      </div>
      {style.layout === 'luxury' && <LuxuryServices demo={demo} style={style} />}
      {style.layout === 'professional' && <ProfessionalServices demo={demo} style={style} />}
      {style.layout === 'minimal' && <MinimalServices demo={demo} style={style} />}
      {style.layout === 'aesthetic' && <AestheticServices demo={demo} style={style} />}
    </section>
  );
}

function LuxuryServices({ demo, style }: { demo: DemoConfig; style: StyleOption }) {
  return (
    <div className="grid gap-px overflow-hidden border border-current/15 bg-current/15 md:grid-cols-3">
      {demo.services.map((service) => (
        <article key={service.title} className="group relative min-h-[480px] overflow-hidden bg-black">
          <img src={service.image} alt={service.title} onError={(event) => replaceBrokenImage(event, demo.fallbackImage)} className={`absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105 ${style.imageTreatment}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-7 text-white">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-white/60">Featured service</p>
            <h3 className="text-3xl font-normal">{service.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70">{service.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function ProfessionalServices({ demo, style }: { demo: DemoConfig; style: StyleOption }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {demo.services.map((service) => (
        <article key={service.title} className={`overflow-hidden border shadow-sm ${style.card} ${style.radius}`}>
          <img src={service.image} alt={service.title} onError={(event) => replaceBrokenImage(event, demo.fallbackImage)} className={`aspect-[4/3] w-full object-cover ${style.imageTreatment}`} />
          <div className="p-6">
            <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-full ${style.button}`}><BusinessIcon type={demo.type} /></div>
            <h3 className="text-xl font-semibold">{service.title}</h3>
            <p className={`mt-3 text-sm leading-relaxed ${style.muted}`}>{service.description}</p>
            <a href="#styles" className="mt-5 inline-flex items-center text-sm font-medium">Learn more <ArrowRight className="ml-2 h-4 w-4" /></a>
          </div>
        </article>
      ))}
    </div>
  );
}

function MinimalServices({ demo, style }: { demo: DemoConfig; style: StyleOption }) {
  return (
    <div className="border-y border-current/15">
      {demo.services.map((service, index) => (
        <article key={service.title} className="grid gap-6 border-b border-current/15 py-7 last:border-b-0 md:grid-cols-[70px_1fr_200px] md:items-center">
          <span className={`text-sm ${style.muted}`}>0{index + 1}</span>
          <div>
            <h3 className="text-2xl font-medium">{service.title}</h3>
            <p className={`mt-2 max-w-2xl text-sm leading-relaxed ${style.muted}`}>{service.description}</p>
          </div>
          <img src={service.image} alt={service.title} onError={(event) => replaceBrokenImage(event, demo.fallbackImage)} className={`h-28 w-full object-cover ${style.imageTreatment}`} />
        </article>
      ))}
    </div>
  );
}

function AestheticServices({ demo, style }: { demo: DemoConfig; style: StyleOption }) {
  const positions = ['md:col-span-7', 'md:col-span-5 md:mt-16', 'md:col-span-6 md:col-start-4'];
  return (
    <div className="grid gap-6 md:grid-cols-12">
      {demo.services.map((service, index) => (
        <article key={service.title} className={`overflow-hidden border ${style.card} ${style.radius} ${positions[index]}`}>
          <img src={service.image} alt={service.title} onError={(event) => replaceBrokenImage(event, demo.fallbackImage)} className={`h-64 w-full object-cover transition duration-500 hover:scale-105 ${style.imageTreatment}`} />
          <div className="p-6">
            <p className={`mb-2 text-xs uppercase tracking-[0.24em] ${style.accent}`}>0{index + 1}</p>
            <h3 className="text-2xl font-normal">{service.title}</h3>
            <p className={`mt-3 text-sm leading-relaxed ${style.muted}`}>{service.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function StyleSelector({ demo, style, styleIndex, onChange }: { demo: DemoConfig; style: StyleOption; styleIndex: number; onChange: (index: number) => void }) {
  return (
    <section id="styles" className="py-20">
      <div className="mb-10">
        <p className={`mb-3 text-xs uppercase tracking-[0.25em] ${style.accent}`}>Interactive design directions</p>
        <h2 className="text-4xl font-normal sm:text-5xl">Choose a real style, not just a new color</h2>
        <p className={`mt-4 max-w-2xl ${style.muted}`}>Each option changes the layout, typography, image composition, navigation, buttons, spacing, and service presentation.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {demo.styles.map((item, index) => (
          <button
            key={item.name}
            type="button"
            onClick={() => onChange(index)}
            className={`overflow-hidden border text-left transition hover:-translate-y-1 ${item.radius} ${index === styleIndex ? 'ring-2 ring-current ring-offset-4 ring-offset-transparent' : 'border-current/15'} ${style.card}`}
          >
            <StyleThumbnail demo={demo} option={item} />
            <div className="p-5">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className={`mt-2 text-sm leading-relaxed ${style.muted}`}>{item.mood}</p>
              <div className="mt-5 flex items-center gap-2 text-sm font-medium">
                {index === styleIndex ? <><CheckCircle className="h-4 w-4" /> Active style</> : <>Apply style <ArrowRight className="h-4 w-4" /></>}
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function StyleThumbnail({ demo, option }: { demo: DemoConfig; option: StyleOption }) {
  if (option.layout === 'luxury') {
    return (
      <div className="relative h-56 overflow-hidden bg-black">
        <img src={option.heroImage} alt={`${option.name} business preview`} onError={(event) => replaceBrokenImage(event, demo.fallbackImage)} className={`h-full w-full object-cover ${option.imageTreatment}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-black/10" />
        <div className="absolute inset-x-5 bottom-5 text-white">
          <div className="mb-4 h-px bg-white/35" />
          <p className="font-serif text-2xl">{demo.name}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/60">Luxury</p>
        </div>
      </div>
    );
  }
  if (option.layout === 'professional') {
    return (
      <div className="grid h-56 grid-cols-2 bg-white text-slate-950">
        <div className="flex flex-col justify-between p-5">
          <div className="h-8 w-8 rounded-full bg-slate-950" />
          <div>
            <div className="mb-3 h-2 w-16 bg-blue-700" />
            <div className="mb-2 h-4 w-full bg-slate-900" />
            <div className="h-4 w-3/4 bg-slate-300" />
            <div className="mt-5 h-8 w-24 rounded-md bg-blue-700" />
          </div>
        </div>
        <img src={option.heroImage} alt={`${option.name} business preview`} onError={(event) => replaceBrokenImage(event, demo.fallbackImage)} className={`h-full w-full object-cover ${option.imageTreatment}`} />
      </div>
    );
  }
  if (option.layout === 'minimal') {
    return (
      <div className="h-56 bg-white p-5 text-black">
        <div className="flex items-center justify-between border-b border-black/15 pb-3 text-[10px] uppercase tracking-widest"><span>{demo.logo}</span><span>Menu</span></div>
        <div className="grid grid-cols-[1fr_90px] gap-4 pt-5">
          <div>
            <div className="mb-3 h-5 w-full bg-black" />
            <div className="mb-2 h-5 w-4/5 bg-black" />
            <div className="mt-6 h-px bg-black/20" />
            <div className="mt-4 h-2 w-24 bg-black/30" />
          </div>
          <img src={option.heroImage} alt={`${option.name} business preview`} onError={(event) => replaceBrokenImage(event, demo.fallbackImage)} className={`h-32 w-full object-cover ${option.imageTreatment}`} />
        </div>
      </div>
    );
  }
  return (
    <div className={`relative h-56 overflow-hidden ${option.pageBg}`}>
      <div className="absolute left-5 top-5 h-24 w-28 overflow-hidden rounded-[1.5rem] rotate-[-3deg] shadow-md">
        <img src={option.heroImage} alt={`${option.name} main preview`} onError={(event) => replaceBrokenImage(event, demo.fallbackImage)} className={`h-full w-full object-cover ${option.imageTreatment}`} />
      </div>
      <div className="absolute right-5 top-12 h-28 w-24 overflow-hidden rounded-full shadow-md">
        <img src={demo.services[0].image} alt={`${option.name} detail preview`} onError={(event) => replaceBrokenImage(event, demo.fallbackImage)} className={`h-full w-full object-cover ${option.imageTreatment}`} />
      </div>
      <div className="absolute bottom-5 left-5 right-5">
        <div className="mb-2 h-3 w-20 rounded-full bg-current/25" />
        <div className="h-7 w-44 rounded-full bg-current/80" />
      </div>
    </div>
  );
}

function buttonShape(layout: LayoutType) {
  if (layout === 'luxury' || layout === 'minimal') return 'rounded-none';
  if (layout === 'professional') return 'rounded-lg';
  return 'rounded-full';
}

function replaceBrokenImage(event: SyntheticEvent<HTMLImageElement>, fallback: string) {
  event.currentTarget.onerror = null;
  event.currentTarget.src = fallback;
}

function BusinessIcon({ type }: { type: BusinessType }) {
  const className = 'h-5 w-5';
  if (type === 'camera') return <Camera className={className} />;
  if (type === 'car') return <Car className={className} />;
  if (type === 'salon') return <Scissors className={className} />;
  return <Utensils className={className} />;
}
