import fs from 'node:fs';

const read = (path) => (fs.existsSync(path) ? fs.readFileSync(path, 'utf8') : '');

const runtime = read('components/use-adaptive-runtime-budget.ts');
const optimizer = read('components/adaptive-runtime-optimizer.tsx');
const hero = read('components/hero-section.tsx');
const home = read('app/page.tsx');
const demosPage = read('app/demos/page.tsx');

const requirements = [
  ['shared runtime hook', runtime, /export function useAdaptiveRuntimeBudget\(/],
  ['hardware concurrency signal', runtime, /hardwareConcurrency/],
  ['device memory signal', runtime, /deviceMemory/],
  ['visibility handling', runtime, /visibilitychange/],
  ['frame timing sampling', runtime, /requestAnimationFrame/],
  ['monotonic downgrade', runtime, /Math\.max\(state\.levelIndex/],
  ['hero runtime budget', hero, /useAdaptiveRuntimeBudget/],
  ['shared optimizer runtime budget', optimizer, /useAdaptiveRuntimeBudget/],
  ['selected demos managed by optimizer', optimizer, /demo-showcase-preview/],
  ['all demos managed by optimizer', optimizer, /live demo preview/],
  ['hidden tab preview gating', optimizer, /documentVisible/],
  ['far iframe suspension', optimizer, /about:blank/],
  ['homepage optimizer mount', home, /<AdaptiveRuntimeOptimizer \/>/],
  ['demos page optimizer mount', demosPage, /<AdaptiveRuntimeOptimizer \/>/],
];

const missing = requirements
  .filter(([, source, pattern]) => !pattern.test(source))
  .map(([name]) => name);

if (missing.length) {
  console.error(`Adaptive runtime regression check failed: ${missing.join(', ')}`);
  process.exit(1);
}

console.log('Adaptive runtime regression check passed.');
