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
  Phone,
  Scissors,
  Sparkles,
  Star,
  Utensils,
  Wrench,
} from 'lucide-react';

const slugs = ['photography-studio', 'auto-repair-shop', 'salon-spa', 'restaurant-website'];

export async function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slugs.includes(slug)) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <DemoStyles />
      <DemoBar />
      {slug === 'photography-studio' && <PhotographyDemo />}
      {slug === 'auto-repair-shop' && <AutoRepairDemo />}
      {slug === 'salon-spa' && <SalonDemo />}
      {slug === 'restaurant-website' && <RestaurantDemo />}
    </div>
  );
}

function DemoBar() {
  return (
    <div className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/#portfolio" className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-black">
          <ArrowLeft className="h-4 w-4" />
          Back to Portfolio
        </Link>
        <Link href="/contact" className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white hover:bg-gray-800">
          Get a Demo Like This
        </Link>
      </div>
    </div>
  );
}

function DemoStyles() {
  return (
    <style>{`
      html { scroll-behavior: smooth; }
      @keyframes td-fade-up {
        from { opacity: 0; transform: translateY(28px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes td-float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-18px); }
      }
      @keyframes td-marquee {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }
      @keyframes td-pulse {
        0%, 100% { opacity: .35; transform: scale(1); }
        50% { opacity: .8; transform: scale(1.1); }
      }
      @keyframes td-spin-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .td-animate-in { animation: td-fade-up .8s ease both; }
      .td-float { animation: td-float 4s ease-in-out infinite; }
      .td-marquee { animation: td-marquee 20s linear infinite; }
      .td-pulse { animation: td-pulse 3s ease-in-out infinite; }
      .td-spin { animation: td-spin-slow 18s linear infinite; }
      .td-delay-1 { animation-delay: .08s; }
      .td-delay-2 { animation-delay: .16s; }
      .td-delay-3 { animation-delay: .24s; }
    `}</style>
  );
}

