import { headers } from 'next/headers';

const SOURCE_URL = 'https://arcsphere-studio.framer.website/projects/serenity-villa';
const BASE_URL = 'https://arcsphere-studio.framer.website/';

export const revalidate = 3600;

function isMobileUserAgent(userAgent: string) {
  return /Android|iPhone|iPad|iPod|Mobile|IEMobile|Opera Mini/i.test(userAgent);
}

const CLEANUP = `
<style id="designedbytd-client-demo-cleanup">
  #__framer-badge-container,
  [id^="__framer-editorbar"],
  [class*="framer-editorbar"] {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    pointer-events: none !important;
  }
</style>`;

// Rebrand the reference (ArcSphere "Serenity Villa" project page) to NGUYEN residential content.
// These run as substring rules server-side on desktop and, deferred, client-side on mobile.
const REPLACEMENTS: Array<[RegExp, string]> = [
  // Full-sentence residential copy first, so it matches the original text before the word rules run.
  [/A tranquil residential sanctuary blending natural beauty with luxury\.?/gi, 'From land to building.'],
  [/Dubai['’]s Serenity Villa emphasizes calm, minimalist living\. Open interiors, light-filled rooms, and natural textures create a serene home that perfectly aligns with the owners['’] vision of peaceful luxury\.?/gi, 'One coordinated team for planning, architecture, engineering, permitting, and project support.'],
  [/Serenity Villa, completed in 2025 in Dubai, is a tranquil residential project that highlights minimalism and natural harmony — designed to create a peaceful and elegant living atmosphere\.?/gi, 'NGUYEN provides full-service residential architecture, engineering, Title 24 and permitting — from custom homes and additions to ADUs and multifamily — coordinated from first conversation through approval.'],
  [/ArcSphere Studio/gi, 'NGUYEN ARCHITECTURE & ENGINEERING'],
  [/ArcSphere/gi, 'NGUYEN'],
  [/Serenity Villa/gi, 'Residential'],
  [/\bSerenity\b/gi, 'Residential'],
  [/\bVilla\b/gi, 'Design'],
  [/Khalid &amp; Fatima Al-Mansoori/gi, 'NGUYEN Architecture &amp; Engineering'],
  [/Khalid & Fatima Al-Mansoori/gi, 'NGUYEN Architecture & Engineering'],
  [/Project Owners/gi, 'Studio'],
  [/€4 million/gi, 'Custom Homes · ADUs · Multifamily'],
  [/\bBudget\b/gi, 'Focus'],
  [/680 m²/gi, 'Architecture · Structural · MEP · Permit'],
  [/\bSurface\b/gi, 'Scope'],
  [/\bAddress\b/gi, 'Region'],
  [/Other Projects?/gi, 'Our Services'],
  [/Corporate Office Space/gi, 'ADU'],
  [/Modern Co-working Space/gi, 'Land Development'],
  [/Modern Co-Working Space/gi, 'Land Development'],
  [/Harmony Living Space/gi, 'Commercial'],
  [/Minimalist Apartment Interior/gi, 'Engineering'],
  [/Dubai, 2025/gi, 'Los Angeles'],
  [/Dubai/gi, 'Southern California'],
  [/United Arab Emirates/gi, 'California'],
  [/Your Architecture Studio/gi, 'NGUYEN Architecture & Engineering'],
  [/Get in touch/gi, 'Start a Project'],
];

function removeNonVisualTelemetry(html: string) {
  return html
    .replace(/<script\b(?=[^>]*\bsrc=["']https:\/\/events\.framer\.com\/script(?:\?[^"']*)?["'])[^>]*>\s*<\/script>/gi, '')
    .replace(/<link\b(?=[^>]*\bhref=["']https:\/\/events\.framer\.com\/[^"']*["'])[^>]*>/gi, '');
}

