/** Fail the build when deploy-critical HTML, SEO, redirects, or headers regress. */
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { inlineScriptHashes, normalizeBase, normalizeSiteUrl } from './postbuild.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

function fail(message) {
  throw new Error(`dist check failed: ${message}`)
}

function read(relativePath) {
  const path = join(dist, relativePath)
  if (!existsSync(path)) fail(`${relativePath} is missing`)
  return readFileSync(path, 'utf8')
}

function expectIncludes(value, fragment, label) {
  if (!value.includes(fragment)) fail(`${label} is missing ${fragment}`)
}

const html = read('index.html')
const headers = read('_headers')
const notFound = read('404.html')
const robots = read('robots.txt')
const sitemap = read('sitemap.xml')
const base = normalizeBase(process.env.VITE_BASE || '/')
const siteUrl = normalizeSiteUrl(process.env.VITE_SITE_URL || process.env.SITE_URL || '')

const cspMatch = html.match(/<meta\s+http-equiv="Content-Security-Policy"\s+content="([^"]+)"\s*\/?>/i)
if (!cspMatch) fail('index.html has no CSP meta tag')
const metaCsp = cspMatch[1].replaceAll('&quot;', '"').replaceAll('&amp;', '&')
for (const required of [
  "default-src 'self'",
  "connect-src 'self' https://api.github.com",
  "object-src 'none'",
  "script-src-attr 'none'",
  "style-src-attr 'none'",
]) {
  expectIncludes(metaCsp, required, 'meta CSP')
}
if (metaCsp.includes("'unsafe-inline'") || headers.includes("'unsafe-inline'")) {
  fail('CSP must not allow unsafe-inline')
}
for (const hash of inlineScriptHashes(html)) {
  expectIncludes(metaCsp, hash, 'meta CSP')
  expectIncludes(headers, hash, 'header CSP')
}
if (/\sstyle=/.test(html)) fail('index.html contains an inline style attribute')
if (headers.includes('__SILLAGE_CSP__')) fail('CSP placeholder was not replaced')
for (const required of [
  'Content-Security-Policy:',
  "frame-ancestors 'none'",
  'Strict-Transport-Security: max-age=31536000',
  'Cross-Origin-Resource-Policy: same-origin',
  'Cache-Control: public, max-age=0, must-revalidate',
  'Cache-Control: public, max-age=31536000, immutable',
]) {
  expectIncludes(headers, required, '_headers')
}
if (/<script\b/i.test(notFound) || /<style\b/i.test(notFound) || /\sstyle=/.test(notFound)) {
  fail('404.html must not depend on inline script or style')
}
expectIncludes(notFound, `content="0; url=${base}"`, '404 redirect')
expectIncludes(notFound, `href="${base}"`, '404 home link')

if (process.env.REQUIRE_SITE_URL === '1' && !siteUrl) fail('production build requires VITE_SITE_URL')
if (siteUrl) {
  expectIncludes(html, `rel="canonical" href="${siteUrl}/"`, 'canonical URL')
  expectIncludes(html, `property="og:url" content="${siteUrl}/"`, 'Open Graph URL')
  expectIncludes(html, `property="og:image" content="${siteUrl}/og.png"`, 'Open Graph image')
  expectIncludes(html, `name="twitter:image" content="${siteUrl}/og.png"`, 'Twitter image')
  expectIncludes(robots, `Sitemap: ${siteUrl}/sitemap.xml`, 'robots.txt')
  expectIncludes(sitemap, `<loc>${siteUrl}</loc>`, 'sitemap.xml')
} else {
  expectIncludes(robots, `Sitemap: ${base}sitemap.xml`, 'robots.txt')
  expectIncludes(sitemap, `<loc>${base}</loc>`, 'sitemap.xml')
}

console.log('dist checks passed.')
