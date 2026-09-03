import fs from 'node:fs'

const routePath = 'app/client-demos/client-8889/arcsphere-socal/route.ts'
const patchPath = 'app/client-demos/client-8889/arcsphere-socal/testimonial-patch.ts'
const logoPath = 'public/client-8889/testimonial-client-logos.svg'

const route = fs.readFileSync(routePath, 'utf8')
const patch = fs.existsSync(patchPath) ? fs.readFileSync(patchPath, 'utf8') : ''
const logos = fs.existsSync(logoPath) ? fs.readFileSync(logoPath, 'utf8') : ''

const requirements = [
  [route.includes('TESTIMONIAL_PATCH'), 'route imports and injects TESTIMONIAL_PATCH'],
  [patch.includes("const SECTION_ID = 'nguyen-client-testimonial'") && patch.includes('section.id = SECTION_ID'), 'working testimonial section has a stable id'],
  [patch.includes('WHAT OUR CLIENTS SAY') && patch.includes('REAL EXPERIENCES FROM CLIENTS WHO TRUSTED US'), 'requested testimonial heading is present'],
  [patch.includes('Game-Changing Experience'), 'requested testimonial headline is present'],
  [patch.includes('Client Testimonial'), 'testimonial label is present'],
  [patch.includes('/client-8889/testimonial-client-logos.svg') && logos.includes('Boba &amp; Brew') && logos.includes('District Eatery'), 'supplied real client logo artwork is present'],
  [patch.includes('IntersectionObserver') && patch.includes('ng-reveal'), 'load-in animation is present'],
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
