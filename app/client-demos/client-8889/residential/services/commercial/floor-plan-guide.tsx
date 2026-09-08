'use client';
import { useState } from 'react';

const BASE = '/client-8889/residential/floor-plans';

type Plan = {
  sqft: string;
  name: string;
  desc: string;
  src: string;
  alt: string;
};

type Tab = {
  id: string;
  label: string;
  heading: string;
  subheading: string;
  tagline: string[];
  features: { icon: string; label: string }[];
  plans: Plan[];
};

const TABS: Tab[] = [
  {
    id: 'retail',
    label: 'Retail',
    heading: 'Explore Retail Spaces',
    subheading: 'Layouts crafted for customer flow, curated display, and high-impact brand presence.',
    tagline: ['DESIGNED', 'FOR', 'COMMERCE,', 'BUILT', 'FOR', 'PEOPLE'],
    features: [
      { icon: '⬡', label: 'Customer Flow Optimization' },
      { icon: '⬡', label: 'Display Zone Flexibility' },
      { icon: '⬡', label: 'Back-of-House Efficiency' },
    ],
    plans: [
      {
        sqft: '1,200 SQ FT',
        name: 'The Boutique Storefront',
        desc: 'An intimate retail layout optimized for curated product display and personalized customer engagement.',
        src: `${BASE}/retail/retail_size_1.png`,
        alt: 'Retail boutique storefront 1,200 sq ft floor plan',
      },
      {
        sqft: '2,500 SQ FT',
        name: 'The Mid-Size Retail',
        desc: 'A flexible floor plan with dedicated display zones, fitting rooms, and a welcoming entry sequence.',
        src: `${BASE}/retail/retail_size_2.png`,
        alt: 'Retail mid-size 2,500 sq ft floor plan',
      },
      {
        sqft: '4,000 SQ FT',
        name: 'The Flagship Store',
        desc: 'A spacious retail environment with multiple display zones, a private consultation area, and a statement entrance.',
        src: `${BASE}/retail/retail_size_3.png`,
        alt: 'Retail flagship store 4,000 sq ft floor plan',
      },
    ],
  },
  {
    id: 'office',
    label: 'Office',
    heading: 'Explore Office Spaces',
    subheading: 'Professional environments designed for focus, collaboration, and organizational identity.',
    tagline: ['SPACES', 'THAT', 'INSPIRE', 'PEOPLE', 'TO DO', 'GREAT WORK'],
    features: [
      { icon: '⬡', label: 'Collaborative Zones' },
      { icon: '⬡', label: 'Private Focus Areas' },
      { icon: '⬡', label: 'Conference Facilities' },
    ],
    plans: [
      {
        sqft: '1,400 SQ FT',
        name: 'The Studio Suite',
        desc: 'A compact, collaborative workspace with private focus areas, open work zones, and a welcoming reception.',
        src: `${BASE}/office/office_size_1.png`,
        alt: 'Office studio suite 1,400 sq ft floor plan',
      },
      {
        sqft: '2,800 SQ FT',
        name: 'The Professional Office',
        desc: 'A balanced floor plan with private offices, open collaboration areas, and a dedicated conference room.',
        src: `${BASE}/office/office_size_2.png`,
        alt: 'Office professional 2,800 sq ft floor plan',
      },
      {
        sqft: '4,500 SQ FT',
        name: 'The Corporate Floor',
        desc: 'A comprehensive office suite with executive offices, large conference facilities, and expansive collaborative zones.',
        src: `${BASE}/office/office_size_3.png`,
        alt: 'Office corporate floor 4,500 sq ft floor plan',
      },
    ],
  },
  {
    id: 'restaurant',
    label: 'Restaurant / Café',
    heading: 'Explore Restaurant & Café Spaces',
    subheading: 'Layouts crafted for hospitality, service flow, and memorable guest experiences.',
    tagline: ['GOOD', 'FOOD', 'BUILDS', 'BRIGHTER', 'TOMORROWS'],
    features: [
      { icon: '⬡', label: 'Seamless Service Flow' },
      { icon: '⬡', label: 'Flexible Seating Zones' },
      { icon: '⬡', label: 'Indoor / Outdoor Experience' },
    ],
    plans: [
      {
        sqft: '1,600 SQ FT',
        name: 'The Neighborhood Café',
        desc: 'A compact, efficient layout perfect for boutique cafés, with inviting seating and a streamlined service counter.',
        src: `${BASE}/restaurant_cafe/restaurant_cafe_size_1.png`,
        alt: 'Restaurant neighborhood café 1,600 sq ft floor plan',
      },
      {
        sqft: '2,400 SQ FT',
        name: 'The Modern Bistro',
        desc: 'A versatile layout with a spacious dining room, central bar, and open kitchen concept.',
        src: `${BASE}/restaurant_cafe/restaurant_cafe_size_2.png`,
        alt: 'Restaurant modern bistro 2,400 sq ft floor plan',
      },
      {
        sqft: '3,200 SQ FT',
        name: 'The Signature Hospitality Plan',
        desc: 'A refined layout designed for modern dining experiences, with an efficient service flow, a welcoming atmosphere, and seamless indoor-outdoor connection.',
        src: `${BASE}/restaurant_cafe/restaurant_cafe_size_3.png`,
        alt: 'Restaurant signature hospitality 3,200 sq ft floor plan',
      },
    ],
  },
];

