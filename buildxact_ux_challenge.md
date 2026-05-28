# Buildxact UX Design Challenge
## Thinking, Process & Prompts
**May 2026**

---

## Overview

This document captures the full thinking, process and approach taken in response to the Buildxact UX design interview task. The brief asked for an AI-assisted inbox experience to help residential builders manage high volumes of emails, invoices, PDFs and supplier communications.

**Important framing:** Everything here is off-the-cuff, assumption-based thinking developed in approximately 1–2 hours. The goal is to demonstrate how I approach ambiguous design problems — not to present a finished or validated solution. I don't know the product deeply, the team, or the user base intimately. What I can show is the thinking process I bring to problems like this.

---

## The Brief (in my own words)

Builders are drowning in emails, invoices, PDFs and supplier communications every day. Important actions get missed, delayed or buried in long threads and attachments. They want help understanding what needs attention — without manually reading and organising every message themselves.

The critical constraint: **trust and accuracy**. Builders need confidence that the AI has identified the right things and that they remain in control. Get this wrong and the feature becomes a liability, not an asset.

**Five things the solution needs to do:**
1. Help users quickly identify high priority messages and actions
2. Summarise emails, attachments and threads into concise insights
3. Extract actions — approvals, overdue invoices, variation requests, supplier delays
4. Let users review, edit or dismiss AI-generated actions before acting
5. Make it easy to return to previous conversations, actions and supporting information

---

## Step 1 — Initial Reaction to the Brief

### Problem Statement
> "How might we help builders quickly understand what needs their attention, without manually reading every message, while keeping them fully in control of any AI-driven actions?"

Three core tensions to solve: **speed, automation, trust.**

### What stood out immediately
- The trust problem is the hardest part — harder than the technical problem
- Transparency around what the AI can and can't do needs to be front and centre
- The human must stay in the decision seat — AI surfaces, human acts
- Onboarding is where this feature will succeed or fail

### Technical questions I'd ask before designing anything
- What does the API actually return when a user syncs their email? What fields are exposed?
- Is the sync real-time or is there latency? How does that affect the UX?
- Can users connect a secondary email if their Buildxact login isn't their main work address?
- Do we get access to full inbox, or can we scope it to specific folders?
- What attachment types can we read and extract data from?

### Initial solution seeds (before any research)
- Email sync with clear, transparent permission onboarding
- Project-based folder organisation — auto-created from inbox data
- Priority tiers: due today / this week / this month
- AI reads attachments and extracts key dates and actions
- Checklist/to-do output per project
- GitHub-style "danger zone" treatment for destructive permissions (delete)

---

## Step 2 — Understanding the User

*No time for real research — but articulating who the user is and what their day looks like shows design maturity. The following is assumption-based, built from what the brief told us from discovery interviews.*

### Persona 1 — The Field Builder
**Solo operator or small business. Mobile-first. Time-poor.**

Out on site most of the day, wearing every hat — builder, project manager, admin. Checks email in gaps between jobs or on the commute. Time is extremely limited, context-switching is constant. Can't afford to miss a critical supplier delay or invoice approval but equally can't sit down and read every thread.

**Design implication:** Fast, scannable, low-friction. The target behaviour is opening a daily digest at the start of the day and knowing exactly what needs actioning. Mobile-first, thumb-friendly, summary-first.

### Persona 2 — The Office Admin
**Small-to-mid business. Desktop. Manages multiple builders and projects.**

Dedicated admin role, more time at a desk, but juggling communication across multiple jobs and team members simultaneously. Has existing systems and workflows. The value here is consolidation, automation and delegation — getting everything into one place and being able to assign tasks to the right person in the field.

**Design implication:** Full visibility, delegation controls, team-based permissions. Desktop-first, comprehensive, command-centre feel.

### Key design tension: Delegation & Sync
If the admin flags something for a field builder, how does that handoff work? This is the critical design problem for mid-sized businesses — and it goes beyond a simple notification. It needs:
- Team-based permission groups (admin updates → whole team syncs)
- User-managed notification preferences
- Project-level status visible to all relevant team members

