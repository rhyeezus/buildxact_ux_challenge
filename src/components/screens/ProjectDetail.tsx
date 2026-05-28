import { useState } from 'react'
import { PROJECTS, ActionItem } from '../../data/projects'
import './Screen.css'
import './ProjectDetail.css'

interface Props {
  projectName: string
  onBack: () => void
}

type Section = 'today' | 'week' | 'month'

export default function ProjectDetail({ projectName, onBack }: Props) {
  const project = PROJECTS.find(p => p.name === projectName)!
  const [expanded, setExpanded] = useState<Set<Section>>(new Set(['today']))
  const [actionStates, setActionStates] = useState<Record<string, { done: boolean; dismissed: boolean }>>({})

  const getState = (id: string, orig: { done: boolean; dismissed: boolean }) =>
    actionStates[id] ?? orig

  const confirm = (id: string) => setActionStates(s => ({ ...s, [id]: { ...getState(id, { done: false, dismissed: false }), done: true } }))
  const dismiss = (id: string) => setActionStates(s => ({ ...s, [id]: { ...getState(id, { done: false, dismissed: false }), dismissed: true } }))

  const toggle = (sec: Section) => {
    setExpanded(prev => {
      const next = new Set(prev)
      next.has(sec) ? next.delete(sec) : next.add(sec)
      return next
    })
  }

  const renderActions = (items: ActionItem[], _sec: Section) => {
    const active = items.filter(a => {
      const s = getState(a.id, a)
      return !s.done && !s.dismissed
    })
    const completed = items.filter(a => getState(a.id, a).done)

    return (
      <div className="section-content">
        {active.length === 0 && completed.length === 0 && (
          <div className="empty-section">No items in this period</div>
        )}
        {active.map(item => (
          <ActionCard
            key={item.id}
            item={item}
            onConfirm={() => confirm(item.id)}
            onDismiss={() => dismiss(item.id)}
          />
        ))}
        {completed.map(item => (
          <div key={item.id} className="action-done">
            <span className="done-check">✓</span>
            <span className="done-text">{item.text}</span>
          </div>
        ))}
      </div>
    )
  }

  const sections: { id: Section; label: string; items: ActionItem[] }[] = [
    { id: 'today', label: 'Due Today', items: project.actionsToday },
    { id: 'week', label: 'Due This Week', items: project.actionsWeek },
    { id: 'month', label: 'Due This Month', items: project.actionsMonth },
  ]

  return (
    <div className="screen detail-screen">
      <div className="detail-header">
        <button className="btn-back" onClick={onBack}>← Back</button>
        <div className="bx-logo">Buildxact</div>
      </div>

      <div className="detail-project-name">{project.name}</div>

      <div className="detail-sections">
        {sections.map(sec => (
          <div key={sec.id} className="collapsible">
            <button
              className={`collapsible-header ${expanded.has(sec.id) ? 'open' : ''}`}
              onClick={() => toggle(sec.id)}
            >
              <span className="collapsible-title">{sec.label}</span>
              <div className="collapsible-right">
                {sec.items.filter(a => !getState(a.id, a).done && !getState(a.id, a).dismissed).length > 0 && (
                  <span className="collapsible-count">
                    {sec.items.filter(a => !getState(a.id, a).done && !getState(a.id, a).dismissed).length}
                  </span>
                )}
                <span className="collapsible-arrow">{expanded.has(sec.id) ? '▲' : '▼'}</span>
              </div>
            </button>
            {expanded.has(sec.id) && renderActions(sec.items, sec.id)}
          </div>
        ))}
      </div>

      <div className="history-section">
        <div className="section-heading">History</div>
        <div className="history-list">
          {project.history.map((h, i) => (
            <div key={i} className="history-item">
              <div className="history-dot" />
              <div className="history-content">
                <div className="history-date">{h.date}</div>
                <div className="history-text">{h.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ActionCard({ item, onConfirm, onDismiss }: { item: ActionItem; onConfirm: () => void; onDismiss: () => void }) {
  return (
    <div className="action-card">
      <div className="action-top">
        <span className={`badge ${item.confidence === 'high' ? 'badge-high' : 'badge-review'}`}>
          {item.confidence === 'high' ? '● High confidence' : '◐ Review suggested'}
        </span>
      </div>
      <div className="action-text">{item.text}</div>
      <div className="action-source">From: {item.source}</div>
      <div className="action-btns">
        <button className="action-confirm" onClick={onConfirm}>Confirm</button>
        <button className="action-dismiss" onClick={onDismiss}>Dismiss</button>
      </div>
    </div>
  )
}
