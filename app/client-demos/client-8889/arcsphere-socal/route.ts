import { GET as getConcept } from "../arcsphere-fixed/route"
import { TESTIMONIAL_PATCH } from "./testimonial-patch"

const OLD_COPY = 'Based in Orange County, we provide commercial architecture, engineering and permit support from existing-condition survey and business layout through plan check and approval.'
const NEW_COPY = 'Based in Southern California, we provide residential and commercial architecture, engineering, and permit support from concept through approval.'

const SPLIT_TEXT_PATCH = `
<script id="nguyen-socal-split-text-patch">
(() => {
  const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();
  const compact = (value) => normalize(value).replace(/\\s+/g, '').toLowerCase();
  const sources = new Set([
    compact('Based in Dubai, we design residential and commercial spaces that elevate how people live, work, and interact with their environment.'),
    compact('Based in Dubai, we design residential and commercial spaces that elevate how people live, work, and interact with their environment'),
    compact('Based in Orange County, we provide commercial architecture, engineering and permit support from existing-condition survey and business layout through plan check and approval.'),
    compact('Based in Orange County, we provide commercial architecture, engineering and permit support from existing-condition survey and business layout through plan check and approval.')
  ]);
  const replacement = 'Based in Southern California, we provide residential and commercial architecture, engineering, and permit support from concept through approval.';

  function patchParagraph(p) {
    if (!p) return false;
    const key = compact(p.textContent);
    if (!sources.has(key)) return false;
    if (normalize(p.textContent) === replacement) return true;
    p.style.setProperty('white-space', 'normal', 'important');
    p.style.setProperty('word-break', 'normal', 'important');
    p.style.setProperty('overflow-wrap', 'normal', 'important');
    p.textContent = replacement;
    return true;
  }

  function patchRoot(root) {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) {
      patchParagraph(root.parentElement?.closest('p'));
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE) return;
    const el = root;
    if (el.matches('p')) patchParagraph(el);
    el.querySelectorAll('p').forEach(patchParagraph);
  }

  patchRoot(document.body);
  window.addEventListener('load', () => patchRoot(document.body), { once: true });

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'characterData') {
        patchParagraph(mutation.target.parentElement?.closest('p'));
      } else if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(patchRoot);
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  [1500, 3000, 6000, 10000, 20000, 40000].forEach((t) => setTimeout(() => patchRoot(document.body), t));
  setTimeout(() => { patchRoot(document.body); observer.disconnect(); }, 60000);
})();
</script>`

const BRAND_PATCH = `
<script id="nguyen-socal-brand-patch">
(() => {
  const TARGET_TEXT = 'NGUYEN ARCHITECTURE';
  const TARGET_URL = window.location.origin + '/client-demos/client-8889/arcsphere-socal';
  const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();

  function patchBrand() {
    if (!document.body) return;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const matches = [];

    while (walker.nextNode()) {
      const node = walker.currentNode;
      const text = normalize(node.nodeValue);
      if (text === 'ArcSphere' || text === 'ArcSphere Studio' || text === 'NGUYEN ARCHITECTURE & ENGINEERING') matches.push(node);
    }

    matches.forEach((node) => {
      if (normalize(node.nodeValue) !== 'ArcSphere' && normalize(node.nodeValue) !== 'ArcSphere Studio' && normalize(node.nodeValue) !== 'NGUYEN ARCHITECTURE & ENGINEERING') return;
      node.nodeValue = TARGET_TEXT;

      const anchor = node.parentElement?.closest('a');
      if (anchor && anchor.getAttribute('href') !== TARGET_URL) {
        anchor.setAttribute('href', TARGET_URL);
        anchor.removeAttribute('target');
        anchor.removeAttribute('rel');
      }
    });
  }

  patchBrand();
  window.addEventListener('load', patchBrand, { once: true });
  [250, 750, 1500, 3000, 6000, 10000, 20000, 40000, 60000].forEach((delay) => setTimeout(patchBrand, delay));

  // MutationObserver so React reconciliation reverts are caught and re-patched immediately.
  const brandObs = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === 'characterData') {
        const t = normalize(m.target.nodeValue);
        if (t === 'ArcSphere' || t === 'ArcSphere Studio' || t === 'NGUYEN ARCHITECTURE & ENGINEERING') { patchBrand(); break; }
      } else if (m.type === 'childList') {
        for (const nd of m.addedNodes) {
          if (nd.nodeType === Node.TEXT_NODE) {
            const t = normalize(nd.nodeValue);
            if (t === 'ArcSphere' || t === 'ArcSphere Studio' || t === 'NGUYEN ARCHITECTURE & ENGINEERING') { patchBrand(); break; }
          }
        }
      }
    }
  });
  if (document.body) brandObs.observe(document.body, { childList: true, subtree: true, characterData: true });
  setTimeout(() => brandObs.disconnect(), 60000);
})();
</script>`

const SQUARE_IMAGES_PATCH = `
<script id="nguyen-socal-square-cards">
(() => {
  function squareImages() {
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
    return imgs.length > 0;
  }
  squareImages();
  window.addEventListener('load', squareImages, { once: true });
  [400, 1000, 2000, 3500, 5500].forEach(function (t) { setTimeout(squareImages, t); });
})();
</script>`

const SERVICES_ANCHOR_PATCH = `
<script id="nguyen-socal-services-anchor">
(() => {
  const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim().toLowerCase();
  function markServices() {
    if (document.getElementById('services')) return true;
    const headings = document.querySelectorAll('h1,h2,h3,h4,p');
    for (const heading of headings) {
      const text = normalize(heading.textContent);
      if (text !== 'our services' && text !== 'services') continue;
      const section = heading.closest('section') || heading.closest('[data-framer-name]') || heading.parentElement;
      if (!section) continue;
      section.id = 'services';
      section.style.scrollMarginTop = '90px';
      return true;
    }
    return false;
  }
  markServices();
  window.addEventListener('load', markServices, { once: true });
  [250, 750, 1500, 3000, 6000].forEach((delay) => setTimeout(markServices, delay));
})();
</script>`

