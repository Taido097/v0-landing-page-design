import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8')

const residential = read('../app/client-demos/client-8889/residential/route.ts')
const socal = read('../app/client-demos/client-8889/arcsphere-socal/route.ts')
const footer = read('../app/client-demos/client-8889/footer-patch.ts')

// The residential page proxies a different Framer page than the homepage, and it shipped without any
// footer patching at all — so it rendered Framer's own nav links and placeholder contact details.
test('the residential proxy injects the same footer patches as the homepage proxy', () => {
  assert.match(residential, /import \{ FOOTER_PATCH, FOOTER_NAV_PATCH \} from '\.\.\/footer-patch'/)
  const injection = residential.match(/html = html\.replace\('<\/body>', `[^`]*`\)/)?.[0]
  assert.ok(injection, 'expected a </body> injection in the residential route')
  assert.match(injection, /\$\{FOOTER_PATCH\}/)
  assert.match(injection, /\$\{FOOTER_NAV_PATCH\}/)
})

test('both proxies pull the footer from the shared module rather than a local copy', () => {
  for (const source of [residential, socal]) {
    assert.match(source, /from ['"]\.\.\/footer-patch['"]/)
    assert.doesNotMatch(source, /const FOOTER_PATCH = `/)
    assert.doesNotMatch(source, /const FOOTER_NAV_PATCH = `/)
  }
})

test('the footer patch replaces every placeholder the residential page still showed', () => {
  assert.match(footer, /const NEW_PHONE = '\(714\) 707-8889/)
  assert.match(footer, /const NEW_ADDR = '7171 Warner Ave\./)
  assert.match(footer, /const NEW_EMAIL = 'info@nguyenarchitecture\.com'/)
  // The UAE placeholder phone Framer swapped in, alongside the older Indonesian one.
  assert.match(footer, /'971559876543'/)
  // The residential page rebrands Dubai -> Southern California client-side before the footer patch
  // runs, so the address matcher has to catch the rewritten form too.
  assert.match(footer, /'southerncalifornia,uae'/)
  // hello@arcspherestudio.ae is rendered as plain text, not only as a mailto href.
  assert.match(footer, /OLD_EMAIL_RE/)
})
