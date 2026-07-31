import { Link } from 'react-router'
import Arrow from '../components/Arrow'
import EmptyState from '../components/EmptyState'
import InferenceField from '../components/InferenceField'
import PublicationCard from '../components/PublicationCard'
import ResearchCard from '../components/ResearchCard'
import Seo from '../components/Seo'
import { publications, researchProjects, resources } from '../content'
import { pick, useLanguage } from '../i18n/LanguageContext'

export default function HomePage() {
  const { language } = useLanguage()
  const latestPublications = publications.filter((item) => item.featured).slice(0, 3)

  return (
    <>
      <Seo
        title="Stats-Powered AI Lab"
        description={pick(
          language,
          'Stats-Powered AI Lab develops statistical foundations, verifiable inference, and reliable decision methods for modern AI.',
          '思达 AI Lab 研究现代 AI 的统计基础、可验证推理与可靠决策方法。',
        )}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'ResearchOrganization',
          name: 'Stats-Powered AI Lab',
          description: pick(language, 'Statistical foundations for reliable AI.', '以统计学为可信 AI 奠定基础。'),
          url: window.location.origin,
        }}
      />

      <section className="home-hero container-shell">
        <div className="home-hero__copy">
          <div className="signal-label"><span className="signal-label__dot" /> {pick(language, 'Independent research lab', '独立研究实验室')}</div>
          <h1>
            {language === 'zh'
              ? <>从证据，<br /><em>走向决策。</em></>
              : <>Evidence,<br /><em>then decisions.</em></>}
          </h1>
          <p>{pick(
            language,
            'We develop statistical methods to quantify uncertainty, verify model outputs, and enable AI systems to make more reliable decisions.',
            '我们用统计方法量化不确定性、验证模型输出，让 AI 系统作出更可靠的决策。',
          )}</p>
          <div className="hero-actions">
            <Link className="primary-button" to="/research">{pick(language, 'Explore our research', '探索研究方向')} <Arrow /></Link>
            <Link className="secondary-button" to="/publications">{pick(language, 'Open Paper Bank', '打开论文库')}</Link>
          </div>
        </div>
        <InferenceField />
        <div className="home-hero__footnote">
          <span>{pick(language, 'Stats-Powered · Research System 01', '思达 AI · 研究体系 01')}</span>
          <span>{pick(language, 'Scroll to explore', '向下探索')} <Arrow direction="down" /></span>
        </div>
      </section>

      <section
        className="principle-strip"
        aria-label={pick(language, 'Research principles', '研究原则')}
      >
        <div className="container-shell">
          <span>{pick(language, 'Statistical foundations', '统计基础')}</span>
          <span>{pick(language, 'Verifiable inference', '可验证推理')}</span>
          <span>{pick(language, 'Reliable decisions', '可靠决策')}</span>
        </div>
      </section>

      <section className="section-block container-shell">
        <div className="section-heading">
          <div><span>[01]</span><span>{pick(language, 'Research directions', '研究方向')}</span></div>
          <div>
            <h2>{pick(language, <>Three research layers<br />for reliable AI.</>, <>可信 AI 的<br />三层研究体系。</>)}</h2>
            <p>{pick(
              language,
              'Our programmes connect policy learning, AI verification, and frontier statistics to make modern AI systems more reliable.',
              '我们的研究连接策略学习、AI 验证与前沿统计，以提升现代 AI 系统的可靠性。',
            )}</p>
          </div>
        </div>
        <div className="research-grid">
          {researchProjects.map((project) => <ResearchCard key={project.slug} project={project} />)}
        </div>
      </section>

      <section className="section-block section-block--ruled container-shell">
        <div className="section-heading section-heading--compact">
          <div><span>[02]</span><span>{pick(language, 'Selected work', '代表成果')}</span></div>
          <div>
            <h2>{pick(language, 'Research records', '研究记录')}</h2>
            <Link className="text-link" to="/publications">{pick(language, 'Open Paper Bank', '打开论文库')} <Arrow /></Link>
          </div>
        </div>
        <div className="publication-list">
          {latestPublications.length ? latestPublications.map((publication, index) => (
            <PublicationCard key={publication.slug} publication={publication} index={index} />
          )) : <EmptyState
            title={pick(language, 'Publication records are being prepared', '论文记录正在整理')}
            body={pick(language, 'Verified metadata will appear here once it is ready for release.', '经过核验的论文信息将在准备完成后发布。')}
          />}
        </div>
      </section>

      <section className="section-block container-shell home-split">
        <div className="home-split__visual" aria-hidden="true">
          <span className="orbital orbital--one" />
          <span className="orbital orbital--two" />
          <span className="orbital orbital--three" />
          <span className="home-split__cross">+</span>
          <p>
            {pick(
              language,
              <>IDEAS IN<br />CIRCULATION</>,
              <>思想<br />流动中</>,
            )}
          </p>
        </div>
        <div className="home-split__content">
          <span className="section-kicker">[03] {pick(language, 'Open resources', '开放资源')}</span>
          <h2>{pick(language, 'Ideas grow through exchange.', '论文之外，思想在交流中生长。')}</h2>
          <p>{pick(
            language,
            'Our Blog unpacks ideas and methods; the Seminar Series creates space for talks, reading discussions, and work in progress.',
            '研究博客用于拆解思想与方法；研讨会系列为学术报告、论文讨论和进行中的工作提供交流空间。',
          )}</p>
          {resources.length ? (
            <Link className="primary-button" to="/resources">{pick(language, 'Explore blog & seminars', '探索博客与研讨会')} <Arrow /></Link>
          ) : (
            <Link className="secondary-button" to="/resources">{pick(language, 'Resource registry forthcoming', '资源目录即将上线')} <Arrow /></Link>
          )}
        </div>
      </section>

      <section className="join-band">
        <div className="container-shell">
          <div><span>[04]</span><span>{pick(language, 'People & collaboration', '成员与合作')}</span></div>
          <h2>{pick(language, 'Bring a difficult question.', '带着一个难题来。')}</h2>
          <p>{pick(
            language,
            'We are building a research culture for careful thinkers across statistics, machine learning, and real-world AI systems.',
            '我们希望与统计学、机器学习和真实 AI 系统领域中严谨思考的人共同建立研究文化。',
          )}</p>
          <Link className="primary-button primary-button--light" to="/join">{pick(language, 'Join the lab', '加入实验室')} <Arrow /></Link>
        </div>
      </section>
    </>
  )
}
