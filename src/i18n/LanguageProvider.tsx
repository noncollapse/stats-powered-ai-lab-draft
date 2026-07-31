import { useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  LanguageContext,
  type Language,
  type LanguageContextValue,
} from './LanguageContext'

const storageKey = 'stats-powered-ai-lab-language'

const initialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en'
  const stored = window.localStorage.getItem(storageKey)
  return stored === 'zh' || stored === 'en' ? stored : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(initialLanguage)

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
    window.localStorage.setItem(storageKey, language)
  }, [language])

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage,
    toggleLanguage: () => setLanguage((current) => current === 'en' ? 'zh' : 'en'),
  }), [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
