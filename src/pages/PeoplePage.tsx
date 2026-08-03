import EmptyState from '../components/EmptyState'
import PageHero from '../components/PageHero'
import Seo from '../components/Seo'
import { people } from '../content'
import Arrow from '../components/Arrow'
import { pick, useLanguage } from '../i18n/LanguageContext'

const initials = (name: string) => name.split(' ').map((part) => part[0]).join('').slice(0, 2)
const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

export default function PeoplePage() {
  const { language } = useLanguage()
  const leader = people.find((person) => person.role.startsWith('Lab Leader'))
  const members = people.filter((person) => person !== leader)

  return (
    <>
      <Seo
        title={pick(language, 'People', '成员')}
        description={pick(language, 'People and collaborators at Stats-Powered AI Lab.', '思达 AI Lab 的研究成员与合作者。')}
        path="/people"
      />
      <PageHero
        index="03"
        eyebrow={pick(language, 'People', '成员')}
        title={pick(language, 'A lab is a way of thinking together.', '实验室，是共同思考的方式。')}
        description={pick(
          language,
          'Our researchers connect statistics, reinforcement learning, and modern AI through a shared commitment to careful evidence.',
          '我们的研究成员以对严谨证据的共同坚持，连接统计学、强化学习与现代 AI。',
        )}
      />
      <section className="container-shell page-section">
        {people.length ? (
          <>
            {leader ? (
              <article className="leader-card">
                <div className={`leader-card__mark${leader.image ? ' leader-card__mark--portrait' : ''}`} aria-hidden="true">
                  {leader.image ? <img src={assetUrl(leader.image)} alt="" decoding="async" /> : <span>{initials(leader.name)}</span>}
                  <i />
                </div>
                <div className="leader-card__body">
                  <p className="eyebrow">{pick(language, leader.role, leader.roleZh)}</p>
                  <h2>{leader.name}</h2>
                  <p className="person-card__affiliation">{pick(language, leader.affiliation, leader.affiliationZh)}</p>
                  <p>{pick(language, leader.bio, leader.bioZh)}</p>
                  <div className="tag-list">{pick(language, leader.interests, leader.interestsZh).map((interest) => <span key={interest}>{interest}</span>)}</div>
                  <div className="person-card__links">
                    {leader.links.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noreferrer">{pick(language, link.label, link.labelZh)} <Arrow /></a>)}
                  </div>
                </div>
              </article>
            ) : null}
            <div className="people-section-label">
              <span>[M]</span>
              <span>{pick(language, 'Research members', '研究成员')}</span>
              <span>{String(members.length).padStart(2, '0')} {pick(language, 'profiles', '位成员')}</span>
            </div>
            <div className="people-grid people-grid--members">
              {members.map((person) => (
                <article key={person.slug} className="person-card">
                  <div className="person-card__image">
                    {person.image ? <img src={assetUrl(person.image)} alt="" loading="lazy" decoding="async" /> : <span>{initials(person.name)}</span>}
                  </div>
                  <p className="eyebrow">{pick(language, person.role, person.roleZh)}</p>
                  <h2>{person.name}</h2>
                  <p className="person-card__affiliation">{pick(language, person.affiliation, person.affiliationZh)}</p>
                  <p>{pick(language, person.bio, person.bioZh)}</p>
                  {person.interests.length ? <div className="tag-list">{pick(language, person.interests, person.interestsZh).map((interest) => <span key={interest}>{interest}</span>)}</div> : null}
                  <div className="person-card__links">
                    {person.links.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noreferrer">{pick(language, link.label, link.labelZh)} <Arrow /></a>)}
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <EmptyState
            index="P"
            title={pick(language, 'Member profiles are forthcoming', '成员资料即将上线')}
            body={pick(language, 'No names, biographies, portraits, or institutional affiliations have been invented for this preview.', '本预览不会编造成员姓名、简介、照片或机构信息。')}
            link={{ label: pick(language, 'Read how to join', '了解如何加入'), to: '/join' }}
          />
        )}
      </section>
    </>
  )
}
