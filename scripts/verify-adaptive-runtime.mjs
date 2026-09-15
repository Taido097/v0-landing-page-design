import fs from 'node:fs';

const read = (path) => (fs.existsSync(path) ? fs.readFileSync(path, 'utf8') : '');

const runtime = read('components/use-adaptive-runtime-budget.ts');
const hero = read('components/hero-section.tsx');
const selected = read('components/how-we-work-section.tsx');
const allDemos = read('components/all-demos-gallery.tsx');

const requirements = [
  ['shared runtime hook', runtime, /export function useAdaptiveRuntimeBudget\(/],
  ['hardware concurrency signal', runtime, /hardwareConcurrency/],
  ['device memory signal', runtime, /deviceMemory/],
  ['visibility handling', runtime, /visibilitychange/],
  ['frame timing sampling', runtime, /requestAnimationFrame/],
  ['monotonic downgrade', runtime, /Math\.max\(state\.levelIndex/],
  ['hero runtime budget', hero, /useAdaptiveRuntimeBudget/],
  ['selected demos runtime budget', selected, /useAdaptiveRuntimeBudget/],
  ['all demos runtime budget', allDemos, /useAdaptiveRuntimeBudget/],
  ['hidden tab preview gating', selected + allDemos, /documentVisible/],
];

const missing = requirements
  .filter(([, source, pattern]) => !pattern.test(source))
  .map(([name]) => name);

if (missing.length) {
  console.error(`Adaptive runtime regression check failed: ${missing.join(', ')}`);
  process.exit(1);
}

console.log('Adaptive runtime regression check passed.');
