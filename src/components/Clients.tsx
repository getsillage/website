import { useLocale } from '../i18n/useLocale'
import { LINKS } from '../i18n/messages'
import { linkClass, sectionLeadClass, sectionTitleClass, shellClass } from './ui'

export function Clients() {
  const { t } = useLocale()

  return (
    <section
      id="clients"
      className="scroll-mt-20 border-t border-gray-200/80 bg-white/55 py-16 dark:border-gray-800/80 dark:bg-gray-950/35 sm:py-24"
    >
      <div className={shellClass}>
        <div className="max-w-2xl">
          <h2 className={sectionTitleClass}>{t.clientsTitle}</h2>
          <p className={sectionLeadClass}>{t.clientsLead}</p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <article className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm shadow-gray-900/[0.04] dark:border-gray-800 dark:bg-gray-900">
            <WebVisual />
            <div className="p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-50">
                  {t.clientsWebTitle}
                </h3>
                <span className="rounded-full bg-brand-trail/10 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-brand-trail dark:bg-brand-echo/10 dark:text-brand-echo">
                  Docker
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
                {t.clientsWebBody}
              </p>
              <ClientPoints points={t.clientsWebPoints} />
              <p className="mt-5">
                <a href={LINKS.docs} className={linkClass} target="_blank" rel="noreferrer">
                  {t.ctaDocs} →
                </a>
              </p>
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm shadow-gray-900/[0.04] dark:border-gray-800 dark:bg-gray-900">
            <AndroidVisual />
            <div className="p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-50">
                  {t.clientsAndroidTitle}
                </h3>
                <span className="rounded-full bg-brand-glimmer/10 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-brand-warm dark:text-brand-glimmer">
                  Native
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
                {t.clientsAndroidBody}
              </p>
              <ClientPoints points={t.clientsAndroidPoints} />
              <p className="mt-5">
                <a href={LINKS.android} className={linkClass} target="_blank" rel="noreferrer">
                  {t.ctaAndroid} →
                </a>
              </p>
            </div>
          </article>
        </div>

        <p className="mt-8 text-center text-xs tracking-wide text-gray-400 dark:text-gray-500">
          {t.clientsStack}
        </p>
      </div>
    </section>
  )
}

function ClientPoints({ points }: { points: string[] }) {
  return (
    <ul className="mt-5 space-y-2.5">
      {points.map((point) => (
        <li key={point} className="flex items-start gap-2.5 text-xs leading-5 text-gray-600 dark:text-gray-300">
          <span className="mt-2 h-1 w-1 flex-none rounded-full bg-brand-glimmer" aria-hidden />
          {point}
        </li>
      ))}
    </ul>
  )
}

function WebVisual() {
  return (
    <div className="h-48 border-b border-gray-200/80 bg-gray-100/70 p-5 dark:border-gray-800 dark:bg-gray-950/60" aria-hidden>
      <div className="mx-auto h-full max-w-md overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg shadow-gray-900/[0.06] dark:border-gray-700 dark:bg-gray-900">
        <div className="flex h-7 items-center gap-1.5 border-b border-gray-100 px-2.5 dark:border-gray-800">
          <span className="h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-gray-700" />
          <span className="h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-gray-700" />
          <span className="ml-2 h-2 w-20 rounded bg-gray-100 dark:bg-gray-800" />
        </div>
        <div className="grid h-[calc(100%_-_1.75rem)] grid-cols-[5.5rem_1fr]">
          <div className="border-r border-gray-100 bg-gray-50 p-2 dark:border-gray-800 dark:bg-gray-950">
            <div className="h-2 w-12 rounded bg-brand-trail/25 dark:bg-brand-echo/25" />
            <div className="mt-4 h-2 w-full rounded bg-gray-200 dark:bg-gray-800" />
            <div className="mt-2 h-2 w-4/5 rounded bg-gray-200/70 dark:bg-gray-800/70" />
          </div>
          <div className="p-3">
            <div className="h-2 w-16 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mt-3 h-11 rounded-lg border border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-950" />
            <div className="mt-3 h-2 w-full rounded bg-gray-100 dark:bg-gray-800" />
            <div className="mt-2 h-2 w-3/4 rounded bg-gray-100 dark:bg-gray-800" />
          </div>
        </div>
      </div>
    </div>
  )
}

function AndroidVisual() {
  return (
    <div className="relative h-48 overflow-hidden border-b border-gray-200/80 bg-gradient-to-br from-brand-trail/[0.08] to-brand-glimmer/[0.08] dark:border-gray-800 dark:from-brand-echo/10 dark:to-brand-glimmer/5" aria-hidden>
      <div className="absolute left-1/2 top-5 h-52 w-28 -translate-x-1/2 rounded-[1.4rem] border-[5px] border-gray-900 bg-white p-2 shadow-xl shadow-gray-900/15 dark:border-gray-700 dark:bg-gray-900">
        <div className="mx-auto h-1 w-8 rounded-full bg-gray-300 dark:bg-gray-700" />
        <div className="mt-4 h-2 w-12 rounded bg-brand-trail/25 dark:bg-brand-echo/25" />
        <div className="mt-4 h-12 rounded-md border border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-950" />
        <div className="mt-3 h-2 w-full rounded bg-gray-100 dark:bg-gray-800" />
        <div className="mt-2 h-2 w-4/5 rounded bg-gray-100 dark:bg-gray-800" />
        <div className="mt-5 flex justify-between">
          <span className="h-2 w-2 rounded-full bg-brand-glimmer" />
          <span className="h-2 w-2 rounded-full bg-gray-200 dark:bg-gray-700" />
          <span className="h-2 w-2 rounded-full bg-gray-200 dark:bg-gray-700" />
          <span className="h-2 w-2 rounded-full bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  )
}
