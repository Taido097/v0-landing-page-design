# Adaptive Runtime Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce concurrent browser work on weaker computers while preserving the current DesignedbyTD visuals, content, links, animations, videos, and user-facing behavior.

**Architecture:** Add one shared client runtime-budget hook backed by a module-level external store. It derives a conservative initial budget from browser hardware hints, samples frame timing once globally, only lowers the budget during a visit, and exposes document visibility plus scheduling limits. Existing preview components consume that policy to mount/preload fewer off-screen iframes, stop hidden-tab animation loops, and avoid unnecessary frame/layout work without changing rendered design.

**Tech Stack:** Next.js 16.1.6, React 19.2.4, TypeScript 5.7.3, browser IntersectionObserver/requestAnimationFrame/Page Visibility APIs, existing source-level Node regression scripts.

**Spec:** `docs/superpowers/specs/2026-09-15-adaptive-runtime-optimization-design.md`

## Global Constraints

- Do not change layout, spacing, typography, colors, shadows, blur appearance, imagery, copy, pricing, navigation, links, demo order, or categories.
- Do not remove or visually simplify animations, videos, or effects.
- Do not replace live previews with permanent static screenshots.
- Visible active demos remain eligible to run at all times.
- Hidden tabs stop preview auto-scroll and pause preview media/animations.
- Once the runtime budget is lowered during one visit, it never increases during that visit.
- The full NGUYEN demo remains unchanged; only its existing preview route participates in scheduling.

---

### Task 1: Shared Runtime Budget and Regression Guard

**Files:**
- Create: `components/use-adaptive-runtime-budget.ts`
- Create: `scripts/verify-adaptive-runtime.mjs`
- Modify: `package.json`

**Interfaces:**
- Produces: `useAdaptiveRuntimeBudget(): AdaptiveRuntimeBudget`
- `AdaptiveRuntimeBudget` fields: `level`, `documentVisible`, `preloadMarginPx`, `maxNearPreviews`, `frameIntervalMs`
- Consumers use the budget only for scheduling/resource lifecycle, never styling.

- [ ] **Step 1: Write the failing regression check**

Create `scripts/verify-adaptive-runtime.mjs` that reads the shared hook plus hero/Selected Demos/All Demos sources and fails unless all of these are present: a shared adaptive hook, hardware concurrency signal, device memory signal, visibility-state handling, frame-timing sampling, monotonic downgrade logic, hero visibility integration, Selected Demos budget integration, All Demos budget integration, and hidden-tab gating.

```js
import fs from 'node:fs';

const runtime = fs.readFileSync('components/use-adaptive-runtime-budget.ts', 'utf8');
const hero = fs.readFileSync('components/hero-section.tsx', 'utf8');
const selected = fs.readFileSync('components/how-we-work-section.tsx', 'utf8');
const allDemos = fs.readFileSync('components/all-demos-gallery.tsx', 'utf8');

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

const missing = requirements.filter(([, source, pattern]) => !pattern.test(source)).map(([name]) => name);
if (missing.length) {
  console.error(`Adaptive runtime regression check failed: ${missing.join(', ')}`);
  process.exit(1);
}
console.log('Adaptive runtime regression check passed.');
```

- [ ] **Step 2: Add the check to `prebuild` and verify RED**

Update `package.json` so `prebuild` runs the existing checks followed by `node scripts/verify-adaptive-runtime.mjs`. The branch build must fail before implementation because the shared runtime hook/integrations are absent.

- [ ] **Step 3: Implement the shared hook**

Create a module-level external store with three immutable budget profiles and a single global frame monitor. Use `useSyncExternalStore` so multiple components share one sampler rather than creating independent RAF monitors.

```ts
'use client';

import { useSyncExternalStore } from 'react';

type RuntimeLevel = 'full' | 'balanced' | 'constrained';
export type AdaptiveRuntimeBudget = {
  level: RuntimeLevel;
  documentVisible: boolean;
  preloadMarginPx: number;
  maxNearPreviews: number;
  frameIntervalMs: number;
};

const profiles = [
  { level: 'full', preloadMarginPx: 360, maxNearPreviews: 2, frameIntervalMs: 1000 / 30 },
  { level: 'balanced', preloadMarginPx: 220, maxNearPreviews: 1, frameIntervalMs: 1000 / 28 },
  { level: 'constrained', preloadMarginPx: 120, maxNearPreviews: 1, frameIntervalMs: 1000 / 24 },
] as const;
```

Initialize from `navigator.hardwareConcurrency`, optional `navigator.deviceMemory`, viewport/mobile state, and reduced-motion only as scheduling hints. Sample RAF deltas in bounded windows; sustained slow timing may move from full to balanced or constrained. Downgrades are monotonic with `Math.max(state.levelIndex, nextLevelIndex)`. `visibilitychange` updates `documentVisible` and suspends the sampler while hidden.

