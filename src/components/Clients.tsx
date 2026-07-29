import { useLocale } from '../i18n/useLocale'
import { LINKS } from '../i18n/messages'
import { linkClass, panelClass, sectionLeadClass, sectionTitleClass, shellClass } from './ui'

export function Clients() {
  const { t } = useLocale()

  return (
    <section id="clients" className="scroll-mt-20 border-t border-gray-200/80 py-16 sm:py-20 dark:border-gray-800/80">
      <div className={shellClass}>
        <div className="max-w-2xl">
          <h2 className={sectionTitleClass}>{t.clientsTitle}</h2>
          <p className={sectionLeadClass}>{t.clientsLead}</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <article className={panelClass}>
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-50">
              {t.clientsWebTitle}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              {t.clientsWebBody}
            </p>
            <p className="mt-4">
              <a href={LINKS.docs} className={linkClass} target="_blank" rel="noreferrer">
                {t.ctaDocs} →
              </a>
            </p>
          </article>

          <article className={panelClass}>
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-50">
              {t.clientsAndroidTitle}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              {t.clientsAndroidBody}
            </p>
            <p className="mt-4">
              <a href={LINKS.android} className={linkClass} target="_blank" rel="noreferrer">
                {t.ctaAndroid} →
              </a>
            </p>
          </article>
        </div>

        <p className="mt-8 text-center text-xs tracking-wide text-gray-400 dark:text-gray-500">
          {t.clientsStack}
        </p>
      </div>
    </section>
  )
}
