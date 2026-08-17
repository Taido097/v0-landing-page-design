'use client';

import Link from 'next/link';
import { ArrowDownRight, ArrowUpRight, Check, MoveRight, Plus } from 'lucide-react';
import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';

const demos = [
  { name: 'Akjo', category: 'Portfolio', href: '/portfolio/akjo-portfolio' },
  { name: 'Dentalo', category: 'Scheduling', href: '/portfolio/dentalo-clinic' },
  { name: 'Qitchen Sushi', category: 'Restaurant', href: '/portfolio/restaurant-website' },
  { name: 'LeapFly', category: 'Custom Website', href: '/portfolio/leapfly-landscaping' },
  { name: 'Éclat Aesthetics', category: 'Scheduling', href: '/portfolio/eclat-aesthetics' },
  { name: 'Luna Frame Studio', category: 'Portfolio', href: '/portfolio/photography-studio' },
  { name: 'Refit', category: 'Custom Website', href: '/portfolio/refit-construction' },
];

const process = [
  {
    number: '01',
    title: 'Discover',
    copy: 'We start with your business, customers, goals, and the action your website needs to drive.',
    items: ['Business goals', 'Audience', 'Pages & features', 'Visual direction'],
  },
  {
    number: '02',
    title: 'Structure',
    copy: 'We organize the website so visitors understand what you offer quickly and know what to do next.',
    items: ['Page hierarchy', 'Content flow', 'Conversion path', 'Mobile structure'],
  },
  {
    number: '03',
    title: 'Design',
    copy: 'The site gets a custom visual direction built around your brand instead of a generic template look.',
    items: ['Custom layout', 'Typography', 'Motion', 'Responsive design'],
  },
  {
    number: '04',
    title: 'Build',
    copy: 'The approved direction becomes a responsive website with the forms, interactions, and features you need.',
    items: ['Responsive build', 'Forms', 'Integrations', 'Performance'],
  },
  {
    number: '05',
    title: 'Launch',
    copy: 'We review the final experience, connect the essentials, and prepare the site for real customers.',
    items: ['Final review', 'Basic SEO', 'Launch support', 'Post-launch help'],
  },
];

const services = [
  {
    number: '(01)',
    title: 'Portfolio',
    copy: 'Editorial, photography, creative, and personal portfolio websites designed to make the work itself feel premium.',
    href: '/demos?category=Portfolio',
  },
  {
    number: '(02)',
    title: 'Restaurant',
    copy: 'Modern restaurant and food websites built around menus, atmosphere, location, and clear customer actions.',
    href: '/demos?category=Restaurant',
  },
  {
    number: '(03)',
    title: 'Scheduling',
    copy: 'Service websites for salons, clinics, dental offices, med spas, and businesses that depend on appointments.',
    href: '/demos?category=Scheduling',
  },
  {
    number: '(04)',
    title: 'Custom Website',
    copy: 'Flexible websites for contractors, landscaping, local services, lead generation, and businesses with unique needs.',
    href: '/demos?category=Custom%20Website',
  },
];

const benefits = [
  ['Custom design', 'A visual direction shaped around your business instead of forcing every client into the same layout.'],
  ['Mobile first', 'Every page is planned to feel clear and easy to use on the phone your customers actually carry.'],
  ['Clear conversion path', 'Calls, quote requests, appointments, menus, and contact actions are placed where they make sense.'],
  ['Local business focus', 'Built for small businesses that need a professional online presence without agency-size complexity.'],
];

const faqs = [
  ['How much does a website cost?', 'Starter projects begin at $500. Final pricing depends on page count, content, features, integrations, and project scope.'],
  ['How long does a website take?', 'A smaller website can move quickly once the content and direction are clear. Larger or more custom builds take longer depending on scope.'],
  ['Will my website work on phones?', 'Yes. Responsive behavior is part of every package so the website is designed for desktop, tablet, and mobile.'],
  ['Can you redesign my current website?', 'Yes. Existing websites can be reorganized and redesigned while keeping the parts of the current brand or content that still work.'],
  ['Can you add booking or custom features?', 'Yes. Booking, request forms, e-commerce, integrations, and other advanced features can be scoped as a custom project.'],
];

