'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Coffee, MapPin, Plus } from 'lucide-react';
import { useState } from 'react';

const colors = {
  cream: '#f9eedc',
  orange: '#ff8342',
  brown: '#7d2c0f',
  rust: '#af4f28',
  yellow: '#fed16a',
  green: '#485f4e',
  pale: '#fcf7ee',
};

const cafeImage = 'https://framerusercontent.com/images/9BOQjMuTjInl3CMPRrkdP4QKJZU.png?width=2440&height=2344';
const wideCafeImage = 'https://framerusercontent.com/images/sMRY0L6VTBO99vZ4afLEdx5uI.png?width=5280&height=570';
const heroVideo = 'https://framerusercontent.com/assets/v4aErQGkJo2Q26RGPB8Mac4c.mp4';

const drinks = [
  ['Cloud Cold Brew', 'Cold brew · vanilla cream', '$6.50', colors.yellow],
  ['Orange Espresso', 'Espresso · orange tonic', '$6.00', colors.orange],
  ['Brown Sugar Latte', 'Espresso · oat milk · brown sugar', '$6.75', '#ffe4bb'],
  ['Cocoa Cream', 'Cold brew · cocoa · sweet cream', '$6.50', '#e8b393'],
];

const faqs = [
  ['What makes Beanro coffee different?', 'We focus on balanced cold coffee, carefully layered flavors, and smooth textures built around specialty beans.'],
  ['Do you have non-dairy options?', 'Yes. Oat and almond milk are available for every milk-based drink.'],
  ['Can I reserve a table?', 'Yes. Reservations are available for small groups, meetings, and relaxed coffee dates.'],
  ['Do you sell whole beans?', 'Yes. Our rotating house beans are available in-store and online.'],
];

