import { GET as getBaseConcept } from "../arcsphere/route"

const PROCESS_PATCH = `
<script id="nguyen-process-safe-patch">
(() => {
  const steps = [
    { number: '1', tag: 'CONSULTATION', title: 'CONSULTATION', description: 'We discuss your goals, project scope, budget, timeline, and requirements.' },
    { number: '2', tag: 'SITE ANALYSIS', title: 'SITE ANALYSIS & FEASIBILITY', description: 'We review the site, zoning, codes, constraints, existing conditions, and project feasibility.' },
    { number: '3', tag: 'CONCEPT', title: 'CONCEPT DESIGN', description: 'We develop the initial layout, massing, design direction, and key project concepts.' },
    { number: '4', tag: 'DESIGN', title: 'DESIGN & ENGINEERING', description: 'We coordinate architectural and engineering drawings into a complete permit-ready design.' },
    { number: '5', tag: 'PERMIT', title: 'PERMIT SUBMITTAL', description: 'We prepare and submit the permit package to the appropriate city or agency.' },
    { number: '6', tag: 'APPROVAL', title: 'PLAN CHECK & APPROVAL', description: 'We respond to plan-check comments and coordinate revisions through approval.' }
  ];

  const originals = [
    { number: ['01', '1'], tags: ['RESEARCH', 'CONSULTATION'], titles: ['Discovery', 'CONSULTATION'], descriptions: ['We begin with existing conditions, business needs, zoning, occupancy and local requirements.', 'We discuss your goals, project scope, budget, timeline, and requirements.'] },
    { number: ['02', '2'], tags: ['IDEATION', 'SITE ANALYSIS'], titles: ['Existing-Condition Survey & Project Planning', 'Concept Development', 'SITE ANALYSIS & FEASIBILITY'], descriptions: ['Our team develops layouts, ideas, and creative design directions.', 'We review the site, zoning, codes, constraints, existing conditions, and project feasibility.'] },
    { number: ['03', '3'], tags: ['MODELLING', 'CONCEPT'], titles: ['Architecture & Engineering', 'Design Development', 'CONCEPT DESIGN'], descriptions: ['Detailed drawings, materials, and spatial specifications are finalized.', 'We develop the initial layout, massing, design direction, and key project concepts.'] },
    { number: ['04', '4'], tags: ['DELIVERY', 'DESIGN'], titles: ['execution', 'Plan Check & Corrections', 'Implementation', 'DESIGN & ENGINEERING'], descriptions: ['We support building permit, plan check, corrections, consultants and city coordination through approval.', 'We guide implementation to ensure the final result reflects the original design vision.', 'We coordinate architectural and engineering drawings into a complete permit-ready design.'] }
  ];

  const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();
  const compact = (value) => normalize(value).replace(/\\s+/g, '').toLowerCase();

  function leafMatch(node, values) {
    if (!(node instanceof Element)) return false;
    const key = compact(node.textContent);
    if (!values.some((value) => compact(value) === key)) return false;
    return !Array.from(node.children).some((child) => compact(child.textContent) === key);
  }

  function replaceText(card, sources, replacement) {
    const keys = sources.map(compact);
    const nodes = [card, ...card.querySelectorAll('*')];

    for (const node of nodes) {
      if (!leafMatch(node, sources)) continue;
      node.textContent = replacement;
      node.style.setProperty('white-space', 'normal', 'important');
      node.style.setProperty('word-break', 'normal', 'important');
      node.style.setProperty('overflow-wrap', 'normal', 'important');
      return true;
    }

    const candidates = nodes
      .filter((node) => {
        const text = compact(node.textContent);
        return keys.some((key) => text === key || text.includes(key));
      })
      .sort((a, b) => a.querySelectorAll('*').length - b.querySelectorAll('*').length);

    for (const node of candidates) {
      const text = compact(node.textContent);
      const maxLength = Math.max(...keys.map((key) => key.length));
      if (text.length > maxLength + 12) continue;
      node.textContent = replacement;
      node.style.setProperty('white-space', 'normal', 'important');
      node.style.setProperty('word-break', 'normal', 'important');
      node.style.setProperty('overflow-wrap', 'normal', 'important');
      return true;
    }
    return false;
  }

  function findCard(source) {
    const all = Array.from(document.querySelectorAll('*'));
    const numberNodes = all.filter((node) => leafMatch(node, source.number));

    for (const numberNode of numberNodes) {
      let card = numberNode.parentElement;
      let best = null;
      for (let depth = 0; card && depth < 9; depth += 1, card = card.parentElement) {
        const text = compact(card.textContent);
        const hasTitle = source.titles.some((title) => text.includes(compact(title)));
        const hasDescription = source.descriptions.some((description) => text.includes(compact(description)));
        if (hasTitle || hasDescription) {
          best = card;
          if (hasTitle && hasDescription) break;
        }
      }
      if (best) return best;
    }
    return null;
  }

  function patchCard(card, source, step) {
    card.setAttribute('data-nguyen-process-step', step.number);
    replaceText(card, [...source.number, step.number], step.number);
    replaceText(card, [...source.tags, step.tag], step.tag);
    replaceText(card, [...source.titles, step.title], step.title);
    replaceText(card, [...source.descriptions, step.description], step.description);
  }

  function cloneCard(template, step) {
    const clone = template.cloneNode(true);
    clone.removeAttribute('id');
    clone.querySelectorAll('[id]').forEach((node) => node.removeAttribute('id'));
    const source = {
      number: ['04', '4'],
      tags: ['DELIVERY', 'DESIGN'],
      titles: ['execution', 'Plan Check & Corrections', 'Implementation', 'DESIGN & ENGINEERING'],
      descriptions: ['We support building permit, plan check, corrections, consultants and city coordination through approval.', 'We guide implementation to ensure the final result reflects the original design vision.', 'We coordinate architectural and engineering drawings into a complete permit-ready design.']
    };
    patchCard(clone, source, step);
    return clone;
  }

  function applyProcess() {
    const cards = [];

    for (let i = 0; i < 4; i += 1) {
      const existing = document.querySelector('[data-nguyen-process-step="' + steps[i].number + '"]');
      const card = existing || findCard(originals[i]);
      if (!card) return false;
      patchCard(card, originals[i], steps[i]);
      cards.push(card);
    }

    const fourth = cards[3];
    const parent = fourth.parentElement;
    if (!parent) return false;

    for (const step of steps.slice(4)) {
      let card = parent.querySelector(':scope > [data-nguyen-process-step="' + step.number + '"]');
      if (!card) {
        card = cloneCard(fourth, step);
        parent.appendChild(card);
      }
    }

    return true;
  }

  let attempts = 0;
  function tryApply() {
    attempts += 1;
    if (applyProcess() || attempts >= 6) return;
    window.setTimeout(tryApply, 300);
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