const MAIN_NAV_PATCH = `
<script id="nguyen-socal-main-nav-patch">
(() => {
  const home = window.location.origin + '/client-demos/client-8889/arcsphere-socal';
  const services = home + '#services';
  const contact = window.location.origin + '/client-demos/client-8889/residential/contact';
  const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();
  const compact = (value) => normalize(value).replace(/\\s+/g, '').toLowerCase();
  const linkFont = '"Inter Display","Inter",system-ui,-apple-system,"Segoe UI",Helvetica,Arial,sans-serif';

  function setStyle(el, name, value) {
    if (el) el.style.setProperty(name, value, 'important');
  }

  function replaceNavText(anchor, keys, label) {
    const walker = document.createTreeWalker(anchor, NodeFilter.SHOW_TEXT);
    let node;
    let changed = false;
    while ((node = walker.nextNode())) {
      if (!keys.has(compact(node.nodeValue))) continue;
      if (normalize(node.nodeValue) !== label) node.nodeValue = label;
      changed = true;
    }
    if (!changed && keys.has(compact(anchor.textContent))) anchor.textContent = label;
  }

  function isNearTop(anchor) {
    const rect = anchor.getBoundingClientRect();
    // If both width and height are 0 the page hasn't rendered yet — don't treat as near-top
    // (avoids styleContact() being applied to footer links on the synchronous first run).
    if (rect.width === 0 && rect.height === 0) return false;
    return rect.top < 150 && rect.bottom > -30;
  }

  function hideProjects(anchor) {
    let item = anchor;
    for (let depth = 0; depth < 4 && item.parentElement; depth += 1) {
      const parent = item.parentElement;
      const key = compact(parent.textContent);
      if (parent.querySelectorAll('a').length !== 1) break;
      if (!key || key.replace(/projects/g, '') !== '') break;
      item = parent;
    }
    setStyle(item, 'display', 'none');
  }

  function styleStandardLink(anchor) {
    setStyle(anchor, 'font-family', linkFont);
    setStyle(anchor, 'font-size', '14px');
    setStyle(anchor, 'font-weight', '500');
    setStyle(anchor, 'letter-spacing', '-.4px');
    setStyle(anchor, 'line-height', '110%');
    setStyle(anchor, 'text-transform', 'uppercase');
    setStyle(anchor, 'white-space', 'nowrap');
    setStyle(anchor, 'color', '#4f4742');
    setStyle(anchor, 'visibility', 'visible');
    setStyle(anchor, 'opacity', '1');
  }

  function styleBrand(anchor) {
    setStyle(anchor, 'font-family', linkFont);
    setStyle(anchor, 'font-size', '24px');
    setStyle(anchor, 'font-weight', '400');
    setStyle(anchor, 'letter-spacing', '-.4px');
    setStyle(anchor, 'line-height', '110%');
    setStyle(anchor, 'text-transform', 'uppercase');
    setStyle(anchor, 'white-space', 'nowrap');
    setStyle(anchor, 'color', '#4f4742');
    setStyle(anchor, 'visibility', 'visible');
    setStyle(anchor, 'opacity', '1');
  }

  function styleContact(anchor) {
    setStyle(anchor, 'font-family', linkFont);
    setStyle(anchor, 'display', 'inline-flex');
    setStyle(anchor, 'align-items', 'center');
    setStyle(anchor, 'justify-content', 'center');
    setStyle(anchor, 'background', '#4f4742');
    setStyle(anchor, 'color', '#f0ebe6');
    setStyle(anchor, 'border-radius', '999px');
    setStyle(anchor, 'padding', window.innerWidth <= 560 ? '9px 13px' : '11px 22px');
    setStyle(anchor, 'font-size', window.innerWidth <= 560 ? '11px' : '14px');
    setStyle(anchor, 'font-weight', '500');
    setStyle(anchor, 'letter-spacing', '-.2px');
    setStyle(anchor, 'line-height', '120%');
    setStyle(anchor, 'text-transform', 'uppercase');
    setStyle(anchor, 'white-space', 'nowrap');
    setStyle(anchor, 'visibility', 'visible');
    setStyle(anchor, 'opacity', '1');
    setStyle(anchor, 'flex', 'none');
    setStyle(anchor, 'z-index', '5');
  }

  function patchNav() {
    if (!document.body) return false;
    const anchors = Array.from(document.querySelectorAll('a'));
    let matched = false;

    anchors.forEach((anchor) => {
      // Footer links can enter the top of the viewport when scrolling. They are
      // not header navigation and must never be hidden or styled as header CTAs.
      if (anchor.closest('footer')) return;
      if (!isNearTop(anchor)) return;
      const key = compact(anchor.textContent);
      let target = null;

      if (key === 'designprocess' || key === 'designprocessdesignprocess' || key === 'projectprocess' || key === 'projectprocessprojectprocess' || key === 'home' || key === 'homehome') {
        replaceNavText(anchor, new Set(['designprocess', 'projectprocess', 'home']), 'HOME');
        target = home;
        styleStandardLink(anchor);
      } else if (key === 'projects' || key === 'projectsprojects') {
        hideProjects(anchor);
        return;
      } else if (key === 'services' || key === 'servicesservices') {
        replaceNavText(anchor, new Set(['services']), 'SERVICES');
        target = services;
        styleStandardLink(anchor);
      } else if (key === 'contact' || key === 'contactcontact' || key === 'contactus' || key === 'contactuscontactus') {
        replaceNavText(anchor, new Set(['contact', 'contactus']), 'CONTACT US');
        target = contact;
        styleContact(anchor);
      } else if (key.includes('nguyenarchitecture')) {
        target = home;
        styleBrand(anchor);
      } else {
        return;
      }

      matched = true;
      anchor.setAttribute('href', target);
      anchor.setAttribute('data-nguyen-main-nav-target', target);
      anchor.removeAttribute('target');
      anchor.removeAttribute('rel');
    });

    return matched;
  }

  if (!window.__nguyenMainNavRouting) {
    window.__nguyenMainNavRouting = true;
    document.addEventListener('click', (event) => {
      const start = event.target && event.target.nodeType === Node.TEXT_NODE ? event.target.parentElement : event.target;
      const anchor = start && start.closest ? start.closest('a[data-nguyen-main-nav-target]') : null;
      if (!anchor) return;
      const target = anchor.getAttribute('data-nguyen-main-nav-target');
      if (!target) return;
      event.preventDefault();
      event.stopPropagation();
      if (event.stopImmediatePropagation) event.stopImmediatePropagation();
      window.location.href = target;
    }, true);
  }

  patchNav();
  window.addEventListener('load', patchNav, { once: true });
  window.addEventListener('resize', patchNav);
  [250, 750, 1500, 3000, 5000, 7500].forEach((delay) => setTimeout(patchNav, delay));

  const observer = new MutationObserver(() => patchNav());
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  setTimeout(() => { patchNav(); observer.disconnect(); }, 8000);
})();
</script>`

const ENGINEERING_SERVICE_PATCH = `
<script id="nguyen-socal-engineering-service-patch">
(() => {
  const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();
  const compact = (value) => normalize(value).replace(/\\s+/g, '').toLowerCase();
  const sourceDescription = compact('Optimizing layouts to improve functionality, circulation, and spatial flow.');
  const targetDescription = 'Structural engineering, MEP, Title 24, permitting, and plan-check support coordinated from design through approval.';
  const targetDescriptionKey = compact(targetDescription);
  const titleKeys = new Set([
    compact('Space Planning'),
    compact('Existing-Condition Survey & Business Layout'),
    compact('ENGINEERING')
  ]);
  const targetUrl = window.location.origin + '/client-demos/client-8889/residential/services/engineering-approvals';

  function findEngineeringCards() {
    // Framer ships one DOM copy per breakpoint (desktop / tablet / phone), so return the card for EVERY
    // copy — patching only the first left the phone Engineering card unconverted (and missing, since the
    // base layer no longer renders it as a plain card). Falls back to a wrapping ancestor when a mobile
    // card layout has no direct img.
    const cards = [];
    const candidates = Array.from(document.querySelectorAll('*'));
    for (const candidate of candidates) {
      const key = compact(candidate.textContent);
      if (key !== sourceDescription && key !== targetDescriptionKey) continue;
      let picked = null;
      let card = candidate;
      for (let depth = 0; card && depth < 10; depth += 1, card = card.parentElement) {
        if (!card.querySelector?.('img')) continue;
        const text = compact(card.textContent);
        if (!text.includes(sourceDescription) && !text.includes(targetDescriptionKey)) continue;
        picked = card;
        break;
      }
      if (!picked) picked = candidate.parentElement?.parentElement || candidate.parentElement || candidate;
      if (picked && cards.indexOf(picked) === -1) cards.push(picked);
    }
    return cards;
  }

  function replaceLeafText(card, keys, replacement) {
    // Replace EVERY matching leaf, not just the first — the mobile card copy can carry a second title
    // element (an extra line under "ENGINEERING") that must also be converted.
    const candidates = [card, ...card.querySelectorAll('*')];
    let any = false;
    for (const candidate of candidates) {
      const key = compact(candidate.textContent);
      if (!keys.has(key)) continue;
      const hasSameTextChild = Array.from(candidate.children).some((child) => compact(child.textContent) === key);
      if (hasSameTextChild) continue;
      if (normalize(candidate.textContent) !== replacement) candidate.textContent = replacement;
      candidate.style.setProperty('white-space', 'normal', 'important');
      candidate.style.setProperty('word-break', 'normal', 'important');
      candidate.style.setProperty('overflow-wrap', 'normal', 'important');
      any = true;
    }
    return any;
  }

  function patchEngineering() {
    const cards = findEngineeringCards();
    if (!cards.length) return false;

    cards.forEach((card) => {
      replaceLeafText(card, new Set([sourceDescription, targetDescriptionKey]), targetDescription);
      replaceLeafText(card, titleKeys, 'ENGINEERING');

      card.setAttribute('data-nguyen-engineering-service', 'true');
      card.setAttribute('data-nguyen-link', targetUrl);
      // Un-hide if any layer set display:none; the base no longer hides this card, so don't force a
      // display value (that could break Framer's own flex/grid) — just clear an inherited none.
      if (card.style.display === 'none') card.style.removeProperty('display');
      card.style.setProperty('cursor', 'pointer', 'important');
    });
    return true;
  }

  patchEngineering();
  window.addEventListener('load', patchEngineering, { once: true });
  [250, 750, 1500, 3000, 6200].forEach((delay) => setTimeout(patchEngineering, delay));

  const observer = new MutationObserver(() => patchEngineering());
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  setTimeout(() => observer.disconnect(), 7000);
})();
</script>`

