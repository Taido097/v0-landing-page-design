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
  [/ArcSphere Studio/gi, 'NGUYEN ARCHITECTURE'],
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
  [/\bDesign Process\b/gi, 'Home'],
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
  { n: '06', t: 'SB 9 Development', c: 'Feasibility, zoning review, two-unit concepts, urban lot split planning, and coordinated permit support for qualifying properties.', img: '/client-8889/residential/detail/sb9-01-modern-duplex.jpg', slug: 'sb9-development' },
];
const SERVICES_BASE = '/client-demos/client-8889/residential/services/';
const SERVICES_STYLE = `
  #nguyen-residential-services{display:block;background:transparent;padding:clamp(56px,8vw,120px) 0;font-family:"Inter Display","Inter",system-ui,-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#4f4742}
  #nguyen-residential-services .nrs-shell{width:min(1460px,100%);margin:0 auto;padding:0 clamp(20px,4vw,60px);box-sizing:border-box}
  #nguyen-residential-services .nrs-eyebrow{font-size:12px;text-transform:uppercase;letter-spacing:.2em;font-weight:600;color:#736b62;margin:0 0 clamp(32px,4vw,54px)}
  #nguyen-residential-services .nrs-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(248px,1fr));gap:clamp(20px,2vw,30px)}
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
      sec.querySelectorAll('[data-nhref]').forEach(function (a) {
        var href = window.location.origin + a.getAttribute('data-nhref');
        a.setAttribute('href', href);
        a.addEventListener('click', function(e) { e.preventDefault(); e.stopImmediatePropagation(); window.location.href = href; }, true);
      });
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
    var SERVICE_CARDS = [
      { href: '/client-demos/client-8889/residential/services/adus', img: '/client-8889/residential/svc-03-adus.jpg' },
      { href: '/client-demos/client-8889/residential/services/land-development', img: '/client-8889/residential/detail/ld-01-golden-meadow.png' },
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
        var target = window.location.origin + SERVICE_CARDS[i].href;
        a.setAttribute('href', target);
        a.removeAttribute('target'); a.removeAttribute('rel');
        if (!a.dataset.nrouted) {
          a.dataset.nrouted = '1';
          a.addEventListener('click', function(e) { e.preventDefault(); e.stopImmediatePropagation(); window.location.href = target; }, true);
        }
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
    function fixNav(){
      var home = window.location.origin + '/client-demos/client-8889/arcsphere-socal';
      var services = home + '#services';
      var contact = 'mailto:info@nguyen-ae.com';
      var navLinks = document.querySelectorAll('nav a, [data-framer-name="nav"] a');
      navLinks.forEach(function(a){
        var text = (a.textContent || '').trim().toLowerCase().replace(/\\s+/g,' ');
        var compact = text.replace(/\\s+/g,'');
        if (compact === 'projects' || compact === 'projectsprojects') {
          var wrap = a.closest('[class*="container"]');
          if (wrap) wrap.style.setProperty('display','none','important');
          return;
        }
        var target = null;
        if (compact === 'home' || compact === 'homehome') target = home;
        else if (compact === 'services' || compact === 'servicesservices') target = services;
        else if (compact.indexOf('nguyenarchitecture') !== -1) target = home;
        else if (compact === 'contactus' || compact === 'contactuscontactus') {
          a.setAttribute('href', contact);
          return;
        }
        if (!target) return;
        a.setAttribute('href', target);
        a.removeAttribute('target');
        a.removeAttribute('rel');
        if (a.dataset.nnav !== target) {
          a.dataset.nnav = target;
          a.addEventListener('click', function(e){ e.preventDefault(); e.stopImmediatePropagation(); window.location.href = target; }, true);
        }
      });
    }
    [1600, 2600, 4000, 6000].forEach(function (t) { setTimeout(function () { injectServices(); hideGallery(); squareImages(); routeServices(); fixNav(); }, t); });
    [800, 5000, 8000].forEach(function (t) { setTimeout(function () { squareImages(); routeServices(); fixNav(); if (looksBlank()) reveal(); }, t); });
  } catch (e) {}
})();
</script>`;

