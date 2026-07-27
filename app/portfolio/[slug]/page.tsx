import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Car,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Scissors,
  Sparkles,
  Star,
  Utensils,
  Wrench,
} from 'lucide-react';

type Demo = {
  slug: string;
  name: string;
  logo: string;
  eyebrow: string;
  headline: string;
  subtext: string;
  primaryCta: string;
  secondaryCta: string;
  nav: string[];
  icon: 'camera' | 'car' | 'salon' | 'food';
  shell: string;
  hero: string;
  accent: string;
  text: string;
  button: string;
  soft: string;
  services: string[];
  stats: { value: string; label: string }[];
  styles: { name: string; mood: string; className: string }[];
};

const demos: Demo[] = [
  {
    slug: 'photography-studio',
    name: 'Luna Frame Studio',
    logo: 'LF',
    eyebrow: 'Wedding • Portrait • Brand Photography',
    headline: 'Editorial photography for stories worth keeping.',
    subtext: 'A cinematic website demo for a photographer with a premium gallery, emotional copy, booking CTA, and soft luxury visuals.',
    primaryCta: 'Book a Session',
    secondaryCta: 'View Gallery',
    nav: ['Portfolio', 'Sessions', 'Pricing', 'Contact'],
    icon: 'camera',
    shell: 'bg-[#f7f1ea] text-stone-950',
    hero: 'from-stone-950 via-stone-800 to-[#b79d7b]',
    accent: 'text-[#8a6b45]',
    text: 'text-stone-700',
    button: 'bg-stone-950 text-white hover:bg-stone-800',
    soft: 'bg-[#eee2d3]',
    services: ['Wedding Stories', 'Portrait Sessions', 'Personal Branding'],
    stats: [
      { value: '48hr', label: 'Preview delivery' },
      { value: '120+', label: 'Love stories captured' },
      { value: '4.9★', label: 'Client rating' },
    ],
    styles: [
      { name: 'Luxury Minimal', mood: 'Soft beige, editorial spacing, premium feel', className: 'from-stone-100 to-[#decbb7]' },
      { name: 'Dark Editorial', mood: 'Black hero, cinematic contrast, magazine look', className: 'from-stone-950 to-stone-700 text-white' },
      { name: 'Warm Romantic', mood: 'Cream, tan, soft rounded gallery cards', className: 'from-[#fff7ed] to-[#fed7aa]' },
    ],
  },
  {
    slug: 'auto-repair-shop',
    name: 'Apex Auto Care',
    logo: 'AA',
    eyebrow: 'Diagnostics • Brakes • Maintenance',
    headline: 'Fast repairs, honest pricing, and same-day service.',
    subtext: 'A bold auto repair demo with urgent calls-to-action, service cards, trust badges, and a strong mobile-first appointment flow.',
    primaryCta: 'Schedule Service',
    secondaryCta: 'Call the Shop',
    nav: ['Services', 'Reviews', 'Fleet', 'Contact'],
    icon: 'car',
    shell: 'bg-zinc-950 text-white',
    hero: 'from-zinc-950 via-red-950 to-zinc-800',
    accent: 'text-red-400',
    text: 'text-zinc-300',
    button: 'bg-red-600 text-white hover:bg-red-500',
    soft: 'bg-red-500/10',
    services: ['Brake Repair', 'Oil Change', 'Engine Diagnostics'],
    stats: [
      { value: '24hr', label: 'Quick turnaround' },
      { value: '500+', label: 'Vehicles serviced' },
      { value: '4.8★', label: 'Google rating' },
    ],
    styles: [
      { name: 'Performance Dark', mood: 'Black and red, high trust, strong CTA', className: 'from-zinc-950 to-red-950 text-white' },
      { name: 'Clean Garage', mood: 'White layout, clear services, family-owned feel', className: 'from-white to-zinc-200' },
      { name: 'Fleet Pro', mood: 'Blue-gray industrial look for commercial clients', className: 'from-slate-900 to-blue-900 text-white' },
    ],
  },
  {
    slug: 'salon-spa',
    name: 'Velvet Glow Salon',
    logo: 'VG',
    eyebrow: 'Hair • Skin • Lashes • Bridal',
    headline: 'A beauty experience that feels premium before they walk in.',
    subtext: 'A soft salon and spa demo with service menus, stylist highlights, booking CTA, and a feminine premium brand direction.',
    primaryCta: 'Book Appointment',
    secondaryCta: 'View Services',
    nav: ['Services', 'Artists', 'Gallery', 'Book'],
    icon: 'salon',
    shell: 'bg-[#fff5f7] text-rose-950',
    hero: 'from-rose-950 via-pink-900 to-[#d8a0aa]',
    accent: 'text-rose-600',
    text: 'text-rose-900/70',
    button: 'bg-rose-900 text-white hover:bg-rose-800',
    soft: 'bg-rose-100',
    services: ['Hair Styling', 'Facials', 'Lash Extensions'],
    stats: [
      { value: '2min', label: 'Booking flow' },
      { value: '30+', label: 'Beauty services' },
      { value: '98%', label: 'Client satisfaction' },
    ],
    styles: [
      { name: 'Soft Feminine', mood: 'Pink, cream, rounded, calming luxury', className: 'from-pink-50 to-rose-200' },
      { name: 'Modern Luxe', mood: 'Black, blush, large type, premium salon feel', className: 'from-neutral-950 to-rose-950 text-white' },
      { name: 'Clean Spa', mood: 'White space, muted green, peaceful wellness look', className: 'from-white to-emerald-100' },
    ],
  },
  {
    slug: 'restaurant-website',
    name: 'Harvest & Ember',
    logo: 'H&E',
    eyebrow: 'Seasonal Menu • Private Events • Reservations',
    headline: 'A warm restaurant website that makes guests hungry.',
    subtext: 'A restaurant demo with menu highlights, reservation CTA, private event section, hours, location, and mouth-watering visual blocks.',
    primaryCta: 'Reserve a Table',
    secondaryCta: 'See Menu',
    nav: ['Menu', 'Events', 'Hours', 'Reserve'],
    icon: 'food',
    shell: 'bg-[#140f0a] text-amber-50',
    hero: 'from-[#140f0a] via-[#5f2f16] to-[#d97706]',
    accent: 'text-amber-400',
    text: 'text-amber-100/75',
    button: 'bg-amber-400 text-black hover:bg-amber-300',
    soft: 'bg-amber-400/10',
    services: ['Dinner Menu', 'Private Events', 'Catering'],
    stats: [
      { value: '5pm', label: 'Dinner starts' },
      { value: '80+', label: 'Seats available' },
      { value: '4.9★', label: 'Guest rating' },
    ],
    styles: [
      { name: 'Warm Fine Dining', mood: 'Dark amber, elegant menu, reservation focus', className: 'from-[#1c1208] to-amber-800 text-white' },
      { name: 'Fresh Cafe', mood: 'Cream, green, daylight, casual lunch feel', className: 'from-lime-50 to-emerald-200' },
      { name: 'Bold Bistro', mood: 'Red, black, bold type, nightlife energy', className: 'from-red-950 to-zinc-950 text-white' },
    ],
  },
];

