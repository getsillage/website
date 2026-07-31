import { useLocale } from '../i18n/useLocale'
import { LINKS } from '../i18n/messages'
import { linkClass, sectionLeadClass, sectionTitleClass, shellClass } from './ui'

export function Privacy() {
  const { t } = useLocale()

  return (
    <section
      id="privacy"
      className="scroll-mt-20 border-t border-gray-200/80 py-16 dark:border-gray-800/80 sm:py-24"
    >
      <div className={shellClass}>
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-16">
          <div className="max-w-xl">
            <h2 className={sectionTitleClass}>{t.privacyTitle}</h2>
            <p className={`${sectionLeadClass} leading-7`}>{t.privacyLead}</p>
            <p className="mt-6">
              <a href={LINKS.ai} className={linkClass} target="_blank" rel="noreferrer">
                {t.privacyLink} →
              </a>
            </p>
          </div>

          <div
            className="relative overflow-hidden rounded-2xl border border-brand-trail/15 bg-gradient-to-br from-white to-brand-trail/[0.045] p-5 shadow-xl shadow-gray-900/[0.05] dark:border-brand-echo/20 dark:from-gray-900 dark:to-brand-echo/[0.06] dark:shadow-black/20 sm:p-7"
            role="img"
            aria-label={t.privacyFlowLabel}
          >
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-glimmer/[0.08] blur-2xl" />
            <div className="relative rounded-xl border border-gray-200/80 bg-white/90 p-5 dark:border-gray-700 dark:bg-gray-950/75">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-brand-trail dark:text-brand-echo">
                {t.privacyFlowLocalKicker}
              </p>
              <h3 className="mt-2 text-base font-semibold text-gray-900 dark:text-gray-50">
                {t.privacyFlowLocalTitle}
              </h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                {t.privacyFlowLocalItems.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg bg-gray-100/80 px-3 py-2 text-xs font-medium text-gray-600 dark:bg-gray-900 dark:text-gray-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative flex items-center gap-3 py-4">
              <span className="h-px flex-1 border-t border-dashed border-gray-300 dark:border-gray-700" />
              <span className="rounded-full bg-gray-100 px-3 py-1 text-[0.6875rem] text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                {t.privacyFlowOptional}
              </span>
              <span className="h-px flex-1 border-t border-dashed border-gray-300 dark:border-gray-700" />
            </div>

            <div className="relative rounded-xl border border-dashed border-gray-300 bg-gray-50/80 p-5 dark:border-gray-700 dark:bg-gray-900/60">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500">
                {t.privacyFlowProviderKicker}
              </p>
              <p className="mt-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                {t.privacyFlowProviderTitle}
              </p>
            </div>
          </div>
        </div>

        <ul className="mt-12 grid border-y border-gray-200/80 dark:border-gray-800 sm:grid-cols-2 lg:grid-cols-4">
          {t.privacyItems.map((item, index) => (
            <li
              key={item.title}
              className="border-b border-gray-200/80 py-6 last:border-b-0 dark:border-gray-800 sm:px-6 sm:[&:nth-child(odd)]:border-r sm:[&:nth-child(3)]:border-b-0 lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0 lg:[&:nth-child(3)]:border-r"
            >
              <span className="font-mono text-[0.6875rem] text-brand-warm dark:text-brand-glimmer">
                0{index + 1}
              </span>
              <h3 className="mt-3 text-sm font-semibold text-gray-900 dark:text-gray-50">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
