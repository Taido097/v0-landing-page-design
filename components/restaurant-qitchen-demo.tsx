'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Clock3,
  MapPin,
  Menu as MenuIcon,
  Sparkles,
  Users,
  X,
} from 'lucide-react';

type View = 'home' | 'menu' | 'about' | 'reserve';
type MenuCategory = 'Dinner' | 'Small Plates' | 'Dessert';

const images = {
  hero: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=2200&q=90',
  menu: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1500&q=88',
  reserve: 'https://images.unsplash.com/photo-1516211697506-8360dbcfe9a4?auto=format&fit=crop&w=1500&q=88',
  about: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1500&q=88',
  chef: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1400&q=88',
  dining: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1500&q=88',
};

const menuItems: Record<MenuCategory, { name: string; price: string; description: string }[]> = {
  Dinner: [
    { name: 'Ember Short Rib', price: '$34', description: 'Red wine jus · charred onion · smoked potato' },
    { name: 'Cedar Salmon', price: '$29', description: 'Brown butter · summer squash · preserved lemon' },
    { name: 'Wild Mushroom Risotto', price: '$25', description: 'Parmesan · herbs · roasted maitake' },
    { name: 'Fire-Roasted Chicken', price: '$28', description: 'Herb jus · crispy skin · market vegetables' },
  ],
  'Small Plates': [
    { name: 'Whipped Ricotta', price: '$14', description: 'Hot honey · grilled sourdough · sea salt' },
    { name: 'Crispy Potatoes', price: '$12', description: 'Smoked aioli · scallion · chili oil' },
    { name: 'Beef Tartare', price: '$18', description: 'Caper · mustard seed · rye crisp' },
    { name: 'Market Greens', price: '$13', description: 'Pear · toasted walnut · champagne vinaigrette' },
  ],
  Dessert: [
    { name: 'Dark Chocolate Torte', price: '$13', description: 'Espresso cream · cacao nib · sea salt' },
    { name: 'Burnt Honey Panna Cotta', price: '$12', description: 'Citrus · pistachio · olive oil' },
    { name: 'Seasonal Sorbet', price: '$10', description: 'Daily fruit · sparkling wine' },
  ],
};

export function RestaurantQitchenDemo() {
  const [view, setView] = useState<View>('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState<MenuCategory>('Dinner');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMenuOpen(false);
  }, [view]);

  const go = (next: View) => setView(next);

  return (
    <main className="min-h-screen bg-[#11100d] text-[#f4efe6] selection:bg-[#d9b36c] selection:text-black">
      <style>{`
        @keyframes restaurantFade { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes restaurantDrift { 0%,100% { transform: scale(1.04) translate3d(0,0,0); } 50% { transform: scale(1.08) translate3d(-1.5%, -1%, 0); } }
        @keyframes restaurantLine { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .restaurant-view { animation: restaurantFade .65s cubic-bezier(.22,1,.36,1) both; }
        .restaurant-hero-image { animation: restaurantDrift 16s ease-in-out infinite; }
        .restaurant-line { transform-origin: left; animation: restaurantLine .9s .2s cubic-bezier(.22,1,.36,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .restaurant-view,.restaurant-hero-image,.restaurant-line { animation: none !important; }
        }
      `}</style>

      <RestaurantTopbar view={view} onNavigate={go} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <div key={view} className="restaurant-view">
        {view === 'home' && <RestaurantHome onNavigate={go} />}
        {view === 'menu' && <RestaurantMenu category={category} setCategory={setCategory} onNavigate={go} />}
        {view === 'about' && <RestaurantAbout onNavigate={go} />}
        {view === 'reserve' && <RestaurantReserve submitted={submitted} onSubmit={() => setSubmitted(true)} />}
      </div>
    </main>
  );
}

