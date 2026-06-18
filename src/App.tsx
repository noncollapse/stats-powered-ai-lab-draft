import { Route, Routes } from 'react-router'
import Layout from './components/Layout'
import AboutPage from './pages/AboutPage'
import HomePage from './pages/HomePage'
import JoinPage from './pages/JoinPage'
import NewsDetailPage from './pages/NewsDetailPage'
import NewsPage from './pages/NewsPage'
import NotFoundPage from './pages/NotFoundPage'
import PeoplePage from './pages/PeoplePage'
import PublicationDetailPage from './pages/PublicationDetailPage'
import PublicationsPage from './pages/PublicationsPage'
import ResearchDetailPage from './pages/ResearchDetailPage'
import ResearchPage from './pages/ResearchPage'
import ResourcesPage from './pages/ResourcesPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="research" element={<ResearchPage />} />
        <Route path="research/:slug" element={<ResearchDetailPage />} />
        <Route path="publications" element={<PublicationsPage />} />
        <Route path="publications/:slug" element={<PublicationDetailPage />} />
        <Route path="people" element={<PeoplePage />} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="news/:slug" element={<NewsDetailPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="join" element={<JoinPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
