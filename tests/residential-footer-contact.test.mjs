import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const source = readFileSync(
  new URL('../app/client-demos/client-8889/residential/route.ts', import.meta.url),
  'utf8',
)
const patch = source.split('const FOOTER_CONTACT_PATCH = `')[1].split('</script>`')[0]

// An earlier attempt injected the homepage's footer-nav patch here. That patch hides Framer's own
// footer links and replaces them with a nav positioned at left:71.5%, tuned to a different footer —
// it blanked the residential footer on desktop and mobile alike. This patch must only rewrite text.
test('the footer contact patch never hides, moves or rebuilds any footer content', () => {
  for (const forbidden of [
    /visibility/i,
    /display/i,
    /position/i,
    /setProperty/,
    /innerHTML/,
    /removeChild/,
    /\.remove\(\)/,
    /createElement/,
    /aria-hidden/,
    /\binert\b/,
    /<style/i,
  ]) {
    assert.doesNotMatch(patch, forbidden, `patch must not touch presentation: ${forbidden}`)
  }
})

test('the patch only ever reads the DOM inside a footer', () => {
  assert.match(patch, /document\.querySelectorAll\('footer'\)\.forEach\(fix\)/)
  assert.match(patch, /createTreeWalker\(footer, NodeFilter\.SHOW_TEXT\)/)
  assert.match(patch, /footer\.querySelectorAll\('a\[href\^="mailto:"\]'\)/)
  // Nothing may be queried from document/body scope beyond collecting the footers themselves.
  const docQueries = patch.match(/document\.querySelectorAll\([^)]*\)/g) || []
  assert.deepEqual(docQueries, ["document.querySelectorAll('footer')"])
})

test('the patch is injected on mobile only, so desktop is untouched', () => {
  assert.match(source, /const footerContact = mobile \? FOOTER_CONTACT_PATCH : ''/)
  assert.match(source, /\$\{CLIENT_REBRAND\}\$\{SQFT_GUIDE_PATCH\}\$\{footerContact\}<\/body>/)
})

test('its observer is debounced and disconnects, so a mobile scroll cannot thrash it', () => {
  assert.match(patch, /clearTimeout\(timer\); timer = setTimeout\(run, 200\)/)
  assert.match(patch, /setTimeout\(\(\) => observer\.disconnect\(\), 30000\)/)
})

// --- behaviour, against a minimal DOM stub -------------------------------------------------------

function textNode(value) {
  return { nodeValue: value, childNodes: [] }
}
function element(tag, children = [], attrs = {}) {
  return { tag, childNodes: children, attrs }
}

function runPatch(footerChildren) {
  const footer = element('footer', footerChildren)

  const texts = []
  const anchors = []
  ;(function walk(node) {
    for (const child of node.childNodes) {
      if (child.nodeValue !== undefined) texts.push(child)
      else {
        if (child.tag === 'a' && (child.attrs.href || '').startsWith('mailto:')) anchors.push(child)
        walk(child)
      }
    }
  })(footer)

  let i = 0
  const doc = {
    createTreeWalker: () => ({ nextNode: () => (i < texts.length ? texts[i++] : null) }),
    querySelectorAll: (sel) => (sel === 'footer' ? [footer] : []),
    body: footer,
  }
  footer.querySelectorAll = (sel) =>
    sel === 'a[href^="mailto:"]' ? anchors.map((a) => ({
      getAttribute: (k) => a.attrs[k] ?? null,
      setAttribute: (k, v) => { a.attrs[k] = v },
    })) : []

  // `patch` is raw file text, so escapes are still doubled as the TS template literal writes them.
  // Evaluate it as that template literal to get the exact script the browser receives.
  const evaluated = new Function('return `' + patch + '`')()
  const script = evaluated.replace(/^\s*<script[^>]*>/, '')
  const fn = new Function(
    'document', 'NodeFilter', 'window', 'MutationObserver', 'setTimeout', 'clearTimeout',
    script,
  )
  fn(
    doc,
    { SHOW_TEXT: 4 },
    { addEventListener() {} },
    class { observe() {} disconnect() {} },
    () => 0,
    () => {},
  )

  return { texts, anchors }
}

test('it replaces the placeholder phone, address and email the residential footer showed', () => {
  const email = element('a', [textNode('hello@arcspherestudio.ae')], { href: 'mailto:hello@arcspherestudio.ae' })
  const { texts, anchors } = runPatch([
    element('span', [textNode('+971 55 987 6543')]),
    element('span', [textNode('Dubai, UAE')]),
    element('p', [email]),
  ])

  const values = texts.map((t) => t.nodeValue)
  assert.ok(values.includes('(714) 707-8889  ·  (209) 233-8888'), `phone not replaced: ${values}`)
  assert.ok(values.includes('7171 Warner Ave., Ste. B, Huntington Beach, CA 92647'), `address not replaced: ${values}`)
  assert.ok(values.includes('info@nguyenarchitecture.com'), `email text not replaced: ${values}`)
  assert.equal(anchors[0].attrs.href, 'mailto:info@nguyenarchitecture.com')
})

test('it also catches the forms the client-side rebrand rewrites before it runs', () => {
  // CLIENT_REBRAND maps Dubai -> Southern California and ArcSphere -> NGUYEN, so by the time this
  // patch runs the placeholders can already be half-rewritten.
  const { texts } = runPatch([
    element('span', [textNode('Southern California, UAE')]),
    element('span', [textNode('hello@NGUYENstudio.ae')]),
  ])
  const values = texts.map((t) => t.nodeValue)
  assert.ok(values.includes('7171 Warner Ave., Ste. B, Huntington Beach, CA 92647'), `address not replaced: ${values}`)
  assert.ok(values.includes('info@nguyenarchitecture.com'), `email not replaced: ${values}`)
})

test('it leaves the footer nav links and every other footer node exactly as Framer rendered them', () => {
  const nav = ['Home', 'About', 'Services', 'Projects', 'Process', 'Contact', 'Pinterest']
  const { texts } = runPatch([
    element('nav', nav.map((label) => element('a', [textNode(label)], { href: '/x' }))),
    element('span', [textNode('© 2025 NGUYEN ARCHITECTURE')]),
    element('span', [textNode('+971 55 987 6543')]),
  ])
  const values = texts.map((t) => t.nodeValue)
  for (const label of nav) assert.ok(values.includes(label), `footer nav link "${label}" was modified`)
  assert.ok(values.includes('© 2025 NGUYEN ARCHITECTURE'))
})