export async function generateStaticParams() {
  return demos.map((demo) => ({ slug: demo.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const demo = demos.find((item) => item.slug === slug);

  if (!demo) {
    notFound();
  }

  return (
    <div className={`min-h-screen ${demo.shell}`}>
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes riseIn { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes floatCard { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        @keyframes sweep { from { transform: translateX(-120%); } to { transform: translateX(120%); } }
        .td-rise { animation: riseIn .8s ease both; }
        .td-float { animation: floatCard 4s ease-in-out infinite; }
        .td-shine { position: relative; overflow: hidden; }
        .td-shine:after { content: ''; position: absolute; inset: 0; background: linear-gradient(110deg, transparent 15%, rgba(255,255,255,.28), transparent 70%); animation: sweep 4s ease-in-out infinite; }
      `}</style>

      <div className="sticky top-0 z-50 border-b border-current/10 bg-inherit/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/#portfolio" className="inline-flex items-center gap-2 text-sm opacity-75 hover:opacity-100">
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>
          <Link href="/contact" className={`rounded-full px-5 py-2 text-sm font-medium ${demo.button}`}>
            Get This Style
          </Link>
        </div>
      </div>

      <header className={`relative overflow-hidden bg-gradient-to-br ${demo.hero}`}>
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_15%_20%,white,transparent_25%),radial-gradient(circle_at_85%_10%,white,transparent_22%),radial-gradient(circle_at_50%_90%,white,transparent_25%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8 lg:py-24">
          <div className="td-rise flex flex-col justify-center text-white">
            <nav className="mb-12 flex flex-wrap items-center gap-6 text-sm text-white/70">
              <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/15 font-semibold text-white backdrop-blur">
                {demo.logo}
              </div>
              {demo.nav.map((item) => (
                <a key={item} href="#demo" className="hover:text-white">
                  {item}
                </a>
              ))}
            </nav>

            <p className="mb-5 text-xs uppercase tracking-[0.28em] text-white/70">{demo.eyebrow}</p>
            <h1 className="max-w-3xl text-5xl font-light leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              {demo.headline}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">
              {demo.subtext}
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="#demo" className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 font-medium text-black hover:bg-white/90">
                {demo.primaryCta} <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a href="#styles" className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-4 font-medium text-white hover:bg-white/10">
                {demo.secondaryCta}
              </a>
            </div>
          </div>

          <DemoPreview demo={demo} />
        </div>
      </header>

      <main id="demo" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <section className="grid gap-6 md:grid-cols-3">
          {demo.stats.map((stat, index) => (
            <div key={stat.label} className={`td-rise rounded-3xl border border-current/10 ${demo.soft} p-8`} style={{ animationDelay: `${index * 100}ms` }}>
              <div className="text-4xl font-light">{stat.value}</div>
              <p className={`mt-2 ${demo.text}`}>{stat.label}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-12 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className={`mb-4 text-xs uppercase tracking-[0.28em] ${demo.accent}`}>Demo website sections</p>
            <h2 className="text-4xl font-light leading-tight sm:text-5xl">
              This is the kind of page your client should see after clicking View Project.
            </h2>
            <p className={`mt-6 text-lg leading-relaxed ${demo.text}`}>
              Instead of a plain case study, this page now acts like a mini live website. It shows the hero, services, trust points, and the visual direction for the business.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {demo.services.map((service) => (
              <div key={service} className="rounded-3xl border border-current/10 bg-white/70 p-6 text-black shadow-sm">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-black text-white">
                  <DemoIcon type={demo.icon} />
                </div>
                <h3 className="text-lg font-medium">{service}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">A clean conversion section with clear copy and a simple call-to-action.</p>
              </div>
            ))}
          </div>
        </section>

        <section id="styles" className="py-10">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className={`mb-3 text-xs uppercase tracking-[0.28em] ${demo.accent}`}>Style options</p>
              <h2 className="text-4xl font-light sm:text-5xl">A few different looks for this business</h2>
            </div>
            <Link href="/contact" className={`inline-flex w-fit items-center rounded-full px-6 py-3 text-sm font-medium ${demo.button}`}>
              Request this demo <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {demo.styles.map((style) => (
              <div key={style.name} className="overflow-hidden rounded-[2rem] border border-current/10 bg-white text-black">
                <div className={`h-48 bg-gradient-to-br ${style.className} p-6`}>
                  <div className="flex h-full flex-col justify-between rounded-3xl border border-white/30 bg-white/15 p-5 backdrop-blur-sm">
                    <div className="h-9 w-9 rounded-full bg-white/70" />
                    <div>
                      <div className="mb-2 h-3 w-24 rounded-full bg-white/70" />
                      <div className="h-8 w-36 rounded-full bg-white/80" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium">{style.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{style.mood}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={`mt-16 rounded-[2rem] ${demo.soft} p-8 text-center md:p-14`}>
          <Sparkles className="mx-auto mb-5 h-8 w-8" />
          <h2 className="mx-auto max-w-3xl text-4xl font-light leading-tight sm:text-5xl">
            Want this style customized for a real business?
          </h2>
          <p className={`mx-auto mt-5 max-w-2xl text-lg ${demo.text}`}>
            This demo can be changed for dental offices, cleaning companies, auto detailers, restaurants, salons, or any local service business.
          </p>
          <Link href="/contact" className={`mt-8 inline-flex items-center rounded-full px-8 py-4 font-medium ${demo.button}`}>
            Start Free <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </section>
      </main>
    </div>
  );
}

function DemoPreview({ demo }: { demo: Demo }) {
  return (
    <div className="td-rise td-float flex items-center justify-center" style={{ animationDelay: '150ms' }}>
      <div className="td-shine w-full max-w-xl rounded-[2rem] border border-white/25 bg-white/15 p-4 shadow-2xl backdrop-blur-xl">
        <div className="overflow-hidden rounded-[1.5rem] bg-white text-black shadow-2xl">
          <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
            </div>
            <span className="text-xs text-gray-500">{demo.name.toLowerCase().replaceAll(' ', '')}.com</span>
          </div>

          <div className="p-6 sm:p-8">
            <div className={`rounded-[1.5rem] bg-gradient-to-br ${demo.hero} p-6 text-white`}>
              <div className="mb-14 flex items-center justify-between text-xs text-white/75">
                <span className="font-semibold">{demo.name}</span>
                <span>{demo.nav[0]}</span>
              </div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/60">{demo.eyebrow}</p>
              <h3 className="max-w-xs text-3xl font-light leading-tight">{demo.headline}</h3>
              <button className="mt-6 rounded-full bg-white px-5 py-3 text-sm font-medium text-black">{demo.primaryCta}</button>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {demo.services.map((service) => (
                <div key={service} className="rounded-2xl border border-gray-200 p-3">
                  <DemoIcon type={demo.icon} />
                  <p className="mt-3 text-xs font-medium">{service}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DemoIcon({ type }: { type: Demo['icon'] }) {
  const className = 'h-5 w-5';
  if (type === 'camera') return <Camera className={className} />;
  if (type === 'car') return <Car className={className} />;
  if (type === 'salon') return <Scissors className={className} />;
  return <Utensils className={className} />;
}
