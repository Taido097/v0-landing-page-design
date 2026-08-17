'use client';

import Link from 'next/link';
import { ArrowDownRight, ArrowUpRight, Check, MoveRight } from 'lucide-react';
import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';

const demos = [
  { name: 'Akjo', category: 'Portfolio', href: '/portfolio/akjo-portfolio' },
  { name: 'Dentalo', category: 'Scheduling', href: '/portfolio/dentalo-clinic' },
  { name: 'Qitchen Sushi', category: 'Restaurant', href: '/portfolio/restaurant-website' },
  { name: 'LeapFly', category: 'Custom Website', href: '/portfolio/leapfly-landscaping' },
  { name: 'Éclat Aesthetics', category: 'Scheduling', href: '/portfolio/eclat-aesthetics' },
  { name: 'Luna Frame Studio', category: 'Portfolio', href: '/portfolio/photography-studio' },
];

const services = [
  { number: '(01)', title: 'Portfolio', copy: 'Editorial, photography, creative, and personal portfolio websites that make the work itself feel premium.', href: '/demos?category=Portfolio' },
  { number: '(02)', title: 'Restaurant', copy: 'Modern restaurant and food websites designed around menus, atmosphere, locations, and clear customer actions.', href: '/demos?category=Restaurant' },
  { number: '(03)', title: 'Scheduling', copy: 'Service websites for salons, clinics, dental offices, med spas, and other businesses that depend on appointments.', href: '/demos?category=Scheduling' },
  { number: '(04)', title: 'Custom Website', copy: 'Flexible websites for contractors, landscaping, local services, lead generation, and businesses with unique needs.', href: '/demos?category=Custom%20Website' },
];

const process = [
  { number: '01', title: 'Discover', copy: 'Your business, customer, goals, and the action the website needs to drive.' },
  { number: '02', title: 'Structure', copy: 'Pages and content are organized so visitors immediately understand what you offer.' },
  { number: '03', title: 'Design', copy: 'A custom visual direction built around your brand, content, and industry.' },
  { number: '04', title: 'Build', copy: 'Responsive development, forms, integrations, interactions, and performance.' },
  { number: '05', title: 'Launch', copy: 'Final checks, basic SEO setup, deployment, and post-launch help.' },
];

const plans = [
  { name: 'Starter', price: '$500+', copy: 'For a focused local-business website.', features: ['Up to 5 pages', 'Mobile responsive', 'Contact form', 'Basic SEO setup', 'Launch support'] },
  { name: 'Professional', price: '$1,000+', copy: 'For a stronger, more complete online presence.', features: ['Up to 10 pages', 'Custom homepage', 'Service pages', 'SEO-friendly structure', 'Post-launch support'] },
  { name: 'Custom', price: 'Quote', copy: 'For booking, e-commerce, or advanced features.', features: ['Custom page count', 'Booking / request forms', 'Custom integrations', 'Advanced sections', 'Priority support'] },
];

function useScrollY() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
  return scrollY;
}

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`td-reveal ${visible ? 'td-reveal-on' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function DemoFrame({ href, name, className = '' }: { href: string; name: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-neutral-200 ${className}`}>
      <iframe
        src={href}
        title={`${name} website preview`}
        tabIndex={-1}
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute left-0 top-0 border-0 bg-white"
        style={{ width: '200%', height: '200%', transform: 'scale(.5)', transformOrigin: 'top left' }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
    </div>
  );
}

