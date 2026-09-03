export const TESTIMONIAL_PATCH = `
<style id="nguyen-client-testimonial-style">
  #nguyen-client-testimonial {
    --ng-bg: #eee9e2;
    --ng-panel: #f4efe8;
    --ng-ink: #514b46;
    --ng-dark: #26221f;
    --ng-muted: #5f5954;
    --ng-line: rgba(76, 66, 58, 0.16);
    --ng-accent: #9c7047;
    width: 100%;
    margin: 0;
    padding: clamp(72px, 9vw, 126px) 24px clamp(76px, 9vw, 126px);
    background: var(--ng-bg);
    color: var(--ng-dark);
    box-sizing: border-box;
  }
  #nguyen-client-testimonial * { box-sizing: border-box; }

  #nguyen-client-testimonial .ng-section-heading {
    max-width: 920px;
    margin: 0 auto clamp(46px, 6vw, 78px);
    text-align: center;
  }
  #nguyen-client-testimonial .ng-section-heading h2 {
    margin: 0;
    color: var(--ng-ink);
    font-family: var(--nguyen-body-font, Arial, Helvetica, sans-serif);
    font-size: clamp(34px, 4.7vw, 52px);
    font-weight: 500;
    line-height: 1.04;
    letter-spacing: -0.045em;
    text-transform: uppercase;
  }
  #nguyen-client-testimonial .ng-section-heading p {
    max-width: 620px;
    margin: 22px auto 0;
    color: var(--ng-muted);
    font-family: var(--nguyen-body-font, Arial, Helvetica, sans-serif);
    font-size: clamp(14px, 1.55vw, 19px);
    font-weight: 400;
    line-height: 1.45;
    letter-spacing: -0.025em;
    text-transform: uppercase;
  }

  #nguyen-client-testimonial .ng-testimonial-card {
    width: min(1180px, 100%);
    margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(300px, .78fr) minmax(0, 1.22fr);
    overflow: hidden;
    background: var(--ng-panel);
    border: 1px solid var(--ng-line);
    border-radius: 8px;
    box-shadow: 0 18px 50px rgba(50, 39, 31, .035);
  }
  #nguyen-client-testimonial .ng-testimonial-media {
    min-height: 570px;
    background-image: linear-gradient(180deg, rgba(25,18,12,.02), rgba(25,18,12,.10)), url('https://raw.githubusercontent.com/Taido097/v0-landing-page-design/main/public/client-8889/serenity-villa/dining.webp');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  #nguyen-client-testimonial .ng-testimonial-content {
    min-width: 0;
    padding: clamp(36px,5vw,72px) clamp(28px,5vw,68px) 0;
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
    color: var(--ng-dark);
    font-family: var(--nguyen-display-font, Georgia, 'Times New Roman', serif);
    font-size: clamp(31px,3.3vw,48px);
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
    opacity: .9;
  }
  #nguyen-client-testimonial .ng-quote-open { left: 0; top: -4px; }
  #nguyen-client-testimonial .ng-quote-close { right: 0; bottom: -13px; }
  #nguyen-client-testimonial .ng-quote p {
    max-width: 560px;
    margin: 0;
    color: var(--ng-muted);
    font-family: var(--nguyen-body-font, Arial, Helvetica, sans-serif);
    font-size: clamp(14px,1.35vw,17px);
    font-weight: 400;
    line-height: 1.58;
  }
  #nguyen-client-testimonial .ng-quote strong {
    color: var(--ng-dark);
    font-weight: 500;
    letter-spacing: .01em;
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
    letter-spacing: .03em;
  }
  #nguyen-client-testimonial .ng-client-art-wrap {
    margin: auto calc(clamp(28px,5vw,68px) * -1) 0;
    min-height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-top: 1px solid var(--ng-line);
    background: var(--ng-panel);
  }
  #nguyen-client-testimonial .ng-client-art {
    display: block;
    width: 100%;
    height: auto;
    max-height: 350px;
    object-fit: cover;
    object-position: center;
    mix-blend-mode: multiply;
  }

  #nguyen-client-testimonial .ng-reveal {
    opacity: 0;
    transform: translateY(26px);
    transition: opacity .8s cubic-bezier(.22,.61,.36,1), transform .8s cubic-bezier(.22,.61,.36,1);
    will-change: opacity, transform;
  }
  #nguyen-client-testimonial .ng-reveal.ng-visible {
    opacity: 1;
    transform: translateY(0);
  }
  #nguyen-client-testimonial .ng-testimonial-media.ng-reveal {
    transform: translateY(0) scale(1.025);
  }
  #nguyen-client-testimonial .ng-testimonial-media.ng-reveal.ng-visible {
    transform: translateY(0) scale(1);
  }
  #nguyen-client-testimonial .ng-client-art-wrap.ng-reveal {
    transform: translateY(14px);
    transition-delay: 140ms;
  }
  #nguyen-client-testimonial .ng-client-art-wrap.ng-reveal.ng-visible {
    transform: translateY(0);
  }

  @media (prefers-reduced-motion: reduce) {
    #nguyen-client-testimonial .ng-reveal {
      opacity: 1 !important;
      transform: none !important;
      transition: none !important;
    }
  }

  @media (max-width: 809.98px) {
    #nguyen-client-testimonial { padding: 62px 14px 72px; }
    #nguyen-client-testimonial .ng-section-heading { margin-bottom: 40px; padding: 0 12px; }
    #nguyen-client-testimonial .ng-section-heading h2 { font-size: clamp(34px, 10.6vw, 48px); }
    #nguyen-client-testimonial .ng-section-heading p { max-width: 500px; margin-top: 17px; font-size: 15px; }
    #nguyen-client-testimonial .ng-testimonial-card { width: min(100%,680px); grid-template-columns: 1fr; border-radius: 6px; }
    #nguyen-client-testimonial .ng-testimonial-media { min-height: 320px; aspect-ratio: 4 / 3; background-position: center 58%; }
    #nguyen-client-testimonial .ng-testimonial-content { padding: 34px 24px 0; }
    #nguyen-client-testimonial .ng-testimonial-title { font-size: clamp(30px,9vw,42px); }
    #nguyen-client-testimonial .ng-quote { margin-top: 22px; padding: 0 18px; }
    #nguyen-client-testimonial .ng-client-art-wrap { margin-left: -24px; margin-right: -24px; min-height: 220px; }
    #nguyen-client-testimonial .ng-client-art { max-height: none; }
  }
  @media (max-width: 480px) {
    #nguyen-client-testimonial .ng-section-heading h2 { font-size: 35px; }
    #nguyen-client-testimonial .ng-section-heading p { font-size: 13px; line-height: 1.5; }
    #nguyen-client-testimonial .ng-testimonial-media { min-height: 270px; }
    #nguyen-client-testimonial .ng-client-art-wrap { min-height: 190px; }
  }
</style>
<script id="nguyen-client-testimonial-patch">
(() => {
  const SECTION_ID = 'nguyen-client-testimonial';
  const LOGO_ASSET = '/client-8889/testimonial-client-logos.svg';
  const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();

  function copySiteTypography() {
    const bodyHeading = Array.from(document.querySelectorAll('h1,h2')).find((el) => !el.closest('#' + SECTION_ID));
    const bodyCopy = Array.from(document.querySelectorAll('p')).find((el) => !el.closest('#' + SECTION_ID));
    const root = document.documentElement;
    if (bodyHeading) root.style.setProperty('--nguyen-display-font', window.getComputedStyle(bodyHeading).fontFamily);
    if (bodyCopy) root.style.setProperty('--nguyen-body-font', window.getComputedStyle(bodyCopy).fontFamily);
  }

  function createSection() {
    const section = document.createElement('section');
    section.id = SECTION_ID;
    section.setAttribute('aria-label', 'What our clients say');
    section.innerHTML = [
      '<div class="ng-section-heading ng-reveal">',
        '<h2>WHAT OUR CLIENTS SAY</h2>',
        '<p>REAL EXPERIENCES FROM CLIENTS WHO TRUSTED US<br class="ng-desktop-break"> WITH THEIR SPACES.</p>',
      '</div>',
      '<div class="ng-testimonial-card">',
        '<div class="ng-testimonial-media ng-reveal" role="img" aria-label="Warm hospitality interior"></div>',
        '<div class="ng-testimonial-content ng-reveal">',
          '<div class="ng-stars" aria-label="5 out of 5 stars">★★★★★</div>',
          '<h3 class="ng-testimonial-title">Game-Changing Experience</h3>',
          '<blockquote class="ng-quote">',
            '<span class="ng-quote-mark ng-quote-open" aria-hidden="true">“</span>',
            '<p><strong>NGUYEN ARCHITECTURE &amp; ENGINEERING</strong> delivered exceptional service, great communication, and a final result that exceeded our expectations.</p>',
            '<span class="ng-quote-mark ng-quote-close" aria-hidden="true">”</span>',
          '</blockquote>',
          '<div class="ng-divider" aria-hidden="true"></div>',
          '<p class="ng-caption">Client Testimonial</p>',
          '<div class="ng-client-art-wrap ng-reveal" aria-label="Selected clients">',
            '<img class="ng-client-art" alt="Boba &amp; Brew, The Loop Nail Bar, Phoenix Restaurant, Sage Coffee Co., Urban Cutz Barbershop, Luxe Boutique, Crumbl Cookies, Vitality Wellness, and District Eatery">',
          '</div>',
        '</div>',
      '</div>'
    ].join('');
    return section;
  }

  function hydrateClientLogo(section) {
    const image = section.querySelector('.ng-client-art');
    if (!image || image.dataset.loaded === 'true' || image.dataset.loading === 'true') return;
    image.dataset.loading = 'true';
    fetch(LOGO_ASSET, { cache: 'force-cache' })
      .then((response) => {
        if (!response.ok) throw new Error('Client logo asset failed to load');
        return response.text();
      })
      .then((source) => {
        const match = source.match(/href="(data:image\\/webp;base64,[^"]+)"/i);
        if (!match) throw new Error('Embedded client logo image was not found');
        image.src = match[1];
        image.dataset.loaded = 'true';
        delete image.dataset.loading;
      })
      .catch(() => {
        delete image.dataset.loading;
      });
  }

  function setupAnimations(section) {
    const items = Array.from(section.querySelectorAll('.ng-reveal'));
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach((item) => item.classList.add('ng-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('ng-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });
    items.forEach((item) => observer.observe(item));
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
      .sort((a,b) => b.score - a.score || a.length - b.length);
    return scored.length ? scored[0].element : null;
  }

  function findInsertionPoint() {
    const footer = document.querySelector('footer');
    if (footer) return { parent: footer.parentElement, before: footer };
    const headings = Array.from(document.querySelectorAll('h1,h2,h3,h4,p,span'));
    const about = headings.find((node) => normalize(node.textContent).toLowerCase() === 'about nguyen');
    if (about) {
      const section = about.closest('section') || about.closest('[data-framer-name]') || about.parentElement;
      if (section && section.parentElement) return { parent: section.parentElement, before: section };
    }
    const main = document.querySelector('main') || document.getElementById('main') || document.body;
    return { parent: main, before: null };
  }

  function install() {
    if (!document.body) return false;
    const existingInstalled = document.getElementById(SECTION_ID);
    if (existingInstalled) {
      copySiteTypography();
      hydrateClientLogo(existingInstalled);
      setupAnimations(existingInstalled);
      return true;
    }
    copySiteTypography();
    const section = createSection();
    const existing = findExistingTestimonial();
    if (existing && existing.parentElement) existing.replaceWith(section);
    else {
      const point = findInsertionPoint();
      if (!point.parent) return false;
      if (point.before) point.parent.insertBefore(section, point.before);
      else point.parent.appendChild(section);
    }
    hydrateClientLogo(section);
    setupAnimations(section);
    return true;
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install, { once: true });
  else install();
  window.addEventListener('load', install, { once: true });
  [250,800,1800,3500].forEach((delay) => setTimeout(install, delay));
})();
</script>`;