const CSS = `
/* ── Commercial Floor Plan Guide ── */
.cfpg{
  --cfpg-bg:#f5f2eb;
  --cfpg-surface:#faf8f3;
  --cfpg-line:#ddd5c4;
  --cfpg-ink:#1a1814;
  --cfpg-muted:#6b6358;
  --cfpg-soft:#9a9188;
  --cfpg-gold:#b3894f;
  margin-top:clamp(40px,5vw,72px);
  background:var(--cfpg-bg);
  border-top:1px solid var(--cfpg-line);
  border-bottom:1px solid var(--cfpg-line);
  /* true full-viewport width, break out of nrd-shell */
  width:100vw;
  margin-left:50%;
  transform:translateX(-50%);
  padding:clamp(32px,4vw,60px) clamp(20px,4vw,72px) clamp(28px,4vw,52px);
}
.cfpg *{box-sizing:border-box}
/* ── Section label row ── */
.cfpg-label-row{display:flex;align-items:center;gap:16px;margin:0 0 clamp(20px,2.8vw,36px)}
.cfpg-label-line{flex:none;width:40px;height:1px;background:var(--cfpg-ink)}
.cfpg-label{font-size:11px;letter-spacing:.22em;text-transform:uppercase;font-weight:600;color:var(--cfpg-ink);margin:0}
/* ── Main 3-column grid: narrow left | dominant center | narrow right ── */
.cfpg-main{display:grid;grid-template-columns:210px 1fr 270px;gap:clamp(20px,2.4vw,32px);align-items:start}
/* ── LEFT PANEL ── */
.cfpg-left{display:flex;flex-direction:column;justify-content:space-between;min-height:620px;padding-right:clamp(16px,2vw,28px);border-right:1px solid var(--cfpg-line)}
.cfpg-left-heading{font-size:clamp(20px,2.2vw,32px);line-height:1.06;font-weight:600;letter-spacing:-.015em;color:var(--cfpg-ink);margin:0 0 14px}
.cfpg-left-desc{font-size:13px;line-height:1.6;color:var(--cfpg-muted);margin:0;max-width:26ch}
.cfpg-left-divider{width:36px;height:1px;background:var(--cfpg-line);margin:20px 0}
.cfpg-tagline{display:flex;flex-direction:column;gap:2px}
.cfpg-tagline span{font-size:10.5px;letter-spacing:.18em;text-transform:uppercase;font-weight:600;color:var(--cfpg-soft);line-height:1.4}
/* ── CENTER: dominant featured image ── */
.cfpg-center{display:flex;flex-direction:column}
.cfpg-featured-wrap{
  width:100%;
  height:620px;
  background:#fff;
  border:1px solid var(--cfpg-line);
  display:flex;
  align-items:center;
  justify-content:center;
  padding:8px;
  overflow:hidden;
}
.cfpg-featured-wrap img{max-width:100%;max-height:100%;object-fit:contain;display:block}
/* ── RIGHT PANEL ── */
.cfpg-right{display:flex;flex-direction:column;padding-left:clamp(16px,2vw,28px);border-left:1px solid var(--cfpg-line)}
/* Tabs */
.cfpg-tabs{display:flex;gap:0;border-bottom:1px solid var(--cfpg-line);margin:0 0 clamp(16px,2vw,24px)}
.cfpg-tab{background:transparent;border:0;border-bottom:2px solid transparent;padding:10px 0;margin-right:clamp(12px,1.6vw,22px);margin-bottom:-1px;font-size:12.5px;font-weight:500;letter-spacing:.02em;color:var(--cfpg-muted);cursor:pointer;transition:color .2s,border-color .2s;font-family:inherit;white-space:nowrap}
.cfpg-tab:hover{color:var(--cfpg-ink)}
.cfpg-tab.is-active{color:var(--cfpg-ink);border-bottom-color:var(--cfpg-ink)}
/* Plan info */
.cfpg-plan-eyebrow{font-size:10px;letter-spacing:.2em;text-transform:uppercase;font-weight:600;color:var(--cfpg-soft);margin:0 0 6px;display:flex;align-items:center;gap:10px}
.cfpg-plan-eyebrow::before{content:"";display:inline-block;width:22px;height:1px;background:var(--cfpg-gold)}
.cfpg-plan-sqft{font-size:clamp(15px,1.5vw,20px);font-weight:700;letter-spacing:.05em;color:var(--cfpg-ink);margin:0 0 6px;text-transform:uppercase}
.cfpg-plan-name{font-size:clamp(18px,1.9vw,26px);font-weight:600;line-height:1.1;letter-spacing:-.01em;color:var(--cfpg-ink);margin:0 0 10px}
.cfpg-plan-divider{height:1px;background:var(--cfpg-line);margin:0 0 12px}
.cfpg-plan-desc{font-size:12.5px;line-height:1.65;color:var(--cfpg-muted);margin:0 0 clamp(14px,1.8vw,22px)}
/* Feature icons */
.cfpg-features{display:flex;flex-direction:column;gap:12px;padding:clamp(12px,1.6vw,20px) 0;border-top:1px solid var(--cfpg-line);border-bottom:1px solid var(--cfpg-line);margin-bottom:clamp(16px,2vw,24px)}
.cfpg-feature{display:flex;align-items:center;gap:12px}
.cfpg-feature-icon{width:34px;height:34px;border:1px solid var(--cfpg-line);border-radius:50%;display:flex;align-items:center;justify-content:center;flex:none}
.cfpg-feature-icon svg{color:var(--cfpg-ink);opacity:.75}
.cfpg-feature-label{font-size:11px;letter-spacing:.07em;text-transform:uppercase;font-weight:600;color:var(--cfpg-ink);line-height:1.3}
/* Bottom plan cards — span all 3 columns */
.cfpg-cards{grid-column:1/4;margin-top:clamp(24px,3vw,40px);display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(12px,1.4vw,20px)}
.cfpg-card{display:flex;flex-direction:column;background:var(--cfpg-surface);border:1px solid var(--cfpg-line);cursor:pointer;transition:border-color .2s;text-align:left;padding:0;font-family:inherit}
.cfpg-card:hover{border-color:var(--cfpg-gold)}
.cfpg-card.is-active{border-color:var(--cfpg-ink);box-shadow:0 0 0 1px var(--cfpg-ink)}
.cfpg-card-img{width:100%;background:#fff;display:flex;align-items:center;justify-content:center;padding:12px;height:160px}
.cfpg-card-img img{max-width:100%;max-height:100%;object-fit:contain;display:block}
.cfpg-card-body{padding:14px 16px 16px;border-top:1px solid var(--cfpg-line)}
.cfpg-card-sqft{font-size:10px;letter-spacing:.18em;text-transform:uppercase;font-weight:700;color:var(--cfpg-soft);margin:0 0 4px}
.cfpg-card-name{font-size:13px;font-weight:600;line-height:1.25;color:var(--cfpg-ink);margin:0 0 6px}
.cfpg-card-desc{font-size:11.5px;line-height:1.5;color:var(--cfpg-muted);margin:0 0 12px}
.cfpg-card-cta{font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;font-weight:700;color:var(--cfpg-ink);display:inline-flex;align-items:center;gap:6px}
.cfpg-card.is-active .cfpg-card-sqft{color:var(--cfpg-gold)}
/* ── Responsive ── */
@media(max-width:1024px){
  .cfpg-main{grid-template-columns:1fr 1fr;grid-template-rows:auto}
  .cfpg-left{grid-column:1/3;flex-direction:row;align-items:flex-start;min-height:auto;border-right:0;border-bottom:1px solid var(--cfpg-line);padding-right:0;padding-bottom:clamp(18px,2.4vw,28px);gap:clamp(24px,3vw,44px)}
  .cfpg-left-divider{display:none}
  .cfpg-tagline{display:none}
  .cfpg-center{grid-column:1}
  .cfpg-featured-wrap{height:480px}
  .cfpg-right{grid-column:2;border-left:0;padding-left:0}
  .cfpg-cards{grid-column:1/3}
}
@media(max-width:680px){
  .cfpg-main{grid-template-columns:1fr}
  .cfpg-left{grid-column:1;flex-direction:column;gap:0}
  .cfpg-center{grid-column:1}
  .cfpg-featured-wrap{height:320px;padding:4px}
  .cfpg-right{grid-column:1;border-left:0;padding-left:0;margin-top:clamp(14px,1.8vw,20px)}
  .cfpg-cards{grid-column:1}
  .cfpg-card-img{height:130px}
}
@media(max-width:480px){
  .cfpg-tabs{overflow-x:auto;-webkit-overflow-scrolling:touch}
  .cfpg-tab{font-size:11.5px;padding:9px 0;margin-right:14px}
  .cfpg-cards{grid-template-columns:1fr}
  .cfpg-card-img{height:160px}
}
`;