const PROJECT_CARDS_PATCH = `
<script id="nguyen-socal-project-cards-patch">
(() => {
  const base = window.location.origin + '/client-demos/client-8889/residential/services';
  const compact = (v) => (v || '').replace(/\\s+/g, '').toLowerCase();

  const CATEGORY_MAP = [
    { key: 'commercialarchitecture', url: base + '/commercial' },
    { key: 'residentialarchitecture', url: base + '/custom-homes' },
    { key: 'customhome', url: base + '/custom-homes' },
    { key: 'multifamily', url: base + '/multifamily' },
    { key: 'adu', url: base + '/adus' },
    { key: 'addition', url: base + '/additions-remodels' },
    { key: 'remodel', url: base + '/additions-remodels' },
    { key: 'landdevelopment', url: base + '/land-development' },
  ];

  function resolveUrl(card) {
    const text = compact(card.textContent);
    for (const entry of CATEGORY_MAP) {
      if (text.includes(entry.key)) return entry.url;
    }
    return null;
  }

  function findCards() {
    // Cards are elements that contain a category label + an arrow button
    const arrows = Array.from(document.querySelectorAll('a, button, [role="button"]')).filter((el) => {
      const t = compact(el.textContent);
      return t === '' || t === '→' || t === '↗' || t === '›';
    });

    const cards = [];
    arrows.forEach((arrow) => {
      let cursor = arrow.parentElement;
      for (let i = 0; i < 8 && cursor && cursor !== document.body; i++, cursor = cursor.parentElement) {
        const text = compact(cursor.textContent);
        const hasCategory = CATEGORY_MAP.some((e) => text.includes(e.key));
        if (!hasCategory) continue;
        const r = cursor.getBoundingClientRect();
        // Lowered from 200 so phone-width cards (Framer's mobile breakpoint) are not excluded.
        if (r.width > 130 && r.height > 130) { cards.push(cursor); break; }
      }
    });

    // Fallback: find by category text directly
    if (!cards.length) {
      const all = Array.from(document.querySelectorAll('div, article, section, li'));
      all.forEach((el) => {
        const text = compact(el.textContent);
        const hasCategory = CATEGORY_MAP.some((e) => text.includes(e.key));
        if (!hasCategory) return;
        const r = el.getBoundingClientRect();
        if (r.width < 130 || r.height < 130) return;
        // Ensure it's not a parent of another already found card
        if (cards.some((c) => el.contains(c) || c.contains(el))) return;
        cards.push(el);
      });
    }
    return cards;
  }

  const patched = new WeakSet();

  function markFeaturedProjects(cards) {
    if (!cards.length) return;
    const sorted = cards.slice().sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
    let target = sorted[0];
    for (let node = sorted[0].parentElement, depth = 0; node && node !== document.body && depth < 10; node = node.parentElement, depth += 1) {
      const count = sorted.filter((card) => node.contains(card)).length;
      if (count >= Math.min(3, sorted.length)) {
        target = node;
        break;
      }
    }
    target.setAttribute('id', 'featured-projects');
    target.style.setProperty('scroll-margin-top', '96px', 'important');
  }

  function patchCards() {
    const cards = findCards();
    markFeaturedProjects(cards);
    cards.forEach((card) => {
      if (patched.has(card)) return;
      const url = resolveUrl(card);
      if (!url) return;
      patched.add(card);
      card.style.setProperty('cursor', 'pointer', 'important');
      card.setAttribute('data-nguyen-card-url', url);

      // Patch any anchor/button inside the card that looks like an arrow CTA
      card.querySelectorAll('a, button, [role="button"]').forEach((el) => {
        const t = compact(el.textContent);
        if (t === '' || t === '→' || t === '↗' || t === '›' || el.querySelector('svg')) {
          if (el.tagName === 'A') {
            el.setAttribute('href', url);
            el.removeAttribute('target');
            el.removeAttribute('rel');
          }
          el.setAttribute('data-nguyen-card-url', url);
        }
      });
    });
  }

  if (!window.__nguyenCardRouting) {
    window.__nguyenCardRouting = true;
    document.addEventListener('click', (e) => {
      const start = e.target && e.target.nodeType === Node.TEXT_NODE ? e.target.parentElement : e.target;
      const card = start && start.closest ? start.closest('[data-nguyen-card-url]') : null;
      if (!card) return;
      const url = card.getAttribute('data-nguyen-card-url');
      if (!url) return;
      e.preventDefault();
      e.stopPropagation();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
      window.location.href = url;
    }, true);
  }

  patchCards();
  window.addEventListener('load', patchCards, { once: true });
  [500, 1200, 2500, 4500].forEach((t) => setTimeout(patchCards, t));

  const obs = new MutationObserver(patchCards);
  if (document.body) obs.observe(document.body, { childList: true, subtree: true });
  setTimeout(() => obs.disconnect(), 8000);
})();
</script>`

