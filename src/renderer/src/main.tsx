import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import './i18n'
import App from './App'
import { Toaster } from '@renderer/components/ui/Sonner'
import { ThemeProvider } from '@renderer/components/theme-provider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>
)
