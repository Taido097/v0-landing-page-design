import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import test from 'node:test';

const source = readFileSync(new URL('../app/client-demos/client-8889/arcsphere-socal/route.ts', import.meta.url), 'utf8');
const patch = source.split('const FOOTER_NAV_PATCH = `')[1].split('const ICON_BAR_PATCH')[0];
test('footer has an independent five-link navigation, not animated text matching', () => {
  assert.match(patch, /createElement\('nav'\)/);
  assert.match(patch, /\['home', 'services', 'projects', 'process', 'contact'\]/);
  assert.match(patch, /#featured-projects/);
  assert.doesNotMatch(patch, /commonAncestor|compact\(a.textContent\)/);
});
test('replacement is scoped to footer-links with a mobile position reset', () => {
  assert.match(patch, /footer \[data-framer-name="footer-links"\]/);
  assert.match(patch, /@media \(max-width: 809px\)/);
  assert.match(patch, /left: 71.5%/);
});
test('header navigation styling never targets footer links after scrolling', () => {
  const main = source.split('const MAIN_NAV_PATCH')[1].split('const ENGINEERING_SERVICE_PATCH')[0];
  assert.match(main, /anchor\.closest\('footer'\)/);
});
