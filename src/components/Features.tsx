import { useLocale } from '../i18n/useLocale'
import { sectionLeadClass, sectionTitleClass, shellClass } from './ui'

export function Features() {
  const { t } = useLocale()

  return (
    <section
      id="features"
      className="scroll-mt-20 border-t border-gray-200/80 bg-white/55 py-16 dark:border-gray-800/80 dark:bg-gray-950/35 sm:py-24"
    >
      <div className={shellClass}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(26rem,0.8fr)] lg:items-end">
          <div className="max-w-2xl">
            <h2 className={sectionTitleClass}>{t.featuresTitle}</h2>
            <p className={sectionLeadClass}>{t.featuresLead}</p>
          </div>
          <dl className="grid grid-cols-3 divide-x divide-gray-200/80 border-y border-gray-200/80 py-4 dark:divide-gray-800 dark:border-gray-800">
            {t.facts.map((fact) => (
              <div key={fact.label} className="px-3 first:pl-0 last:pr-0 sm:px-5">
                <dt className="text-2xl font-semibold tracking-tight text-brand-trail dark:text-brand-echo">
                  {fact.value}
                </dt>
                <dd className="mt-1 text-[0.6875rem] leading-4 text-gray-500 dark:text-gray-400">
                  {fact.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <ul className="mt-12 grid overflow-hidden rounded-2xl border border-gray-200/80 bg-gray-200/80 shadow-sm shadow-gray-900/[0.03] dark:border-gray-800 dark:bg-gray-800 sm:grid-cols-2 lg:grid-cols-3">
          {t.features.map((feature, index) => (
            <li
              key={feature.title}
              className="feature-card min-h-52 bg-white p-6 dark:bg-gray-900 sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-xs text-brand-warm dark:text-brand-glimmer">
                  0{index + 1}
                </span>
                <span
                  className="h-2 w-2 rounded-full border border-brand-trail/25 bg-brand-trail/10 dark:border-brand-echo/30 dark:bg-brand-echo/15"
                  aria-hidden
                />
              </div>
              <h3 className="mt-12 text-base font-semibold tracking-tight text-gray-900 dark:text-gray-50">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                {feature.body}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-6 rounded-2xl bg-gray-950 px-6 py-8 text-white dark:bg-black sm:px-8 sm:py-9 lg:grid lg:grid-cols-[0.65fr_1.35fr] lg:gap-12">
          <div>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-brand-glimmer">
              {t.notTitle}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-gray-400">{t.notLead}</p>
          </div>
          <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:mt-0">
            {t.notItems.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm leading-6 text-gray-300">
                <span className="mt-2 h-px w-3 flex-none bg-brand-glimmer/70" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