function RestaurantTopbar({
  view,
  onNavigate,
  menuOpen,
  setMenuOpen,
}: {
  view: View;
  onNavigate: (view: View) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}) {
  const nav: { label: string; view: View }[] = [
    { label: 'Menu', view: 'menu' },
    { label: 'About', view: 'about' },
    { label: 'Book a Table', view: 'reserve' },
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[80] border-b border-white/10 bg-[#11100d]/78 backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <div className="flex items-center gap-5">
            <Link
              href="/#portfolio"
              aria-label="Back to DesignedbyTD portfolio"
              className="grid h-10 w-10 place-items-center border border-white/15 text-white/70 transition hover:border-white/45 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <button type="button" onClick={() => onNavigate('home')} className="text-left">
              <span className="block text-sm font-semibold uppercase tracking-[.28em]">Harvest</span>
              <span className="block text-[9px] uppercase tracking-[.42em] text-[#d9b36c]">& Ember</span>
            </button>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => onNavigate(item.view)}
                className={`text-[11px] font-semibold uppercase tracking-[.18em] transition ${
                  view === item.view ? 'text-[#d9b36c]' : 'text-white/60 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open restaurant navigation"
            className="grid h-10 w-10 place-items-center border border-white/15 text-white md:hidden"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[75] grid place-items-center bg-[#11100d] px-6 pt-20 md:hidden">
          <div className="flex flex-col items-center gap-7">
            {nav.map((item, index) => (
              <button
                key={item.label}
                type="button"
                onClick={() => onNavigate(item.view)}
                className="group flex items-center gap-4 text-3xl font-medium"
              >
                <span className="text-xs text-[#d9b36c]">0{index + 1}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function RestaurantHome({ onNavigate }: { onNavigate: (view: View) => void }) {
  const cards: { title: string; view: View; image: string; index: string }[] = [
    { title: 'Explore the Menu', view: 'menu', image: images.menu, index: '01' },
    { title: 'Book Your Table', view: 'reserve', image: images.reserve, index: '02' },
    { title: 'Our Restaurant', view: 'about', image: images.about, index: '03' },
  ];

  return (
    <section className="min-h-screen pt-[74px] lg:h-screen lg:overflow-hidden">
      <div className="grid min-h-[calc(100vh-74px)] lg:grid-cols-[minmax(0,1.12fr)_minmax(520px,.88fr)]">
        <div className="relative min-h-[660px] overflow-hidden border-r border-white/10 lg:min-h-0">
          <img src={images.hero} alt="Harvest & Ember dining" className="restaurant-hero-image absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,11,9,.82)_0%,rgba(12,11,9,.3)_58%,rgba(12,11,9,.05)_100%),linear-gradient(to_top,rgba(12,11,9,.7),transparent_55%)]" />

          <div className="relative flex h-full min-h-[660px] flex-col justify-end p-6 sm:p-10 lg:min-h-0 lg:p-12 xl:p-16">
            <div className="max-w-3xl pb-10 lg:pb-0">
              <div className="mb-7 flex items-center gap-4">
                <span className="h-px w-12 bg-[#d9b36c]" />
                <p className="text-[10px] font-semibold uppercase tracking-[.32em] text-[#d9b36c]">Wood fire · seasonal kitchen</p>
              </div>
              <h1 className="max-w-3xl text-5xl font-medium leading-[.92] tracking-[-.055em] sm:text-7xl lg:text-[clamp(4.4rem,6.2vw,7.2rem)]">
                Dinner made for <span className="font-light italic text-[#d9b36c]">staying awhile.</span>
              </h1>
              <p className="mt-7 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
                Fire-driven cooking, thoughtful cocktails, and a room designed for long conversations.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('reserve')}
                className="mt-9 inline-flex items-center gap-5 border border-[#d9b36c] bg-[#d9b36c] px-6 py-4 text-xs font-semibold uppercase tracking-[.16em] text-[#11100d] transition hover:bg-transparent hover:text-[#d9b36c]"
              >
                Reserve a table <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="absolute right-5 top-5 hidden border border-white/15 bg-black/20 px-4 py-3 backdrop-blur-md sm:block lg:right-8 lg:top-8">
            <p className="text-[9px] uppercase tracking-[.18em] text-white/45">Tonight</p>
            <p className="mt-1 text-xs font-medium">Dinner · 5 PM — 11 PM</p>
          </div>
        </div>

        <div className="grid bg-[#171510] lg:grid-rows-3">
          {cards.map((card) => (
            <button
              key={card.title}
              type="button"
              onClick={() => onNavigate(card.view)}
              className="group relative min-h-[250px] overflow-hidden border-b border-white/10 text-left last:border-b-0 lg:min-h-0"
            >
              <img
                src={card.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-45 transition duration-1000 ease-out group-hover:scale-[1.06] group-hover:opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent" />
              <div className="relative flex h-full min-h-[250px] items-end justify-between gap-5 p-7 lg:min-h-0 lg:p-8">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[.22em] text-[#d9b36c]">{card.index}</p>
                  <h2 className="mt-2 text-2xl font-medium tracking-[-.03em] sm:text-3xl">{card.title}</h2>
                </div>
                <span className="grid h-11 w-11 shrink-0 place-items-center border border-white/25 transition duration-500 group-hover:border-[#d9b36c] group-hover:bg-[#d9b36c] group-hover:text-black">
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function RestaurantMenu({
  category,
  setCategory,
  onNavigate,
}: {
  category: MenuCategory;
  setCategory: (category: MenuCategory) => void;
  onNavigate: (view: View) => void;
}) {
  const categories = Object.keys(menuItems) as MenuCategory[];

  return (
    <section className="pt-[74px]">
      <div className="grid min-h-[calc(100vh-74px)] lg:grid-cols-[.8fr_1.2fr]">
        <div className="relative min-h-[460px] overflow-hidden border-r border-white/10 lg:sticky lg:top-[74px] lg:h-[calc(100vh-74px)]">
          <img src={images.menu} alt="Seasonal restaurant dish" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
          <div className="relative flex h-full min-h-[460px] flex-col justify-end p-8 sm:p-12 lg:min-h-0">
            <p className="text-[10px] uppercase tracking-[.28em] text-[#d9b36c]">Seasonal kitchen</p>
            <h1 className="mt-4 text-6xl font-medium tracking-[-.06em] sm:text-7xl">Menu</h1>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">A changing menu built around the best ingredients we can get our hands on.</p>
          </div>
        </div>

        <div className="bg-[#f1ece2] px-6 py-12 text-[#171510] sm:px-10 lg:px-14 lg:py-16 xl:px-20">
          <div className="sticky top-[74px] z-20 -mx-6 mb-12 border-b border-black/10 bg-[#f1ece2]/95 px-6 py-5 backdrop-blur sm:-mx-10 sm:px-10 lg:-mx-14 lg:px-14 xl:-mx-20 xl:px-20">
            <div className="flex gap-6 overflow-x-auto">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`shrink-0 border-b pb-2 text-[11px] font-semibold uppercase tracking-[.16em] transition ${
                    category === item ? 'border-black text-black' : 'border-transparent text-black/40 hover:text-black'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div key={category} className="restaurant-view">
            <div className="flex items-end justify-between border-b border-black/15 pb-7">
              <div>
                <p className="text-[10px] uppercase tracking-[.22em] text-black/45">Current selection</p>
                <h2 className="mt-2 text-4xl font-medium tracking-[-.04em] sm:text-5xl">{category}</h2>
              </div>
              <Sparkles className="h-5 w-5 text-black/25" />
            </div>

            <div className="divide-y divide-black/12">
              {menuItems[category].map((item, index) => (
                <article key={item.name} className="group grid gap-4 py-8 sm:grid-cols-[44px_1fr_auto] sm:items-start">
                  <span className="text-[10px] font-semibold tracking-[.18em] text-black/30">0{index + 1}</span>
                  <div>
                    <h3 className="text-xl font-medium tracking-[-.025em] transition group-hover:translate-x-1">{item.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-black/50">{item.description}</p>
                  </div>
                  <p className="text-sm font-semibold">{item.price}</p>
                </article>
              ))}
            </div>

            <button
              type="button"
              onClick={() => onNavigate('reserve')}
              className="mt-10 inline-flex items-center gap-4 border border-black bg-black px-6 py-4 text-xs font-semibold uppercase tracking-[.15em] text-white transition hover:bg-transparent hover:text-black"
            >
              Book your table <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function RestaurantAbout({ onNavigate }: { onNavigate: (view: View) => void }) {
  return (
    <section className="pt-[74px]">
      <div className="mx-auto max-w-[1600px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        <div className="grid gap-px bg-white/10 lg:grid-cols-2">
          <div className="bg-[#171510] p-8 sm:p-12 lg:p-16">
            <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-[#d9b36c]">Our restaurant</p>
            <h1 className="mt-5 max-w-xl text-5xl font-medium leading-[.98] tracking-[-.055em] sm:text-6xl lg:text-7xl">
              Built around the <span className="font-light italic text-[#d9b36c]">fire.</span>
            </h1>
            <p className="mt-8 max-w-lg text-base leading-8 text-white/58">
              Harvest & Ember is a neighborhood dining room centered on open-fire cooking, seasonal produce, and the belief that hospitality should feel effortless.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('reserve')}
              className="mt-10 inline-flex items-center gap-4 border border-[#d9b36c] px-6 py-4 text-xs font-semibold uppercase tracking-[.15em] text-[#d9b36c] transition hover:bg-[#d9b36c] hover:text-black"
            >
              Join us tonight <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="min-h-[520px] overflow-hidden bg-[#171510]">
            <img src={images.chef} alt="Chef preparing dinner" className="h-full w-full object-cover transition duration-[1400ms] hover:scale-[1.035]" />
          </div>
        </div>

        <div className="mt-px grid gap-px bg-white/10 md:grid-cols-3">
          {[
            ['01', 'Seasonal', 'Menus change with the market, not the calendar.'],
            ['02', 'Fire driven', 'Wood, flame, smoke, and restraint guide the kitchen.'],
            ['03', 'Hospitality first', 'Warm service without the formality.'],
          ].map(([num, title, copy]) => (
            <div key={num} className="bg-[#171510] p-8 sm:p-10">
              <p className="text-[10px] tracking-[.2em] text-[#d9b36c]">{num}</p>
              <h2 className="mt-8 text-2xl font-medium">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-white/50">{copy}</p>
            </div>
          ))}
        </div>

        <div className="relative mt-px min-h-[420px] overflow-hidden">
          <img src={images.dining} alt="Harvest and Ember dining room" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-black/15" />
          <div className="relative flex min-h-[420px] max-w-xl flex-col justify-end p-8 sm:p-12">
            <MapPin className="h-5 w-5 text-[#d9b36c]" />
            <h2 className="mt-5 text-4xl font-medium tracking-[-.04em]">Meet us in the neighborhood.</h2>
            <p className="mt-4 text-sm leading-7 text-white/60">Orange County, California · Dinner Tuesday through Sunday.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function RestaurantReserve({ submitted, onSubmit }: { submitted: boolean; onSubmit: () => void }) {
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <section className="pt-[74px]">
      <div className="grid min-h-[calc(100vh-74px)] lg:grid-cols-2">
        <div className="relative hidden overflow-hidden border-r border-white/10 lg:block">
          <img src={images.reserve} alt="Restaurant table set for dinner" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />
          <div className="relative flex h-full flex-col justify-end p-14">
            <p className="text-[10px] uppercase tracking-[.28em] text-[#d9b36c]">A table is waiting</p>
            <h1 className="mt-4 max-w-xl text-7xl font-medium leading-[.92] tracking-[-.055em]">Make a night of it.</h1>
          </div>
        </div>

        <div className="flex items-center bg-[#f1ece2] px-6 py-14 text-[#171510] sm:px-10 lg:px-16 xl:px-24">
          <div className="w-full max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-black/40">Reservations</p>
            <h2 className="mt-4 text-5xl font-medium tracking-[-.055em] sm:text-6xl">Book a Table</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-black/50">Choose your date, time, and party size. This is a demo reservation experience for the portfolio sample.</p>

            {submitted ? (
              <div className="mt-12 border border-black/15 bg-white/45 p-8 sm:p-10">
                <div className="grid h-12 w-12 place-items-center bg-black text-white">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <h3 className="mt-7 text-3xl font-medium tracking-[-.04em]">Your demo reservation is set.</h3>
                <p className="mt-3 text-sm leading-7 text-black/50">No real booking was submitted. This interaction demonstrates how a restaurant client’s reservation flow could feel.</p>
                <button type="button" onClick={() => window.location.reload()} className="mt-7 border-b border-black pb-1 text-xs font-semibold uppercase tracking-[.15em]">Start over</button>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-10 space-y-7">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Name"><input required placeholder="Your name" className="w-full border-b border-black/20 bg-transparent py-3 text-sm outline-none transition focus:border-black" /></Field>
                  <Field label="Email"><input required type="email" placeholder="you@example.com" className="w-full border-b border-black/20 bg-transparent py-3 text-sm outline-none transition focus:border-black" /></Field>
                </div>
                <div className="grid gap-6 sm:grid-cols-3">
                  <Field label="Date" icon={<CalendarDays className="h-4 w-4" />}><input required type="date" className="w-full border-b border-black/20 bg-transparent py-3 text-sm outline-none transition focus:border-black" /></Field>
                  <Field label="Time" icon={<Clock3 className="h-4 w-4" />}><select className="w-full border-b border-black/20 bg-transparent py-3 text-sm outline-none transition focus:border-black"><option>6:00 PM</option><option>7:00 PM</option><option>8:00 PM</option><option>9:00 PM</option></select></Field>
                  <Field label="Guests" icon={<Users className="h-4 w-4" />}><select className="w-full border-b border-black/20 bg-transparent py-3 text-sm outline-none transition focus:border-black"><option>2 Guests</option><option>3 Guests</option><option>4 Guests</option><option>5+ Guests</option></select></Field>
                </div>
                <button type="submit" className="group mt-3 flex w-full items-center justify-between border border-black bg-black px-6 py-5 text-xs font-semibold uppercase tracking-[.16em] text-white transition hover:bg-transparent hover:text-black">
                  Request reservation <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, icon, children }: { label: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.17em] text-black/45">
        {icon}{label}
      </span>
      {children}
    </label>
  );
}
