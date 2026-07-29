import { useEffect, useState } from 'react'
import { useLocale } from '../i18n/useLocale'
import { LINKS } from '../i18n/messages'
import {
  dockerSnippet,
  fallbackRelease,
  fetchLatestRelease,
  type ReleaseInfo,
} from '../lib/release'
import { secondaryButtonClass, sectionLeadClass, sectionTitleClass, shellClass } from './ui'

export function Deploy() {
  const { t } = useLocale()
  const [release, setRelease] = useState<ReleaseInfo>(() => fallbackRelease())
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const ac = new AbortController()
    void fetchLatestRelease(ac.signal).then(setRelease)
    return () => ac.abort()
  }, [])

  const snippet = dockerSnippet()

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(snippet)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* ignore */
    }
  }

  return (
    <section
      id="deploy"
      className="scroll-mt-20 border-t border-gray-200/80 py-16 sm:py-20 dark:border-gray-800/80"
    >
      <div className={shellClass}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className={sectionTitleClass}>{t.deployTitle}</h2>
            <p className={sectionLeadClass}>{t.deployLead}</p>
          </div>
          <a
            href={release.htmlUrl}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
            target="_blank"
            rel="noreferrer"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
            {t.deployLatest}: {release.tag}
          </a>
        </div>

        <div className="relative mt-8">
          <pre className="code-block" tabIndex={0}>
            <code>{snippet}</code>
          </pre>
          <button
            type="button"
            onClick={handleCopy}
            className="absolute right-3 top-3 inline-flex h-8 items-center rounded-md border border-gray-700 bg-gray-800 px-2.5 text-xs font-medium text-gray-100 transition hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400/50"
          >
            {copied ? t.copied : t.copyCode}
          </button>
        </div>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          {t.deployNote}
        </p>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          {t.deployOpen}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={LINKS.deployment}
            className={secondaryButtonClass}
            target="_blank"
            rel="noreferrer"
          >
            {t.deployDocs}
          </a>
          <a href={LINKS.releases} className={secondaryButtonClass} target="_blank" rel="noreferrer">
            {t.deployReleases}
          </a>
        </div>
      </div>
    </section>
  )
}