// The reference project page has no services grid, so we inject NGUYEN's eight residential services
// after hydration, just before the "Project Details" section, styled to match the reference.
const SERVICES = [
  { n: '01', t: 'Custom Homes', c: 'Bespoke homes designed around your lifestyle, site, and long-term goals.', img: '/client-8889/residential/svc-01-custom-homes.jpg', slug: 'custom-homes' },
  { n: '02', t: 'Additions &amp; Major Remodels', c: 'Seamlessly expand and transform your home with careful planning and detail.', img: '/client-8889/residential/svc-02-additions-remodels.jpg', slug: 'additions-remodels' },
  { n: '04', t: 'Multifamily / Townhomes / Condos', c: 'Well-designed residences that balance livability, efficiency, and community.', img: '/client-8889/residential/svc-04-multifamily.jpg', slug: 'multifamily' },
  { n: '05', t: 'Engineering &amp; Approvals', c: 'Structural, MEP + Title 24, permitting, and plan-check support — coordinated with your design.', img: '/client-8889/residential/detail/eng-01-structural-frame.jpg', slug: 'engineering-approvals' },
];
const SERVICES_BASE = '/client-demos/client-8889/residential/services/';
const SERVICES_STYLE = `
  #nguyen-residential-services{display:block;background:transparent;padding:clamp(56px,8vw,120px) 0;font-family:"Inter Display","Inter",system-ui,-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#4f4742}
  #nguyen-residential-services .nrs-shell{width:min(1320px,100%);margin:0 auto;padding:0 clamp(20px,4vw,60px);box-sizing:border-box}
  #nguyen-residential-services .nrs-eyebrow{font-size:12px;text-transform:uppercase;letter-spacing:.2em;font-weight:600;color:#736b62;margin:0 0 clamp(32px,4vw,54px)}
  #nguyen-residential-services .nrs-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:clamp(20px,2vw,32px)}
  #nguyen-residential-services .nrs-card{display:flex;flex-direction:column;color:inherit;text-decoration:none;cursor:pointer}
  #nguyen-residential-services .nrs-img{aspect-ratio:3/4;overflow:hidden;background:#e7e0d5;border-radius:0}
  #nguyen-residential-services .nrs-img img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .6s ease}
  #nguyen-residential-services .nrs-card:hover .nrs-img img{transform:scale(1.045)}
  #nguyen-residential-services .nrs-text{padding-top:clamp(18px,1.5vw,24px)}
  #nguyen-residential-services .nrs-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}
  #nguyen-residential-services .nrs-title{text-transform:uppercase;font-size:clamp(15px,1.15vw,18.5px);line-height:1.22;font-weight:600;letter-spacing:.005em;color:#1f1c19;margin:0}
  #nguyen-residential-services .nrs-arrow{flex:none;width:38px;height:38px;border:1px solid #b7afa3;border-radius:50%;display:grid;place-items:center;font-size:15px;color:#1f1c19;transition:background .3s,color .3s}
  #nguyen-residential-services .nrs-card:hover .nrs-arrow{background:#1f1c19;color:#f3f0e9;border-color:#1f1c19}
  #nguyen-residential-services .nrs-copy{font-size:13px;line-height:1.5;color:#8a8177;margin:14px 0 0;max-width:94%}
  @media(max-width:1100px){#nguyen-residential-services .nrs-grid{grid-template-columns:repeat(2,1fr);gap:32px}}
  @media(max-width:560px){#nguyen-residential-services .nrs-grid{grid-template-columns:1fr}#nguyen-residential-services .nrs-img{aspect-ratio:4/3}}`;
const SERVICES_HTML =
  `<style>${SERVICES_STYLE}</style><div class="nrs-shell"><p class="nrs-eyebrow">Our Residential Services</p><div class="nrs-grid">` +
  SERVICES.map((s) => `<a class="nrs-card" data-nhref="${SERVICES_BASE}${s.slug}"><div class="nrs-img"><img data-nsrc="${s.img}" alt="${s.t}" loading="lazy"></div><div class="nrs-text"><div class="nrs-head"><h3 class="nrs-title">${s.t}</h3><span class="nrs-arrow">↗</span></div><p class="nrs-copy">${s.c}</p></div></a>`).join('') +
  `</div></div>`;

