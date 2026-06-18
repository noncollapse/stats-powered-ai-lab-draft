import { Link } from 'react-router'
import Arrow from '../components/Arrow'
import Seo from '../components/Seo'

export default function NotFoundPage() {
  return (
    <>
      <Seo title="Page Not Found" description="The requested Lab page could not be found." path={window.location.pathname} />
      <section className="not-found container-shell">
        <div className="not-found__code">404</div>
        <div><span className="section-kicker">Outside the observed field</span><h1>This record does not exist.</h1><p>The address may be incorrect, or draft content may be unavailable in this build.</p><Link className="primary-button" to="/">Return to the lab <Arrow /></Link></div>
      </section>
    </>
  )
}
