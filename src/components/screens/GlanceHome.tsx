import { useState } from 'react'
import { PROJECTS } from '../../data/projects'
import './Screen.css'
import './GlanceHome.css'

interface Props {
  onSelectProject: (name: string) => void
  onResync: () => void
  onViewActions: () => void
}

export default function GlanceHome({ onSelectProject, onResync, onViewActions }: Props) {
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
      </div>

      <div className="glance-greeting">
        <p className="greeting-date">{new Date().toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        <h1 className="greeting-text">Good morning.</h1>
      </div>

      <div className="action-rows">
        <button className="action-row urgent" onClick={onViewActions}>
          <div className="action-row-left">
            <span className="action-row-count">{totalToday}</span>
            <span className="action-row-label">need action today</span>
          </div>
          <span className="action-row-arrow">→</span>
        </button>
        <button className="action-row" onClick={onViewActions}>
          <div className="action-row-left">
            <span className="action-row-count muted">{totalWeek}</span>
            <span className="action-row-label">due this week</span>
          </div>
          <span className="action-row-arrow">→</span>
        </button>
      </div>

      <div className="section-heading">Active projects</div>

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
