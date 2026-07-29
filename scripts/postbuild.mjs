/**
 * Finalize dist/ for production hosts:
 * - rewrite robots.txt + sitemap.xml with absolute SITE URL
 * - inject absolute og:url / canonical / og:image into index.html when VITE_SITE_URL is set
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const siteUrl = (process.env.VITE_SITE_URL || process.env.SITE_URL || '').replace(/\/$/, '')

if (!existsSync(dist)) {
  console.error('dist/ missing — run vite build first')
  process.exit(1)
}

const robots = siteUrl
  ? `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
  : `User-agent: *\nAllow: /\n\nSitemap: /sitemap.xml\n`

const lastmod = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl || '/'}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`

writeFileSync(join(dist, 'robots.txt'), robots)
writeFileSync(join(dist, 'sitemap.xml'), sitemap)

const indexPath = join(dist, 'index.html')
if (siteUrl && existsSync(indexPath)) {
  let html = readFileSync(indexPath, 'utf8')
  // Absolute OG image for crawlers (matches any base-prefixed path to og.png)
  html = html.replace(
    /content="[^"]*\/og\.png"/g,
    `content="${siteUrl}/og.png"`,
  )
  if (!html.includes('rel="canonical"')) {
    html = html.replace(
      '</head>',
      `    <link rel="canonical" href="${siteUrl}/" />\n    <meta property="og:url" content="${siteUrl}/" />\n  </head>`,
    )
  }
  writeFileSync(indexPath, html)
  console.log(`postbuild: site URL → ${siteUrl}`)
} else {
  console.log('postbuild: no VITE_SITE_URL; robots/sitemap use relative paths')
}

console.log('postbuild: ok')
