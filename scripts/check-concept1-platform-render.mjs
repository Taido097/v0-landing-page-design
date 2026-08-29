import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const socalRoutePath = path.join(root, 'app/client-demos/client-8889/arcsphere-socal/route.ts')
const baseRoutePath = path.join(root, 'app/client-demos/client-8889/arcsphere/route.ts')
const socalSource = fs.readFileSync(socalRoutePath, 'utf8')
const baseSource = fs.readFileSync(baseRoutePath, 'utf8')

function requireText(source, text, message) {
  if (!source.includes(text)) {
    console.error(`FAIL: ${message}`)
    process.exit(1)
  }
}

requireText(socalSource, 'const MOBILE_RENDER_FAILSAFE =', 'Concept 1 must define a phone/tablet render failsafe')
requireText(socalSource, '@media (max-width: 1024px)', 'phone/tablet failsafe must cover tablet-width viewports')
requireText(socalSource, '#main [style*="opacity:0"]', 'phone/tablet failsafe must target Framer wrappers stuck at opacity:0')
requireText(socalSource, 'opacity: 1 !important;', 'phone/tablet failsafe must force stuck Framer wrappers visible')
requireText(socalSource, '${MOBILE_RENDER_FAILSAFE}', 'phone/tablet failsafe must be injected into Concept 1 HTML')

requireText(baseSource, 'const MOBILE_APPEAR_FAILSAFE =', 'base Framer proxy must include the proven mobile appear failsafe')
requireText(baseSource, 'const MOBILE_REVEAL_SCRIPT =', 'base Framer proxy must include the computed-style mobile reveal script')
requireText(baseSource, "window.matchMedia('(max-width: 809.98px)').matches", 'computed-style reveal must run on mobile widths')
requireText(baseSource, "if (cs.visibility === 'hidden') el.style.setProperty('visibility', 'visible', 'important');", 'computed-style reveal must recover visibility-hidden content')
requireText(baseSource, "if (parseFloat(cs.opacity) < 0.99)", 'computed-style reveal must recover class-driven opacity')
requireText(baseSource, "html = html.replace(/<base\\b[^>]*>/i, `<base href=\"${SOURCE_URL}\">`);", 'Framer base URL must be restored after branding replacements')
requireText(baseSource, '${CLIENT_PATCH}${MOBILE_REVEAL_SCRIPT}</body>', 'computed-style mobile reveal script must be shipped in the base response')

console.log('PASS: Concept 1 cross-platform rendering protections are present and injected')
