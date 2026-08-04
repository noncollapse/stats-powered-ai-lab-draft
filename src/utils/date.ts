import type { Language } from '../i18n/LanguageContext'

const locale = (language: Language) => language === 'zh' ? 'zh-CN' : 'en-GB'

export const formatContentDate = (value: string, language: Language) => (
  new Intl.DateTimeFormat(locale(language), {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value))
)

export const eventDateParts = (value: string, timeZone: string, language: Language) => {
  const date = new Date(value)
  const selectedLocale = locale(language)
  const clock = new Intl.DateTimeFormat(selectedLocale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone,
  }).format(date)
  const zone = new Intl.DateTimeFormat(selectedLocale, {
    timeZone,
    timeZoneName: 'short',
  }).formatToParts(date).find((part) => part.type === 'timeZoneName')?.value

  return {
    day: new Intl.DateTimeFormat(selectedLocale, { day: '2-digit', timeZone }).format(date),
    month: new Intl.DateTimeFormat(selectedLocale, { month: 'short', timeZone }).format(date).toUpperCase(),
    year: new Intl.DateTimeFormat(selectedLocale, { year: 'numeric', timeZone }).format(date),
    longDate: new Intl.DateTimeFormat(selectedLocale, {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      timeZone,
    }).format(date),
    time: zone ? `${clock} ${zone}` : clock,
  }
}
