import { useState } from 'react'
import MobileShell from './components/MobileShell'
import DesktopView from './components/DesktopView'
import './App.css'

type ViewMode = 'mobile' | 'desktop'

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('mobile')

  return (
    <div className="app-wrapper">
      <div className="view-toggle">
        <span className="toggle-label">View mode</span>
        <div className="toggle-buttons">
          <button
            className={`toggle-btn ${viewMode === 'mobile' ? 'active' : ''}`}
            onClick={() => setViewMode('mobile')}
          >
            Mobile
          </button>
          <button
            className={`toggle-btn ${viewMode === 'desktop' ? 'active' : ''}`}
            onClick={() => setViewMode('desktop')}
          >
            Desktop
          </button>
        </div>
      </div>

      {viewMode === 'mobile' ? (
        <div className="mobile-frame-wrapper">
          <MobileShell />
        </div>
      ) : (
        <div className="desktop-frame-wrapper">
          <DesktopView />
        </div>
      )}
    </div>
  )
}
