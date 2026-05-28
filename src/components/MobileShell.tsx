import { useState } from 'react'
import EmailSetup from './screens/EmailSetup'
import Permissions from './screens/Permissions'
import ScanLoading from './screens/ScanLoading'
import GlanceHome from './screens/GlanceHome'
import ProjectDetail from './screens/ProjectDetail'
import ActionsScreen from './screens/ActionsScreen'
import './MobileShell.css'

export type MobileScreen =
  | 'email-setup'
  | 'permissions'
  | 'scan-loading'
  | 'home'
  | 'project-detail'
  | 'actions'

export default function MobileShell() {
  const [screen, setScreen] = useState<MobileScreen>('email-setup')
  const [selectedProject, setSelectedProject] = useState<string>('Supalock Roofing')

  const renderScreen = () => {
    switch (screen) {
      case 'email-setup':
        return <EmailSetup onNext={() => setScreen('permissions')} />
      case 'permissions':
        return <Permissions onNext={() => setScreen('scan-loading')} onBack={() => setScreen('email-setup')} />
      case 'scan-loading':
        return <ScanLoading onDone={() => setScreen('home')} />
      case 'home':
        return (
          <GlanceHome
            onSelectProject={(p) => { setSelectedProject(p); setScreen('project-detail') }}
            onResync={() => setScreen('scan-loading')}
            onViewActions={() => setScreen('actions')}
          />
        )
      case 'project-detail':
        return <ProjectDetail projectName={selectedProject} onBack={() => setScreen('home')} />
      case 'actions':
        return <ActionsScreen onBack={() => setScreen('home')} />
    }
  }

  return (
    <div className="mobile-frame">
      <div className="mobile-notch" />
      <div className="mobile-screen">
        {renderScreen()}
      </div>
    </div>
  )
}
