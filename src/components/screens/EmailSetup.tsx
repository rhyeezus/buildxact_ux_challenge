import { useState } from 'react'
import './Screen.css'
import './EmailSetup.css'

interface Props {
  onNext: () => void
}

export default function EmailSetup({ onNext }: Props) {
  const [addingEmail, setAddingEmail] = useState(false)
  const [folderMode, setFolderMode] = useState(false)

  return (
    <div className="screen email-setup-screen">
      <div className="screen-header">
        <div className="bx-logo">Buildxact</div>
      </div>

      <div className="screen-body">
        <h1 className="screen-title">Let's connect your inbox.</h1>
        <p className="screen-subtitle">
          Buildxact will read your emails to surface actions, summaries, and reminders — so nothing slips through.
        </p>

        <div className="email-card">
          <div className="email-label">Connected email</div>
          <div className="email-address">
            <span className="email-dot" />
            dave.builder@constructco.com.au
          </div>
          <div className="email-question">Is this your main work email?</div>
          <div className="email-actions">
            <button className="btn-primary" onClick={onNext}>
              Yes, use this email
            </button>
            <button
              className="btn-ghost"
              onClick={() => setAddingEmail(true)}
            >
              Add a different email
            </button>
          </div>
        </div>

        {addingEmail && (
          <div className="add-email-panel">
            <label className="input-label">Work email address</label>
            <input
              type="email"
              className="text-input"
              placeholder="your@email.com.au"
              autoFocus
            />
            <button className="btn-primary" style={{ marginTop: 8 }} onClick={onNext}>
              Connect this email
            </button>
          </div>
        )}

        <div
          className={`folder-option ${folderMode ? 'expanded' : ''}`}
          onClick={() => !folderMode && setFolderMode(true)}
        >
          <div className="folder-option-header">
            <span className="folder-icon">📁</span>
            <div>
              <div className="folder-option-title">Prefer to connect a specific folder?</div>
              <div className="folder-option-desc">
                Create a folder in your email client and funnel supplier emails into it — Buildxact will only read that folder.
              </div>
            </div>
          </div>
          {folderMode && (
            <div style={{ marginTop: 12 }}>
              <label className="input-label">Folder name</label>
              <input
                type="text"
                className="text-input"
                placeholder="e.g. Buildxact"
                autoFocus
              />
              <button className="btn-secondary" style={{ marginTop: 8, width: '100%' }} onClick={onNext}>
                Use this folder
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
