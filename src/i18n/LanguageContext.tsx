import { createContext, useContext } from 'react'

export type Language = 'en' | 'zh'

export type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  toggleLanguage: () => void
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}

export function pick<T>(language: Language, english: T, chinese: T): T {
  return language === 'zh' ? chinese : english
}
