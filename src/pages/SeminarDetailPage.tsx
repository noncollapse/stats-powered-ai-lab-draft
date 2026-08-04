import { Link, useParams } from 'react-router'
import Arrow from '../components/Arrow'
import DraftBadge from '../components/DraftBadge'
import Seo from '../components/Seo'
import { seminarBySlug } from '../content'
import { pick, useLanguage } from '../i18n/LanguageContext'
import { eventDateParts } from '../utils/date'
import NotFoundPage from './NotFoundPage'

export default function SeminarDetailPage() {
  const { language } = useLanguage()
  const { slug } = useParams()
  const seminar = seminarBySlug(slug)
  if (!seminar) return <NotFoundPage />

  const date = eventDateParts(seminar.startAt, seminar.timezone, language)
  const endTime = seminar.endAt ? eventDateParts(seminar.endAt, seminar.timezone, language).time : null
  const formatLabel = pick(language, {
    online: 'Online',
    offline: 'In person',
    hybrid: 'Hybrid',
  }[seminar.format], {
    online: '线上',
    offline: '线下',
    hybrid: '线上与线下',
  }[seminar.format])
  const statusLabel = seminar.eventStatus === 'scheduled'
    ? pick(language, 'Upcoming seminar', '即将举行')
    : seminar.eventStatus === 'completed'
      ? pick(language, 'Seminar archive', '往期研讨会')
      : pick(language, 'Cancelled', '已取消')

  return (
    <>
      <Seo
        title={pick(language, seminar.title, seminar.titleZh)}
        description={pick(language, seminar.summary, seminar.summaryZh)}
        path={`/seminars/${seminar.slug}`}
        type="article"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: pick(language, seminar.title, seminar.titleZh),
          description: pick(language, seminar.abstract, seminar.abstractZh),
          startDate: seminar.startAt,
          endDate: seminar.endAt,
          eventAttendanceMode: `https://schema.org/${seminar.format === 'online' ? 'OnlineEventAttendanceMode' : seminar.format === 'offline' ? 'OfflineEventAttendanceMode' : 'MixedEventAttendanceMode'}`,
          eventStatus: `https://schema.org/${seminar.eventStatus === 'cancelled' ? 'EventCancelled' : 'EventScheduled'}`,
          performer: { '@type': 'Person', name: pick(language, seminar.speaker, seminar.speakerZh) },
          organizer: { '@type': 'Organization', name: 'Stats-Powered AI Lab' },
        }}
      />
      <article className="detail-page container-shell seminar-detail">
        <Link className="back-link" to="/seminars"><Arrow direction="left" /> {pick(language, 'All seminars', '全部研讨会')}</Link>
        <header className="detail-header">
          <div className="detail-header__meta">
            <span>{statusLabel}</span>
            <span>{formatLabel}</span>
            {seminar.draft ? <DraftBadge /> : null}
          </div>
          <h1>{pick(language, seminar.title, seminar.titleZh)}</h1>
          <p className="detail-header__summary">{pick(language, seminar.summary, seminar.summaryZh)}</p>
        </header>

        <div className="detail-grid seminar-detail-grid">
          <aside className="event-facts">
            <span>{pick(language, 'Session details', '活动信息')}</span>
            <dl>
              <div><dt>{pick(language, 'Date', '日期')}</dt><dd>{date.longDate}</dd></div>
              <div><dt>{pick(language, 'Time', '时间')}</dt><dd>{date.time}{endTime ? ` — ${endTime}` : ''}</dd></div>
              <div><dt>{pick(language, 'Format', '形式')}</dt><dd>{formatLabel}</dd></div>
              <div><dt>{pick(language, 'Location', '地点')}</dt><dd>{pick(language, seminar.location, seminar.locationZh)}</dd></div>
            </dl>
          </aside>
          <div className="detail-copy seminar-detail__copy">
            <section>
              <span className="section-kicker">{pick(language, 'Abstract', '摘要')}</span>
              <p>{pick(language, seminar.abstract, seminar.abstractZh)}</p>
            </section>
            <section className="speaker-panel">
              <span className="section-kicker">{pick(language, 'Speaker', '主讲人')}</span>
              <h2>{pick(language, seminar.speaker, seminar.speakerZh)}</h2>
              <p>{pick(language, seminar.speakerAffiliation, seminar.speakerAffiliationZh)}</p>
            </section>
            <section>
              <span className="section-kicker">{seminar.eventStatus === 'scheduled' ? pick(language, 'Attend', '参与') : pick(language, 'Materials', '活动资料')}</span>
              <div className="event-actions">
                {seminar.registrationUrl ? <a className="primary-button" href={seminar.registrationUrl}>{pick(language, 'Register', '报名')} <Arrow /></a> : null}
                {seminar.slidesUrl ? <a className="secondary-button" href={seminar.slidesUrl}>{pick(language, 'View slides', '查看讲义')}</a> : null}
                {seminar.recordingUrl ? <a className="secondary-button" href={seminar.recordingUrl}>{pick(language, 'Watch recording', '观看录像')}</a> : null}
                {!seminar.registrationUrl && !seminar.slidesUrl && !seminar.recordingUrl ? (
                  <p className="event-forthcoming">{seminar.eventStatus === 'scheduled'
                    ? pick(language, 'Registration details will appear after the session is confirmed.', '活动确认后将在这里公布报名方式。')
                    : pick(language, 'Verified slides and recordings will appear here when available.', '经过核验的讲义和录像将在准备完成后发布。')}</p>
                ) : null}
              </div>
            </section>
          </div>
        </div>
      </article>
    </>
  )
}
