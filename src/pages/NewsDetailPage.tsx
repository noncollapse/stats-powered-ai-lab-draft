import { Link, useParams } from 'react-router'
import Arrow from '../components/Arrow'
import Seo from '../components/Seo'
import { newsBySlug } from '../content'
import { pick, useLanguage } from '../i18n/LanguageContext'
import NotFoundPage from './NotFoundPage'

export default function NewsDetailPage() {
  const { language } = useLanguage()
  const { slug } = useParams()
  const post = newsBySlug(slug)
  if (!post) return <NotFoundPage />

  return (
    <>
      <Seo
        title={pick(language, post.title, post.titleZh)}
        description={pick(language, post.summary, post.summaryZh)}
        path={`/news/${post.slug}`}
        type="article"
      />
      <article className="detail-page container-shell prose-page">
        <Link className="back-link" to="/news"><Arrow direction="left" /> {pick(language, 'All news', '全部动态')}</Link>
        <header className="detail-header">
          <time dateTime={post.date}>{post.date}</time>
          <h1>{pick(language, post.title, post.titleZh)}</h1>
          <p className="detail-header__summary">{pick(language, post.summary, post.summaryZh)}</p>
        </header>
        <div className="prose-copy">
          {pick(language, post.body, post.bodyZh).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </article>
    </>
  )
}
