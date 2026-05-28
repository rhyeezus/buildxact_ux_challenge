import { useState } from 'react'
import { PROJECTS, ActionItem, Project } from '../data/projects'
import './DesktopView.css'

export default function DesktopView() {
  const [selectedProject, setSelectedProject] = useState<Project>(PROJECTS[0])
  const [selectedAction, setSelectedAction] = useState<ActionItem | null>(PROJECTS[0].actionsToday[0] ?? null)
  const [actionStates, setActionStates] = useState<Record<string, { done: boolean; dismissed: boolean }>>({})
  const [delegateOpen, setDelegateOpen] = useState<string | null>(null)
  const [delegated, setDelegated] = useState<Record<string, string>>({})
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const getState = (id: string, orig: { done: boolean; dismissed: boolean }) =>
    actionStates[id] ?? orig

  const confirm = (id: string) => setActionStates(s => ({ ...s, [id]: { done: true, dismissed: false } }))
  const dismiss = (id: string) => setActionStates(s => ({ ...s, [id]: { done: false, dismissed: true } }))

  const allActions = [
    ...selectedProject.actionsToday,
    ...selectedProject.actionsWeek,
    ...selectedProject.actionsMonth,
  ].filter(a => !getState(a.id, a).done && !getState(a.id, a).dismissed)

  const filtered = PROJECTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || p.status === statusFilter
    return matchSearch && matchStatus
  })

  const TEAM = ['Sarah K. (Admin)', 'Luke M. (Site)', 'Priya J. (Accounts)']

  return (
    <div className="desktop-wrapper">
      {/* Top header */}
      <header className="desktop-header">
        <div className="header-logo">Buildxact</div>
        <div className="header-search-wrap">
          <input className="header-search" placeholder="Search projects, actions…" />
        </div>
        <div className="header-right">
          <span className="sync-info">Last synced: 7:42 AM</span>
          <button className="header-btn">↻ Resync</button>
          <button className="header-btn">🔔</button>
          <div className="avatar">DB</div>
        </div>
      </header>

      {/* Team sync bar */}
      <div className="team-bar">
        <span className="team-bar-label">Team on this project:</span>
        {TEAM.map(m => (
          <div key={m} className="team-member">
            <div className="team-avatar">{m.split(' ')[0][0]}{m.split(' ')[1][0]}</div>
            <span className="team-name">{m}</span>
          </div>
        ))}
      </div>

      <div className="desktop-columns">
        {/* Left — project list */}
        <aside className="col-projects">
          <div className="col-header">
            <input
              className="col-search"
              placeholder="Filter projects…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select
              className="col-filter"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option value="all">All statuses</option>
              <option value="overdue">Overdue</option>
              <option value="needs-attention">Needs attention</option>
              <option value="on-track">On track</option>
            </select>
          </div>

          <div className="project-list-desktop">
            {filtered.map(p => (
              <button
                key={p.name}
                className={`project-row ${selectedProject.name === p.name ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedProject(p)
                  setSelectedAction(p.actionsToday[0] ?? p.actionsWeek[0] ?? null)
                }}
              >
                <div className="project-row-top">
                  <span className="project-row-name">{p.name}</span>
                  <StatusDot status={p.status} />
                </div>
                <div className="project-row-sub">{p.urgentAction}</div>
                <div className="project-row-meta">
                  <span className="project-row-time">{p.lastActivity}</span>
                  {p.actionsToday.filter(a => !getState(a.id, a).done && !getState(a.id, a).dismissed).length > 0 && (
                    <span className="badge-overdue">
                      {p.actionsToday.filter(a => !getState(a.id, a).done && !getState(a.id, a).dismissed).length} today
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Centre — project detail */}
        <main className="col-detail">
          <div className="col-detail-header">
            <h2 className="detail-title">{selectedProject.name}</h2>
            <StatusBadge status={selectedProject.status} />
          </div>

          {(['today', 'week', 'month'] as const).map(period => {
            const items = period === 'today'
              ? selectedProject.actionsToday
              : period === 'week'
                ? selectedProject.actionsWeek
                : selectedProject.actionsMonth
            const label = period === 'today' ? 'Due Today' : period === 'week' ? 'Due This Week' : 'Due This Month'
            const active = items.filter(a => !getState(a.id, a).done && !getState(a.id, a).dismissed)
            const done = items.filter(a => getState(a.id, a).done)

            return (
              <div key={period} className="detail-period">
                <div className="detail-period-header">
                  <span className="detail-period-label">{label}</span>
                  {active.length > 0 && <span className="period-count">{active.length}</span>}
                </div>

                {active.length === 0 && done.length === 0 && (
                  <div className="empty-period">No items in this period</div>
                )}

                {active.map(item => (
                  <div
                    key={item.id}
                    className={`detail-action ${selectedAction?.id === item.id ? 'selected' : ''}`}
                    onClick={() => setSelectedAction(item)}
                  >
                    <div className="detail-action-top">
                      <span className={`badge ${item.confidence === 'high' ? 'badge-high' : 'badge-review'}`}>
                        {item.confidence === 'high' ? '● High confidence' : '◐ Review suggested'}
                      </span>
                      {delegated[item.id] && (
                        <span className="delegated-chip">→ {delegated[item.id].split(' ')[0]}</span>
                      )}
                    </div>
                    <div className="detail-action-text">{item.text}</div>
                    <div className="detail-action-source">From: {item.source}</div>
                    <div className="detail-action-controls">
                      <button className="btn-confirm-desktop" onClick={e => { e.stopPropagation(); confirm(item.id) }}>
                        Confirm
                      </button>
                      <button className="btn-dismiss-desktop" onClick={e => { e.stopPropagation(); dismiss(item.id) }}>
                        Dismiss
                      </button>
                      <div className="delegate-wrap">
                        <button
                          className="btn-delegate"
                          onClick={e => { e.stopPropagation(); setDelegateOpen(delegateOpen === item.id ? null : item.id) }}
                        >
                          Delegate ▾
                        </button>
                        {delegateOpen === item.id && (
                          <div className="delegate-picker">
                            {TEAM.map(m => (
                              <button
                                key={m}
                                className="delegate-option"
                                onClick={e => {
                                  e.stopPropagation()
                                  setDelegated(d => ({ ...d, [item.id]: m }))
                                  setDelegateOpen(null)
                                }}
                              >
                                <div className="dp-avatar">{m.split(' ')[0][0]}{m.split(' ')[1][0]}</div>
                                {m}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {done.map(item => (
                  <div key={item.id} className="detail-action-done">
                    <span className="done-check-desktop">✓</span>
                    <span className="done-text-desktop">{item.text}</span>
                  </div>
                ))}
              </div>
            )
          })}
        </main>

        {/* Right — thread context */}
        <aside className="col-thread">
          {selectedAction && allActions.some(a => a.id === selectedAction.id) ? (
            <>
              <div className="thread-ai-summary">
                <div className="thread-ai-label">AI Summary</div>
                <p className="thread-ai-text">{selectedProject.threadSummary}</p>
              </div>
              <div className="thread-divider" />
              <div className="thread-label">Original thread</div>
              <div className="thread-body">{selectedProject.thread}</div>
            </>
          ) : (
            <div className="thread-empty">
              Select an action item to view the source email thread.
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

function StatusDot({ status }: { status: Project['status'] }) {
  const map = { 'on-track': '#16A34A', 'needs-attention': '#D97706', 'overdue': '#DC2626' }
  return <span className="status-dot" style={{ background: map[status] }} />
}

function StatusBadge({ status }: { status: Project['status'] }) {
  const map = {
    'on-track': { bg: 'var(--success-light)', color: 'var(--success)', label: 'On track' },
    'needs-attention': { bg: 'var(--warning-light)', color: 'var(--warning)', label: 'Needs attention' },
    'overdue': { bg: 'var(--danger-light)', color: 'var(--danger)', label: 'Overdue' },
  }
  const { bg, color, label } = map[status]
  return <span className="status-badge" style={{ background: bg, color }}>{label}</span>
}