function PhotographyDemo() {
  return (
    <main className="bg-[#f4efe7] text-[#241b15]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <div className="font-serif text-2xl italic">Lumière Studio</div>
        <div className="hidden items-center gap-8 text-sm uppercase tracking-[0.25em] text-[#6c5d50] md:flex">
          <a href="#gallery">Gallery</a>
          <a href="#sessions">Sessions</a>
          <a href="#book">Book</a>
        </div>
        <a href="#book" className="rounded-full border border-[#241b15] px-5 py-2 text-sm hover:bg-[#241b15] hover:text-white">
          Inquire
        </a>
      </nav>

      <section className="relative overflow-hidden px-4 pb-24 pt-12 sm:px-6 lg:px-8">
        <div className="absolute right-10 top-24 h-72 w-72 rounded-full bg-[#d7b891]/40 blur-3xl td-pulse" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div className="td-animate-in space-y-8">
            <p className="text-sm uppercase tracking-[0.35em] text-[#8a7764]">Wedding • Portrait • Editorial</p>
            <h1 className="max-w-3xl font-serif text-6xl leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
              Photos that feel like memory.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-[#66584c]">
              A cinematic photography website with a premium gallery, soft motion, clear session packages, and an inquiry path that feels elegant instead of salesy.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/contact" className="rounded-full bg-[#241b15] px-8 py-4 text-center text-white hover:bg-[#3a2d23]">
                Book Your Story
              </Link>
              <a href="#gallery" className="rounded-full border border-[#241b15]/30 px-8 py-4 text-center hover:border-[#241b15]">
                View Gallery
              </a>
            </div>
          </div>

          <div className="relative h-[620px] td-animate-in td-delay-1">
            <div className="absolute left-0 top-10 h-[430px] w-[66%] overflow-hidden rounded-t-full bg-[#2d231c] shadow-2xl">
              <div className="h-full w-full bg-[radial-gradient(circle_at_50%_25%,#f5d8b4_0,#806753_34%,#211914_72%)]" />
            </div>
            <div className="absolute bottom-0 right-0 h-[470px] w-[58%] overflow-hidden rounded-[2.4rem] border-[12px] border-[#f4efe7] bg-[#c9a57f] shadow-2xl td-float">
              <div className="h-full w-full bg-[linear-gradient(140deg,#fff2df_0%,#b88d66_42%,#201711_100%)]" />
            </div>
            <div className="absolute bottom-20 left-10 rounded-3xl bg-white/80 p-5 shadow-xl backdrop-blur">
              <div className="mb-2 flex gap-1 text-[#a67b45]">
                {[1, 2, 3, 4, 5].map((star) => <Star key={star} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="max-w-[210px] text-sm text-[#5f5147]">A calm, beautiful booking experience from the first click.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="overflow-hidden border-y border-[#d8cab8] bg-[#241b15] py-8 text-[#f4efe7]">
        <div className="td-marquee flex w-[200%] gap-6 text-4xl font-light uppercase tracking-[0.25em]">
          {['Portraits', 'Weddings', 'Editorials', 'Brand Shoots', 'Love Stories', 'Portraits', 'Weddings', 'Editorials', 'Brand Shoots', 'Love Stories'].map((item, index) => (
            <span key={`${item}-${index}`} className="whitespace-nowrap">{item}</span>
          ))}
        </div>
      </section>

      <section id="sessions" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#8a7764]">Session Menu</p>
            <h2 className="font-serif text-5xl sm:text-6xl">Choose your experience</h2>
          </div>
          <p className="max-w-lg text-[#6c5d50]">Simple packages make it easy for visitors to understand what to book and how to start.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ['Portrait Session', '$450', 'Studio or outdoor session with edited gallery.'],
            ['Wedding Story', '$2,800', 'Full-day wedding coverage with timeline planning.'],
            ['Brand Shoot', '$900', 'Photos for founders, teams, products, and social.'],
          ].map(([name, price, desc]) => (
            <div key={name} className="group rounded-[2rem] border border-[#d8cab8] bg-white/45 p-8 transition hover:-translate-y-2 hover:bg-white hover:shadow-2xl">
              <Camera className="mb-8 h-8 w-8" />
              <h3 className="mb-3 font-serif text-3xl">{name}</h3>
              <p className="mb-8 text-[#6c5d50]">{desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl">{price}</span>
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-2" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="book" className="bg-[#e8dccb] px-4 py-24 text-center sm:px-6 lg:px-8">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#8a7764]">Now Booking</p>
        <h2 className="mx-auto mb-8 max-w-3xl font-serif text-5xl sm:text-7xl">Make the first impression feel premium.</h2>
        <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#241b15] px-9 py-4 text-white hover:bg-[#3a2d23]">
          Start a Similar Website <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
}

function AutoRepairDemo() {
  return (
    <main className="bg-[#0b0f14] text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 font-black uppercase tracking-tight">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-red-600"><Wrench className="h-5 w-5" /></div>
          Redline Auto
        </div>
        <div className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          <a href="#services">Services</a>
          <a href="#reviews">Reviews</a>
          <a href="#estimate">Estimate</a>
        </div>
        <a href="tel:+1234567890" className="hidden rounded-xl bg-red-600 px-5 py-3 text-sm font-bold hover:bg-red-500 sm:inline-flex">Call Now</a>
        <Menu className="md:hidden" />
      </nav>

      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(220,38,38,.35),transparent_30%),linear-gradient(135deg,transparent_0%,rgba(255,255,255,.05)_100%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="td-animate-in space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-200">
              <Clock className="h-4 w-4" /> Same-day appointments available
            </div>
            <h1 className="text-6xl font-black uppercase leading-[0.9] tracking-tighter sm:text-7xl lg:text-8xl">
              Repair done fast. Done right.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-white/70">
              A bold mechanic website demo with emergency CTAs, service cards, trust badges, and appointment flow built for drivers who need help now.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {['ASE Certified', '4.9 Stars', '24hr Response'].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm font-bold">{item}</div>
              ))}
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/contact" className="rounded-xl bg-red-600 px-8 py-4 text-center font-bold hover:bg-red-500">
                Request Service
              </Link>
              <a href="#services" className="rounded-xl border border-white/20 px-8 py-4 text-center font-bold hover:bg-white hover:text-black">
                View Services
              </a>
            </div>
          </div>

          <div className="relative td-animate-in td-delay-1">
            <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full bg-red-600 blur-3xl opacity-40 td-pulse" />
            <div className="relative rounded-[2rem] border border-white/10 bg-[#111923] p-6 shadow-2xl">
              <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-5">
                <span className="text-sm text-white/50">Live service board</span>
                <span className="rounded-full bg-green-500/15 px-3 py-1 text-sm text-green-300">Open</span>
              </div>
              <div className="space-y-4">
                {[
                  ['Brake Inspection', '15 min wait', 'bg-red-600'],
                  ['Engine Diagnostic', 'Available today', 'bg-yellow-500'],
                  ['Oil Change', 'Fast lane', 'bg-green-500'],
                ].map(([service, time, color]) => (
                  <div key={service} className="rounded-2xl border border-white/10 bg-white/[.04] p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <p className="font-bold">{service}</p>
                      <span className={`h-3 w-3 rounded-full ${color}`} />
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div className={`h-full rounded-full ${color} w-2/3`} />
                    </div>
                    <p className="mt-3 text-sm text-white/50">{time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-red-300">Services</p>
            <h2 className="text-5xl font-black uppercase tracking-tighter">What we fix</h2>
          </div>
          <Car className="hidden h-14 w-14 text-red-500 md:block" />
        </div>
        <div className="grid gap-5 md:grid-cols-4">
          {['Brakes', 'Transmission', 'Diagnostics', 'Oil Change', 'Tires', 'AC Repair', 'Battery', 'Alignment'].map((item, index) => (
            <div key={item} className="group rounded-2xl border border-white/10 bg-white/[.04] p-6 transition hover:-translate-y-2 hover:border-red-500/60 hover:bg-red-600">
              <p className="mb-10 text-sm text-white/40">0{index + 1}</p>
              <h3 className="text-2xl font-black uppercase">{item}</h3>
            </div>
          ))}
        </div>
      </section>

      <section id="reviews" className="bg-white px-4 py-24 text-black sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-red-600">Reviews</p>
            <h2 className="text-5xl font-black uppercase tracking-tighter">Trust before they call.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {['Fixed my brakes same day.', 'Clear pricing and honest team.', 'Booked online in 30 seconds.'].map((quote) => (
              <div key={quote} className="rounded-3xl border border-gray-200 p-7 shadow-sm">
                <div className="mb-5 flex text-red-600">{[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-4 w-4 fill-current" />)}</div>
                <p className="text-lg font-medium">“{quote}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="estimate" className="px-4 py-24 text-center sm:px-6 lg:px-8">
        <h2 className="mx-auto mb-6 max-w-3xl text-5xl font-black uppercase tracking-tighter sm:text-7xl">Need a website that brings calls?</h2>
        <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-9 py-4 font-bold hover:bg-red-500">
          Build This Style <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
}

function SalonDemo() {
  return (
    <main className="bg-[#fff7f6] text-[#34171f]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <div className="font-serif text-3xl italic">Velvet Glow</div>
        <div className="hidden items-center gap-8 text-sm text-[#8d6671] md:flex">
          <a href="#treatments">Treatments</a>
          <a href="#stylists">Stylists</a>
          <a href="#booking">Booking</a>
        </div>
        <a href="#booking" className="rounded-full bg-[#34171f] px-6 py-3 text-sm text-white hover:bg-[#57303a]">Book Now</a>
      </nav>

      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-pink-200 blur-3xl td-pulse" />
        <div className="absolute right-10 top-10 h-48 w-48 rounded-full border border-[#e9b8c7] td-spin" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="td-animate-in space-y-8">
            <p className="text-sm uppercase tracking-[0.35em] text-[#b37687]">Hair • Skin • Lashes</p>
            <h1 className="font-serif text-6xl leading-[0.92] sm:text-7xl lg:text-8xl">Beauty booking that feels high-end.</h1>
            <p className="max-w-xl text-lg leading-8 text-[#7d5963]">
              A soft, feminine salon website demo with treatment menus, stylist cards, gift card promotion, and easy appointment requests.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/contact" className="rounded-full bg-[#34171f] px-8 py-4 text-center text-white hover:bg-[#57303a]">Create My Salon Site</Link>
              <a href="#treatments" className="rounded-full border border-[#34171f]/20 px-8 py-4 text-center hover:bg-white">Explore Treatments</a>
            </div>
          </div>

          <div className="td-animate-in td-delay-1">
            <div className="relative rounded-[3rem] bg-gradient-to-br from-[#ffdbe5] to-[#f5b8cb] p-5 shadow-2xl">
              <div className="rounded-[2.5rem] bg-white/75 p-6 backdrop-blur">
                <div className="mb-6 grid grid-cols-2 gap-4">
                  <div className="h-64 rounded-[2rem] bg-[linear-gradient(135deg,#f8a9c0,#fff1e9)]" />
                  <div className="space-y-4 pt-10">
                    <div className="h-32 rounded-[2rem] bg-[linear-gradient(135deg,#d88ea8,#fff)]" />
                    <div className="h-32 rounded-[2rem] bg-[linear-gradient(135deg,#f7d2db,#7b3548)]" />
                  </div>
                </div>
                <div className="rounded-[2rem] bg-[#34171f] p-6 text-white">
                  <p className="mb-2 text-sm text-white/60">Today’s Openings</p>
                  <div className="grid grid-cols-3 gap-3">
                    {['10:30', '1:00', '4:15'].map((time) => <div key={time} className="rounded-full bg-white/10 px-3 py-2 text-center text-sm">{time}</div>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="treatments" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#b37687]">Treatment Menu</p>
          <h2 className="font-serif text-5xl sm:text-6xl">Services that are easy to book</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ['Signature Facial', '60 min', '$120'],
            ['Blowout + Style', '45 min', '$75'],
            ['Lash Lift', '50 min', '$95'],
          ].map(([name, time, price]) => (
            <div key={name} className="rounded-[2rem] bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-2xl">
              <Scissors className="mb-8 h-7 w-7 text-[#b37687]" />
              <h3 className="mb-2 font-serif text-3xl">{name}</h3>
              <p className="mb-8 text-[#8d6671]">{time} treatment with online request flow.</p>
              <div className="flex items-center justify-between border-t border-pink-100 pt-5">
                <span className="text-2xl">{price}</span>
                <ArrowRight className="h-5 w-5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="stylists" className="bg-[#34171f] px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="max-w-2xl font-serif text-5xl sm:text-6xl">Meet the artists behind the glow.</h2>
            <p className="max-w-md text-white/60">Staff profiles help salons build trust before the appointment.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {['Mia — Color Specialist', 'Jade — Skin Expert', 'Lina — Lash Artist'].map((name, index) => (
              <div key={name} className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
                <div className="mb-5 h-72 rounded-[1.6rem] bg-gradient-to-br from-pink-200 to-[#7b3548]" />
                <p className="font-serif text-2xl">{name}</p>
                <p className="mt-2 text-sm text-white/50">0{index + 1} featured expert</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="px-4 py-24 text-center sm:px-6 lg:px-8">
        <Sparkles className="mx-auto mb-6 h-10 w-10 text-[#b37687]" />
        <h2 className="mx-auto mb-8 max-w-3xl font-serif text-5xl sm:text-7xl">Turn scrolling into bookings.</h2>
        <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#34171f] px-9 py-4 text-white hover:bg-[#57303a]">
          Build This Style <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
}

function RestaurantDemo() {
  return (
    <main className="bg-[#140f0a] text-[#fff7e8]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <div className="font-serif text-3xl">Harvest Table</div>
        <div className="hidden items-center gap-8 text-sm text-[#d9b77d] md:flex">
          <a href="#menu">Menu</a>
          <a href="#events">Events</a>
          <a href="#reserve">Reserve</a>
        </div>
        <a href="#reserve" className="rounded-full bg-[#d9a441] px-6 py-3 text-sm font-bold text-[#140f0a] hover:bg-[#f1c56a]">Reserve</a>
      </nav>

      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#d9a441]/20 blur-3xl td-pulse" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[.95fr_1.05fr]">
          <div className="td-animate-in space-y-8">
            <p className="text-sm uppercase tracking-[0.35em] text-[#d9b77d]">Seasonal dining • Private events</p>
            <h1 className="font-serif text-6xl leading-[0.9] sm:text-7xl lg:text-8xl">A table worth reserving.</h1>
            <p className="max-w-xl text-lg leading-8 text-[#e6d5b8]/75">
              A warm restaurant website demo with menu highlights, reservation CTA, hours, location, and private event inquiries built right into the flow.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/contact" className="rounded-full bg-[#d9a441] px-8 py-4 text-center font-bold text-[#140f0a] hover:bg-[#f1c56a]">Create My Restaurant Site</Link>
              <a href="#menu" className="rounded-full border border-[#d9a441]/40 px-8 py-4 text-center hover:bg-[#d9a441] hover:text-[#140f0a]">View Menu</a>
            </div>
          </div>

          <div className="td-animate-in td-delay-1">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-5 pt-14">
                <div className="h-80 rounded-t-full bg-[radial-gradient(circle_at_50%_30%,#ffe8ad,#a64d22_45%,#2b170c_100%)] shadow-2xl" />
                <div className="rounded-3xl border border-[#d9a441]/20 bg-white/5 p-6">
                  <Utensils className="mb-4 h-6 w-6 text-[#d9a441]" />
                  <p className="font-serif text-2xl">Chef’s seasonal tasting menu</p>
                </div>
              </div>
              <div className="space-y-5">
                <div className="rounded-3xl border border-[#d9a441]/20 bg-[#21170e] p-6 shadow-2xl">
                  <p className="mb-4 text-sm text-[#d9b77d]">Tonight</p>
                  {['5:30 PM', '7:00 PM', '8:45 PM'].map((time) => <div key={time} className="mb-3 rounded-full bg-white/10 px-4 py-3 text-center">{time}</div>)}
                </div>
                <div className="h-96 rounded-b-full bg-[radial-gradient(circle_at_50%_20%,#fff0c5,#d9a441_40%,#2d1b0e_100%)] shadow-2xl td-float" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#d9b77d]">Menu Preview</p>
          <h2 className="font-serif text-5xl sm:text-6xl">Designed to make people hungry</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ['Woodfire Salmon', 'Citrus butter, herbs, charred lemon', '$32'],
            ['Short Rib Pasta', 'Slow-braised beef, fresh tagliatelle', '$29'],
            ['Harvest Board', 'Local cheese, fruit, warm bread', '$24'],
          ].map(([name, desc, price]) => (
            <div key={name} className="rounded-[2rem] border border-[#d9a441]/20 bg-white/[.04] p-8 transition hover:-translate-y-2 hover:bg-[#d9a441] hover:text-[#140f0a]">
              <div className="mb-8 h-48 rounded-[1.6rem] bg-[radial-gradient(circle,#fff0c5,#d9a441_45%,#2d1b0e_100%)]" />
              <h3 className="mb-3 font-serif text-3xl">{name}</h3>
              <p className="mb-8 opacity-70">{desc}</p>
              <p className="text-2xl font-bold">{price}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="events" className="bg-[#fff7e8] px-4 py-24 text-[#140f0a] sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#9d6722]">Private Events</p>
            <h2 className="mb-6 font-serif text-5xl sm:text-6xl">Make birthdays, meetings, and dinners easy to book.</h2>
            <p className="text-lg leading-8 text-[#6f5334]">Event sections help restaurants capture higher-value inquiries, not just regular reservations.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {['Private Room', 'Catering', 'Wine Dinner', 'Large Party'].map((item) => (
              <div key={item} className="rounded-3xl border border-[#dcc39b] bg-white p-7 shadow-sm">
                <CheckCircle className="mb-5 h-6 w-6 text-[#9d6722]" />
                <p className="font-serif text-2xl">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reserve" className="px-4 py-24 text-center sm:px-6 lg:px-8">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#d9b77d]">Reservation Focused</p>
        <h2 className="mx-auto mb-8 max-w-3xl font-serif text-5xl sm:text-7xl">A website that makes the next step obvious.</h2>
        <div className="mx-auto mb-8 grid max-w-3xl gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-[#d9a441]/20 p-5"><Clock className="mx-auto mb-3 h-5 w-5" />Open 5–10 PM</div>
          <div className="rounded-2xl border border-[#d9a441]/20 p-5"><MapPin className="mx-auto mb-3 h-5 w-5" />Downtown</div>
          <div className="rounded-2xl border border-[#d9a441]/20 p-5"><Phone className="mx-auto mb-3 h-5 w-5" />Call to Reserve</div>
        </div>
        <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#d9a441] px-9 py-4 font-bold text-[#140f0a] hover:bg-[#f1c56a]">
          Build This Style <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
}
