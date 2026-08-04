import { Link, useParams } from 'react-router'
import Arrow from '../components/Arrow'
import DraftBadge from '../components/DraftBadge'
import Seo from '../components/Seo'
import { blogBySlug, publicationBySlug } from '../content'
import { pick, useLanguage } from '../i18n/LanguageContext'
import { formatContentDate } from '../utils/date'
import NotFoundPage from './NotFoundPage'

export default function BlogDetailPage() {
  const { language } = useLanguage()
  const { slug } = useParams()
  const post = blogBySlug(slug)
  if (!post) return <NotFoundPage />

  const relatedPublications = post.relatedPublications
    .map((publicationSlug) => publicationBySlug(publicationSlug))
    .filter((publication) => publication !== undefined)

  return (
    <>
      <Seo
        title={pick(language, post.title, post.titleZh)}
        description={pick(language, post.summary, post.summaryZh)}
        path={`/blog/${post.slug}`}
        type="article"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: pick(language, post.title, post.titleZh),
          datePublished: post.date,
          author: post.authors.map((name) => ({ '@type': 'Organization', name })),
        }}
      />
      <article className="detail-page container-shell prose-page blog-detail">
        <Link className="back-link" to="/blog"><Arrow direction="left" /> {pick(language, 'All blog posts', '全部博客文章')}</Link>
        <header className="detail-header">
          <div className="detail-header__meta">
            <time dateTime={post.date}>{formatContentDate(post.date, language)}</time>
            <span>{post.readingMinutes} {pick(language, 'minute read', '分钟阅读')}</span>
            {post.draft ? <DraftBadge /> : null}
          </div>
          <h1>{pick(language, post.title, post.titleZh)}</h1>
          <p className="detail-header__summary">{pick(language, post.summary, post.summaryZh)}</p>
          <p className="article-byline">{pick(language, 'By', '作者')} {post.authors.join(', ')}</p>
        </header>

        <div className="detail-grid article-detail-grid">
          <aside>
            <span>{pick(language, 'Topics', '主题')}</span>
            <ul>{pick(language, post.tags, post.tagsZh).map((tag) => <li key={tag}>{tag}</li>)}</ul>
          </aside>
          <div className="detail-copy article-copy">
            <section>
              <span className="section-kicker">{pick(language, 'Essay', '正文')}</span>
              {pick(language, post.body, post.bodyZh).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>
            <section className="article-related">
              <span className="section-kicker">{pick(language, 'Related papers', '相关论文')}</span>
              {relatedPublications.length ? (
                <div className="article-related__list">
                  {relatedPublications.map((publication) => (
                    <Link key={publication.slug} to={`/publications/${publication.slug}`}>
                      <span>{publication.year}</span>
                      <strong>{publication.title}</strong>
                      <Arrow />
                    </Link>
                  ))}
                </div>
              ) : <p className="muted-note">{pick(language, 'No related paper has been linked.', '暂未关联论文。')}</p>}
            </section>
          </div>
        </div>
      </article>
    </>
  )
}
