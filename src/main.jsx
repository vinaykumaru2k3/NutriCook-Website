import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { registerSW } from './utils/serviceWorker'

// Service worker temporarily disabled to fix 206 partial response caching issues
// Will be re-enabled after fixing caching strategy
// if (import.meta.env.PROD) {
//   registerSW();
// }

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