const plans = [
  {
    name: 'Starter',
    price: '$500+',
    copy: 'A focused website for a local business that needs a clean professional presence.',
    features: ['Up to 5 pages', 'Mobile responsive', 'Contact form', 'Basic SEO setup', 'Launch support'],
  },
  {
    name: 'Professional',
    price: '$1,000+',
    copy: 'For businesses that need more pages, stronger presentation, and a complete customer journey.',
    features: ['Up to 10 pages', 'Custom homepage', 'Service pages', 'SEO-friendly structure', 'Post-launch support'],
  },
  {
    name: 'Custom',
    price: 'Quote',
    copy: 'For booking, e-commerce, custom integrations, and more advanced website requirements.',
    features: ['Custom page count', 'Booking / request forms', 'Custom integrations', 'Advanced sections', 'Priority support'],
  },
];

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -7% 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`td-reveal ${visible ? 'td-reveal-on' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function DemoFrame({ href, name, className = '' }: { href: string; name: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-[#dedbd5] ${className}`}>
      <iframe
        src={href}
        title={`${name} website preview`}
        tabIndex={-1}
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute left-0 top-0 border-0 bg-white"
        style={{ width: '200%', height: '200%', transform: 'scale(.5)', transformOrigin: 'top left' }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
    </div>
  );
}

