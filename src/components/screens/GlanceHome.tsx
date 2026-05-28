import { useState } from 'react'
import { PROJECTS } from '../../data/projects'
import './Screen.css'
import './GlanceHome.css'

interface Props {
  onSelectProject: (name: string) => void
  onResync: () => void
}

export default function GlanceHome({ onSelectProject, onResync }: Props) {
  const [syncing, setSyncing] = useState(false)

  const totalToday = PROJECTS.reduce((n, p) => n + p.actionsToday.filter(a => !a.done && !a.dismissed).length, 0)
  const totalWeek = PROJECTS.reduce((n, p) => n + p.actionsWeek.filter(a => !a.done && !a.dismissed).length, 0)

  const handleResync = () => {
    setSyncing(true)
    setTimeout(() => {
      setSyncing(false)
      onResync()
    }, 300)
  }

  return (
    <div className="screen glance-screen">
      <div className="glance-header">
        <div className="bx-logo">Buildxact</div>
        <button className="notif-btn">🔔</button>
      </div>

      <div className="glance-greeting">
        <h1 className="greeting-text">Good morning. <br />Here's your day.</h1>
      </div>

      <div className="summary-strip">
        <div className="summary-chip urgent">
          <span className="chip-count">{totalToday}</span>
          <span className="chip-label">need action today</span>
        </div>
        <div className="summary-chip">
          <span className="chip-count">{totalWeek}</span>
          <span className="chip-label">due this week</span>
        </div>
      </div>

      <div className="section-heading" style={{ marginTop: 4 }}>Active projects</div>

      <div className="project-list">
        {PROJECTS.map(project => (
          <button
            key={project.name}
            className="project-card"
            onClick={() => onSelectProject(project.name)}
          >
            <div className="project-card-top">
              <div className="project-name">{project.name}</div>
              <StatusPip status={project.status} />
            </div>
            <div className="project-urgent">{project.urgentAction}</div>
            <div className="project-meta">
              <span className="project-time">{project.lastActivity}</span>
              {project.actionsToday.filter(a => !a.done && !a.dismissed).length > 0 && (
                <span className="project-badge">
                  {project.actionsToday.filter(a => !a.done && !a.dismissed).length} today
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="sync-bar">
        <span className="sync-time">Last synced: 7:42 AM</span>
        <button className={`sync-btn ${syncing ? 'syncing' : ''}`} onClick={handleResync} disabled={syncing}>
          {syncing ? 'Syncing…' : '↻ Resync'}
        </button>
      </div>
    </div>
  )
}

function StatusPip({ status }: { status: 'on-track' | 'needs-attention' | 'overdue' }) {
  const map = {
    'on-track': { color: 'var(--success)', label: 'On track' },
    'needs-attention': { color: 'var(--warning)', label: 'Needs attention' },
    'overdue': { color: 'var(--danger)', label: 'Overdue' },
  }
  const { color, label } = map[status]
  return (
    <span className="status-pip" style={{ '--pip-color': color } as React.CSSProperties}>
      {label}
    </span>
  )
}