function PinnedDemoGrid() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const node = sectionRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const travel = Math.max(1, node.offsetHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, -rect.top / travel));
      setProgress(p);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const eased = 0.5 - Math.cos(Math.PI * progress) / 2;
  const centerScale = 0.78 + eased * 0.22;
  const outerShift = 80 - eased * 80;
  const labelOpacity = Math.min(1, Math.max(0, (progress - 0.12) / 0.24));

  const styleFor = (index: number): CSSProperties => {
    const direction = index % 2 === 0 ? -1 : 1;
    const yDirection = index < 3 ? -1 : 1;
    return {
      transform: `translate3d(${direction * outerShift}px, ${yDirection * outerShift * .35}px, 0) scale(${index === 2 ? centerScale : .92 + eased * .08})`,
      opacity: 0.58 + eased * 0.42,
    };
  };

  return (
    <section ref={sectionRef} className="relative h-[360vh] bg-white">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden p-2 sm:p-3">
        <div className="grid h-full w-full grid-cols-12 grid-rows-3 gap-2">
          {demos.slice(0, 6).map((demo, index) => {
            const cols = index < 2 ? 'col-span-6' : index < 5 ? 'col-span-4' : 'col-span-12';
            return (
              <Link
                key={demo.name}
                href={demo.href}
                className={`${cols} group relative overflow-hidden rounded-xl border border-black/10 bg-[#f2efe9] transition-[transform,opacity] duration-150 ease-out`}
                style={styleFor(index)}
              >
                <DemoFrame href={demo.href} name={demo.name} className="h-full w-full" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/75 px-4 py-3 text-white backdrop-blur-md">
                  <span className="text-sm font-medium tracking-[-0.03em]">{demo.name}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </Link>
            );
          })}
        </div>

        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-6 py-4 text-center shadow-[0_20px_80px_rgba(0,0,0,.18)] transition-opacity duration-150"
          style={{ opacity: labelOpacity }}
        >
          <div className="text-[10px] uppercase tracking-[.18em] text-black/40">Selected work</div>
          <div className="mt-1 text-sm font-medium">Explore live demos</div>
        </div>
      </div>
    </section>
  );
}

