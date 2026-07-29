import { useLocale } from '../i18n/LocaleContext'
import { LINKS } from '../i18n/messages'
import { linkClass, panelClass, sectionLeadClass, sectionTitleClass, shellClass } from './ui'

export function Privacy() {
  const { t } = useLocale()

  return (
    <section id="privacy" className="scroll-mt-20 border-t border-gray-200/80 py-16 sm:py-20 dark:border-gray-800/80">
      <div className={shellClass}>
        <div className="max-w-2xl">
          <h2 className={sectionTitleClass}>{t.privacyTitle}</h2>
          <p className={sectionLeadClass}>{t.privacyLead}</p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {t.privacyItems.map((item) => (
            <li key={item.title} className={panelClass}>
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-50">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                {item.body}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-6">
          <a href={LINKS.ai} className={linkClass} target="_blank" rel="noreferrer">
            {t.privacyLink} →
          </a>
        </p>
      </div>
    </section>
  )
}
