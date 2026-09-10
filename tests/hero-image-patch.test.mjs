import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

const routeSource = readFileSync(
  new URL("../app/client-demos/client-8889/arcsphere-socal/route.ts", import.meta.url),
  "utf8",
)

const heroImagePatch = routeSource.match(
  /const HERO_IMAGE_PATCH = `([\s\S]*?)`\n\n\/\/ Route hero/,
)?.[1]

test("homepage hero repair uses the same Framer hero image as desktop", () => {
  assert.ok(heroImagePatch, "expected to find HERO_IMAGE_PATCH")
  assert.match(heroImagePatch, /nguyen-socal-hero-image-patch/)
  assert.match(heroImagePatch, /header\[data-framer-name="hero-section"\]/)
  assert.match(heroImagePatch, /vVqkA2phwOpc7kzAHksLgpPasxY\.png/)
  assert.doesNotMatch(heroImagePatch, /footer-main-1728\.jpg/)
})

test("hero image repair removes responsive Framer sources and forces the layer visible", () => {
  assert.ok(heroImagePatch, "expected to find HERO_IMAGE_PATCH")
  assert.match(heroImagePatch, /removeAttribute\('srcset'\)/)
  assert.match(heroImagePatch, /removeAttribute\('sizes'\)/)
  assert.match(heroImagePatch, /opacity', '1', 'important'/)
  assert.match(heroImagePatch, /objectFit = 'cover'/)
})

test("hero image repair keeps mobile and desktop on the same hero layer without an extra mobile pseudo-image", () => {
  assert.ok(heroImagePatch, "expected to find HERO_IMAGE_PATCH")
  assert.match(heroImagePatch, /visibleHeroLayers/)
  assert.match(heroImagePatch, /\[data-framer-name="hero_img-box"\]/)
  assert.match(heroImagePatch, /desktopHeroImageUrl/)
  assert.doesNotMatch(heroImagePatch, /nguyen-socal-hero-mobile-image-style/)
  assert.doesNotMatch(heroImagePatch, /::before/)
})

test("hero image repair stabilizes left, main, and right hero images", () => {
  assert.ok(heroImagePatch, "expected to find HERO_IMAGE_PATCH")
  assert.match(heroImagePatch, /heroSlotImages/)
  assert.match(heroImagePatch, /img-left/)
  assert.match(heroImagePatch, /img-main/)
  assert.match(heroImagePatch, /img-right/)
  assert.match(heroImagePatch, /JEOoI9AUjiorAUapWVh1gnkvdBI\.png/)
  assert.match(heroImagePatch, /vVqkA2phwOpc7kzAHksLgpPasxY\.png/)
  assert.match(heroImagePatch, /eJtReq8aEIEdVjdWqNPxJAANXJQ\.jpg/)
})

test("hero image repair loads before hero CTA routing", () => {
  assert.match(routeSource, /TESTIMONIAL_PATCH\}\$\{HERO_IMAGE_PATCH\}\$\{HERO_CTA_PATCH\}/)
})

