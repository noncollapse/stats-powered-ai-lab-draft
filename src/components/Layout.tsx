import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import Arrow from './Arrow'

const navigation = [
  { label: 'Research', to: '/research' },
  { label: 'Paper Bank', to: '/publications' },
  { label: 'People', to: '/people' },
  { label: 'Resources', to: '/resources' },
  { label: 'News', to: '/news' },
  { label: 'About', to: '/about' },
]

function Brand() {
  return (
    <Link className="brand-lockup" to="/" aria-label="Stats-Powered AI Lab home">
      <img src={`${import.meta.env.BASE_URL}assets/logo.png`} alt="" />
      <span className="brand-lockup__divider" />
      <span className="brand-lockup__lab">AI LAB</span>
    </Link>
  )
}

export default function Layout() {
  const location = useLocation()
  const [menuPath, setMenuPath] = useState<string | null>(null)
  const menuOpen = menuPath === location.pathname

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    const heading = document.querySelector('h1')
    heading?.setAttribute('tabindex', '-1')
  }, [location.pathname])

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="site-header__inner container-shell">
          <Brand />
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navigation.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? 'is-active' : ''}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <Link className="join-link" to="/join">Join the lab <Arrow /></Link>
          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuPath(menuOpen ? null : location.pathname)}
          >
            <span /><span />
          </button>
        </div>
        <nav id="mobile-navigation" className={`mobile-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Mobile navigation" aria-hidden={!menuOpen}>
          <div className="container-shell">
            {menuOpen ? (
              <>
                {navigation.map((item, index) => (
                  <NavLink key={item.to} to={item.to}>
                    <span>{String(index + 1).padStart(2, '0')}</span>{item.label}<Arrow />
                  </NavLink>
                ))}
                <NavLink className="mobile-nav__join" to="/join"><span>07</span>Join the lab<Arrow /></NavLink>
              </>
            ) : null}
          </div>
        </nav>
      </header>

      <main id="main-content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container-shell site-footer__top">
          <div>
            <Brand />
            <p>Statistical foundations for reliable generative AI.</p>
          </div>
          <div className="site-footer__links">
            <div>
              <span>Explore</span>
              <Link to="/research">Research</Link>
              <Link to="/publications">Paper Bank</Link>
              <Link to="/resources">Resources</Link>
            </div>
            <div>
              <span>Lab</span>
              <Link to="/people">People</Link>
              <Link to="/about">About</Link>
              <Link to="/join">Join</Link>
            </div>
            <div>
              <span>Network</span>
              <a href="http://81.70.222.198:8080/company">Company site</a>
              <span className="footer-placeholder">Scholar · forthcoming</span>
              <span className="footer-placeholder">GitHub · forthcoming</span>
            </div>
          </div>
        </div>
        <div className="container-shell site-footer__bottom">
          <span>© 2026 Stats-Powered AI Lab</span>
          <span>London · Beijing · Distributed</span>
          <Link to="/about">Research with evidence</Link>
        </div>
      </footer>
    </div>
  )
}
