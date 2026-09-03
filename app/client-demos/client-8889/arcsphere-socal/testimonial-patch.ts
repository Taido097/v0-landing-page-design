export const TESTIMONIAL_PATCH = `
<style id="nguyen-client-testimonial-style">
  #nguyen-client-testimonial {
    --ng-bg: #eee7de;
    --ng-panel: #f3ede5;
    --ng-ink: #211f1c;
    --ng-muted: #5c554e;
    --ng-line: rgba(55, 46, 38, 0.16);
    --ng-accent: #9b7047;
    width: min(1180px, calc(100% - 48px));
    margin: clamp(64px, 8vw, 112px) auto;
    display: grid;
    grid-template-columns: minmax(300px, 0.78fr) minmax(0, 1.22fr);
    overflow: hidden;
    background: var(--ng-panel);
    border: 1px solid var(--ng-line);
    border-radius: 8px;
    color: var(--ng-ink);
    box-sizing: border-box;
  }

  #nguyen-client-testimonial * { box-sizing: border-box; }

  #nguyen-client-testimonial .ng-testimonial-media {
    min-height: 570px;
    background-image:
      linear-gradient(180deg, rgba(25, 18, 12, 0.03), rgba(25, 18, 12, 0.12)),
      url('/client-8889/serenity-villa/dining.webp');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  #nguyen-client-testimonial .ng-testimonial-content {
    min-width: 0;
    padding: clamp(36px, 5vw, 72px) clamp(28px, 5vw, 68px) 0;
    display: flex;
    flex-direction: column;
    background: var(--ng-panel);
  }

  #nguyen-client-testimonial .ng-stars {
    margin: 0 0 18px;
    color: var(--ng-accent);
    font-family: Arial, sans-serif;
    font-size: 13px;
    line-height: 1;
    letter-spacing: 4px;
  }

  #nguyen-client-testimonial .ng-testimonial-title {
    margin: 0;
    color: var(--ng-ink);
    font-family: var(--nguyen-display-font, Georgia, 'Times New Roman', serif);
    font-size: clamp(31px, 3.3vw, 48px);
    font-weight: 400;
    line-height: 1.05;
    letter-spacing: -0.025em;
  }

  #nguyen-client-testimonial .ng-quote {
    position: relative;
    margin: 24px 0 26px;
    padding: 0 24px;
  }

  #nguyen-client-testimonial .ng-quote-mark {
    position: absolute;
    color: var(--ng-accent);
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 40px;
    line-height: 1;
    opacity: 0.9;
  }

  #nguyen-client-testimonial .ng-quote-open { left: 0; top: -4px; }
  #nguyen-client-testimonial .ng-quote-close { right: 0; bottom: -13px; }

  #nguyen-client-testimonial .ng-quote p {
    max-width: 560px;
    margin: 0;
    color: var(--ng-muted);
    font-family: var(--nguyen-body-font, Arial, Helvetica, sans-serif);
    font-size: clamp(14px, 1.35vw, 17px);
    font-weight: 400;
    line-height: 1.58;
  }

  #nguyen-client-testimonial .ng-quote strong {
    color: var(--ng-ink);
    font-weight: 500;
    letter-spacing: 0.01em;
  }

  #nguyen-client-testimonial .ng-divider {
    width: 100%;
    height: 1px;
    margin: 0 0 16px;
    background: var(--ng-line);
  }

  #nguyen-client-testimonial .ng-caption {
    margin: 0 0 18px;
    color: var(--ng-muted);
    font-family: var(--nguyen-body-font, Arial, Helvetica, sans-serif);
    font-size: 10px;
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: 0.03em;
  }

  #nguyen-client-testimonial .ng-client-grid {
    margin: auto calc(clamp(28px, 5vw, 68px) * -1) 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-top: 1px solid var(--ng-line);
  }

  #nguyen-client-testimonial .ng-client {
    min-height: 92px;
    padding: 14px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-right: 1px solid var(--ng-line);
    border-bottom: 1px solid var(--ng-line);
    color: var(--ng-ink);
    font-family: var(--nguyen-body-font, Arial, Helvetica, sans-serif);
  }

  #nguyen-client-testimonial .ng-client:nth-child(3n) { border-right: 0; }
  #nguyen-client-testimonial .ng-client:nth-last-child(-n + 3) { border-bottom: 0; }

  #nguyen-client-testimonial .ng-wordmark {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    line-height: 1;
  }

  #nguyen-client-testimonial .ng-wordmark b {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
  }

  #nguyen-client-testimonial .ng-wordmark small {
    font-size: 6px;
    font-weight: 500;
    letter-spacing: 0.13em;
    opacity: 0.75;
  }

  #nguyen-client-testimonial .ng-wordmark.serif b {
    font-family: var(--nguyen-display-font, Georgia, 'Times New Roman', serif);
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0.03em;
  }

  #nguyen-client-testimonial .ng-wordmark.script b {
    font-family: var(--nguyen-display-font, Georgia, 'Times New Roman', serif);
    font-size: 16px;
    font-style: italic;
    font-weight: 400;
    letter-spacing: -0.02em;
  }

  #nguyen-client-testimonial .ng-mark {
    margin-bottom: 3px;
    color: var(--ng-accent);
    font-family: Georgia, serif;
    font-size: 15px;
    line-height: 1;
  }

  @media (max-width: 809.98px) {
    #nguyen-client-testimonial {
      width: min(100% - 28px, 680px);
      margin: 56px auto;
      grid-template-columns: 1fr;
      border-radius: 6px;
    }

    #nguyen-client-testimonial .ng-testimonial-media {
      min-height: 320px;
      aspect-ratio: 4 / 3;
      background-position: center 58%;
    }

    #nguyen-client-testimonial .ng-testimonial-content {
      padding: 34px 24px 0;
    }

    #nguyen-client-testimonial .ng-testimonial-title {
      font-size: clamp(30px, 9vw, 42px);
    }

    #nguyen-client-testimonial .ng-quote {
      margin-top: 22px;
      padding: 0 18px;
    }

    #nguyen-client-testimonial .ng-client-grid {
      margin-left: -24px;
      margin-right: -24px;
      grid-template-columns: repeat(3, 1fr);
    }

    #nguyen-client-testimonial .ng-client {
      min-height: 82px;
      padding: 10px 6px;
    }

    #nguyen-client-testimonial .ng-wordmark b { font-size: 9px; }
    #nguyen-client-testimonial .ng-wordmark.serif b,
    #nguyen-client-testimonial .ng-wordmark.script b { font-size: 13px; }
  }

  @media (max-width: 480px) {
    #nguyen-client-testimonial .ng-testimonial-media { min-height: 270px; }
    #nguyen-client-testimonial .ng-client { min-height: 76px; }
  }
</style>
<script id="nguyen-client-testimonial-patch">
(() => {
  const SECTION_ID = 'nguyen-client-testimonial';
  const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();

  function copySiteTypography() {
    const display = document.querySelector('h1, h2');
    const body = document.querySelector('p');
    const root = document.documentElement;
    if (display) root.style.setProperty('--nguyen-display-font', window.getComputedStyle(display).fontFamily);
    if (body) root.style.setProperty('--nguyen-body-font', window.getComputedStyle(body).fontFamily);
  }

  function createSection() {
    const section = document.createElement('section');
    section.id = SECTION_ID;
    section.setAttribute('aria-label', 'Client testimonial and selected clients');
    section.innerHTML = [
      '<div class="ng-testimonial-media" role="img" aria-label="Warm hospitality interior"></div>',
      '<div class="ng-testimonial-content">',
        '<div class="ng-stars" aria-label="5 out of 5 stars">★★★★★</div>',
        '<h2 class="ng-testimonial-title">Game-Changing Experience</h2>',
        '<blockquote class="ng-quote">',
          '<span class="ng-quote-mark ng-quote-open" aria-hidden="true">“</span>',
          '<p><strong>NGUYEN ARCHITECTURE &amp; ENGINEERING</strong> delivered exceptional service, great communication, and a final result that exceeded our expectations.</p>',
          '<span class="ng-quote-mark ng-quote-close" aria-hidden="true">”</span>',
        '</blockquote>',
        '<div class="ng-divider" aria-hidden="true"></div>',
        '<p class="ng-caption">Client Testimonial</p>',
        '<div class="ng-client-grid" aria-label="Selected clients">',
          '<div class="ng-client"><span class="ng-wordmark"><span class="ng-mark">♟</span><b>BOBA &amp; BREW</b><small>TEA · COFFEE</small></span></div>',
          '<div class="ng-client"><span class="ng-wordmark"><b>THE LOOP</b><small>MALL · BAR</small></span></div>',
          '<div class="ng-client"><span class="ng-wordmark"><span class="ng-mark">✦</span><b>PHOENIX</b><small>RESTAURANT</small></span></div>',
          '<div class="ng-client"><span class="ng-wordmark"><span class="ng-mark">❧</span><b>SAGE</b><small>COFFEE CO.</small></span></div>',
          '<div class="ng-client"><span class="ng-wordmark"><b>URBAN CUTZ</b><small>BARBERSHOP</small></span></div>',
          '<div class="ng-client"><span class="ng-wordmark serif"><span class="ng-mark">◯</span><b>LUXE</b><small>BOUTIQUE</small></span></div>',
          '<div class="ng-client"><span class="ng-wordmark script"><b>Crumbl</b><small>COOKIES</small></span></div>',
          '<div class="ng-client"><span class="ng-wordmark"><span class="ng-mark">❧</span><b>VITALITY</b><small>WELLNESS</small></span></div>',
          '<div class="ng-client"><span class="ng-wordmark"><b>DISTRICT</b><small>EATERY</small></span></div>',
        '</div>',
      '</div>'
    ].join('');
    return section;
  }

  function scoreCandidate(element) {
    if (!element || element.id === SECTION_ID) return -1;
    const text = normalize(element.textContent).toLowerCase();
    if (!text || text.length > 2500) return -1;
    let score = 0;
    if (text.includes('testimonial')) score += 12;
    if (text.includes('client stories')) score += 10;
    if (text.includes('what our clients')) score += 10;
    if (text.includes('clients say')) score += 9;
    if (text.includes('trusted by')) score += 7;
    if (text.includes('our clients')) score += 7;
    if (text.includes('review')) score += 4;
    if (element.querySelector('blockquote')) score += 5;
    if ((text.match(/★/g) || []).length >= 3) score += 4;
    return score;
  }

  function findExistingTestimonial() {
    const candidates = Array.from(document.querySelectorAll('section, [data-framer-name], main > div, #main > div'));
    const scored = candidates
      .map((element) => ({ element, score: scoreCandidate(element), length: normalize(element.textContent).length }))
      .filter((item) => item.score >= 7)
      .sort((a, b) => b.score - a.score || a.length - b.length);
    return scored.length ? scored[0].element : null;
  }

  function findInsertionPoint() {
    const footer = document.querySelector('footer');
    if (footer) return { parent: footer.parentElement, before: footer };

    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, p, span'));
    const about = headings.find((node) => normalize(node.textContent).toLowerCase() === 'about nguyen');
    if (about) {
      const section = about.closest('section') || about.closest('[data-framer-name]') || about.parentElement;
      if (section && section.parentElement) return { parent: section.parentElement, before: section };
    }

    const main = document.querySelector('main') || document.getElementById('main') || document.body;
    return { parent: main, before: null };
  }

  function install() {
    if (!document.body || document.getElementById(SECTION_ID)) return true;
    copySiteTypography();
    const section = createSection();
    const existing = findExistingTestimonial();
    if (existing && existing.parentElement) {
      existing.replaceWith(section);
      return true;
    }

    const point = findInsertionPoint();
    if (!point.parent) return false;
    if (point.before) point.parent.insertBefore(section, point.before);
    else point.parent.appendChild(section);
    return true;
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install, { once: true });
  else install();
  window.addEventListener('load', install, { once: true });
  [250, 800, 1800, 3500].forEach((delay) => setTimeout(install, delay));
})();
</script>`;
