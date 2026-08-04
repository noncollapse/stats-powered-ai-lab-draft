import { Link } from 'react-router'
import Arrow from '../components/Arrow'
import DraftBadge from '../components/DraftBadge'
import EmptyState from '../components/EmptyState'
import PageHero from '../components/PageHero'
import Seo from '../components/Seo'
import { seminars } from '../content'
import { pick, useLanguage } from '../i18n/LanguageContext'
import type { Seminar } from '../types/content'
import { eventDateParts } from '../utils/date'

function SeminarRow({ seminar, archive = false }: { seminar: Seminar; archive?: boolean }) {
  const { language } = useLanguage()
  const date = eventDateParts(seminar.startAt, seminar.timezone, language)
  const formatLabel = pick(language, {
    online: 'Online',
    offline: 'In person',
    hybrid: 'Hybrid',
  }[seminar.format], {
    online: '线上',
    offline: '线下',
    hybrid: '线上与线下',
  }[seminar.format])

  return (
    <article className={`seminar-card${archive ? ' seminar-card--archive' : ''}`}>
      <Link className="seminar-card__link" to={`/seminars/${seminar.slug}`}>
        <time className="seminar-card__date" dateTime={seminar.startAt}>
          <strong>{date.day}</strong>
          <span>{date.month}</span>
          <small>{date.year}</small>
        </time>
        <div className="seminar-card__main">
          <div className="seminar-card__status">
            <span>{archive ? pick(language, 'Archive', '往期') : pick(language, 'Upcoming', '即将举行')}</span>
            <span>{formatLabel}</span>
            {seminar.draft ? <DraftBadge /> : null}
          </div>
          <h3>{pick(language, seminar.title, seminar.titleZh)}</h3>
          <p>{pick(language, seminar.summary, seminar.summaryZh)}</p>
          <div className="tag-list">
            {pick(language, seminar.topics, seminar.topicsZh).map((topic) => <span key={topic}>{topic}</span>)}
          </div>
        </div>
        <div className="seminar-card__speaker">
          <span>{pick(language, 'Speaker', '主讲人')}</span>
          <strong>{pick(language, seminar.speaker, seminar.speakerZh)}</strong>
          <small>{pick(language, seminar.speakerAffiliation, seminar.speakerAffiliationZh)}</small>
        </div>
        <Arrow />
      </Link>
    </article>
  )
}

export default function SeminarsPage() {
  const { language } = useLanguage()
  const upcoming = seminars
    .filter((seminar) => seminar.eventStatus === 'scheduled')
    .sort((a, b) => a.startAt.localeCompare(b.startAt))
  const archive = seminars
    .filter((seminar) => seminar.eventStatus !== 'scheduled')
    .sort((a, b) => b.startAt.localeCompare(a.startAt))

  return (
    <>
      <Seo
        title={pick(language, 'Seminar Series', '研讨会系列')}
        description={pick(language, 'Talks, reading discussions, and works in progress from Stats-Powered AI Lab.', '思达 AI Lab 的学术报告、论文讨论和进行中的工作。')}
        path="/seminars"
      />
      <PageHero
        index="04.B"
        eyebrow={pick(language, 'Seminar series', '研讨会系列')}
        title={pick(language, 'A room for work in progress.', '为进行中的研究，留出一间房。')}
        description={pick(
          language,
          'Talks and reading conversations across statistics and modern AI, with a clear home for what is next and what remains worth revisiting.',
          '连接统计学与现代 AI 的学术报告和阅读讨论，让即将发生的交流与值得重访的内容各有归处。',
        )}
      />

      <section className="container-shell seminar-programme">
        <div className="programme-section">
          <div className="programme-section__heading">
            <span>[01]</span>
            <div>
              <p className="section-kicker">{pick(language, 'Upcoming', '即将举行')}</p>
              <h2>{pick(language, 'Next in the room', '下一场交流')}</h2>
            </div>
            <span>{String(upcoming.length).padStart(2, '0')} {pick(language, 'scheduled', '场活动')}</span>
          </div>
          {upcoming.length ? (
            <div className="seminar-list">{upcoming.map((seminar) => <SeminarRow key={seminar.slug} seminar={seminar} />)}</div>
          ) : <EmptyState
            index="U"
            title={pick(language, 'No seminar is scheduled yet', '暂无已安排的研讨会')}
            body={pick(language, 'A verified date, speaker, and registration path will appear here once confirmed.', '日期、主讲人和参与方式确认后将在这里发布。')}
          />}
        </div>

        <div className="programme-section programme-section--archive">
          <div className="programme-section__heading">
            <span>[02]</span>
            <div>
              <p className="section-kicker">{pick(language, 'Archive', '往期')}</p>
              <h2>{pick(language, 'Worth revisiting', '值得重访')}</h2>
            </div>
            <span>{String(archive.length).padStart(2, '0')} {pick(language, 'records', '条记录')}</span>
          </div>
          {archive.length ? (
            <div className="seminar-list">{archive.map((seminar) => <SeminarRow key={seminar.slug} seminar={seminar} archive />)}</div>
          ) : <EmptyState
            index="A"
            title={pick(language, 'The archive is being assembled', '往期内容正在整理')}
            body={pick(language, 'Completed sessions, slides, and recordings will be added after verification.', '活动结束后，经过核验的讲义与录像将在这里归档。')}
          />}
        </div>
      </section>
    </>
  )
}
