// Shared footer patches for the client-8889 Framer proxy pages.
// Framer ships one footer copy per breakpoint, so both patches iterate every copy and
// skip the hidden ones rather than relying on data-framer-name, which only the desktop copy carries.

export const FOOTER_PATCH = `
<script id="nguyen-socal-footer-patch">
(() => {
  const normalize = (v) => (v || '').replace(/\\s+/g, ' ').trim();
  const compact = (v) => normalize(v).replace(/\\s+/g, '').toLowerCase();
  const NEW_PHONE = '(714) 707-8889  ·  (209) 233-8888';
  const NEW_ADDR = '7171 Warner Ave., Ste. B, Huntington Beach, CA 92647';
  const NEW_EMAIL = 'info@nguyenarchitecture.com';
  // Match both old placeholder phone formats (Indonesian +62 and UAE +971).
  const PHONE_PATTERNS = ['6281234567890', '971559876543'];
  // Match both old address formats: long tagline and short "Dubai, UAE". The residential page
  // rebrands Dubai -> Southern California client-side, so catch that rewritten form too.
  const ADDR_KEYS = ['basedarchitectureandinteriordesignstudio', 'dubai,uae', 'dubai,', 'southerncalifornia,uae'];
  // Placeholder emails Framer ships; matched on the domain so any local part is caught.
  const OLD_EMAIL_RE = /[A-Za-z0-9._%+-]+@arcsphere[A-Za-z0-9.-]*\\.[A-Za-z]{2,}/gi;

  function isPhoneNode(key) {
    return PHONE_PATTERNS.some((p) => key.indexOf(p) !== -1);
  }
  function isAddrEl(text) {
    return ADDR_KEYS.some((k) => text.indexOf(k) !== -1);
  }

  function patchFooter() {
    // Phone: match on digits so formatting differences don't break it.
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const key = compact(node.nodeValue);
      if (!isPhoneNode(key)) continue;
      const parent = node.parentElement;
      if (parent && !parent.querySelector('[data-nguyen-footer-phone]')) {
        parent.innerHTML = '';
        const wrap = document.createElement('span');
        wrap.setAttribute('data-nguyen-footer-phone', '1');
        wrap.appendChild(document.createTextNode(NEW_PHONE));
        parent.appendChild(wrap);
      }
    }

    // Address: match both the long tagline and the short "Dubai, UAE" placeholder.
    document.querySelectorAll('div,span,p,a,h1,h2,h3,h4,h5,h6,li').forEach((el) => {
      const text = compact(el.textContent);
      if (!isAddrEl(text)) return;
      if (Array.from(el.children).some((c) => isAddrEl(compact(c.textContent)))) return;
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

    // Email shown as plain text rather than a mailto link.
    const mailWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let mailNode;
    while ((mailNode = mailWalker.nextNode())) {
      const raw = mailNode.nodeValue;
      if (!raw || raw.indexOf('@') === -1) continue;
      OLD_EMAIL_RE.lastIndex = 0;
      if (!OLD_EMAIL_RE.test(raw)) continue;
      OLD_EMAIL_RE.lastIndex = 0;
      mailNode.nodeValue = raw.replace(OLD_EMAIL_RE, NEW_EMAIL);
    }

    // Email: fix href AND displayed text for any old placeholder address.
    document.querySelectorAll('a[href^="mailto:"]').forEach((a) => {
      if (!a.getAttribute('href').includes('nguyenarchitecture.com')) {
        a.setAttribute('href', 'mailto:' + NEW_EMAIL);
      }
      const displayed = (a.textContent || '').trim();
      if (displayed && displayed !== NEW_EMAIL && displayed.includes('@')) a.textContent = NEW_EMAIL;
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

  // patchFooter tree-walks every footer copy; running it on each mutation batch during a mobile scroll
  // added up. Coalesce bursts into one delayed run — the timed passes above still cover late renders.
  let footerTimer;
  const scheduleFooter = () => { clearTimeout(footerTimer); footerTimer = setTimeout(patchFooter, 150); };
  const obs = new MutationObserver(scheduleFooter);
  if (document.body) obs.observe(document.body, { childList: true, subtree: true, characterData: true });
  setTimeout(() => obs.disconnect(), 60000);
})();
</script>`

