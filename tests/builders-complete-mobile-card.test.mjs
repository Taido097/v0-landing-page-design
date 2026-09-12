import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const src = readFileSync(
  new URL('../app/client-demos/client-8889/arcsphere-fixed/builders-complete-patch.ts', import.meta.url),
  'utf8',
)

test('the Builders card patch finds the card by boundary, not by anchoring the climb on an image', () => {
  // Framer ships one DOM copy per breakpoint and the phone copy has no <img>; anchoring the climb on
  // an image (the old `imageCount === 1` break) overshot into the sibling row on phones, leaving the
  // mobile card unconverted. The climb must be capped by an isTooBroad boundary guard instead.
  assert.match(src, /function isTooBroad\(el\)/)
  assert.match(src, /while \(node\.parentElement && !isTooBroad\(node\.parentElement\)\) node = node\.parentElement/)
  assert.doesNotMatch(src, /if \(imageCount === 1\) break/)
})

test('isTooBroad rejects the surrounding row / section but allows a single card', () => {
  const fn = src.match(/function isTooBroad\(el\)\{?[\s\S]*?\n {2}\}/)?.[0] ?? src
  assert.match(fn, /body, main, header, footer, nav/)
  assert.match(fn, /querySelector\('header, footer, section'\)/)
  assert.match(fn, /h1,h2,h3,h4,h5,h6'\)\.length : 0\) > 1/)
  assert.match(fn, /img'\)\.length : 0\) > 2/)
})

test('the title replacement converts every stale copy inside the card (mobile can carry a duplicate title line)', () => {
  assert.match(src, /const originalTitle = normalize\(title\.textContent\)/)
  assert.match(src, /card\.querySelectorAll\('h1,h2,h3,h4,h5,h6,p,span,div'\)\.forEach/)
})