const DESIGN_PANELS_PATCH = `
<script id="nguyen-socal-design-panels-patch">
(() => {
  const base = window.location.origin + '/client-demos/client-8889/residential/services';
  const compact = (v) => (v || '').replace(/\\s+/g, '').toLowerCase();

  const PANELS = [
    { key: 'commercialdesign', url: base + '/commercial#commercial-floor-plans' },
    { key: 'residentialdesign', url: window.location.origin + '/client-demos/client-8889/residential#nguyen-blueprint-guide' },
  ];

  // Replace the real hover counts (16+, 35+) with 200+
  const COUNT_RE = /\\b(16|35)\\+/g;
  function fixCounts(root) {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) {
      if (COUNT_RE.test(root.nodeValue)) root.nodeValue = root.nodeValue.replace(COUNT_RE, '200+');
      COUNT_RE.lastIndex = 0;
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (COUNT_RE.test(node.nodeValue)) node.nodeValue = node.nodeValue.replace(COUNT_RE, '200+');
      COUNT_RE.lastIndex = 0;
    }
  }

  const patchedLinks = new WeakSet();

  function patchPanelLinks() {
    if (!document.body) return;
    const candidates = Array.from(document.querySelectorAll('div, section, article'));
    candidates.forEach((el) => {
      if (patchedLinks.has(el)) return;
      const text = compact(el.textContent);
      const match = PANELS.find((p) => text.includes(p.key));
      if (!match) return;
      const r = el.getBoundingClientRect();
      // Lowered from 300x200 so phone-width design panels are not excluded.
      if (r.width < 150 || r.height < 130) return;
      if (PANELS.every((p) => text.includes(p.key))) return;
      patchedLinks.add(el);

      el.style.setProperty('cursor', 'pointer', 'important');
      el.setAttribute('data-nguyen-panel-url', match.url);

      el.querySelectorAll('a').forEach((a) => {
        const aText = compact(a.textContent);
        if (aText.includes('view') || aText.includes('projects') || aText.includes('explore') || aText === '') {
          a.setAttribute('href', match.url);
          a.removeAttribute('target');
          a.removeAttribute('rel');
          a.setAttribute('data-nguyen-panel-url', match.url);
        }
      });
    });
  }

  if (!window.__nguyenPanelRouting) {
    window.__nguyenPanelRouting = true;
    document.addEventListener('click', (e) => {
      const start = e.target && e.target.nodeType === Node.TEXT_NODE ? e.target.parentElement : e.target;
      const panel = start && start.closest ? start.closest('[data-nguyen-panel-url]') : null;
      if (!panel) return;
      const url = panel.getAttribute('data-nguyen-panel-url');
      if (!url) return;
      e.preventDefault();
      e.stopPropagation();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
      window.location.href = url;
    }, true);
  }

  // On every pointer interaction (mouse hover or touch), scan upward and fix counts immediately.
  // This catches hover-state overlays that Framer reveals purely via CSS (no DOM mutation).
  if (!window.__nguyenCountHoverFix) {
    window.__nguyenCountHoverFix = true;
    const countScan = (e) => {
      let el = e.target;
      for (let i = 0; i < 10 && el && el !== document.body; i++, el = el.parentElement) {
        if (el.textContent && /\\b(16|35)\\+/.test(el.textContent)) { fixCounts(el); break; }
      }
    };
    document.addEventListener('mouseover', countScan, true);
    document.addEventListener('touchstart', countScan, { capture: true, passive: true });
    document.addEventListener('pointerover', countScan, true);
  }

  // MutationObserver catches React/Framer state-driven renders of hover content
  const obs = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === 'characterData') {
        fixCounts(m.target);
      } else if (m.type === 'childList') {
        m.addedNodes.forEach((n) => fixCounts(n));
      }
    }
    patchPanelLinks();
  });

  fixCounts(document.body);
  patchPanelLinks();
  window.addEventListener('load', () => { fixCounts(document.body); patchPanelLinks(); }, { once: true });
  [300, 800, 1800, 3500, 6000].forEach((t) => setTimeout(() => { fixCounts(document.body); patchPanelLinks(); }, t));

  if (document.body) obs.observe(document.body, { childList: true, subtree: true, characterData: true });
  setTimeout(() => obs.disconnect(), 12000);
})();
</script>`

// Replace thumbnail images in the RESIDENTIAL, COMMERCIAL, and ADU service-accordion rows.
// Strategy: find the leaf heading element for each row by its exact title text, then walk UP
// the DOM to find a parent that contains exactly one <img> (the thumbnail). This avoids
// matching ancestor containers that hold all three rows' images.
// The data-nguyen-service-row marker tells BLUEPRINT_IMAGE_PATCH to skip these images.
const RESIDENTIAL_ROW_IMAGE_PATCH = `
<script id="nguyen-socal-service-row-images">
(() => {
  var origin = window.location.origin;
  var MARKER = 'data-nguyen-service-row';

  var ROWS = [
    { heading: 'RESIDENTIAL', src: origin + '/client-8889/residential/residential_house.png' },
    { heading: 'COMMERCIAL',  src: origin + '/client-8889/residential/detail/cx-09-building.jpg' },
    { heading: 'ADU',         src: origin + '/client-8889/residential/detail/adu-04-golden-hour.jpg' }
  ];

  function compact(v) { return (v || '').replace(/\\s+/g, '').toLowerCase(); }

  function swapImg(img, src) {
    img.setAttribute('src', src);
    img.removeAttribute('srcset');
    img.removeAttribute('sizes');
    img.style.setProperty('object-fit', 'cover', 'important');
    img.style.setProperty('object-position', 'center', 'important');
    img.setAttribute(MARKER, '1');
    var pic = img.closest('picture');
    if (pic) pic.querySelectorAll('source').forEach(function(s) { s.setAttribute('srcset', src); s.removeAttribute('sizes'); });
  }

  function patch() {
    if (!document.body) return;
    var all = document.querySelectorAll('*');
    ROWS.forEach(function(row) {
      var key = compact(row.heading);
      for (var i = 0; i < all.length; i++) {
        var el = all[i];
        if (compact(el.textContent) !== key) continue;
        // Must be a leaf heading: no child has the same compact text
        if (Array.from(el.children).some(function(c) { return compact(c.textContent) === key; })) continue;
        // Skip if a close ancestor's compact text contains both the key AND "design"
        // in a short string — that means this "COMMERCIAL" span is part of "COMMERCIAL DESIGN"
        // (the Project Expertise panel heading), not the service-accordion row.
        var inDesignPanel = false;
        for (var chk = el.parentElement; chk && chk !== document.body; chk = chk.parentElement) {
          var ct = compact(chk.textContent);
          if (ct.length > 200) break; // too far up — stop
          if (ct.length < 60 && ct.includes(key) && ct.includes('design')) { inDesignPanel = true; break; }
        }
        if (inDesignPanel) continue;
        // Walk up to find the row container — stop at the first ancestor that has an img
        // but bail if we reach a container with >2 imgs (the whole service section)
        var node = el.parentElement;
        for (var depth = 0; depth < 10 && node && node !== document.body; depth++, node = node.parentElement) {
          var imgs = node.querySelectorAll('img');
          if (imgs.length === 0) continue;
          if (imgs.length > 2) break; // parent section with all rows — stop
          var img = imgs[0];
          if (img.getAttribute(MARKER) === '1' && img.getAttribute('src') === row.src) break;
          swapImg(img, row.src);
          break;
        }
      }
    });
  }

  patch();
  window.addEventListener('load', patch, { once: true });
  [300, 800, 1800, 3500, 6000].forEach(function(t) { setTimeout(patch, t); });

  var timer;
  var obs = new MutationObserver(function() { clearTimeout(timer); timer = setTimeout(patch, 150); });
  if (document.body) obs.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['src', 'srcset'] });
  setTimeout(function() { obs.disconnect(); }, 12000);
})();
</script>`

// Replace the Framer background images in the two Project Expertise (design) panels with the
// client-supplied blueprint images. Uses object-fit:contain so the full blueprint is visible
// without cropping. No overlay — a direct src swap keeps the panel text (RESIDENTIAL DESIGN /
// COMMERCIAL DESIGN labels and button) visible above the image as Framer intended.
const BLUEPRINT_IMAGE_PATCH = `
<script id="nguyen-socal-blueprint-images">
(() => {
  const compact = (v) => (v || '').replace(/\\s+/g, '').toLowerCase();
  const origin = window.location.origin;
  const PANEL_MAP = [
    { key: 'residentialdesign', src: origin + '/client-8889/projects/residential_blueprint.png' },
    { key: 'commercialdesign',  src: origin + '/client-8889/projects/commercial_blueprint.png' },
  ];

  function swapImg(img, src) {
    // Re-apply on every call so Framer lazy-loading cannot revert it.
    img.setAttribute('src', src);
    img.removeAttribute('srcset');
    img.removeAttribute('sizes');
    // contain: show the full blueprint without cropping; dark navy background fills any gap.
    img.style.setProperty('object-fit', 'contain', 'important');
    img.style.setProperty('object-position', 'top center', 'important');
    img.style.setProperty('background-color', '#0b1930', 'important');
    img.style.setProperty('filter', 'none', 'important');
    img.style.setProperty('opacity', '1', 'important');
    img.style.setProperty('visibility', 'visible', 'important');
    img.setAttribute('data-nguyen-bp', src);
    const picture = img.closest('picture');
    if (picture) picture.querySelectorAll('source').forEach((s) => { s.setAttribute('srcset', src); s.removeAttribute('sizes'); });
  }

  function patchBlueprints() {
    if (!document.body) return;
    document.querySelectorAll('div,section,article').forEach((el) => {
      const text = compact(el.textContent);
      const match = PANEL_MAP.find((p) => text.includes(p.key));
      if (!match) return;
      if (PANEL_MAP.every((p) => text.includes(p.key))) return; // skip container holding both panels
      const img = el.querySelector('img');
      // Skip service-row thumbnails managed by the SERVICE_ROW_IMAGES patch
      if (img && !img.hasAttribute('data-nguyen-service-row') && img.getAttribute('data-nguyen-bp') !== match.src) swapImg(img, match.src);
    });
  }

  patchBlueprints();
  window.addEventListener('load', patchBlueprints, { once: true });
  [300, 800, 1800, 3500, 6000].forEach((t) => setTimeout(patchBlueprints, t));

  // Debounced observer — fires on src/srcset changes from Framer lazy-loading but throttled to
  // avoid hammering querySelectorAll on every individual image load.
  let bpTimer;
  const obs = new MutationObserver(() => { clearTimeout(bpTimer); bpTimer = setTimeout(patchBlueprints, 150); });
  if (document.body) obs.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['src', 'srcset'] });
  setTimeout(() => obs.disconnect(), 12000);
})();
</script>`

