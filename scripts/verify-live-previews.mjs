import fs from 'node:fs';

const gallerySource = fs.readFileSync('components/all-demos-gallery.tsx', 'utf8');
const selectedSource = fs.readFileSync('components/how-we-work-section.tsx', 'utf8');
const pricingSource = fs.readFileSync('components/pricing-section.tsx', 'utf8');
const nguyenPreviewRoutePath = 'app/client-demos/client-8889/arcsphere-socal-preview/route.ts';
const nguyenPreviewSource = fs.existsSync(nguyenPreviewRoutePath)
  ? fs.readFileSync(nguyenPreviewRoutePath, 'utf8')
  : '';

const galleryRequirements = [
  ['embedded preview wake helper', /function setEmbeddedPreviewRunning\(/],
  ['autoplay permission on preview iframe', /allow="autoplay; fullscreen"/],
  ['muted inline autoplay video handling', /video\.muted = true[\s\S]*video\.playsInline = true[\s\S]*video\.autoplay = true/],
  ['visible preview video playback', /video\.play\(\)\.catch/],
  ['hidden preview video pause', /video\.pause\(\)/],
  ['animation pause style', /animation-play-state: paused !important/],
  ['near-viewport state for desktop mounting', /const \[nearView, setNearView\] = useState\(false\)/],
  ['desktop iframe mounting gated by near viewport', /const shouldMountIframe = isMobile \? mobileActive : nearView/],
  ['desktop preview preload margin', /rootMargin: demo\.previewHref \? '900px 0px 900px 0px' : '180px 0px 180px 0px'/],
  ['30fps auto-scroll throttle', /const frameInterval = 1000 \/ 30[\s\S]*now - lastFrameAt < frameInterval/],
  ['snapshot fallback available on desktop', /<img[\s\S]*src=\{snapshot\(demo\.previewHref \?\? demo\.href\)\}[\s\S]*shouldMountIframe && painted/],
  ['dedicated NGUYEN gallery preview route', /name: 'NGUYEN Architecture & Engineering'[\s\S]*previewHref: '\/client-demos\/client-8889\/arcsphere-socal-preview'/],
  ['gallery iframe uses lightweight preview route', /src=\{demo\.previewHref \?\? demo\.href\}/],
  ['gallery warms dedicated previews', /fetch\(demo\.previewHref, \{ cache: 'force-cache', credentials: 'same-origin' \}\)/],
  ['gallery keeps snapshot visible through heavy preview paint', /const paintDelay = demo\.previewHref \? 420 : 140/],
];

const selectedRequirements = [
  ['selected demo live preview component', /function LiveShowcasePreview\(/],
  ['selected demo wake helper', /function setSelectedPreviewRunning\(/],
  ['selected demo live iframe', /<iframe[\s\S]*src=\{demo\.previewHref \? `\$\{demo\.previewHref\}\?selectedAutoplay=1` : demo\.href\}/],
  ['selected demo autoplay permission', /allow="autoplay; fullscreen"/],
  ['selected demo muted inline autoplay handling', /video\.muted = true[\s\S]*video\.playsInline = true[\s\S]*video\.autoplay = true/],
  ['selected demo snapshot fallback', /src=\{demo\.mobileImage\}[\s\S]*selected-preview-snapshot/],
  ['selected demo auto-scroll follows requestAnimationFrame smoothly', /const tick = \(now: number\) => \{[\s\S]*win\.scrollTo\(0, targetScroll \* ease\(progress\)\)[\s\S]*requestAnimationFrame\(tick\)/],
  ['selected heavy demo refreshes scroll target until layout is ready', /const targetRefreshDeadline = startedAt \+ 6000[\s\S]*if \(now <= targetRefreshDeadline && \(targetScroll <= 1 \|\| now >= nextTargetRefreshAt\)\)[\s\S]*readTarget\(\)/],
  ['selected demo avoids repeated media wake work during auto-scroll', /setSelectedPreviewRunning\(frame, true\);[\s\S]*const tick = \(now: number\)/],
  ['desktop selected demo active state', /desktopActiveIndex/],
  ['desktop selected demo preload state', /desktopIncomingIndex/],
  ['selected desktop scroll activity gate', /const \[desktopScrollActive, setDesktopScrollActive\] = useState\(false\)/],
  ['selected desktop uses eased animation position', /let targetPosition = 0[\s\S]*let animatedPosition = 0[\s\S]*Math\.exp\(-[\s\S]*requestAnimationFrame/],
  ['selected desktop settled live preview', /const \[desktopSettledIndex, setDesktopSettledIndex\] = useState\(0\)/],
  ['desktop selected preview does not use redundant intersection gate', /<LiveShowcasePreview demo=\{demo\} shouldMount=\{shouldMount\} running=\{running\} \/>/],
  ['selected desktop scroll idle debounce', /window\.setTimeout\(\(\) => \{[\s\S]*setDesktopScrollActive\(false\)[\s\S]*setDesktopSettledIndex/],
  ['selected desktop fully unmounts iframe while page scrolls', /shouldMount=\{index === desktopSettledIndex && !desktopScrollActive\}/],
  ['selected settled demo starts promptly after scroll ends', /\}, 120\);[\s\S]*setDesktopSettledIndex/],
  ['selected NGUYEN live preview uses lightweight preview route', /name: 'NGUYEN Architecture & Engineering'[\s\S]*previewHref: '\/client-demos\/client-8889\/arcsphere-socal-preview'/],
  ['selected NGUYEN requests self-scrolling preview mode', /src=\{demo\.previewHref \? `\$\{demo\.previewHref\}\?selectedAutoplay=1` : demo\.href\}/],
  ['selected NGUYEN does not pause Framer during startup', /const isNguyenPreview = Boolean\(demo\.previewHref\)[\s\S]*if \(!running\) \{[\s\S]*setSelectedPreviewRunning\(frame, false\)[\s\S]*if \(!loaded \|\| !painted\) \{[\s\S]*if \(!isNguyenPreview\) setSelectedPreviewRunning\(frame, false\)/],
  ['selected desktop pauses live iframe during page scroll', /running=\{index === desktopSettledIndex && !desktopScrollActive\}/],
  ['selected snapshot covers paused iframe', /shouldMount && painted && running \? 'opacity-0' : 'opacity-100'/],
  ['selected iframe hidden while paused', /visibility: running \? 'visible' : 'hidden'/],
  ['homepage selected NGUYEN demo', /name: 'NGUYEN Architecture & Engineering'[\s\S]*category: 'Custom Website'[\s\S]*industry: 'Architecture & Engineering'[\s\S]*href: '\/client-demos\/client-8889\/arcsphere-socal'[\s\S]*previewHref: '\/client-demos\/client-8889\/arcsphere-socal-preview'/],
  ['homepage warms dedicated previews', /fetch\(demo\.previewHref, \{ cache: 'force-cache', credentials: 'same-origin' \}\)/],
  ['selected desktop preloads all snapshot images', /new window\.Image\(\)[\s\S]*image\.src = demo\.mobileImage/],
  ['selected NGUYEN warms live preview before activation', /rootMargin: '1200px 0px 1200px 0px'[\s\S]*setWarmNguyenPreview\(true\)[\s\S]*selectedAutoplay=1[\s\S]*onLoad=\{\(\) => setWarmNguyenPreview\(false\)\}/],
  ['selected preview keeps snapshot visible through heavy preview paint', /const paintDelay = demo\.previewHref \? 420 : 140/],
  ['mobile NGUYEN preload margin', /rootMargin: demo\.previewHref \? '700px 0px 700px 0px' : '180px 0px 180px 0px'/],
];

const nguyenPreviewRequirements = [
  ['dedicated NGUYEN preview route exists', /import \{ GET as getFullDemo \} from "\.\.\/arcsphere-socal\/route"/],
  ['preview route strips card routing work', /nguyen-socal-card-routing/],
  ['preview route strips CTA routing work', /nguyen-socal-hero-cta-patch/],
  ['NGUYEN selected preview self-scroll is opt-in only', /searchParams\.get\('selectedAutoplay'\) !== '1'/],
  ['NGUYEN selected preview self-scroll uses its own scrolling element', /document\.scrollingElement[\s\S]*requestAnimationFrame[\s\S]*scrollTop =/],
  ['preview route is cacheable', /Cache-Control[\s\S]*public, max-age=30, s-maxage=300, stale-while-revalidate=300/],
  ['preview route is not indexed', /X-Robots-Tag[\s\S]*noindex, nofollow/],
];

const selectedForbidden = [
  ['old homepage Salonix demo', /name: 'Salonix'[\s\S]*href: '\/portfolio\/salon-spa'/],
];

const pricingRequirements = [
  ['starter package single-page wording', /name: 'Starter'[\s\S]*features: \[[\s\S]*'Single-page website'/],
];

const pricingForbidden = [
  ['old starter up-to-5-pages wording', /name: 'Starter'[\s\S]*features: \[[\s\S]*'Up to 5 pages'/],
];

const missingGallery = galleryRequirements
  .filter(([, pattern]) => !pattern.test(gallerySource))
  .map(([name]) => name);
const missingSelected = selectedRequirements
  .filter(([, pattern]) => !pattern.test(selectedSource))
  .map(([name]) => name);
const missingNguyenPreview = nguyenPreviewRequirements
  .filter(([, pattern]) => !pattern.test(nguyenPreviewSource))
  .map(([name]) => name);
const forbiddenSelected = selectedForbidden
  .filter(([, pattern]) => pattern.test(selectedSource))
  .map(([name]) => name);
const missingPricing = pricingRequirements
  .filter(([, pattern]) => !pattern.test(pricingSource))
  .map(([name]) => name);
const forbiddenPricing = pricingForbidden
  .filter(([, pattern]) => pattern.test(pricingSource))
  .map(([name]) => name);
const missing = [
  ...missingGallery,
  ...missingSelected,
  ...missingNguyenPreview,
  ...forbiddenSelected,
  ...missingPricing,
  ...forbiddenPricing,
];

if (missing.length) {
  console.error(`Live preview and pricing regression check failed: ${missing.join(', ')}`);
  process.exit(1);
}

console.log('Live portfolio, homepage selected preview, NGUYEN preview performance, and pricing regression checks passed.');
