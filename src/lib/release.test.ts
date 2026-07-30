import { describe, expect, it, vi } from 'vitest'
import { dockerSnippet, fallbackRelease, fetchLatestRelease } from './release'

describe('release helpers', () => {
  it('keeps the quick start aligned with the documented local-only deployment', () => {
    expect(dockerSnippet()).toBe(`docker run --rm \\
  -p 127.0.0.1:5231:5231 \\
  -v "$HOME/.sillage:/var/opt/sillage" \\
  ghcr.io/getsillage/sillage:latest`)
  })

  it('uses a valid final GitHub release', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        tag_name: 'v1.2.3',
        name: 'Sillage v1.2.3',
        html_url: 'https://github.com/getsillage/sillage/releases/tag/v1.2.3',
      }),
    } as Response)

    await expect(fetchLatestRelease()).resolves.toEqual({
      tag: 'v1.2.3',
      name: 'Sillage v1.2.3',
      htmlUrl: 'https://github.com/getsillage/sillage/releases/tag/v1.2.3',
    })
  })

  it('falls back for network errors and prereleases', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error('offline'))
    await expect(fetchLatestRelease()).resolves.toEqual(fallbackRelease())

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ tag_name: 'v2.0.0-rc.1', prerelease: true }),
    } as Response)
    await expect(fetchLatestRelease()).resolves.toEqual(fallbackRelease())
  })
})