const FOOTER_PATCH = `
<script id="nguyen-socal-footer-patch">
(() => {
  const normalize = (v) => (v || '').replace(/\\s+/g, ' ').trim();
  const compact = (v) => normalize(v).replace(/\\s+/g, '').toLowerCase();
  const OLD_PHONE = compact('+62 812 3456 7890');
  const NEW_PHONE = '(714) 707-8889  ·  (209) 233-8888';

  const OLD_ADDR = compact('Dubai-Based Architecture And Interior Design Studio');
  const NEW_ADDR = '7171 Warner Ave., Ste. B, Huntington Beach, CA 92647';

  const ADDR_KEY = 'basedarchitectureandinteriordesignstudio';
  const PHONE_DIGITS = '6281234567890';

  function patchFooter() {
    // Phone: the original '+62 812 3456 7890' text node -> two lines. Match on the digits so formatting
    // or a leading '+' doesn't break it. Runs across every breakpoint copy via the tree walker.
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const key = compact(node.nodeValue);
      if (key === OLD_PHONE || key.indexOf(PHONE_DIGITS) !== -1) {
        const parent = node.parentElement;
        if (parent && !parent.querySelector('[data-nguyen-footer-phone]')) {
          parent.innerHTML = '';
          const wrap = document.createElement('span');
          wrap.setAttribute('data-nguyen-footer-phone', '1');
          wrap.appendChild(document.createTextNode(NEW_PHONE));
          parent.appendChild(wrap);
        }
      }
    }

    // Address: the studio tagline — the base layer already rewrote 'Dubai' -> 'Huntington Beach, CA'
    // inside it, so match the stable tail instead of the original 'Dubai-Based...' string. Replace the
    // tightest element that still wraps the tagline (works whether it's one text node or split letters).
    document.querySelectorAll('div,span,p,a,h1,h2,h3,h4,h5,h6,li').forEach((el) => {
      if (compact(el.textContent).indexOf(ADDR_KEY) === -1) return;
      if (Array.from(el.children).some((c) => compact(c.textContent).indexOf(ADDR_KEY) !== -1)) return;
      if (normalize(el.textContent) !== NEW_ADDR) el.textContent = NEW_ADDR;
    });

    // Copyright: replace Framer placeholder with NGUYEN ARCHITECTURE.
    document.querySelectorAll('div,span,p,li').forEach((el) => {
      const k = compact(el.textContent || '');
      if (k.indexOf('yourarchitecturestudio') === -1 && k.indexOf('nguyenarchitecture&engineering') === -1 && k.indexOf('nguyenarchitectureengineering') === -1) return;
      if (Array.from(el.children).some((c) => { const ck = compact(c.textContent || ''); return ck.indexOf('yourarchitecturestudio') !== -1 || ck.indexOf('nguyenarchitecture&engineering') !== -1; })) return;
      const curr = normalize(el.textContent || '');
      const next = curr
        .replace(/Your Architecture Studio/gi, 'NGUYEN ARCHITECTURE')
        .replace(/NGUYEN Architecture\s*&(?:amp;)?\s*Engineering/gi, 'NGUYEN ARCHITECTURE');
      if (curr !== next) el.textContent = next;
    });

    // Fix email link: correct href, reduce font size so full address is never clipped, no decoration.
    document.querySelectorAll('a[href^="mailto:"]').forEach((a) => {
      if (!a.getAttribute('href').includes('nguyenarchitecture.com')) {
        a.setAttribute('href', 'mailto:info@nguyenarchitecture.com');
      }
      a.style.setProperty('color', 'inherit', 'important');
      a.style.setProperty('text-decoration', 'none', 'important');
      a.style.setProperty('font-size', 'clamp(11px,1vw,13px)', 'important');
      a.style.setProperty('word-break', 'normal', 'important');
      a.style.setProperty('overflow-wrap', 'normal', 'important');
      a.style.setProperty('white-space', 'nowrap', 'important');
    });
  }

  patchFooter();
  window.addEventListener('load', patchFooter, { once: true });
  [300, 800, 1800, 3500, 6000, 10000, 20000, 40000].forEach((t) => setTimeout(patchFooter, t));

  const obs = new MutationObserver(patchFooter);
  if (document.body) obs.observe(document.body, { childList: true, subtree: true, characterData: true });
  setTimeout(() => obs.disconnect(), 60000);
})();
</script>`

const FOOTER_NAV_PATCH = `
<style id="nguyen-footer-nav-styles">
footer [data-framer-name="footer-links"] { visibility: hidden !important; pointer-events: none !important; }
footer [data-framer-name="footer-links"] * { visibility: hidden !important; pointer-events: none !important; }
footer > .nguyen-footer-links {
  position: absolute !important; left: 71.5% !important; width: 136px !important;
  display: flex !important; flex-direction: column !important; gap: 4px !important;
  margin: 0 !important; padding: 0 !important; z-index: 5;
}
footer > .nguyen-footer-links > a {
  display: flex !important; align-items: center !important; min-height: 44px !important;
  margin: 0 !important; padding: 0 !important; opacity: 1 !important;
  visibility: visible !important; transform: none !important; background: transparent !important;
  color: rgba(79,71,66,.8) !important; font: 500 14px/1.3 "Inter Display", Arial, sans-serif !important;
  letter-spacing: -.4px !important; text-decoration: none !important; border-radius: 0 !important;
}
footer > .nguyen-footer-links > a:hover,
footer > .nguyen-footer-links > a:focus-visible { text-decoration: underline !important; text-underline-offset: 5px; color: #4f4742 !important; }
@media (max-width: 809px) {
  footer > .nguyen-footer-links { left: var(--footer-nav-mobile-left, 24px) !important; gap: 0 !important; }
}
</style>
<script id="nguyen-socal-footer-nav-patch">
(() => {
  const home = window.location.origin + '/client-demos/client-8889/arcsphere-socal';
  const destinations = {
    home,
    services: home + '#services',
    projects: home + '#featured-projects',
    process: home + '#process',
    contact: window.location.origin + '/client-demos/client-8889/residential/contact'
  };
  function patchFooterNav() {
    document.querySelectorAll('footer [data-framer-name="footer-links"]').forEach((original) => {
      const footer = original.closest('footer');
      original.setAttribute('aria-hidden', 'true');
      original.setAttribute('inert', '');
      if (getComputedStyle(footer).position === 'static') footer.style.position = 'relative';
      let nav = footer.querySelector(':scope > .nguyen-footer-links');
      if (!nav) {
        nav = document.createElement('nav');
        nav.className = 'nguyen-footer-links';
        nav.setAttribute('aria-label', 'Footer navigation');
        ['home', 'services', 'projects', 'process', 'contact'].forEach((key) => {
          const link = document.createElement('a');
          link.textContent = key.toUpperCase();
          link.href = destinations[key];
          link.setAttribute('data-nguyen-footer-nav', key);
          nav.appendChild(link);
        });
        footer.appendChild(nav);
      }
      const bounds = footer.getBoundingClientRect();
      const heading = footer.querySelector('h3, h2');
      const mobile = window.innerWidth <= 809;
      const reference = (mobile ? original : heading || original).getBoundingClientRect();
      nav.style.top = Math.max(0, reference.top - bounds.top - (mobile ? 0 : 12)) + 'px';
      nav.style.setProperty('--footer-nav-mobile-left', (reference.left - bounds.left) + 'px');
    });
    // The process cards already exist; mark their containing section for this link.
    const card = Array.from(document.querySelectorAll('h2,h3,h4')).find((el) =>
      /^(consultation|discovery)$/i.test((el.textContent || '').trim()) && !el.closest('footer'));
    const section = card?.closest('section');
    if (section && !document.getElementById('process')) section.id = 'process';
  }
  document.addEventListener('click', (event) => {
    const link = event.target?.closest?.('.nguyen-footer-links a');
    if (!link) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const url = new URL(link.href);
    const target = url.pathname === location.pathname && url.hash && document.getElementById(url.hash.slice(1));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', url.hash);
    } else location.href = link.href;
  }, true);
  patchFooterNav();
  window.addEventListener('load', patchFooterNav, { once: true });
  window.addEventListener('resize', patchFooterNav);
  [300, 800, 1800, 3500, 6000, 10000].forEach((delay) => setTimeout(patchFooterNav, delay));
  const observer = new MutationObserver(patchFooterNav);
  if (document.body) observer.observe(document.body, { childList: true, subtree: true });
})();
<\/script>`

