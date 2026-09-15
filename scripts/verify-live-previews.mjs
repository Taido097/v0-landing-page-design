import fs from 'node:fs';

const gallerySource = fs.readFileSync('components/all-demos-gallery.tsx', 'utf8');
const selectedSource = fs.readFileSync('components/how-we-work-section.tsx', 'utf8');

const galleryRequirements = [
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

const selectedRequirements = [
  ['selected demo live preview component', /function LiveShowcasePreview\(/],
  ['selected demo wake helper', /function setSelectedPreviewRunning\(/],
  ['selected demo live iframe', /<iframe[\s\S]*src=\{demo\.href\}/],
  ['selected demo autoplay permission', /allow="autoplay; fullscreen"/],
  ['selected demo muted inline autoplay handling', /video\.muted = true[\s\S]*video\.playsInline = true[\s\S]*video\.autoplay = true/],
  ['selected demo snapshot fallback', /src=\{demo\.mobileImage\}[\s\S]*selected-preview-snapshot/],
  ['selected demo 30fps auto-scroll throttle', /const frameInterval = 1000 \/ 30[\s\S]*now - lastFrameAt < frameInterval/],
  ['desktop selected demo active state', /desktopActiveIndex/],
  ['desktop selected demo preload state', /desktopIncomingIndex/],
];

const missingGallery = galleryRequirements
  .filter(([, pattern]) => !pattern.test(gallerySource))
  .map(([name]) => name);
const missingSelected = selectedRequirements
  .filter(([, pattern]) => !pattern.test(selectedSource))
  .map(([name]) => name);
const missing = [...missingGallery, ...missingSelected];

if (missing.length) {
  console.error(`Live preview regression check failed: ${missing.join(', ')}`);
  process.exit(1);
}

console.log('Live portfolio and homepage selected preview regression checks passed.');
