import fs from 'node:fs'

const routePath = 'app/client-demos/client-8889/arcsphere-socal/route.ts'
const patchPath = 'app/client-demos/client-8889/arcsphere-socal/testimonial-patch.ts'

const route = fs.readFileSync(routePath, 'utf8')
const patch = fs.existsSync(patchPath) ? fs.readFileSync(patchPath, 'utf8') : ''

const requirements = [
  [route.includes('TESTIMONIAL_PATCH'), 'route imports and injects TESTIMONIAL_PATCH'],
  [patch.includes('id="nguyen-client-testimonial"'), 'working testimonial section has a stable id'],
  [patch.includes('Game-Changing Experience'), 'requested testimonial headline is present'],
  [patch.includes('Client Testimonial'), 'testimonial label is present'],
  [patch.includes('BOBA &amp; BREW') && patch.includes('DISTRICT'), 'client grid content is present'],
  [patch.includes('@media (max-width: 809.98px)'), 'section has a mobile layout'],
  [patch.includes('--nguyen-display-font') && patch.includes('--nguyen-body-font'), 'section inherits the site typography'],
]

const failed = requirements.filter(([ok]) => !ok).map(([, label]) => label)
if (failed.length) {
  console.error('Concept 1 testimonial check failed:')
  failed.forEach((label) => console.error('- ' + label))
  process.exit(1)
}

console.log('Concept 1 testimonial check passed')
