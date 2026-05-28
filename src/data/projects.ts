export interface ActionItem {
  id: string
  text: string
  confidence: 'high' | 'review'
  source: string
  done: boolean
  dismissed: boolean
}

export interface Project {
  name: string
  status: 'on-track' | 'needs-attention' | 'overdue'
  lastActivity: string
  urgentAction: string
  aiSummary: string
  thread: string
  threadSummary: string
  actionsToday: ActionItem[]
  actionsWeek: ActionItem[]
  actionsMonth: ActionItem[]
  history: { date: string; text: string }[]
}

export const PROJECTS: Project[] = [
  {
    name: 'Supalock Roofing',
    status: 'overdue',
    lastActivity: '2 hours ago',
    urgentAction: 'Approve variation — additional ridge capping',
    aiSummary: 'Roofing is at variation stage. An unapproved variation for additional ridge capping ($1,840 + GST) is holding up Thursday\'s delivery. Progress claim #3 is pending sign-off and a final inspection needs to be scheduled before practical completion.',
    thread: 'From: mike@supalockroofing.com.au\nSubject: Variation Request — Ridge Capping\n\nHi Dave,\n\nAs discussed on-site yesterday, we need to add an additional 14m of ridge capping to the eastern elevation due to the design change approved last week.\n\nThis will come in at approx. $1,840 + GST. Please confirm approval so we can schedule the delivery for Thursday.\n\nCheers,\nMike\nSupalock Roofing',
    threadSummary: 'Supalock Roofing is requesting approval for a variation — additional ridge capping ($1,840 + GST) due to a design change. Delivery scheduled for Thursday pending your approval.',
    actionsToday: [
      { id: 's1', text: 'Approve variation — additional ridge capping ($1,840 + GST)', confidence: 'high', source: 'Variation Request — Ridge Capping', done: false, dismissed: false },
      { id: 's2', text: 'Confirm Thursday delivery window with Mike', confidence: 'high', source: 'Variation Request — Ridge Capping', done: false, dismissed: false },
    ],
    actionsWeek: [
      { id: 's3', text: 'Review and sign off progress claim #3', confidence: 'review', source: 'Progress Claim — Invoice #PC-003', done: false, dismissed: false },
    ],
    actionsMonth: [
      { id: 's4', text: 'Schedule final roof inspection', confidence: 'review', source: 'Project timeline discussion', done: false, dismissed: false },
    ],
    history: [
      { date: '22 May', text: 'Approved variation: skylight relocation (+$640)' },
      { date: '18 May', text: 'Progress claim #2 paid — $12,400' },
      { date: '14 May', text: 'Dismissed: duplicate invoice reminder' },
    ],
  },
  {
    name: 'Boral Supplies — Lot 14',
    status: 'needs-attention',
    lastActivity: '4 hours ago',
    urgentAction: 'Overdue invoice — $4,200 outstanding',
    aiSummary: 'Materials supply is tracking to schedule but a $4,200 invoice is 14 days overdue and at risk of triggering a credit hold. Timber frame delivery for week 3 needs confirming and an insulation upgrade quote is awaiting review.',
    thread: 'From: accounts@boralsupplies.com.au\nSubject: OVERDUE: Invoice #BRL-2204\n\nDear Dave,\n\nThis is a reminder that Invoice #BRL-2204 for $4,200 (incl. GST) is now 14 days overdue.\n\nPayment was due 14 May 2026. Please arrange payment or contact us to discuss.\n\nRegards,\nBoral Supplies Accounts',
    threadSummary: 'Boral Supplies is chasing an overdue invoice of $4,200 (incl. GST) — 14 days past due date. Immediate payment or contact required to avoid credit hold.',
    actionsToday: [
      { id: 'b1', text: 'Pay overdue invoice #BRL-2204 — $4,200 (14 days late)', confidence: 'high', source: 'OVERDUE: Invoice #BRL-2204', done: false, dismissed: false },
    ],
    actionsWeek: [
      { id: 'b2', text: 'Confirm delivery of timber frame for week 3', confidence: 'review', source: 'Delivery schedule confirmation', done: false, dismissed: false },
      { id: 'b3', text: 'Review and approve quote for insulation upgrade', confidence: 'review', source: 'Quote: Insulation Upgrade #Q-114', done: false, dismissed: false },
    ],
    actionsMonth: [],
    history: [
      { date: '20 May', text: 'Confirmed slab materials delivery' },
      { date: '10 May', text: 'Invoice #BRL-2204 received — $4,200' },
    ],
  },
  {
    name: 'Anderson Rd Renovation',
    status: 'on-track',
    lastActivity: 'Yesterday',
    urgentAction: 'Site inspection booked — confirm attendance',
    aiSummary: 'Project is on track. Frame stage inspection is confirmed for Thursday 30 May at 9am — site access and permit display required. Waterproofing certificate still needs to be submitted to council before the next stage.',
    thread: 'From: council@localcouncil.gov.au\nSubject: Inspection Booking Confirmation\n\nDear Mr. Builder,\n\nYour building inspection has been confirmed for Thursday 30 May at 9:00am.\n\nInspector: Graham Walsh\nInspection type: Frame stage\n\nPlease ensure the site is accessible and the permit is displayed.\n\nLocal Council Building Services',
    threadSummary: 'Frame stage inspection confirmed for Thursday 30 May at 9:00am with Graham Walsh. Site access and permit display required.',
    actionsToday: [],
    actionsWeek: [
      { id: 'a1', text: 'Confirm attendance for frame inspection — Thu 30 May 9am', confidence: 'high', source: 'Inspection Booking Confirmation', done: false, dismissed: false },
      { id: 'a2', text: 'Ensure permit is displayed on site before Thursday', confidence: 'high', source: 'Inspection Booking Confirmation', done: false, dismissed: false },
    ],
    actionsMonth: [
      { id: 'a3', text: 'Submit waterproofing certificate to council', confidence: 'review', source: 'Council compliance checklist', done: false, dismissed: false },
    ],
    history: [
      { date: '21 May', text: 'Slab inspection passed — Stage 2 approved' },
      { date: '15 May', text: 'Permit approved by council' },
    ],
  },
]
