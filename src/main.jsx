import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuditLogProvider } from './context/AuditLogContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuditLogProvider>
      <App />
    </AuditLogProvider>
  </StrictMode>,
)