const ICON_BAR_PATCH = `
<script id="nguyen-socal-icon-bar-patch">
(() => {
  const ROW_SELECTOR = 'footer [data-framer-name="icons-group"]';
  const CONTACTS = [
    { key: 'email', text: 'info@nguyenarchitecture.com', label: 'Email NGUYEN Architecture', href: 'mailto:info@nguyenarchitecture.com' },
    { key: 'phone', text: '(714) 707-8889', label: 'Call NGUYEN Architecture', href: 'tel:+17147078889' },
    { key: 'location', text: 'California', label: 'View NGUYEN Architecture location', href: 'https://www.google.com/maps/search/?api=1&query=California', external: true },
  ];

  function setAttribute(el, name, value) {
    if (el.getAttribute(name) !== value) el.setAttribute(name, value);
  }

  function updateLabel(label, text) {
    if (label.textContent === text) return;
    // Framer splits hover labels into animated letter spans. Keep those nodes so
    // its hover transition can still update them and remove them on mouse leave.
    const walker = document.createTreeWalker(label, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let node;
    while ((node = walker.nextNode())) nodes.push(node);
    if (!nodes.length) {
      label.textContent = text;
      return;
    }
    let offset = 0;
    nodes.forEach((part, index) => {
      const end = index === nodes.length - 1 ? text.length : offset + (part.nodeValue || '').length;
      const value = text.slice(offset, end);
      if (part.nodeValue !== value) part.nodeValue = value;
      offset = end;
    });
  }

  function patchBar() {
    document.querySelectorAll(ROW_SELECTOR).forEach((row) => {
      // The three direct component wrappers are email, phone and location; the
      // intervening SVG background divs are separators, not contact items.
      const items = row.querySelectorAll(':scope > div > [data-framer-name]');
      if (items.length !== CONTACTS.length) return;
      items.forEach((item, index) => {
        const contact = CONTACTS[index];
        setAttribute(item, 'data-nguyen-footer-contact', contact.key);
        setAttribute(item, 'data-nguyen-contact-href', contact.href);
        setAttribute(item, 'role', 'link');
        setAttribute(item, 'tabindex', '0');
        setAttribute(item, 'aria-label', contact.label + ': ' + contact.text);
        item.querySelectorAll('[data-framer-component-type="RichTextContainer"] p').forEach((label) => updateLabel(label, contact.text));
        item.querySelectorAll('a').forEach((link) => setAttribute(link, 'href', contact.href));
      });
    });
  }

  function activateContact(event) {
    if (event.type === 'keydown' && event.key !== 'Enter') return;
    const target = event.target?.nodeType === Node.TEXT_NODE ? event.target.parentElement : event.target;
    const item = target?.closest?.('[data-nguyen-footer-contact]');
    if (!item || !item.closest(ROW_SELECTOR)) return;
    const contact = CONTACTS.find((entry) => entry.key === item.getAttribute('data-nguyen-footer-contact'));
    if (!contact) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    if (contact.external) window.open(contact.href, '_blank', 'noopener,noreferrer');
    else window.location.href = contact.href;
  }

  function start() {
    patchBar();
    document.addEventListener('click', activateContact, true);
    document.addEventListener('keydown', activateContact, true);
    // Labels are mounted anew on hover, even minutes after load. Observe those
    // changes before paint, and discover replacement footers on breakpoint changes.
    const observer = new MutationObserver((records) => {
      const relevant = records.some((record) => {
        const target = record.target.nodeType === Node.TEXT_NODE ? record.target.parentElement : record.target;
        if (target?.closest?.(ROW_SELECTOR)) return true;
        return Array.from(record.addedNodes).some((node) => node.nodeType === Node.ELEMENT_NODE &&
          (node.matches(ROW_SELECTOR) || node.querySelector(ROW_SELECTOR)));
      });
      if (relevant) patchBar();
    });
    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['href'] });
    }
  }

  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
})();
</script>`

// Aggressive cleanup for the "Professional guidance during construction..." extra service card.
// The base layer sets display:none on the first img-bearing ancestor of the description text, but
// that ancestor can be an INNER element (e.g., the image container), leaving the outer card frame
// still in the flex layout as an empty box — creating the visible blank gap on mobile. This patch
// walks up to find the outermost SINGLE-card container and collapses it with both display:none AND
// layout-collapsing CSS (height:0, overflow:hidden, etc.) so no gap remains on any breakpoint.
const EXTRA_CARD_CLEANUP_PATCH = `
<script id="nguyen-socal-extra-card-cleanup">
(() => {
  const compact = (v) => (v || '').replace(/\\s+/g, '').toLowerCase();
  const EXTRA_DESC = compact('Professional guidance during construction to ensure the design vision is executed correctly.');

  function isProtectedContainer(el) {
    if (!el || !el.isConnected) return true;
    if (el.matches('body, main, footer')) return true;
    if (el.querySelector('footer')) return true;
    if (el.querySelector('[data-nguyen-footer-nav]')) return true;
    if (el.closest('footer')) return true;
    return false;
  }

  function hide(el) {
    if (!el || !el.isConnected || el.getAttribute('data-nex') === '1' || isProtectedContainer(el)) return;
    el.setAttribute('data-nex', '1');
    el.style.setProperty('display', 'none', 'important');
    el.style.setProperty('height', '0', 'important');
    el.style.setProperty('min-height', '0', 'important');
    el.style.setProperty('max-height', '0', 'important');
    el.style.setProperty('overflow', 'hidden', 'important');
    el.style.setProperty('margin', '0', 'important');
    el.style.setProperty('padding', '0', 'important');
    el.style.setProperty('border', 'none', 'important');
    el.style.setProperty('visibility', 'hidden', 'important');
    el.style.setProperty('pointer-events', 'none', 'important');
  }

  function cleanup() {
    if (!document.body) return;
    const vw = window.innerWidth || 375;
    document.querySelectorAll('*').forEach((el) => {
      if (el.getAttribute('data-nex') === '1') return;
      if (compact(el.textContent) !== EXTRA_DESC) return;
      // Skip wrapper elements that just contain a child with the same text
      if (Array.from(el.children).some((c) => compact(c.textContent) === EXTRA_DESC)) return;

      // Walk up to find the card (first img-bearing ancestor of the description leaf)
      let card = el;
      for (let d = 0; card.parentElement && d < 10; d++, card = card.parentElement) {
        if (isProtectedContainer(card) || isProtectedContainer(card.parentElement)) return;
        if (card.parentElement.querySelector?.('img')) { card = card.parentElement; break; }
      }

      if (card.closest('footer') || isProtectedContainer(card)) return;

      // Walk up further to find the outermost single-card container.
      // Stop when the parent is the section container (has >1 img = multiple cards, or is full-width).
      for (let d = 0; card.parentElement && d < 8; d++) {
        const p = card.parentElement;
        if (isProtectedContainer(p)) break;
        if ((p.querySelectorAll?.('img') || []).length > 1) break;
        const pw = p.getBoundingClientRect().width;
        if (pw > 0 && pw >= vw * 0.9) break;
        card = p;
      }

      if (isProtectedContainer(card)) return;
      hide(card);
    });
  }

  cleanup();
  window.addEventListener('load', cleanup, { once: true });
  [300, 800, 1800, 3500, 6000].forEach((t) => setTimeout(cleanup, t));
  let nexTimer;
  const obs = new MutationObserver(() => { clearTimeout(nexTimer); nexTimer = setTimeout(cleanup, 150); });
  if (document.body) obs.observe(document.body, { childList: true, subtree: true });
  setTimeout(() => obs.disconnect(), 10000);
})();
</script>`

