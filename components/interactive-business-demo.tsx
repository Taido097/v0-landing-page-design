'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Camera, Car, CheckCircle, Scissors, Sparkles, Utensils } from 'lucide-react';

type BusinessType = 'camera' | 'car' | 'salon' | 'food';

type StyleOption = {
  name: string;
  mood: string;
  pageBg: string;
  heroBg: string;
  text: string;
  muted: string;
  button: string;
  card: string;
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
  image: string;
  gallery: string[];
  services: string[];
  styles: StyleOption[];
};

const configs: Record<string, DemoConfig> = {
  'photography-studio': {
    slug: 'photography-studio',
    name: 'Luna Frame Studio',
    logo: 'LF',
    eyebrow: 'Wedding • Portrait • Brand Photography',
    headline: 'Editorial photography for stories worth keeping.',
    subtext: 'Natural, cinematic images with a calm guided experience from inquiry to final gallery.',
    primaryCta: 'Book a Session',
    nav: ['Portfolio', 'Sessions', 'About', 'Contact'],
    type: 'camera',
    image: '/portfolio-photography.jpg',
    gallery: ['/portfolio-photography.jpg', '/portfolio-salon.jpg', '/portfolio-restaurant.jpg'],
    services: ['Weddings', 'Portraits', 'Brand Shoots'],
    styles: [
      { name: 'Luxury Minimal', mood: 'Cream, editorial, refined', pageBg: 'bg-[#f6efe7]', heroBg: 'bg-[#eee1d3]', text: 'text-stone-950', muted: 'text-stone-600', button: 'bg-stone-950 text-white', card: 'bg-white/80 border-stone-200', imageTreatment: 'grayscale-0 contrast-100' },
      { name: 'Dark Editorial', mood: 'Cinematic black magazine style', pageBg: 'bg-[#0d0d0d]', heroBg: 'bg-[#171717]', text: 'text-white', muted: 'text-zinc-400', button: 'bg-white text-black', card: 'bg-zinc-900 border-zinc-800', imageTreatment: 'grayscale contrast-125' },
      { name: 'Warm Romantic', mood: 'Soft peach and romantic curves', pageBg: 'bg-[#fff7f0]', heroBg: 'bg-[#f8ddcf]', text: 'text-[#522f2f]', muted: 'text-[#825f5f]', button: 'bg-[#8d4f4f] text-white', card: 'bg-white border-[#ead0c4]', imageTreatment: 'sepia-[.18] saturate-125' },
    ],
  },
  'auto-repair-shop': {
    slug: 'auto-repair-shop',
    name: 'Apex Auto Care',
    logo: 'AA',
    eyebrow: 'Diagnostics • Brakes • Maintenance',
    headline: 'Fast repairs. Honest pricing. No surprises.',
    subtext: 'Trusted local mechanics with online scheduling, transparent estimates, and same-day service options.',
    primaryCta: 'Schedule Service',
    nav: ['Services', 'Reviews', 'Fleet', 'Contact'],
    type: 'car',
    image: '/portfolio-auto-repair.jpg',
    gallery: ['/portfolio-auto-repair.jpg', '/portfolio-auto-repair.jpg', '/portfolio-auto-repair.jpg'],
    services: ['Brake Repair', 'Oil Change', 'Diagnostics'],
    styles: [
      { name: 'Performance Dark', mood: 'Black and red performance look', pageBg: 'bg-zinc-950', heroBg: 'bg-gradient-to-br from-zinc-950 to-red-950', text: 'text-white', muted: 'text-zinc-300', button: 'bg-red-600 text-white', card: 'bg-zinc-900 border-zinc-800', imageTreatment: 'contrast-125 saturate-75' },
      { name: 'Clean Garage', mood: 'Bright, trustworthy neighborhood shop', pageBg: 'bg-slate-50', heroBg: 'bg-white', text: 'text-slate-950', muted: 'text-slate-600', button: 'bg-blue-700 text-white', card: 'bg-white border-slate-200', imageTreatment: 'contrast-105' },
      { name: 'Fleet Pro', mood: 'Industrial blue for commercial clients', pageBg: 'bg-[#071727]', heroBg: 'bg-gradient-to-br from-[#0b2239] to-[#124e78]', text: 'text-white', muted: 'text-blue-100/70', button: 'bg-cyan-400 text-slate-950', card: 'bg-[#0e2942] border-blue-900', imageTreatment: 'grayscale-[.2] contrast-125' },
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
    image: '/portfolio-salon.jpg',
    gallery: ['/portfolio-salon.jpg', '/portfolio-photography.jpg', '/portfolio-salon.jpg'],
    services: ['Hair Styling', 'Facials', 'Lash Extensions'],
    styles: [
      { name: 'Soft Feminine', mood: 'Blush, cream, gentle luxury', pageBg: 'bg-[#fff6f8]', heroBg: 'bg-[#f8dfe5]', text: 'text-rose-950', muted: 'text-rose-900/60', button: 'bg-rose-900 text-white', card: 'bg-white border-rose-100', imageTreatment: 'saturate-90' },
      { name: 'Modern Luxe', mood: 'Black and blush high fashion', pageBg: 'bg-neutral-950', heroBg: 'bg-gradient-to-br from-neutral-950 to-rose-950', text: 'text-white', muted: 'text-rose-100/60', button: 'bg-rose-200 text-rose-950', card: 'bg-neutral-900 border-neutral-800', imageTreatment: 'grayscale-[.25] contrast-110' },
      { name: 'Clean Spa', mood: 'White and sage wellness look', pageBg: 'bg-[#f4f7f2]', heroBg: 'bg-[#dce8d8]', text: 'text-[#24372b]', muted: 'text-[#587061]', button: 'bg-[#355b45] text-white', card: 'bg-white border-[#d9e5dc]', imageTreatment: 'saturate-75 brightness-105' },
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
    image: '/portfolio-restaurant.jpg',
    gallery: ['/portfolio-restaurant.jpg', '/portfolio-restaurant.jpg', '/portfolio-photography.jpg'],
    services: ['Dinner Menu', 'Private Events', 'Catering'],
    styles: [
      { name: 'Warm Fine Dining', mood: 'Dark amber and elegant', pageBg: 'bg-[#160e08]', heroBg: 'bg-gradient-to-br from-[#211207] to-[#754019]', text: 'text-amber-50', muted: 'text-amber-100/65', button: 'bg-amber-300 text-[#211207]', card: 'bg-[#21150d] border-amber-900/40', imageTreatment: 'contrast-110 saturate-110' },
      { name: 'Fresh Cafe', mood: 'Cream and green daytime cafe', pageBg: 'bg-[#fbfaf2]', heroBg: 'bg-[#e7efd9]', text: 'text-[#20311e]', muted: 'text-[#5f7059]', button: 'bg-[#355b34] text-white', card: 'bg-white border-[#dde6d2]', imageTreatment: 'brightness-105 saturate-90' },
      { name: 'Bold Bistro', mood: 'Red and black nightlife energy', pageBg: 'bg-[#100b0b]', heroBg: 'bg-gradient-to-br from-red-950 to-black', text: 'text-white', muted: 'text-red-100/60', button: 'bg-red-600 text-white', card: 'bg-[#1a1111] border-red-950', imageTreatment: 'contrast-125 saturate-125' },
    ],
  },
};

export function InteractiveBusinessDemo({ slug }: { slug: string }) {
  const demo = configs[slug];
  const [styleIndex, setStyleIndex] = useState(0);

  if (!demo) return null;
  const style = demo.styles[styleIndex];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${style.pageBg} ${style.text}`}>
      <style>{`
        @keyframes demoRise { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes demoFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .demo-rise { animation: demoRise .7s ease both; }
        .demo-float { animation: demoFloat 4s ease-in-out infinite; }
      `}</style>

      <div className="sticky top-0 z-50 border-b border-current/10 bg-inherit/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/#portfolio" className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100">
            <ArrowLeft className="h-4 w-4" /> Back to Portfolio
          </Link>
          <div className="hidden items-center gap-2 md:flex">
            {demo.styles.map((item, index) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setStyleIndex(index)}
                className={`rounded-full border px-4 py-2 text-xs font-medium transition ${index === styleIndex ? `${style.button} border-transparent` : 'border-current/20 opacity-65 hover:opacity-100'}`}
              >
                {item.name}
              </button>
            ))}
          </div>
          <Link href="/contact" className={`rounded-full px-5 py-2 text-sm font-medium ${style.button}`}>Get This Style</Link>
        </div>
      </div>

      <header className={`transition-colors duration-500 ${style.heroBg}`}>
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-24">
          <div className="demo-rise flex flex-col justify-center">
            <div className="mb-10 flex flex-wrap items-center gap-6 text-sm">
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${style.button} font-semibold`}>{demo.logo}</div>
              {demo.nav.map((item) => <a key={item} href="#services" className="opacity-65 hover:opacity-100">{item}</a>)}
            </div>
            <p className={`mb-5 text-xs uppercase tracking-[0.25em] ${style.muted}`}>{demo.eyebrow}</p>
            <h1 className="max-w-3xl text-5xl font-light leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">{demo.headline}</h1>
            <p className={`mt-7 max-w-2xl text-lg leading-relaxed sm:text-xl ${style.muted}`}>{demo.subtext}</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="#services" className={`inline-flex items-center justify-center rounded-full px-7 py-4 font-medium ${style.button}`}>{demo.primaryCta}<ArrowRight className="ml-2 h-4 w-4" /></a>
              <a href="#styles" className="inline-flex items-center justify-center rounded-full border border-current/20 px-7 py-4 font-medium">Change Style</a>
            </div>
          </div>

          <div className="demo-rise demo-float relative min-h-[460px] overflow-hidden rounded-[2rem] border border-current/10 shadow-2xl">
            <img src={demo.image} alt={`${demo.name} website hero preview`} className={`absolute inset-0 h-full w-full object-cover ${style.imageTreatment}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
              <p className="text-xs uppercase tracking-[0.22em] text-white/65">Featured experience</p>
              <h2 className="mt-2 max-w-lg text-3xl font-light">A real visual preview with photos, not empty placeholder blocks.</h2>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <section id="services" className="grid gap-6 md:grid-cols-3">
          {demo.services.map((service, index) => (
            <article key={service} className={`overflow-hidden rounded-[1.75rem] border ${style.card}`}>
              <div className="aspect-[4/3] overflow-hidden">
                <img src={demo.gallery[index]} alt={`${service} example`} className={`h-full w-full object-cover transition duration-500 hover:scale-105 ${style.imageTreatment}`} />
              </div>
              <div className="p-6">
                <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-full ${style.button}`}><BusinessIcon type={demo.type} /></div>
                <h3 className="text-xl font-medium">{service}</h3>
                <p className={`mt-3 text-sm leading-relaxed ${style.muted}`}>Clear details, visual trust, and a direct call-to-action built into the page.</p>
              </div>
            </article>
          ))}
        </section>

        <section id="styles" className="py-20">
          <div className="mb-10">
            <p className={`mb-3 text-xs uppercase tracking-[0.25em] ${style.muted}`}>Interactive style selector</p>
            <h2 className="text-4xl font-light sm:text-5xl">Click a style to change the entire demo</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {demo.styles.map((item, index) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setStyleIndex(index)}
                className={`overflow-hidden rounded-[2rem] border text-left transition hover:-translate-y-1 ${index === styleIndex ? 'ring-2 ring-current ring-offset-4 ring-offset-transparent' : 'border-current/15'} ${style.card}`}
              >
                <div className={`relative h-52 ${item.heroBg}`}>
                  <img src={demo.image} alt={`${item.name} preview`} className={`h-full w-full object-cover opacity-75 ${item.imageTreatment}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <p className="text-xs uppercase tracking-widest text-white/65">Live style</p>
                    <p className="mt-1 text-xl font-medium">{item.name}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className={`text-sm ${style.muted}`}>{item.mood}</p>
                  <div className="mt-5 flex items-center gap-2 text-sm font-medium">
                    {index === styleIndex ? <><CheckCircle className="h-4 w-4" /> Active style</> : <>Apply style <ArrowRight className="h-4 w-4" /></>}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className={`rounded-[2rem] border p-8 text-center md:p-14 ${style.card}`}>
          <Sparkles className="mx-auto mb-5 h-8 w-8" />
          <h2 className="mx-auto max-w-3xl text-4xl font-light sm:text-5xl">Want this design customized for a real business?</h2>
          <p className={`mx-auto mt-5 max-w-2xl text-lg ${style.muted}`}>The selected style can be customized with the business name, services, photos, colors, booking links, and contact information.</p>
          <Link href="/contact" className={`mt-8 inline-flex items-center rounded-full px-8 py-4 font-medium ${style.button}`}>Start a Project <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </section>
      </main>
    </div>
  );
}

function BusinessIcon({ type }: { type: BusinessType }) {
  const className = 'h-5 w-5';
  if (type === 'camera') return <Camera className={className} />;
  if (type === 'car') return <Car className={className} />;
  if (type === 'salon') return <Scissors className={className} />;
  return <Utensils className={className} />;
}
