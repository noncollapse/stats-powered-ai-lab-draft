import { Link } from 'react-router'
import Arrow from '../components/Arrow'
import EmptyState from '../components/EmptyState'
import PageHero from '../components/PageHero'
import Seo from '../components/Seo'
import { news } from '../content'
import { pick, useLanguage } from '../i18n/LanguageContext'

export default function NewsPage() {
  const { language } = useLanguage()

  return (
    <>
      <Seo
        title={pick(language, 'News', '动态')}
        description={pick(language, 'Research notes and announcements from Stats-Powered AI Lab.', '思达 AI Lab 的研究动态与公告。')}
        path="/news"
      />
      <PageHero
        index="05"
        eyebrow={pick(language, 'Notes & announcements', '研究动态与公告')}
        title={pick(language, 'What changed, and why it matters.', '记录变化，也解释其意义。')}
        description={pick(
          language,
          'A record of releases, research updates, talks, and lab announcements—published only when there is something concrete to say.',
          '记录成果发布、研究进展、学术报告与实验室公告，只在有实质内容时更新。',
        )}
      />
      <section className="container-shell page-section">
        {news.length ? (
          <div className="news-list">
            {news.map((post) => (
              <article key={post.slug}>
                <time dateTime={post.date}>{post.date}</time>
                <h2>{pick(language, post.title, post.titleZh)}</h2>
                <p>{pick(language, post.summary, post.summaryZh)}</p>
                <Link className="text-link" to={`/news/${post.slug}`}>{pick(language, 'Read note', '阅读详情')} <Arrow /></Link>
              </article>
            ))}
          </div>
        ) : <EmptyState
          index="N"
          title={pick(language, 'No announcements yet', '暂无动态')}
          body={pick(language, 'The lab will use this space for verified releases and substantive updates rather than filler content.', '这里将用于发布经过核验的成果与实质性进展。')}
          link={{ label: pick(language, 'Read our research agenda', '查看研究方向'), to: '/research' }}
        />}
      </section>
    </>
  )
}
