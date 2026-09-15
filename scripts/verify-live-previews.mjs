import fs from 'node:fs';

const source = fs.readFileSync('components/all-demos-gallery.tsx', 'utf8');

const requirements = [
  ['embedded preview wake helper', /function setEmbeddedPreviewRunning\(/],
  ['autoplay permission on preview iframe', /allow="autoplay; fullscreen"/],
  ['muted inline autoplay video handling', /video\.muted = true[\s\S]*video\.playsInline = true[\s\S]*video\.autoplay = true/],
  ['visible preview video playback', /video\.play\(\)\.catch/],
  ['hidden preview video pause', /video\.pause\(\)/],
  ['animation pause style', /animation-play-state: paused !important/],
  ['near-viewport state for desktop mounting', /const \[nearView, setNearView\] = useState\(false\)/],
  ['desktop iframe mounting gated by near viewport', /const shouldMountIframe = isMobile \? mobileActive : nearView/],
  ['desktop preview preload margin', /rootMargin: '180px 0px 180px 0px'/],
  ['30fps auto-scroll throttle', /const frameInterval = 1000 \/ 30[\s\S]*now - lastFrameAt < frameInterval/],
  ['snapshot fallback available on desktop', /<img[\s\S]*src=\{snapshot\(demo\.href\)\}[\s\S]*shouldMountIframe && painted/],
];

const missing = requirements.filter(([, pattern]) => !pattern.test(source)).map(([name]) => name);

if (missing.length) {
  console.error(`Live preview regression check failed: ${missing.join(', ')}`);
  process.exit(1);
}

console.log('Live portfolio preview regression check passed.');