function FeatureIcon({ label }: { label: string }) {
  let icon = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/>
    </svg>
  );
  if (label.toLowerCase().includes('flow') || label.toLowerCase().includes('service')) {
    icon = (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h18M3 6h18M3 18h18"/>
      </svg>
    );
  } else if (label.toLowerCase().includes('seating') || label.toLowerCase().includes('zone') || label.toLowerCase().includes('display') || label.toLowerCase().includes('collaborative')) {
    icon = (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    );
  } else if (label.toLowerCase().includes('outdoor') || label.toLowerCase().includes('experience') || label.toLowerCase().includes('focus') || label.toLowerCase().includes('boutique') || label.toLowerCase().includes('consultation')) {
    icon = (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    );
  } else if (label.toLowerCase().includes('efficiency') || label.toLowerCase().includes('conference') || label.toLowerCase().includes('back')) {
    icon = (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    );
  }
  return (
    <div className="cfpg-feature-icon">{icon}</div>
  );
}

export default function CommercialFloorPlanGuide() {
  const [activeTab, setActiveTab] = useState(2); // default: Restaurant / Café (matches reference)
  const [activePlan, setActivePlan] = useState(2); // default: largest plan

  const tab = TABS[activeTab];
  const plan = tab.plans[activePlan];

  function handleTabChange(idx: number) {
    setActiveTab(idx);
    setActivePlan(2);
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <section className="cfpg" aria-label="Commercial Floor Plan Guide">
        <div className="cfpg-label-row">
          <span className="cfpg-label-line" aria-hidden="true" />
          <p className="cfpg-label">Commercial Floor Plan Guide</p>
        </div>

        <div className="cfpg-main">
          {/* LEFT: section heading */}
          <div className="cfpg-left">
            <div className="cfpg-left-top">
              <h2 className="cfpg-left-heading">{tab.heading}</h2>
              <p className="cfpg-left-desc">{tab.subheading}</p>
              <div className="cfpg-left-divider" />
            </div>
            <div className="cfpg-tagline" aria-hidden="true">
              {tab.tagline.map((w) => (
                <span key={w}>{w}</span>
              ))}
            </div>
          </div>

          {/* CENTER: featured image */}
          <div className="cfpg-center">
            <div className="cfpg-featured-wrap">
              <img src={plan.src} alt={plan.alt} />
            </div>
          </div>

          {/* RIGHT: tabs + plan details */}
          <div className="cfpg-right">
            <div className="cfpg-tabs" role="tablist">
              {TABS.map((t, i) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={activeTab === i}
                  className={`cfpg-tab${activeTab === i ? ' is-active' : ''}`}
                  onClick={() => handleTabChange(i)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <p className="cfpg-plan-eyebrow">Featured Plan</p>
            <p className="cfpg-plan-sqft">{plan.sqft}</p>
            <h3 className="cfpg-plan-name">{plan.name}</h3>
            <div className="cfpg-plan-divider" />
            <p className="cfpg-plan-desc">{plan.desc}</p>

            <div className="cfpg-features">
              {tab.features.map((f) => (
                <div className="cfpg-feature" key={f.label}>
                  <FeatureIcon label={f.label} />
                  <span className="cfpg-feature-label">{f.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM: 3 plan cards (spans all columns) */}
          <div className="cfpg-cards">
            {tab.plans.map((p, i) => (
              <button
                key={p.sqft}
                className={`cfpg-card${activePlan === i ? ' is-active' : ''}`}
                onClick={() => setActivePlan(i)}
                aria-pressed={activePlan === i}
                title={p.name}
              >
                <div className="cfpg-card-img">
                  <img src={p.src} alt={p.alt} loading="lazy" />
                </div>
                <div className="cfpg-card-body">
                  <p className="cfpg-card-sqft">{p.sqft}</p>
                  <p className="cfpg-card-name">{p.name}</p>
                  <p className="cfpg-card-desc">{p.desc}</p>
                  <span className="cfpg-card-cta">View Plan &nbsp;&#8594;</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
