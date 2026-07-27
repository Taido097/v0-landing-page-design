import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calendar, CheckCircle, MapPin, Menu, Phone, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    slug: 'photography-studio',
    title: 'Photography Studio',
    category: 'Portfolio Website',
    client: 'Sarah Chen Photography',
    duration: '3 weeks',
    year: '2024',
    accent: 'from-stone-950 via-zinc-800 to-stone-700',
    softAccent: 'bg-stone-100',
    badge: 'Luxury portrait + wedding photography',
    heroTitle: 'Timeless photos for modern love stories.',
    heroText: 'A premium photography website demo with a cinematic hero, gallery preview, booking call-to-action, and trust-building client experience.',
    cta: 'Book a Session',
    services: ['Wedding Photography', 'Portrait Sessions', 'Brand Shoots'],
    stats: [
      { value: '150%', label: 'More bookings' },
      { value: '3x', label: 'More inquiries' },
      { value: '45%', label: 'Higher engagement' },
    ],
    previewCards: ['Editorial', 'Wedding', 'Portrait'],
    testimonial: 'The site feels premium, simple, and easy for clients to book from.',
  },
  {
    slug: 'auto-repair-shop',
    title: 'Auto Repair Shop',
    category: 'Service Business',
    client: 'Mike\'s Auto Care',
    duration: '2 weeks',
    year: '2024',
    accent: 'from-slate-950 via-red-950 to-zinc-900',
    softAccent: 'bg-red-50',
    badge: 'Fast service + online appointment requests',
    heroTitle: 'Auto repair that gets drivers back on the road.',
    heroText: 'A clean auto repair website demo with service cards, emergency CTA, reviews, and an appointment request flow.',
    cta: 'Schedule Service',
    services: ['Brake Repair', 'Oil Change', 'Engine Diagnostics'],
    stats: [
      { value: '200%', label: 'More appointments' },
      { value: '85%', label: 'Online bookings' },
      { value: '4.9', label: 'Review rating' },
    ],
    previewCards: ['Repair', 'Diagnostics', 'Maintenance'],
    testimonial: 'Customers understand our services fast and can request help right away.',
  },
  {
    slug: 'salon-spa',
    title: 'Salon & Spa',
    category: 'Beauty Business',
    client: 'Luxe Beauty Lounge',
    duration: '4 weeks',
    year: '2023',
    accent: 'from-neutral-950 via-pink-950 to-rose-900',
    softAccent: 'bg-rose-50',
    badge: 'Beauty booking + premium brand experience',
    heroTitle: 'A polished beauty experience before they walk in.',
    heroText: 'A modern salon website demo with service menus, staff highlights, gift-card CTA, and booking-focused design.',
    cta: 'Book Appointment',
    services: ['Hair Styling', 'Facials', 'Lash Services'],
    stats: [
      { value: '120%', label: 'Revenue increase' },
      { value: '60%', label: 'Repeat bookings' },
      { value: '$15K', label: 'Gift card sales' },
    ],
    previewCards: ['Hair', 'Skin', 'Lashes'],
    testimonial: 'The design finally matches the experience clients get inside the salon.',
  },
  {
    slug: 'restaurant-website',
    title: 'Restaurant Website',
    category: 'Food & Beverage',
    client: 'Harvest Table Restaurant',
    duration: '3 weeks',
    year: '2023',
    accent: 'from-zinc-950 via-amber-950 to-orange-900',
    softAccent: 'bg-amber-50',
    badge: 'Menu showcase + reservation-focused layout',
    heroTitle: 'A restaurant website that makes people hungry.',
    heroText: 'A warm restaurant website demo with menu highlights, location details, reservation CTA, and private event inquiry sections.',
    cta: 'Reserve a Table',
    services: ['Dinner Menu', 'Private Events', 'Catering'],
    stats: [
      { value: '180%', label: 'More reservations' },
      { value: '40%', label: 'Larger parties' },
      { value: '5x', label: 'Event inquiries' },
    ],
    previewCards: ['Seasonal', 'Events', 'Menu'],
    testimonial: 'The website captures the feeling of the restaurant and drives reservations.',
  },
];

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shine {
          from { transform: translateX(-120%); }
          to { transform: translateX(120%); }
        }
        .demo-fade-up { animation: fadeUp .8s ease both; }
        .demo-float { animation: floatSlow 4s ease-in-out infinite; }
        .demo-shine::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(110deg, transparent 20%, rgba(255,255,255,.22) 45%, transparent 70%);
          animation: shine 3.8s ease-in-out infinite;
        }
      `}</style>

      <div className={`relative overflow-hidden bg-gradient-to-br ${project.accent} text-white`}>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,white,transparent_28%),radial-gradient(circle_at_80%_0%,white,transparent_24%),radial-gradient(circle_at_60%_90%,white,transparent_20%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-light mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center pb-20">
            <div className="demo-fade-up space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/80 backdrop-blur">
                <Sparkles className="w-4 h-4" />
                {project.badge}
              </div>

              <div>
                <p className="text-white/60 text-sm uppercase tracking-[0.28em] mb-4">{project.category}</p>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light leading-[0.95] tracking-tight">
                  {project.heroTitle}
                </h1>
              </div>

              <p className="text-lg sm:text-xl text-white/75 leading-relaxed max-w-xl font-light">
                {project.heroText}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-white text-black hover:bg-white/90 rounded-none px-8 py-6 text-base">
                  <Link href="/contact">
                    Start a Similar Demo <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <a href="#live-demo" className="inline-flex items-center justify-center border border-white/30 px-8 py-3 text-white hover:bg-white/10 transition-colors">
                  View Live Preview
                </a>
              </div>
            </div>

            <div className="demo-fade-up demo-float lg:pl-8" style={{ animationDelay: '.15s' }}>
              <div className="relative demo-shine overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur">
                <div className="rounded-[1.4rem] bg-white text-black overflow-hidden shadow-2xl">
                  <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                    <div className="flex gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-400" />
                      <span className="w-3 h-3 rounded-full bg-yellow-400" />
                      <span className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="text-xs text-gray-500">{project.client.toLowerCase().replaceAll(' ', '')}.com</div>
                    <Menu className="w-4 h-4 text-gray-400" />
                  </div>

                  <div className={`${project.softAccent} p-6 sm:p-8`}>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {project.previewCards.map((card, index) => (
                        <div key={card} className="aspect-[4/5] rounded-2xl bg-white border border-black/5 p-3 flex flex-col justify-end shadow-sm">
                          <div className="h-16 rounded-xl bg-gradient-to-br from-black/80 to-black/30 mb-3" />
                          <p className="text-xs font-medium">{card}</p>
                          <p className="text-[10px] text-gray-500">0{index + 1}</p>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-2xl bg-white p-5 shadow-sm border border-black/5">
                      <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Featured CTA</p>
                      <h2 className="text-2xl font-light mb-4">{project.cta}</h2>
                      <div className="grid sm:grid-cols-3 gap-3">
                        {project.services.map((service) => (
                          <div key={service} className="rounded-xl border border-gray-200 p-3 text-sm">
                            <CheckCircle className="w-4 h-4 mb-2" />
                            {service}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main id="live-demo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <section className="grid lg:grid-cols-3 gap-8 mb-24">
          {project.stats.map((stat, index) => (
            <div key={stat.label} className="demo-fade-up border border-gray-200 p-8 rounded-none bg-white" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="text-5xl font-light mb-3">{stat.value}</div>
              <p className="text-gray-600 font-light">{stat.label}</p>
            </div>
          ))}
        </section>

        <section className="grid lg:grid-cols-2 gap-12 items-start mb-24">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.24em] text-gray-500">Interactive Demo Layout</p>
            <h2 className="text-5xl sm:text-6xl font-light leading-tight">
              Built to feel like a real client website, not a flat sample.
            </h2>
            <p className="text-lg text-gray-700 font-light leading-relaxed">
              This project page now shows a polished website preview with animated hero sections, service blocks, credibility stats, and a clear conversion path. It is designed so prospects can imagine what their own business website could look like.
            </p>
          </div>

          <div className="border border-gray-200 rounded-[2rem] p-6 bg-gray-50">
            <div className="space-y-4">
              {project.services.map((service, index) => (
                <div key={service} className="flex items-center justify-between rounded-2xl bg-white border border-gray-200 p-5">
                  <div>
                    <p className="font-medium">{service}</p>
                    <p className="text-sm text-gray-500">Clean section with CTA and trust copy</p>
                  </div>
                  <span className="text-sm text-gray-400">0{index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-6 mb-24">
          <div className="border border-gray-200 p-6 rounded-none">
            <Calendar className="w-5 h-5 mb-4" />
            <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">Timeline</p>
            <p className="text-2xl font-light">{project.duration}</p>
          </div>
          <div className="border border-gray-200 p-6 rounded-none">
            <Star className="w-5 h-5 mb-4" />
            <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">Client</p>
            <p className="text-2xl font-light">{project.client}</p>
          </div>
          <div className="border border-gray-200 p-6 rounded-none">
            <MapPin className="w-5 h-5 mb-4" />
            <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">Launch Year</p>
            <p className="text-2xl font-light">{project.year}</p>
          </div>
        </section>

        <section className="relative overflow-hidden bg-black text-white p-8 sm:p-12 lg:p-16 rounded-[2rem]">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_80%_20%,white,transparent_24%)]" />
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-white/50 text-sm uppercase tracking-[0.24em] mb-4">Demo Result</p>
              <h2 className="text-4xl sm:text-5xl font-light leading-tight mb-6">
                Ready to turn this into a client-ready website?
              </h2>
              <p className="text-white/70 font-light leading-relaxed">
                “{project.testimonial}”
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
              <Button asChild className="bg-white text-black hover:bg-white/90 rounded-none px-8 py-6">
                <Link href="/contact">Start Your Project</Link>
              </Button>
              <a href="tel:+17140000000" className="inline-flex items-center justify-center border border-white/25 px-8 py-3 hover:bg-white/10 transition-colors">
                <Phone className="w-4 h-4 mr-2" />
                Call / Text
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
