import { Link } from 'react-router'
import EmptyState from '../components/EmptyState'
import PageHero from '../components/PageHero'
import Seo from '../components/Seo'
import { resources } from '../content'
import Arrow from '../components/Arrow'
import { pick, useLanguage } from '../i18n/LanguageContext'

export default function ResourcesPage() {
  const { language } = useLanguage()

  return (
    <>
      <Seo
        title={pick(language, 'Resources', '资源')}
        description={pick(language, 'Research writing and seminar conversations from Stats-Powered AI Lab.', '思达 AI Lab 的研究文章与研讨交流。')}
        path="/resources"
      />
      <PageHero
        index="04"
        eyebrow={pick(language, 'Ideas in circulation', '思想在流动')}
        title={pick(language, 'Research grows through writing and conversation.', '研究在写作与对话中生长。')}
        description={pick(
          language,
          'The Blog makes technical ideas easier to inspect. The Seminar Series creates a home for talks, reading discussions, and work in progress.',
          '研究博客让技术思想更易理解和检验；研讨会系列为学术报告、论文讨论和进行中的工作提供空间。',
        )}
      />
      <section className="container-shell page-section">
        {resources.length ? (
          <div className="resource-hubs">
            {resources.map((resource, index) => (
              <article key={resource.slug} className={`resource-hub resource-hub--${resource.type.toLowerCase()}`}>
                <div className="resource-hub__top"><span>0{index + 1}</span><span>{pick(language, resource.type, resource.typeZh)}</span></div>
                <div className="resource-hub__visual" aria-hidden="true">
                  {resource.type === 'Blog' ? <><i /><i /><i /><i /></> : <><b /><b /><b /><b /><b /></>}
                </div>
                <div className="resource-hub__body">
                  <h2>{pick(language, resource.title, resource.titleZh)}</h2>
                  <p>{pick(language, resource.summary, resource.summaryZh)}</p>
                  {resource.url
                    ? <Link className="text-link" to={resource.url}>{pick(language, `Open ${resource.type.toLowerCase()}`, `打开${resource.typeZh}`)} <Arrow /></Link>
                    : <span className="resource-hub__status">{pick(language, 'Programme forthcoming', '内容即将上线')}</span>}
                </div>
              </article>
            ))}
          </div>
        ) : <EmptyState
          index="R"
          title={pick(language, 'The resource programme is being prepared', '资源计划正在准备')}
          body={pick(language, 'Blog posts and seminar schedules will appear here once verified material is ready.', '经过核验的博客文章和研讨会日程将在此发布。')}
          link={{ label: pick(language, 'Browse research directions', '浏览研究方向'), to: '/research' }}
        />}
        <div className="release-standard resource-principles">
          <span className="section-kicker">{pick(language, 'Editorial standard', '编辑标准')}</span>
          <div><strong>{pick(language, 'Substantive', '言之有物')}</strong><p>{pick(language, 'Every post or session should begin with a real research question.', '每篇文章或每场活动都应始于一个真实的研究问题。')}</p></div>
          <div><strong>{pick(language, 'Accessible', '清晰可读')}</strong><p>{pick(language, 'Technical depth should come with enough context to follow the argument.', '技术深度应配有足够背景，使读者能够理解论证。')}</p></div>
          <div><strong>{pick(language, 'Traceable', '有据可循')}</strong><p>{pick(language, 'Notes and discussions should connect back to sources and research records.', '笔记与讨论应能够追溯到来源和研究记录。')}</p></div>
        </div>
      </section>
    </>
  )
}