export const FOOTER_NAV_PATCH = `
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
  footer > .nguyen-footer-links {
    left: var(--footer-nav-mobile-left, 24px) !important;
    top: var(--footer-nav-mobile-top, auto) !important;
    width: min(220px, calc(100% - 48px)) !important;
    gap: 0 !important;
  }
  footer > .nguyen-footer-links > a { min-height: 36px !important; }
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
  function findFooterText(footer, text) {
    const key = text.replace(/\\s+/g, '').toLowerCase();
    return Array.from(footer.querySelectorAll('h1,h2,h3,h4,p,span,div')).find((el) => {
      if ((el.textContent || '').replace(/\\s+/g, '').toLowerCase() !== key) return false;
      return !Array.from(el.children).some((child) => (child.textContent || '').replace(/\\s+/g, '').toLowerCase() === key);
    });
  }
  const compact = (v) => (v || '').replace(/\\s+/g, '').toLowerCase();
  // Framer ships one footer copy per breakpoint and not every copy carries
  // data-framer-name="footer-links", so the stylesheet above misses those and they show through
  // underneath the injected nav. Match on the link labels instead of the Framer name.
  const LEGACY_NAV_LABELS = ['home', 'about', 'services', 'projects', 'process', 'contact'];
  const OTHER_COLUMN_LABELS = ['pinterest', 'linkedin', 'instagram', 'behance', 'privacypolicy', 'cookiepolicy', 'terms&conditions'];

  function hideLegacyNavGroups(footer) {
    const matches = [];
    footer.querySelectorAll('*').forEach((el) => {
      if (el.classList.contains('nguyen-footer-links')) return;
      if (el.closest('.nguyen-footer-links')) return;
      if (el.querySelector('.nguyen-footer-links')) return;
      const text = compact(el.textContent);
      if (LEGACY_NAV_LABELS.filter((label) => text.indexOf(label) !== -1).length < 3) return;
      // A container that also holds the social or legal column is wider than the nav group.
      if (OTHER_COLUMN_LABELS.some((label) => text.indexOf(label) !== -1)) return;
      matches.push(el);
    });
    matches.forEach((el) => {
      // Hide only the tightest container holding the labels; a wider one takes real content with it.
      if (matches.some((other) => other !== el && el.contains(other))) return;
      el.setAttribute('aria-hidden', 'true');
      el.setAttribute('inert', '');
      el.style.setProperty('visibility', 'hidden', 'important');
      el.style.setProperty('pointer-events', 'none', 'important');
    });
    // Fallback for mobile: when nav + social + legal share a parent the group approach finds nothing.
    // Hide each individual legacy nav link by its exact text label instead.
    if (matches.length === 0) {
      footer.querySelectorAll('a,span,div,p').forEach((el) => {
        if (el.closest('.nguyen-footer-links')) return;
        if (!LEGACY_NAV_LABELS.includes(compact(el.textContent))) return;
        if (Array.from(el.children).some((c) => LEGACY_NAV_LABELS.includes(compact(c.textContent)))) return;
        el.setAttribute('aria-hidden', 'true');
        el.setAttribute('inert', '');
        el.style.setProperty('visibility', 'hidden', 'important');
        el.style.setProperty('pointer-events', 'none', 'important');
      });
    }
  }

  function patchFooterNav() {
    document.querySelectorAll('footer').forEach(hideLegacyNavGroups);
    // Framer ships one footer copy per breakpoint; only the desktop copy typically carries
    // data-framer-name="footer-links". Iterate all footers so the mobile copy also gets a nav.
    document.querySelectorAll('footer').forEach((footer) => {
      if (getComputedStyle(footer).display === 'none') return;
      const original = footer.querySelector('[data-framer-name="footer-links"]');
      if (original) { original.setAttribute('aria-hidden', 'true'); original.setAttribute('inert', ''); }
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
      const getInTouch = findFooterText(footer, 'GET IN TOUCH');
      const refEl = mobile ? (getInTouch || heading || original) : (heading || original);
      if (!refEl) return;
      const reference = refEl.getBoundingClientRect();
      if (mobile) {
        const leftReference = heading || getInTouch || original;
        const left = leftReference ? Math.max(20, leftReference.getBoundingClientRect().left - bounds.left) : 24;
        nav.style.setProperty('--footer-nav-mobile-top', Math.max(0, reference.bottom - bounds.top + 42) + 'px');
        nav.style.setProperty('--footer-nav-mobile-left', left + 'px');
      } else {
        nav.style.top = Math.max(0, reference.top - bounds.top - 12) + 'px';
        nav.style.removeProperty('--footer-nav-mobile-top');
        nav.style.removeProperty('--footer-nav-mobile-left');
      }
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
  // patchFooterNav walks every footer's whole subtree and reads layout (getBoundingClientRect), so
  // running it on each of the many mutations Framer fires during a mobile scroll thrashed layout hard
  // enough to crash the tab and reload it to the top. Coalesce mutation bursts into one delayed run,
  // and disconnect once the footer breakpoint copies have settled — the nav is positioned relative to
  // its footer, so scrolling never needs a re-run.
  let navTimer;
  const scheduleFooterNav = () => { clearTimeout(navTimer); navTimer = setTimeout(patchFooterNav, 200); };
  const observer = new MutationObserver(scheduleFooterNav);
  if (document.body) observer.observe(document.body, { childList: true, subtree: true });
  setTimeout(() => observer.disconnect(), 60000);
})();
<\/script>`
