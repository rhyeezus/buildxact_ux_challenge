import { useState } from 'react'
import EmailSetup from './screens/EmailSetup'
import Permissions from './screens/Permissions'
import ScanLoading from './screens/ScanLoading'
import GlanceHome from './screens/GlanceHome'
import ProjectDetail from './screens/ProjectDetail'
import './MobileShell.css'

export type MobileScreen =
  | 'email-setup'
  | 'permissions'
  | 'scan-loading'
  | 'home'
  | 'project-detail'

export type NavTab = 'home' | 'projects' | 'actions' | 'settings'

export default function MobileShell() {
  const [screen, setScreen] = useState<MobileScreen>('email-setup')
  const [activeTab, setActiveTab] = useState<NavTab>('home')
  const [selectedProject, setSelectedProject] = useState<string>('Supalock Roofing')

  const isOnboarding = screen === 'email-setup' || screen === 'permissions' || screen === 'scan-loading'

  const renderScreen = () => {
    switch (screen) {
      case 'email-setup':
        return <EmailSetup onNext={() => setScreen('permissions')} />
      case 'permissions':
        return <Permissions onNext={() => setScreen('scan-loading')} onBack={() => setScreen('email-setup')} />
      case 'scan-loading':
        return <ScanLoading onDone={() => { setScreen('home'); setActiveTab('home') }} />
      case 'home':
        return <GlanceHome onSelectProject={(p) => { setSelectedProject(p); setScreen('project-detail') }} onResync={() => setScreen('scan-loading')} />
      case 'project-detail':
        return <ProjectDetail projectName={selectedProject} onBack={() => setScreen('home')} />
    }
  }

  return (
    <div className="mobile-frame">
      <div className="mobile-notch" />
      <div className="mobile-screen">
        {renderScreen()}
      </div>
      {!isOnboarding && (
        <nav className="mobile-nav">
          {(['home', 'projects', 'actions', 'settings'] as NavTab[]).map(tab => (
            <button
              key={tab}
              className={`nav-item ${activeTab === tab ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab)
                if (tab === 'home') setScreen('home')
              }}
            >
              <span className="nav-icon">{navIcon(tab)}</span>
              <span className="nav-label">{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  )
}

function navIcon(tab: NavTab) {
  switch (tab) {
    case 'home': return '⌂'
    case 'projects': return '◫'
    case 'actions': return '✓'
    case 'settings': return '⚙'
  }
}
