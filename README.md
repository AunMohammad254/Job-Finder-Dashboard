# JobFinder Pro — Career Dashboard for Developers

A modern, responsive, frontend-only **Job Finder Dashboard** built with **React**, **Tailwind CSS**, **React Router DOM**, and **LocalStorage**.

---

## 🚀 Features

- **Multi-Page Routing**: Complete navigation powered by React Router DOM v6 with dynamic routing (`/jobs/:id`), active tab indicators, and a custom 404 page.
- **Controlled Search & Multi-Filter Engine**: Live search across job titles, company names, and technical skills with dynamic dropdown filters (Job Type & Location) and URL query parameter synchronization (`/jobs?search=...&type=...&location=...`).
- **Persistent Saved Jobs**: 1-click bookmarking system powered by `localStorage` (`jobfinder:savedJobIds`) via a custom `useSavedJobs` hook and global `SavedJobsContext`.
- **Admin Recruitment Dashboard (`/admin-dashboard`)**:
  - Direct access preview portal with auth status notice (`/admin`).
  - Candidate Application Management with status progression (`Pending Review`, `Under Review`, `Interview Scheduled`, `Accepted`, `Rejected`).
  - Real-time application search and status filtering.
  - Detailed Candidate Profile Modal with email reachout and resume links.
  - Job Listing Management (publish new jobs, delete listings).
  - Hiring pipeline analytics and experience level breakdown charts.
- **Dynamic Job Details**: In-depth role overviews with transparent compensation, bulleted responsibilities, benefits, interactive application modals, and similar recommended roles.
- **Interactive UI & Visual Polish**:
  - **Specular WebGL Button (`SpecularButton`)**: Interactive real-time lighting shader tracking cursor movement.
  - **MagicBento Grid (`MagicBento`)**: Animated bento showcase with particle star physics, spotlight cursor following, 3D card tilt, and magnetism.
  - **Real-Time Toast Alerts**: Feedback on bookmarking and application actions using `react-hot-toast`.
- **Fully Responsive**: Mobile-first layout with smooth-opening mobile navigation drawer and adaptive grid breakpoints.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework & Build | React 19 + Vite |
| Styling | Tailwind CSS 4 |
| Routing | React Router DOM v6+ |
| State & Storage | React Context API + LocalStorage |
| Animation & Shaders | GSAP + OGL (WebGL) |
| Icons | Lucide React |
| Notifications | React Hot Toast |

---

## 📁 Project Structure

```
job-finder-dashboard/
├── docs/
│   └── tasks.md              # Complete PRD & evaluation criteria
├── src/
│   ├── components/
│   │   ├── Button.jsx        # Multi-variant button (primary, secondary, outline, specular)
│   │   ├── EmptyState.jsx    # Illustrated fallback component
│   │   ├── Filter.jsx        # Dynamic select dropdown
│   │   ├── Footer.jsx        # Platform footer with social links & categories
│   │   ├── Hero.jsx          # Home page hero section with search router integration
│   │   ├── JobCard.jsx       # Prop-driven job card with bookmark toggle
│   │   ├── Navbar.jsx        # Sticky glassmorphic header & mobile drawer
│   │   ├── SearchBar.jsx     # Controlled search input with clear button
│   │   ├── MagicBento/       # React Bits Magic Bento component
│   │   └── SpecularButton/   # WebGL Specular shader button
│   ├── context/
│   │   └── SavedJobsContext.jsx  # Global saved jobs provider
│   ├── data/
│   │   └── jobs.js           # 10+ realistic tech job listings
│   ├── hooks/
│   │   └── useSavedJobs.js   # LocalStorage read/write encapsulation
│   ├── pages/
│   │   ├── Home.jsx          # Hero, Featured Jobs, MagicBento showcase, CTA
│   │   ├── Jobs.jsx          # Live search, filters, results counter, job grid
│   │   ├── JobDetails.jsx    # Dynamic /jobs/:id route with application modal
│   │   ├── SavedJobs.jsx     # Bookmarked jobs list with clear-all action
│   │   └── NotFound.jsx      # 404 error page
│   ├── lib/
│   │   └── utils.js          # Tailwind class merger (clsx + twMerge)
│   ├── App.jsx               # Application routes & layout wrapper
│   ├── index.css             # Tailwind base & dark mode styles
│   └── main.jsx              # React entrypoint
├── package.json
└── vite.config.js
```

---

## 💻 Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd job-finder-dashboard
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```
