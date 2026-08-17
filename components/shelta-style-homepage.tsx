import Link from 'next/link';
import { ArrowUpRight, Check, MoveRight } from 'lucide-react';

const demos = [
  {
    name: 'Akjo',
    category: 'Portfolio',
    href: '/portfolio/akjo-portfolio',
  },
  {
    name: 'Dentalo',
    category: 'Scheduling',
    href: '/portfolio/dentalo-clinic',
  },
  {
    name: 'Qitchen Sushi',
    category: 'Restaurant',
    href: '/portfolio/restaurant-website',
  },
  {
    name: 'LeapFly',
    category: 'Custom Website',
    href: '/portfolio/leapfly-landscaping',
  },
  {
    name: 'Éclat Aesthetics',
    category: 'Scheduling',
    href: '/portfolio/eclat-aesthetics',
  },
  {
    name: 'Luna Frame Studio',
    category: 'Portfolio',
    href: '/portfolio/photography-studio',
  },
];

const process = [
  {
    number: '01',
    title: 'Discover',
    copy: 'We start with your business, audience, goals, and the action you want visitors to take.',
    items: ['Business goals', 'Audience', 'Pages & features', 'Visual direction'],
  },
  {
    number: '02',
    title: 'Structure',
    copy: 'We organize the site so people understand what you offer quickly and know where to go next.',
    items: ['Page hierarchy', 'Conversion path', 'Content structure', 'Mobile flow'],
  },
  {
    number: '03',
    title: 'Design',
    copy: 'Your site gets a custom visual direction built around your brand instead of a generic template look.',
    items: ['Custom layout', 'Typography', 'Motion', 'Responsive design'],
  },
  {
    number: '04',
    title: 'Build',
    copy: 'The approved design becomes a polished website with interactions, forms, and the features your business needs.',
    items: ['Responsive build', 'Forms', 'Integrations', 'Performance'],
  },
  {
    number: '05',
    title: 'Launch',
    copy: 'We review the final experience, connect the essentials, and get the website ready for real customers.',
    items: ['Final review', 'Basic SEO', 'Launch support', 'Post-launch help'],
  },
];

const services = [
  {
    number: '(01)',
    title: 'Portfolio',
    copy: 'Editorial, photography, creative, and personal portfolio websites that make the work itself feel premium.',
    href: '/demos?category=Portfolio',
  },
  {
    number: '(02)',
    title: 'Restaurant',
    copy: 'Modern restaurant and food websites designed around menus, atmosphere, locations, and clear customer actions.',
    href: '/demos?category=Restaurant',
  },
  {
    number: '(03)',
    title: 'Scheduling',
    copy: 'Service websites for salons, clinics, dental offices, med spas, and other businesses that depend on appointments.',
    href: '/demos?category=Scheduling',
  },
  {
    number: '(04)',
    title: 'Custom Website',
    copy: 'Flexible websites for contractors, landscaping, local services, lead generation, and businesses with unique needs.',
    href: '/demos?category=Custom%20Website',
  },
];

const plans = [
  {
    name: 'Starter',
    price: '$500+',
    copy: 'A focused website for a small local business that needs a professional presence.',
    features: ['Up to 5 pages', 'Mobile responsive', 'Contact form', 'Basic SEO setup', 'Launch support'],
  },
  {
    name: 'Professional',
    price: '$1,000+',
    copy: 'For businesses that need more pages, stronger presentation, and a more complete customer journey.',
    features: ['Up to 10 pages', 'Custom homepage', 'Service pages', 'SEO-friendly structure', 'Post-launch support'],
  },
  {
    name: 'Custom',
    price: 'Quote',
    copy: 'For booking, e-commerce, custom integrations, or websites that need something more advanced.',
    features: ['Custom page count', 'Booking or request forms', 'Custom integrations', 'Advanced sections', 'Priority support'],
  },
];

