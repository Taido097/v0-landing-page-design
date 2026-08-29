import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const routePath = path.join(root, 'app/client-demos/client-8889/arcsphere-socal/route.ts')
const source = fs.readFileSync(routePath, 'utf8')

function requireText(text, message) {
  if (!source.includes(text)) {
    console.error(`FAIL: ${message}`)
    process.exit(1)
  }
}

requireText('const MOBILE_RENDER_FAILSAFE =', 'Concept 1 must define a cross-platform render failsafe')
requireText('@media (max-width: 1024px)', 'failsafe must cover phones and tablet-width viewports')
requireText('#main [style*="opacity:0"] { opacity: 1 !important; }', 'failsafe must reveal Framer wrappers stuck at opacity:0')
requireText('#main [style*="opacity:0.001"] { transform: none !important; filter: none !important; }', 'failsafe must clear Framer appear transforms and filters')
requireText('${MOBILE_RENDER_FAILSAFE}', 'failsafe must be injected into the delivered Concept 1 HTML')

console.log('PASS: Concept 1 cross-platform render failsafe is present and injected')