### The framing device: Two modes of one product
- **Glance Mode** — mobile, Field Builder, summary-first, habit-forming daily digest
- **Command Mode** — desktop, Office Admin, full visibility, delegation controls

The daily/weekly summary as a habit-forming entry point is important. If builders open it every morning like they open their messages, that's a sticky product behaviour.

---

## Step 3 — Competitive & Comparable References

### Core design principle
> Leverage pre-learned behaviour. Avoid bespoke or esoteric interaction patterns — especially for an audience that may not be tech-savvy and doesn't spend a lot of time in tools like this. If we can make the experience feel intuitive from day one by mapping to patterns they already know subconsciously, we've already won half the battle.

### Layer 1 — Universal behaviour references (patterns they already know)
| Reference | What to borrow |
|-----------|---------------|
| **Gmail Priority Inbox / Outlook Focus Inbox** | AI-sorted priority, users already trust this |
| **Superhuman** | Gold standard for inbox triage UX — snooze, action, dismiss gestures |
| **Linear** | How it surfaces urgent items and organises by project — great reference for priority tiers |
| **Slack** | Notification digests, @mentions, surfacing urgent items without overwhelming |
| **Apple Mail / iOS notifications** | Summary-style digests — most builders will already know this on their phone |

### Layer 2 — Technical feasibility references
| Reference | Relevance |
|-----------|-----------|
| **Gmail API / Microsoft Graph API** | The two realistic email sync options — worth understanding what data they expose (sender, subject, body, attachments, dates) |
| **Anthropic / OpenAI APIs** | Summarisation and action extraction layer |

### Layer 3 — Australian construction industry
| Reference | Relevance |
|-----------|-----------|
| **Procore** | Biggest global player — task management and notification patterns worth referencing |
| **Buildxact** | Understand their existing design language before designing within it |
| **Hammertech** | Australian construction safety/compliance platform |
| **Assignar** | Australian field operations platform — good for understanding mobile UX expectations in this industry |
| **ServiceM8** | ⭐ Closest to Persona 1 — extremely simple UX designed for non-tech-savvy tradies, strong benchmark for "seamless for a solo operator" |

---

## Step 4 — Problem Statement

> **"How might we help builders quickly understand what needs their attention, without manually reading every message, while keeping them fully in control of any AI-driven actions?"**

Three core tensions: **speed, automation, trust.**

---

## Step 5 — Solution Direction

*This is pre-research, pre-wireframe thinking. A rough direction, not a finished solution.*

### Onboarding & Setup (make or break)
The onboarding flow is where this feature will succeed or fail. It needs to:

1. **Confirm the right email** — check that the authenticated Buildxact email is the user's main work email. If not, offer the option to add a secondary email
2. **Transparent permissions** — clearly show what Buildxact can read, write and delete. Three toggles. Delete is off by default with a GitHub-style "danger zone" callout: *"Enabling this allows Buildxact to delete emails on your behalf. This cannot be undone."* This offloads informed responsibility to the user
3. **Access scope choice** — full inbox access, or connect a specific folder the user creates and funnels emails into (better for skeptical users who want to control exposure)

### Initial Scan
The first scan will be slow. Strong visual feedback is critical here — if it feels uncertain the user will abandon it. Progress animations showing stages (Connecting → Reading → Scanning attachments → Organising) with reassuring copy. Ideally synced to actual progress, but a placeholder animation is acceptable if that's too complex.

