import { Link } from 'react-router'
import Arrow from '../components/Arrow'
import PageHero from '../components/PageHero'
import Seo from '../components/Seo'
import { pick, useLanguage } from '../i18n/LanguageContext'

const profiles = [
  {
    title: 'Statistical depth',
    titleZh: '统计深度',
    body: 'You enjoy finding the estimator or assumption hiding beneath a fashionable method.',
    bodyZh: '你愿意寻找流行方法背后真正起作用的估计量或假设。',
  },
  {
    title: 'Engineering discipline',
    titleZh: '工程纪律',
    body: 'You make experiments reproducible and know that infrastructure shapes evidence.',
    bodyZh: '你重视实验可复现性，也理解基础设施会影响证据质量。',
  },
  {
    title: 'Intellectual generosity',
    titleZh: '开放而严谨',
    body: 'You can disagree precisely, revise openly, and make other people’s thinking better.',
    bodyZh: '你能够准确表达分歧、公开修正观点，并帮助他人把问题想得更清楚。',
  },
]

export default function JoinPage() {
  const { language } = useLanguage()

  return (
    <>
      <Seo
        title={pick(language, 'Join the Lab', '加入实验室')}
        description={pick(language, 'Future opportunities to join or collaborate with Stats-Powered AI Lab.', '加入思达 AI Lab 或开展研究合作的机会。')}
        path="/join"
      />
      <PageHero
        index="07"
        eyebrow={pick(language, 'Join & collaborate', '加入与合作')}
        title={pick(language, 'Bring a difficult question. Stay for the evidence.', '带着难题来，为证据留下。')}
        description={pick(
          language,
          'We welcome conversations with researchers and engineers working across statistics, machine learning, and reliable AI systems.',
          '我们欢迎统计学、机器学习和可信 AI 系统领域的研究者与工程师交流合作。',
        )}
      />
      <section className="container-shell join-layout">
        <div className="join-layout__main">
          <span className="section-kicker">{pick(language, 'Who may thrive here', '适合怎样的人')}</span>
          {profiles.map((profile, index) => (
            <article key={profile.title}>
              <span>0{index + 1}</span>
              <div>
                <h2>{pick(language, profile.title, profile.titleZh)}</h2>
                <p>{pick(language, profile.body, profile.bodyZh)}</p>
              </div>
            </article>
          ))}
        </div>
        <aside className="join-status">
          <span className="signal-label"><span className="signal-label__dot signal-label__dot--quiet" /> {pick(language, 'Contact channel pending', '联系渠道待公布')}</span>
          <h2>{pick(language, 'No open call is published yet.', '目前暂无公开招募。')}</h2>
          <p>{pick(
            language,
            'A verified email address and application process have not been supplied, so this preview does not transmit or collect personal information.',
            '由于尚未提供经过核验的邮箱和申请流程，本预览不会传输或收集个人信息。',
          )}</p>
          <button type="button" disabled>{pick(language, 'Contact the lab', '联系实验室')} <Arrow /></button>
          <span>{pick(language, 'Applications will open here when a verified channel is available.', '经核验的申请渠道开放后将在此公布。')}</span>
        </aside>
      </section>
      <section className="container-shell collaboration-note">
        <div><span>[C]</span><span>{pick(language, 'Collaboration', '研究合作')}</span></div>
        <div>
          <h2>{pick(language, 'Already working on a related problem?', '你是否正在研究相关问题？')}</h2>
          <p>{pick(
            language,
            'A useful collaboration starts with a clear research question, the evidence already available, and a concrete shared outcome.',
            '有价值的合作应从清晰的研究问题、已有证据和具体的共同目标开始。',
          )}</p>
          <Link className="text-link" to="/research">{pick(language, 'See our research directions', '查看研究方向')} <Arrow /></Link>
        </div>
      </section>
    </>
  )
}
