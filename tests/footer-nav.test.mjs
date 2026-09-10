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
test('mobile footer navigation is placed below the get-in-touch text, not on top of the headline', () => {
  assert.match(patch, /findFooterText/);
  assert.match(patch, /GET IN TOUCH/);
  assert.match(patch, /--footer-nav-mobile-top/);
  assert.match(patch, /reference\.bottom - bounds\.top \+ 42/);
  assert.doesNotMatch(patch, /data-framer-name="Contact Us"/);
});
test('header navigation styling never targets footer links after scrolling', () => {
  const main = source.split('const MAIN_NAV_PATCH')[1].split('const ENGINEERING_SERVICE_PATCH')[0];
  assert.match(main, /anchor\.closest\('footer'\)/);
});
test('extra-card cleanup cannot collapse page or footer containers', () => {
  const cleanup = source.split('const EXTRA_CARD_CLEANUP_PATCH = `')[1].split('const PROCESS_TILE_IMAGE_PATCH')[0];
  assert.match(cleanup, /isProtectedContainer/);
  assert.match(cleanup, /el\.matches\('body, main, footer'\)/);
  assert.match(cleanup, /el\.querySelector\('footer'\)/);
  assert.match(cleanup, /card\.closest\('footer'\)/);
});
test('main nav project hiding cannot hide a Framer page wrapper', () => {
  const main = source.split('const MAIN_NAV_PATCH')[1].split('const ENGINEERING_SERVICE_PATCH')[0];
  assert.match(main, /function hideProjects\(anchor\)/);
  assert.match(main, /anchor\.closest\('footer'\)/);
  assert.doesNotMatch(main, /setStyle\(item, 'display', 'none'\)/);
});
test('project-card routing ignores whole-page wrappers with header or footer content', () => {
  const projects = source.split('const PROJECT_CARDS_PATCH = `')[1].split('const DESIGN_PANELS_PATCH')[0];
  assert.match(projects, /function isPageWrapper/);
  assert.match(projects, /el\.querySelector\('header, footer'\)/);
  assert.match(projects, /if \(isPageWrapper\(cursor\)\) break;/);
  assert.match(projects, /if \(isPageWrapper\(el\)\) return;/);
});
test('page visibility guard repairs accidental hidden Framer content wrapper last', () => {
  const guard = source.split('const PAGE_VISIBILITY_GUARD_PATCH = `')[1].split('export async function GET')[0];
  assert.match(guard, /data-framer-name="content"/);
  assert.match(guard, /display', 'flex', 'important'/);
  assert.match(guard, /removeAttribute\('data-nguyen-card-url'\)/);
  assert.match(source, /HERO_CTA_PATCH\}\$\{PAGE_VISIBILITY_GUARD_PATCH\}/);
});
test('page visibility guard does not run on every scroll-driven style mutation', () => {
  const guard = source.split('const PAGE_VISIBILITY_GUARD_PATCH = `')[1].split('export async function GET')[0];
  assert.doesNotMatch(guard, /subtree: true/);
  assert.doesNotMatch(guard, /observer\.observe\(document\.body/);
  assert.match(guard, /observer\.observe\(wrapper/);
  assert.match(guard, /attributeFilter: \['style'/);
  assert.match(guard, /if \(!needsRepair\) return;/);
});
test('mobile engineering row collapses leftover media area before project expertise', () => {
  const engineering = source.split('const ENGINEERING_SERVICE_PATCH = `')[1].split('const PROJECT_CARDS_PATCH')[0];
  assert.match(engineering, /nguyen-socal-engineering-service-styles/);
  assert.match(engineering, /data-nguyen-engineering-service/);
  assert.match(engineering, /data-nguyen-engineering-media/);
  assert.match(engineering, /max-height: 0/);
});