// Swap process card images with the four client-supplied PNGs. Cards are marked with
// data-nguyen-process-step="N" by arcsphere-fixed, so we can target them even after
// Framer lazy-loads or re-renders the images.
const PROCESS_TILE_IMAGE_PATCH = `
<script id="nguyen-socal-process-tile-images">
(() => {
  const origin = window.location.origin;
  const STEP_MAP = [
    {
      step: '1',
      desc: [
        'We begin by understanding your goals, requirements, and design vision.',
        'We begin with existing conditions, business needs, zoning, occupancy and local requirements.',
        'We discuss your goals, project scope, budget, timeline, and requirements.',
      ],
      src: origin + '/client-8889/process/01_discovery.png',
      alt: 'Consultation',
    },
    {
      step: '2',
      desc: [
        'Our team develops layouts, ideas, and creative design directions.',
        'We review the site, zoning, codes, constraints, existing conditions, and project feasibility.',
      ],
      src: origin + '/client-8889/process/02_existing_condition_survey_design.png',
      alt: 'Site Analysis & Feasibility',
    },
    {
      step: '3',
      desc: [
        'Detailed drawings, materials, and spatial specifications are finalized.',
        'We develop the initial layout, massing, design direction, and key project concepts.',
      ],
      src: origin + '/client-8889/process/03_architecture_engineering.png',
      alt: 'Concept Design',
    },
    {
      step: '4',
      desc: [
        'We guide implementation to ensure the final result reflects the original design vision.',
        'We support building permit, plan check, corrections, consultants and city coordination through approval.',
        'We coordinate architectural and engineering drawings into a complete permit-ready design.',
      ],
      src: origin + '/client-8889/process/04_execution.png',
      alt: 'Design & Engineering',
    },
  ];

  const compact = (v) => (v || '').replace(/\\s+/g, ' ').trim().replace(/\\s+/g, '').toLowerCase();

  // PROCESS_PATCH marks the bottom text panel, not the full card. Always climb to
  // the Framer card that owns the full-size background image before replacing it.
  function findMediaCard(start) {
    let node = start;
    for (let depth = 0; node && depth < 12; depth += 1, node = node.parentElement) {
      if (node.querySelector(':scope > [data-framer-background-image-wrapper="true"]')) return node;
    }
    return null;
  }

  // Walk the DOM for an element whose textContent exactly matches a description,
  // then climb to its full Framer card.
  function findCardByDesc(descList) {
    const keys = new Set(descList.map(compact));
    const all = document.body ? document.body.querySelectorAll('*') : [];
    for (const el of all) {
      if (!keys.has(compact(el.textContent))) continue;
      const card = findMediaCard(el);
      if (card) return card;
    }
    return null;
  }

  const imageObservers = new Map();

  function setImportantStyle(el, property, value) {
    if (el.style.getPropertyValue(property) === value && el.style.getPropertyPriority(property) === 'important') return;
    el.style.setProperty(property, value, 'important');
  }

  function applyImage(img, src, alt) {
    if (img.getAttribute('src') !== src) img.setAttribute('src', src);
    if (img.getAttribute('alt') !== alt) img.setAttribute('alt', alt);
    if (img.getAttribute('data-nguyen-process-img') !== src) {
      img.setAttribute('data-nguyen-process-img', src);
    }
    if (img.hasAttribute('srcset')) img.removeAttribute('srcset');
    if (img.hasAttribute('sizes')) img.removeAttribute('sizes');

    // CSS content keeps the supplied image visible even if Framer briefly restores
    // its original src during reconciliation. The attribute observer repairs src too.
    setImportantStyle(img, 'content', 'url("' + src + '")');
    setImportantStyle(img, 'display', 'block');
    setImportantStyle(img, 'width', '100%');
    setImportantStyle(img, 'height', '100%');
    setImportantStyle(img, 'object-fit', 'cover');
    setImportantStyle(img, 'object-position', 'center');
  }

  function lockImage(img, src, alt) {
    applyImage(img, src, alt);
    if (imageObservers.has(img)) return;

    const observer = new MutationObserver(() => applyImage(img, src, alt));
    observer.observe(img, {
      attributes: true,
      attributeFilter: ['src', 'srcset', 'sizes', 'style'],
    });
    imageObservers.set(img, observer);
  }

  // Cache each step's real background image, never the bottom text panel.
  const resolved = new Map();

  function patchProcessTiles() {
    if (!document.body) return;
    STEP_MAP.forEach((spec) => {
      let img = resolved.get(spec.step);
      if (img && !img.isConnected) {
        const imageObserver = imageObservers.get(img);
        if (imageObserver) imageObserver.disconnect();
        imageObservers.delete(img);
        resolved.delete(spec.step);
        img = null;
      }

      if (!img) {
        const marked = document.querySelector('[data-nguyen-process-step="' + spec.step + '"]');
        const card = findMediaCard(marked) || findCardByDesc(spec.desc);
        if (!card) return;
        img = card.querySelector(':scope > [data-framer-background-image-wrapper="true"] img');
        if (!img) return;
        resolved.set(spec.step, img);
      }

      lockImage(img, spec.src, spec.alt);
    });
  }

  let ptTimer;
  const schedule = () => { clearTimeout(ptTimer); ptTimer = setTimeout(patchProcessTiles, 80); };

  function start() {
    patchProcessTiles();
    [100, 300, 600, 1000, 1800, 3000, 5000, 8000, 12000, 20000].forEach((t) => setTimeout(patchProcessTiles, t));
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });

    const observer = new MutationObserver(schedule);
    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['data-nguyen-process-step'],
      });
    }
  }

  // Wait until the Framer page has hydrated before touching its image elements.
  if (document.readyState === 'complete') setTimeout(start, 0);
  else window.addEventListener('load', start, { once: true });
})();
</script>`

