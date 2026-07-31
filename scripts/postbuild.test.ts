// @vitest-environment node
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import {
  contentSecurityPolicy,
  finalizeBuild,
  inlineScriptHashes,
  normalizeBase,
} from './postbuild.mjs'

const temporaryDirectories: string[] = []

function fixtureDist() {
  const root = mkdtempSync(join(tmpdir(), 'sillage-site-'))
  temporaryDirectories.push(root)
  const dist = join(root, 'dist')
  mkdirSync(dist)
  writeFileSync(
    join(dist, 'index.html'),
    `<!doctype html><html><head><meta charset="UTF-8" /><meta property="og:image" content="/og.png" /><meta name="twitter:image" content="/og.png" /><script>window.first = true</script><script type="application/ld+json">{"name":"Sillage"}</script></head><body></body></html>`,
  )
  writeFileSync(
    join(dist, '_headers'),
    `/*\n  Content-Security-Policy: __SILLAGE_CSP__\n  Strict-Transport-Security: max-age=31536000\n`,
  )
  return dist
}

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) rmSync(directory, { recursive: true })
})

describe('postbuild', () => {
  it('normalizes deploy base paths', () => {
    expect(normalizeBase('')).toBe('/')
    expect(normalizeBase('website')).toBe('/website/')
    expect(normalizeBase('/website/')).toBe('/website/')
  })

  it('generates script hashes without unsafe-inline', () => {
    const html = '<script>window.ready = true</script>'
    const hashes = inlineScriptHashes(html)
    expect(hashes).toHaveLength(1)
    expect(contentSecurityPolicy(html)).toContain(hashes[0])
    expect(contentSecurityPolicy(html)).not.toContain("'unsafe-inline'")
  })

  it('writes absolute SEO URLs, deploy-aware 404s, and matching CSP hashes', () => {
    const dist = fixtureDist()
    const result = finalizeBuild({
      dist,
      siteUrl: 'https://getsillage.github.io',
      base: '/',
      requireSiteUrl: true,
      now: new Date('2026-07-30T00:00:00Z'),
    })
    const html = readFileSync(join(dist, 'index.html'), 'utf8')
    const headers = readFileSync(join(dist, '_headers'), 'utf8')
    const notFound = readFileSync(join(dist, '404.html'), 'utf8')

    expect(result.siteUrl).toBe('https://getsillage.github.io')
    expect(html).toContain('rel="canonical" href="https://getsillage.github.io/"')
    expect(html).toContain(
      'property="og:image" content="https://getsillage.github.io/og.png"',
    )
    for (const hash of inlineScriptHashes(html)) expect(headers).toContain(hash)
    expect(headers).not.toContain('__SILLAGE_CSP__')
    expect(notFound).toContain('content="0; url=/"')
    expect(notFound).not.toMatch(/<script\b|<style\b|\sstyle=/)
    expect(readFileSync(join(dist, 'sitemap.xml'), 'utf8')).toContain(
      '<loc>https://getsillage.github.io</loc>',
    )
  })

  it('fails closed when production URL and base do not match', () => {
    const dist = fixtureDist()
    expect(() =>
      finalizeBuild({
        dist,
        siteUrl: 'https://example.com/subpath',
        base: '/',
        requireSiteUrl: true,
      }),
    ).toThrow('must match VITE_BASE')
  })
})
