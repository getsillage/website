import { useLocale } from '../i18n/LocaleContext'
import { LINKS } from '../i18n/messages'
import { primaryButtonClass, secondaryButtonClass, shellClass } from './ui'

export function Hero() {
  const { t } = useLocale()

  return (
    <section className="hero-glow relative overflow-hidden" id="top">
      <div className={`${shellClass} pb-16 pt-14 sm:pb-20 sm:pt-20 lg:pt-24`}>
        <div className="mx-auto max-w-3xl text-center section-enter">
          <img
            src="/sillage-icon.svg"
            alt=""
            width={80}
            height={80}
            className="mx-auto h-16 w-16 sm:h-20 sm:w-20"
          />
          <p className="mt-6 text-xs font-medium uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">
            {t.heroEyebrow}
          </p>
          <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-[2.75rem] lg:leading-tight dark:text-gray-50">
            {t.heroTitle}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-gray-500 sm:text-lg dark:text-gray-400">
            {t.heroLead}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#deploy" className={primaryButtonClass}>
              {t.ctaDeploy}
            </a>
            <a
              href={LINKS.github}
              className={secondaryButtonClass}
              target="_blank"
              rel="noreferrer"
            >
              {t.ctaGithub}
            </a>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
            <a
              href={LINKS.docs}
              className="rounded-md underline-offset-4 hover:text-gray-900 hover:underline dark:hover:text-gray-100"
              target="_blank"
              rel="noreferrer"
            >
              {t.ctaDocs}
            </a>
            <span className="hidden text-gray-300 sm:inline dark:text-gray-700" aria-hidden>
              ·
            </span>
            <a
              href={LINKS.android}
              className="rounded-md underline-offset-4 hover:text-gray-900 hover:underline dark:hover:text-gray-100"
              target="_blank"
              rel="noreferrer"
            >
              {t.ctaAndroid}
            </a>
            <span className="hidden text-gray-300 sm:inline dark:text-gray-700" aria-hidden>
              ·
            </span>
            <a
              href={LINKS.releases}
              className="rounded-md underline-offset-4 hover:text-gray-900 hover:underline dark:hover:text-gray-100"
              target="_blank"
              rel="noreferrer"
            >
              {t.footerReleases}
            </a>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-4xl sm:mt-16">
          <h2 className="sr-only">{t.flowTitle}</h2>
          <ol className="grid gap-3 sm:grid-cols-3 sm:gap-4">
            {t.flowSteps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-xl border border-gray-200/80 bg-white/70 p-5 text-left dark:border-gray-800 dark:bg-gray-900/60"
              >
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                    {index + 1}
                  </span>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
