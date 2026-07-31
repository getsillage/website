import { useEffect, useRef, useState } from 'react'
import { useLocale } from '../i18n/useLocale'
import { LINKS } from '../i18n/messages'
import {
  dockerSnippet,
  fallbackRelease,
  fetchLatestRelease,
  type ReleaseInfo,
} from '../lib/release'
import { sectionLeadClass, sectionTitleClass, shellClass } from './ui'

export function Deploy() {
  const { t } = useLocale()
  const [release, setRelease] = useState<ReleaseInfo>(() => fallbackRelease())
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle')
  const copyResetTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    const ac = new AbortController()
    void fetchLatestRelease(ac.signal).then((next) => {
      if (!ac.signal.aborted) setRelease(next)
    })
    return () => {
      ac.abort()
      if (copyResetTimer.current !== undefined) window.clearTimeout(copyResetTimer.current)
    }
  }, [])

  const snippet = dockerSnippet()

  async function handleCopy() {
    if (copyResetTimer.current !== undefined) window.clearTimeout(copyResetTimer.current)
    try {
      await navigator.clipboard.writeText(snippet)
      setCopyStatus('copied')
    } catch {
      setCopyStatus('failed')
    }
    copyResetTimer.current = window.setTimeout(() => setCopyStatus('idle'), 2000)
  }

  const copyLabel =
    copyStatus === 'copied' ? t.copied : copyStatus === 'failed' ? t.copyFailed : t.copyCode

  return (
    <section
      id="deploy"
      className="scroll-mt-20 border-t border-gray-200/80 py-16 dark:border-gray-800/80 sm:py-24"
    >
      <div className={shellClass}>
        <div className="relative overflow-hidden rounded-3xl bg-gray-950 px-6 py-8 text-white shadow-2xl shadow-gray-900/10 dark:bg-black sm:px-8 sm:py-10 lg:px-12 lg:py-12">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-trail/25 blur-3xl" />
          <div className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-brand-glimmer/10 blur-3xl" />

          <div className="relative flex flex-wrap items-end justify-between gap-5">
            <div className="max-w-2xl">
              <h2 className={`${sectionTitleClass} !text-white`}>{t.deployTitle}</h2>
              <p className={`${sectionLeadClass} !text-gray-400`}>{t.deployLead}</p>
            </div>
            <a
              href={release.htmlUrl}
              className="inline-flex items-center gap-2 rounded-full border border-gray-700 bg-gray-900/80 px-3 py-1.5 text-xs font-medium text-gray-200 transition hover:border-gray-600 hover:bg-gray-800"
              target="_blank"
              rel="noreferrer"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
              {t.deployLatest}: {release.tag}
            </a>
          </div>

          <div className="relative mt-10 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-12">
            <ol className="space-y-6">
              {t.deploySteps.map((step, index) => (
                <li key={step.title} className="grid grid-cols-[2rem_1fr] gap-3">
                  <span className="font-mono text-xs text-brand-glimmer">0{index + 1}</span>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-gray-400">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div>
              <div className="relative">
                <pre className="code-block border-gray-800 bg-black/60" tabIndex={0}>
                  <code>{snippet}</code>
                </pre>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="absolute right-3 top-3 inline-flex h-8 items-center rounded-md border border-gray-700 bg-gray-800 px-2.5 text-xs font-medium text-gray-100 transition hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400/50"
                >
                  {copyLabel}
                </button>
                <span className="sr-only" role="status" aria-live="polite">
                  {copyStatus === 'idle' ? '' : copyLabel}
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-400">{t.deployOpen}</p>
            </div>
          </div>

          <div className="relative mt-9 flex flex-col gap-5 border-t border-gray-800 pt-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-xs leading-5 text-gray-500">{t.deployNote}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={LINKS.deployment}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-white px-5 text-sm font-medium text-gray-950 transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                target="_blank"
                rel="noreferrer"
              >
                {t.deployDocs}
              </a>
              <a
                href={LINKS.releases}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-gray-700 bg-gray-900 px-5 text-sm font-medium text-gray-100 transition hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500/50"
                target="_blank"
                rel="noreferrer"
              >
                {t.deployReleases}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
