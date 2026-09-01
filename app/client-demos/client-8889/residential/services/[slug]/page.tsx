import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  Home, Gem, Hammer, Ruler, Zap, FileCheck, Map, LayoutTemplate, ShieldCheck, Wrench,
  Check, ArrowRight, Mail, Phone, MapPin,
} from 'lucide-react';
import { SERVICE_DETAILS, getServiceDetail } from '../services-data';
import Gallery from './gallery';
import HeroBanner from './hero-banner';
import Navbar from '../navbar';

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

function SectionHead({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="nrd-sechead">
      <h2>{title}</h2>
      {sub ? <p>{sub}</p> : null}
    </div>
  );
}

const CSS = `
.nrd{--bg:#efece5;--surface:#f7f4ee;--surface2:#fbf9f5;--ink:#1f1c19;--muted:#6f675e;--soft:#8a8177;--line:#e0d9cc;--gold:#b3894f;
  background:var(--bg);color:var(--ink);min-height:100vh;
  font-family:"Inter","Inter Display",system-ui,-apple-system,"Segoe UI",Helvetica,Arial,sans-serif;
  -webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
.nrd *{box-sizing:border-box}
.nrd a{color:inherit;text-decoration:none}
.nrd-shell{width:min(1200px,100%);margin:0 auto;padding:0 clamp(20px,4vw,56px)}
/* header — exact specs from NGUYEN Framer residential nav (three-section flex: links | logo | button) */
.nrd-nav{position:sticky;top:0;z-index:20;background:rgba(240,235,230,.95);backdrop-filter:blur(3px)}
.nrd-nav-in{display:flex;align-items:center;gap:20px;padding-top:13px;padding-bottom:13px;position:relative}
.nrd-nav-left{flex:1 0 0;display:flex;align-items:center;justify-content:flex-start;gap:32px}
.nrd-nav-link{font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-size:14px;font-weight:500;letter-spacing:-.4px;line-height:110%;text-transform:uppercase;color:#4f4742;white-space:nowrap;transition:opacity .2s}
.nrd-nav-link:hover{opacity:.6}
.nrd a.nrd-nav-link.is-active{opacity:.6}
.nrd-brand{flex:none;font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-size:24px;letter-spacing:-.4px;line-height:110%;font-weight:400;color:#4f4742;white-space:nowrap;text-transform:uppercase}
.nrd-nav-right{flex:1 0 0;display:flex;align-items:center;justify-content:flex-end;gap:10px}
.nrd a.nrd-contact{font-family:"Inter Display","Inter Display Placeholder",sans-serif;display:inline-flex;align-items:center;justify-content:center;background:#4f4742;color:#f0ebe6;border-radius:100px;padding:10px 22px;font-size:14px;font-weight:500;letter-spacing:-.2px;line-height:120%;text-transform:uppercase;transition:opacity .2s;white-space:nowrap;backdrop-filter:blur(5px)}
.nrd a.nrd-contact:hover{opacity:.8}
.nrd-back{display:inline-flex;align-items:center;gap:8px;margin:clamp(20px,2.4vw,32px) 0 0;font-size:12.5px;letter-spacing:.05em;color:var(--muted);transition:color .2s}
.nrd-back-lead{margin:0 0 clamp(18px,2.2vw,26px)}
.nrd a.nrd-back:hover{color:var(--ink)}
/* hero */
.nrd-hero{display:grid;grid-template-columns:1fr 1fr;gap:clamp(28px,4vw,56px);align-items:center;margin-top:clamp(22px,2.6vw,34px)}
.nrd-eyebrow{font-size:11px;letter-spacing:.2em;text-transform:uppercase;font-weight:600;color:var(--soft);margin:0 0 18px}
.nrd-h1{font-size:clamp(32px,5vw,58px);line-height:1.04;font-weight:600;letter-spacing:-.02em;text-transform:uppercase;margin:0}
.nrd-sub{color:var(--gold);font-size:clamp(15px,1.7vw,21px);font-weight:500;margin:18px 0 0;letter-spacing:.01em}
.nrd-intro{color:#453f39;font-size:clamp(14.5px,1.2vw,16.5px);line-height:1.62;margin:22px 0 0;max-width:34em}
.nrd-note{margin:18px 0 0;max-width:34em;font-size:12px;line-height:1.5;color:var(--soft);border-left:2px solid var(--line);padding-left:14px}
.nrd-hero-img{aspect-ratio:4/3;border-radius:0;overflow:hidden;background:#e7e0d5}
.nrd-hero-img img{width:100%;height:100%;object-fit:cover;display:block}
/* full-width banner hero */
.nrd-banner{position:relative;margin:0;border-radius:0;height:97vh;max-height:1000px;overflow:hidden;background:#1a1712}
.nrd-banner img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.nrd-banner::after{content:"";position:absolute;inset:0;background:linear-gradient(#00000036 0%,#000000c9 100%)}
.nrd-banner-inner{position:absolute;left:50%;bottom:40px;z-index:1;width:94%;transform:translateX(-50%)}
.nrd-banner-h1{font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-size:clamp(32px,3.9vw,56px);font-weight:400;letter-spacing:-.02em;line-height:1.1;color:#efede9;margin:0 0 clamp(32px,3.9vw,56px)}
.nrd-banner-rule{display:flex;height:1px;margin:0 0 20px;overflow:hidden}
.nrd-rule-h{flex:1 1 50%;height:1px;background:rgba(247,244,238,.38)}
.nrd-banner-cap{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px}
.nrd-banner-cap span{font-size:clamp(13px,1.1vw,16px);letter-spacing:.01em;line-height:1.3;color:rgba(239,237,233,.85);font-weight:400}
.nrd-banner-cap span:nth-child(2){text-align:center}
.nrd-banner-cap span:nth-child(3){text-align:right}
/* hero entrance — copied verbatim from the NGUYEN Framer residential hero (values read
   from the Framer JS bundle): the hero image reveals with a top-to-bottom clip-path wipe
   (inset(0% 0% 100% 0%)->inset(0% 0% 0% 0%)) + opacity 0->1 on a spring (stiffness 400,
   damping 80, mass 1 -> the linear() curve below); the dark overlay fades in (delay .5s,
   dur .4s); the two rule halves slide in from x:-600px / x:+600px while fading (delay .3s,
   dur 1s, cubic-bezier(.44,0,.56,1)). .is-in is added by hero-banner.tsx; :not(.is-in)
   fallbacks reveal everything if JS is off. */
@keyframes nrd-unhide{to{opacity:1;transform:none}}
@keyframes nrd-imgreveal{to{clip-path:inset(0% 0% 0% 0%);opacity:1}}
.nrd-anim img{clip-path:inset(0% 0% 100% 0%);opacity:0;transition:clip-path 1.3s cubic-bezier(.22,1,.36,1),opacity 1.3s cubic-bezier(.22,1,.36,1);transition-timing-function:linear(0,0.1956,0.3976,0.5496,0.6633,0.7484,0.8120,0.8597,0.8953,0.9219,0.9418,0.9568,0.9679,0.9762,0.9825,0.9872,0.9906,0.9933,0.9952,0.9967,0.9978,0.9986,0.9992,0.9997,1)}
.nrd-anim.is-in img{clip-path:inset(0% 0% 0% 0%);opacity:1}
.nrd-anim::after{opacity:.001;transition:opacity .4s ease-out .5s}
.nrd-anim.is-in::after{opacity:1}
.nrd-anim .nrd-rule-l{transform:translateX(-600px);opacity:.001;transition:transform 1s cubic-bezier(.44,0,.56,1) .3s,opacity 1s cubic-bezier(.44,0,.56,1) .3s}
.nrd-anim .nrd-rule-r{transform:translateX(600px);opacity:.001;transition:transform 1s cubic-bezier(.44,0,.56,1) .3s,opacity 1s cubic-bezier(.44,0,.56,1) .3s}
.nrd-anim.is-in .nrd-rule-l,.nrd-anim.is-in .nrd-rule-r{transform:translateX(0);opacity:1}
.nrd-anim:not(.is-in) img{animation:nrd-imgreveal 1.3s cubic-bezier(.22,1,.36,1) 1.9s both}
.nrd-anim:not(.is-in)::after{animation:nrd-unhide .5s ease-out 2s both}
.nrd-anim:not(.is-in) .nrd-rule-l,.nrd-anim:not(.is-in) .nrd-rule-r{animation:nrd-unhide .9s cubic-bezier(.44,0,.56,1) 2.2s both}
@media(max-width:600px){.nrd-banner-cap{grid-template-columns:1fr}.nrd-banner-cap span:nth-child(2),.nrd-banner-cap span:nth-child(3){display:none}}
.nrd-lead{margin-top:clamp(40px,5vw,72px)}
.nrd-lead-h{font-size:clamp(24px,3.4vw,42px);font-weight:500;line-height:1.14;letter-spacing:-.01em;color:var(--ink);margin:0;max-width:20em}
.nrd-lead-p{margin:22px 0 0;max-width:44em;font-size:clamp(14.5px,1.2vw,16.5px);line-height:1.62;color:#453f39}
/* section scaffolding */
.nrd-section{margin-top:clamp(56px,7vw,104px)}
.nrd-sechead{text-align:center;max-width:660px;margin:0 auto clamp(32px,4vw,50px)}
.nrd-sechead h2{margin:0;font-size:clamp(24px,3.4vw,40px);line-height:1.05;font-weight:600;letter-spacing:.005em;text-transform:uppercase;color:var(--ink)}
.nrd-sechead p{margin:16px 0 0;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--soft);line-height:1.7}
.nrd-ico{color:var(--gold);flex:none}
/* approach (centered icon columns, borderless) */
.nrd-approach-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(26px,3vw,48px)}
.nrd-appr{display:flex;flex-direction:column;align-items:center;text-align:center;gap:12px}
.nrd-appr h4{font-size:13px;letter-spacing:.1em;text-transform:uppercase;font-weight:600;margin:0}
.nrd-appr p{font-size:13px;line-height:1.55;color:var(--muted);margin:0;max-width:24ch}
/* offer (icon grid, borderless, uppercase titles) */
.nrd-offer{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(28px,3vw,48px)}
.nrd-off h4{display:flex;align-items:center;gap:10px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;font-weight:600;margin:0 0 10px}
.nrd-off p{font-size:13px;line-height:1.55;color:var(--muted);margin:0;padding-left:30px}
/* scope columns (borderless, thin top rule) */
.nrd-cols{display:grid;gap:clamp(24px,3vw,44px)}
.nrd-cols.n1{grid-template-columns:minmax(0,520px);justify-content:center}
.nrd-cols.n2{grid-template-columns:repeat(2,1fr)}
.nrd-cols.n3{grid-template-columns:repeat(3,1fr)}
.nrd-cols.n4{grid-template-columns:repeat(4,1fr)}
.nrd-col{background:transparent;border:0;border-top:1px solid var(--line);border-radius:0;padding:22px 0 0}
.nrd-col-h{font-size:12px;letter-spacing:.11em;text-transform:uppercase;font-weight:600;color:var(--ink);margin:0 0 18px}
.nrd-col ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:13px}
.nrd-col li{display:flex;align-items:flex-start;gap:10px;font-size:13.5px;line-height:1.4;color:#453f39}
.nrd-col li svg{margin-top:1px}
/* gallery cards */
.nrd-chips{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin:0 0 clamp(26px,3vw,38px)}
.nrd-chip{font-size:11.5px;letter-spacing:.08em;text-transform:uppercase;font-weight:600;color:var(--muted);background:transparent;border:1px solid var(--line);border-radius:4px;padding:9px 18px;cursor:pointer;transition:all .2s}
.nrd-chip:hover{border-color:#c9bda9;color:var(--ink)}
.nrd-chip.is-active{background:var(--ink);border-color:var(--ink);color:#f3f0e9}
.nrd-gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(20px,2.4vw,34px)}
.nrd-shot{margin:0;cursor:zoom-in}
.nrd-shot-img{aspect-ratio:4/3;border-radius:0;overflow:hidden;background:#e7e0d5}
.nrd-shot-img img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .6s ease}
.nrd-shot:hover .nrd-shot-img img{transform:scale(1.05)}
.nrd-shot-cap{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 2px 0}
.nrd-shot-cap span{font-size:11.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--soft)}
.nrd-shot-arrow{flex:none;width:34px;height:34px;border:1px solid var(--line);border-radius:50%;display:grid;place-items:center;color:var(--ink);font-size:13px;transition:border-color .2s}
.nrd-shot:hover .nrd-shot-arrow{border-color:var(--gold);color:var(--gold)}
/* lightbox */
.nrd-lb{position:fixed;inset:0;z-index:60;background:rgba(20,17,14,.92);display:flex;align-items:center;justify-content:center;padding:clamp(16px,4vw,64px);cursor:zoom-out}
.nrd-lb img{max-width:100%;max-height:90vh;object-fit:contain;display:block;box-shadow:0 24px 70px rgba(0,0,0,.55)}
.nrd-lb-x{position:absolute;top:clamp(14px,2vw,24px);right:clamp(16px,2vw,28px);width:44px;height:44px;border:1px solid rgba(243,240,233,.4);border-radius:50%;background:transparent;color:#f3f0e9;font-size:20px;line-height:1;display:grid;place-items:center;cursor:pointer;transition:background .2s}
.nrd-lb-x:hover{background:rgba(243,240,233,.14)}
/* process */
.nrd-proc-row{display:flex;gap:0}
.nrd-pstep{flex:1;text-align:center;position:relative;padding:0 clamp(6px,1vw,14px)}
.nrd-pstep::before{content:"";position:absolute;top:22px;left:-50%;width:100%;height:1px;background:var(--line);z-index:0}
.nrd-pstep:first-child::before{display:none}
.nrd-circ{position:relative;z-index:1;width:44px;height:44px;border:1px solid var(--gold);border-radius:50%;display:grid;place-items:center;margin:0 auto;background:var(--bg);color:var(--gold);font-size:13px;font-weight:600}
.nrd-pt{margin:16px 0 6px;font-size:13px;letter-spacing:.03em;text-transform:uppercase;font-weight:600;color:var(--ink)}
.nrd-pd{font-size:12px;color:var(--muted);line-height:1.45}
/* cta */
.nrd-cta{margin-top:clamp(56px,7vw,100px);background:#1f1c19;border-radius:0;color:#efe9df;
  padding:clamp(34px,5vw,64px);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:24px}
.nrd-cta-txt{max-width:620px}
.nrd-cta-h{font-size:clamp(22px,2.8vw,34px);line-height:1.1;font-weight:600;letter-spacing:.005em;margin:0;text-transform:uppercase}
.nrd-cta-b{font-size:14px;line-height:1.55;color:#c3bbaf;margin:14px 0 0}
.nrd a.nrd-btn{flex:none;display:inline-flex;align-items:center;gap:10px;background:var(--gold);color:#1c1712;border-radius:999px;
  padding:15px 26px;font-size:12.5px;letter-spacing:.1em;text-transform:uppercase;font-weight:700;transition:background .2s,transform .2s}
.nrd a.nrd-btn:hover{background:#c99a58;transform:translateY(-2px)}
/* footer */
.nrd-foot{margin-top:clamp(56px,7vw,96px);border-top:1px solid var(--line);padding:clamp(40px,5vw,72px) 0 0;overflow:hidden}
.nrd-foot-main{display:grid;grid-template-columns:1.3fr .7fr;gap:clamp(28px,4vw,56px);align-items:start}
.nrd-foot-head{font-size:clamp(26px,3.4vw,40px);line-height:1.2;font-weight:500;letter-spacing:-.035em;text-transform:uppercase;margin:0;max-width:14em;color:#4f4742}
.nrd a.nrd-foot-cta{display:inline-block;margin-top:clamp(20px,2.4vw,30px);font-size:12px;letter-spacing:.14em;text-transform:uppercase;font-weight:600;border-bottom:1px solid var(--ink);padding-bottom:6px;color:var(--ink);transition:color .2s,border-color .2s}
.nrd a.nrd-foot-cta:hover{color:var(--gold);border-color:var(--gold)}
.nrd-foot-cols{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(16px,2vw,30px)}
.nrd-foot-col{display:flex;flex-direction:column;gap:12px}
.nrd-foot-col a,.nrd-foot-col span{font-size:11.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);transition:color .2s}
.nrd-foot-col a:hover{color:var(--ink)}
.nrd-foot-bottom{display:flex;align-items:center;justify-content:space-between;gap:18px;margin-top:clamp(34px,4vw,52px);padding-top:clamp(22px,2.6vw,32px);border-top:1px solid var(--line);flex-wrap:wrap}
.nrd-foot-icons{display:flex;align-items:center}
.nrd-foot-icons a,.nrd-foot-icons span{display:grid;place-items:center;color:var(--ink);padding:0 16px;border-right:1px solid var(--line);transition:color .2s}
.nrd-foot-icons a:first-child,.nrd-foot-icons span:first-child{padding-left:0}
.nrd-foot-icons a:last-child,.nrd-foot-icons span:last-child{border-right:0;padding-right:0}
.nrd-foot-icons a:hover{color:var(--gold)}
.nrd-foot-copy{font-size:11.5px;color:var(--soft);letter-spacing:.02em;margin:0}
.nrd-marquee{overflow:hidden;white-space:nowrap;margin:clamp(30px,4vw,56px) 0 clamp(24px,3vw,40px)}
.nrd-marquee-track{display:inline-flex;align-items:center;animation:nrd-scroll 40s linear infinite;will-change:transform}
.nrd-marquee-track span{flex:none;white-space:nowrap;font-size:clamp(56px,18vw,240px);line-height:.9;font-weight:800;letter-spacing:-.04em;text-transform:uppercase;color:#33302b}
.nrd-marquee-track span::after{content:"·";padding:0 .3em;color:#33302b}
@keyframes nrd-scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@media(prefers-reduced-motion:reduce){.nrd-marquee-track{animation:none}}
.nrd-foot-img{width:100%;aspect-ratio:16/6;overflow:hidden;background:#e7e0d5}
.nrd-foot-img img{width:100%;height:100%;object-fit:cover;display:block}
@media(max-width:940px){
  .nrd-approach-grid,.nrd-cols.n3,.nrd-cols.n4{grid-template-columns:repeat(2,1fr)}
  .nrd-offer,.nrd-gallery{grid-template-columns:repeat(2,1fr)}
  .nrd-foot-main{grid-template-columns:1fr}
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
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <Navbar />

      {svc.heroBanner ? (
        <HeroBanner
          hero={svc.hero}
          title={svc.title}
          label={svc.bannerLabel ?? svc.title}
          caption={svc.heroCaption}
        />
      ) : (
        <div className="nrd-shell">
          <a href={RESIDENTIAL_HREF} className="nrd-back">← Back to Residential</a>
        </div>
      )}

      <div className="nrd-shell">
        {svc.heroBanner ? (
          <div className="nrd-lead">
            <a href={RESIDENTIAL_HREF} className="nrd-back nrd-back-lead">← Back to Residential</a>
            {svc.subtitle ? <h2 className="nrd-lead-h">{svc.subtitle}</h2> : null}
            <p className="nrd-lead-p">{svc.intro}</p>
            {svc.note ? <p className="nrd-note">{svc.note}</p> : null}
          </div>
        ) : (
          <section className="nrd-hero">
            <div>
              <p className="nrd-eyebrow">{svc.kicker ?? `Residential Service · ${svc.num}`}</p>
              <h1 className="nrd-h1">{svc.title}</h1>
              {svc.subtitle ? <p className="nrd-sub">{svc.subtitle}</p> : null}
              <p className="nrd-intro">{svc.intro}</p>
              {svc.note ? <p className="nrd-note">{svc.note}</p> : null}
            </div>
            <div className="nrd-hero-img">
              <img src={svc.hero} alt={svc.title} />
            </div>
          </section>
        )}

        {svc.approach ? (
          <section className="nrd-section">
            <SectionHead title="Our Approach" sub="How we plan, design, and coordinate." />
            <div className="nrd-approach-grid">
              {svc.approach.map((a) => {
                const Ico = a.icon ? ICONS[a.icon] : null;
                return (
                  <div className="nrd-appr" key={a.t}>
                    {Ico ? <Ico className="nrd-ico" size={26} strokeWidth={1.4} /> : null}
                    <h4>{a.t}</h4>
                    <p>{a.d}</p>
                  </div>
                );
              })}
            </div>
          </section>
        ) : null}

        {svc.offer ? (
          <section className="nrd-section">
            <SectionHead title="What We Offer" sub="What we design, engineer, and permit." />
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
            <SectionHead title="Scope of Services" sub="Coordinated across architecture, engineering, and permitting." />
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
            <SectionHead title="Project Gallery" sub="A selection of recent project work." />
            <Gallery shots={svc.gallery} />
          </section>
        ) : null}

        <section className="nrd-section">
          <SectionHead title="Our Process" sub="From first conversation through approval." />
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

        <nav className="nrd-section" aria-label="Other residential services">
          <SectionHead title="Explore Other Services" />
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
          <div className="nrd-foot-main">
            <div className="nrd-foot-lead">
              <h2 className="nrd-foot-head">Open to new projects and collaborations that shape meaningful spaces.</h2>
              <a className="nrd-foot-cta" href={CONTACT}>Start a Project</a>
            </div>
            <div className="nrd-foot-cols">
              <div className="nrd-foot-col">
                <a href={HOME_HREF}>Home</a>
                <a href={RESIDENTIAL_HREF}>About</a>
                <a href={RESIDENTIAL_HREF}>Services</a>
                <a href={RESIDENTIAL_HREF}>Projects</a>
                <a href={RESIDENTIAL_HREF}>Process</a>
                <a href={CONTACT}>Contact</a>
              </div>
              <div className="nrd-foot-col">
                <a href={CONTACT}>Pinterest</a>
                <a href={CONTACT}>LinkedIn</a>
                <a href={CONTACT}>Instagram</a>
                <a href={CONTACT}>Behance</a>
              </div>
              <div className="nrd-foot-col">
                <a href={RESIDENTIAL_HREF}>Privacy Policy</a>
                <a href={RESIDENTIAL_HREF}>Cookie Policy</a>
                <a href={RESIDENTIAL_HREF}>Terms &amp; Conditions</a>
              </div>
            </div>
          </div>
          <div className="nrd-foot-bottom">
            <div className="nrd-foot-icons">
              <a href={CONTACT} aria-label="Email"><Mail size={16} strokeWidth={1.6} /></a>
              <a href="tel:+17141234567" aria-label="Phone"><Phone size={16} strokeWidth={1.6} /></a>
              <span aria-label="Location, Los Angeles, CA"><MapPin size={16} strokeWidth={1.6} /></span>
            </div>
            <p className="nrd-foot-copy">© 2026 NGUYEN Architecture &amp; Engineering. All Rights Reserved.</p>
          </div>
        </div>
        <div className="nrd-marquee" aria-hidden="true">
          <div className="nrd-marquee-track">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i}>NGUYEN Architecture &amp; Engineering</span>
            ))}
          </div>
        </div>
        <div className="nrd-foot-img">
          <img src="/client-8889/residential/svc-03-adus.jpg" alt="NGUYEN residential architecture" />
        </div>
      </footer>
    </div>
  );
}
