import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';

const dist = resolve('dist');
const paths = [];
function walk(dir) { for (const name of readdirSync(dir)) { const path = join(dir, name); if (statSync(path).isDirectory()) walk(path); else if (name.endsWith('.html')) paths.push(path); } }
walk(dist);
assert(paths.length >= 15, 'Expected all public pages to be built');
const titles = new Set();
let linkCount = 0;
for (const path of paths) {
  const html = readFileSync(path, 'utf8');
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  assert(title && !titles.has(title), `Missing/duplicate title in ${path}`); titles.add(title);
  assert.match(html, /<meta name="description" content="[^"]{25,}"/, path);
  assert.match(html, /<link rel="canonical" href="https:\/\/thecircadianhospital.com\//, path);
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `Expected one h1: ${path}`);
  assert.match(html, /href="tel:\+918512040000"/);
  for (const script of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    const data = JSON.parse(script[1]);
    assert(Array.isArray(data) && data[0]['@type'] === 'Hospital');
    assert.equal(data[0].telephone, '+918512040000');
    assert(!data[0].aggregateRating, 'Do not invent ratings');
  }
  for (const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    const href = decodeURIComponent(match[1]);
    if (href.startsWith('//')) continue;
    const target = join(dist, href);
    assert(existsSync(target) || existsSync(join(target, 'index.html')), `Broken local reference ${href} in ${path}`);
    linkCount++;
  }
  assert.match(html, new RegExp(`name="robots" content="${process.env.PUBLIC_INDEXABLE === 'true' ? 'index, follow' : 'noindex, nofollow'}`), path);
}
const robots = readFileSync(join(dist, 'robots.txt'), 'utf8');
assert(robots.includes(process.env.PUBLIC_INDEXABLE === 'true' ? 'Allow: /' : 'Disallow: /'));
assert.match(readFileSync(join(dist, 'sitemap.xml'), 'utf8'), /https:\/\/thecircadianhospital.com\/dip-diet\//);
console.log(`PASS: ${paths.length} HTML pages, unique metadata, structured data, ${linkCount} local references and ${process.env.PUBLIC_INDEXABLE === 'true' ? 'production' : 'preview'} indexing policy.`);
