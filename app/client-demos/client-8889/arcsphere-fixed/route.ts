import { GET as getBaseConcept } from "../arcsphere/route"

const PROCESS_PATCH = `
<script id="nguyen-process-safe-patch">
(() => {
  const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();
  const compact = (value) => normalize(value).replace(/\\s+/g, '').toLowerCase();

  // Framer-safe method: compare flattened visible text, then replace the
  // smallest matching wrapper so split spans cannot block the change.
  function replaceFlattened(sources, replacement) {
    const keys = sources.map(compact);
    const candidates = Array.from(document.querySelectorAll('body *'))
      .filter((node) => {
        const text = compact(node.textContent);
        return keys.some((key) => text === key);
      })
      .sort((a, b) => a.querySelectorAll('*').length - b.querySelectorAll('*').length);

    const node = candidates[0];
    if (!node) return null;
    node.textContent = replacement;
    node.style.setProperty('white-space', 'normal', 'important');
    node.style.setProperty('word-break', 'normal', 'important');
    node.style.setProperty('overflow-wrap', 'normal', 'important');
    return node;
  }

  function nearestProcessCard(node, numberSources, titleSources) {
    if (!node) return null;
    const numberKeys = numberSources.map(compact);
    const titleKeys = titleSources.map(compact);
    let cursor = node;
    for (let depth = 0; cursor && depth < 10; depth += 1, cursor = cursor.parentElement) {
      const text = compact(cursor.textContent);
      if (numberKeys.some((key) => text.includes(key)) && titleKeys.some((key) => text.includes(key))) return cursor;
    }
    return null;
  }

  function patchExistingCard(spec) {
    const titleNode = replaceFlattened(spec.oldTitles.concat(spec.title), spec.title);
    replaceFlattened(spec.oldTags.concat(spec.tag), spec.tag);
    replaceFlattened(spec.oldDescriptions.concat(spec.description), spec.description);

    const card = nearestProcessCard(titleNode, spec.oldNumbers.concat(spec.number), [spec.title]);
    if (!card) return null;
    card.setAttribute('data-nguyen-process-step', spec.number);

    // Number is changed only inside the identified card, using flattened text.
    const numberKeys = spec.oldNumbers.concat(spec.number).map(compact);
    const numberCandidates = [card, ...card.querySelectorAll('*')]
      .filter((node) => numberKeys.includes(compact(node.textContent)))
      .sort((a, b) => a.querySelectorAll('*').length - b.querySelectorAll('*').length);
    if (numberCandidates[0]) numberCandidates[0].textContent = spec.number;
    return card;
  }

  const specs = [
    {
      number: '1', oldNumbers: ['01', '1'],
      tag: 'CONSULTATION', oldTags: ['RESEARCH', 'CONSULTATION'],
      title: 'CONSULTATION', oldTitles: ['Discovery', 'CONSULTATION'],
      description: 'We discuss your goals, project scope, budget, timeline, and requirements.',
      oldDescriptions: ['We begin with existing conditions, business needs, zoning, occupancy and local requirements.']
    },
    {
      number: '2', oldNumbers: ['02', '2'],
      tag: 'SITE ANALYSIS', oldTags: ['IDEATION', 'SITE ANALYSIS'],
      title: 'SITE ANALYSIS & FEASIBILITY', oldTitles: ['Concept Development', 'Existing-Condition Survey & Project Planning', 'SITE ANALYSIS & FEASIBILITY'],
      description: 'We review the site, zoning, codes, constraints, existing conditions, and project feasibility.',
      oldDescriptions: ['Our team develops layouts, ideas, and creative design directions.']
    },
    {
      number: '3', oldNumbers: ['03', '3'],
      tag: 'CONCEPT', oldTags: ['MODELLING', 'CONCEPT'],
      title: 'CONCEPT DESIGN', oldTitles: ['Design Development', 'Architecture & Engineering', 'CONCEPT DESIGN'],
      description: 'We develop the initial layout, massing, design direction, and key project concepts.',
      oldDescriptions: ['Detailed drawings, materials, and spatial specifications are finalized.']
    },
    {
      number: '4', oldNumbers: ['04', '4'],
      tag: 'DESIGN', oldTags: ['DELIVERY', 'DESIGN'],
      title: 'DESIGN & ENGINEERING', oldTitles: ['Implementation', 'Plan Check & Corrections', 'execution', 'DESIGN & ENGINEERING'],
      description: 'We coordinate architectural and engineering drawings into a complete permit-ready design.',
      oldDescriptions: ['We support building permit, plan check, corrections, consultants and city coordination through approval.', 'We guide implementation to ensure the final result reflects the original design vision.']
    }
  ];

  const extraSteps = [
    { number: '5', tag: 'PERMIT', title: 'PERMIT SUBMITTAL', description: 'We prepare and submit the permit package to the appropriate city or agency.' },
    { number: '6', tag: 'APPROVAL', title: 'PLAN CHECK & APPROVAL', description: 'We respond to plan-check comments and coordinate revisions through approval.' }
  ];

  function replaceInside(card, sources, replacement) {
    const keys = sources.map(compact);
    const candidates = [card, ...card.querySelectorAll('*')]
      .filter((node) => keys.includes(compact(node.textContent)))
      .sort((a, b) => a.querySelectorAll('*').length - b.querySelectorAll('*').length);
    if (!candidates[0]) return false;
    candidates[0].textContent = replacement;
    candidates[0].style.setProperty('white-space', 'normal', 'important');
    return true;
  }

  function cloneFourth(fourth, step) {
    const clone = fourth.cloneNode(true);
    clone.removeAttribute('id');
    clone.querySelectorAll('[id]').forEach((node) => node.removeAttribute('id'));
    clone.setAttribute('data-nguyen-process-step', step.number);
    replaceInside(clone, ['4', '04'], step.number);
    replaceInside(clone, ['DESIGN'], step.tag);
    replaceInside(clone, ['DESIGN & ENGINEERING'], step.title);
    replaceInside(clone, ['We coordinate architectural and engineering drawings into a complete permit-ready design.'], step.description);
    return clone;
  }

  function apply() {
    if (document.documentElement.dataset.nguyenProcessApplied === '1') return true;
    const cards = specs.map(patchExistingCard);
    if (cards.some((card) => !card)) return false;

    const fourth = cards[3];
    const parent = fourth.parentElement;
    if (!parent) return false;

    extraSteps.forEach((step) => {
      if (parent.querySelector(':scope > [data-nguyen-process-step="' + step.number + '"]')) return;
      parent.appendChild(cloneFourth(fourth, step));
    });

    document.documentElement.dataset.nguyenProcessApplied = '1';
    return true;
  }

  let attempts = 0;
  const run = () => {
    attempts += 1;
    if (apply() || attempts >= 8) return;
    window.setTimeout(run, 300);
  };
  run();
  window.addEventListener('load', () => window.setTimeout(run, 100), { once: true });
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
  headers.set('Cache-Control', 'no-store');
  return new Response(patched, { status: response.status, headers });
}
