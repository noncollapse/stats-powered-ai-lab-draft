import { Link } from 'react-router'
import Arrow from '../components/Arrow'
import DraftBadge from '../components/DraftBadge'
import EmptyState from '../components/EmptyState'
import PageHero from '../components/PageHero'
import Seo from '../components/Seo'
import { blogPosts } from '../content'
import { pick, useLanguage } from '../i18n/LanguageContext'
import { formatContentDate } from '../utils/date'

export default function BlogPage() {
  const { language } = useLanguage()
  const orderedPosts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <>
      <Seo
        title={pick(language, 'Research Blog', '研究博客')}
        description={pick(language, 'Technical essays and research notes from Stats-Powered AI Lab.', '思达 AI Lab 的技术文章与研究笔记。')}
        path="/blog"
      />
      <PageHero
        index="04.A"
        eyebrow={pick(language, 'Research blog', '研究博客')}
        title={pick(language, 'Ideas, opened for inspection.', '让思想接受检验。')}
        description={pick(
          language,
          'Essays and technical notes that connect statistical questions to methods, papers, and the decisions they support.',
          '通过文章与技术笔记，把统计问题与方法、论文及其支持的决策连接起来。',
        )}
      />

      <section className="container-shell page-section content-index">
        <div className="content-index__bar">
          <span>{String(orderedPosts.length).padStart(2, '0')} {pick(language, 'entries', '篇文章')}</span>
          <span>{pick(language, 'Methods · explanations · open questions', '方法 · 解读 · 开放问题')}</span>
        </div>

        {orderedPosts.length ? (
          <div className="blog-grid">
            {orderedPosts.map((post, index) => (
              <article className="blog-card" key={post.slug}>
                <Link className="blog-card__link" to={`/blog/${post.slug}`}>
                  <div className="blog-card__top">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <time dateTime={post.date}>{formatContentDate(post.date, language)}</time>
                  </div>
                  <div className="blog-card__signal" aria-hidden="true"><i /><i /><i /></div>
                  <div className="blog-card__body">
                    {post.draft ? <DraftBadge /> : null}
                    <h2>{pick(language, post.title, post.titleZh)}</h2>
                    <p>{pick(language, post.summary, post.summaryZh)}</p>
                    <div className="tag-list">
                      {pick(language, post.tags, post.tagsZh).map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                  </div>
                  <footer className="blog-card__foot">
                    <span>{post.authors.join(', ')}</span>
                    <span>{post.readingMinutes} {pick(language, 'min read', '分钟阅读')}</span>
                    <Arrow />
                  </footer>
                </Link>
              </article>
            ))}
          </div>
        ) : <EmptyState
          index="B"
          title={pick(language, 'No essays published yet', '暂无已发布文章')}
          body={pick(language, 'Verified technical essays and research notes will appear here.', '经过核验的技术文章与研究笔记将在这里发布。')}
          link={{ label: pick(language, 'Browse the Paper Bank', '浏览论文库'), to: '/publications' }}
        />}
      </section>
    </>
  )
}
