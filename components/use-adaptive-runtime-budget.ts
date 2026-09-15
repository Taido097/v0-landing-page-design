'use client';

import { useSyncExternalStore } from 'react';

export type RuntimeLevel = 'full' | 'balanced' | 'constrained';

export type AdaptiveRuntimeBudget = {
  level: RuntimeLevel;
  documentVisible: boolean;
  preloadMarginPx: number;
  maxNearPreviews: number;
  frameIntervalMs: number;
};

type RuntimeState = AdaptiveRuntimeBudget & {
  levelIndex: number;
};

type NavigatorWithMemory = Navigator & {
  deviceMemory?: number;
};

const profiles = [
  { level: 'full', preloadMarginPx: 360, maxNearPreviews: 2, frameIntervalMs: 1000 / 30 },
  { level: 'balanced', preloadMarginPx: 220, maxNearPreviews: 1, frameIntervalMs: 1000 / 28 },
  { level: 'constrained', preloadMarginPx: 120, maxNearPreviews: 1, frameIntervalMs: 1000 / 24 },
] as const;

const serverSnapshot: AdaptiveRuntimeBudget = {
  ...profiles[0],
  documentVisible: true,
};

let state: RuntimeState = {
  ...profiles[0],
  documentVisible: true,
  levelIndex: 0,
};

let publicSnapshot: AdaptiveRuntimeBudget = serverSnapshot;
let initialized = false;
let rafId = 0;
let lastFrameAt = 0;
let frameSamples: number[] = [];
const listeners = new Set<() => void>();

function publish(next: RuntimeState) {
  const changed =
    next.levelIndex !== state.levelIndex ||
    next.documentVisible !== state.documentVisible ||
    next.preloadMarginPx !== state.preloadMarginPx ||
    next.maxNearPreviews !== state.maxNearPreviews ||
    next.frameIntervalMs !== state.frameIntervalMs;

  if (!changed) return;
  state = next;
  publicSnapshot = {
    level: state.level,
    documentVisible: state.documentVisible,
    preloadMarginPx: state.preloadMarginPx,
    maxNearPreviews: state.maxNearPreviews,
    frameIntervalMs: state.frameIntervalMs,
  };
  listeners.forEach((listener) => listener());
}

function applyLevel(nextLevelIndex: number) {
  const levelIndex = Math.max(state.levelIndex, Math.min(profiles.length - 1, nextLevelIndex));
  if (levelIndex === state.levelIndex) return;

  publish({
    ...state,
    ...profiles[levelIndex],
    levelIndex,
  });
}

function initialLevelFromBrowser() {
  const nav = navigator as NavigatorWithMemory;
  const cores = nav.hardwareConcurrency || 8;
  const memory = nav.deviceMemory;
  let levelIndex = 0;

  if (cores <= 4 || (typeof memory === 'number' && memory <= 4) || window.innerWidth <= 900) {
    levelIndex = 1;
  }
  if (cores <= 2 || (typeof memory === 'number' && memory <= 2)) {
    levelIndex = 2;
  }

  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    levelIndex = Math.max(levelIndex, 1);
  }

  return levelIndex;
}

function stopFrameMonitor() {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = 0;
  lastFrameAt = 0;
  frameSamples = [];
}

function startFrameMonitor() {
  if (rafId || document.visibilityState !== 'visible') return;

  const tick = (now: number) => {
    if (document.visibilityState !== 'visible') {
      stopFrameMonitor();
      return;
    }

    if (lastFrameAt) {
      const delta = now - lastFrameAt;
      if (delta > 0 && delta < 180) frameSamples.push(delta);
    }
    lastFrameAt = now;

    if (frameSamples.length >= 90) {
      const sorted = [...frameSamples].sort((a, b) => a - b);
      const average = frameSamples.reduce((total, value) => total + value, 0) / frameSamples.length;
      const p75 = sorted[Math.floor(sorted.length * 0.75)] ?? average;
      const p90 = sorted[Math.floor(sorted.length * 0.9)] ?? p75;

      if (average > 31 || p90 > 44) {
        applyLevel(2);
      } else if (average > 22 || p75 > 27) {
        applyLevel(1);
      }
      frameSamples = [];
    }

    rafId = requestAnimationFrame(tick);
  };

  rafId = requestAnimationFrame(tick);
}

function handleVisibilityChange() {
  const documentVisible = document.visibilityState === 'visible';
  publish({ ...state, documentVisible });

  if (documentVisible) {
    startFrameMonitor();
  } else {
    stopFrameMonitor();
  }
}

function initialize() {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;

  const levelIndex = initialLevelFromBrowser();
  state = {
    ...state,
    ...profiles[levelIndex],
    levelIndex,
    documentVisible: document.visibilityState === 'visible',
  };
  publicSnapshot = {
    level: state.level,
    documentVisible: state.documentVisible,
    preloadMarginPx: state.preloadMarginPx,
    maxNearPreviews: state.maxNearPreviews,
    frameIntervalMs: state.frameIntervalMs,
  };

  document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });
  if (state.documentVisible) startFrameMonitor();
}

function subscribe(listener: () => void) {
  initialize();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  initialize();
  return publicSnapshot;
}

function getServerSnapshot() {
  return serverSnapshot;
}

export function useAdaptiveRuntimeBudget(): AdaptiveRuntimeBudget {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