function PinnedShowreel() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const node = sectionRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const travel = Math.max(1, node.offsetHeight - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, -rect.top / travel)));
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

  const ease = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
  const layouts = [
    { span: 'col-span-6', x: -120, y: -70, r: -4 },
    { span: 'col-span-6', x: 120, y: -70, r: 4 },
    { span: 'col-span-4', x: -150, y: 0, r: -3 },
    { span: 'col-span-4', x: 0, y: 30, r: 2 },
    { span: 'col-span-4', x: 150, y: 0, r: 3 },
    { span: 'col-span-6', x: -120, y: 70, r: -4 },
    { span: 'col-span-6', x: 120, y: 70, r: 4 },
  ];

  const cardStyle = (index: number): CSSProperties => {
    const item = layouts[index];
    const scale = 0.74 + ease * 0.26;
    return {
      transform: `translate3d(${item.x * (1 - ease)}px, ${item.y * (1 - ease)}px, 0) rotate(${item.r * (1 - ease)}deg) scale(${scale})`,
      opacity: 0.32 + ease * 0.68,
    };
  };

  const circleScale = 0.78 + Math.min(1, progress * 1.7) * 0.22;
  const circleOpacity = Math.min(1, Math.max(0, (progress - 0.08) / 0.18)) * Math.min(1, Math.max(0, (1 - progress) / 0.12));

  return (
    <section ref={sectionRef} id="showreel" className="relative h-[400vh] bg-white">
      <div className="sticky top-0 h-screen overflow-hidden bg-white p-2.5">
        <div className="grid h-full w-full grid-cols-12 grid-rows-3 gap-2">
          {demos.map((demo, index) => (
            <Link
              key={demo.name}
              href={demo.href}
              className={`${layouts[index].span} group relative h-full overflow-hidden rounded-lg bg-[#e8e5df] will-change-transform`}
              style={cardStyle(index)}
            >
              <DemoFrame href={demo.href} name={demo.name} className="h-full w-full" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/75 px-4 py-3 text-white backdrop-blur-md">
                <div>
                  <div className="text-sm font-medium tracking-[-0.03em]">{demo.name}</div>
                  <div className="mt-0.5 text-[9px] uppercase tracking-[.15em] text-white/45">{demo.category}</div>
                </div>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/demos"
          className="absolute left-1/2 top-1/2 z-20 flex aspect-square w-[94px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-center shadow-[0_20px_80px_rgba(0,0,0,.2)] will-change-transform sm:w-[108px]"
          style={{ opacity: circleOpacity, transform: `translate(-50%, -50%) scale(${circleScale})` }}
        >
          <span className="text-[10px] font-medium uppercase leading-[1.25] tracking-[.12em]">View<br />all demos</span>
        </Link>
      </div>
    </section>
  );
}

export function SheltaStyleHomepageMotion() {
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

  const heroY = Math.min(140, scrollY * 0.16);
  const heroScale = Math.max(0.92, 1 - scrollY * 0.00007);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f2efe9] text-[#0a0a0a] selection:bg-black selection:text-white">
      <style>{`
        html { scroll-behavior: smooth; }
        body { background: #f2efe9; }
        .td-shell { font-family: "PP Neue Montreal", Arial, sans-serif; }
        .td-grid { background-image: linear-gradient(to right, rgba(10,10,10,.065) 1px, transparent 1px); background-size: 33.333% 100%; }
        .td-reveal { opacity: 0; transform: translateY(46px); transition: opacity .9s cubic-bezier(.22,1,.36,1), transform .9s cubic-bezier(.22,1,.36,1); }
        .td-reveal-on { opacity: 1; transform: translateY(0); }
        .td-hero-word { display:block; overflow:hidden; }
        .td-hero-word > span { display:block; transform:translateY(112%); animation: tdHero .95s cubic-bezier(.22,1,.36,1) forwards; }
        .td-hero-word:nth-child(2) > span { animation-delay:.1s; }
        .td-hero-word:nth-child(3) > span { animation-delay:.2s; }
        .td-hero-meta { opacity:0; transform:translateY(22px); animation:tdMeta .8s .45s cubic-bezier(.22,1,.36,1) forwards; }
        .td-nav { opacity:0; transform:translate(-50%,-18px); animation:tdNav .8s .2s cubic-bezier(.22,1,.36,1) forwards; }
        .td-outline { color:transparent; -webkit-text-stroke:1px rgba(255,255,255,.3); }
        .td-card { transition:transform .5s cubic-bezier(.22,1,.36,1), box-shadow .5s cubic-bezier(.22,1,.36,1); }
        .td-card:hover { transform:translateY(-7px); box-shadow:0 28px 70px rgba(0,0,0,.13); }
        .td-marquee { animation:tdMarquee 26s linear infinite; }
        .td-service-card { transition:transform .45s cubic-bezier(.22,1,.36,1), border-radius .45s cubic-bezier(.22,1,.36,1); }
        .td-service-card:hover { transform:scale(.992); }
        .td-service-card:hover .td-arrow { transform:translate(7px,-7px); }
        .td-arrow { transition:transform .4s cubic-bezier(.22,1,.36,1); }
        details[open] .td-plus { transform:rotate(45deg); }
        .td-plus { transition:transform .35s cubic-bezier(.22,1,.36,1); }
        @keyframes tdHero { to { transform:translateY(0); } }
        @keyframes tdMeta { to { opacity:1; transform:translateY(0); } }
        @keyframes tdNav { to { opacity:1; transform:translate(-50%,0); } }
        @keyframes tdMarquee { from { transform:translateX(0); } to { transform:translateX(-50%); } }
        @media (max-width: 809px) {
          .td-grid { background-size: 50% 100%; }
        }
        @media (prefers-reduced-motion: reduce) {
          *,*::before,*::after { animation-duration:.01ms!important; animation-iteration-count:1!important; transition-duration:.01ms!important; scroll-behavior:auto!important; }
        }
      `}</style>

      <div className="td-shell">
        <header className="td-nav fixed left-1/2 top-5 z-50 w-[calc(100%-24px)] max-w-[760px]">
          <div className="flex items-center justify-between rounded-full border border-black/10 bg-[#f2efe9]/90 px-3 py-2.5 shadow-[0_10px_40px_rgba(0,0,0,.08)] backdrop-blur-xl sm:px-4">
            <Link href="#top" className="rounded-full px-3 py-2 text-xs font-medium tracking-[-0.02em]">DesignedbyTD</Link>
            <nav className="hidden items-center gap-1 md:flex">
              {[
                ['Work', '#work'],
                ['Process', '#process'],
                ['Services', '#services'],
                ['Pricing', '#pricing'],
              ].map(([label, href]) => (
                <Link key={label} href={href} className="rounded-full px-3 py-2 text-[11px] text-black/55 transition-colors hover:bg-black hover:text-white">{label}</Link>
              ))}
            </nav>
            <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-black px-4 py-2.5 text-[11px] font-medium text-white">
              Contact <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </header>

        <main id="top">
          <section className="td-grid relative overflow-hidden px-4 pb-28 pt-44 sm:px-6 lg:px-8 lg:pb-36 lg:pt-52">
            <div className="mx-auto max-w-[1340px]">
              <div className="relative z-10">
                <h1 className="max-w-[1180px] text-[clamp(4rem,8.4vw,8.5rem)] font-medium leading-[.88] tracking-[-0.065em]">
                  <span className="td-hero-word"><span>Build Your Perfect</span></span>
                  <span className="td-hero-word"><span>Website Today.</span></span>
                </h1>

                <div className="td-hero-meta mt-12 grid gap-8 md:grid-cols-12 md:items-end lg:mt-16">
                  <p className="max-w-[520px] text-[clamp(1rem,1.55vw,1.3rem)] font-light leading-[1.48] tracking-[-0.025em] text-black/60 md:col-span-5">
                    Modern, mobile-friendly websites for local businesses that want to look professional and make it easier for customers to take action.
                  </p>
                  <div className="flex gap-3 md:col-span-5 md:col-start-8 md:justify-end">
                    <Link href="/demos" className="group inline-flex items-center gap-3 rounded-full border border-black/15 bg-white/50 px-5 py-3 text-xs font-medium transition-colors hover:bg-black hover:text-white">Explore work <ArrowUpRight className="h-4 w-4 td-arrow" /></Link>
                    <Link href="/contact" className="inline-flex items-center rounded-full bg-black px-5 py-3 text-xs font-medium text-white">Let&apos;s talk</Link>
                  </div>
                </div>
              </div>

              <div className="relative mt-24 h-[58vh] min-h-[520px] overflow-hidden rounded-[10px] bg-black shadow-[0_45px_120px_rgba(0,0,0,.18)] lg:mt-32 lg:h-[72vh]" style={{ transform: `translate3d(0,${heroY * 0.18}px,0) scale(${heroScale})`, transformOrigin: 'center top' }}>
                <DemoFrame href="/portfolio/akjo-portfolio" name="Akjo" className="absolute inset-0 h-full w-full" />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <div className="td-outline whitespace-nowrap text-[clamp(7rem,24vw,22rem)] font-medium leading-none tracking-[-0.08em]" style={{ transform: `translate3d(0,${-heroY * 0.35}px,0)` }}>DTD</div>
                </div>
                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-white sm:inset-x-7 sm:bottom-7">
                  <div><div className="text-[10px] uppercase tracking-[.17em] text-white/50">Featured demo</div><div className="mt-2 text-2xl font-medium tracking-[-0.04em]">Akjo Portfolio</div></div>
                  <div className="hidden max-w-[300px] text-right text-xs font-light leading-relaxed text-white/55 sm:block">A live website preview inside the DesignedbyTD demo collection.</div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-[#f2efe9] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
            <div className="mx-auto max-w-[1340px]">
              <div className="grid gap-12 border-t border-black/10 pt-8 lg:grid-cols-12">
                <Reveal className="lg:col-span-4"><div className="text-[11px] uppercase tracking-[.18em] text-black/40">About the studio</div></Reveal>
                <div className="lg:col-span-8">
                  <Reveal><h2 className="max-w-[910px] text-[clamp(2.7rem,5.3vw,5.3rem)] font-medium leading-[.96] tracking-[-0.055em]">Web design made clear, focused, and built around the business.</h2></Reveal>
                  <div className="mt-10 grid gap-8 sm:grid-cols-2">
                    <Reveal delay={100}><p className="text-base font-light leading-[1.55] text-black/55">DesignedbyTD Studio creates websites for small and local businesses across Orange County and beyond. Every project starts with what the customer needs to understand and what action they should take next.</p></Reveal>
                    <Reveal delay={180}><p className="text-base font-light leading-[1.55] text-black/55">The result is a website that feels modern, works across devices, and gives the business a stronger place to send customers from Google, social media, referrals, and outreach.</p></Reveal>
                  </div>
                </div>
              </div>

              <div className="mt-20 grid border-y border-black/10 sm:grid-cols-3">
                {[['15+', 'Interactive website demos'], ['4', 'Service categories'], ['$500+', 'Website projects start here']].map(([value, label], index) => (
                  <Reveal key={label} delay={index * 90} className={index > 0 ? 'border-t border-black/10 sm:border-l sm:border-t-0' : ''}>
                    <div className="py-9 sm:px-7 lg:py-11"><div className="text-[clamp(3.2rem,6vw,5.5rem)] font-medium leading-none tracking-[-0.065em]">{value}</div><div className="mt-4 text-xs text-black/40">{label}</div></div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section id="work" className="bg-white px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
            <div className="mx-auto max-w-[1340px]">
              <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                <Reveal><div><div className="text-[11px] uppercase tracking-[.18em] text-black/40">(Curated)</div><h2 className="mt-5 max-w-[850px] text-[clamp(3.4rem,7vw,7rem)] font-medium leading-[.9] tracking-[-0.065em]">Websites for real business categories.</h2></div></Reveal>
                <Reveal delay={120}><p className="max-w-[360px] text-sm font-light leading-[1.6] text-black/50">Explore different design directions for portfolios, restaurants, appointment-based businesses, and custom local-service websites.</p></Reveal>
              </div>

              <div className="mt-16 grid gap-4 md:grid-cols-2">
                {demos.slice(0, 4).map((demo, index) => (
                  <Reveal key={demo.name} delay={index * 80}>
                    <Link href={demo.href} className="td-card group block rounded-xl bg-[#f2efe9] p-2.5">
                      <DemoFrame href={demo.href} name={demo.name} className="aspect-[1.45/1] rounded-[9px]" />
                      <div className="flex items-end justify-between px-2 pb-2 pt-4"><div><div className="text-xl font-medium tracking-[-0.04em]">{demo.name}</div><div className="mt-1 text-[10px] uppercase tracking-[.15em] text-black/35">{demo.category}</div></div><ArrowUpRight className="td-arrow mb-1 h-5 w-5 text-black/35 group-hover:text-black" /></div>
                    </Link>
                  </Reveal>
                ))}
              </div>
              <div className="mt-10 flex justify-end"><Link href="/demos" className="group inline-flex items-center gap-3 rounded-full border border-black/15 px-5 py-3 text-xs font-medium transition-colors hover:bg-black hover:text-white">See all demos <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link></div>
            </div>
          </section>

          <section id="process" className="relative bg-[#0a0a0a] px-4 py-28 text-white sm:px-6 lg:px-8 lg:py-44">
            <div className="mx-auto max-w-[1340px]">
              <div className="grid gap-14 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <div className="lg:sticky lg:top-[180px]">
                    <Reveal><div className="text-[11px] uppercase tracking-[.18em] text-white/35">How We Work</div><h2 className="mt-6 text-[clamp(3.8rem,7.3vw,7.3rem)] font-medium leading-[.87] tracking-[-0.07em]">From idea<br />to launch.</h2><p className="mt-8 max-w-[420px] text-base font-light leading-[1.55] text-white/45">A clear process keeps the website moving without making the project feel complicated.</p></Reveal>
                  </div>
                </div>
                <div className="lg:col-span-7">
                  {process.map((step, index) => (
                    <Reveal key={step.number} delay={index * 55}>
                      <article className="grid gap-5 border-t border-white/15 py-10 sm:grid-cols-[70px_1fr] lg:py-14">
                        <div className="text-xs text-white/35">({step.number})</div>
                        <div><h3 className="text-[clamp(2.3rem,4.5vw,4.8rem)] font-medium leading-none tracking-[-0.055em]">{step.title}</h3><p className="mt-5 max-w-[520px] text-sm font-light leading-[1.65] text-white/45">{step.copy}</p><div className="mt-7 grid gap-x-6 gap-y-2 sm:grid-cols-2">{step.items.map((item) => <div key={item} className="flex items-center gap-2 text-xs text-white/55"><span className="h-1 w-1 rounded-full bg-white/50" />{item}</div>)}</div></div>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="services" className="relative bg-[#f2efe9] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
            <div className="mx-auto max-w-[1340px]">
              <Reveal><div className="mb-16"><div className="text-[11px] uppercase tracking-[.18em] text-black/40">Our Service</div><h2 className="mt-5 max-w-[880px] text-[clamp(3.4rem,7vw,7rem)] font-medium leading-[.9] tracking-[-0.065em]">Built around how your business works.</h2></div></Reveal>
              <div className="space-y-[42vh] pb-[34vh]">
                {services.map((service, index) => (
                  <article key={service.title} className="td-service-card sticky top-[100px] rounded-2xl border border-black/10 bg-[#f2efe9] shadow-[0_-12px_45px_rgba(0,0,0,.04)]" style={{ zIndex: 10 + index }}>
                    <Link href={service.href} className="group grid min-h-[430px] gap-10 p-7 sm:p-9 lg:grid-cols-12 lg:p-12">
                      <div className="lg:col-span-2"><div className="text-xs text-black/35">{service.number}</div></div>
                      <div className="flex flex-col justify-between lg:col-span-7"><h3 className="text-[clamp(3rem,7vw,7.2rem)] font-medium leading-[.86] tracking-[-0.07em]">{service.title}</h3><p className="mt-10 max-w-[540px] text-base font-light leading-[1.55] text-black/55">{service.copy}</p></div>
                      <div className="flex items-start justify-end lg:col-span-3"><div className="flex h-14 w-14 items-center justify-center rounded-full border border-black/15 transition-colors group-hover:bg-black group-hover:text-white"><ArrowUpRight className="td-arrow h-5 w-5" /></div></div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="overflow-hidden bg-[#0a0a0a] py-10 text-white">
            <div className="td-marquee flex w-max whitespace-nowrap text-[clamp(4.8rem,12vw,11rem)] font-medium leading-none tracking-[-0.075em]">
              <span className="pr-12">SHOWREEL 26© · WEBSITE DESIGN · ORANGE COUNTY · </span><span className="pr-12">SHOWREEL 26© · WEBSITE DESIGN · ORANGE COUNTY · </span>
            </div>
          </section>

          <PinnedShowreel />

          <section className="bg-[#f2efe9] px-4 py-24 sm:px-6 lg:px-8 lg:py-36">
            <div className="mx-auto max-w-[1340px]">
              <div className="grid gap-12 border-t border-black/10 pt-8 lg:grid-cols-12">
                <Reveal className="lg:col-span-4"><div className="text-[11px] uppercase tracking-[.18em] text-black/40">Why DesignedbyTD</div></Reveal>
                <div className="lg:col-span-8"><Reveal><h2 className="max-w-[900px] text-[clamp(3rem,5.8vw,5.8rem)] font-medium leading-[.94] tracking-[-0.06em]">A professional website without unnecessary complexity.</h2></Reveal></div>
              </div>
              <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-black/10 bg-black/10 md:grid-cols-2">
                {benefits.map(([title, copy], index) => (
                  <Reveal key={title} delay={index * 70}>
                    <div className="min-h-[300px] bg-[#f2efe9] p-7 sm:p-9"><div className="flex items-center justify-between"><span className="text-[10px] uppercase tracking-[.16em] text-black/35">0{index + 1}</span><div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white"><Check className="h-3.5 w-3.5" /></div></div><h3 className="mt-16 text-[clamp(2rem,4vw,3.8rem)] font-medium leading-none tracking-[-0.055em]">{title}</h3><p className="mt-5 max-w-[430px] text-sm font-light leading-[1.65] text-black/50">{copy}</p></div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-white px-4 py-24 sm:px-6 lg:px-8 lg:py-36">
            <div className="mx-auto max-w-[1340px]">
              <div className="grid gap-14 lg:grid-cols-12">
                <div className="lg:col-span-5"><Reveal><div className="text-[11px] uppercase tracking-[.18em] text-black/40">FAQs</div><h2 className="mt-5 text-[clamp(3.5rem,7vw,7rem)] font-medium leading-[.88] tracking-[-0.065em]">Questions<br />before we start?</h2><p className="mt-7 max-w-[350px] text-sm font-light leading-[1.6] text-black/50">Can&apos;t find your answer? Send a message and tell me what you&apos;re trying to build.</p></Reveal></div>
                <div className="lg:col-span-7">
                  {faqs.map(([question, answer], index) => (
                    <Reveal key={question} delay={index * 55}>
                      <details className="group border-t border-black/10 py-6 last:border-b">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-xl font-medium tracking-[-0.035em] sm:text-2xl"><span>{question}</span><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/15"><Plus className="td-plus h-4 w-4" /></span></summary>
                        <p className="max-w-[570px] pb-2 pt-5 text-sm font-light leading-[1.7] text-black/50">{answer}</p>
                      </details>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="pricing" className="bg-[#f2efe9] px-4 py-24 sm:px-6 lg:px-8 lg:py-36">
            <div className="mx-auto max-w-[1340px]">
              <Reveal><div className="flex flex-col gap-8 border-t border-black/10 pt-8 md:flex-row md:items-end md:justify-between"><div><div className="text-[11px] uppercase tracking-[.18em] text-black/40">Website packages</div><h2 className="mt-5 text-[clamp(3.5rem,7vw,7rem)] font-medium leading-[.88] tracking-[-0.065em]">A clear place<br />to start.</h2></div><p className="max-w-[410px] text-sm font-light leading-[1.65] text-black/50">Final pricing is based on the actual website scope. These packages are starting points, not one-size-fits-all templates.</p></div></Reveal>
              <div className="mt-16 grid gap-3 md:grid-cols-3">
                {plans.map((plan, index) => (
                  <Reveal key={plan.name} delay={index * 90}>
                    <article className={`td-card flex min-h-[540px] flex-col rounded-xl border p-7 sm:p-8 ${index === 0 ? 'border-black bg-black text-white' : 'border-black/10 bg-white'}`}><div className={`text-[10px] uppercase tracking-[.16em] ${index === 0 ? 'text-white/40' : 'text-black/35'}`}>{index === 0 ? 'Most chosen' : index === 1 ? 'Growing business' : 'Advanced project'}</div><h3 className="mt-8 text-4xl font-medium tracking-[-0.05em]">{plan.name}</h3><p className={`mt-3 max-w-[31ch] text-sm font-light leading-[1.6] ${index === 0 ? 'text-white/50' : 'text-black/50'}`}>{plan.copy}</p><div className="mt-10 text-[clamp(3rem,5vw,5rem)] font-medium leading-none tracking-[-0.065em]">{plan.price}</div><div className="my-9 flex flex-grow flex-col gap-3">{plan.features.map((feature) => <div key={feature} className="flex items-center gap-3 text-sm"><Check className="h-4 w-4" /><span className={index === 0 ? 'text-white/70' : 'text-black/65'}>{feature}</span></div>)}</div><Link href="/contact" className={`group inline-flex items-center justify-between rounded-full px-5 py-3.5 text-sm font-medium ${index === 0 ? 'bg-white text-black' : 'bg-black text-white'}`}><span>Start a project</span><ArrowUpRight className="td-arrow h-4 w-4" /></Link></article>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <footer className="bg-[#0a0a0a] px-4 pb-10 pt-24 text-white sm:px-6 lg:px-8 lg:pt-36">
            <div className="mx-auto max-w-[1340px]">
              <Reveal><div className="border-t border-white/15 pt-8"><div className="text-[11px] uppercase tracking-[.18em] text-white/35">Ready to start?</div><h2 className="mt-7 max-w-[1180px] text-[clamp(4rem,10vw,10rem)] font-medium leading-[.82] tracking-[-0.075em]">Let&apos;s build your website.</h2></div></Reveal>
              <div className="mt-14 grid gap-12 border-y border-white/15 py-10 md:grid-cols-12"><div className="md:col-span-5"><p className="max-w-[500px] text-base font-light leading-[1.55] text-white/45">Tell me about your business, what the website needs to do, and the style you have in mind.</p><Link href="/contact" className="group mt-8 inline-flex items-center gap-4 rounded-full bg-white px-6 py-4 text-sm font-medium text-black">Start your project <ArrowUpRight className="td-arrow h-4 w-4" /></Link></div><div className="grid gap-8 text-sm md:col-span-5 md:col-start-8 sm:grid-cols-2"><div><div className="text-[10px] uppercase tracking-[.15em] text-white/30">Contact</div><div className="mt-4 text-white/70">designedbytd.studio@gmail.com</div></div><div><div className="text-[10px] uppercase tracking-[.15em] text-white/30">Location</div><div className="mt-4 text-white/70">Orange County, CA</div></div></div></div>
              <div className="mt-8 flex flex-col justify-between gap-3 text-[11px] text-white/30 sm:flex-row"><span>© DesignedbyTD Studio</span><span>Custom websites for small businesses</span></div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
