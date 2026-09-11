import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../navbar';
import HeroBanner from '../[slug]/hero-banner';

const BASE = '/client-8889/residential/detail';
const CONTACT = '/client-demos/client-8889/residential/contact';
const SERVICES = '/client-demos/client-8889/arcsphere-socal#services';

export const metadata: Metadata = {
  title: 'Builders Complete Delivery — NGUYEN Architecture',
  description: 'Planning, permitting, construction coordination, and project delivery from early feasibility through completion.',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

const PROCESS = [
  ['01', 'Planning & Feasibility', 'Define goals, site conditions, budget, schedule, and the project path before construction begins.'],
  ['02', 'Design & Engineering', 'Coordinate architecture, structural, MEP, Title 24, and the technical documentation needed to build.'],
  ['03', 'Permitting', 'Prepare permit-ready documents, coordinate submittals, and respond to plan-check comments through approval.'],
  ['04', 'Preconstruction', 'Align scope, sequencing, consultants, trades, and major project requirements before field work moves forward.'],
  ['05', 'Construction Coordination', 'Support the active build with design clarification, coordination, site communication, and issue resolution.'],
  ['06', 'Completion', 'Coordinate final project items and help carry the work through the last stages toward a completed project.'],
];

const GALLERY = [
  { src: `${BASE}/builders-complete-01-foundation.webp`, label: 'Foundation + Site', alt: 'Aerial view of residential foundation and active construction site' },
  { src: `${BASE}/builders-complete-02-framing-east.webp`, label: 'Framing Progress', alt: 'Aerial view of residential wood framing in progress' },
  { src: `${BASE}/builders-complete-03-framing-wide.webp`, label: 'Structure + Coordination', alt: 'Wide aerial view of a framed residential project under construction' },
  { src: `${BASE}/builders-complete-04-framing-complete.webp`, label: 'Framing Delivery', alt: 'Completed framing stage of a coastal residential project' },
  { src: `${BASE}/builders-complete-05-concrete-pour.webp`, label: 'Concrete Pour', alt: 'Crew placing concrete over rebar for a residential foundation slab at golden hour' },
  { src: `${BASE}/builders-complete-06-framing-aerial.webp`, label: 'Two-Story Framing', alt: 'Aerial view of a two-story residential project during wood framing' },
];

const CSS = `
.bcd{--bg:#f0ebe6;--surface:#f7f4ef;--ink:#4f4742;--deep:#211e1b;--muted:#817970;--line:rgba(79,71,66,.17);--gold:#b3894f;background:var(--bg);color:var(--ink);min-height:100vh;font-family:"Inter Display","Inter",system-ui,-apple-system,"Segoe UI",Helvetica,Arial,sans-serif}
.bcd *{box-sizing:border-box}.bcd a{color:inherit;text-decoration:none}.bcd-shell{width:min(1380px,100%);margin:0 auto;padding:0 clamp(20px,4vw,64px)}
.bcd-back{display:inline-flex;align-items:center;gap:10px;margin:28px 0 0;font-size:12px;text-transform:uppercase;letter-spacing:.12em;color:var(--muted)}
.bcd-hero{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:clamp(34px,5vw,76px);align-items:center;padding:clamp(42px,6vw,90px) 0 clamp(66px,8vw,116px)}
.bcd-kicker{margin:0 0 18px;font-size:11px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:var(--gold)}
.bcd h1{margin:0;max-width:10ch;color:var(--deep);font-size:clamp(42px,6.5vw,86px);line-height:.93;font-weight:500;letter-spacing:-.055em;text-transform:uppercase}
.bcd-lead{max-width:42rem;margin:26px 0 0;font-size:clamp(16px,1.35vw,19px);line-height:1.65;color:#5f574f}
.bcd-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}.bcd-btn{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:0 22px;border:1px solid var(--ink);border-radius:999px;font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase}.bcd-btn.primary{background:var(--ink);color:#f6f1eb}
.bcd-hero-media{position:relative;min-height:clamp(430px,55vw,720px);overflow:hidden;background:#d8d0c5}.bcd-hero-media img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}.bcd-hero-tag{position:absolute;left:18px;bottom:18px;background:rgba(32,28,25,.78);color:white;padding:10px 13px;font-size:10px;text-transform:uppercase;letter-spacing:.13em;backdrop-filter:blur(5px)}
.bcd-section{padding:clamp(66px,8vw,116px) 0;border-top:1px solid var(--line)}.bcd-section-head{display:grid;grid-template-columns:.7fr 1.3fr;gap:30px;margin-bottom:clamp(34px,5vw,64px)}.bcd-section-head p{margin:0;font-size:11px;font-weight:600;letter-spacing:.17em;text-transform:uppercase;color:var(--gold)}.bcd-section-head h2{margin:0;max-width:18ch;color:var(--deep);font-size:clamp(30px,4vw,54px);line-height:1.03;font-weight:500;letter-spacing:-.04em;text-transform:uppercase}
.bcd-scope{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--line);border-left:1px solid var(--line)}.bcd-scope div{min-height:190px;padding:26px;border-right:1px solid var(--line);border-bottom:1px solid var(--line)}.bcd-scope strong{display:block;margin-bottom:13px;color:var(--deep);font-size:13px;text-transform:uppercase;letter-spacing:.08em}.bcd-scope span{font-size:13px;line-height:1.58;color:var(--muted)}
.bcd-process{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--line);border:1px solid var(--line)}.bcd-step{background:var(--bg);padding:30px;min-height:240px}.bcd-step-num{font-size:11px;letter-spacing:.15em;color:var(--gold)}.bcd-step h3{margin:52px 0 12px;color:var(--deep);font-size:18px;font-weight:600;text-transform:uppercase;letter-spacing:.02em}.bcd-step p{margin:0;color:var(--muted);font-size:13px;line-height:1.62}
.bcd-gallery{display:grid;grid-template-columns:repeat(2,1fr);gap:clamp(18px,2vw,30px)}.bcd-shot{margin:0}.bcd-shot-img{aspect-ratio:4/3;overflow:hidden;background:#d7d0c6}.bcd-shot img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .55s ease}.bcd-shot:hover img{transform:scale(1.025)}.bcd-shot figcaption{display:flex;justify-content:space-between;gap:20px;padding:13px 1px 0;font-size:11px;letter-spacing:.11em;text-transform:uppercase;color:var(--muted)}
.bcd-cta{padding:clamp(72px,9vw,130px) 0;text-align:center;border-top:1px solid var(--line)}.bcd-cta h2{margin:0 auto;max-width:15ch;color:var(--deep);font-size:clamp(34px,5vw,68px);line-height:.98;font-weight:500;letter-spacing:-.045em;text-transform:uppercase}.bcd-cta p{max-width:620px;margin:22px auto 28px;color:var(--muted);line-height:1.65}
@media(max-width:900px){.bcd-hero{grid-template-columns:1fr}.bcd-hero-media{min-height:560px}.bcd-section-head{grid-template-columns:1fr}.bcd-scope{grid-template-columns:repeat(2,1fr)}.bcd-process{grid-template-columns:repeat(2,1fr)}}
@media(max-width:600px){.bcd h1{font-size:clamp(42px,13vw,62px)}.bcd-hero{padding-top:34px}.bcd-hero-media{min-height:410px}.bcd-scope{grid-template-columns:1fr}.bcd-process{grid-template-columns:1fr}.bcd-gallery{grid-template-columns:1fr}.bcd-step{min-height:0}.bcd-step h3{margin-top:34px}}
/* full-width animated hero banner — reuses the shared HeroBanner component so the entrance
   (image clip-path reveal, overlay fade, rule-line slides) is the exact same WAAPI animation
   as the other service pages. Class names match the component; scoped under .bcd. */
.bcd .nrd-banner{position:relative;margin:12px;border-radius:12px;height:97vh;max-height:1000px;overflow:hidden;background:#1a1712}
.bcd .nrd-banner img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.bcd .nrd-banner-ov{position:absolute;inset:0;background:linear-gradient(#00000036 0%,#000000c9 100%)}
.bcd .nrd-banner-inner{position:absolute;left:50%;bottom:40px;z-index:1;width:94%;transform:translateX(-50%)}
.bcd .nrd-banner-h1{font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-size:clamp(32px,3.9vw,56px);font-weight:400;letter-spacing:-.02em;line-height:1.1;color:#efede9;margin:0 0 clamp(32px,3.9vw,56px)}
.bcd .nrd-banner-rule{display:flex;height:1px;margin:0 0 20px;overflow:hidden}
.bcd .nrd-rule-h{flex:1 1 50%;height:1px;background:rgba(247,244,238,.38)}
.bcd .nrd-banner-cap{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px}
.bcd .nrd-banner-cap span{font-size:clamp(13px,1.1vw,16px);letter-spacing:.01em;line-height:1.3;color:rgba(239,237,233,.85);font-weight:400}
.bcd .nrd-banner-cap span:nth-child(2){text-align:center}
.bcd .nrd-banner-cap span:nth-child(3){text-align:right}
@keyframes nrd-img-in{to{clip-path:inset(0% 0% 0% 0%);opacity:1}}
@keyframes nrd-fade-in{to{opacity:1}}
@keyframes nrd-slide-in{to{transform:translateX(0);opacity:1}}
.bcd .nrd-anim img{clip-path:inset(0% 0% 100% 0%);opacity:0;animation:nrd-img-in 1.3s cubic-bezier(.22,1,.36,1) 2s both}
.bcd .nrd-anim .nrd-banner-ov{opacity:.001;animation:nrd-fade-in .5s ease-out 2.4s both}
.bcd .nrd-anim .nrd-rule-l{transform:translateX(-600px);opacity:.001;animation:nrd-slide-in .9s cubic-bezier(.44,0,.56,1) 2.2s both}
.bcd .nrd-anim .nrd-rule-r{transform:translateX(600px);opacity:.001;animation:nrd-slide-in .9s cubic-bezier(.44,0,.56,1) 2.2s both}
.bcd-intro{padding:clamp(38px,5vw,68px) 0 clamp(8px,1.6vw,18px)}
.bcd-intro-h{margin:16px 0 0;max-width:18ch;color:var(--deep);font-size:clamp(28px,3.8vw,50px);line-height:1.04;font-weight:500;letter-spacing:-.035em;text-transform:uppercase}
@media(max-width:600px){.bcd .nrd-banner-cap{grid-template-columns:1fr}.bcd .nrd-banner-cap span:nth-child(2),.bcd .nrd-banner-cap span:nth-child(3){display:none}}
`;

export default function BuildersCompleteDeliveryPage() {
  return (
    <main className="bcd">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <Navbar />
      <HeroBanner
        hero={`${BASE}/builders-complete-04-framing-complete.webp`}
        title="Builders Complete Delivery"
        label="Builders Complete Delivery"
        caption={['Planning & Permitting', 'Design & Engineering', 'Construction & Completion']}
      />
      <div className="bcd-shell">
        <Link className="bcd-back" href={SERVICES}>← Back to Services</Link>
        <section className="bcd-intro">
          <p className="bcd-kicker">NGUYEN · Full Project Delivery</p>
          <h2 className="bcd-intro-h">One coordinated path from plan to completion.</h2>
          <p className="bcd-lead">One coordinated path from early planning and permits through active construction support and completion. NGUYEN keeps the design, engineering, approval, and field coordination connected so the project can move forward with fewer handoffs.</p>
          <div className="bcd-actions">
            <Link className="bcd-btn primary" href={CONTACT}>Start a Project</Link>
            <Link className="bcd-btn" href={SERVICES}>View Services</Link>
          </div>
        </section>

        <section className="bcd-section">
          <div className="bcd-section-head"><p>Complete Delivery</p><h2>A connected team across the full project.</h2></div>
          <div className="bcd-scope">
            <div><strong>Planning</strong><span>Site review, feasibility, scope definition, schedule, and early project strategy.</span></div>
            <div><strong>Design + Engineering</strong><span>Architecture, structural, MEP, Title 24, and coordinated technical documents.</span></div>
            <div><strong>Permits + Approvals</strong><span>Permit submittals, plan-check responses, revisions, and agency coordination.</span></div>
            <div><strong>Construction Support</strong><span>Field coordination, design clarification, consultant communication, and support through completion.</span></div>
          </div>
        </section>

        <section className="bcd-section">
          <div className="bcd-section-head"><p>Process</p><h2>From the first decision to the final stage.</h2></div>
          <div className="bcd-process">
            {PROCESS.map(([num, title, body]) => <article className="bcd-step" key={num}><span className="bcd-step-num">{num}</span><h3>{title}</h3><p>{body}</p></article>)}
          </div>
        </section>

        <section className="bcd-section">
          <div className="bcd-section-head"><p>Construction Progress</p><h2>One project, documented as it moves forward.</h2></div>
          <div className="bcd-gallery">
            {GALLERY.map((shot, index) => <figure className="bcd-shot" key={shot.src}><div className="bcd-shot-img"><img src={shot.src} alt={shot.alt} loading={index === 0 ? 'eager' : 'lazy'} /></div><figcaption><span>{shot.label}</span><span>{String(index + 1).padStart(2, '0')}</span></figcaption></figure>)}
          </div>
        </section>

        <section className="bcd-cta">
          <h2>Ready to move your project from plan to completion?</h2>
          <p>Tell us where the project stands today. We can help coordinate the next phase and keep the work moving.</p>
          <Link className="bcd-btn primary" href={CONTACT}>Start Your Project</Link>
        </section>
      </div>
    </main>
  );
}
