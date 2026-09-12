export const BUILDERS_COMPLETE_PATCH = `
<script id="nguyen-concept1-builders-complete-delivery">
(() => {
  if (!window.location.pathname.includes('/client-demos/client-8889/arcsphere-socal')) return;

  const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();
  const compact = (value) => normalize(value).replace(/\\s+/g, '').toLowerCase();
  const SOURCE_DESCRIPTION = 'Professional guidance during construction to ensure the design vision is executed correctly.';
  const TARGET_DESCRIPTION = 'Full project delivery from planning and permits through construction coordination and completion.';
  const TARGET_TITLE = 'BUILDERS COMPLETE DELIVERY';
  const TARGET_URL = window.location.origin + '/client-demos/client-8889/residential/services/builders-complete-delivery';
  const THUMBNAIL = window.location.origin + '/client-8889/residential/detail/builders-complete-04-framing-complete.webp';
  const SOURCE_KEY = compact(SOURCE_DESCRIPTION);
  const TARGET_KEY = compact(TARGET_DESCRIPTION);

  // A single service card holds one title and (on desktop/tablet) its own image; the surrounding row
  // of sibling cards, or a section/main, is too broad to patch. Caps the climb below so it never
  // escapes the one card — same guard the Engineering card patch uses on this services section.
  function isTooBroad(el) {
    if (!el || !el.isConnected) return true;
    if (el === document.body || el === document.documentElement) return true;
    if (el.matches && el.matches('body, main, header, footer, nav')) return true;
    if (el.getAttribute && el.getAttribute('data-framer-name') === 'content') return true;
    if (el.querySelector && el.querySelector('header, footer, section')) return true;
    if ((el.querySelectorAll ? el.querySelectorAll('h1,h2,h3,h4,h5,h6').length : 0) > 1) return true;
    if ((el.querySelectorAll ? el.querySelectorAll('img').length : 0) > 2) return true;
    return false;
  }

  function findCards() {
    // Framer ships one DOM copy of this card per breakpoint (desktop / tablet / phone). Anchor on the
    // card's unique description text and climb to the OUTERMOST node still inside the single-card
    // boundary (isTooBroad caps the climb). Never anchor on an <img>: the phone copy has no image, so
    // the old image-seeking climb overshot into the sibling-card row and left the phone card
    // unconverted — the "new service not updated on mobile" symptom.
    const cards = [];
    const candidates = Array.from(document.querySelectorAll('*'));
    for (const candidate of candidates) {
      const key = compact(candidate.textContent);
      if (key !== SOURCE_KEY && key !== TARGET_KEY) continue;
      let node = candidate;
      while (node.parentElement && !isTooBroad(node.parentElement)) node = node.parentElement;
      if (isTooBroad(node)) continue;
      if (!cards.includes(node)) cards.push(node);
    }
    return cards;
  }

  function replaceDescription(card) {
    [card, ...card.querySelectorAll('*')].forEach((el) => {
      const key = compact(el.textContent);
      if (key !== SOURCE_KEY && key !== TARGET_KEY) return;
      if (Array.from(el.children).some((child) => compact(child.textContent) === key)) return;
      if (normalize(el.textContent) !== TARGET_DESCRIPTION) el.textContent = TARGET_DESCRIPTION;
      el.style.setProperty('white-space', 'normal', 'important');
      el.style.setProperty('word-break', 'normal', 'important');
      el.style.setProperty('overflow-wrap', 'normal', 'important');
    });
  }

  function replaceTitle(card) {
    const leafText = Array.from(card.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,div'))
      .filter((el) => {
        const text = normalize(el.textContent);
        if (!text || text.length > 80) return false;
        if (compact(text) === TARGET_KEY || compact(text) === SOURCE_KEY) return false;
        if (/^[0-9]+$/.test(text)) return false;
        if (/^[↗→←•·]+$/.test(text)) return false;
        return !Array.from(el.children).some((child) => normalize(child.textContent) === text);
      });

    const targetKey = compact(TARGET_TITLE);
    let title = leafText.find((el) => compact(el.textContent) === targetKey) || null;
    if (!title) {
      const desc = Array.from(card.querySelectorAll('*')).find((el) => {
        const key = compact(el.textContent);
        if (key !== TARGET_KEY && key !== SOURCE_KEY) return false;
        return !Array.from(el.children).some((child) => compact(child.textContent) === key);
      });
      if (desc) {
        const ordered = Array.from(card.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,div'));
        const descIndex = ordered.indexOf(desc);
        for (let index = descIndex - 1; index >= 0; index -= 1) {
          const el = ordered[index];
          const text = normalize(el.textContent);
          if (!text || text.length > 80 || /^[0-9]+$/.test(text) || /^[↗→←•·]+$/.test(text)) continue;
          if (Array.from(el.children).some((child) => normalize(child.textContent) === text)) continue;
          title = el;
          break;
        }
      }
    }
    if (!title) {
      title = leafText.find((el) => /construction|supervision|management|guidance|permit/i.test(normalize(el.textContent))) || leafText[0] || null;
    }
    if (title) {
      // The phone copy can carry a second title line (an extra leaf with the same original text); once
      // the primary title is located, convert every other leaf inside this card that still holds that
      // original text so no stale copy is left behind on mobile.
      const originalTitle = normalize(title.textContent);
      if (originalTitle !== TARGET_TITLE) title.textContent = TARGET_TITLE;
      title.style.setProperty('white-space', 'normal', 'important');
      title.style.setProperty('overflow-wrap', 'normal', 'important');
      if (originalTitle && originalTitle !== TARGET_TITLE) {
        card.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,div').forEach((el) => {
          if (el === title) return;
          if (normalize(el.textContent) !== originalTitle) return;
          if (Array.from(el.children).some((child) => normalize(child.textContent) === originalTitle)) return;
          el.textContent = TARGET_TITLE;
          el.style.setProperty('white-space', 'normal', 'important');
          el.style.setProperty('overflow-wrap', 'normal', 'important');
        });
      }
    }
  }

  function swapThumbnail(card) {
    const img = card.querySelector('img');
    if (img) {
      if (img.getAttribute('src') !== THUMBNAIL) img.setAttribute('src', THUMBNAIL);
      if (img.hasAttribute('srcset')) img.removeAttribute('srcset');
      if (img.hasAttribute('sizes')) img.removeAttribute('sizes');
      img.style.setProperty('object-fit', 'cover', 'important');
      img.style.setProperty('object-position', 'center', 'important');
      const picture = img.closest('picture');
      if (picture) picture.querySelectorAll('source').forEach((source) => {
        if (source.getAttribute('srcset') !== THUMBNAIL) source.setAttribute('srcset', THUMBNAIL);
        if (source.hasAttribute('sizes')) source.removeAttribute('sizes');
      });
    }
  }

  function patchCard(card) {
    replaceDescription(card);
    replaceTitle(card);
    swapThumbnail(card);
    card.style.removeProperty('display');
    card.style.setProperty('cursor', 'pointer', 'important');
    card.setAttribute('data-nguyen-builders-complete', 'true');
    card.setAttribute('data-nguyen-link', TARGET_URL);
    card.setAttribute('data-nguyen-card-url', TARGET_URL);
  }

  function patch() {
    const cards = findCards();
    cards.forEach(patchCard);
    return cards.length > 0;
  }

  if (!window.__nguyenBuildersCompleteRouting) {
    window.__nguyenBuildersCompleteRouting = true;
    document.addEventListener('click', (event) => {
      const start = event.target && event.target.nodeType === Node.TEXT_NODE ? event.target.parentElement : event.target;
      const card = start && start.closest ? start.closest('[data-nguyen-builders-complete="true"]') : null;
      if (!card) return;
      event.preventDefault();
      event.stopPropagation();
      if (event.stopImmediatePropagation) event.stopImmediatePropagation();
      window.location.href = TARGET_URL;
    }, true);
  }

  patch();
  window.addEventListener('load', patch, { once: true });
  [200, 600, 1200, 2500, 5000, 8000, 12500, 20500, 40500, 60500].forEach((delay) => setTimeout(patch, delay));

  let timer;
  const observer = new MutationObserver(() => {
    clearTimeout(timer);
    timer = setTimeout(patch, 120);
  });
  if (document.body) observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  setTimeout(() => { patch(); observer.disconnect(); }, 61000);
})();
</script>`;