- [ ] **Step 4: Run the adaptive source check**

Expected after only Task 1 implementation: shared-hook requirements pass, integration requirements remain RED until Tasks 2-3.

- [ ] **Step 5: Commit Task 1**

Commit the regression guard, package change, and shared hook together.

---

### Task 2: Hero Runtime Lifecycle

**Files:**
- Modify: `components/hero-section.tsx`
- Modify: `components/animated-demo-preview.tsx`

**Interfaces:**
- Consumes: `useAdaptiveRuntimeBudget()` from Task 1.
- Visible appearance, carousel order, animation path, card geometry, and link behavior remain unchanged.

- [ ] **Step 1: Gate hero background runtime by section/tab visibility**

Use an IntersectionObserver on the hero section and `documentVisible` from the shared budget. Render the already-existing active background video only while the hero is actually visible and the tab is visible. Keep the same image poster underneath, so off-screen suspension never changes what is visible to the user.

- [ ] **Step 2: Skip pointer RAF work when hero/tab is not visible**

Keep the same pointer transform math, but return before scheduling pointer work if the hero section or document is not visible.

- [ ] **Step 3: Gate embedded preview loops with document visibility**

In `AnimatedDemoPreview`, keep the same active-center behavior and scroll path. Include `documentVisible` in the `running` condition so hidden tabs stop RAF work and embedded media pause immediately.

- [ ] **Step 4: Run regression/build check**

The adaptive check should now pass the hero integration requirement while Selected Demos/All Demos remain pending.

- [ ] **Step 5: Commit Task 2**

Commit only hero/preview lifecycle changes.

---

### Task 3: Selected Demos and All Demos Scheduling

**Files:**
- Modify: `components/how-we-work-section.tsx`
- Modify: `components/all-demos-gallery.tsx`

**Interfaces:**
- Consumes: `AdaptiveRuntimeBudget` from Task 1.
- Existing snapshots remain only transient loading fallbacks.
- Existing full-demo links and NGUYEN `previewHref` remain unchanged.

- [ ] **Step 1: Integrate Selected Demos with the shared budget**

Use `documentVisible` to disable iframe prefetch/mount/run work when the tab is hidden. Replace fixed preload margins with the shared `preloadMarginPx`, while preserving NGUYEN's earlier preload advantage only on unconstrained budgets. Desktop continues to keep the active scene plus incoming scene visually available, but only the budget-eligible iframe(s) stay live; non-running frames pause immediately.

- [ ] **Step 2: Stop Selected Demos scroll scheduling while hidden**

The sticky stack keeps the same CSS transforms and positions. The scroll listener/RAF simply skips updates when `documentVisible` is false and performs one synchronization when visibility returns.

- [ ] **Step 3: Integrate All Demos with the shared budget**

Replace the fixed desktop preload margin (`180px`, with NGUYEN special handling) with the shared policy. `shouldMountIframe` must require `documentVisible`; visible cards remain eligible and far-off cards fully unmount. Use the budget's `frameIntervalMs` in the existing auto-scroll scheduler while preserving the same elapsed-time-based scroll path and cycle duration.

- [ ] **Step 4: Preserve NGUYEN routing guarantees**

Keep `href: '/client-demos/client-8889/arcsphere-socal'` and `previewHref: '/client-demos/client-8889/arcsphere-socal-preview'` unchanged in both homepage Selected Demos and All Demos.

- [ ] **Step 5: Run all source checks**

Expected: builders-body, live-preview, and adaptive-runtime regression checks all PASS.

- [ ] **Step 6: Commit Task 3**

Commit Selected Demos/All Demos runtime scheduling changes.

---

### Task 4: Verification and Production Promotion

**Files:**
- Verify only; no intentional design/content changes.

**Interfaces:**
- Produces: one tested branch commit safe to fast-forward to `main`.

- [ ] **Step 1: Compare branch to `main`**

Confirm changed application files are limited to runtime scheduling/lifecycle code plus test/docs/package wiring. Verify no public copy, pricing, demo names, URLs, categories, or visual classes were intentionally altered.

- [ ] **Step 2: Run the production branch build**

Expected prebuild output includes:

```text
Builders body regression check passed.
Live portfolio preview regression check passed.
Adaptive runtime regression check passed.
```

Then `next build` must finish successfully.

- [ ] **Step 3: Verify preview deployment**

Confirm the exact branch SHA is READY and fetch `/` plus `/demos` successfully.

- [ ] **Step 4: Promote exact SHA to `main`**

Fast-forward only; do not force. If `main` moved, rebase/re-review rather than overwriting unrelated work.

- [ ] **Step 5: Verify production**

Confirm the production deployment for the exact promoted SHA is READY, `designedbytd.com/` and `designedbytd.com/demos` return successfully, and the production build logs contain all regression PASS messages.
