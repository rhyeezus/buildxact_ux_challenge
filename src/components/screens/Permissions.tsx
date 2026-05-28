import { useState } from 'react'
import './Screen.css'
import './Permissions.css'

interface Props {
  onNext: () => void
  onBack: () => void
}

export default function Permissions({ onNext, onBack }: Props) {
  const [perms, setPerms] = useState({ read: true, write: true, delete: false })

  const toggle = (key: keyof typeof perms) => {
    setPerms(p => ({ ...p, [key]: !p[key] }))
  }

  return (
    <div className="screen permissions-screen">
      <div className="screen-header">
        <div className="bx-logo">Buildxact</div>
      </div>

      <div className="screen-body">
        <button className="btn-back" onClick={onBack}>
          ← Back
        </button>

        <h1 className="screen-title">Here's what Buildxact will have access to.</h1>
        <p className="screen-subtitle">
          You can change these at any time in Settings. We'll always ask before taking any action on your behalf.
        </p>

        <div className="perms-list">
          <PermToggle
            label="Read emails"
            description="Required. Buildxact reads your emails to extract actions and summaries."
            enabled={perms.read}
            locked
            onToggle={() => {}}
          />
          <div className="divider" />
          <PermToggle
            label="Write & reply"
            description="Allows Buildxact to draft responses to suppliers — you always review before sending."
            enabled={perms.write}
            onToggle={() => toggle('write')}
          />
          <div className="divider" />
          <PermToggle
            label="Delete emails"
            description="Allows Buildxact to delete emails on your behalf."
            enabled={perms.delete}
            danger
            onToggle={() => toggle('delete')}
          />
        </div>

        {perms.delete && (
          <div className="danger-zone" role="alert">
            <div className="danger-zone-header">
              <span className="danger-icon">⚠</span>
              <strong>Danger zone</strong>
            </div>
            <p>
              Enabling this allows Buildxact to delete emails on your behalf.{' '}
              <strong>This cannot be undone.</strong> Deleted emails may not be recoverable from your mail provider.
            </p>
          </div>
        )}

        <div style={{ marginTop: 'auto', paddingTop: 8 }}>
          <button className="btn-primary" onClick={onNext}>
            Confirm and connect
          </button>
          <p className="perms-footer">
            By connecting, you agree that Buildxact will access your email with the permissions above.
          </p>
        </div>
      </div>
    </div>
  )
}

interface ToggleProps {
  label: string
  description: string
  enabled: boolean
  locked?: boolean
  danger?: boolean
  onToggle: () => void
}

function PermToggle({ label, description, enabled, locked, danger, onToggle }: ToggleProps) {
  return (
    <div className="perm-row">
      <div className="perm-text">
        <div className={`perm-label ${danger ? 'perm-danger' : ''}`}>{label}</div>
        <div className="perm-desc">{description}</div>
        {locked && <div className="perm-locked">Required permission — cannot be disabled</div>}
      </div>
      <button
        className={`toggle ${enabled ? 'on' : ''} ${locked ? 'locked' : ''} ${danger && enabled ? 'danger-on' : ''}`}
        onClick={onToggle}
        disabled={locked}
        aria-pressed={enabled}
        aria-label={label}
      >
        <span className="toggle-thumb" />
      </button>
    </div>
  )
}
