import { SITE } from '../config/site'

export type ReleaseInfo = {
  tag: string
  name: string
  htmlUrl: string
}

/** One-command local install. Docker pulls the image when needed. */
export function dockerSnippet(): string {
  return `docker run --rm \\
  -p 127.0.0.1:5231:5231 \\
  -v "$HOME/.sillage:/var/opt/sillage" \\
  ghcr.io/getsillage/sillage:latest`
}

export function fallbackRelease(): ReleaseInfo {
  return {
    tag: SITE.defaultReleaseTag,
    name: `Sillage ${SITE.defaultReleaseTag}`,
    htmlUrl: `https://github.com/${SITE.productRepo}/releases/tag/${SITE.defaultReleaseTag}`,
  }
}

/** Fetch the latest GitHub release; fall back to the pinned default tag. */
export async function fetchLatestRelease(signal?: AbortSignal): Promise<ReleaseInfo> {
  const fallback = fallbackRelease()
  try {
    const res = await fetch(
      `https://api.github.com/repos/${SITE.productRepo}/releases/latest`,
      {
        headers: { Accept: 'application/vnd.github+json' },
        signal,
      },
    )
    if (!res.ok) return fallback
    const data = (await res.json()) as {
      tag_name?: string
      name?: string
      html_url?: string
      draft?: boolean
      prerelease?: boolean
    }
    if (!data.tag_name || data.draft || data.prerelease) return fallback
    return {
      tag: data.tag_name,
      name: data.name || `Sillage ${data.tag_name}`,
      htmlUrl: data.html_url || fallback.htmlUrl,
    }
  } catch {
    return fallback
  }
}
