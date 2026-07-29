import { useLocale } from '../i18n/LocaleContext'
import { panelClass, sectionLeadClass, sectionTitleClass, shellClass } from './ui'

export function Features() {
  const { t } = useLocale()

  return (
    <section id="features" className="scroll-mt-20 border-t border-gray-200/80 py-16 sm:py-20 dark:border-gray-800/80">
      <div className={shellClass}>
        <div className="max-w-2xl">
          <h2 className={sectionTitleClass}>{t.featuresTitle}</h2>
          <p className={sectionLeadClass}>{t.featuresLead}</p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.features.map((feature) => (
            <li key={feature.title} className={panelClass}>
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-50">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                {feature.body}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-xl border border-dashed border-gray-300 bg-gray-100/40 px-5 py-8 dark:border-gray-700 dark:bg-gray-900/40 sm:px-8">
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-50">{t.notTitle}</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{t.notLead}</p>
          <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {t.notItems.map((item) => (
              <li
                key={item}
                className="flex gap-2.5 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-brand-warm/80 dark:bg-brand-glimmer/70"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
