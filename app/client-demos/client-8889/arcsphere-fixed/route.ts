import { GET as getBaseConcept } from "../arcsphere/route"

const PROCESS_PATCH = `
<script id="nguyen-process-safe-patch">
(() => {
  const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();
  const compact = (value) => normalize(value).replace(/\\s+/g, '').toLowerCase();

  const specs = [
    { number:'1', oldNumbers:['01','1'], tag:'CONSULTATION', oldTags:['RESEARCH','CONSULTATION'], title:'CONSULTATION', oldTitles:['Discovery','CONSULTATION'], description:'We discuss your goals, project scope, budget, timeline, and requirements.', oldDescriptions:['We begin with existing conditions, business needs, zoning, occupancy and local requirements.','We begin by understanding your goals, requirements, and design vision.'] },
    { number:'2', oldNumbers:['02','2'], tag:'SITE ANALYSIS', oldTags:['IDEATION','SITE ANALYSIS'], title:'SITE ANALYSIS & FEASIBILITY', oldTitles:['Concept Development','Existing-Condition Survey & Project Planning','SITE ANALYSIS & FEASIBILITY'], description:'We review the site, zoning, codes, constraints, existing conditions, and project feasibility.', oldDescriptions:['Our team develops layouts, ideas, and creative design directions.','We refine the concept into a cohesive and functional design direction.'] },
    { number:'3', oldNumbers:['03','3'], tag:'CONCEPT', oldTags:['MODELLING','CONCEPT'], title:'CONCEPT DESIGN', oldTitles:['Design Development','Architecture & Engineering','CONCEPT DESIGN'], description:'We develop the initial layout, massing, design direction, and key project concepts.', oldDescriptions:['Detailed drawings, materials, and spatial specifications are finalized.','We prepare detailed drawings and specifications for execution.'] },
    { number:'4', oldNumbers:['04','4'], tag:'DESIGN', oldTags:['DELIVERY','DESIGN'], title:'DESIGN & ENGINEERING', oldTitles:['Implementation','Plan Check & Corrections','execution','DESIGN & ENGINEERING'], description:'We coordinate architectural and engineering drawings into a complete permit-ready design.', oldDescriptions:['We support building permit, plan check, corrections, consultants and city coordination through approval.','We guide implementation to ensure the final result reflects the original design vision.','We oversee the final execution to ensure the design is realized as intended.'] }
  ];
  const extras = [
    { number:'5', tag:'PERMIT', title:'PERMIT SUBMITTAL', description:'We prepare and submit the permit package to the appropriate city or agency.' },
    { number:'6', tag:'APPROVAL', title:'PLAN CHECK & APPROVAL', description:'We respond to plan-check comments and coordinate revisions through approval.' }
  ];

  function smallestExact(root, values) {
    const keys = values.map(compact);
    return [root, ...root.querySelectorAll('*')]
      .filter((node) => keys.includes(compact(node.textContent)))
      .sort((a,b) => a.querySelectorAll('*').length - b.querySelectorAll('*').length)[0] || null;
  }

  function setText(node, text) {
    if (!node || normalize(node.textContent) === text) return;
    node.textContent = text;
    node.style.setProperty('white-space','normal','important');
    node.style.setProperty('word-break','normal','important');
    node.style.setProperty('overflow-wrap','normal','important');
  }

  function findCard(spec) {
    const titleKeys = spec.oldTitles.concat(spec.title).map(compact);
    const all = Array.from(document.querySelectorAll('body *'));
    const titleNode = all
      .filter((node) => titleKeys.includes(compact(node.textContent)))
      .sort((a,b) => a.querySelectorAll('*').length - b.querySelectorAll('*').length)[0];
    if (!titleNode) return null;

    let cursor = titleNode;
    for (let depth=0; cursor && depth<10; depth+=1, cursor=cursor.parentElement) {
      const text = compact(cursor.textContent);
      const hasNumber = spec.oldNumbers.concat(spec.number).some((v) => text.includes(compact(v)));
      const hasDescription = spec.oldDescriptions.concat(spec.description).some((v) => text.includes(compact(v)));
      if (hasNumber && hasDescription) return cursor;
    }
    return null;
  }

  function patchCard(card, spec) {
    card.setAttribute('data-nguyen-process-step', spec.number);
    setText(smallestExact(card, spec.oldNumbers.concat(spec.number)), spec.number);
    setText(smallestExact(card, spec.oldTags.concat(spec.tag)), spec.tag);
    setText(smallestExact(card, spec.oldTitles.concat(spec.title)), spec.title);
    setText(smallestExact(card, spec.oldDescriptions.concat(spec.description)), spec.description);
  }

  function cloneFromFourth(fourth, step) {
    const clone = fourth.cloneNode(true);
    clone.removeAttribute('id');
    clone.querySelectorAll('[id]').forEach((node) => node.removeAttribute('id'));
    clone.setAttribute('data-nguyen-process-step', step.number);
    setText(smallestExact(clone, ['4','04']), step.number);
    setText(smallestExact(clone, ['DESIGN']), step.tag);
    setText(smallestExact(clone, ['DESIGN & ENGINEERING']), step.title);
    setText(smallestExact(clone, ['We coordinate architectural and engineering drawings into a complete permit-ready design.']), step.description);
    return clone;
  }

  function applyProcess() {
    const cards = specs.map((spec) => {
      const existing = document.querySelector('[data-nguyen-process-step="'+spec.number+'"]');
      const card = existing || findCard(spec);
      if (card) patchCard(card, spec);
      return card;
    });
    if (cards.some((card) => !card)) return false;

    const fourth = cards[3];
    const parent = fourth.parentElement;
    if (!parent) return false;
    extras.forEach((step) => {
      if (!parent.querySelector(':scope > [data-nguyen-process-step="'+step.number+'"]')) {
        parent.appendChild(cloneFromFourth(fourth, step));
      }
    });
    return true;
  }

  let observer;
  let scheduled = false;
  const run = () => {
    scheduled = false;
    if (observer) observer.disconnect();
    applyProcess();
    if (observer) observer.observe(document.body, { childList:true, subtree:true, characterData:true });
  };
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(run);
  };

  const start = () => {
    observer = new MutationObserver(schedule);
    run();
  };
  if (document.body) start();
  else window.addEventListener('DOMContentLoaded', start, { once:true });
  window.addEventListener('load', schedule, { once:true });
})();
</script>`;

export async function GET() {
  const response = await getBaseConcept();
  if (!response.ok) return response;
  const html = await response.text();
  const patched = html.includes('nguyen-process-safe-patch') ? html : html.replace('</body>', `${PROCESS_PATCH}</body>`);
  const headers = new Headers(response.headers);
  headers.set('Content-Type', 'text/html; charset=utf-8');
  headers.set('Cache-Control', 'no-store');
  return new Response(patched, { status: response.status, headers });
}
