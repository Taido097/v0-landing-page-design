import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SERVICE_DETAILS, getServiceDetail } from '../services-data';

const RESIDENTIAL_HREF = '/client-demos/client-8889/residential';
const CONTACT = 'mailto:info@nguyenarchitecture.com';

export function generateStaticParams() {
  return SERVICE_DETAILS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const svc = getServiceDetail(slug);
  const title = svc ? `${svc.title} — NGUYEN Residential` : 'NGUYEN Residential';
  return {
    title,
    description: svc?.intro,
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  };
}

const CSS = `
.nrd{--bg:#ece9e3;--surface:#f6f3ee;--surface2:#fbf9f6;--ink:#1f1c19;--muted:#6f675e;--soft:#8a8177;--line:#d9d0c3;
  background:var(--bg);color:var(--ink);min-height:100vh;
  font-family:"Inter Display","Inter",system-ui,-apple-system,"Segoe UI",Helvetica,Arial,sans-serif;
  -webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
.nrd *{box-sizing:border-box}
.nrd a{color:inherit;text-decoration:none}
.nrd-shell{width:min(1200px,100%);margin:0 auto;padding:0 clamp(20px,4vw,60px)}
.nrd-top{display:flex;align-items:center;justify-content:space-between;gap:16px;height:clamp(64px,7vw,84px);border-bottom:1px solid var(--line)}
.nrd-brand{font-size:12px;letter-spacing:.16em;text-transform:uppercase;font-weight:600;color:var(--ink)}
.nrd a.nrd-back{font-size:12.5px;letter-spacing:.06em;color:var(--muted);display:inline-flex;align-items:center;gap:8px;transition:color .25s}
.nrd a.nrd-back:hover{color:var(--ink)}
.nrd-hero{position:relative;margin:clamp(24px,3vw,44px) 0 0;border-radius:16px;overflow:hidden;background:#e7e0d5;
  min-height:clamp(360px,54vw,600px);display:flex;align-items:flex-end}
.nrd-hero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.nrd-hero::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(20,17,14,.05) 0%,rgba(20,17,14,.12) 45%,rgba(20,17,14,.72) 100%)}
.nrd-hero-in{position:relative;z-index:1;padding:clamp(26px,4vw,52px);color:#f3f0e9;max-width:820px}
.nrd-eyebrow{font-size:11.5px;letter-spacing:.2em;text-transform:uppercase;font-weight:600;margin:0 0 16px;opacity:.85}
.nrd-h1{font-size:clamp(30px,5.4vw,60px);line-height:1.02;font-weight:600;letter-spacing:-.02em;text-transform:uppercase;margin:0}
.nrd-sub{font-size:clamp(14px,1.5vw,18px);line-height:1.4;margin:16px 0 0;opacity:.92;font-weight:400}
.nrd-intro{max-width:760px;margin:clamp(40px,5vw,72px) 0 0;font-size:clamp(16px,1.5vw,20px);line-height:1.6;color:#37312c}
.nrd-section{margin-top:clamp(44px,5vw,76px)}
.nrd-label{font-size:11.5px;letter-spacing:.2em;text-transform:uppercase;font-weight:600;color:var(--soft);margin:0 0 clamp(18px,2vw,26px)}
.nrd-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(14px,1.4vw,18px)}
.nrd-card{background:var(--surface2);border:1px solid var(--line);border-radius:14px;padding:clamp(20px,2vw,26px);
  display:flex;align-items:center;justify-content:space-between;gap:14px;min-height:92px;transition:border-color .25s,transform .25s}
.nrd-card:hover{border-color:#bcae9c;transform:translateY(-2px)}
.nrd-card span{font-size:clamp(14px,1.05vw,16px);line-height:1.3;font-weight:500;color:var(--ink)}
.nrd-dot{flex:none;width:8px;height:8px;border-radius:50%;background:#b0a794}
.nrd-process{display:flex;flex-wrap:wrap;gap:clamp(12px,1.4vw,20px)}
.nrd-step{flex:1 1 150px;min-width:140px;background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:clamp(18px,1.8vw,24px)}
.nrd-step-n{font-size:12px;letter-spacing:.1em;color:#a79f94;font-weight:600}
.nrd-step-t{font-size:clamp(14px,1.05vw,16px);line-height:1.28;font-weight:500;margin:12px 0 0;color:var(--ink)}
.nrd-cta{margin-top:clamp(52px,6vw,88px);border-top:1px solid var(--line);padding-top:clamp(36px,4vw,56px);
  display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:20px}
.nrd-cta-h{font-size:clamp(20px,2.4vw,30px);line-height:1.1;font-weight:600;letter-spacing:-.01em;margin:0;max-width:520px}
.nrd a.nrd-btn{display:inline-flex;align-items:center;gap:12px;background:var(--ink);color:#f3f0e9;border-radius:999px;
  padding:16px 30px;font-size:13px;letter-spacing:.12em;text-transform:uppercase;font-weight:600;transition:background .25s,transform .25s}
.nrd a.nrd-btn:hover{background:#000;transform:translateY(-2px)}
.nrd-other{margin-top:clamp(52px,6vw,84px);border-top:1px solid var(--line);padding:clamp(30px,3vw,40px) 0 clamp(60px,7vw,90px)}
.nrd-other-grid{display:flex;flex-wrap:wrap;gap:10px 26px;margin-top:20px}
.nrd-other a{font-size:14px;color:var(--muted);letter-spacing:.01em;transition:color .25s}
.nrd-other a:hover{color:var(--ink)}
.nrd-other a[aria-current="page"]{color:var(--ink);font-weight:600}
@media(max-width:820px){.nrd-cards{grid-template-columns:repeat(2,1fr)}}
@media(max-width:560px){.nrd-cards{grid-template-columns:1fr}.nrd-hero{min-height:420px}}
`;

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const svc = getServiceDetail(slug);
  if (!svc) notFound();

  return (
    <div className="nrd">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="nrd-shell">
        <header className="nrd-top">
          <a href={RESIDENTIAL_HREF} className="nrd-brand">NGUYEN Architecture &amp; Engineering</a>
          <a href={RESIDENTIAL_HREF} className="nrd-back">← Back to Residential</a>
        </header>

        <section className="nrd-hero">
          <img src={svc.hero} alt={svc.title} />
          <div className="nrd-hero-in">
            <p className="nrd-eyebrow">Residential Service · {svc.num}</p>
            <h1 className="nrd-h1">{svc.title}</h1>
            {svc.subtitle ? <p className="nrd-sub">{svc.subtitle}</p> : null}
          </div>
        </section>

        <p className="nrd-intro">{svc.intro}</p>

        {svc.groups.map((g) => (
          <section className="nrd-section" key={g.label}>
            <p className="nrd-label">{g.label}</p>
            <div className="nrd-cards">
              {g.items.map((it) => (
                <div className="nrd-card" key={it}>
                  <span>{it}</span>
                  <span className="nrd-dot" aria-hidden="true" />
                </div>
              ))}
            </div>
          </section>
        ))}

        <section className="nrd-section">
          <p className="nrd-label">Process</p>
          <div className="nrd-process">
            {svc.process.map((step, i) => (
              <div className="nrd-step" key={step}>
                <div className="nrd-step-n">{String(i + 1).padStart(2, '0')}</div>
                <p className="nrd-step-t">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="nrd-cta">
          <h2 className="nrd-cta-h">Ready to begin? Let&rsquo;s talk through your project.</h2>
          <a className="nrd-btn" href={CONTACT}>{svc.cta} <span aria-hidden="true">↗</span></a>
        </section>

        <nav className="nrd-other" aria-label="Other residential services">
          <p className="nrd-label" style={{ margin: 0 }}>Explore Other Services</p>
          <div className="nrd-other-grid">
            {SERVICE_DETAILS.map((o) => (
              <a
                key={o.slug}
                href={`${RESIDENTIAL_HREF}/services/${o.slug}`}
                aria-current={o.slug === svc.slug ? 'page' : undefined}
              >
                {o.title}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
