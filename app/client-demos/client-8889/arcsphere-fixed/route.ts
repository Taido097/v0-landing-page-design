import { GET as getBaseConcept } from "../arcsphere/route"

const PROCESS_HTML_REPLACEMENTS: Array<[RegExp, string]> = [
  [/DISCOVERY/gi, 'CONSULTATION'],
  [/EXISTING-CONDITION SURVEY & PROJECT PLANNING/gi, 'SITE ANALYSIS & FEASIBILITY'],
  [/ARCHITECTURE & ENGINEERING/gi, 'CONCEPT DESIGN'],
  [/EXECUTION/gi, 'DESIGN & ENGINEERING'],
  [/We Begin With Existing Conditions, Business Needs, Zoning, Occupancy And Local Requirements\.?/gi, 'We discuss your goals, project scope, budget, timeline, and requirements.'],
  [/Our Team Develops Layouts, Ideas, And Creative Design Directions\.?/gi, 'We review the site, zoning, codes, constraints, existing conditions, and project feasibility.'],
  [/Detailed Drawings, Materials, And Spatial Specifications Are Finalized\.?/gi, 'We develop the initial layout, massing, design direction, and key project concepts.'],
  [/We Guide Implementation To Ensure The Final Result Reflects The Original Design Vision\.?/gi, 'We coordinate architectural and engineering drawings into a complete permit-ready design.'],
]

const EXTRA_PROCESS_PATCH = `
<script id="nguyen-process-extra-cards">
(() => {
  const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();
  const compact = (value) => normalize(value).replace(/\\s+/g, '').toLowerCase();

  function smallestExact(root, value) {
    const key = compact(value);
    return [root, ...root.querySelectorAll('*')]
      .filter((node) => compact(node.textContent) === key)
      .sort((a, b) => a.querySelectorAll('*').length - b.querySelectorAll('*').length)[0] || null;
  }

  function setText(root, from, to) {
    const node = smallestExact(root, from);
    if (!node) return false;
    node.textContent = to;
    node.style.setProperty('white-space', 'normal', 'important');
    node.style.setProperty('word-break', 'normal', 'important');
    node.style.setProperty('overflow-wrap', 'normal', 'important');
    return true;
  }

  function findFourthCard() {
    const titleNodes = Array.from(document.querySelectorAll('body *'))
      .filter((node) => compact(node.textContent) === compact('DESIGN & ENGINEERING'))
      .sort((a, b) => a.querySelectorAll('*').length - b.querySelectorAll('*').length);
    const title = titleNodes[0];
    if (!title) return null;
    let card = title;
    for (let depth = 0; card && depth < 10; depth += 1, card = card.parentElement) {
      const text = compact(card.textContent);
      if (text.includes(compact('We coordinate architectural and engineering drawings into a complete permit-ready design.')) && card.querySelector('img')) return card;
    }
    return null;
  }

  function makeClone(template, number, title, description) {
    const clone = template.cloneNode(true);
    clone.removeAttribute('id');
    clone.querySelectorAll('[id]').forEach((node) => node.removeAttribute('id'));
    clone.setAttribute('data-nguyen-process-extra', number);
    setText(clone, 'DESIGN & ENGINEERING', title);
    setText(clone, 'We coordinate architectural and engineering drawings into a complete permit-ready design.', description);
    return clone;
  }

  let attempts = 0;
  function apply() {
    attempts += 1;
    const fourth = findFourthCard();
    if (!fourth) {
      if (attempts < 10) window.setTimeout(apply, 300);
      return;
    }
    const parent = fourth.parentElement;
    if (!parent) return;
    if (!parent.querySelector(':scope > [data-nguyen-process-extra="5"]')) {
      parent.appendChild(makeClone(fourth, '5', 'PERMIT SUBMITTAL', 'We prepare and submit the permit package to the appropriate city or agency.'));
    }
    if (!parent.querySelector(':scope > [data-nguyen-process-extra="6"]')) {
      parent.appendChild(makeClone(fourth, '6', 'PLAN CHECK & APPROVAL', 'We respond to plan-check comments and coordinate revisions through approval.'));
    }
  }

  apply();
  window.addEventListener('load', () => window.setTimeout(apply, 100), { once: true });
})();
</script>`

export async function GET() {
  const response = await getBaseConcept();
  if (!response.ok) return response;

  let html = await response.text();
  for (const [pattern, replacement] of PROCESS_HTML_REPLACEMENTS) {
    html = html.replace(pattern, replacement);
  }

  if (!html.includes('nguyen-process-extra-cards')) {
    html = html.replace('</body>', `${EXTRA_PROCESS_PATCH}</body>`);
  }

  const headers = new Headers(response.headers);
  headers.set('Content-Type', 'text/html; charset=utf-8');
  headers.set('Cache-Control', 'no-store');
  return new Response(html, { status: response.status, headers });
}