const SQFT_GUIDE_PATCH = `
<script id="nguyen-sqft-guide-patch">
(function () {
  var ORIGIN = window.location.origin;

  var STYLE = '<style id="nsqg-style">'
    + '#nguyen-sqft-guide{background:#f0ede6;padding:clamp(64px,8vw,112px) 0;font-family:"Inter Display","Inter",system-ui,-apple-system,sans-serif;color:#3a352e}'
    + '#nguyen-sqft-guide *{box-sizing:border-box}'
    + '.nsqg-shell{width:min(1360px,100%);margin:0 auto;padding:0 clamp(24px,4vw,64px)}'
    + '.nsqg-eyebrow{font-size:11px;letter-spacing:.2em;text-transform:uppercase;font-weight:600;color:#8a8177;margin:0 0 12px}'
    + '.nsqg-title{font-size:clamp(34px,4.6vw,58px);line-height:1.06;font-weight:500;letter-spacing:-.025em;color:#1f1c19;margin:0 0 12px}'
    + '.nsqg-sub{font-size:clamp(14px,1.2vw,16px);line-height:1.55;color:#6f675e;margin:0 0 clamp(36px,5vw,56px)}'
    + '.nsqg-main{display:grid;grid-template-columns:1.05fr 1fr;gap:14px}'
    + '.nsqg-feat{display:grid;grid-template-columns:1fr 1.25fr;background:#faf8f4;border:1px solid #ddd6c8;overflow:hidden}'
    + '.nsqg-feat-text{padding:clamp(24px,3vw,38px);display:flex;flex-direction:column;gap:0}'
    + '.nsqg-feat-sqft{font-size:10.5px;letter-spacing:.2em;text-transform:uppercase;font-weight:600;color:#8a8177;margin:0 0 7px}'
    + '.nsqg-feat-name{font-size:clamp(20px,1.9vw,26px);font-weight:600;color:#1f1c19;margin:0 0 14px;line-height:1.15}'
    + '.nsqg-feat-desc{font-size:13px;line-height:1.65;color:#6f675e;margin:0;flex:1}'
    + '.nsqg-feat-rule{border:0;border-top:1px solid #ddd6c8;margin:clamp(18px,2.5vw,28px) 0}'
    + '.nsqg-feat-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:11px}'
    + '.nsqg-feat-list li{display:flex;align-items:center;gap:11px;font-size:13px;color:#3a352e}'
    + '.nsqg-feat-list li svg{flex:none;color:#8a8177}'
    + '.nsqg-feat-imgwrap{overflow:hidden;background:#ebe6dc;border-left:1px solid #ddd6c8}'
    + '.nsqg-feat-imgwrap img{width:100%;height:100%;object-fit:contain;display:block;padding:clamp(12px,2.5vw,28px)}'
    + '.nsqg-options{display:flex;flex-direction:column;gap:11px}'
    + '.nsqg-opt{display:grid;grid-template-columns:auto 1fr auto;align-items:center;background:#faf8f4;border:1px solid #ddd6c8;overflow:hidden}'
    + '.nsqg-opt-imgwrap{width:clamp(100px,10vw,140px);align-self:stretch;overflow:hidden;background:#ebe6dc}'
    + '.nsqg-opt-imgwrap img{width:100%;height:100%;object-fit:contain;display:block;padding:clamp(8px,1.5vw,14px)}'
    + '.nsqg-opt-body{padding:clamp(14px,1.8vw,22px);border-left:1px solid #ddd6c8}'
    + '.nsqg-opt-sqft{font-size:10px;letter-spacing:.2em;text-transform:uppercase;font-weight:600;color:#8a8177;margin:0 0 5px}'
    + '.nsqg-opt-name{font-size:clamp(14px,1.3vw,18px);font-weight:600;color:#1f1c19;margin:0 0 7px;line-height:1.2}'
    + '.nsqg-opt-desc{font-size:12.5px;line-height:1.55;color:#6f675e;margin:0}'
    + '.nsqg-opt-arr{flex:none;width:38px;height:38px;border:1px solid #ddd6c8;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 clamp(12px,1.8vw,20px);font-size:14px;color:#1f1c19;flex-shrink:0}'
    + '.nsqg-hl-row{display:grid;grid-template-columns:repeat(3,1fr);margin-top:clamp(36px,4.5vw,56px);border-top:1px solid #ddd6c8}'
    + '.nsqg-hl{display:flex;align-items:center;gap:16px;padding:clamp(20px,2.5vw,30px) clamp(20px,2.5vw,32px)}'
    + '.nsqg-hl:first-child{padding-left:0}'
    + '.nsqg-hl:last-child{padding-right:0}'
    + '.nsqg-hl+.nsqg-hl{border-left:1px solid #ddd6c8}'
    + '.nsqg-hl svg{flex:none;color:#8a8177}'
    + '.nsqg-hl-txt strong{display:block;font-size:11px;letter-spacing:.12em;text-transform:uppercase;font-weight:700;color:#1f1c19;margin:0 0 4px}'
    + '.nsqg-hl-txt span{font-size:13px;color:#6f675e}'
    + '@media(max-width:960px){.nsqg-main{grid-template-columns:1fr}}'
    + '@media(max-width:640px){.nsqg-feat{grid-template-columns:1fr}.nsqg-feat-imgwrap{border-left:0;border-top:1px solid #ddd6c8;aspect-ratio:16/9}.nsqg-hl-row{grid-template-columns:1fr}.nsqg-hl+.nsqg-hl{border-left:0;border-top:1px solid #ddd6c8}.nsqg-hl:first-child{padding-left:0}.nsqg-hl:last-child{padding-left:0}}'
    + '</style>';

  var ICO_BED = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12"/><path d="M2 14h20"/><path d="M7 8v6"/></svg>';
  var ICO_BATH = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16v4a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-4z"/><path d="M6 12V5a2 2 0 0 1 2-2h1a1 1 0 0 1 1 1v1"/></svg>';
  var ICO_SOFA = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 9V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2"/><path d="M2 11a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5H2v-5z"/><path d="M4 19v2M20 19v2"/></svg>';
  var ICO_TREE = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22v-8"/><path d="M4.93 14.93 12 7l7.07 7.93H4.93z"/><path d="M7 10.5 12 4l5 6.5"/></svg>';
  var ICO_LEAF = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>';
  var ICO_COMPASS = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="M13 13l6 6"/></svg>';
  var ICO_HOUSE = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>';
  var ICO_ARROW = '&#8599;';

  function buildHTML() {
    var o = ORIGIN;
    return STYLE
      + '<div class="nsqg-shell">'
        + '<p class="nsqg-eyebrow">Residential Blueprints</p>'
        + '<h2 class="nsqg-title">Square Footage Guide</h2>'
        + '<p class="nsqg-sub">A range of thoughtfully designed floor plans to fit your lifestyle.</p>'

        + '<div class="nsqg-main">'
          /* featured */
          + '<div class="nsqg-feat">'
            + '<div class="nsqg-feat-text">'
              + '<p class="nsqg-feat-sqft">2,500 SQ FT</p>'
              + '<h3 class="nsqg-feat-name">The Modern Classic</h3>'
              + '<p class="nsqg-feat-desc">A refined balance of space, function, and beauty. The 2,500 sq ft plan offers open living, generous natural light, and a layout designed for the way you live today — and tomorrow.</p>'
              + '<hr class="nsqg-feat-rule">'
              + '<ul class="nsqg-feat-list">'
                + '<li>' + ICO_BED  + ' 4 Bedrooms</li>'
                + '<li>' + ICO_BATH + ' 3 Bathrooms</li>'
                + '<li>' + ICO_SOFA + ' Open Living</li>'
                + '<li>' + ICO_TREE + ' Covered Outdoor Living</li>'
              + '</ul>'
            + '</div>'
            + '<div class="nsqg-feat-imgwrap">'
              + '<img src="' + o + '/client-8889/residential/detail/sfg-2500.png" alt="2500 sq ft floor plan">'
            + '</div>'
          + '</div>'

          /* options */
          + '<div class="nsqg-options">'
            + '<div class="nsqg-opt">'
              + '<div class="nsqg-opt-imgwrap"><img src="' + o + '/client-8889/residential/detail/sfg-1400.png" alt="1400 sq ft floor plan"></div>'
              + '<div class="nsqg-opt-body"><p class="nsqg-opt-sqft">1,400 SQ FT</p><h3 class="nsqg-opt-name">The Essential</h3><p class="nsqg-opt-desc">Smart, elegant, and efficient. A beautifully designed home with everything you need and nothing you don’t.</p></div>'
              + '<div class="nsqg-opt-arr">' + ICO_ARROW + '</div>'
            + '</div>'
            + '<div class="nsqg-opt">'
              + '<div class="nsqg-opt-imgwrap"><img src="' + o + '/client-8889/residential/detail/sfg-3800.png" alt="3800 sq ft floor plan"></div>'
              + '<div class="nsqg-opt-body"><p class="nsqg-opt-sqft">3,800 SQ FT</p><h3 class="nsqg-opt-name">The Expanded Life</h3><p class="nsqg-opt-desc">More room for what matters. Designed for growing families, entertaining, and a life well lived.</p></div>'
              + '<div class="nsqg-opt-arr">' + ICO_ARROW + '</div>'
            + '</div>'
            + '<div class="nsqg-opt">'
              + '<div class="nsqg-opt-imgwrap"><img src="' + o + '/client-8889/residential/detail/sfg-5000.png" alt="5000 sq ft floor plan"></div>'
              + '<div class="nsqg-opt-body"><p class="nsqg-opt-sqft">5,000 SQ FT</p><h3 class="nsqg-opt-name">The Estate</h3><p class="nsqg-opt-desc">An exceptional scale for extraordinary living. Grand spaces, refined details, and endless possibilities.</p></div>'
              + '<div class="nsqg-opt-arr">' + ICO_ARROW + '</div>'
            + '</div>'
          + '</div>'
        + '</div>'

        /* highlights */
        + '<div class="nsqg-hl-row">'
          + '<div class="nsqg-hl">' + ICO_LEAF + '<div class="nsqg-hl-txt"><strong>Inspired Design</strong><span>Rooted in how you live</span></div></div>'
          + '<div class="nsqg-hl">' + ICO_COMPASS + '<div class="nsqg-hl-txt"><strong>Expert Guidance</strong><span>From concept to home</span></div></div>'
          + '<div class="nsqg-hl">' + ICO_HOUSE + '<div class="nsqg-hl-txt"><strong>A More Considered Life</strong><span>Homes that endure</span></div></div>'
        + '</div>'
      + '</div>';
  }

  function inject() {
    if (document.getElementById('nguyen-sqft-guide')) return true;
    var svc = document.getElementById('nguyen-residential-services');
    if (!svc || !svc.parentNode) return false;
    var sec = document.createElement('section');
    sec.id = 'nguyen-sqft-guide';
    sec.innerHTML = buildHTML();
    svc.parentNode.insertBefore(sec, svc.nextSibling);
    return true;
  }

  [1800, 2800, 4200, 6200].forEach(function (t) { setTimeout(inject, t); });

  var timer;
  var obs = new MutationObserver(function () {
    clearTimeout(timer);
    timer = setTimeout(function () { if (inject()) obs.disconnect(); }, 200);
  });
  if (document.body) obs.observe(document.body, { childList: true, subtree: true });
  setTimeout(function () { obs.disconnect(); }, 12000);
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
    html = html.replace(/<title>[^<]*<\/title>/i, '<title>NGUYEN Architecture — Residential</title>');

    const userAgent = (await headers()).get('user-agent') || '';
    const mobile = isMobileUserAgent(userAgent);

    if (!mobile) {
      for (const [pattern, replacement] of REPLACEMENTS) html = html.replace(pattern, replacement);
      html = html.replace(/<base\b[^>]*>/i, `<base href="${BASE_URL}">`);
      html = html.replace(/info@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/gi, 'info@nguyenarchitecture.com');
      html = html.replace(/href=["']mailto:[^"']+["']/gi, 'href="mailto:info@nguyenarchitecture.com"');
    }

    html = html.replace('</body>', `${CLIENT_REBRAND}${SQFT_GUIDE_PATCH}</body>`);
    return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'private, no-store' } });
  } catch {
    return new Response('<!doctype html><html><body style="font-family:Arial,sans-serif;padding:40px">Residential page is temporarily unavailable. Please refresh in a moment.</body></html>', { status: 502, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }
}
