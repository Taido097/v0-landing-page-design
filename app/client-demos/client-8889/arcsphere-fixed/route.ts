import { GET as getBaseConcept } from "../arcsphere/route"

const PROCESS_PATCH = `
<script id="nguyen-process-visible-text-patch">
(() => {
  const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();
  const compact = (value) => normalize(value).replace(/\\s+/g, '').toLowerCase();

  const replacements = new Map([
    [compact('DISCOVERY'), 'CONSULTATION'],
    [compact('EXISTING-CONDITION SURVEY & PROJECT PLANNING'), 'SITE ANALYSIS & FEASIBILITY'],
    [compact('ARCHITECTURE & ENGINEERING'), 'CONCEPT DESIGN'],
    [compact('EXECUTION'), 'DESIGN & ENGINEERING'],
    [compact('PLAN CHECK & CORRECTIONS'), 'DESIGN & ENGINEERING'],
    [compact('We begin with existing conditions, business needs, zoning, occupancy and local requirements.'), 'We discuss your goals, project scope, budget, timeline, and requirements.'],
    [compact('Our team develops layouts, ideas, and creative design directions.'), 'We review the site, zoning, codes, constraints, existing conditions, and project feasibility.'],
    [compact('Detailed drawings, materials, and spatial specifications are finalized.'), 'We develop the initial layout, massing, design direction, and key project concepts.'],
    [compact('We guide implementation to ensure the final result reflects the original design vision.'), 'We coordinate architectural and engineering drawings into a complete permit-ready design.']
  ]);

  const finalTitles = ['CONSULTATION', 'SITE ANALYSIS & FEASIBILITY', 'CONCEPT DESIGN', 'DESIGN & ENGINEERING'];
  const finalDescriptions = [
    'We discuss your goals, project scope, budget, timeline, and requirements.',
    'We review the site, zoning, codes, constraints, existing conditions, and project feasibility.',
    'We develop the initial layout, massing, design direction, and key project concepts.',
    'We coordinate architectural and engineering drawings into a complete permit-ready design.'
  ];

  function smallestExact(root, value) {
    const key = compact(value);
    return [root, ...root.querySelectorAll('*')]
      .filter((node) => compact(node.textContent) === key)
      .sort((a, b) => a.querySelectorAll('*').length - b.querySelectorAll('*').length)[0] || null;
  }

  function flattenVisibleText() {
    const nodes = Array.from(document.querySelectorAll('body *'))
      .sort((a, b) => a.querySelectorAll('*').length - b.querySelectorAll('*').length);

    for (const node of nodes) {
      const replacement = replacements.get(compact(node.textContent));
      if (!replacement) continue;
      const sameChild = Array.from(node.children).some((child) => compact(child.textContent) === compact(node.textContent));
      if (sameChild) continue;
      node.textContent = replacement;
      node.style.setProperty('white-space', 'normal', 'important');
      node.style.setProperty('word-break', 'normal', 'important');
      node.style.setProperty('overflow-wrap', 'normal', 'important');
    }
  }

  function findCard(title, description) {
    const titleNode = smallestExact(document.body, title);
    if (!titleNode) return null;
    let card = titleNode;
    for (let depth = 0; card && depth < 14; depth += 1, card = card.parentElement) {
      const text = compact(card.textContent);
      if (!text.includes(compact(title)) || !text.includes(compact(description))) continue;
      const parent = card.parentElement;
      if (!parent) return card;
      const parentText = compact(parent.textContent);
      const otherTitles = finalTitles.filter((other) => other !== title && parentText.includes(compact(other)));
      if (otherTitles.length) return card;
    }
    return null;
  }

  function setExact(root, from, to) {
    const node = smallestExact(root, from);
    if (!node) return false;
    node.textContent = to;
    node.style.setProperty('white-space', 'normal', 'important');
    node.style.setProperty('word-break', 'normal', 'important');
    node.style.setProperty('overflow-wrap', 'normal', 'important');
    return true;
  }

  function addExtraSteps() {
    if (document.querySelector('[data-nguyen-process-extra="5"]')) return;
    const fourth = findCard(finalTitles[3], finalDescriptions[3]);
    if (!fourth || !fourth.parentElement) return;
    const parent = fourth.parentElement;

    const fifth = fourth.cloneNode(true);
    fifth.removeAttribute('id');
    fifth.querySelectorAll('[id]').forEach((node) => node.removeAttribute('id'));
    fifth.setAttribute('data-nguyen-process-extra', '5');
    setExact(fifth, finalTitles[3], 'PERMIT SUBMITTAL');
    setExact(fifth, finalDescriptions[3], 'We prepare and submit the permit package to the appropriate city or agency.');

    const sixth = fourth.cloneNode(true);
    sixth.removeAttribute('id');
    sixth.querySelectorAll('[id]').forEach((node) => node.removeAttribute('id'));
    sixth.setAttribute('data-nguyen-process-extra', '6');
    setExact(sixth, finalTitles[3], 'PLAN CHECK & APPROVAL');
    setExact(sixth, finalDescriptions[3], 'We respond to plan-check comments and coordinate revisions through approval.');

    parent.appendChild(fifth);
    parent.appendChild(sixth);
  }

  function apply() {
    flattenVisibleText();
    addExtraSteps();
  }

  [0, 150, 400, 900, 1800, 3200, 5200, 7000].forEach((delay) => setTimeout(apply, delay));
})();
</script>`;

export async function GET() {
  const response = await getBaseConcept();
  if (!response.ok) return response;

  const html = await response.text();
  const patched = html.includes('nguyen-process-visible-text-patch')
    ? html
    : html.replace('</body>', `${PROCESS_PATCH}</body>`);

  const headers = new Headers(response.headers);
  headers.set('Content-Type', 'text/html; charset=utf-8');
  headers.set('Cache-Control', 'no-store');
  return new Response(patched, { status: response.status, headers });
}
