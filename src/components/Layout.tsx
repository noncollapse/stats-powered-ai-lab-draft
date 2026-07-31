import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { pick, useLanguage } from '../i18n/LanguageContext'
import Arrow from './Arrow'

const navigation = [
  { label: 'Research', labelZh: '研究', to: '/research' },
  { label: 'Paper Bank', labelZh: '论文库', to: '/publications' },
  { label: 'People', labelZh: '成员', to: '/people' },
  { label: 'Resources', labelZh: '资源', to: '/resources' },
  { label: 'News', labelZh: '动态', to: '/news' },
  { label: 'About', labelZh: '关于', to: '/about' },
]

function Brand() {
  const { language } = useLanguage()
  return (
    <Link className="brand-lockup" to="/" aria-label={pick(language, 'Stats-Powered AI Lab home', '思达 AI Lab 首页')}>
      <img src={`${import.meta.env.BASE_URL}assets/logo.png`} alt="" />
      <span className="brand-lockup__divider" />
      <span className="brand-lockup__lab">AI LAB</span>
    </Link>
  )
}

export default function Layout() {
  const location = useLocation()
  const { language, toggleLanguage } = useLanguage()
  const [menuPath, setMenuPath] = useState<string | null>(null)
  const menuOpen = menuPath === location.pathname
  const navLabel = (item: typeof navigation[number]) => pick(language, item.label, item.labelZh)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    const heading = document.querySelector('h1')
    heading?.setAttribute('tabindex', '-1')
  }, [location.pathname])

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">{pick(language, 'Skip to content', '跳到主要内容')}</a>
      <header className="site-header">
        <div className="site-header__inner container-shell">
          <Brand />
          <nav className="desktop-nav" aria-label={pick(language, 'Primary navigation', '主导航')}>
            {navigation.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? 'is-active' : ''}>
                {navLabel(item)}
              </NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <Link className="join-link" to="/join">{pick(language, 'Join the lab', '加入我们')} <Arrow /></Link>
            <button
              className="language-toggle"
              type="button"
              onClick={toggleLanguage}
              aria-label={pick(language, 'Switch to Chinese', '切换到英文')}
            >
              <span className={language === 'en' ? 'is-active' : ''}>EN</span>
              <i aria-hidden="true">/</i>
              <span className={language === 'zh' ? 'is-active' : ''}>中</span>
            </button>
          </div>
          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen
              ? pick(language, 'Close navigation', '关闭导航')
              : pick(language, 'Open navigation', '打开导航')}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuPath(menuOpen ? null : location.pathname)}
          >
            <span /><span />
          </button>
        </div>
        <nav id="mobile-navigation" className={`mobile-nav ${menuOpen ? 'is-open' : ''}`} aria-label={pick(language, 'Mobile navigation', '移动端导航')} aria-hidden={!menuOpen}>
          <div className="container-shell">
            {menuOpen ? (
              <>
                {navigation.map((item, index) => (
                  <NavLink key={item.to} to={item.to}>
                    <span>{String(index + 1).padStart(2, '0')}</span>{navLabel(item)}<Arrow />
                  </NavLink>
                ))}
                <NavLink className="mobile-nav__join" to="/join"><span>07</span>{pick(language, 'Join the lab', '加入我们')}<Arrow /></NavLink>
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
            <p>{pick(language, 'Statistical foundations for reliable AI.', '以统计学为可信 AI 奠定基础。')}</p>
          </div>
          <div className="site-footer__links">
            <div>
              <span>{pick(language, 'Explore', '探索')}</span>
              <Link to="/research">{pick(language, 'Research', '研究')}</Link>
              <Link to="/publications">{pick(language, 'Paper Bank', '论文库')}</Link>
              <Link to="/resources">{pick(language, 'Resources', '资源')}</Link>
            </div>
            <div>
              <span>{pick(language, 'Lab', '实验室')}</span>
              <Link to="/people">{pick(language, 'People', '成员')}</Link>
              <Link to="/about">{pick(language, 'About', '关于')}</Link>
              <Link to="/join">{pick(language, 'Join', '加入')}</Link>
            </div>
            <div>
              <span>{pick(language, 'Network', '相关链接')}</span>
              <a href="http://81.70.222.198:8080/company">{pick(language, 'Company site', '公司网站')}</a>
              <span className="footer-placeholder">Scholar · {pick(language, 'forthcoming', '即将上线')}</span>
              <span className="footer-placeholder">GitHub · {pick(language, 'forthcoming', '即将上线')}</span>
            </div>
          </div>
        </div>
        <div className="container-shell site-footer__bottom">
          <span>© 2026 Stats-Powered AI Lab</span>
          <span>{pick(language, 'London · Beijing · Distributed', '伦敦 · 北京 · 分布式协作')}</span>
          <Link to="/about">{pick(language, 'Research with evidence', '以证据驱动研究')}</Link>
        </div>
      </footer>
    </div>
  )
}
