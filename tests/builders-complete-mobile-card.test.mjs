import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const src = readFileSync(
  new URL('../app/client-demos/client-8889/arcsphere-fixed/builders-complete-patch.ts', import.meta.url),
  'utf8',
)

test('the Builders card is located by its own per-card container, never by climbing on images', () => {
  // Framer ships one copy of the card per breakpoint; the phone copy has no <img>. Climbing by image
  // count overshot the phone copy into the shared list and let the title rewrite land on the
  // neighboring Engineering card. Scoping to the card's own "…-container" <li> is contamination-proof.
  assert.match(src, /closest\('li\[class\*="-container"\]'\)/)
  assert.doesNotMatch(src, /if \(imageCount === 1\) break/)
  assert.doesNotMatch(src, /imageCount > 2/)
})

test('only the exact description leaf anchors a card (no element whose child repeats the text)', () => {
  assert.match(src, /if \(Array\.from\(candidate\.children\)\.some\(\(child\) => compact\(child\.textContent\) === key\)\) continue/)
})

test('a container spanning more than one service card is rejected', () => {
  assert.match(src, /querySelectorAll\('\[class\*="-container"\]'\)\.length > 0 && card\.querySelectorAll\('img'\)\.length > 1\) continue/)
})
