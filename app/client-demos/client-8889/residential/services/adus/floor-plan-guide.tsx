'use client';
import { useState } from 'react';

const TABS = [
  {
    id: 'detached',
    label: 'Detached ADU',
    plans: [
      { sqft: '749 sq ft', src: '/client-8889/residential/floor-plans/detached_adu/detached_adu_749_sq_ft.png', alt: 'Detached ADU 749 sq ft floor plan' },
      { sqft: '850 sq ft', src: '/client-8889/residential/floor-plans/detached_adu/detached_adu_850_sq_ft.png', alt: 'Detached ADU 850 sq ft floor plan' },
      { sqft: '1,000 sq ft', src: '/client-8889/residential/floor-plans/detached_adu/detached_adu_1000_sq_ft.png', alt: 'Detached ADU 1,000 sq ft floor plan' },
    ],
  },
  {
    id: 'attached',
    label: 'Attached ADU',
    plans: [
      { sqft: '500 sq ft', src: '/client-8889/residential/floor-plans/attached_adu/attached_adu_500_sq_ft.png', alt: 'Attached ADU 500 sq ft floor plan' },
      { sqft: '650 sq ft', src: '/client-8889/residential/floor-plans/attached_adu/attached_adu_650_sq_ft.png', alt: 'Attached ADU 650 sq ft floor plan' },
      { sqft: '800 sq ft', src: '/client-8889/residential/floor-plans/attached_adu/attached_adu_800_sq_ft.png', alt: 'Attached ADU 800 sq ft floor plan' },
    ],
  },
  {
    id: 'garage',
    label: 'Garage Conversion',
    plans: [
      { sqft: '400 sq ft', src: '/client-8889/residential/floor-plans/garage_conversion/garage_conversion_400_sq_ft.png', alt: 'Garage Conversion 400 sq ft floor plan' },
      { sqft: '550 sq ft', src: '/client-8889/residential/floor-plans/garage_conversion/garage_conversion_550_sq_ft.png', alt: 'Garage Conversion 550 sq ft floor plan' },
      { sqft: '700 sq ft', src: '/client-8889/residential/floor-plans/garage_conversion/garage_conversion_700_sq_ft.png', alt: 'Garage Conversion 700 sq ft floor plan' },
    ],
  },
];