// One client script for both surfaces. It applies the same REPLACEMENTS as substring rules to text
// nodes (a WeakSet stops any rule whose output contains its input from growing on re-runs), rewrites
// mailto, injects the residential services section after hydration, and rescues any content the
// runtime leaves hidden. It defers on mobile (clean hydration) and runs immediately + observes on
// desktop; a shared safety net reveals the page if the runtime ever stalls and leaves it blank.
const RULES_JSON = JSON.stringify(REPLACEMENTS.map(([re, rep]) => [re.source, re.flags, rep]));
const CLIENT_REBRAND = `
<script id="nguyen-residential-rebrand">
(function(){
  try {
    var isMobile = window.matchMedia && window.matchMedia('(max-width: 809.98px)').matches;
    var rules = ${RULES_JSON}.map(function (r) { return [new RegExp(r[0], r[1]), r[2]]; });
    var done = new WeakSet();
    var SERVICES_HTML = ${JSON.stringify(SERVICES_HTML)};
    // The reference's interior gallery sits directly before the "Project Details" section:
    // it's the block holding multiple images and no <h1> (the intro block has the hero <h1>).
    function findGallery(){
      var details = document.querySelector('section[data-framer-name="Details"]');
      if (!details) return null;
      var el = details.previousElementSibling, guard = 0;
      while (el && guard++ < 8) {
        if (el.querySelectorAll && el.id !== 'nguyen-residential-services') {
          if (el.querySelectorAll('img').length >= 2 && el.querySelectorAll('h1').length === 0) return el;
        }
        el = el.previousElementSibling;
      }
      return null;
    }
    function hideGallery(){
      var g = findGallery();
      if (g) { g.style.setProperty('display', 'none', 'important'); return true; }
      return false;
    }
    function injectServices(){
      if (document.getElementById('nguyen-residential-services')) { hideGallery(); return true; }
      // Prefer the gallery's spot so the cards move up into it; fall back to before Project Details.
      var gallery = findGallery();
      var anchor = gallery || document.querySelector('[data-framer-name="Details"]');
      if (!anchor) {
        var heads = document.querySelectorAll('h1,h2,h3');
        for (var i = 0; i < heads.length; i++) { if (/project\\s*details/i.test((heads[i].textContent || ''))) { anchor = heads[i].closest('[data-framer-name]') || heads[i]; break; } }
      }
      if (!anchor || !anchor.parentNode) return false;
      var sec = document.createElement('section');
      sec.id = 'nguyen-residential-services';
      sec.innerHTML = SERVICES_HTML;
      anchor.parentNode.insertBefore(sec, anchor);
      sec.querySelectorAll('[data-nsrc]').forEach(function (img) { img.setAttribute('src', window.location.origin + img.getAttribute('data-nsrc')); });
      // The page <base href> points at the Framer origin, so resolve card links against the real origin.
      sec.querySelectorAll('[data-nhref]').forEach(function (a) { a.setAttribute('href', window.location.origin + a.getAttribute('data-nhref')); });
      if (gallery) gallery.style.setProperty('display', 'none', 'important');
      return true;
    }
    function rebrandNode(node){
      var raw = node.nodeValue; if (!raw || !raw.trim() || done.has(node)) return;
      done.add(node);
      var next = raw;
      for (var i = 0; i < rules.length; i++) next = next.replace(rules[i][0], rules[i][1]);
      if (next !== raw) node.nodeValue = next;
    }
    function rebrand(root){
      if (!root) return;
      var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); var n;
      while ((n = walker.nextNode())) rebrandNode(n);
      document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) { a.setAttribute('href', 'mailto:info@nguyenarchitecture.com'); });
    }
    function effOpacity(el){ var o = 1, n = el; while (n && n !== document.body) { var v = parseFloat(window.getComputedStyle(n).opacity); if (!isNaN(v)) o *= v; if (o < 0.05) return 0; n = n.parentElement; } return o; }
    function looksBlank(){
      var root = document.getElementById('main'); if (!root) return false;
      var els = root.querySelectorAll('h1,h2,h3,p,a,button,span,li'); var visible = 0, vh = window.innerHeight || 800;
      for (var i = 0; i < els.length && visible < 3; i++) {
        var el = els[i], cs = window.getComputedStyle(el);
        if (cs.display === 'none' || cs.visibility === 'hidden' || effOpacity(el) < 0.5) continue;
        var r = el.getBoundingClientRect();
        if (r.top >= vh || r.bottom <= 0 || r.width <= 0 || r.height <= 0) continue;
        if (el.textContent && el.textContent.trim()) visible++;
      }
      return visible < 3;
    }
    function reveal(){
      var root = document.getElementById('main'); if (!root) return;
      var els = root.querySelectorAll('*');
      for (var i = 0; i < els.length; i++) {
        var el = els[i], cs = window.getComputedStyle(el);
        if (cs.display === 'none') continue;
        if (cs.visibility === 'hidden') el.style.setProperty('visibility', 'visible', 'important');
        if (parseFloat(cs.opacity) < 0.05) {
          el.style.setProperty('opacity', '1', 'important');
          if (cs.transform && cs.transform !== 'none') el.style.setProperty('transform', 'none', 'important');
          if (cs.filter && cs.filter !== 'none') el.style.setProperty('filter', 'none', 'important');
        }
      }
    }
    function squareImages(){
      var imgs = document.querySelectorAll('img');
      for (var i = 0; i < imgs.length; i++) {
        var img = imgs[i];
        var ir = parseFloat(window.getComputedStyle(img).borderTopLeftRadius) || 0;
        var iw = img.getBoundingClientRect().width || 0;
        if (ir > 0 && ir < iw / 2) img.style.setProperty('border-radius', '0', 'important');
        var el = img.parentElement, depth = 0;
        while (el && el !== document.body && depth < 4) {
          var cs = window.getComputedStyle(el);
          var br = parseFloat(cs.borderTopLeftRadius) || 0;
          var w = el.getBoundingClientRect().width || 0;
          if (br > 0 && br < w / 2) el.style.setProperty('border-radius', '0', 'important');
          el = el.parentElement; depth++;
        }
      }
    }
    // Retarget the reference's "Other Projects" cards (in DOM order: ADU, Land
    // Development, Commercial, Engineering) to NGUYEN's service pages. Position-based
    // so residual reference category text (e.g. "Commercial Interior") can't mis-route.
    var SERVICE_CARDS = [
      { href: '/client-demos/client-8889/residential/services/adus', img: '/client-8889/residential/svc-03-adus.jpg' },
      { href: '/client-demos/client-8889/residential/services/land-development', img: '/client-8889/residential/svc-04-multifamily.jpg' },
      { href: '/client-demos/client-8889/residential/services/commercial', img: '/client-8889/residential/detail/cm-01-multifamily-exterior.jpg' },
      { href: '/client-demos/client-8889/residential/services/engineering-approvals', img: '/client-8889/residential/detail/eng-01-structural-frame.jpg' }
    ];
    function routeServices(){
      var sec = document.querySelector('[data-framer-name="More-Projects"]');
      if (!sec) {
        var heads = document.querySelectorAll('h1,h2,h3');
        for (var i = 0; i < heads.length; i++) { if (/our services|other project/i.test(heads[i].textContent || '')) { sec = heads[i].closest('section') || heads[i].parentElement; break; } }
      }
      if (!sec) return false;
      var cards = Array.prototype.slice.call(sec.querySelectorAll('a')).filter(function (a) { return a.querySelector('img'); });
      cards.forEach(function (a, i) {
        if (i >= SERVICE_CARDS.length) return;
        a.setAttribute('href', window.location.origin + SERVICE_CARDS[i].href);
        a.removeAttribute('target'); a.removeAttribute('rel');
        var img = a.querySelector('img');
        if (img) { img.removeAttribute('srcset'); img.setAttribute('src', window.location.origin + SERVICE_CARDS[i].img); }
      });
      return true;
    }
    function start(){
      rebrand(document.body);
      var observer = new MutationObserver(function (muts) {
        muts.forEach(function (m) {
          if (m.type === 'characterData') { done.delete(m.target); rebrandNode(m.target); return; }
          m.addedNodes.forEach(function (nd) { if (nd.nodeType === 3) rebrandNode(nd); else if (nd.querySelectorAll) rebrand(nd); });
        });
      });
      observer.observe(document.body, { childList: true, subtree: true, characterData: true });
      setTimeout(function () { observer.disconnect(); }, 9000);
    }
    if (isMobile) { setTimeout(start, 1800); setTimeout(function () { reveal(); }, 4500); }
    else { start(); }
    // Insert the services section after Framer has hydrated so it is not reconciled away; retry until it
    // lands, and keep the reference's interior gallery hidden across any re-render.
    [1600, 2600, 4000, 6000].forEach(function (t) { setTimeout(function () { injectServices(); hideGallery(); squareImages(); routeServices(); }, t); });
    [800, 5000, 8000].forEach(function (t) { setTimeout(function () { squareImages(); routeServices(); if (looksBlank()) reveal(); }, t); });
  } catch (e) {}
})();
</script>`;

