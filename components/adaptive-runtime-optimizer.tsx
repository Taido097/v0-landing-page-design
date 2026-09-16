'use client';

import { useEffect } from 'react';
import { useAdaptiveRuntimeBudget } from '@/components/use-adaptive-runtime-budget';

type ManagedFrame = {
  frame: HTMLIFrameElement;
  originalSrc: string;
  suspended: boolean;
};

const savedAnimations = new WeakMap<Document, Animation[]>();

function isManagedPreview(frame: HTMLIFrameElement) {
  if (frame.closest('.demo-preview')) return false;
  if (frame.closest('.demo-showcase-preview, .mobile-demo-preview')) return false;
  return frame.title.toLowerCase().endsWith('live demo preview');
}

function isActuallyVisible(frame: HTMLIFrameElement) {
  const rect = frame.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth;
}

function distanceFromViewport(frame: HTMLIFrameElement) {
  const rect = frame.getBoundingClientRect();
  if (rect.bottom < 0) return Math.abs(rect.bottom);
  if (rect.top > window.innerHeight) return rect.top - window.innerHeight;
  return 0;
}

function getSnapshot(frame: HTMLIFrameElement) {
  const parent = frame.parentElement;
  if (!parent) return null;
  return parent.querySelector<HTMLImageElement>('.selected-preview-snapshot, img[alt$="website preview"]');
}

function pauseEmbeddedWork(frame: HTMLIFrameElement) {
  try {
    const doc = frame.contentDocument;
    if (!doc) return;

    const running = typeof doc.getAnimations === 'function'
      ? doc.getAnimations().filter((animation) => animation.playState === 'running')
      : [];
    savedAnimations.set(doc, running);
    running.forEach((animation) => animation.pause());
    doc.querySelectorAll('video').forEach((video) => video.pause());
  } catch {
    // Same-origin previews are expected, but restricted frames should fail safely.
  }
}

function resumeEmbeddedWork(frame: HTMLIFrameElement) {
  try {
    const doc = frame.contentDocument;
    if (!doc) return;

    savedAnimations.get(doc)?.forEach((animation) => {
      if (animation.playState === 'paused') animation.play();
    });
    savedAnimations.delete(doc);

    doc.querySelectorAll('video').forEach((video) => {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      void video.play().catch(() => undefined);
    });
  } catch {
    // Same-origin previews are expected, but restricted frames should fail safely.
  }
}

function suspendFrame(entry: ManagedFrame) {
  if (entry.suspended || !entry.frame.isConnected) return;

  const currentSrc = entry.frame.getAttribute('src');
  if (currentSrc && currentSrc !== 'about:blank') {
    entry.originalSrc = currentSrc;
    entry.frame.dataset.adaptiveOriginalSrc = currentSrc;
  }
  pauseEmbeddedWork(entry.frame);

  const snapshot = getSnapshot(entry.frame);
  if (snapshot) snapshot.style.opacity = '1';
  entry.frame.style.opacity = '0';
  entry.frame.setAttribute('src', 'about:blank');
  entry.suspended = true;
}

function restoreFrame(entry: ManagedFrame) {
  if (!entry.suspended || !entry.frame.isConnected) {
    if (entry.frame.isConnected && isActuallyVisible(entry.frame)) resumeEmbeddedWork(entry.frame);
    return;
  }

  const snapshot = getSnapshot(entry.frame);
  const restoreSrc = entry.frame.dataset.adaptiveOriginalSrc || entry.originalSrc;
  const finishRestore = () => {
    entry.frame.style.removeProperty('opacity');
    if (snapshot) snapshot.style.removeProperty('opacity');
    resumeEmbeddedWork(entry.frame);
  };

  entry.frame.addEventListener('load', finishRestore, { once: true });
  entry.frame.setAttribute('src', restoreSrc);
  entry.originalSrc = restoreSrc;
  entry.suspended = false;
}

export function AdaptiveRuntimeOptimizer() {
  const { documentVisible, preloadMarginPx, maxNearPreviews, frameIntervalMs } = useAdaptiveRuntimeBudget();

  useEffect(() => {
    const frames = new Map<HTMLIFrameElement, ManagedFrame>();
    let reconcileTimer = 0;
    let observer: IntersectionObserver | null = null;

    const register = (frame: HTMLIFrameElement) => {
      if (!isManagedPreview(frame) || frames.has(frame)) return;
      const currentSrc = frame.getAttribute('src');
      const originalSrc = frame.dataset.adaptiveOriginalSrc || currentSrc;
      if (!originalSrc) return;
      frames.set(frame, {
        frame,
        originalSrc,
        suspended: currentSrc === 'about:blank',
      });
      observer?.observe(frame);
    };

    const unregisterDisconnected = () => {
      frames.forEach((entry, frame) => {
        if (frame.isConnected) return;
        observer?.unobserve(frame);
        frames.delete(frame);
      });
    };

    const reconcile = () => {
      reconcileTimer = 0;
      unregisterDisconnected();
      const entries = [...frames.values()];

      if (!documentVisible) {
        entries.forEach(suspendFrame);
        return;
      }

      const visible = entries.filter(({ frame }) => isActuallyVisible(frame));
      const visibleSet = new Set(visible.map(({ frame }) => frame));
      visible.forEach(restoreFrame);

      const near = entries
        .filter(({ frame }) => !visibleSet.has(frame))
        .map((entry) => ({ entry, distance: distanceFromViewport(entry.frame) }))
        .filter(({ distance }) => distance <= preloadMarginPx)
        .sort((a, b) => a.distance - b.distance);

      const allowedNear = new Set(near.slice(0, maxNearPreviews).map(({ entry }) => entry.frame));
      entries.forEach((entry) => {
        if (visibleSet.has(entry.frame)) return;
        if (allowedNear.has(entry.frame)) {
          restoreFrame(entry);
        } else {
          suspendFrame(entry);
        }
      });
    };

    const scheduleReconcile = () => {
      if (reconcileTimer) return;
      reconcileTimer = window.setTimeout(reconcile, Math.max(48, Math.round(frameIntervalMs * 2)));
    };

    observer = new IntersectionObserver(scheduleReconcile, {
      rootMargin: `${preloadMarginPx}px 0px ${preloadMarginPx}px 0px`,
      threshold: [0, 0.01],
    });

    document.querySelectorAll<HTMLIFrameElement>('iframe').forEach(register);

    const mutationObserver = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node instanceof HTMLIFrameElement) register(node);
          node.querySelectorAll<HTMLIFrameElement>('iframe').forEach(register);
        });
      });
      scheduleReconcile();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('scroll', scheduleReconcile, { passive: true });
    window.addEventListener('resize', scheduleReconcile, { passive: true });
    scheduleReconcile();

    return () => {
      mutationObserver.disconnect();
      observer?.disconnect();
      window.removeEventListener('scroll', scheduleReconcile);
      window.removeEventListener('resize', scheduleReconcile);
      if (reconcileTimer) window.clearTimeout(reconcileTimer);
      frames.clear();
    };
  }, [documentVisible, frameIntervalMs, maxNearPreviews, preloadMarginPx]);

  return null;
}
