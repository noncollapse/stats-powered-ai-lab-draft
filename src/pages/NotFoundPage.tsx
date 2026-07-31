import { Link } from 'react-router'
import Arrow from '../components/Arrow'
import Seo from '../components/Seo'
import { pick, useLanguage } from '../i18n/LanguageContext'

export default function NotFoundPage() {
  const { language } = useLanguage()

  return (
    <>
      <Seo
        title={pick(language, 'Page Not Found', '页面未找到')}
        description={pick(language, 'The requested Lab page could not be found.', '未找到请求的实验室页面。')}
        path={window.location.pathname}
      />
      <section className="not-found container-shell">
        <div className="not-found__code">404</div>
        <div>
          <span className="section-kicker">{pick(language, 'Outside the observed field', '超出观测范围')}</span>
          <h1>{pick(language, 'This record does not exist.', '这条记录不存在。')}</h1>
          <p>{pick(language, 'The address may be incorrect, or draft content may be unavailable in this build.', '地址可能不正确，或草稿内容在当前版本中不可用。')}</p>
          <Link className="primary-button" to="/">{pick(language, 'Return to the lab', '返回实验室首页')} <Arrow /></Link>
        </div>
      </section>
    </>
  )
}