async function getSource() {
  let lastError: unknown = null;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(SOURCE_URL, { next: { revalidate: 3600 }, headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'text/html,application/xhtml+xml' } });
      if (response.ok) return response.text();
      lastError = new Error(`Upstream returned ${response.status}`);
    } catch (error) { lastError = error; }
    if (attempt < 2) await new Promise((resolve) => setTimeout(resolve, 200 * (attempt + 1)));
  }
  throw lastError instanceof Error ? lastError : new Error('Unable to load source');
}

export async function GET() {
  try {
    let html = await getSource();
    html = removeNonVisualTelemetry(html);
    html = html.replace(/<head([^>]*)>/i, `<head$1><base href="${BASE_URL}"><meta name="robots" content="noindex,nofollow,noarchive">${CLEANUP}`);
    html = html.replace(/<title>[^<]*<\/title>/i, '<title>NGUYEN Architecture & Engineering — Residential</title>');

    const userAgent = (await headers()).get('user-agent') || '';
    const mobile = isMobileUserAgent(userAgent);

    if (!mobile) {
      // Desktop: rebrand the served HTML directly. On mobile the served DOM stays identical to
      // Framer's so hydration matches (CLIENT_REBRAND does the rebrand after hydration instead).
      for (const [pattern, replacement] of REPLACEMENTS) html = html.replace(pattern, replacement);
      html = html.replace(/<base\b[^>]*>/i, `<base href="${BASE_URL}">`);
      html = html.replace(/info@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/gi, 'info@nguyenarchitecture.com');
      html = html.replace(/href=["']mailto:[^"']+["']/gi, 'href="mailto:info@nguyenarchitecture.com"');
    }

    html = html.replace('</body>', `${CLIENT_REBRAND}</body>`);
    return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'private, no-store' } });
  } catch {
    return new Response('<!doctype html><html><body style="font-family:Arial,sans-serif;padding:40px">Residential page is temporarily unavailable. Please refresh in a moment.</body></html>', { status: 502, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }
}
