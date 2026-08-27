import { GET as getBaseConcept } from "../arcsphere/route"

const PROCESS_PATCH = `
<script id="nguyen-process-visible-text-patch">
(() => {
  const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();
  const compact = (value) => normalize(value).replace(/\\s+/g, '').toLowerCase();

  const steps = [
    {
      titles: ['DISCOVERY', 'CONSULTATION'],
      descriptions: [
        'We begin with existing conditions, business needs, zoning, occupancy and local requirements.',
        'We Begin With Existing Conditions, Business Needs, Zoning, Occupancy And Local Requirements.',
        'We discuss your goals, project scope, budget, timeline, and requirements.'
      ],
      title: 'CONSULTATION',
      description: 'We discuss your goals, project scope, budget, timeline, and requirements.'
    },
    {
      titles: ['EXISTING-CONDITION SURVEY & PROJECT PLANNING', 'SITE ANALYSIS & FEASIBILITY'],
      descriptions: [
        'Our team develops layouts, ideas, and creative design directions.',
        'Our Team Develops Layouts, Ideas, And Creative Design Directions.',
        'We review the site, zoning, codes, constraints, existing conditions, and project feasibility.'
      ],
      title: 'SITE ANALYSIS & FEASIBILITY',
      description: 'We review the site, zoning, codes, constraints, existing conditions, and project feasibility.'
    },
    {
      titles: ['ARCHITECTURE & ENGINEERING', 'CONCEPT DESIGN'],
      descriptions: [
        'Detailed drawings, materials, and spatial specifications are finalized.',
        'Detailed Drawings, Materials, And Spatial Specifications Are Finalized.',
        'We develop the initial layout, massing, design direction, and key project concepts.'
      ],
      title: 'CONCEPT DESIGN',
      description: 'We develop the initial layout, massing, design direction, and key project concepts.'
    },
    {
      titles: ['EXECUTION', 'PLAN CHECK & CORRECTIONS', 'DESIGN & ENGINEERING'],
      descriptions: [
        'We guide implementation to ensure the final result reflects the original design vision.',
        'We Guide Implementation To Ensure The Final Result Reflects The Original Design Vision.',
        'We support building permit, plan check, corrections, consultants and city coordination through approval.',
        'We coordinate architectural and engineering drawings into a complete permit-ready design.'
      ],
      title: 'DESIGN & ENGINEERING',
      description: 'We coordinate architectural and engineering drawings into a complete permit-ready design.'
    }
  ];

  const extraSteps = [
    { title: 'PERMIT SUBMITTAL', description: 'We prepare and submit the permit package to the appropriate city or agency.' },
    { title: 'PLAN CHECK & APPROVAL', description: 'We respond to plan-check comments and coordinate revisions through approval.' }
  ];

  function smallestExact(root, values) {
    const keys = values.map(compact);
    return [root, ...root.querySelectorAll('*')]
      .filter((node) => keys.includes(compact(node.textContent)))
      .sort((a, b) => a.querySelectorAll('*').length - b.querySelectorAll('*').length)[0] || null;
  }

  function setText(node, value) {
    if (!node) return false;
    if (normalize(node.textContent) !== value) node.textContent = value;
    node.style.setProperty('white-space', 'normal', 'important');
    node.style.setProperty('word-break', 'normal', 'important');
    node.style.setProperty('overflow-wrap', 'normal', 'important');
    return true;
  }

  function findCard(step) {
    const titleKeys = step.titles.map(compact);
    const descriptionKeys = step.descriptions.map(compact);
    const nodes = Array.from(document.querySelectorAll('body *'));
    const desc = nodes
      .filter((node) => descriptionKeys.includes(compact(node.textContent)))
      .sort((a, b) => a.querySelectorAll('*').length - b.querySelectorAll('*').length)[0];
    if (!desc) return null;

    let card = desc;
    for (let depth = 0; card && depth < 12; depth += 1, card = card.parentElement) {
      const text = compact(card.textContent);
      if (titleKeys.some((key) => text.includes(key)) && descriptionKeys.some((key) => text.includes(key))) return card;
    }
    return null;
  }

  function patchCard(card, step, index) {
    card.setAttribute('data-nguyen-process-step', String(index + 1));
    setText(smallestExact(card, step.titles), step.title);
    setText(smallestExact(card, step.descriptions), step.description);
  }

  function cloneStep(template, step, index) {
    const clone = template.cloneNode(true);
    clone.removeAttribute('id');
    clone.querySelectorAll('[id]').forEach((node) => node.removeAttribute('id'));
    clone.setAttribute('data-nguyen-process-step', String(index + 1));
    setText(smallestExact(clone, ['DESIGN & ENGINEERING']), step.title);
    setText(smallestExact(clone, ['We coordinate architectural and engineering drawings into a complete permit-ready design.']), step.description);
    return clone;
  }

  function applyProcess() {
    const cards = steps.map((step, index) => {
      const card = document.querySelector('[data-nguyen-process-step="' + (index + 1) + '"]') || findCard(step);
      if (card) patchCard(card, step, index);
      return card;
    });
    if (cards.some((card) => !card)) return false;

    const fourth = cards[3];
    const parent = fourth.parentElement;
    if (!parent) return false;

    extraSteps.forEach((step, offset) => {
      const index = offset + 4;
      if (!parent.querySelector(':scope > [data-nguyen-process-step="' + (index + 1) + '"]')) {
        parent.appendChild(cloneStep(fourth, step, index));
      }
    });
    return true;
  }

  let observer;
  let scheduled = false;
  function run() {
    scheduled = false;
    observer?.disconnect();
    applyProcess();
    observer?.observe(document.body, { childList: true, subtree: true, characterData: true });
  }
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(run);
  }
  function start() {
    observer = new MutationObserver(schedule);
    run();
    setTimeout(run, 250);
    setTimeout(run, 750);
    setTimeout(run, 1500);
    setTimeout(() => { observer?.disconnect(); applyProcess(); }, 4000);
  }

  if (document.body) start();
  else window.addEventListener('DOMContentLoaded', start, { once: true });
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
