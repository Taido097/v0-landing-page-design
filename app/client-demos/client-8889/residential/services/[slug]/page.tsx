import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  Home, Gem, Hammer, Ruler, Zap, FileCheck, Map, LayoutTemplate, ShieldCheck, Wrench,
  Check, ArrowRight, ArrowUpRight,
} from 'lucide-react';
import { SERVICE_DETAILS, getServiceDetail } from '../services-data';
import Gallery from './gallery';

const RESIDENTIAL_HREF = '/client-demos/client-8889/residential';
const HOME_HREF = '/client-demos/client-8889/arcsphere-socal';
const CONTACT = 'mailto:info@nguyen-ae.com';

const ICONS: Record<string, typeof Home> = {
  Home, Gem, Hammer, Ruler, Zap, FileCheck, Map, LayoutTemplate, ShieldCheck, Wrench,
};

export function generateStaticParams() {
  return SERVICE_DETAILS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const svc = getServiceDetail(slug);
  return {
    title: svc ? `${svc.title} — NGUYEN Residential` : 'NGUYEN Residential',
    description: svc?.intro,
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  };
}

const CSS = `
.nrd{--bg:#efece5;--surface:#f7f4ee;--surface2:#fbf9f5;--ink:#1f1c19;--muted:#6f675e;--soft:#8a8177;--line:#e0d9cc;--gold:#b3894f;
  background:var(--bg);color:var(--ink);min-height:100vh;
  font-family:"Inter","Inter Display",system-ui,-apple-system,"Segoe UI",Helvetica,Arial,sans-serif;
  -webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
.nrd *{box-sizing:border-box}
.nrd a{color:inherit;text-decoration:none}
.nrd-shell{width:min(1200px,100%);margin:0 auto;padding:0 clamp(20px,4vw,56px)}
/* header */
.nrd-nav{position:sticky;top:0;z-index:20;background:rgba(239,236,229,.92);backdrop-filter:blur(8px);border-bottom:1px solid var(--line)}
.nrd-nav-in{display:flex;align-items:center;justify-content:space-between;gap:20px;height:clamp(58px,6vw,74px)}
.nrd-nav-left{display:flex;align-items:center;gap:clamp(16px,2vw,30px)}
.nrd-nav-link{font-size:12px;letter-spacing:.13em;text-transform:uppercase;color:var(--muted);transition:color .2s}
.nrd-nav-link:hover,.nrd a.nrd-nav-link.is-active{color:var(--ink)}
.nrd a.nrd-nav-link.is-active{font-weight:600}
.nrd-brand{position:absolute;left:50%;transform:translateX(-50%);font-size:13px;letter-spacing:.14em;text-transform:uppercase;font-weight:600;color:var(--ink);white-space:nowrap}
.nrd a.nrd-contact{font-size:11px;letter-spacing:.12em;text-transform:uppercase;font-weight:600;color:var(--ink);border:1px solid var(--ink);border-radius:999px;padding:11px 20px;transition:background .2s,color .2s}
.nrd a.nrd-contact:hover{background:var(--ink);color:#f3f0e9}
.nrd-back{display:inline-flex;align-items:center;gap:8px;margin:clamp(20px,2.4vw,32px) 0 0;font-size:12.5px;letter-spacing:.05em;color:var(--muted);transition:color .2s}
.nrd a.nrd-back:hover{color:var(--ink)}
/* hero */
.nrd-hero{display:grid;grid-template-columns:1fr 1fr;gap:clamp(28px,4vw,56px);align-items:center;margin-top:clamp(22px,2.6vw,34px)}
.nrd-eyebrow{font-size:11px;letter-spacing:.2em;text-transform:uppercase;font-weight:600;color:var(--soft);margin:0 0 18px}
.nrd-h1{font-size:clamp(32px,5vw,58px);line-height:1.03;font-weight:700;letter-spacing:-.02em;text-transform:uppercase;margin:0}
.nrd-sub{color:var(--gold);font-size:clamp(15px,1.7vw,21px);font-weight:500;margin:18px 0 0;letter-spacing:.01em}
.nrd-intro{color:#453f39;font-size:clamp(14.5px,1.2vw,16.5px);line-height:1.62;margin:22px 0 0;max-width:34em}
.nrd-hero-img{aspect-ratio:4/3;border-radius:16px;overflow:hidden;background:#e7e0d5}
.nrd-hero-img img{width:100%;height:100%;object-fit:cover;display:block}
/* section scaffolding */
.nrd-section{margin-top:clamp(46px,5vw,82px)}
.nrd-label{font-size:11.5px;letter-spacing:.2em;text-transform:uppercase;font-weight:600;color:var(--soft);margin:0 0 clamp(20px,2vw,30px)}
.nrd-ico{color:var(--gold);flex:none}
/* approach (bordered container, icon columns) */
.nrd-approach{background:var(--surface2);border:1px solid var(--line);border-radius:18px;padding:clamp(26px,3vw,44px)}
.nrd-approach-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(20px,2.4vw,36px)}
.nrd-appr h4{display:flex;align-items:center;gap:10px;font-size:15px;font-weight:600;margin:0 0 10px}
.nrd-appr p{font-size:13px;line-height:1.5;color:var(--muted);margin:0}
/* offer (icon grid) */
.nrd-offer{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(24px,2.6vw,40px)}
.nrd-off h4{display:flex;align-items:center;gap:10px;font-size:15.5px;font-weight:600;margin:0 0 8px}
.nrd-off p{font-size:13px;line-height:1.5;color:var(--muted);margin:0;padding-left:32px}
/* checklist columns */
.nrd-cols{display:grid;gap:16px}
.nrd-cols.n1{grid-template-columns:minmax(0,560px)}
.nrd-cols.n2{grid-template-columns:repeat(2,1fr)}
.nrd-cols.n3{grid-template-columns:repeat(3,1fr)}
.nrd-cols.n4{grid-template-columns:repeat(4,1fr)}
.nrd-col{background:var(--surface2);border:1px solid var(--line);border-radius:14px;padding:clamp(20px,1.8vw,26px)}
.nrd-col-h{font-size:12px;letter-spacing:.11em;text-transform:uppercase;font-weight:600;color:var(--ink);margin:0 0 16px}
.nrd-col ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:12px}
.nrd-col li{display:flex;align-items:flex-start;gap:10px;font-size:13.5px;line-height:1.35;color:#453f39}
.nrd-col li svg{margin-top:1px}
/* gallery */
.nrd-chips{display:flex;flex-wrap:wrap;gap:10px;margin:0 0 clamp(20px,2vw,28px)}
.nrd-chip{font-size:11.5px;letter-spacing:.08em;text-transform:uppercase;font-weight:600;color:var(--muted);background:transparent;border:1px solid var(--line);border-radius:999px;padding:9px 18px;cursor:pointer;transition:all .2s}
.nrd-chip:hover{border-color:#c9bda9;color:var(--ink)}
.nrd-chip.is-active{background:var(--ink);border-color:var(--ink);color:#f3f0e9}
.nrd-gallery{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.nrd-shot{margin:0;aspect-ratio:4/3;border-radius:10px;overflow:hidden;background:#e7e0d5}
.nrd-shot img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .6s ease}
.nrd-shot:hover img{transform:scale(1.05)}
/* process */
.nrd-proc-row{display:flex;gap:0}
.nrd-pstep{flex:1;text-align:center;position:relative;padding:0 clamp(6px,1vw,14px)}
.nrd-pstep::before{content:"";position:absolute;top:22px;left:-50%;width:100%;height:1px;background:var(--line);z-index:0}
.nrd-pstep:first-child::before{display:none}
.nrd-circ{position:relative;z-index:1;width:44px;height:44px;border:1px solid var(--gold);border-radius:50%;display:grid;place-items:center;margin:0 auto;background:var(--bg);color:var(--gold);font-size:13px;font-weight:600}
.nrd-pt{margin:16px 0 6px;font-size:14px;font-weight:600;color:var(--ink)}
.nrd-pd{font-size:12px;color:var(--muted);line-height:1.45}
/* cta */
.nrd-cta{margin-top:clamp(52px,6vw,84px);background:#1f1c19;border-radius:18px;color:#efe9df;
  padding:clamp(30px,4vw,50px);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:22px}
.nrd-cta-txt{max-width:620px}
.nrd-cta-h{font-size:clamp(20px,2.4vw,30px);line-height:1.12;font-weight:600;letter-spacing:-.01em;margin:0;text-transform:uppercase}
.nrd-cta-b{font-size:14px;line-height:1.55;color:#c3bbaf;margin:14px 0 0}
.nrd a.nrd-btn{flex:none;display:inline-flex;align-items:center;gap:10px;background:var(--gold);color:#1c1712;border-radius:999px;
  padding:15px 26px;font-size:12.5px;letter-spacing:.1em;text-transform:uppercase;font-weight:700;transition:background .2s,transform .2s}
.nrd a.nrd-btn:hover{background:#c99a58;transform:translateY(-2px)}
/* footer */
.nrd-foot{margin-top:clamp(56px,7vw,96px);border-top:1px solid var(--line);padding:clamp(34px,4vw,52px) 0 clamp(40px,5vw,60px)}
.nrd-foot-grid{display:grid;grid-template-columns:auto 1.4fr 1fr 1fr;gap:clamp(20px,3vw,44px);align-items:start}
.nrd-mono{font-family:Georgia,"Times New Roman",serif;font-size:34px;line-height:1;color:var(--ink)}
.nrd-foot-c{font-size:13px;color:var(--muted);line-height:1.5;display:flex;flex-direction:column;gap:10px}
.nrd-foot-c a{display:inline-flex;align-items:center;gap:8px}
.nrd-foot-col{display:flex;flex-direction:column;gap:9px}
.nrd-foot-col a{font-size:12.5px;letter-spacing:.05em;color:var(--muted);transition:color .2s}
.nrd-foot-col a:hover{color:var(--ink)}
.nrd-lock{margin-top:clamp(30px,4vw,48px);display:flex;align-items:flex-end;justify-content:space-between;gap:20px;flex-wrap:wrap}
.nrd-lock-brand{font-size:clamp(15px,2.4vw,24px);letter-spacing:.14em;text-transform:uppercase;font-weight:600;line-height:1.25;color:var(--ink)}
.nrd-lock-c{font-size:11.5px;color:var(--soft);text-align:right}
@media(max-width:940px){
  .nrd-approach-grid,.nrd-cols.n3,.nrd-cols.n4{grid-template-columns:repeat(2,1fr)}
  .nrd-offer{grid-template-columns:repeat(2,1fr)}
  .nrd-gallery{grid-template-columns:repeat(2,1fr)}
  .nrd-foot-grid{grid-template-columns:1fr 1fr}
}
@media(max-width:720px){
  .nrd-brand{display:none}
  .nrd-hero{grid-template-columns:1fr}
  .nrd-proc-row{flex-direction:column;gap:18px}
  .nrd-pstep{text-align:left;display:grid;grid-template-columns:44px 1fr;gap:0 16px;padding:0}
  .nrd-pstep::before{display:none}
  .nrd-circ{margin:0}
  .nrd-pt{grid-column:2;margin:0 0 4px}
  .nrd-pd{grid-column:2}
}
@media(max-width:560px){
  .nrd-nav-left{display:none}
  .nrd-approach-grid,.nrd-offer,.nrd-cols.n1,.nrd-cols.n2,.nrd-cols.n3,.nrd-cols.n4,.nrd-gallery{grid-template-columns:1fr}
  .nrd-off p{padding-left:0}
  .nrd-foot-grid{grid-template-columns:1fr}
}
`;

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const svc = getServiceDetail(slug);
  if (!svc) notFound();

  return (
    <div className="nrd">
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <nav className="nrd-nav">
        <div className="nrd-shell nrd-nav-in">
          <div className="nrd-nav-left">
            <a href={HOME_HREF} className="nrd-nav-link">Home</a>
            <a href={RESIDENTIAL_HREF} className="nrd-nav-link is-active">Services</a>
            <a href={RESIDENTIAL_HREF} className="nrd-nav-link">Residential</a>
          </div>
          <a href={RESIDENTIAL_HREF} className="nrd-brand">NGUYEN Architecture &amp; Engineering</a>
          <a href={CONTACT} className="nrd-contact">Contact Us</a>
        </div>
      </nav>

      <div className="nrd-shell">
        <a href={RESIDENTIAL_HREF} className="nrd-back">← Back to Residential</a>

        <section className="nrd-hero">
          <div>
            <p className="nrd-eyebrow">Residential Service · {svc.num}</p>
            <h1 className="nrd-h1">{svc.title}</h1>
            {svc.subtitle ? <p className="nrd-sub">{svc.subtitle}</p> : null}
            <p className="nrd-intro">{svc.intro}</p>
          </div>
          <div className="nrd-hero-img">
            <img src={svc.hero} alt={svc.title} />
          </div>
        </section>

        {svc.approach ? (
          <section className="nrd-section">
            <p className="nrd-label">Our Approach</p>
            <div className="nrd-approach">
              <div className="nrd-approach-grid">
                {svc.approach.map((a) => {
                  const Ico = a.icon ? ICONS[a.icon] : null;
                  return (
                    <div className="nrd-appr" key={a.t}>
                      <h4>{Ico ? <Ico className="nrd-ico" size={20} strokeWidth={1.5} /> : null}{a.t}</h4>
                      <p>{a.d}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        ) : null}

        {svc.offer ? (
          <section className="nrd-section">
            <p className="nrd-label">What We Offer</p>
            <div className="nrd-offer">
              {svc.offer.map((o) => {
                const Ico = o.icon ? ICONS[o.icon] : null;
                return (
                  <div className="nrd-off" key={o.t}>
                    <h4>{Ico ? <Ico className="nrd-ico" size={20} strokeWidth={1.5} /> : null}{o.t}</h4>
                    <p>{o.d}</p>
                  </div>
                );
              })}
            </div>
          </section>
        ) : null}

        {svc.columns ? (
          <section className="nrd-section">
            <div className={`nrd-cols n${Math.min(svc.columns.length, 4)}`}>
              {svc.columns.map((c) => (
                <div className="nrd-col" key={c.label}>
                  <p className="nrd-col-h">{c.label}</p>
                  <ul>
                    {c.items.map((it) => (
                      <li key={it}><Check className="nrd-ico" size={16} strokeWidth={2} />{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {svc.gallery ? (
          <section className="nrd-section">
            <p className="nrd-label">Project Gallery</p>
            <Gallery shots={svc.gallery} />
          </section>
        ) : null}

        <section className="nrd-section">
          <p className="nrd-label">Our Process</p>
          <div className="nrd-proc-row">
            {svc.process.map((step, i) => (
              <div className="nrd-pstep" key={step.t}>
                <div className="nrd-circ">{String(i + 1).padStart(2, '0')}</div>
                <p className="nrd-pt">{step.t}</p>
                {step.d ? <p className="nrd-pd">{step.d}</p> : null}
              </div>
            ))}
          </div>
        </section>

        <section className="nrd-cta">
          <div className="nrd-cta-txt">
            <h2 className="nrd-cta-h">{svc.ctaHeadline}</h2>
            {svc.ctaBody ? <p className="nrd-cta-b">{svc.ctaBody}</p> : null}
          </div>
          <a className="nrd-btn" href={CONTACT}>{svc.cta} <ArrowRight size={16} strokeWidth={2} /></a>
        </section>

        <nav className="nrd-section" aria-label="Other residential services" style={{ marginTop: 'clamp(46px,5vw,72px)' }}>
          <p className="nrd-label">Explore Other Services</p>
          <div className="nrd-chips">
            {SERVICE_DETAILS.map((o) => (
              <a
                key={o.slug}
                className={`nrd-chip${o.slug === svc.slug ? ' is-active' : ''}`}
                href={`${RESIDENTIAL_HREF}/services/${o.slug}`}
              >
                {o.title}
              </a>
            ))}
          </div>
        </nav>
      </div>

      <footer className="nrd-foot">
        <div className="nrd-shell">
          <div className="nrd-foot-grid">
            <div className="nrd-mono">N</div>
            <div className="nrd-foot-c">
              <a href="tel:+17141234567">(714) 123-4567</a>
              <a href={CONTACT}>info@nguyen-ae.com</a>
              <span>Los Angeles, CA</span>
            </div>
            <div className="nrd-foot-col">
              <a href={HOME_HREF}>Home</a>
              <a href={RESIDENTIAL_HREF}>Services</a>
              <a href={RESIDENTIAL_HREF}>Residential</a>
              <a href={RESIDENTIAL_HREF}>Projects</a>
            </div>
            <div className="nrd-foot-col">
              <a href={RESIDENTIAL_HREF}>About</a>
              <a href={RESIDENTIAL_HREF}>Careers</a>
              <a href={RESIDENTIAL_HREF}>Blog</a>
              <a href={CONTACT}>Contact</a>
            </div>
          </div>
          <div className="nrd-lock">
            <div className="nrd-lock-brand">NGUYEN<br />Architecture<br />&amp; Engineering</div>
            <div className="nrd-lock-c">© 2024 NGUYEN Architecture &amp; Engineering.<br />All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
