import { AppShell } from '@/app/layout/app-shell'

/**
 * App shell — the composition root for KIO Studio. Renders the app-layout
 * framework (header, nav, chat workspace, contextual sidebar) defined in
 * src/app/layout per the Confluence "App Layout Framework & Interaction
 * Hypothesis".
 */
function App() {
  return <AppShell />
}

export default App
