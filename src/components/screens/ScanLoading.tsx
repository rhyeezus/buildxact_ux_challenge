import { useState, useEffect } from 'react'
import './Screen.css'
import './ScanLoading.css'

interface Props {
  onDone: () => void
}

const STEPS = [
  'Connecting',
  'Reading emails',
  'Scanning attachments',
  'Organising projects',
]

export default function ScanLoading({ onDone }: Props) {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (step >= STEPS.length) {
      setDone(true)
      return
    }
    const t = setTimeout(() => setStep(s => s + 1), 1400)
    return () => clearTimeout(t)
  }, [step])

  return (
    <div className="screen scan-screen">
      <div className="screen-header">
        <div className="bx-logo">Buildxact</div>
      </div>

      <div className="scan-body">
        {done ? (
          <div className="scan-done" key="done">
            <div className="done-icon">✓</div>
            <h2 className="scan-title">You're all set.</h2>
            <p className="scan-sub">
              We found 3 active projects and 12 items needing your attention.
            </p>
            <button className="btn-primary" onClick={onDone}>
              View my inbox
            </button>
          </div>
        ) : (
          <div className="scan-progress" key="progress">
            <div className="scan-spinner">
              <div className="spinner-ring" />
            </div>
            <h2 className="scan-title">Scanning your inbox.</h2>
            <p className="scan-sub">
              This may take a moment. We'll notify you when it's ready.
            </p>

            <div className="steps-list">
              {STEPS.map((label, i) => {
                const state = i < step ? 'done' : i === step ? 'active' : 'pending'
                return (
                  <div key={label} className={`step-item step-${state}`}>
                    <div className="step-dot">
                      {state === 'done' && '✓'}
                      {state === 'active' && <span className="step-pulse" />}
                    </div>
                    <span className="step-label">{label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
