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

const STAGES = [
  {
    num: '01',
    title: 'Concrete Pour & Foundation',
    body: 'We prepare the site, set forms, and pour a strong, precise foundation to ensure long-term durability.',
    src: `${BASE}/builders-complete-05-concrete-pour.webp`,
    alt: 'Crew placing concrete over rebar for a residential foundation slab at golden hour',
  },
  {
    num: '02',
    title: 'Structural Coordination',
    body: 'We coordinate structural engineering and materials to bring the design to life and keep the project on track.',
    src: `${BASE}/builders-complete-06-framing-aerial.webp`,
    alt: 'Aerial view of a two-story residential project during structural framing',
  },
  {
    num: '03',
    title: 'Framing Progress',
    body: 'The structure takes shape with precision framing, following approved plans and quality standards.',
    src: `${BASE}/builders-complete-03-framing-wide.webp`,
    alt: 'Wide aerial view of residential framing in progress',
  },
  {
    num: '04',
    title: 'Interior & Exterior Build',
    body: 'We install systems, complete interior and exterior finishes, and focus on quality craftsmanship in every detail.',
    src: `${BASE}/builders-complete-04-framing-complete.webp`,
    alt: 'Advanced framing stage of the coastal residential project',
  },
  {
    num: '05',
    title: 'Final Completion',
    body: 'We conduct final inspections, address any punch list items, and deliver a move-in-ready space built to last.',
    src: `${BASE}/builders-complete-07-finished-home.webp`,
    alt: 'Finished modern coastal home after construction completion',
  },
];

