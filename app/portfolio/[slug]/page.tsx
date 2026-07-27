import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Camera,
  Car,
  CheckCircle,
  Clock,
  MapPin,
  Menu,
  Scissors,
  Sparkles,
  Star,
  Utensils,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  { slug: 'photography-studio' },
  { slug: 'auto-repair-shop' },
  { slug: 'salon-spa' },
  { slug: 'restaurant-website' },
];

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!projects.some((project) => project.slug === slug)) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        @keyframes slideLoop {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: .45; transform: scale(1); }
          50% { opacity: .9; transform: scale(1.08); }
        }
        .fade-up { animation: fadeUp .8s ease both; }
        .float-slow { animation: floatSlow 4s ease-in-out infinite; }
        .slide-loop { animation: slideLoop 16s linear infinite; }
        .glow-pulse { animation: glowPulse 4s ease-in-out infinite; }
      `}</style>

      {slug === 'photography-studio' && <PhotographyDemo />}
      {slug === 'auto-repair-shop' && <AutoRepairDemo />}
      {slug === 'salon-spa' && <SalonDemo />}
      {slug === 'restaurant-website' && <RestaurantDemo />}
    </div>
  );
}

function BackLink({ color = 'text-gray-700 hover:text-black' }: { color?: string }) {
  return (
    <Link href="/#portfolio" className={`inline-flex items-center gap-2 text-sm font-light transition-colors ${color}`}>
      <ArrowLeft className="h-4 w-4" />
      Back to Portfolio
    </Link>
  );
}

function BrowserDots() {
  return (
    <div className="flex gap-2">
      <span className="h-3 w-3 rounded-full bg-red-400" />
      <span className="h-3 w-3 rounded-full bg-yellow-400" />
      <span className="h-3 w-3 rounded-full bg-green-400" />
    </div>
  );
}

function PhotographyDemo() {
  return (
    <main className="bg-[#f5f0e8] text-[#16130f]">
      <section className="relative min-h-screen overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <BackLink />
          <div className="grid items-center gap-12 py-16 lg:grid-cols-[.9fr_1.1fr] lg:py-24">
            <div className="fade-up space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#b7a98f] px-4 py-2 text-xs uppercase tracking-[0.26em] text-[#7a6a50]">
                <Camera className="h-4 w-4" />
                Luxury photography demo
              </div>
              <h1 className="text-6xl font-light leading-[0.88] tracking-tight sm:text-7xl lg:text-8xl">
                Stories told in light, texture, and emotion.
              </h1>
              <p className="max-w-xl text-lg font-light leading-relaxed text-[#625743]">
                This demo feels like a premium photography brand with a cinematic landing page, editorial image blocks, and a booking path that feels elegant instead of salesy.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button asChild className="rounded-none bg-[#16130f] px-8 py-6 text-white hover:bg-[#2b251c]">
                  <Link href="/contact">Build This Style <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <a href="#photo-gallery" className="inline-flex items-center justify-center border border-[#16130f] px-8 py-3 font-medium hover:bg-[#16130f] hover:text-white">
                  View Gallery Flow
                </a>
              </div>
            </div>

            <div className="float-slow relative min-h-[560px]">
              <div className="absolute left-4 top-12 h-72 w-48 rounded-t-full bg-[#d8c6a3] shadow-2xl sm:h-96 sm:w-64" />
              <div className="absolute right-4 top-0 h-96 w-60 rounded-t-full bg-[#2d2a24] shadow-2xl sm:w-80" />
              <div className="absolute bottom-10 left-1/2 h-80 w-60 -translate-x-1/2 rounded-t-full bg-[#b48b63] shadow-2xl sm:h-96 sm:w-72" />
              <div className="absolute left-1/2 top-1/2 w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-white/60 bg-white/70 p-5 shadow-2xl backdrop-blur">
                <div className="mb-5 flex items-center justify-between">
                  <BrowserDots />
                  <span className="text-xs text-[#7a6a50]">sarahchenphoto.com</span>
                  <Menu className="h-4 w-4" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {['Weddings', 'Portraits', 'Editorials'].map((item, index) => (
                    <div key={item} className="aspect-[3/5] rounded-t-full bg-gradient-to-b from-[#16130f] to-[#c5a37a] p-4 text-white shadow-lg" style={{ marginTop: `${index * 28}px` }}>
                      <p className="text-xs uppercase tracking-widest opacity-80">0{index + 1}</p>
                      <p className="mt-32 text-sm font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="photo-gallery" className="overflow-hidden border-y border-[#d2c4aa] bg-[#16130f] py-10 text-white">
        <div className="slide-loop flex w-[200%] gap-6 whitespace-nowrap text-4xl font-light uppercase tracking-[0.18em] text-white/80">
          <span>Wedding Gallery</span><span>•</span><span>Brand Portraits</span><span>•</span><span>Client Booking</span><span>•</span><span>Editorial Style</span><span>•</span>
          <span>Wedding Gallery</span><span>•</span><span>Brand Portraits</span><span>•</span><span>Client Booking</span><span>•</span><span>Editorial Style</span><span>•</span>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-24 sm:px-6 lg:grid-cols-3 lg:px-8">
        {['Full-screen gallery', 'Session inquiry form', 'Soft luxury branding'].map((item) => (
          <div key={item} className="rounded-t-[4rem] border border-[#d2c4aa] bg-white/50 p-8">
            <Sparkles className="mb-8 h-5 w-5" />
            <h2 className="text-2xl font-light">{item}</h2>
            <p className="mt-4 font-light leading-relaxed text-[#625743]">Built to make the business feel premium before the customer ever sends an inquiry.</p>
          </div>
        ))}
      </section>
    </main>
  );
}

function AutoRepairDemo() {
  return (
    <main className="bg-[#0b0f14] text-white">
      <section className="relative overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-red-600/30 blur-3xl glow-pulse" />
        <div className="mx-auto max-w-7xl">
          <BackLink color="text-white/70 hover:text-white" />
          <div className="grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
            <div className="fade-up space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-4 py-2 text-xs uppercase tracking-[0.26em] text-red-100">
                <Car className="h-4 w-4" />
                Auto repair demo
              </div>
              <h1 className="text-6xl font-black uppercase leading-[0.9] tracking-tighter sm:text-7xl lg:text-8xl">
                Fast repairs. Clear prices. Easy booking.
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-white/70">
                This demo is built like a real shop website: urgent CTA, service menu, trust badges, diagnostics section, and a simple appointment request flow.
              </p>
              <div className="grid grid-cols-3 gap-3 pt-4">
                {['Brakes', 'Oil', 'Engine'].map((service) => (
                  <div key={service} className="border border-white/10 bg-white/5 p-4 text-center">
                    <CheckCircle className="mx-auto mb-2 h-5 w-5 text-red-400" />
                    <p className="text-sm">{service}</p>
                  </div>
                ))}
              </div>
              <Button asChild className="rounded-none bg-red-600 px-8 py-6 text-white hover:bg-red-700">
                <Link href="/contact">Make an Auto Demo <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>

            <div className="fade-up rounded-[2rem] border border-white/10 bg-white p-4 text-black shadow-2xl">
              <div className="rounded-[1.5rem] bg-[#111827] p-5 text-white">
                <div className="mb-6 flex items-center justify-between">
                  <BrowserDots />
                  <span className="text-xs text-white/50">mikesautocare.com</span>
                  <Clock className="h-4 w-4 text-red-400" />
                </div>
                <div className="rounded-2xl bg-red-600 p-6">
                  <p className="text-xs uppercase tracking-widest text-red-100">Same-day service</p>
                  <h2 className="mt-3 text-4xl font-black uppercase">Need repair today?</h2>
                  <p className="mt-3 text-red-50">Request a quote in under 60 seconds.</p>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {['Vehicle issue', 'Preferred time', 'Phone number', 'Submit request'].map((field, index) => (
                    <div key={field} className="rounded-xl border border-white/10 bg-white/10 p-4">
                      <p className="text-xs text-white/40">Step 0{index + 1}</p>
                      <p className="mt-1 font-medium">{field}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-4">
          {[
            ['4.9★', 'Google rating'],
            ['24 hr', 'Fast response'],
            ['200%', 'More appointments'],
            ['85%', 'Online requests'],
          ].map(([value, label]) => (
            <div key={label} className="border border-white/10 p-6">
              <p className="text-4xl font-black text-red-400">{value}</p>
              <p className="mt-2 text-white/60">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function SalonDemo() {
  return (
    <main className="bg-[#fff5f8] text-[#241019]">
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <BackLink />
          <div className="grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-24">
            <div className="fade-up space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#241019] px-4 py-2 text-xs uppercase tracking-[0.26em] text-white">
                <Scissors className="h-4 w-4" />
                Salon + spa demo
              </div>
              <h1 className="text-6xl font-light leading-[0.92] tracking-tight sm:text-7xl lg:text-8xl">
                Beauty booking that feels soft, premium, and modern.
              </h1>
              <p className="max-w-xl text-lg font-light leading-relaxed text-[#7a5360]">
                This one is designed for salons, lash techs, spas, med spas, and beauty studios. It focuses on services, staff, online booking, and gift-card sales.
              </p>
              <Button asChild className="rounded-full bg-[#241019] px-8 py-6 text-white hover:bg-[#3b1d2a]">
                <Link href="/contact">Create a Beauty Demo <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>

            <div className="float-slow rounded-[3rem] bg-white p-5 shadow-2xl">
              <div className="rounded-[2.5rem] bg-gradient-to-br from-[#ffe0ea] via-white to-[#f6c5d4] p-6">
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-serif text-2xl italic">Luxe Beauty</span>
                  <span className="rounded-full bg-white px-4 py-2 text-xs">Book Now</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {['Hair', 'Skin', 'Lashes', 'Bridal'].map((service, index) => (
                    <div key={service} className="rounded-[2rem] bg-white/80 p-5 shadow-sm" style={{ transform: `translateY(${index % 2 ? 28 : 0}px)` }}>
                      <Sparkles className="mb-8 h-5 w-5 text-[#b84b6b]" />
                      <h2 className="text-2xl font-light">{service}</h2>
                      <p className="mt-2 text-sm text-[#7a5360]">View services</p>
                    </div>
                  ))}
                </div>
                <div className="mt-12 rounded-[2rem] bg-[#241019] p-6 text-white">
                  <p className="text-sm text-white/60">Next available</p>
                  <p className="mt-2 text-3xl font-light">Today at 3:30 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-24 sm:px-6 md:grid-cols-3 lg:px-8">
        {['Service menu', 'Staff profiles', 'Booking CTA'].map((item) => (
          <div key={item} className="rounded-[2rem] border border-[#f0bfd0] bg-white p-8">
            <Star className="mb-6 h-5 w-5 text-[#b84b6b]" />
            <h2 className="text-3xl font-light">{item}</h2>
            <p className="mt-4 font-light text-[#7a5360]">A soft layout that makes the business feel high-end and easy to book.</p>
          </div>
        ))}
      </section>
    </main>
  );
}

function RestaurantDemo() {
  return (
    <main className="bg-[#120b06] text-[#fff7ea]">
      <section className="relative overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
        <div className="absolute -right-24 top-24 h-96 w-96 rounded-full bg-amber-500/20 blur-3xl glow-pulse" />
        <div className="mx-auto max-w-7xl">
          <BackLink color="text-white/70 hover:text-white" />
          <div className="grid items-center gap-12 py-16 lg:grid-cols-[.9fr_1.1fr] lg:py-24">
            <div className="fade-up space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-xs uppercase tracking-[0.26em] text-amber-100">
                <Utensils className="h-4 w-4" />
                Restaurant website demo
              </div>
              <h1 className="font-serif text-6xl italic leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
                Make visitors hungry before they arrive.
              </h1>
              <p className="max-w-xl text-lg font-light leading-relaxed text-white/70">
                This demo feels like a real restaurant site with a warm hero, menu highlights, reservation CTA, location section, and private event inquiry path.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button asChild className="rounded-none bg-amber-400 px-8 py-6 text-black hover:bg-amber-300">
                  <Link href="/contact">Build Restaurant Demo <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <a href="#menu" className="inline-flex items-center justify-center border border-white/25 px-8 py-3 hover:bg-white/10">View Menu Design</a>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="float-slow rounded-t-full bg-gradient-to-b from-amber-300 to-orange-900 p-8 pt-28 text-black shadow-2xl">
                <p className="text-sm uppercase tracking-widest">Chef special</p>
                <h2 className="mt-3 font-serif text-4xl italic">Seasonal Tasting</h2>
                <p className="mt-16 text-sm">Reserve tonight</p>
              </div>
              <div className="space-y-5 pt-12">
                {['Dinner Menu', 'Private Events', 'Catering'].map((item) => (
                  <div key={item} className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
                    <h3 className="font-serif text-2xl italic">{item}</h3>
                    <p className="mt-2 text-sm text-white/60">Explore options</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="border-y border-white/10 bg-[#fff7ea] px-4 py-24 text-[#120b06] sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-orange-800">Menu preview</p>
            <h2 className="mt-4 font-serif text-6xl italic">A menu layout that sells the experience.</h2>
          </div>
          <div className="space-y-5">
            {[
              ['Roasted Sea Bass', '$34'],
              ['Truffle Mushroom Pasta', '$28'],
              ['Citrus Olive Cake', '$12'],
            ].map(([dish, price]) => (
              <div key={dish} className="flex items-center justify-between border-b border-orange-900/20 py-5">
                <div>
                  <h3 className="font-serif text-2xl italic">{dish}</h3>
                  <p className="text-sm text-orange-900/60">Seasonal ingredients • chef selected</p>
                </div>
                <p className="text-xl">{price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