export function SheltaStyleHomepageMotion() {
  const scrollY = useScrollY();
  const heroDrift = Math.min(180, scrollY * 0.18);
  const heroScale = Math.max(0.9, 1 - scrollY * 0.00008);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f2efe9] text-[#0a0a0a] selection:bg-black selection:text-white">
      <style>{`
        html { scroll-behavior: smooth; }
        .td-grid-lines { background-image: linear-gradient(to right, rgba(10,10,10,.075) 1px, transparent 1px); background-size: 25% 100%; }
        .td-outline { -webkit-text-stroke: 1px rgba(10,10,10,.18); color: transparent; }
        .td-reveal { opacity: 0; transform: translateY(44px); transition: opacity .9s cubic-bezier(.22,1,.36,1), transform .9s cubic-bezier(.22,1,.36,1); }
        .td-reveal-on { opacity: 1; transform: translateY(0); }
        .td-hero-line { display: block; overflow: hidden; }
        .td-hero-line > span { display: block; transform: translateY(108%); animation: tdHeroLine .95s cubic-bezier(.22,1,.36,1) forwards; }
        .td-hero-line:nth-child(2) > span { animation-delay: .11s; }
        .td-hero-copy { opacity: 0; transform: translateY(24px); animation: tdHeroCopy .9s .45s cubic-bezier(.22,1,.36,1) forwards; }
        .td-nav-enter { opacity: 0; transform: translate(-50%, -18px); animation: tdNavEnter .8s .2s cubic-bezier(.22,1,.36,1) forwards; }
        .td-marquee { animation: tdMarquee 24s linear infinite; }
        .td-marquee-reverse { animation: tdMarqueeReverse 28s linear infinite; }
        .td-service-arrow { transition: transform .45s cubic-bezier(.22,1,.36,1); }
        .td-service-row:hover .td-service-arrow { transform: translate(8px,-8px); }
        .td-service-row .td-service-title { transition: transform .45s cubic-bezier(.22,1,.36,1); }
        .td-service-row:hover .td-service-title { transform: translateX(16px); }
        .td-price-card { transition: transform .55s cubic-bezier(.22,1,.36,1), border-color .55s cubic-bezier(.22,1,.36,1); }
        .td-price-card:hover { transform: translateY(-10px); border-color: rgba(0,0,0,.35); }
        @keyframes tdHeroLine { to { transform: translateY(0); } }
        @keyframes tdHeroCopy { to { opacity: 1; transform: translateY(0); } }
        @keyframes tdNavEnter { to { opacity: 1; transform: translate(-50%, 0); } }
        @keyframes tdMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes tdMarqueeReverse { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; transition-duration: .01ms !important; }
        }
      `}</style>

      <header className="td-nav-enter fixed left-1/2 top-5 z-50 w-[calc(100%-24px)] max-w-[1260px]">
        <div className="flex items-center justify-between rounded-full border border-black/10 bg-[#f2efe9]/88 px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,.08)] backdrop-blur-xl sm:px-5">
          <Link href="#top" className="text-sm font-semibold tracking-[-0.03em]">DesignedbyTD Studio</Link>
          <nav className="hidden items-center gap-7 text-[12px] text-black/60 md:flex">
            <Link href="#work" className="hover:text-black">Work</Link>
            <Link href="#services" className="hover:text-black">Services</Link>
            <Link href="#process" className="hover:text-black">Process</Link>
            <Link href="#pricing" className="hover:text-black">Pricing</Link>
          </nav>
          <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-black px-4 py-2.5 text-xs font-medium text-white">
            Start a project <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </header>

      <main id="top">
        <section className="td-grid-lines relative min-h-[1020px] overflow-hidden px-4 pb-24 pt-40 sm:px-6 lg:px-8 lg:pt-44">
          <div className="mx-auto max-w-[1280px]">
            <div className="mb-12 flex items-center justify-between border-t border-black/15 pt-4 text-[10px] uppercase tracking-[.16em] text-black/45 sm:text-[11px]">
              <span>Orange County · California</span>
              <span>Independent web design studio</span>
            </div>

            <div className="relative z-10">
              <h1 className="max-w-[1160px] text-[clamp(4.2rem,9.5vw,9rem)] font-medium leading-[.84] tracking-[-0.07em]">
                <span className="td-hero-line"><span>Websites built to</span></span>
                <span className="td-hero-line"><span>make every visit count.</span></span>
              </h1>

              <div className="td-hero-copy mt-10 grid gap-8 md:grid-cols-12 md:items-end lg:mt-14">
                <p className="max-w-[520px] text-[clamp(1.05rem,1.7vw,1.45rem)] font-light leading-[1.35] tracking-[-0.03em] text-black/65 md:col-span-6">
                  Custom, mobile-friendly websites for local businesses that want to look professional, explain their value clearly, and make it easy for customers to take action.
                </p>
                <div className="md:col-span-3 md:col-start-10">
                  <div className="rounded-xl border border-black/10 bg-white/65 p-5 backdrop-blur">
                    <div className="text-[10px] uppercase tracking-[.16em] text-black/40">Starting from</div>
                    <div className="mt-7 text-5xl font-medium tracking-[-0.06em]">$500+</div>
                    <Link href="#pricing" className="mt-5 inline-flex items-center gap-2 text-xs font-medium">View pricing <MoveRight className="h-4 w-4" /></Link>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="relative mt-20 overflow-hidden rounded-[14px] border border-black/10 bg-black p-2 shadow-[0_40px_100px_rgba(0,0,0,.18)] will-change-transform lg:mt-24 lg:p-3"
              style={{ transform: `translate3d(0, ${heroDrift * .2}px, 0) scale(${heroScale})` }}
            >
              <div className="absolute left-5 top-5 z-10 rounded-full bg-black/75 px-3 py-2 text-[10px] uppercase tracking-[.15em] text-white/70 backdrop-blur-md">Live website preview</div>
              <DemoFrame href="/portfolio/akjo-portfolio" name="Akjo" className="aspect-[16/9] rounded-[10px]" />
            </div>

            <div
              className="pointer-events-none absolute left-1/2 top-[500px] -z-0 whitespace-nowrap text-[clamp(10rem,28vw,26rem)] font-semibold leading-none tracking-[-0.09em] td-outline will-change-transform"
              style={{ transform: `translate3d(-50%, ${-heroDrift}px, 0)` }}
            >
              DTD
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-16 border-t border-black/10 pt-8 lg:grid-cols-12">
              <Reveal className="lg:col-span-4"><div className="text-[11px] uppercase tracking-[.18em] text-black/40">About the studio</div></Reveal>
              <div className="lg:col-span-8">
                <Reveal>
                  <h2 className="max-w-[920px] text-[clamp(2.8rem,5.6vw,5.6rem)] font-medium leading-[.95] tracking-[-0.055em]">A focused website process for businesses that need more than just something online.</h2>
                </Reveal>
                <div className="mt-12 grid gap-10 sm:grid-cols-2">
                  <Reveal delay={100}><p className="text-base font-light leading-[1.55] tracking-[-0.02em] text-black/60">DesignedbyTD Studio creates modern websites for small and local businesses. The goal is simple: make the business look credible, make the offer easy to understand, and make the next step obvious.</p></Reveal>
                  <Reveal delay={180}><p className="text-base font-light leading-[1.55] tracking-[-0.02em] text-black/60">From portfolios and restaurants to appointment-based businesses and custom service websites, each project is shaped around the business instead of forcing every client into the same layout.</p></Reveal>
                </div>
              </div>
            </div>

            <div className="mt-20 grid border-y border-black/10 sm:grid-cols-3">
              {[['14+', 'Interactive demos'], ['4', 'Service categories'], ['OC', 'Orange County focus']].map(([value, label], index) => (
                <Reveal key={label} delay={index * 100} className={index > 0 ? 'border-t border-black/10 sm:border-l sm:border-t-0' : ''}>
                  <div className="py-8 sm:px-7"><div className="text-[clamp(3rem,6vw,5.2rem)] font-medium leading-none tracking-[-0.065em]">{value}</div><div className="mt-3 text-xs text-black/45">{label}</div></div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden border-y border-black/10 bg-[#f2efe9] py-6">
          <div className="td-marquee flex w-max items-center whitespace-nowrap text-[11px] uppercase tracking-[.18em] text-black/45">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex items-center gap-14 pr-14">
                {['PORTFOLIO', 'RESTAURANT', 'SCHEDULING', 'CUSTOM WEBSITE', 'MOBILE FRIENDLY', 'ORANGE COUNTY', 'SEO READY'].map((item) => <span key={`${copy}-${item}`}>{item}</span>)}
              </div>
            ))}
          </div>
        </section>

        <section id="work" className="bg-[#f2efe9] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-[1280px]">
            <div className="flex flex-col gap-8 border-t border-black/10 pt-7 md:flex-row md:items-end md:justify-between">
              <Reveal><div><div className="text-[11px] uppercase tracking-[.18em] text-black/40">Selected work</div><h2 className="mt-5 text-[clamp(3.3rem,7vw,7rem)] font-medium leading-[.88] tracking-[-0.065em]">Scroll through<br />real websites.</h2></div></Reveal>
              <Reveal delay={160}><Link href="/demos" className="inline-flex w-fit items-center gap-3 rounded-full border border-black/15 bg-white/40 px-5 py-3 text-sm transition-colors hover:bg-black hover:text-white">Explore all demos <ArrowUpRight className="h-4 w-4" /></Link></Reveal>
            </div>
          </div>
        </section>

        <PinnedDemoGrid />

        <section id="process" className="relative bg-[#0a0a0a] px-4 py-28 text-white sm:px-6 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-16 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-28">
                  <Reveal><div className="text-[11px] uppercase tracking-[.18em] text-white/35">How we work</div><h2 className="mt-6 text-[clamp(3.8rem,7.5vw,7.4rem)] font-medium leading-[.86] tracking-[-0.07em]">From idea<br />to launch.</h2><p className="mt-8 max-w-[440px] text-base font-light leading-[1.55] text-white/50">A clear process keeps the project moving without turning your website into a months-long headache.</p></Reveal>
                </div>
              </div>

              <div className="lg:col-span-7">
                {process.map((step, index) => (
                  <Reveal key={step.number} delay={index * 70}>
                    <div className="group grid gap-5 border-t border-white/15 py-9 sm:grid-cols-[74px_1fr_auto] sm:items-start lg:py-12">
                      <div className="text-xs text-white/35">{step.number}</div>
                      <div><h3 className="text-[clamp(2.2rem,4vw,4.6rem)] font-medium leading-none tracking-[-0.055em]">{step.title}</h3><p className="mt-4 max-w-[520px] text-sm font-light leading-[1.6] text-white/45">{step.copy}</p></div>
                      <ArrowDownRight className="h-6 w-6 text-white/25 transition-transform duration-500 group-hover:rotate-[-45deg] group-hover:text-white" />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="bg-[#f2efe9] px-4 py-24 sm:px-6 lg:px-8 lg:py-36">
          <div className="mx-auto max-w-[1280px]">
            <Reveal><div className="border-t border-black/10 pt-7"><div className="text-[11px] uppercase tracking-[.18em] text-black/40">What we build</div><h2 className="mt-5 max-w-[930px] text-[clamp(3.7rem,8vw,8rem)] font-medium leading-[.86] tracking-[-0.07em]">Services built around how your business works.</h2></div></Reveal>

            <div className="mt-16 border-b border-black/10">
              {services.map((service, index) => (
                <Reveal key={service.title} delay={index * 80}>
                  <Link href={service.href} className="td-service-row group grid gap-5 border-t border-black/10 py-8 sm:grid-cols-[80px_1fr_1fr_auto] sm:items-start lg:py-12">
                    <span className="text-xs text-black/35">{service.number}</span>
                    <h3 className="td-service-title text-[clamp(2rem,4.5vw,4.8rem)] font-medium leading-none tracking-[-0.06em]">{service.title}</h3>
                    <p className="max-w-[430px] text-sm font-light leading-[1.6] text-black/50">{service.copy}</p>
                    <ArrowUpRight className="td-service-arrow h-6 w-6 text-black/30 group-hover:text-black" />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-white py-12">
          <div className="td-marquee-reverse flex w-max whitespace-nowrap text-[clamp(5rem,14vw,13rem)] font-medium leading-none tracking-[-0.075em] text-black">
            <span className="pr-14">DESIGN · BUILD · LAUNCH · DESIGN · BUILD · LAUNCH · </span>
            <span className="pr-14">DESIGN · BUILD · LAUNCH · DESIGN · BUILD · LAUNCH · </span>
          </div>
        </section>

        <section id="pricing" className="bg-white px-4 py-24 sm:px-6 lg:px-8 lg:py-36">
          <div className="mx-auto max-w-[1280px]">
            <Reveal><div className="flex flex-col gap-8 border-t border-black/10 pt-7 md:flex-row md:items-end md:justify-between"><div><div className="text-[11px] uppercase tracking-[.18em] text-black/40">Pricing</div><h2 className="mt-5 text-[clamp(3.5rem,7vw,7rem)] font-medium leading-[.88] tracking-[-0.065em]">A clear place<br />to start.</h2></div><p className="max-w-[420px] text-sm font-light leading-[1.6] text-black/50">Final pricing depends on page count, content, features, integrations, and project scope.</p></div></Reveal>

            <div className="mt-16 grid gap-3 md:grid-cols-3">
              {plans.map((plan, index) => (
                <Reveal key={plan.name} delay={index * 120}>
                  <article className={`td-price-card flex min-h-[540px] flex-col rounded-xl border p-7 ${index === 0 ? 'border-black bg-black text-white' : 'border-black/10 bg-[#f2efe9]'}`}>
                    <div className={`text-[10px] uppercase tracking-[.17em] ${index === 0 ? 'text-white/40' : 'text-black/35'}`}>{index === 0 ? 'Most chosen' : index === 1 ? 'Growing business' : 'Advanced project'}</div>
                    <h3 className="mt-8 text-4xl font-medium tracking-[-0.05em]">{plan.name}</h3>
                    <p className={`mt-3 max-w-[30ch] text-sm font-light leading-[1.6] ${index === 0 ? 'text-white/50' : 'text-black/50'}`}>{plan.copy}</p>
                    <div className="mt-10 text-[clamp(3rem,5vw,5rem)] font-medium leading-none tracking-[-0.065em]">{plan.price}</div>
                    <div className="my-9 flex flex-grow flex-col gap-3">
                      {plan.features.map((feature) => <div key={feature} className="flex items-center gap-3 text-sm"><Check className="h-4 w-4" /><span className={index === 0 ? 'text-white/70' : 'text-black/65'}>{feature}</span></div>)}
                    </div>
                    <Link href="/contact" className={`group inline-flex items-center justify-between rounded-full px-5 py-3.5 text-sm font-medium ${index === 0 ? 'bg-white text-black' : 'bg-black text-white'}`}><span>Start a project</span><ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0a0a0a] px-4 py-24 text-white sm:px-6 lg:px-8 lg:py-36">
          <div className="mx-auto max-w-[1280px]">
            <Reveal><div className="border-t border-white/15 pt-8"><div className="text-[11px] uppercase tracking-[.18em] text-white/35">Ready when you are</div><h2 className="mt-7 max-w-[1120px] text-[clamp(4rem,10vw,10rem)] font-medium leading-[.82] tracking-[-0.075em]">Have a website in mind?</h2></div></Reveal>
            <Reveal delay={120}><div className="mt-14 flex flex-col gap-8 border-b border-white/15 pb-12 md:flex-row md:items-end md:justify-between"><p className="max-w-[520px] text-base font-light leading-[1.55] text-white/45">Tell me what your business needs. We can start with the structure, design direction, features, and a clear quote.</p><Link href="/contact" className="group inline-flex w-fit items-center gap-4 rounded-full bg-white px-6 py-4 text-sm font-medium text-black">Start your project <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" /></Link></div></Reveal>
            <div className="mt-10 flex flex-col justify-between gap-4 text-xs text-white/35 sm:flex-row"><span>DesignedbyTD Studio · Orange County, CA</span><span>designedbytd.studio@gmail.com</span></div>
          </div>
        </section>
      </main>
    </div>
  );
}