const CSS = `
.fpg{--fpg-bg:#f7f4ee;--fpg-card:#fbf9f5;--fpg-line:#e0d9cc;--fpg-ink:#1f1c19;--fpg-muted:#6f675e;--fpg-gold:#b3894f;--fpg-active-bg:#1f1c19;--fpg-active-txt:#f3f0e9}
.fpg{background:var(--fpg-bg);border:1px solid var(--fpg-line);border-radius:4px;padding:clamp(28px,4vw,56px);margin-top:clamp(36px,4.5vw,64px)}
.fpg *{box-sizing:border-box}
.fpg-head{text-align:center;margin:0 0 clamp(24px,3vw,40px)}
.fpg-eyebrow{display:block;font-size:11px;letter-spacing:.22em;text-transform:uppercase;font-weight:600;color:var(--fpg-muted);margin:0 0 14px}
.fpg-title{font-size:clamp(22px,3vw,36px);line-height:1.05;font-weight:600;letter-spacing:-.01em;text-transform:uppercase;color:var(--fpg-ink);margin:0}
.fpg-sub{margin:10px 0 0;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--fpg-muted);line-height:1.6}
.fpg-tabs{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin:0 0 clamp(22px,3vw,36px)}
.fpg-tab{font-size:12px;letter-spacing:.08em;text-transform:uppercase;font-weight:600;color:var(--fpg-muted);background:transparent;border:1px solid var(--fpg-line);border-radius:100px;padding:9px 20px;cursor:pointer;transition:all .2s;font-family:inherit}
.fpg-tab:hover{border-color:#c9bda9;color:var(--fpg-ink)}
.fpg-tab.is-active{background:var(--fpg-active-bg);border-color:var(--fpg-active-bg);color:var(--fpg-active-txt)}
.fpg-body{display:grid;grid-template-columns:1fr 340px;gap:clamp(18px,2.4vw,32px);align-items:start}
.fpg-featured{display:flex;flex-direction:column;gap:0;background:var(--fpg-card);border:1px solid var(--fpg-line);border-radius:2px;overflow:hidden}
.fpg-featured-img{width:100%;background:#fff;display:flex;align-items:center;justify-content:center;min-height:380px;padding:16px}
.fpg-featured-img img{width:100%;height:100%;object-fit:contain;display:block;max-height:520px}
.fpg-featured-label{padding:14px 18px;border-top:1px solid var(--fpg-line);font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--fpg-muted);font-weight:500}
.fpg-cards{display:flex;flex-direction:column;gap:12px}
.fpg-card{display:flex;flex-direction:column;gap:0;background:var(--fpg-card);border:1px solid var(--fpg-line);border-radius:2px;overflow:hidden;cursor:pointer;transition:border-color .2s;text-align:left;padding:0;font-family:inherit}
.fpg-card:hover{border-color:#b3894f}
.fpg-card.is-active{border-color:var(--fpg-ink);box-shadow:0 0 0 1px var(--fpg-ink)}
.fpg-card-img{width:100%;background:#fff;display:flex;align-items:center;justify-content:center;padding:10px;height:140px}
.fpg-card-img img{width:100%;height:100%;object-fit:contain;display:block}
.fpg-card-label{padding:10px 14px;border-top:1px solid var(--fpg-line);font-size:11.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--fpg-muted);font-weight:600}
.fpg-card.is-active .fpg-card-label{color:var(--fpg-ink)}
@media(max-width:820px){
  .fpg-body{grid-template-columns:1fr;gap:clamp(16px,2.4vw,24px)}
  .fpg-cards{flex-direction:row;gap:10px}
  .fpg-card{flex:1 1 0;min-width:0}
  .fpg-card-img{height:110px}
}
@media(max-width:520px){
  .fpg-tabs{gap:6px}
  .fpg-tab{padding:8px 14px;font-size:11px}
  .fpg-featured-img{min-height:260px}
  .fpg-cards{flex-direction:column}
  .fpg-card{flex:none}
  .fpg-card-img{height:130px}
}
`;

export default function FloorPlanGuide() {
  const [activeTab, setActiveTab] = useState(0);
  const [activePlan, setActivePlan] = useState(0);

  const tab = TABS[activeTab];
  const plan = tab.plans[activePlan];

  function handleTabChange(idx: number) {
    setActiveTab(idx);
    setActivePlan(0);
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <section className="fpg" aria-label="ADU Floor Plan Guide">
        <div className="fpg-head">
          <span className="fpg-eyebrow">Floor Plans</span>
          <h2 className="fpg-title">ADU Floor Plan Guide</h2>
          <p className="fpg-sub">Explore layouts by type and size</p>
        </div>

        <div className="fpg-tabs" role="tablist">
          {TABS.map((t, i) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={activeTab === i}
              className={`fpg-tab${activeTab === i ? ' is-active' : ''}`}
              onClick={() => handleTabChange(i)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="fpg-body">
          <div className="fpg-featured">
            <div className="fpg-featured-img">
              <img src={plan.src} alt={plan.alt} />
            </div>
            <div className="fpg-featured-label">{tab.label} &middot; {plan.sqft}</div>
          </div>

          <div className="fpg-cards">
            {tab.plans.map((p, i) => (
              <button
                key={p.sqft}
                className={`fpg-card${activePlan === i ? ' is-active' : ''}`}
                onClick={() => setActivePlan(i)}
                aria-pressed={activePlan === i}
                title={p.alt}
              >
                <div className="fpg-card-img">
                  <img src={p.src} alt={p.alt} loading="lazy" />
                </div>
                <span className="fpg-card-label">{p.sqft}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