function DemoFrame({ href, name }: { href: string; name: string }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] bg-neutral-200">
      <iframe
        src={href}
        title={`${name} website preview`}
        tabIndex={-1}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 border-0 bg-white"
        style={{
          width: '200%',
          height: '200%',
          transform: 'scale(.5)',
          transformOrigin: 'top left',
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
    </div>
  );
}

export function SheltaStyleHomepage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f2efe9] text-[#0a0a0a] selection:bg-black selection:text-white">
      <style>{`
        html { scroll-behavior: smooth; }
        .td-grid-lines {
          background-image: linear-gradient(to right, rgba(10,10,10,.075) 1px, transparent 1px);
          background-size: 25% 100%;
        }
        .td-outline {
          -webkit-text-stroke: 1px rgba(10,10,10,.18);
          color: transparent;
        }
        .td-card-lift { transition: transform .45s cubic-bezier(.22,1,.36,1), box-shadow .45s cubic-bezier(.22,1,.36,1); }
        .td-card-lift:hover { transform: translateY(-6px); box-shadow: 0 28px 70px rgba(0,0,0,.12); }
        .td-marquee { animation: tdMarquee 24s linear infinite; }
        @keyframes tdMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>

      <header className="fixed inset-x-0 top-4 z-50 px-3 sm:top-5 sm:px-6">
        <div className="mx-auto flex max-w-[1260px] items-center justify-between rounded-full border border-black/10 bg-[#f2efe9]/90 px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,.08)] backdrop-blur-xl sm:px-5">
          <Link href="#top" className="text-sm font-semibold tracking-[-0.03em]">
            DesignedbyTD Studio
          </Link>
          <nav className="hidden items-center gap-7 text-[12px] text-black/65 md:flex">
            <Link href="#work" className="transition-colors hover:text-black">Work</Link>
            <Link href="#services" className="transition-colors hover:text-black">Services</Link>
            <Link href="#process" className="transition-colors hover:text-black">Process</Link>
            <Link href="#pricing" className="transition-colors hover:text-black">Pricing</Link>
          </nav>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2.5 text-xs font-medium text-white transition-transform hover:scale-[1.02]"
          >
            Start a project <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </header>

      <main id="top">
        <section className="td-grid-lines relative min-h-[920px] overflow-hidden px-4 pb-20 pt-40 sm:px-6 lg:px-8 lg:pt-44">
          <div className="mx-auto max-w-[1280px]">
            <div className="mb-12 flex items-center justify-between border-t border-black/15 pt-4 text-[10px] uppercase tracking-[.16em] text-black/45 sm:text-[11px]">
              <span>Orange County · California</span>
              <span>Independent web design studio</span>
            </div>

            <div className="relative z-10">
              <h1 className="max-w-[1100px] text-[clamp(4.2rem,9.5vw,9rem)] font-medium leading-[.84] tracking-[-0.07em]">
                Websites built to make every visit count.
              </h1>

              <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end lg:mt-14">
                <p className="max-w-[500px] text-[clamp(1.05rem,1.7vw,1.45rem)] font-light leading-[1.35] tracking-[-0.03em] text-black/65 md:col-span-6">
                  Custom, mobile-friendly websites for local businesses that want to look professional, explain their value clearly, and make it easy for customers to take action.
                </p>

                <div className="md:col-span-3 md:col-start-10">
                  <div className="rounded-xl border border-black/10 bg-white/65 p-5 backdrop-blur">
                    <div className="text-[10px] uppercase tracking-[.16em] text-black/40">Starting from</div>
                    <div className="mt-7 text-5xl font-medium tracking-[-0.06em]">$500+</div>
                    <Link href="#pricing" className="mt-5 inline-flex items-center gap-2 text-xs font-medium">
                      View pricing <MoveRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-20 overflow-hidden rounded-[14px] border border-black/10 bg-black p-2 shadow-[0_40px_100px_rgba(0,0,0,.18)] lg:mt-24 lg:p-3">
              <div className="absolute left-5 top-5 z-10 rounded-full bg-black/75 px-3 py-2 text-[10px] uppercase tracking-[.15em] text-white/70 backdrop-blur-md">
                Live website preview
              </div>
              <DemoFrame href="/portfolio/akjo-portfolio" name="Akjo" />
            </div>

            <div className="pointer-events-none absolute left-1/2 top-[480px] -z-0 -translate-x-1/2 whitespace-nowrap text-[clamp(10rem,28vw,26rem)] font-semibold leading-none tracking-[-0.09em] td-outline">
              DTD
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-16 border-t border-black/10 pt-8 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <div className="text-[11px] uppercase tracking-[.18em] text-black/40">About the studio</div>
              </div>
              <div className="lg:col-span-8">
                <h2 className="max-w-[900px] text-[clamp(2.8rem,5.6vw,5.6rem)] font-medium leading-[.95] tracking-[-0.055em]">
                  A focused website process for businesses that need more than just something online.
                </h2>
                <div className="mt-12 grid gap-10 sm:grid-cols-2">
                  <p className="text-base font-light leading-[1.55] tracking-[-0.02em] text-black/60">
                    DesignedbyTD Studio creates modern websites for small and local businesses. The goal is simple: make the business look credible, make the offer easy to understand, and make the next step obvious.
                  </p>
                  <p className="text-base font-light leading-[1.55] tracking-[-0.02em] text-black/60">
                    From portfolios and restaurants to appointment-based businesses and custom service websites, each project is shaped around the business instead of forcing every client into the same layout.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-20 grid border-y border-black/10 sm:grid-cols-3">
              {[
                ['14+', 'Interactive demos'],
                ['4', 'Service categories'],
                ['OC', 'Local Orange County focus'],
              ].map(([value, label], index) => (
                <div key={label} className={`py-8 sm:px-7 ${index > 0 ? 'border-t border-black/10 sm:border-l sm:border-t-0' : ''}`}>
                  <div className="text-[clamp(3rem,6vw,5.2rem)] font-medium leading-none tracking-[-0.065em]">{value}</div>
                  <div className="mt-3 text-xs text-black/45">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="bg-[#f2efe9] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-[1280px]">
            <div className="flex flex-col gap-8 border-t border-black/10 pt-7 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[.18em] text-black/40">Selected work</div>
                <h2 className="mt-5 text-[clamp(3.3rem,7vw,7rem)] font-medium leading-[.88] tracking-[-0.065em]">Real demos.<br />Different industries.</h2>
              </div>
              <Link href="/demos" className="inline-flex w-fit items-center gap-3 rounded-full border border-black/15 bg-white/40 px-5 py-3 text-sm transition-colors hover:bg-black hover:text-white">
                Explore all demos <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-16 grid gap-x-4 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
              {demos.map((demo) => (
                <Link key={demo.name} href={demo.href} className="group td-card-lift rounded-[12px] bg-white p-2.5">
                  <DemoFrame href={demo.href} name={demo.name} />
                  <div className="flex items-end justify-between gap-4 px-2 pb-2 pt-4">
                    <div>
                      <div className="text-lg font-medium tracking-[-0.04em]">{demo.name}</div>
                      <div className="mt-1 text-[11px] uppercase tracking-[.14em] text-black/35">{demo.category}</div>
                    </div>
                    <ArrowUpRight className="mb-1 h-5 w-5 text-black/35 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-black" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="relative bg-[#0a0a0a] px-4 py-24 text-white sm:px-6 lg:px-8 lg:py-36">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-14 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-28">
                  <div className="text-[11px] uppercase tracking-[.18em] text-white/35">How we work</div>
                  <h2 className="mt-6 text-[clamp(3.8rem,7.5vw,7.4rem)] font-medium leading-[.86] tracking-[-0.07em]">From idea<br />to launch.</h2>
                  <p className="mt-8 max-w-[440px] text-base font-light leading-[1.5] text-white/50">
                    A clear process keeps the website focused and makes every design decision connect back to the business goal.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7">
                {process.map((step) => (
                  <article key={step.number} className="border-t border-white/15 py-8 sm:py-10">
                    <div className="grid gap-7 sm:grid-cols-[70px_1fr]">
                      <div className="text-xs text-white/30">{step.number}</div>
                      <div>
                        <h3 className="text-[clamp(2.2rem,4vw,4rem)] font-medium leading-none tracking-[-0.055em]">{step.title}</h3>
                        <p className="mt-5 max-w-[600px] text-sm font-light leading-[1.6] text-white/50 sm:text-base">{step.copy}</p>
                        <div className="mt-7 grid gap-2 sm:grid-cols-2">
                          {step.items.map((item) => (
                            <div key={item} className="flex items-center gap-2 border-t border-white/10 pt-3 text-xs text-white/45">
                              <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="bg-white px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-12 border-t border-black/10 pt-8 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <div className="text-[11px] uppercase tracking-[.18em] text-black/40">Our services</div>
              </div>
              <div className="lg:col-span-8">
                <h2 className="max-w-[900px] text-[clamp(3rem,6vw,6.2rem)] font-medium leading-[.9] tracking-[-0.06em]">
                  Different businesses need different websites.
                </h2>
              </div>
            </div>

            <div className="mt-20 border-t border-black/10">
              {services.map((service) => (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group grid gap-5 border-b border-black/10 py-7 transition-colors hover:bg-[#f2efe9] sm:grid-cols-[90px_1fr_1fr_40px] sm:items-start sm:px-4"
                >
                  <div className="text-xs text-black/35">{service.number}</div>
                  <h3 className="text-[clamp(2rem,4vw,4.2rem)] font-medium leading-none tracking-[-0.055em]">{service.title}</h3>
                  <p className="max-w-[430px] text-sm font-light leading-[1.55] text-black/50">{service.copy}</p>
                  <ArrowUpRight className="h-5 w-5 text-black/25 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-black" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-[#f2efe9] py-8">
          <div className="flex w-max td-marquee">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center gap-12 pr-12 text-[clamp(3.4rem,8vw,8rem)] font-medium leading-none tracking-[-0.065em] text-black/90">
                <span>Custom design</span><span className="text-black/20">✦</span>
                <span>Responsive</span><span className="text-black/20">✦</span>
                <span>Built to convert</span><span className="text-black/20">✦</span>
                <span>Local business</span><span className="text-black/20">✦</span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#f2efe9] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-14 border-t border-black/10 pt-8 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="text-[11px] uppercase tracking-[.18em] text-black/40">Why it matters</div>
                <h2 className="mt-6 text-[clamp(3.2rem,6vw,6rem)] font-medium leading-[.9] tracking-[-0.06em]">A website should do more than look good.</h2>
              </div>
              <div className="lg:col-span-7">
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ['01', 'Make a strong first impression', 'Your website is often the first place a potential customer decides whether your business feels credible.'],
                    ['02', 'Explain the offer clearly', 'Visitors should understand what you do, who it is for, and why they should care without having to search for it.'],
                    ['03', 'Work on every screen', 'The experience needs to feel intentional on phones, tablets, and desktop—not like a desktop site squeezed smaller.'],
                    ['04', 'Guide the next action', 'Calls, bookings, quote requests, menus, portfolios, and contact forms should be easy to find and easy to use.'],
                  ].map(([number, title, copy]) => (
                    <article key={number} className="min-h-[310px] rounded-xl border border-black/10 bg-white p-6 sm:p-7">
                      <div className="text-[11px] text-black/30">{number}</div>
                      <h3 className="mt-16 text-2xl font-medium leading-[1.05] tracking-[-0.045em]">{title}</h3>
                      <p className="mt-4 text-sm font-light leading-[1.55] text-black/50">{copy}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-white px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-[1280px]">
            <div className="flex flex-col gap-8 border-t border-black/10 pt-8 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[.18em] text-black/40">Pricing</div>
                <h2 className="mt-6 text-[clamp(3.5rem,7vw,7rem)] font-medium leading-[.88] tracking-[-0.065em]">Simple starting points.</h2>
              </div>
              <p className="max-w-[430px] text-sm font-light leading-[1.6] text-black/50">
                Every website is adjusted based on what the business actually needs, but these packages give you a clear place to start.
              </p>
            </div>

            <div className="mt-16 grid gap-3 lg:grid-cols-3">
              {plans.map((plan, index) => (
                <article key={plan.name} className={`flex min-h-[520px] flex-col rounded-xl border p-7 ${index === 0 ? 'border-black bg-black text-white' : 'border-black/10 bg-[#f5f5f3]'}`}>
                  <div className={`text-[10px] uppercase tracking-[.15em] ${index === 0 ? 'text-white/40' : 'text-black/35'}`}>{index === 0 ? 'Most chosen' : index === 1 ? 'Growing businesses' : 'Advanced projects'}</div>
                  <h3 className="mt-8 text-3xl font-medium tracking-[-0.05em]">{plan.name}</h3>
                  <p className={`mt-3 text-sm font-light leading-[1.55] ${index === 0 ? 'text-white/55' : 'text-black/50'}`}>{plan.copy}</p>
                  <div className="mt-12 text-[clamp(3.2rem,5vw,5rem)] font-medium leading-none tracking-[-0.07em]">{plan.price}</div>
                  <div className="mt-8 flex flex-1 flex-col gap-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3 text-sm">
                        <Check className="h-4 w-4 shrink-0" />
                        <span className={index === 0 ? 'text-white/70' : 'text-black/60'}>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/contact" className={`mt-10 flex items-center justify-between rounded-full px-5 py-3.5 text-sm font-medium ${index === 0 ? 'bg-white text-black' : 'bg-black text-white'}`}>
                    Start your project <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0a0a0a] px-4 pb-8 pt-28 text-white sm:px-6 lg:px-8 lg:pt-36">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-14 border-t border-white/15 pt-8 lg:grid-cols-12">
              <div className="lg:col-span-9">
                <div className="text-[11px] uppercase tracking-[.18em] text-white/35">Have a project in mind?</div>
                <h2 className="mt-6 max-w-[1000px] text-[clamp(4rem,9vw,9rem)] font-medium leading-[.84] tracking-[-0.075em]">
                  Make the next version of your website count.
                </h2>
              </div>
              <div className="flex items-end lg:col-span-3">
                <Link href="/contact" className="group flex w-full items-center justify-between rounded-full bg-white px-5 py-4 text-sm font-medium text-black">
                  Start your project
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            <div className="mt-28 grid gap-10 border-t border-white/15 py-10 text-sm text-white/45 sm:grid-cols-3">
              <div>
                <div className="font-medium text-white">DesignedbyTD Studio</div>
                <p className="mt-3 max-w-[300px] text-xs leading-relaxed">Custom websites for small and local businesses in Orange County and beyond.</p>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[.15em] text-white/25">Explore</div>
                <div className="mt-4 flex flex-col gap-2 text-xs">
                  <Link href="/demos" className="hover:text-white">Demos</Link>
                  <Link href="#services" className="hover:text-white">Services</Link>
                  <Link href="#pricing" className="hover:text-white">Pricing</Link>
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[.15em] text-white/25">Contact</div>
                <a href="mailto:designedbytd.studio@gmail.com" className="mt-4 block text-xs hover:text-white">designedbytd.studio@gmail.com</a>
                <div className="mt-2 text-xs">Orange County, California</div>
              </div>
            </div>

            <div className="overflow-hidden border-t border-white/10 pt-3 text-center text-[clamp(4rem,13vw,13rem)] font-semibold leading-[.82] tracking-[-0.085em] text-white/95">
              DesignedbyTD
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
