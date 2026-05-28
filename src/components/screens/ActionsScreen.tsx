import { useState } from 'react'
import { PROJECTS, ActionItem } from '../../data/projects'
import './Screen.css'
import './ActionsScreen.css'

interface Props {
  onBack: () => void
}

export default function ActionsScreen({ onBack }: Props) {
  const [tab, setTab] = useState<'today' | 'week'>('today')
  const [actionStates, setActionStates] = useState<Record<string, { done: boolean; dismissed: boolean }>>({})

  const getState = (id: string, orig: { done: boolean; dismissed: boolean }) =>
    actionStates[id] ?? orig

  const confirm = (id: string) => setActionStates(s => ({ ...s, [id]: { done: true, dismissed: false } }))
  const dismiss = (id: string) => setActionStates(s => ({ ...s, [id]: { done: false, dismissed: true } }))

  // Gather items across all projects for the selected period
  const projectGroups = PROJECTS.map(project => {
    const items = (tab === 'today' ? project.actionsToday : project.actionsWeek)
      .filter(a => !getState(a.id, a).done && !getState(a.id, a).dismissed)
    return { project, items }
  }).filter(g => g.items.length > 0)

  const totalActive = projectGroups.reduce((n, g) => n + g.items.length, 0)
  const totalDone = PROJECTS.reduce((n, p) => {
    const items = tab === 'today' ? p.actionsToday : p.actionsWeek
    return n + items.filter(a => getState(a.id, a).done).length
  }, 0)

  return (
    <div className="screen actions-screen">
      <div className="screen-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="bx-logo">Buildxact</div>
        <button className="btn-back" onClick={onBack}>← Home</button>
      </div>

      <div className="actions-title-row">
        <h1 className="screen-title" style={{ padding: '16px 20px 0', fontSize: 22 }}>Actions</h1>
        {totalDone > 0 && (
          <span className="done-tally">{totalDone} done today ✓</span>
        )}
      </div>

      {/* Period tabs */}
      <div className="period-tabs">
        <button
          className={`period-tab ${tab === 'today' ? 'active' : ''}`}
          onClick={() => setTab('today')}
        >
          Due today
          {tab !== 'today' && totalActive > 0 && (
            <span className="tab-count">{PROJECTS.reduce((n, p) => n + p.actionsToday.filter(a => !getState(a.id, a).done && !getState(a.id, a).dismissed).length, 0)}</span>
          )}
        </button>
        <button
          className={`period-tab ${tab === 'week' ? 'active' : ''}`}
          onClick={() => setTab('week')}
        >
          This week
        </button>
      </div>

      {totalActive === 0 ? (
        <div className="actions-empty">
          <div className="empty-icon">✓</div>
          <div className="empty-heading">All clear</div>
          <div className="empty-sub">
            No outstanding actions {tab === 'today' ? 'for today' : 'this week'}.
          </div>
        </div>
      ) : (
        <div className="actions-list">
          {projectGroups.map(({ project, items }) => (
            <div key={project.name} className="project-group">
              <div className="project-group-header">
                <span className="project-group-name">{project.name}</span>
                <StatusPip status={project.status} />
              </div>
              {items.map(item => (
                <ActionCard
                  key={item.id}
                  item={item}
                  onConfirm={() => confirm(item.id)}
                  onDismiss={() => dismiss(item.id)}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ActionCard({ item, onConfirm, onDismiss }: {
  item: ActionItem
  onConfirm: () => void
  onDismiss: () => void
}) {
  return (
    <div className="action-card-flat">
      <div className="action-card-top">
        <span className={`badge ${item.confidence === 'high' ? 'badge-high' : 'badge-review'}`}>
          {item.confidence === 'high' ? '✦ AI: confident' : '✦ AI: review first'}
        </span>
      </div>
      <div className="action-card-text">{item.text}</div>
      <div className="action-card-source">From: {item.source}</div>
      <div className="action-card-btns">
        <button className="action-confirm" onClick={onConfirm}>Confirm</button>
        <button className="action-dismiss" onClick={onDismiss}>Dismiss</button>
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
