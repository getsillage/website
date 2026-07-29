import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { messages, type Locale } from './messages'

const LOCALE_KEY = 'sillage-page-locale'

export type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (typeof messages)['en']
}

// Shared with useLocale.ts; not a second component export.
// oxlint-disable-next-line react/only-export-components -- context object for hook module
export const LocaleContext = createContext<LocaleContextValue | null>(null)

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function detectLocale(): Locale {
  try {
    const stored = localStorage.getItem(LOCALE_KEY)
    if (stored === 'en' || stored === 'zh') return stored
  } catch {
    /* ignore */
  }
  if (typeof navigator !== 'undefined' && navigator.language.toLowerCase().startsWith('zh')) {
    return 'zh'
  }
  return 'en'
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => detectLocale())

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      localStorage.setItem(LOCALE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    const t = messages[locale]
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
    document.title = t.metaTitle
    setMeta('description', t.metaDescription)
    setMeta('og:title', t.metaTitle, 'property')
    setMeta('og:description', t.metaDescription, 'property')
    setMeta('twitter:title', t.metaTitle)
    setMeta('twitter:description', t.metaDescription)
  }, [locale])

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: messages[locale],
    }),
    [locale, setLocale],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}
