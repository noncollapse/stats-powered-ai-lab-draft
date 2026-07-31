import { Link, useParams } from 'react-router'
import Arrow from '../components/Arrow'
import DraftBadge from '../components/DraftBadge'
import PublicationCard from '../components/PublicationCard'
import Seo from '../components/Seo'
import { publicationBySlug, researchBySlug } from '../content'
import { pick, useLanguage } from '../i18n/LanguageContext'
import NotFoundPage from './NotFoundPage'

export default function ResearchDetailPage() {
  const { language } = useLanguage()
  const { slug } = useParams()
  const project = researchBySlug(slug)
  if (!project) return <NotFoundPage />
  const related = project.relatedPublications.map(publicationBySlug).filter((item) => item !== undefined)

  return (
    <>
      <Seo
        title={pick(language, project.title, project.titleZh)}
        description={pick(language, project.summary, project.summaryZh)}
        path={`/research/${project.slug}`}
      />
      <article className="detail-page container-shell">
        <Link className="back-link" to="/research"><Arrow direction="left" /> {pick(language, 'All research', '全部研究')}</Link>
        <header className="detail-header">
          <div className="detail-header__meta">
            <span>[{project.index}]</span>
            <span>{pick(language, project.status, project.statusZh)}</span>
            {project.draft ? <DraftBadge /> : null}
          </div>
          <p className="eyebrow">{pick(language, project.eyebrow, project.eyebrowZh)}</p>
          <h1>{pick(language, project.title, project.titleZh)}</h1>
          <p className="detail-header__summary">{pick(language, project.summary, project.summaryZh)}</p>
        </header>

        <div className="detail-grid">
          <aside>
            <span>{pick(language, 'Research themes', '研究主题')}</span>
            <ul>{pick(language, project.themes, project.themesZh).map((theme) => <li key={theme}>{theme}</li>)}</ul>
          </aside>
          <div className="detail-copy">
            <section>
              <span className="section-kicker">{pick(language, 'The question', '研究问题')}</span>
              <h2>{pick(language, project.question, project.questionZh)}</h2>
            </section>
            <section>
              <span className="section-kicker">{pick(language, 'The programme', '研究方案')}</span>
              <p>{pick(language, project.approach, project.approachZh)}</p>
            </section>
          </div>
        </div>

        <section className="related-section">
          <div className="section-heading section-heading--compact">
            <div><span>[R]</span><span>{pick(language, 'Related records', '相关成果')}</span></div>
            <h2>{pick(language, 'Papers', '论文')}</h2>
          </div>
          {related.length ? related.map((publication, index) => (
            <PublicationCard key={publication.slug} publication={publication} index={index} />
          )) : <p className="muted-note">{pick(language, 'No verified publication record is linked to this direction yet.', '该方向暂未关联已核验的论文记录。')}</p>}
        </section>
      </article>
    </>
  )
}
