import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { messages, type Locale } from './messages'

const LOCALE_KEY = 'sillage-page-locale'

type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (typeof messages)['en']
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

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
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
    document.title = messages[locale].metaTitle
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', messages[locale].metaDescription)
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

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}
