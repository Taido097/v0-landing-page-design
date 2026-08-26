import { GET as getBaseConcept } from "../arcsphere/route"

const PROCESS_PATCH = `
<script id="nguyen-process-safe-patch">
(() => {
  const steps = [
    { number: '01', tag: 'CONSULTATION', title: 'CONSULTATION', description: 'We discuss your goals, project scope, budget, timeline, and requirements.' },
    { number: '02', tag: 'SITE ANALYSIS', title: 'SITE ANALYSIS & FEASIBILITY', description: 'We review the site, zoning, codes, constraints, existing conditions, and project feasibility.' },
    { number: '03', tag: 'CONCEPT', title: 'CONCEPT DESIGN', description: 'We develop the initial layout, massing, design direction, and key project concepts.' },
    { number: '04', tag: 'DESIGN', title: 'DESIGN & ENGINEERING', description: 'We coordinate architectural and engineering drawings into a complete permit-ready design.' },
    { number: '05', tag: 'PERMIT', title: 'PERMIT SUBMITTAL', description: 'We prepare and submit the permit package to the appropriate city or agency.' },
    { number: '06', tag: 'APPROVAL', title: 'PLAN CHECK & APPROVAL', description: 'We respond to plan-check comments and coordinate revisions through approval.' }
  ];

  const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();
  const compact = (value) => normalize(value).replace(/\\s+/g, '').toLowerCase();
  const current = [
    { number: '01', tags: ['RESEARCH'], titles: ['Discovery'], descriptions: ['We begin with existing conditions, business needs, zoning, occupancy and local requirements.'] },
    { number: '02', tags: ['IDEATION'], titles: ['Existing-Condition Survey & Project Planning', 'Concept Development'], descriptions: ['Our team develops layouts, ideas, and creative design directions.'] },
    { number: '03', tags: ['MODELLING'], titles: ['Architecture & Engineering', 'Design Development'], descriptions: ['Detailed drawings, materials, and spatial specifications are finalized.'] },
    { number: '04', tags: ['DELIVERY'], titles: ['execution', 'Plan Check & Corrections', 'Implementation'], descriptions: ['We support building permit, plan check, corrections, consultants and city coordination through approval.', 'We guide implementation to ensure the final result reflects the original design vision.'] }
  ];

  function isLeafMatch(node, values) {
    if (!(node instanceof Element)) return false;
    const key = compact(node.textContent);
    if (!values.some((value) => compact(value) === key)) return false;
    return !Array.from(node.children).some((child) => compact(child.textContent) === key);
  }

  function findCard(number, knownTitles) {
    const numberNodes = Array.from(document.querySelectorAll('*')).filter((node) => isLeafMatch(node, [number]));
    for (const numberNode of numberNodes) {
      let card = numberNode;
      for (let depth = 0; card && depth < 9; depth += 1, card = card.parentElement) {
        if (!card.querySelector('img')) continue;
        const text = compact(card.textContent);
        if (!knownTitles.some((title) => text.includes(compact(title)))) continue;
        return card;
      }
    }
    return null;
  }

  function replaceLeaf(card, sources, replacement) {
    const nodes = [card, ...card.querySelectorAll('*')];
    for (const node of nodes) {
      if (!isLeafMatch(node, sources)) continue;
      if (normalize(node.textContent) !== replacement) node.textContent = replacement;
      node.style.setProperty('white-space', 'normal', 'important');
      node.style.setProperty('word-break', 'normal', 'important');
      node.style.setProperty('overflow-wrap', 'normal', 'important');
      return true;
    }
    return false;
  }

  function patchCard(card, source, step) {
    card.setAttribute('data-nguyen-process-step', step.number);
    replaceLeaf(card, [source.number, step.number], step.number);
    replaceLeaf(card, [...source.tags, step.tag], step.tag);
    replaceLeaf(card, [...source.titles, step.title], step.title);
    replaceLeaf(card, [...source.descriptions, step.description], step.description);
  }

  function cloneFromFourth(fourthCard, step) {
    const clone = fourthCard.cloneNode(true);
    clone.removeAttribute('id');
    clone.querySelectorAll('[id]').forEach((node) => node.removeAttribute('id'));
    clone.querySelectorAll('[data-framer-name]').forEach((node) => {
      const name = node.getAttribute('data-framer-name');
      if (name) node.setAttribute('data-framer-name', name.replace(/04/g, step.number));
    });
    const source = {
      number: '04',
      tags: ['DELIVERY', 'DESIGN'],
      titles: ['execution', 'Plan Check & Corrections', 'Implementation', 'DESIGN & ENGINEERING'],
      descriptions: [
        'We support building permit, plan check, corrections, consultants and city coordination through approval.',
        'We guide implementation to ensure the final result reflects the original design vision.',
        'We coordinate architectural and engineering drawings into a complete permit-ready design.'
      ]
    };
    patchCard(clone, source, step);
    return clone;
  }

  function applyProcess() {
    const found = [];
    for (let i = 0; i < 4; i += 1) {
      const source = current[i];
      const step = steps[i];
      const existing = document.querySelector('[data-nguyen-process-step="' + step.number + '"]');
      const card = existing || findCard(source.number, [...source.titles, step.title]);
      if (!card) return false;
      patchCard(card, source, step);
      found.push(card);
    }

    const fourth = found[3];
    const parent = fourth.parentElement;
    if (!parent) return false;

    for (const step of steps.slice(4)) {
      let card = parent.querySelector(':scope > [data-nguyen-process-step="' + step.number + '"]');
      if (!card) {
        card = cloneFromFourth(fourth, step);
        parent.appendChild(card);
      }
    }
    return true;
  }

  let attempts = 0;
  function tryApply() {
    attempts += 1;
    if (applyProcess() || attempts >= 4) return;
    window.setTimeout(tryApply, 350);
  }

  tryApply();
  window.addEventListener('load', () => window.setTimeout(tryApply, 100), { once: true });
})();
</script>`;

export async function GET() {
  const response = await getBaseConcept();
  if (!response.ok) return response;

  const html = await response.text();
  const patched = html.includes('nguyen-process-safe-patch')
    ? html
    : html.replace('</body>', `${PROCESS_PATCH}</body>`);

  const headers = new Headers(response.headers);
  headers.set('Content-Type', 'text/html; charset=utf-8');
  headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  return new Response(patched, { status: response.status, headers });
}
