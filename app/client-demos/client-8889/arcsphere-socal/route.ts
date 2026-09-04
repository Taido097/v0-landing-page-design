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
  setTimeout(() => { patchRoot(document.body); observer.disconnect(); }, 6000);
})();
</script>`

const BRAND_PATCH = `
<script id="nguyen-socal-brand-patch">
(() => {
  const TARGET_TEXT = 'NGUYEN ARCHITECTURE & ENGINEERING';
  const TARGET_URL = window.location.origin + '/client-demos/client-8889/arcsphere-socal';
  const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();

  function patchBrand() {
    if (!document.body) return;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const matches = [];

    while (walker.nextNode()) {
      const node = walker.currentNode;
      const text = normalize(node.nodeValue);
      if (text === 'ArcSphere' || text === 'ArcSphere Studio') matches.push(node);
    }

    matches.forEach((node) => {
      if (normalize(node.nodeValue) !== 'ArcSphere' && normalize(node.nodeValue) !== 'ArcSphere Studio') return;
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
  [250, 750, 1500, 3000].forEach((delay) => setTimeout(patchBrand, delay));
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
  const contact = 'mailto:info@nguyen-ae.com';
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
      } else if (key.includes('nguyenarchitecture&engineering')) {
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

  function findEngineeringCard() {
    const existing = document.querySelector('[data-nguyen-engineering-service="true"]');
    if (existing) return existing;

    const candidates = Array.from(document.querySelectorAll('*'));
    for (const candidate of candidates) {
      const key = compact(candidate.textContent);
      if (key !== sourceDescription && key !== targetDescriptionKey) continue;
      let card = candidate;
      for (let depth = 0; card && depth < 10; depth += 1, card = card.parentElement) {
        if (!card.querySelector?.('img')) continue;
        const text = compact(card.textContent);
        if (!text.includes(sourceDescription) && !text.includes(targetDescriptionKey)) continue;
        return card;
      }
    }
    return null;
  }

  function replaceLeafText(card, keys, replacement) {
    const candidates = [card, ...card.querySelectorAll('*')];
    for (const candidate of candidates) {
      const key = compact(candidate.textContent);
      if (!keys.has(key)) continue;
      const hasSameTextChild = Array.from(candidate.children).some((child) => compact(child.textContent) === key);
      if (hasSameTextChild) continue;
      if (normalize(candidate.textContent) !== replacement) candidate.textContent = replacement;
      candidate.style.setProperty('white-space', 'normal', 'important');
      candidate.style.setProperty('word-break', 'normal', 'important');
      candidate.style.setProperty('overflow-wrap', 'normal', 'important');
      return true;
    }
    return false;
  }

  function patchEngineering() {
    const card = findEngineeringCard();
    if (!card) return false;

    replaceLeafText(card, new Set([sourceDescription, targetDescriptionKey]), targetDescription);
    replaceLeafText(card, titleKeys, 'ENGINEERING');

    card.setAttribute('data-nguyen-engineering-service', 'true');
    card.setAttribute('data-nguyen-link', targetUrl);
    card.style.removeProperty('display');
    card.style.setProperty('cursor', 'pointer', 'important');
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
        if (r.width > 200 && r.height > 200) { cards.push(cursor); break; }
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
        if (r.width < 200 || r.height < 200) return;
        // Ensure it's not a parent of another already found card
        if (cards.some((c) => el.contains(c) || c.contains(el))) return;
        cards.push(el);
      });
    }
    return cards;
  }

  const patched = new WeakSet();

  function patchCards() {
    const cards = findCards();
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
    { key: 'commercialdesign', url: base + '/commercial' },
    { key: 'residentialdesign', url: base + '/custom-homes' },
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
      if (r.width < 300 || r.height < 200) return;
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

const FOOTER_PATCH = `
<script id="nguyen-socal-footer-patch">
(() => {
  const normalize = (v) => (v || '').replace(/\\s+/g, ' ').trim();
  const compact = (v) => normalize(v).replace(/\\s+/g, '').toLowerCase();
  const OLD_PHONE = compact('+62 812 3456 7890');
  const NEW_PHONE = '209-233-8888   714-707-8889';

  const OLD_ADDR = compact('Dubai-Based Architecture And Interior Design Studio');
  const NEW_ADDR = '7171 Warner Ave., Ste. B, Huntington Beach, CA 92647';

  function patchFooter() {
    // Fix phone number and address
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const key = compact(node.nodeValue);
      if (key === OLD_PHONE) {
        // Split into two lines with a <br>
        const parent = node.parentElement;
        if (parent) {
          parent.innerHTML = '';
          parent.appendChild(document.createTextNode('209-233-8888'));
          parent.appendChild(document.createElement('br'));
          parent.appendChild(document.createTextNode('714-707-8889'));
        }
      } else if (key === OLD_ADDR) {
        node.nodeValue = NEW_ADDR;
      }
    }

    // Fix email link color — match surrounding text color
    document.querySelectorAll('a[href^="mailto:"]').forEach((a) => {
      a.style.setProperty('color', 'inherit', 'important');
      a.style.setProperty('text-decoration', 'none', 'important');
    });
  }

  patchFooter();
  window.addEventListener('load', patchFooter, { once: true });
  [300, 800, 1800, 3500, 6000, 10000].forEach((t) => setTimeout(patchFooter, t));

  const obs = new MutationObserver(patchFooter);
  if (document.body) obs.observe(document.body, { childList: true, subtree: true, characterData: true });
  setTimeout(() => obs.disconnect(), 12000);
})();
</script>`

const ICON_BAR_PATCH = `
<script id="nguyen-socal-icon-bar-patch">
(() => {
  function hideIconBar() {
    const candidates = Array.from(document.querySelectorAll('div, nav, ul, section'));
    candidates.forEach((el) => {
      if (el.getAttribute('data-nguyen-icon-bar-checked')) return;
      el.setAttribute('data-nguyen-icon-bar-checked', '1');

      // Must have exactly 3 child links/buttons that are icon-only (SVG, no text)
      const links = Array.from(el.querySelectorAll(':scope > * > a, :scope > a, :scope > button, :scope > * > button'));
      if (links.length !== 3) return;
      const allIconOnly = links.every((link) => {
        const text = (link.textContent || '').replace(/\\s+/g, '');
        return text === '' && link.querySelector('svg');
      });
      if (!allIconOnly) return;

      // Should be a thin horizontal strip with dividers between icons.
      // Allow up to 200px to cover taller mobile layouts where icons may stack.
      const r = el.getBoundingClientRect();
      if (r.height > 200) return;

      el.style.setProperty('display', 'none', 'important');
    });
  }

  hideIconBar();
  window.addEventListener('load', hideIconBar, { once: true });
  [300, 800, 1800, 3500, 6000, 10000].forEach((t) => setTimeout(hideIconBar, t));

  const obs = new MutationObserver(hideIconBar);
  if (document.body) obs.observe(document.body, { childList: true, subtree: true });
  setTimeout(() => obs.disconnect(), 12000);
})();
</script>`


export async function GET() {
  const response = await getConcept()
  if (!response.ok) return response

  let html = await response.text()
  html = html.split(OLD_COPY).join(NEW_COPY)
  html = html.replace('</body>', `${SPLIT_TEXT_PATCH}${BRAND_PATCH}${SQUARE_IMAGES_PATCH}${SERVICES_ANCHOR_PATCH}${MAIN_NAV_PATCH}${ENGINEERING_SERVICE_PATCH}${PROJECT_CARDS_PATCH}${DESIGN_PANELS_PATCH}${FOOTER_PATCH}${ICON_BAR_PATCH}${TESTIMONIAL_PATCH}</body>`)

  const headers = new Headers(response.headers)
  headers.set('Content-Type', 'text/html; charset=utf-8')
  headers.set('Cache-Control', 'no-store')

  return new Response(html, { status: response.status, headers })
}