export function BeanroCoffeeDemo() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: colors.cream, color: colors.brown, fontFamily: 'Manrope, Arial, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Boldonse&family=Manrope:wght@400;500;600;700;800&display=swap');
        @keyframes beanroRise { from { opacity:0; transform:translateY(34px) } to { opacity:1; transform:translateY(0) } }
        @keyframes beanroFloat { 0%,100% { transform:translateY(0) rotate(7deg) } 50% { transform:translateY(-12px) rotate(11deg) } }
        @keyframes beanroMarquee { from { transform:translateX(0) } to { transform:translateX(-50%) } }
        .beanro-rise { animation:beanroRise .9s cubic-bezier(.22,1,.36,1) both; }
        .beanro-float { animation:beanroFloat 5s ease-in-out infinite; }
        .beanro-marquee { animation:beanroMarquee 18s linear infinite; }
        .beanro-display { font-family:'Boldonse', Impact, sans-serif; text-transform:uppercase; letter-spacing:-.055em; }
        @media (prefers-reduced-motion: reduce) { .beanro-rise,.beanro-float,.beanro-marquee { animation:none!important; } }
      `}</style>

      <div className="fixed left-4 top-4 z-[100] sm:left-6 sm:top-6">
        <Link href="/#portfolio" className="inline-flex items-center gap-2 rounded-full bg-[#fcf7ee]/90 px-4 py-2 text-xs font-semibold uppercase tracking-[.08em] shadow-lg backdrop-blur">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to portfolio
        </Link>
      </div>

      <header className="relative z-20 mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 py-6 sm:px-10 lg:px-[60px]">
        <div className="text-2xl font-extrabold tracking-[-.06em]">BEANRO</div>
        <nav className="hidden items-center gap-8 text-sm font-semibold md:flex">
          <a href="#menu">Menu</a><a href="#story">Our Story</a><a href="#locations">Locations</a><a href="#faq">FAQ</a>
        </nav>
        <a href="#locations" className="rounded-full px-5 py-3 text-sm font-bold" style={{ background: colors.orange, color: colors.cream }}>Find a café</a>
      </header>

      <main>
        <section className="mx-auto max-w-[1440px] px-5 pt-28 text-center sm:px-10 lg:px-[60px] lg:pt-36">
          <p className="beanro-rise mb-5 text-sm font-bold uppercase tracking-[.15em]" style={{ color: colors.rust }}>Specialty coffee · made to slow you down</p>
          <h1 className="beanro-display beanro-rise mx-auto max-w-[980px] text-[clamp(3rem,7vw,6.8rem)] leading-[1.08]">A New Standard For Premium Coffee</h1>
          <div className="relative mx-auto mt-16 max-w-[880px] pb-20">
            <div className="beanro-float absolute -left-2 -top-10 z-20 rounded-full px-4 py-2 text-sm font-bold uppercase sm:left-6" style={{ background: colors.yellow }}>Bold flavor</div>
            <div className="absolute -right-1 top-10 z-20 -rotate-6 rounded-full px-4 py-2 text-sm font-bold uppercase sm:right-4" style={{ background: colors.orange, color: colors.cream }}>Creamy texture</div>
            <video autoPlay muted loop playsInline preload="metadata" className="h-[260px] w-full rounded-[28px] object-cover sm:h-[420px] sm:rounded-[40px]">
              <source src={heroVideo} type="video/mp4" />
            </video>
          </div>
          <p className="mx-auto max-w-[650px] pb-28 text-base font-medium leading-relaxed sm:text-lg">
            At Beanro, cold coffee is more than just iced espresso — it’s a carefully layered experience. From slow-brewed coffee bases to rich cream finishes, every element is designed to create balance, depth, and smoothness in every cup.
          </p>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 pb-28 sm:px-10 lg:px-[60px]">
          <div className="relative overflow-hidden rounded-[28px] px-6 py-20 text-center sm:rounded-[60px] sm:px-12 sm:py-28" style={{ background: colors.brown, color: colors.pale }}>
            <span className="absolute left-[8%] top-[8%] rotate-[-8deg] rounded-full px-4 py-2 text-xs font-bold uppercase" style={{ background: colors.yellow, color: colors.brown }}>Bold flavor</span>
            <span className="absolute right-[7%] top-[20%] rotate-[9deg] rounded-full px-4 py-2 text-xs font-bold uppercase" style={{ background: colors.orange }}>Creamy texture</span>
            <span className="absolute bottom-[15%] left-[5%] rotate-[5deg] rounded-full px-4 py-2 text-xs font-bold uppercase" style={{ background: colors.green }}>Slow brewed</span>
            <h2 className="beanro-display mx-auto max-w-4xl text-[clamp(2.5rem,6vw,5rem)] leading-[1.15]">CHILL UP WITH EVERY SIP OF RICH, COLD COFFEE.</h2>
            <div className="mx-auto mt-12 h-1 w-20 rounded-full" style={{ background: colors.orange }} />
          </div>
        </section>

        <section id="menu" className="mx-auto max-w-[1320px] rounded-[28px] px-5 py-16 sm:px-10 sm:py-20 lg:px-[60px]" style={{ background: colors.pale }}>
          <div className="grid gap-8 md:grid-cols-2 md:items-end">
            <h2 className="beanro-display max-w-xl text-[clamp(2.2rem,4.5vw,4.6rem)] leading-[1.15]">Coffee built for every kind of pause.</h2>
            <p className="max-w-sm text-base font-semibold leading-relaxed md:ml-auto" style={{ color: colors.rust }}>Smooth, bold, creamy, bright — choose the coffee that matches your moment.</p>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {drinks.map(([name, detail, price, color], i) => (
              <article key={name} className="group min-h-[300px] overflow-hidden rounded-[28px] p-5 transition-transform duration-500 hover:-translate-y-2" style={{ background: color }}>
                <div className="flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between"><Coffee className="h-9 w-9" /><span className="text-sm font-extrabold">0{i + 1}</span></div>
                  <div><p className="mb-2 text-xl font-extrabold">{name}</p><p className="text-sm font-semibold opacity-70">{detail}</p><p className="mt-5 text-2xl font-extrabold">{price}</p></div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="story" className="mx-auto grid max-w-[1440px] gap-10 px-5 py-28 sm:px-10 lg:grid-cols-2 lg:items-center lg:px-[60px]">
          <div className="overflow-hidden rounded-[28px] sm:rounded-[60px]"><img src={cafeImage} alt="Modern Beanro cafe interior" className="h-[420px] w-full object-cover sm:h-[540px]" /></div>
          <div className="lg:pl-8">
            <p className="mb-5 text-sm font-bold uppercase tracking-[.15em]" style={{ color: colors.rust }}>All the moments that matter</p>
            <h2 className="beanro-display text-[clamp(2.4rem,4.5vw,4.8rem)] leading-[1.15]">More than coffee. A place to pause.</h2>
            <p className="mt-7 max-w-lg text-lg font-medium leading-relaxed" style={{ color: colors.rust }}>Beanro is more than coffee — it’s about creating space to pause, connect, and enjoy moments in your day.</p>
            <a href="#locations" className="mt-8 inline-flex items-center gap-3 rounded-full px-6 py-4 text-sm font-extrabold" style={{ background: colors.orange, color: colors.cream }}>Visit Beanro <ArrowRight className="h-4 w-4" /></a>
          </div>
        </section>

        <section className="overflow-hidden py-6" style={{ background: colors.orange, color: colors.cream }}>
          <div className="beanro-marquee flex w-max gap-10 whitespace-nowrap text-5xl font-extrabold uppercase sm:text-7xl">
            <span>COFFEE · CONNECTION · COLD BREW · SLOW MORNINGS ·</span><span>COFFEE · CONNECTION · COLD BREW · SLOW MORNINGS ·</span>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 py-28 sm:px-10 lg:px-[60px]">
          <div className="grid gap-8 md:grid-cols-2 md:items-end"><h2 className="beanro-display max-w-2xl text-[clamp(2.4rem,4.5vw,4.8rem)] leading-[1.15]">Loved by every coffee moment.</h2><p className="max-w-sm font-semibold leading-relaxed md:ml-auto" style={{ color: colors.rust }}>Real experiences from people who made Beanro part of their daily ritual.</p></div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              ['“My new favorite place to work for an hour and stay for two.”', 'Maya R.'],
              ['“The cold brew is ridiculously smooth. Nothing tastes rushed here.”', 'Jordan K.'],
              ['“The space feels playful, warm, and actually designed for people.”', 'Alex P.'],
            ].map(([quote, person], i) => <blockquote key={person} className="rounded-[28px] p-7" style={{ background: i === 1 ? colors.yellow : colors.pale }}><p className="text-xl font-bold leading-snug">{quote}</p><footer className="mt-10 text-sm font-extrabold uppercase">{person}</footer></blockquote>)}
          </div>
        </section>

        <section id="locations" className="mx-auto max-w-[1440px] px-5 pb-28 sm:px-10 lg:px-[60px]">
          <div className="overflow-hidden rounded-[28px] sm:rounded-[60px]" style={{ background: colors.green, color: colors.cream }}>
            <img src={wideCafeImage} alt="Beanro cafe" className="h-[180px] w-full object-cover sm:h-[260px]" />
            <div className="grid gap-8 p-7 sm:p-10 md:grid-cols-2 md:items-end lg:p-14">
              <div><p className="mb-3 text-sm font-bold uppercase tracking-[.15em]">Come say hello</p><h2 className="beanro-display text-[clamp(2.3rem,4.5vw,4.8rem)] leading-[1.15]">Your next coffee break starts here.</h2></div>
              <div className="md:ml-auto"><p className="flex items-center gap-2 text-lg font-bold"><MapPin className="h-5 w-5" /> 128 Roast Street · Costa Mesa, CA</p><p className="mt-3 opacity-80">Mon–Fri 7–6 · Sat–Sun 8–5</p><button className="mt-6 rounded-full px-6 py-4 text-sm font-extrabold" style={{ background: colors.yellow, color: colors.brown }}>Reserve a table</button></div>
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-[1180px] px-5 pb-28 sm:px-10">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div><h2 className="beanro-display text-[clamp(2.3rem,4vw,4rem)] leading-[1.15]">Frequently Asked Questions</h2><p className="mt-5 max-w-sm font-semibold" style={{ color: colors.rust }}>Everything you need before your next Beanro ritual.</p></div>
            <div className="space-y-3">{faqs.map(([q, a], i) => <button key={q} type="button" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} className="w-full rounded-[24px] p-5 text-left" style={{ background: colors.pale }}><div className="flex items-center justify-between gap-4"><span className="font-extrabold">{q}</span><Plus className={`h-5 w-5 transition-transform ${openFaq === i ? 'rotate-45' : ''}`} /></div>{openFaq === i && <p className="mt-4 max-w-2xl pr-8 text-sm font-semibold leading-relaxed" style={{ color: colors.rust }}>{a}</p>}</button>)}</div>
          </div>
        </section>
      </main>

      <footer className="px-5 pb-8 sm:px-10 lg:px-[60px]">
        <div className="rounded-[28px] px-6 py-12 sm:px-10" style={{ background: colors.brown, color: colors.cream }}>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><div className="text-3xl font-extrabold tracking-[-.06em]">BEANRO</div><p className="mt-3 max-w-sm opacity-70">Specialty coffee for slower moments.</p></div><div className="text-sm font-semibold opacity-70">© 2026 Beanro Coffee · Demo by DesignedbyTD</div></div>
        </div>
      </footer>
    </div>
  );
}
