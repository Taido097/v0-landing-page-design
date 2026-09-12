import fs from 'node:fs';

const pagePath = 'app/client-demos/client-8889/residential/services/builders-complete-delivery/page.tsx';
const page = fs.readFileSync(pagePath, 'utf8');
const finishedPath = 'public/client-8889/residential/detail/builders-complete-07-finished-home.webp';

if (page.includes('bcd-stage-right') || page.includes('bcd-stage-num-right')) {
  throw new Error('Builders body still renders the duplicate right-side step column.');
}

for (const step of [
  'Concrete Pour & Foundation',
  'Structural Coordination',
  'Framing Progress',
  'Interior & Exterior Build',
  'Final Completion',
]) {
  if (!page.includes(step)) throw new Error(`Missing Builders stage: ${step}`);
}

if (!page.includes('builders-complete-07-finished-home.webp')) {
  throw new Error('Final Completion does not reference the finished-home asset.');
}

if (!fs.existsSync(finishedPath)) {
  throw new Error('Finished-home asset is missing from public assets.');
}

const finished = fs.readFileSync(finishedPath);
if (finished.length < 16 || finished.subarray(0, 4).toString('ascii') !== 'RIFF' || finished.subarray(8, 12).toString('ascii') !== 'WEBP') {
  throw new Error('Finished-home asset is not a valid WebP file.');
}

console.log('Builders body regression check passed.');
