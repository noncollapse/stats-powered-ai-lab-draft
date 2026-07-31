import { pick, useLanguage } from '../i18n/LanguageContext'

export default function DraftBadge() {
  const { language } = useLanguage()
  return <span className="draft-badge">{pick(language, 'Draft content', '草稿内容')}</span>
}