const CSS = `
.bcd{--bg:#f0ebe6;--surface:#f7f4ef;--ink:#4f4742;--deep:#211e1b;--muted:#817970;--line:rgba(79,71,66,.17);--gold:#b3894f;background:var(--bg);color:var(--ink);min-height:100vh;font-family:"Inter Display","Inter",system-ui,-apple-system,"Segoe UI",Helvetica,Arial,sans-serif}
.bcd *{box-sizing:border-box}.bcd a{color:inherit;text-decoration:none}.bcd-shell{width:min(1380px,100%);margin:0 auto;padding:0 clamp(20px,4vw,64px)}
.bcd-back{display:inline-flex;align-items:center;gap:10px;margin:28px 0 0;font-size:12px;text-transform:uppercase;letter-spacing:.12em;color:var(--muted);transition:color .2s}.bcd-back:hover{color:var(--deep)}
.bcd-btn{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:0 22px;border:1px solid var(--ink);border-radius:999px;font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase}.bcd-btn.primary{background:var(--ink);color:#f6f1eb}
.bcd-cta{padding:clamp(72px,9vw,130px) 0;text-align:center;border-top:1px solid var(--line)}.bcd-cta h2{margin:0 auto;max-width:15ch;color:var(--deep);font-size:clamp(34px,5vw,68px);line-height:.98;font-weight:500;letter-spacing:-.045em;text-transform:uppercase}.bcd-cta p{max-width:620px;margin:22px auto 28px;color:var(--muted);line-height:1.65}
/* shared Builders hero: intentionally unchanged */
.bcd .nrd-banner{position:relative;margin:12px;border-radius:12px;height:97vh;max-height:1000px;overflow:hidden;background:#1a1712}
.bcd .nrd-banner img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.bcd .nrd-banner-ov{position:absolute;inset:0;background:linear-gradient(#00000036 0%,#000000c9 100%)}
.bcd .nrd-banner-inner{position:absolute;left:50%;bottom:40px;z-index:1;width:94%;transform:translateX(-50%)}
.bcd .nrd-banner-h1{font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-size:clamp(32px,3.9vw,56px);font-weight:400;letter-spacing:-.02em;line-height:1.1;color:#efede9;margin:0 0 clamp(32px,3.9vw,56px)}
.bcd .nrd-banner-rule{display:flex;height:1px;margin:0 0 20px;overflow:hidden}.bcd .nrd-rule-h{flex:1 1 50%;height:1px;background:rgba(247,244,238,.38)}
.bcd .nrd-banner-cap{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px}.bcd .nrd-banner-cap span{font-size:clamp(13px,1.1vw,16px);letter-spacing:.01em;line-height:1.3;color:rgba(239,237,233,.85);font-weight:400}.bcd .nrd-banner-cap span:nth-child(2){text-align:center}.bcd .nrd-banner-cap span:nth-child(3){text-align:right}
@keyframes nrd-img-in{to{clip-path:inset(0% 0% 0% 0%);opacity:1}}@keyframes nrd-fade-in{to{opacity:1}}@keyframes nrd-slide-in{to{transform:translateX(0);opacity:1}}
.bcd .nrd-anim img{clip-path:inset(0% 0% 100% 0%);opacity:0;animation:nrd-img-in 1.3s cubic-bezier(.22,1,.36,1) 2s both}.bcd .nrd-anim .nrd-banner-ov{opacity:.001;animation:nrd-fade-in .5s ease-out 2.4s both}.bcd .nrd-anim .nrd-rule-l{transform:translateX(-600px);opacity:.001;animation:nrd-slide-in .9s cubic-bezier(.44,0,.56,1) 2.2s both}.bcd .nrd-anim .nrd-rule-r{transform:translateX(600px);opacity:.001;animation:nrd-slide-in .9s cubic-bezier(.44,0,.56,1) 2.2s both}
/* body-only redesign */
.bcd-journey{width:min(1560px,calc(100vw - 32px));margin:clamp(54px,7vw,104px) auto clamp(72px,8vw,120px);padding:0 clamp(8px,2vw,28px)}
.bcd-journey-head{display:flex;align-items:center;gap:16px;margin:0 0 clamp(24px,3vw,42px);font-size:11px;font-weight:600;letter-spacing:.19em;text-transform:uppercase;color:var(--gold)}.bcd-journey-head::after{content:"";width:52px;height:1px;background:var(--gold);opacity:.8}
.bcd-stage{display:grid;grid-template-columns:minmax(280px,.72fr) minmax(0,1.8fr);gap:clamp(28px,4vw,64px);align-items:stretch;min-height:clamp(260px,26vw,390px)}.bcd-stage+.bcd-stage{margin-top:clamp(18px,2vw,30px)}
.bcd-stage-left{position:relative;display:flex;flex-direction:column;justify-content:center;padding:28px 0 28px 104px}.bcd-stage-left::before{content:"";position:absolute;left:58px;top:-18px;bottom:-18px;width:1px;background:rgba(179,137,79,.55)}.bcd-stage:first-child .bcd-stage-left::before{top:50%}.bcd-stage:last-child .bcd-stage-left::before{bottom:50%}.bcd-stage-left::after{content:"";position:absolute;left:51px;top:50%;width:14px;height:14px;border:1px solid var(--gold);border-radius:50%;background:var(--bg);transform:translateY(-50%)}
.bcd-stage-num-left{position:absolute;left:0;top:50%;transform:translateY(-50%);font-size:clamp(20px,1.8vw,28px);font-weight:400;color:var(--gold);letter-spacing:.02em}.bcd-stage-title{margin:0;color:var(--deep);font-size:clamp(22px,2vw,32px);line-height:1.08;font-weight:500;letter-spacing:-.025em}.bcd-stage-copy{margin:14px 0 0;max-width:31ch;color:var(--muted);font-size:14px;line-height:1.68}
.bcd-stage-media{position:relative;overflow:hidden;background:#d7d0c6;min-height:280px}.bcd-stage-media img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .65s cubic-bezier(.22,1,.36,1)}.bcd-stage:hover .bcd-stage-media img{transform:scale(1.018)}
@media(max-width:1000px){.bcd-stage{grid-template-columns:minmax(230px,.8fr) minmax(0,1.45fr);gap:30px;min-height:300px}.bcd-stage-left{padding-left:86px}.bcd-stage-left::before{left:46px}.bcd-stage-left::after{left:39px}.bcd-stage-copy{max-width:28ch}}
@media(max-width:720px){.bcd .nrd-banner-cap{grid-template-columns:1fr}.bcd .nrd-banner-cap span:nth-child(2),.bcd .nrd-banner-cap span:nth-child(3){display:none}.bcd-journey{width:100%;padding:0 20px}.bcd-stage{grid-template-columns:1fr;gap:16px;min-height:0}.bcd-stage+.bcd-stage{margin-top:48px}.bcd-stage-left{padding:0 0 0 58px;min-height:118px}.bcd-stage-left::before{left:23px;top:-24px;bottom:-24px}.bcd-stage:first-child .bcd-stage-left::before{top:50%}.bcd-stage:last-child .bcd-stage-left::before{bottom:auto;height:50%}.bcd-stage-left::after{left:16px}.bcd-stage-num-left{left:0;font-size:17px}.bcd-stage-title{font-size:25px}.bcd-stage-copy{max-width:36ch}.bcd-stage-media{min-height:0;aspect-ratio:4/3}.bcd-cta{padding-left:8px;padding-right:8px}}
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
      </div>

      <section className="bcd-journey" aria-labelledby="builders-process-title">
        <div id="builders-process-title" className="bcd-journey-head">Our Process</div>
        {STAGES.map((stage) => (
          <article className="bcd-stage" key={stage.num}>
            <div className="bcd-stage-left">
              <span className="bcd-stage-num-left">{stage.num}</span>
              <h2 className="bcd-stage-title">{stage.title}</h2>
              <p className="bcd-stage-copy">{stage.body}</p>
            </div>
            <div className="bcd-stage-media">
              <img src={stage.src} alt={stage.alt} loading={stage.num === '01' ? 'eager' : 'lazy'} />
            </div>
          </article>
        ))}
      </section>

      <div className="bcd-shell">
        <section className="bcd-cta">
          <h2>Ready to move your project from plan to completion?</h2>
          <p>Tell us where the project stands today. We can help coordinate the next phase and keep the work moving.</p>
          <Link className="bcd-btn primary" href={CONTACT}>Start Your Project</Link>
        </section>
      </div>
    </main>
  );
}
