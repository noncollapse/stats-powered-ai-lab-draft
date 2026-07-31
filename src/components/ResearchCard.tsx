import { Link } from 'react-router'
import { pick, useLanguage } from '../i18n/LanguageContext'
import type { ResearchProject } from '../types/content'
import Arrow from './Arrow'

export default function ResearchCard({ project }: { project: ResearchProject }) {
  const { language } = useLanguage()

  return (
    <article className="research-card">
      <div className="research-card__top">
        <span>{project.index}</span>
        <span>{pick(language, project.status, project.statusZh)}</span>
      </div>
      <div className="research-card__signal" aria-hidden="true">
        <span /><span /><span />
      </div>
      <p className="eyebrow">{pick(language, project.eyebrow, project.eyebrowZh)}</p>
      <h2>{pick(language, project.title, project.titleZh)}</h2>
      <p>{pick(language, project.summary, project.summaryZh)}</p>
      <Link className="text-link" to={`/research/${project.slug}`}>
        {pick(language, 'Explore direction', '查看研究方向')} <Arrow />
      </Link>
    </article>
  )
}
