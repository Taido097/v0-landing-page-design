'use client';

import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  ClipboardCheck,
  DraftingCompass,
  HardHat,
  Mail,
  MapPin,
  Menu,
  Phone,
  Ruler,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  X,
  Zap,
} from 'lucide-react';

const NAVY = '#061b36';
const GOLD = '#d99a2b';
const CREAM = '#f8f7f3';

const services = [
  {
    number: '01',
    title: 'Site & Planning',
    copy: 'Early planning that aligns the site, zoning, code requirements and business goals before design begins.',
    items: ['Site Survey & Existing Conditions', 'Zoning & Code Review', 'Space Planning', 'Concept Design'],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=90',
  },
  {
    number: '02',
    title: 'Architectural Design',
    copy: 'Commercial and residential design developed for function, brand experience, coordination and permit readiness.',
    items: ['Floor Plans', 'Elevations & Sections', 'Reflected Ceiling Plans', 'Construction Details', '3D Renderings', 'Tenant Improvement Plans'],
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1800&q=90',
  },
  {
    number: '03',
    title: 'Structural Engineering',
    copy: 'Integrated structural design and calculations coordinated with the architectural set from the beginning.',
    items: ['Structural Design', 'Structural Details', 'Structural Calculations', 'Foundation & Framing', 'Retaining Walls', 'Existing Building Modification'],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1800&q=90',
  },
  {
    number: '04',
    title: 'MEP Engineering',
    copy: 'Mechanical, electrical and plumbing systems designed as one coordinated package for efficient plan review.',
    items: ['Electrical Design', 'Plumbing Design', 'HVAC Design', 'Electrical Load Calculations', 'Equipment Coordination'],
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1800&q=90',
  },
  {
    number: '05',
    title: 'Code & Energy Compliance',
    copy: 'Code, accessibility and energy requirements integrated into the design instead of handled as an afterthought.',
    items: ['Title 24', 'CalGreen', 'ADA Compliance', 'Building Code Review', 'Accessibility', 'Occupancy & Egress'],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=90',
  },
  {
    number: '06',
    title: 'Permit Services',
    copy: 'A coordinated path from submittal through plan check, corrections, resubmittals and approval support.',
    items: ['Permit Submittal', 'City Submittal', 'Plan Check Coordination', 'Corrections & Resubmittal', 'Permit Approval Support', 'Construction Support'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1800&q=90',
  },
];

const projects = [
  {
    title: 'Boba Shops & Cafés',
    type: 'Commercial · Tenant Improvement',
    detail: 'Functional layouts, efficient workflow and an inviting customer experience for high-volume beverage concepts.',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1800&q=92',
  },
  {
    title: 'Restaurants',
    type: 'Commercial · Hospitality',
    detail: 'Complete restaurant design coordinated around kitchen requirements, code compliance, comfort and memorable dining.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=92',
  },
  {
    title: 'Nail & Beauty Salons',
    type: 'Commercial · Beauty',
    detail: 'Optimized layouts for stations, plumbing, ventilation and a polished atmosphere that supports the brand.',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1800&q=92',
  },
  {
    title: 'Retail Stores',
    type: 'Commercial · Retail',
    detail: 'Attractive, functional spaces designed to improve product display, customer flow and brand identity.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=92',
  },
  {
    title: 'Office & Tenant Improvement',
    type: 'Commercial · Workplace',
    detail: 'Productive workspaces planned for comfort, collaboration, flexibility and everyday business growth.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=92',
  },
  {
    title: 'Commercial Remodel & Renovation',
    type: 'Commercial · Renovation',
    detail: 'Existing spaces upgraded with coordinated design and engineering solutions that maximize value and function.',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=92',
  },
  {
    title: 'New Commercial Buildings',
    type: 'Commercial · Ground-Up',
    detail: 'From concept through coordinated architecture and engineering, buildings are designed to perform and last.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=92',
  },
  {
    title: 'Tenant Improvement (TI)',
    type: 'Commercial · TI',
    detail: 'Efficient TI solutions aligned with tenant needs, budget, landlord requirements and permitting constraints.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=92',
  },
];

const steps = [
  ['01', 'Consultation', 'We listen to your goals, understand your needs, and define project scope, budget and timeline.'],
  ['02', 'Site Analysis & Feasibility', 'We review existing conditions, zoning, code constraints and the best approval path.'],
  ['03', 'Concept Design', 'We develop layouts and concepts that bring the project vision into a clear design direction.'],
  ['04', 'Design & Engineering', 'Architecture, structural, MEP and Title 24 documentation are coordinated as one package.'],
  ['05', 'Permit Submittal', 'We prepare and submit the permit package and coordinate with the reviewing city or agency.'],
  ['06', 'Plan Check & Approval', 'We respond to comments, coordinate revisions and support the project through final approval.'],
];

const faqs = [
  ['Do you handle permit submittal and plan check?', 'Yes. Permit support includes building permit documentation, city or agency submittal, plan check coordination, corrections, resubmittals and approval support.'],
  ['What project types do you work on?', 'Commercial work includes boba shops, cafés, restaurants, nail and beauty salons, retail stores, offices, tenant improvements, remodels and new commercial buildings. Residential work includes custom homes and ADUs.'],
  ['Do you provide engineering in-house?', 'NGUYEN provides coordinated architectural, structural, MEP and Title 24 services so the major technical disciplines can move together through one process.'],
  ['Can you help with ADUs?', 'Yes. ADU support includes planning, architectural design, structural engineering, MEP coordination, Title 24 and permit services for detached, attached, garage conversion and other ADU configurations.'],
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function NguyenConcept04() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.visible = 'true';
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -7% 0px' },
    );
    revealNodes.forEach((node) => revealObserver.observe(node));

    const projectFrames = Array.from(document.querySelectorAll<HTMLElement>('[data-project-image]'));
    const zoomObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const frame = entry.target as HTMLElement;
          zoomObserver.unobserve(frame);
          if (reduced || !frame.animate) {
            frame.style.transform = 'scale(1)';
            return;
          }
          const animation = frame.animate(
            [{ transform: 'scale(1.5)' }, { transform: 'scale(1)' }],
            { duration: 4000, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' },
          );
          animation.onfinish = () => {
            frame.style.transform = 'scale(1)';
            animation.cancel();
          };
        });
      },
      { threshold: 0.5 },
    );
    projectFrames.forEach((node) => zoomObserver.observe(node));

    const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-project-card]'));
    const animations = new WeakMap<HTMLElement, Animation>();
    const spring = (t: number) => {
      const k = 500;
      const c = 60;
      const m = 1;
      const d = c * c - 4 * m * k;
      if (d <= 0) return 1 - Math.exp(-10 * t);
      const root = Math.sqrt(d);
      const r1 = (-c + root) / (2 * m);
      const r2 = (-c - root) / (2 * m);
      const c1 = -r2 / (r1 - r2);
      const c2 = r1 / (r1 - r2);
      return 1 - (c1 * Math.exp(r1 * t) + c2 * Math.exp(r2 * t));
    };
    const animateHeight = (frame: HTMLElement, to: number) => {
      const current = animations.get(frame);
      current?.cancel();
      const from = frame.getBoundingClientRect().height;
      if (reduced || window.innerWidth < 810 || !frame.animate) {
        frame.style.height = `${to}px`;
        return;
      }
      const keyframes: Keyframe[] = [];
      const duration = 650;
      for (let i = 0; i <= 34; i += 1) {
        const f = i / 34;
        const p = Math.max(0, Math.min(1, spring((duration / 1000) * f)));
        keyframes.push({ height: `${from + (to - from) * p}px`, offset: f });
      }
      keyframes[keyframes.length - 1] = { height: `${to}px`, offset: 1 };
      const animation = frame.animate(keyframes, { duration, easing: 'linear', fill: 'forwards' });
      animations.set(frame, animation);
      animation.onfinish = () => {
        frame.style.height = `${to}px`;
        animations.delete(frame);
        animation.cancel();
      };
    };
    const disposers: Array<() => void> = [];
    cards.forEach((card) => {
      const frame = card.querySelector<HTMLElement>('[data-project-frame]');
      if (!frame) return;
      const expanded = () => Math.max(280, Math.min(520, frame.getBoundingClientRect().width / 1.5034843205574913));
      const enter = () => {
        if (window.innerWidth >= 810) animateHeight(frame, 133);
      };
      const leave = () => {
        if (window.innerWidth >= 810) animateHeight(frame, expanded());
      };
      card.addEventListener('pointerenter', enter);
      card.addEventListener('pointerleave', leave);
      card.addEventListener('focusin', enter);
      card.addEventListener('focusout', leave);
      disposers.push(() => {
        card.removeEventListener('pointerenter', enter);
        card.removeEventListener('pointerleave', leave);
        card.removeEventListener('focusin', enter);
        card.removeEventListener('focusout', leave);
      });
    });

    return () => {
      revealObserver.disconnect();
      zoomObserver.disconnect();
      disposers.forEach((dispose) => dispose());
    };
  }, []);

  const navItems = [
    ['About', 'about'],
    ['Services', 'services'],
    ['Projects', 'projects'],
    ['Process', 'process'],
    ['Contact', 'contact'],
  ];

  return (
    <div className="nguyen-site min-h-screen overflow-x-hidden bg-[#f8f7f3] text-[#061b36]">
      <style jsx global>{`
        html { scroll-behavior: smooth; }
        body { margin: 0; }
        .nguyen-site { font-family: Geist, Inter, Arial, sans-serif; }
        .reveal { opacity: 0; transform: translateY(44px); filter: blur(5px); transition: opacity .9s cubic-bezier(.22,1,.36,1), transform 1s cubic-bezier(.22,1,.36,1), filter 1s cubic-bezier(.22,1,.36,1); }
        .reveal[data-visible='true'] { opacity: 1; transform: translateY(0); filter: blur(0); }
        .reveal-delay { transition-delay: .12s; }
        .hero-enter { animation: heroEnter 1.15s cubic-bezier(.22,1,.36,1) both; }
        .hero-enter-2 { animation: heroEnter 1.25s .14s cubic-bezier(.22,1,.36,1) both; }
        .hero-enter-3 { animation: heroEnter 1.25s .28s cubic-bezier(.22,1,.36,1) both; }
        @keyframes heroEnter { from { opacity: 0; transform: translateY(52px); filter: blur(8px); } to { opacity: 1; transform: translateY(0); filter: blur(0); } }
        .project-frame { height: min(34vw, 430px); }
        .service-row:hover .service-arrow { transform: translate(5px,-5px); }
        .service-row:hover .service-image { transform: scale(1.045); }
        .nav-blur { backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); }
        .ticker { animation: ticker 26s linear infinite; }
        @keyframes ticker { to { transform: translateX(-50%); } }
        @media (max-width: 809px) {
          .project-frame { height: 310px !important; }
          .reveal { transform: translateY(28px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal, .hero-enter, .hero-enter-2, .hero-enter-3, .ticker { animation: none !important; transition: none !important; opacity: 1 !important; transform: none !important; filter: none !important; }
        }
      `}</style>

      <header className="nav-blur fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#061b36]/88 text-white">
        <div className="mx-auto flex h-[78px] max-w-[1560px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <button onClick={() => scrollToId('top')} className="text-left" aria-label="NGUYEN home">
            <strong className="block text-[17px] font-black tracking-[.16em]">NGUYEN</strong>
            <span className="mt-1 block text-[7px] font-bold uppercase tracking-[.2em] text-[#d99a2b]">Architecture & Engineering</span>
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map(([label, id]) => (
              <button key={id} onClick={() => scrollToId(id)} className="rounded-full px-4 py-2 text-sm text-white/75 transition hover:bg-white/10 hover:text-white">
                {label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a href="tel:7147078889" className="text-xs text-white/65">(714) 707-8889</a>
            <a href="mailto:info@nguyenarchitecture.com" className="rounded-md bg-[#d99a2b] px-4 py-3 text-xs font-extrabold uppercase tracking-[.08em] text-[#061b36] transition hover:translate-y-[-2px]">Request Consultation</a>
          </div>

          <button onClick={() => setMenuOpen((value) => !value)} className="rounded-md border border-white/15 p-2 lg:hidden" aria-label="Toggle navigation">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-white/10 bg-[#061b36] px-5 py-5 lg:hidden">
            <div className="grid gap-2">
              {navItems.map(([label, id]) => (
                <button key={id} onClick={() => { setMenuOpen(false); scrollToId(id); }} className="rounded-md border border-white/10 px-4 py-3 text-left text-sm text-white/80">
                  {label}
                </button>
              ))}
              <a href="mailto:info@nguyenarchitecture.com" className="mt-2 rounded-md bg-[#d99a2b] px-4 py-3 text-center text-xs font-extrabold uppercase tracking-[.08em] text-[#061b36]">Request Consultation</a>
            </div>
          </div>
        )}
      </header>

      <main id="top">
        <section className="relative min-h-[900px] overflow-hidden bg-[#061b36] pt-[78px] text-white lg:min-h-[940px]">
          <img
            src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2400&q=92"
            alt="Modern commercial architecture"
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,27,54,.96)_0%,rgba(6,27,54,.82)_42%,rgba(6,27,54,.18)_78%,rgba(6,27,54,.44)_100%)]" />
          <div className="absolute -left-28 top-[30%] h-[420px] w-[420px] rounded-full bg-[#d99a2b]/15 blur-[120px]" />

          <div className="relative mx-auto grid max-w-[1560px] gap-12 px-5 pb-16 pt-24 sm:px-8 lg:grid-cols-[1.15fr_.85fr] lg:px-10 lg:pb-20 lg:pt-32">
            <div className="max-w-[900px]">
              <div className="hero-enter flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.14em] text-white/65">
                <span className="h-[2px] w-10 bg-[#d99a2b]" />
                NGUYEN Architecture & Engineering
              </div>
              <h1 className="hero-enter-2 mt-8 max-w-[940px] text-[clamp(4.2rem,9vw,9.5rem)] font-medium uppercase leading-[.78] tracking-[-.065em]">
                One team.<br /><span className="text-[#d99a2b]">Complete</span><br />solution.
              </h1>
              <div className="hero-enter-3 mt-10 grid max-w-[760px] gap-6 border-t border-white/18 pt-6 sm:grid-cols-[1fr_auto] sm:items-end">
                <p className="max-w-[590px] text-base leading-7 text-white/70 sm:text-lg">
                  Full-service architecture, engineering and permit support for commercial projects, custom homes and ADUs across California.
                </p>
                <button onClick={() => scrollToId('services')} className="group flex items-center gap-3 text-xs font-bold uppercase tracking-[.12em] text-[#d99a2b]">
                  Explore services <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
                </button>
              </div>
            </div>

            <div className="hero-enter-3 self-end lg:pb-6">
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-white/12 bg-white/10">
                {[
                  ['15+', 'Years Experience'],
                  ['500+', 'Successful Projects'],
                  ['CA', 'Northern & Southern'],
                  ['100%', 'Client Focused'],
                ].map(([number, label]) => (
                  <div key={label} className="bg-[#061b36]/70 p-5 sm:p-6">
                    <strong className="block text-3xl font-semibold tracking-[-.05em] text-[#d99a2b] sm:text-4xl">{number}</strong>
                    <span className="mt-3 block text-[10px] uppercase tracking-[.12em] text-white/55">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-white/10 bg-[#061b36]/75 py-4">
            <div className="ticker flex w-max whitespace-nowrap text-[11px] font-bold uppercase tracking-[.16em] text-white/55">
              {[0, 1].map((copy) => (
                <div key={copy} className="flex items-center gap-10 pr-10">
                  {['Architectural Design', 'Structural Engineering', 'MEP Engineering', 'Title 24 & Code', 'Permit Services', 'Commercial + Residential'].map((item) => (
                    <span key={`${copy}-${item}`} className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-[#d99a2b]" />{item}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="bg-[#f8f7f3] py-24 sm:py-28 lg:py-36">
          <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-10">
            <div data-reveal className="reveal grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:items-start">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#d99a2b]">About NGUYEN</p>
                <h2 className="mt-5 text-[clamp(3rem,6.5vw,7rem)] font-medium uppercase leading-[.87] tracking-[-.055em]">Design.<br />Engineer.<br /><span className="text-[#d99a2b]">Permit.</span></h2>
              </div>
              <div className="lg:pt-12">
                <p className="max-w-[900px] text-[clamp(1.45rem,2.4vw,2.65rem)] leading-[1.25] tracking-[-.035em] text-[#061b36]/88">
                  NGUYEN Architecture & Engineering provides full-service solutions from concept and design through coordinated engineering, permit processing and plan check support.
                </p>
                <div className="mt-12 grid gap-4 sm:grid-cols-2">
                  {[
                    [Users, 'In-house team', 'Architecture, structural, MEP and Title 24 coordination under one roof.'],
                    [ShieldCheck, 'Code & permit expertise', 'Local code knowledge integrated into the project from the start.'],
                    [Target, 'Client focused', 'Clear communication, practical solutions and attention to project goals.'],
                    [Zap, 'Time & cost efficiency', 'Coordination designed to reduce revisions and keep the process moving.'],
                  ].map(([Icon, title, copy]) => {
                    const I = Icon as typeof Users;
                    return (
                      <div key={String(title)} className="border-t border-[#061b36]/14 pt-5">
                        <I className="h-6 w-6 text-[#d99a2b]" />
                        <h3 className="mt-5 text-lg font-semibold tracking-[-.02em]">{String(title)}</h3>
                        <p className="mt-2 max-w-[360px] text-sm leading-6 text-[#061b36]/58">{String(copy)}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div data-reveal className="reveal reveal-delay mt-16 overflow-hidden rounded-md lg:mt-24">
              <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2400&q=92" alt="NGUYEN commercial design" className="h-[420px] w-full object-cover sm:h-[560px] lg:h-[720px]" />
            </div>
          </div>
        </section>

        <section id="services" className="bg-[#061b36] py-24 text-white sm:py-28 lg:py-36">
          <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-10">
            <div data-reveal className="reveal grid gap-10 border-b border-white/14 pb-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#d99a2b]">Our Services</p>
                <h2 className="mt-5 text-[clamp(3.3rem,7vw,7.5rem)] font-medium uppercase leading-[.84] tracking-[-.06em]">One team.<br /><span className="text-[#d99a2b]">Six disciplines.</span></h2>
              </div>
              <p className="max-w-[720px] text-base leading-7 text-white/58 lg:justify-self-end lg:text-lg">Comprehensive design, engineering, code and permit support coordinated around the same project goals from day one.</p>
            </div>

            <div className="mt-4">
              {services.map((service) => (
                <article key={service.number} data-reveal className="reveal service-row group grid gap-5 border-b border-white/14 py-7 sm:py-9 lg:grid-cols-[92px_1fr_1.05fr_72px] lg:items-center lg:gap-8">
                  <div className="text-sm font-bold text-[#d99a2b]">{service.number}</div>
                  <div>
                    <h3 className="text-2xl font-medium tracking-[-.04em] sm:text-3xl lg:text-4xl">{service.title}</h3>
                    <p className="mt-3 max-w-[560px] text-sm leading-6 text-white/50">{service.copy}</p>
                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-white/50">
                      {service.items.slice(0, 4).map((item) => <span key={item}>• {item}</span>)}
                    </div>
                  </div>
                  <div className="h-[190px] overflow-hidden rounded-md lg:h-[170px]">
                    <img src={service.image} alt={service.title} className="service-image h-full w-full object-cover transition-transform duration-700 ease-out" />
                  </div>
                  <ArrowRight className="service-arrow hidden h-7 w-7 justify-self-end text-[#d99a2b] transition-transform duration-500 lg:block" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="bg-[#f8f7f3] py-24 sm:py-28 lg:py-36">
          <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-10">
            <div data-reveal className="reveal flex flex-col gap-8 border-b border-[#061b36]/14 pb-10 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#d99a2b]">Project Types</p>
                <h2 className="mt-5 text-[clamp(3.3rem,7vw,7.6rem)] font-medium uppercase leading-[.84] tracking-[-.06em]">Built around<br /><span className="text-[#d99a2b]">your business.</span></h2>
              </div>
              <p className="max-w-[540px] text-base leading-7 text-[#061b36]/58">A wide range of commercial spaces tailored to customer experience, operations, brand goals and permit requirements.</p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {projects.map((project, index) => (
                <article key={project.title} data-project-card data-reveal className="reveal overflow-hidden rounded-md border border-[#061b36]/12 bg-white outline-none" tabIndex={0}>
                  <div data-project-frame className="project-frame overflow-hidden bg-[#dfe3e6]">
                    <div data-project-image className="h-full w-full origin-center">
                      <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
                    </div>
                  </div>
                  <div className="grid gap-4 p-5 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-end">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[.12em] text-[#d99a2b]">0{index + 1} · {project.type}</div>
                      <h3 className="mt-3 text-2xl font-semibold tracking-[-.04em] sm:text-3xl">{project.title}</h3>
                      <p className="mt-3 max-w-[560px] text-sm leading-6 text-[#061b36]/55">{project.detail}</p>
                    </div>
                    <div className="hidden h-10 w-10 items-center justify-center rounded-full border border-[#061b36]/15 text-[#061b36] lg:flex"><ArrowRight className="h-4 w-4" /></div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-[#061b36] py-24 text-white sm:py-28 lg:py-36">
          <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-10">
            <div data-reveal className="reveal grid gap-12 lg:grid-cols-[1fr_.9fr] lg:items-center">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#d99a2b]">Residential + ADU</p>
                <h2 className="mt-5 text-[clamp(3.2rem,6.5vw,7rem)] font-medium uppercase leading-[.86] tracking-[-.055em]">All ADU<br /><span className="text-[#d99a2b]">design & permit</span><br />solutions.</h2>
                <p className="mt-8 max-w-[670px] text-base leading-7 text-white/58">Planning, architecture, structural engineering, MEP, Title 24 and permitting for detached ADUs, attached ADUs, garage conversions, JADUs and custom residential work.</p>
                <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {['Detached ADU', 'Attached ADU', 'Garage Conversion', 'Junior ADU (JADU)', 'Custom Homes', 'Remodels & Additions'].map((item) => (
                    <div key={item} className="border border-white/12 px-4 py-4 text-xs text-white/68">{item}</div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=90" alt="Detached ADU" className="h-[290px] w-full rounded-md object-cover sm:h-[360px]" />
                <img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=90" alt="ADU interior" className="mt-14 h-[290px] w-full rounded-md object-cover sm:h-[360px]" />
              </div>
            </div>
          </div>
        </section>

        <section id="process" className="bg-white py-24 sm:py-28 lg:py-36">
          <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-10">
            <div data-reveal className="reveal grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#d99a2b]">Our Process</p>
                <h2 className="mt-5 text-[clamp(3.2rem,6.4vw,7rem)] font-medium uppercase leading-[.86] tracking-[-.055em]">A clear process.<br /><span className="text-[#d99a2b]">A smooth journey.</span></h2>
              </div>
              <p className="max-w-[660px] text-base leading-7 text-[#061b36]/58 lg:justify-self-end">We guide the project from the initial idea through coordinated design, engineering, permit submittal and approval support.</p>
            </div>

            <div className="mt-14 border-t border-[#061b36]/15">
              {steps.map(([number, title, copy]) => (
                <div key={number} data-reveal className="reveal grid gap-5 border-b border-[#061b36]/15 py-8 lg:grid-cols-[100px_.8fr_1.2fr] lg:items-start lg:gap-10">
                  <strong className="text-4xl font-medium tracking-[-.05em] text-[#d99a2b]">{number}</strong>
                  <h3 className="text-2xl font-semibold tracking-[-.04em] sm:text-3xl">{title}</h3>
                  <p className="max-w-[640px] text-sm leading-6 text-[#061b36]/58 sm:text-base sm:leading-7">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f1f3f5] py-24 sm:py-28 lg:py-36">
          <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-10">
            <div data-reveal className="reveal grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#d99a2b]">Why Choose NGUYEN</p>
                <h2 className="mt-5 text-[clamp(3.2rem,6vw,6.7rem)] font-medium uppercase leading-[.87] tracking-[-.055em]">Built on values.<br /><span className="text-[#d99a2b]">Focused on results.</span></h2>
              </div>
              <div className="grid gap-px overflow-hidden rounded-md border border-[#061b36]/12 bg-[#061b36]/12 sm:grid-cols-2">
                {[
                  [Users, 'Client focused', 'We listen, understand and collaborate closely from concept through approval.'],
                  [Sparkles, 'Quality driven', 'Design and engineering work developed with attention to detail.'],
                  [ShieldCheck, 'Code compliant', 'Building code, accessibility and safety requirements integrated early.'],
                  [ClipboardCheck, 'On time & on budget', 'Efficient coordination and communication designed to reduce avoidable revisions.'],
                  [DraftingCompass, 'Integrated expertise', 'Architecture and engineering disciplines coordinated around one project.'],
                  [Building2, 'Local knowledge', 'Experience supporting projects across Southern and Northern California.'],
                ].map(([Icon, title, copy]) => {
                  const I = Icon as typeof Users;
                  return (
                    <div key={String(title)} className="bg-white p-6 sm:p-7">
                      <I className="h-7 w-7 text-[#d99a2b]" />
                      <h3 className="mt-6 text-lg font-semibold tracking-[-.02em]">{String(title)}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#061b36]/55">{String(copy)}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-24 sm:py-28 lg:py-36">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10">
            <div data-reveal className="reveal text-center">
              <p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#d99a2b]">Project FAQs</p>
              <h2 className="mt-5 text-[clamp(3rem,5.8vw,6rem)] font-medium uppercase leading-[.88] tracking-[-.055em]">Questions before<br /><span className="text-[#d99a2b]">we get started?</span></h2>
            </div>
            <div className="mt-14 border-t border-[#061b36]/14">
              {faqs.map(([question, answer], index) => {
                const open = openFaq === index;
                return (
                  <div key={question} className="border-b border-[#061b36]/14">
                    <button onClick={() => setOpenFaq(open ? null : index)} className="flex w-full items-center justify-between gap-6 py-6 text-left sm:py-7">
                      <span className="text-lg font-semibold tracking-[-.025em] sm:text-xl">{question}</span>
                      <ChevronDown className={`h-5 w-5 shrink-0 text-[#d99a2b] transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                      <div className="overflow-hidden">
                        <p className="max-w-[850px] pb-7 text-sm leading-7 text-[#061b36]/58 sm:text-base">{answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="contact" className="relative overflow-hidden bg-[#061b36] py-24 text-white sm:py-28 lg:py-36">
          <div className="absolute right-[-12%] top-[-20%] h-[620px] w-[620px] rounded-full bg-[#d99a2b]/12 blur-[140px]" />
          <div className="relative mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-10">
            <div data-reveal className="reveal grid gap-14 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#d99a2b]">Start a Project</p>
                <h2 className="mt-5 max-w-[980px] text-[clamp(4rem,8vw,9rem)] font-medium uppercase leading-[.8] tracking-[-.065em]">Ready to<br /><span className="text-[#d99a2b]">build it right?</span></h2>
                <p className="mt-8 max-w-[690px] text-base leading-7 text-white/58 sm:text-lg">Tell us about your project type, location, scope and permitting needs. NGUYEN can help map the next steps from feasibility through approval.</p>
              </div>
              <div className="grid gap-3">
                <a href="mailto:info@nguyenarchitecture.com" className="group flex items-center justify-between rounded-md bg-[#d99a2b] p-5 text-[#061b36] transition hover:-translate-y-1">
                  <span className="font-bold">info@nguyenarchitecture.com</span><Mail className="h-5 w-5" />
                </a>
                <a href="tel:7147078889" className="flex items-center justify-between rounded-md border border-white/14 p-5 text-white/80 transition hover:bg-white/6">
                  <span>(714) 707-8889</span><Phone className="h-5 w-5 text-[#d99a2b]" />
                </a>
                <a href="tel:2092338888" className="flex items-center justify-between rounded-md border border-white/14 p-5 text-white/80 transition hover:bg-white/6">
                  <span>(209) 233-8888</span><Phone className="h-5 w-5 text-[#d99a2b]" />
                </a>
                <div className="flex items-start justify-between gap-4 rounded-md border border-white/14 p-5 text-white/70">
                  <span>7171 Warner Ave. Ste. B<br />Huntington Beach, CA 92647</span><MapPin className="h-5 w-5 shrink-0 text-[#d99a2b]" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#031329] text-white">
        <div className="mx-auto max-w-[1560px] px-5 py-10 sm:px-8 lg:px-10">
          <div className="grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <strong className="block text-2xl font-black tracking-[.18em]">NGUYEN</strong>
              <span className="mt-2 block text-[9px] font-bold uppercase tracking-[.22em] text-[#d99a2b]">Architecture & Engineering</span>
              <span className="mt-4 block text-[10px] uppercase tracking-[.16em] text-white/38">Design · Engineer · Permit</span>
            </div>
            <div className="flex flex-wrap gap-x-7 gap-y-3 text-xs text-white/48">
              <button onClick={() => scrollToId('about')}>About</button>
              <button onClick={() => scrollToId('services')}>Services</button>
              <button onClick={() => scrollToId('projects')}>Projects</button>
              <button onClick={() => scrollToId('process')}>Process</button>
              <button onClick={() => scrollToId('contact')}>Contact</button>
            </div>
          </div>
          <div className="flex flex-col gap-3 pt-6 text-[10px] uppercase tracking-[.12em] text-white/32 sm:flex-row sm:items-center sm:justify-between">
            <span>© NGUYEN Architecture & Engineering</span>
            <span>Commercial · Residential · ADU · Engineering · Permit</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
