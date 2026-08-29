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
  [/A tranquil residential sanctuary blending natural beauty with luxury\.?/gi, 'Thoughtful residential design rooted in beauty, function, and everyday living.'],
  [/Dubai['’]s Serenity Villa emphasizes calm, minimalist living\. Open interiors, light-filled rooms, and natural textures create a serene home that perfectly aligns with the owners['’] vision of peaceful luxury\.?/gi, 'We design and engineer homes that reflect how you live — blending timeless architecture with modern performance. From custom homes and additions to ADUs and multifamily, every detail supports your vision, lifestyle, and long-term value.'],
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
  [/Corporate Office Space/gi, 'Hillside Retreat'],
  [/Modern Co-working Space/gi, 'Garden ADU'],
  [/Modern Co-Working Space/gi, 'Garden ADU'],
  [/Harmony Living Space/gi, 'Coastal Modern Home'],
  [/Minimalist Apartment Interior/gi, 'Urban Townhomes'],
  [/Dubai, 2025/gi, 'Los Angeles, 2025'],
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

// One client script for both surfaces. It applies the same REPLACEMENTS as substring rules to text
// nodes (a WeakSet stops any rule whose output contains its input from growing on re-runs) plus the
// mailto rewrite. On mobile it defers until after Framer hydrates (so it does not cause the hydration
// crash) and then rescues any content the runtime left hidden; on desktop it runs immediately and
// keeps a short observer so Framer's re-render doesn't revert the text. A shared safety net reveals
// the page if the runtime ever stalls and leaves it blank.
const RULES_JSON = JSON.stringify(REPLACEMENTS.map(([re, rep]) => [re.source, re.flags, rep]));
const CLIENT_REBRAND = `
<script id="nguyen-residential-rebrand">
(function(){
  try {
    var isMobile = window.matchMedia && window.matchMedia('(max-width: 809.98px)').matches;
    var rules = ${RULES_JSON}.map(function (r) { return [new RegExp(r[0], r[1]), r[2]]; });
    var done = new WeakSet();
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
    [5000, 8000].forEach(function (t) { setTimeout(function () { if (looksBlank()) reveal(); }, t); });
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
