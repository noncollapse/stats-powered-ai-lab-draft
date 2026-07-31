import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'
import { LanguageProvider } from './i18n/LanguageProvider'
import './index.css'

const basename = import.meta.env.BASE_URL === '/'
  ? undefined
  : import.meta.env.BASE_URL.replace(/\/$/, '')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </LanguageProvider>
  </StrictMode>,
)
