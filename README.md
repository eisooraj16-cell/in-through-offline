# In-Through Offline

A fully offline psychiatrist practice management utility. No cloud, no API keys, no internet required after first load. All data stored in your browser via IndexedDB (GBs of space, not the 5MB localStorage limit).

**Live Demo:** https://n376mbgcufguc.kimi.page

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Installing on Android](#installing-on-android)
3. [Feature Guide](#feature-guide)
4. [Storage & Backup](#storage--backup)
5. [Building from Source](#building-from-source)
6. [Architecture](#architecture)

---

## Quick Start

1. Open the URL in any modern browser (Chrome, Firefox, Edge, Safari)
2. The app auto-seeds 8 demo patients, 3 cases, 5 appointments, 2 scales
3. All data persists between sessions
4. Install as PWA for standalone app experience

---

## Installing on Android

### Method 1: Chrome "Add to Home Screen" (Recommended)

1. Open **https://n376mbgcufguc.kimi.page** in Chrome
2. Wait 2-3 seconds
3. A banner appears at the bottom: **"Add In-Through Offline to Home screen"**
4. Tap **"Add"**
5. The app icon appears on your home screen
6. Launch it like any native app

### Method 2: Manual Install

1. Open the URL in Chrome
2. Tap the **3-dot menu** (top right)
3. Select **"Add to Home screen"**
4. Confirm

### Method 3: Firefox

1. Open the URL in Firefox
2. Tap the **3-dot menu**
3. Select **"Install"** or **"Add to Home screen"**

### iOS (Safari)

1. Open the URL in Safari
2. Tap the **Share button** (square with arrow)
3. Scroll down, tap **"Add to Home Screen"**
4. Tap **"Add"**

> **Note:** Once installed, the app works **fully offline**. The service worker caches all assets. You can turn off WiFi/data and continue using it normally.

---

## Feature Guide

### 1. Dashboard (`/`)

Your daily landing page showing:

- **Greeting** — "Good morning, Doctor." (changes by time of day)
- **Quick Actions** — 4 cards to instantly start:
  - New Case
  - Add Patient
  - Book Appointment
  - Clinical Scale
- **Today's Appointments** — list with status dots
- **Pending Follow-ups** — patients with moderate/severe scale scores
- **Recent Patients** — last 5 seen
- **Quick Notes** — free text scratchpad (auto-saves)
- **Weekly Activity Bar** — appointment count per day

### 2. Patients (`#/patients`)

**Patient List:**
- Table with PT Code, Name, Age/Sex, Status
- **Search** by name or PT code
- **Filter pills:** All / New (< 7 days) / Recent (< 30 days)
- **Sort:** by last visit, name, or PT code
- **Add Patient** button → modal form

**Adding a Patient:**
1. Click "+ Add Patient"
2. Fill: Display Name (use initials like "R.K."), Age, Sex
3. Optional: Phone, Email, Address, Occupation, Emergency Contact
4. PT code auto-generated (PT-0001, PT-0002...)
5. Click Save

**Patient Detail** (`#/patients/:id`):
- Demographics card
- Case History (all cases for this patient)
- Scale Assessments (with severity badges)
- Appointments
- Actions: Edit, Start New Case, Send Scale

**Edit Patient** (`#/patients/:id/edit`):
- Change any field except PT code (immutable)
- **Delete Patient** with confirmation (cascades: deletes all cases, scales, appointments for this patient)

### 3. Case Taking (`#/cases`)

**Template Selection:**

Eight structured templates, pick one:

| Template | When to Use | Questions |
|----------|-------------|-----------|
| **OPD Brief** | Outpatient consultation | 10 (CC, HPI, past psych, medical, meds, family, social, MSE, assessment, plan) |
| **IPD Admission** | Inpatient admission | 10 (comprehensive) |
| **Follow-up** | Return visit | 5 (interval history, symptoms, adherence, MSE, plan) |
| **ER Triage** | Emergency | 8 (rapid assessment) |
| **Delirium/CL** | Consultation-liaison | 9 (delirium workup) |
| **Addiction** | Substance use | 9 (use pattern, withdrawal, motivation) |
| **Child & Adolescent** | Pediatric cases | 10 (developmental, school, family) |
| **Medicolegal** | Legal evaluation | 8 (impartial, capacity, fitness) |

**Case Flow:**
1. Select template → choose patient
2. Progress bar shows step X of Y
3. One question per screen with large textarea
4. **Previous/Next** navigation
5. **Save as Draft** anytime
6. Auto-saves every 30 seconds
7. Final step: Review all answers → **Finalize**

**Case Sheet** (`#/cases/:id`):
- View generated markdown case sheet
- Status badge: Draft or Finalized
- **Print** button (clean print layout)
- **Reopen** button (for finalized cases)
- For drafts: **Continue Editing** link

### 4. Clinical Scales (`#/scales`)

**Three scales supported:**

| Scale | Items | Max Score | Timeframe |
|-------|-------|-----------|-----------|
| **PHQ-9** | 9 | 27 | Last 2 weeks |
| **GAD-7** | 7 | 21 | Last 2 weeks |
| **YMRS** | 11 | varies | Past 48 hours |

**Taking a Scale:**
1. Select patient from dropdown
2. Choose scale (PHQ-9 / GAD-7 / YMRS)
3. One question per screen, radio-style answer cards
4. Auto-advances on selection
5. Submit → score calculated

**Results Page:**
- Total score with severity badge
- Per-question breakdown bars
- **SVG score history chart** showing all past assessments
- Cutoff lines (mild/moderate/severe)
- **Crisis alert** if:
  - PHQ-9 Q9 (self-harm) > 0
  - YMRS Item 9 (aggression) ≥ 3

### 5. Schedule (`#/schedule`)

**Week View:**
- 7-column grid: Mon → Sun
- Shows current week by default
- **Prev / Today / Next** navigation
- Color-coded appointments:
  - 🔵 Blue = Consult
  - 🟢 Green = Follow-up
  - 🟠 Terracotta = New Patient
  - 🟡 Amber = Review
  - 🔴 Pink = Phone
  - ⚪ Gray = Other

**Status visual cues:**
- Done = strikethrough + faded
- Cancelled = strikethrough + gray
- No-show = orange tint

**Adding Appointment:**
1. Click **+** on a day, or "Add Appointment" button
2. Fill: Title, Patient (dropdown), Type, Date, Time, Notes
3. End time auto-calculates (+30 min)
4. Save

### 6. Treatment Guidelines (`#/guidelines`)

18 pre-loaded guidelines covering:
- Depression, Bipolar, Schizophrenia, OCD, Anxiety
- Substance Use, ADHD, Perinatal, Dementia
- Self-harm, Emergency psychiatry

**Filter by:**
- Disorder (dropdown)
- Source (IPS CPG / NICE)
- Phase (acute / maintenance / prevention / etc.)
- Recommendation Type (medication / psychotherapy / safety / etc.)
- Evidence Level (A / B / C / Consensus)
- **Free text search**

Each card shows: recommendation text, evidence badge, source, Indian context (if available).

### 7. Drug Safety (`#/drugs`)

**30+ psychiatric drugs** in database:

**Tab 1: Drug Interactions**
- Select Drug A and Drug B
- Check Interaction
- Shows: severity (contraindicated/major/moderate/minor), description, mechanism, management

**Tab 2: QTc Prolongation**
- Filterable list by risk level (none/low/moderate/high)
- Shows which drugs prolong QTc
- Warning about additive risk with multiple drugs

**Tab 3: Pregnancy & Lactation**
- Select drug
- Shows: FDA category, trimester-specific notes, lactation safety, neonatal risks

### 8. Audit Log (`#/audit`)

Read-only record of every action:
- Create / Update / Delete / Assess / Export
- Timestamp, entity type, description
- Filter by: date range, action type, entity type
- **Export as CSV** button
- 25 entries per page, paginated

### 9. Settings (`#/settings`)

**Session Timeout:**
- Enable/disable
- Set duration (5/10/15/20/30 minutes)
- After idle: warning modal with 60-second countdown

**Backup Your Data:**
- Exports ALL data as JSON file
- Filename: `inthrough-backup-YYYY-MM-DD.json`

**Restore from Backup:**
- Drag & drop or click to select JSON file
- Two modes:
  - **Replace** — clears existing, loads from file
  - **Merge** — adds new records without overwriting
- Shows preview counts before restoring

**Reset Application:**
- Danger zone (red)
- Must type "RESET" to confirm
- Clears everything, re-seeds demo data

**About:**
- App version
- Feature list
- **Storage usage bar** — shows IndexedDB usage vs quota
- **Request Persistent Storage** button (prevents browser from auto-clearing)

---

## Storage & Backup

### How Storage Works

- **Engine:** IndexedDB (not localStorage)
- **Capacity:** Up to 60% of your free disk space (Chrome), typically **GBs**
- **Migration:** If you had data in a previous localStorage version, it auto-migrates on first load
- **Persistent:** Click "Request persistent storage" in Settings → prevents browser cleanup

### Backup Strategy

**Recommended:** Export weekly.

1. Go to **Settings**
2. Click **"Export All Data"**
3. Save the JSON file somewhere safe (Google Drive, email to yourself)

**To Restore:**
1. Go to **Settings**
2. Scroll to **"Restore from Backup"**
3. Drop your JSON file
4. Choose Replace or Merge
5. Click **"Restore Data"**

---

## Deploy to GitHub Pages (Free Hosting)

The easiest way to host this app for free with auto-deployment.

### Step 1: Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name it `in-through-offline` (or any name)
3. Make it **Public** (required for free GitHub Pages)
4. Click **Create repository**

### Step 2: Push the Code

```bash
# Inside the in-through-offline-source folder
cd in-through-offline-source

# Initialize git
git init
git add .
git commit -m "Initial commit"

# Connect to your GitHub repo (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/in-through-offline.git
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** tab
3. Click **Pages** in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. That's it — the workflow file (`.github/workflows/deploy.yml`) is already included

### Step 4: Auto-Deploy

Every time you push to `main`, the app automatically builds and deploys:

```bash
# Make any change, then:
git add .
git commit -m "your change"
git push
# Wait 1-2 minutes
# Your app is live at https://YOUR_USERNAME.github.io/in-through-offline/
```

### Step 5: Install on Android from Your Domain

Once deployed, your URL is:
```
https://YOUR_USERNAME.github.io/in-through-offline/
```

Open this in Chrome on Android → "Add to Home screen" → works offline.

---

### Custom Domain (Optional)

Want `clinic.yourdomain.com` instead of the GitHub URL?

1. Edit `public/CNAME` — replace contents with your domain (e.g., `clinic.yourdomain.com`)
2. Go to repo **Settings → Pages → Custom domain**
3. Enter your domain and save
4. With your domain registrar, add a **CNAME record**:
   - Host: `clinic` (or subdomain)
   - Points to: `YOUR_USERNAME.github.io`
5. Wait for DNS (up to 24 hours)
6. Your app is now at `https://clinic.yourdomain.com`

---

## Building from Source (Local Development)

### Prerequisites

- Node.js 20+
- npm

### Steps

```bash
# 1. Extract the source files
cd in-through-offline-source

# 2. Install dependencies
npm install

# 3. Development server
npm run dev
# Opens on http://localhost:5173

# 4. Production build
npm run build
# Output in dist/ folder

# 5. Deploy dist/ to any static host
# (GitHub Pages, Netlify, Vercel, Firebase, etc.)
```

### Project Structure

```
src/
├── components/          # Shared UI components
│   ├── Sidebar.tsx      # Left navigation (9 items)
│   ├── Topbar.tsx       # Header with greeting/stats
│   ├── Layout.tsx       # App shell + toast system
│   ├── Card.tsx         # Reusable card wrapper
│   ├── Badge.tsx        # Status badges (6 variants)
│   ├── EmptyState.tsx   # Empty list placeholder
│   └── IdleTimeout.tsx  # Session timeout guard
├── pages/               # Route pages (17 routes)
│   ├── Dashboard.tsx
│   ├── PatientsList.tsx
│   ├── PatientDetail.tsx
│   ├── PatientEdit.tsx
│   ├── CaseTaking.tsx
│   ├── CaseFlow.tsx
│   ├── CaseSheet.tsx
│   ├── ScalesList.tsx
│   ├── ScaleAssessment.tsx
│   ├── ScaleResults.tsx
│   ├── Schedule.tsx
│   ├── AppointmentForm.tsx
│   ├── Guidelines.tsx
│   ├── GuidelineDetail.tsx
│   ├── DrugSafety.tsx
│   ├── AuditLog.tsx
│   └── Settings.tsx
├── lib/
│   ├── data.ts          # IndexedDB data layer + all types
│   ├── utils.ts         # Date formatting, helpers
│   ├── guidelines-data.ts  # 18 clinical guidelines
│   └── drug-data.ts     # 30+ drugs + interactions
├── App.tsx              # Router (HashRouter, 17 routes)
├── main.tsx             # Entry point + service worker registration
└── index.css            # Global styles + CSS variables
```

### Customizing

**Colors:** Edit `tailwind.config.js` → custom colors section
**Fonts:** Edit `index.html` → Google Fonts link + `index.css`
**Add a new template:** Edit `CaseFlow.tsx` → template definitions object
**Add drugs:** Edit `lib/drug-data.ts` → add to drugs array
**Add guidelines:** Edit `lib/guidelines-data.ts` → add to guidelines array

---

## Architecture

```
Browser (PWA)
├── IndexedDB (GBs of storage)
│   ├── patients        # Patient records
│   ├── cases           # Case sheets + responses
│   ├── scales          # PHQ-9, GAD-7, YMRS results
│   ├── appointments    # Weekly schedule
│   ├── audit           # Action trail
│   ├── settings        # App config
│   ├── guidelines      # Clinical guidelines
│   └── drug_data       # Medication database
├── Service Worker
│   └── Caches app shell for offline use
└── Memory Cache
    └── Sync reads, async writes to IndexedDB
```

---

## Privacy & Security

- **100% offline** — no network calls, ever
- **No data leaves your device** — not even to GitHub
- **No accounts, no login**
- **No analytics, no tracking**
- GitHub Pages only serves static files (HTML/CSS/JS). Your patient data stays in your browser's IndexedDB and never uploads anywhere.
- IndexedDB is scoped to your browser + domain
- Backup files are plain JSON — keep them secure

> **Important:** GitHub Pages is just a file host. The app runs entirely in your browser. No patient data ever touches GitHub's servers.

---

## License

Free for personal clinical use.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| App shows blank screen | Refresh page, check console (F12) |
| Data disappeared | Check if browser cleared storage → restore from backup |
| "Storage full" error | Export data, reset app, re-import |
| PWA install prompt not showing | Use Chrome, ensure HTTPS |
| Offline mode not working | Ensure first load was on WiFi (service worker needs to cache) |
| Android app crashes | Clear browser cache, reinstall PWA |

---

*Built with React 19 + TypeScript + Vite + Tailwind CSS + IndexedDB*
