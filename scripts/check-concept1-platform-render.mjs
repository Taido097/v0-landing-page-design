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

requireText("const SOURCE_URL = 'https://arcsphere-studio.framer.website/'", 'Concept 1 wrapper must know the original Framer source URL')
requireText('const MOBILE_RENDER_FAILSAFE =', 'Concept 1 must define a phone/tablet render failsafe')
requireText('@media (max-width: 1024px)', 'phone/tablet failsafe must cover tablet-width viewports')
requireText('#main [style*="opacity:0"]', 'phone/tablet failsafe must target Framer wrappers stuck at opacity:0')
requireText('const MOBILE_REVEAL_SCRIPT =', 'Concept 1 must include the computed-style reveal used by the proven mobile fix')
requireText("window.matchMedia('(max-width: 1024px)').matches", 'computed-style reveal must run on phones and tablets')
requireText("if (cs.visibility === 'hidden') el.style.setProperty('visibility', 'visible', 'important');", 'computed-style reveal must recover visibility-hidden content')
requireText("if (parseFloat(cs.opacity) < 0.99)", 'computed-style reveal must recover class-driven opacity')
requireText("html = html.replace(/<base\\b[^>]*>/i, `<base href=\"${SOURCE_URL}\">`)", 'Framer base URL must be restored after branding replacements')
requireText('${MOBILE_RENDER_FAILSAFE}${MOBILE_REVEAL_SCRIPT}', 'both mobile rendering protections must be injected into Concept 1 HTML')

console.log('PASS: Concept 1 cross-platform rendering protections are present and injected')
