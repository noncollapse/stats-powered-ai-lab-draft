import EmptyState from '../components/EmptyState'
import PageHero from '../components/PageHero'
import Seo from '../components/Seo'
import { people } from '../content'
import Arrow from '../components/Arrow'

const initials = (name: string) => name.split(' ').map((part) => part[0]).join('').slice(0, 2)

export default function PeoplePage() {
  const leader = people.find((person) => person.role === 'Lab Leader')
  const members = people.filter((person) => person !== leader)

  return (
    <>
      <Seo title="People" description="People and collaborators at Stats-Powered AI Lab." path="/people" />
      <PageHero
        index="03"
        eyebrow="People"
        title="A lab is a way of thinking together."
        description="Our researchers connect statistics, reinforcement learning, and modern AI through a shared commitment to careful evidence."
      />
      <section className="container-shell page-section">
        {people.length ? (
          <>
            {leader ? (
              <article className="leader-card">
                <div className="leader-card__mark" aria-hidden="true"><span>{initials(leader.name)}</span><i /></div>
                <div className="leader-card__body">
                  <p className="eyebrow">{leader.role}</p>
                  <h2>{leader.name}</h2>
                  <p className="person-card__affiliation">{leader.affiliation}</p>
                  <p>{leader.bio}</p>
                  <div className="tag-list">{leader.interests.map((interest) => <span key={interest}>{interest}</span>)}</div>
                  <div className="person-card__links">
                    {leader.links.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noreferrer">{link.label} <Arrow /></a>)}
                  </div>
                </div>
              </article>
            ) : null}
            <div className="people-section-label"><span>[M]</span><span>Research members</span><span>{String(members.length).padStart(2, '0')} profiles</span></div>
            <div className="people-grid people-grid--members">
              {members.map((person) => (
                <article key={person.slug} className="person-card">
                  <div className="person-card__image">{person.image ? <img src={person.image} alt="" /> : <span>{initials(person.name)}</span>}</div>
                  <p className="eyebrow">{person.role}</p>
                  <h2>{person.name}</h2>
                  <p className="person-card__affiliation">{person.affiliation}</p>
                  <p>{person.bio}</p>
                  {person.interests.length ? <div className="tag-list">{person.interests.map((interest) => <span key={interest}>{interest}</span>)}</div> : null}
                  <div className="person-card__links">
                    {person.links.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noreferrer">{link.label} <Arrow /></a>)}
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <EmptyState index="P" title="Member profiles are forthcoming" body="No names, biographies, portraits, or institutional affiliations have been invented for this preview." link={{ label: 'Read how to join', to: '/join' }} />
        )}
      </section>
    </>
  )
}