// Universal card routing. The project cards and design panels are Framer <a href="./projects..."> links
// that resolve to the Framer site via the <base> tag. Per-card detection (size gates, breakpoint copies)
// kept missing on mobile, so instead map EVERY Framer project link to the correct internal page by its
// href + text and rewrite the href up front (absolute origin URL, so it bypasses <base> and works with a
// plain tap on any breakpoint). A capture-phase click handler covers anchors tapped before the rewrite runs.
const CARD_ROUTING_PATCH = `
<script id="nguyen-socal-card-routing">
(() => {
  const origin = window.location.origin;
  const svc = origin + '/client-demos/client-8889/residential/services';
  const home = origin + '/client-demos/client-8889/arcsphere-socal';
  const compact = (v) => (v || '').replace(/\\s+/g, '').toLowerCase();

  function targetFor(anchor) {
    const href = (anchor.getAttribute('href') || '').toLowerCase();
    if (href.indexOf('/projects') === -1 && href.indexOf('./projects') === -1) return null;
    const t = compact(anchor.textContent);
    if (href.indexOf('serenity-villa') !== -1) return svc + '/custom-homes';
    if (href.indexOf('corporate-office-space') !== -1) return svc + '/commercial';
    if (href.indexOf('minimalist-apartment-interior') !== -1) return svc + '/commercial';
    if (t.indexOf('residentialdesign') !== -1 || t.indexOf('residencial') !== -1 || t.indexOf('residentialarchitecture') !== -1 || t.indexOf('customhome') !== -1) return origin + '/client-demos/client-8889/residential#nguyen-blueprint-guide';
    if (t.indexOf('commercialdesign') !== -1 || t.indexOf('commercialarchitecture') !== -1 || t.indexOf('commercialbuilding') !== -1) return svc + '/commercial#commercial-floor-plans';
    if (t.indexOf('multifamily') !== -1) return svc + '/multifamily';
    if (t.indexOf('adu') !== -1) return svc + '/adus';
    if (t.indexOf('addition') !== -1 || t.indexOf('remodel') !== -1) return svc + '/additions-remodels';
    if (t.indexOf('landdevelopment') !== -1) return svc + '/land-development';
    if (t.indexOf('viewprojecttypes') !== -1 || t.indexOf('viewmoreprojects') !== -1 || t.indexOf('projects') !== -1) return home + '#featured-projects';
    return null;
  }

  function rewrite() {
    document.querySelectorAll('a[href]').forEach((a) => {
      if (a.getAttribute('data-nguyen-routed') === '1') return;
      const url = targetFor(a);
      if (!url) return;
      a.setAttribute('data-nguyen-routed', '1');
      a.setAttribute('href', url);
      a.removeAttribute('target');
      a.removeAttribute('rel');
    });
  }

  rewrite();
  window.addEventListener('load', rewrite, { once: true });
  [300, 800, 1800, 3500, 6000, 10000, 20000].forEach((t) => setTimeout(rewrite, t));
  const obs = new MutationObserver(rewrite);
  if (document.body) obs.observe(document.body, { childList: true, subtree: true });
  setTimeout(() => obs.disconnect(), 30000);

  if (!window.__nguyenCardRoutingUniversal) {
    window.__nguyenCardRoutingUniversal = true;
    document.addEventListener('click', (e) => {
      const start = e.target && e.target.nodeType === Node.TEXT_NODE ? e.target.parentElement : e.target;
      const a = start && start.closest ? start.closest('a[href]') : null;
      if (!a) return;
      const url = targetFor(a);
      if (!url) return;
      e.preventDefault();
      e.stopPropagation();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
      window.location.href = url;
    }, true);
  }
})();
</script>`


// Route hero / section CTA buttons (START A PROJECT, BOOK CONSULTATION, GET IN TOUCH, etc.)
// to the contact form. These buttons are NOT in the top nav so MAIN_NAV_PATCH misses them.
const HERO_CTA_PATCH = `
<script id="nguyen-socal-hero-cta-patch">
(() => {
  const contactUrl = window.location.origin + '/client-demos/client-8889/residential/contact';
  const compact = (v) => (v || '').replace(/\\s+/g, '').toLowerCase();
  // Only match unambiguous hero/section CTA labels here.
  const CTA_KEYS = new Set([
    'startaproject','bookconsultation','bookaconsultation','getintouch',
    'startyourproject','requestconsultation',
    'scheduleaconsultation','scheduleconsultation','letswork','letsworktogether',
  ]);

  // Framer's split-text animation wraps each character in a separate span, causing
  // textContent to contain the label twice (e.g. "START A PROJECTSTART A PROJECT").
  // matchesCTA handles single, doubled, and tripled forms so we catch both the static
  // and animated states of the button.
  function matchesCTA(key) {
    if (CTA_KEYS.has(key)) return true;
    for (const k of CTA_KEYS) {
      if (key === k + k || key === k + k + k) return true;
    }
    return false;
  }

  // Use DOM ancestry only (not getBoundingClientRect which returns top=0 for unpositioned elements).
  // Only exclude elements inside semantic <nav> or role="navigation" — Framer uses <div> for most things.
  function isInNav(el) {
    return !!(el.closest && el.closest('nav, [role="navigation"]'));
  }

  function patchHeroCtas() {
    if (!document.body) return;
    // Scan ALL elements so we catch Framer's <div>-based buttons, not just <a> and <button>.
    // Find the smallest element whose compact text matches CTA_KEYS (no child with the same text).
    document.body.querySelectorAll('*').forEach((el) => {
      if (el.getAttribute('data-nguyen-hero-cta') === '1') return;
      if (isInNav(el)) return;
      const key = compact(el.textContent);
      if (!matchesCTA(key)) return;
      // Skip containers — only target the innermost element with that text.
      for (const child of el.children) {
        if (compact(child.textContent) === key) return;
      }
      el.setAttribute('data-nguyen-hero-cta', '1');
      if (el.tagName === 'A') {
        el.setAttribute('href', contactUrl);
        el.removeAttribute('target');
        el.removeAttribute('rel');
      }
    });
  }

  patchHeroCtas();
  window.addEventListener('load', patchHeroCtas, { once: true });
  [100, 300, 800, 1500, 3000, 6000, 10000].forEach((t) => setTimeout(patchHeroCtas, t));

  // Capture-phase click on document — fires before any Framer handler.
  // Walk UP from the click target to find the first ancestor whose text matches CTA_KEYS.
  // This catches <div>-based Framer buttons (not just <a href> or <button>).
  if (!window.__nguyenHeroCtaRouting) {
    window.__nguyenHeroCtaRouting = true;
    document.addEventListener('click', (e) => {
      let node = e.target;
      while (node && node !== document.body) {
        if (node.nodeType === Node.ELEMENT_NODE && !isInNav(node)) {
          if (matchesCTA(compact(node.textContent || ''))) {
            e.preventDefault();
            e.stopPropagation();
            if (e.stopImmediatePropagation) e.stopImmediatePropagation();
            window.location.href = contactUrl;
            return;
          }
        }
        node = node.parentElement;
      }
    }, true);
  }

  const obs = new MutationObserver(patchHeroCtas);
  if (document.body) obs.observe(document.body, { childList: true, subtree: true });
  setTimeout(() => obs.disconnect(), 20000);
})();
</script>`

export async function GET() {
  const response = await getConcept()
  if (!response.ok) return response

  let html = await response.text()
  html = html.split(OLD_COPY).join(NEW_COPY)
  // Replace the Framer placeholder email everywhere it appears server-rendered in the HTML.
  // The base layer's /ArcSphere/gi branding swap rewrites server-rendered "arcsphere" to
  // "NGUYEN", so cover both the raw and post-rebrand forms (harmless if client-rendered).
  html = html.replace(/hello@(?:arcsphere|nguyen)studio\.ae/gi, 'info@nguyenarchitecture.com')
  html = html.replace('</body>', `${SPLIT_TEXT_PATCH}${BRAND_PATCH}${SQUARE_IMAGES_PATCH}${SERVICES_ANCHOR_PATCH}${MAIN_NAV_PATCH}${ENGINEERING_SERVICE_PATCH}${PROJECT_CARDS_PATCH}${DESIGN_PANELS_PATCH}${RESIDENTIAL_ROW_IMAGE_PATCH}${BLUEPRINT_IMAGE_PATCH}${PROCESS_TILE_IMAGE_PATCH}${CARD_ROUTING_PATCH}${EXTRA_CARD_CLEANUP_PATCH}${FOOTER_PATCH}${FOOTER_NAV_PATCH}${ICON_BAR_PATCH}${TESTIMONIAL_PATCH}${HERO_CTA_PATCH}</body>`)

  const headers = new Headers(response.headers)
  headers.set('Content-Type', 'text/html; charset=utf-8')
  headers.set('Cache-Control', 'no-store')

  return new Response(html, { status: response.status, headers })
}