### Project Organisation
- Auto-create project groups from inbox based on: address, sender, company name
- Each project = a living context window for that job (similar to how Claude Projects works — the AI has full context of what's happened on that job)
- At-a-glance project summary → drill down to detail
- Within each project: prioritised to-do checklist — due today / this week / this month
- AI extracts actions from emails and attachments: approvals, invoices, variation requests, delays

### Ongoing Sync & History
- Always-visible last synced timestamp
- Manual resync / reorganise button — triggers a fresh scan and creates new projects if needed
- End of day / end of week digest — what was completed, what's still open, what was missed
- Nudges for incomplete or unactioned items — persistent but not aggressive re-surfacing
- Full chronological history within each project for context and audit trail

### AI Confidence Communication
Every AI-generated action or summary carries a confidence label:
- **"High confidence"** — act on this
- **"Review suggested"** — AI is uncertain, check before acting

Referenced from how Anthropic handles this with Claude — even daily users are reminded the AI can be wrong. The user always makes the final call.

---

## Step 6 — Trust & Control Framework

*This deserves its own section because the brief specifically calls it out — and it's the hardest problem to solve.*

**Rules the AI must follow:**
- Never takes a destructive action (delete, send, approve) without explicit user confirmation
- Every AI output has a visible confidence signal
- Everything is dismissible, editable and overridable — user has the last word always
- No black box behaviour — transparent about what it's doing and why
- Never silently fails — if it can't extract meaning from something, it says so

**Trust by user type:**
- **Existing Buildxact customers** — pre-built product trust, lower barrier, onboarding can be lighter
- **New users** — need more hand-holding, the onboarding flow does the trust-building work upfront, sell the value clearly before asking for permissions

---

## Step 7 — Validation Plan

*Honest framing: in startups, formal validation often gets compressed. These are the minimum viable checkpoints I'd push for.*

### Before build
**Technical spike with engineering** — validate what the API actually returns before designing around assumptions. Understand sync latency, data structure, permission scopes. Don't design a feature that engineering can't actually build.

### During build
**QA collaboration** — bring QA in early to define test cases, including AI failure states and edge cases. QA's analytical perspective catches things designers miss — especially important for an AI feature where output is variable. This is an underrated design relationship.

**Internal dogfooding** — use it on real inboxes, rough edges surface fast.

### At launch
**Beta customers** — prioritise existing Buildxact users who already have product trust. Lower barrier to honest feedback. Watch where they hesitate, misread the AI output, or abandon the flow.

### Post-launch signals to watch
- **Manual resync frequency** — high frequency means users don't trust the auto-sync
- **AI suggestion dismissal rate** — high dismissal means accuracy is off

---

## Presentation Prompt (for Claude)

Use this prompt to generate the interview presentation:

```
Create a professional presentation for a UX design interview at Buildxact, a global construction management platform. The presentation covers my initial thinking and reaction to a design brief — before any research or solution design.

Context of the brief: Buildxact wants an AI-assisted inbox feature to help builders manage high volumes of emails, PDFs, invoices and supplier communications. Key requirements are: priority identification, AI summarisation of emails and threads, extraction of actions (approvals, overdue invoices, variation requests), human review/edit/dismiss controls, and trust/confidence in the AI.

Presentation structure:

1. The Brief — summarise the problem space in my own words: builders are drowning in communications, important things get missed, and any AI solution lives or dies on trust and accuracy

2. Initial Reactions — what stood out immediately: the trust problem is the hardest part, transparency around permissions is critical, and the human must stay in control

3. Understanding the User — two personas: Field Builder (Glance Mode, mobile, habit-forming daily digest) and Office Admin (Command Mode, desktop, delegation + team sync). Key design tension: delegation and sync between the two. Two modes of one product framing.

4. Competitive References — core principle: leverage pre-learned behaviour, avoid bespoke patterns, audience may not be tech-savvy. Universal refs: Gmail Priority Inbox, Superhuman, Linear, Slack. Technical refs: Gmail API / MS Graph, Anthropic API. AU construction refs: ServiceM8 (closest to Persona 1), Procore, Assignar.

5. Problem Statement — "How might we help builders quickly understand what needs their attention, without manually reading every message, while keeping them fully in control of any AI-driven actions?" Three tensions: speed, automation, trust.

6. Solution Direction — onboarding flow (confirm email, transparent permissions, danger zone for delete, folder vs full inbox choice), visual feedback on initial scan, auto project grouping, at-a-glance summary with drill-down, to-do checklist, persistent project context (like Claude Projects), end of day digest, nudges for incomplete items, resync controls, AI confidence labels.

7. Trust & Control Framework — AI never acts destructively without confirmation, every output has a confidence signal, everything is dismissible/editable, transparent about limitations, onboarding builds trust upfront.

8. Validation Plan — technical spike first, QA collaboration on test cases and failure states, internal dogfooding, beta customers (existing Buildxact users), post-launch signals: resync frequency and dismissal rate.

Tone: Confident, thoughtful, honest about assumptions. This is pre-research initial thinking showing process and design maturity — not a finished solution. Slides should feel clean and modern. Practical and no-nonsense to reflect the construction industry context. Open with a slide that frames this as initial thinking before research, close with a slide that sets up what comes next.
```

---

## Wireframe Prototype Prompt (for Claude)

Use this prompt to generate the interactive wireframe:

```
Build a mobile-first wireframe prototype in React showing the onboarding and inbox experience for an AI-assisted email management feature inside a construction management platform called Buildxact. This is a UX wireframe — generic, low fidelity, focused on flow and actions not visual polish. Use a simple greyscale colour palette with one accent colour for primary actions. The prototype should be interactive — tapping or clicking buttons should navigate between screens.

MOBILE SCREENS (Persona 1 — Field Builder)

Screen 1 — Email Setup
Simple onboarding screen. Heading: "Let's connect your inbox." Show a placeholder email address with a confirmation prompt — "Is this your main work email?" Two options: confirm yes, or add a different email. Below that, a secondary option: "Prefer to connect a specific folder instead?" with a short one-line explanation.

Screen 2 — Permissions
Heading: "Here's what Buildxact will have access to." Three permission toggles: Read (on by default), Write (on by default), Delete (off by default). Delete toggle has a highlighted warning callout — danger zone style — that reads: "Enabling this allows Buildxact to delete emails on your behalf. This cannot be undone." Primary CTA: "Confirm and connect."

Screen 3 — Initial Scan / Loading State
Full screen loading experience. Heading: "Scanning your inbox." Step indicator showing four stages: Connecting → Reading emails → Scanning attachments → Organising projects. Current active step highlighted. Reassuring subtext: "This may take a moment. We'll notify you when it's ready."

Screen 4 — Glance Mode Home (Daily Digest)
Main home screen. Top greeting: "Good morning. Here's your day." Summary strip: X items need action today, X due this week. Below: a scrollable project list. Each project card shows project name, last activity timestamp, and the single most urgent pending action. Bottom of screen: last synced timestamp and a manual resync button.

Screen 5 — Project Detail
Tapping a project opens the detail view. Project name as heading. Three collapsible sections: Due Today, Due This Week, Due This Month. Each item is an AI-extracted action — e.g. "Approve variation request — Supalock Roofing" — with a confidence label ("High confidence" or "Review suggested") and two action buttons: confirm or dismiss. Below the action list: a history section showing previous completed actions and conversations in chronological order.

Mobile navigation: Simple bottom nav — Home, Projects, Actions, Settings.

DESKTOP SCREEN (Persona 2 — Office Admin, Command Mode)

A single desktop screen showing the admin view. Three column layout:

Left column — Project list. All active projects listed with status indicators (on track, needs attention, overdue). Search and filter controls at the top.

Centre column — Selected project detail. Same priority tier structure as mobile (today / this week / this month) but expanded, showing more detail per action item. Each action shows the AI confidence label, source email subject line, and confirm / dismiss / delegate controls.

Right column — Thread and context panel. Shows the full email thread or attachment context for the currently selected action item. At the top: an AI-generated summary of the thread in 2-3 sentences. Below: the raw thread for reference.

Top of screen: a team sync bar showing which team members are assigned to this project, with the ability to delegate any action item to a specific person. Delegated items show as a notification on that person's mobile Glance Mode home screen.

Desktop header: Buildxact logo, global search, last synced timestamp, manual resync button, notification bell, user avatar.

Interactions to include:
- Onboarding flow navigates screen by screen
- Tapping a project card on mobile opens project detail
- Confirm and dismiss buttons on action items mark them as done or removed
- Clicking a project on desktop updates the centre and right columns
- Delegate button on desktop opens a simple assignee picker
- Resync button triggers the loading/scanning state
```

---

*Document compiled: 28 May 2026*
