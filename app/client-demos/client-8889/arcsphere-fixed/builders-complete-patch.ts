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

  function findCards() {
    const cards = [];
    const candidates = Array.from(document.querySelectorAll('*'));
    for (const candidate of candidates) {
      const key = compact(candidate.textContent);
      if (key !== SOURCE_KEY && key !== TARGET_KEY) continue;
      let picked = null;
      let node = candidate;
      for (let depth = 0; node && depth < 9; depth += 1, node = node.parentElement) {
        if (node === document.body || node === document.documentElement) break;
        const text = compact(node.textContent);
        if (!text.includes(SOURCE_KEY) && !text.includes(TARGET_KEY)) continue;
        const imageCount = node.querySelectorAll?.('img').length || 0;
        if (imageCount > 2) break;
        picked = node;
        if (imageCount === 1) break;
      }
      if (picked && !cards.includes(picked)) cards.push(picked);
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
      title.textContent = TARGET_TITLE;
      title.style.setProperty('white-space', 'normal', 'important');
      title.style.setProperty('overflow-wrap', 'normal', 'important');
    }
  }

  function swapThumbnail(card) {
    const img = card.querySelector('img');
    if (img) {
      img.setAttribute('src', THUMBNAIL);
      img.removeAttribute('srcset');
      img.removeAttribute('sizes');
      img.style.setProperty('object-fit', 'cover', 'important');
      img.style.setProperty('object-position', 'center', 'important');
      const picture = img.closest('picture');
      if (picture) picture.querySelectorAll('source').forEach((source) => {
        source.setAttribute('srcset', THUMBNAIL);
        source.removeAttribute('sizes');
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
  if (document.body) observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['style', 'src', 'srcset'] });
  setTimeout(() => { patch(); observer.disconnect(); }, 61000);
})();
</script>`;
