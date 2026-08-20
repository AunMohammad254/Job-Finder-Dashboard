<div align="center">

# 🚀 JobFinder Pro

### *A Next-Generation Career Dashboard for Developers*

<br/>

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-job--finder--dashboard--khaki.vercel.app-7c3aed?style=for-the-badge&logo=vercel&logoColor=white)](https://job-finder-dashboard-khaki.vercel.app/)

<br/>

![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router_v7-CA4245?style=flat-square&logo=react-router&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

<br/>

> A sleek, fully responsive, **frontend-only** job discovery platform built for modern developers.
> Featuring real-time filtering, persistent bookmarks, a full admin suite, and stunning WebGL-powered UI components.

<br/>

---

</div>

## ✨ Features

<table>
<tr>
<td width="50%">

### 🔍 Smart Search & Filtering
Live search across job titles, companies & skills with dynamic dropdown filters for **Job Type** and **Location** — synced to URL query parameters (`?search=&type=&location=`).

</td>
<td width="50%">

### 🔖 Persistent Bookmarks
One-click saving powered by `localStorage` via a custom `useSavedJobs` hook and global `SavedJobsContext`. Your saved roles survive page refreshes!

</td>
</tr>
<tr>
<td width="50%">

### 🛡️ Admin Dashboard (`/admin`)
Full recruitment suite: manage applications, track hiring pipelines, publish/delete job listings, view candidate modals, and send email outreach — all in one place.

</td>
<td width="50%">

### 🎨 Stunning Visual Components
- **SpecularButton** — Real-time WebGL lighting shader tracking cursor movement
- **MagicBento** — Particle physics, 3D card tilt & spotlight cursor following
- **Dark / Light Mode** — Seamless system-aware theme toggling

</td>
</tr>
<tr>
<td width="50%">

### 📄 Dynamic Job Details
Rich role pages at `/jobs/:id` — transparent compensation, bulleted responsibilities, a full benefits list, an interactive application modal, and recommended similar roles.

</td>
<td width="50%">

### 📱 Fully Responsive
Mobile-first layout with a smooth animated navigation drawer, adaptive grid breakpoints, and a polished glassmorphic sticky header across all screen sizes.

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

| Layer | Technology |
|:---|:---|
| ⚛️ Framework | React 19 + Vite 8 |
| 🎨 Styling | Tailwind CSS v4 |
| 🧭 Routing | React Router DOM v7 |
| 🗄️ State & Storage | React Context API + LocalStorage |
| 🌀 Animation | GSAP + OGL (WebGL) |
| 🖼️ Icons | Lucide React |
| 🔔 Notifications | React Hot Toast |
| ☁️ Deployment | Vercel |

---

## 📁 Project Structure

```
job-finder-dashboard/
├── 📂 src/
│   ├── 📂 components/
│   │   ├── Button.jsx            # Multi-variant button (primary, secondary, outline, specular)
│   │   ├── Dropdown.jsx          # Controlled select dropdown with icon support
│   │   ├── EmptyState.jsx        # Illustrated fallback component
│   │   ├── Footer.jsx            # Platform footer with social links & categories
│   │   ├── Hero.jsx              # Home page hero section with search integration
│   │   ├── JobCard.jsx           # Prop-driven job card with bookmark toggle
│   │   ├── Navbar.jsx            # Sticky glassmorphic header & mobile drawer
│   │   ├── Pagination.jsx        # Accessible paginator component
│   │   ├── SearchBar.jsx         # Controlled input with clear button
│   │   ├── 📂 MagicBento/        # Animated bento grid with particle physics
│   │   └── 📂 SpecularButton/    # WebGL specular shader button
│   ├── 📂 context/
│   │   └── SavedJobsContext.jsx  # Global saved jobs provider & counter
│   ├── 📂 data/
│   │   └── jobs.js               # 10+ realistic tech job listings dataset
│   ├── 📂 hooks/
│   │   └── useSavedJobs.js       # LocalStorage read/write encapsulation
│   ├── 📂 pages/
│   │   ├── Home.jsx              # Hero, Featured Jobs, MagicBento, CTA
│   │   ├── Jobs.jsx              # Live search, filters, results counter, job grid
│   │   ├── JobDetails.jsx        # Dynamic /jobs/:id route + application modal
│   │   ├── SavedJobs.jsx         # Bookmarked jobs with sort, filter & clear-all
│   │   ├── AdminDashboard.jsx    # Full recruitment management suite
│   │   └── NotFound.jsx          # Custom 404 error page
│   ├── 📂 lib/
│   │   └── utils.js              # Tailwind class merger (clsx + twMerge)
│   ├── App.jsx                   # Application routes & layout wrapper
│   ├── index.css                 # Tailwind base & dark mode styles
│   └── main.jsx                  # React entry point
├── package.json
└── vite.config.js
```

---

## 💻 Getting Started

### Prerequisites
- **Node.js** v18+
- **npm** v9+

### 1. Clone the repository
```bash
git clone https://github.com/AunMohammad254/Job-Finder-Dashboard.git
cd Job-Finder-Dashboard
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```

### 5. Preview the production build
```bash
npm run preview
```

---

## 🔗 Pages & Routes

| Route | Page | Description |
|:---|:---|:---|
| `/` | Home | Hero section, featured jobs, MagicBento showcase |
| `/jobs` | Browse Jobs | Full job listings with live search & filters |
| `/jobs/:id` | Job Details | Individual role page with application modal |
| `/saved` | Saved Jobs | Bookmarked roles with sort & filter controls |
| `/admin` | Admin Dashboard | Recruitment management portal |
| `*` | 404 Not Found | Custom error page |

---

<div align="center">

**Built with ❤️ using React & Tailwind CSS**

[![Live Demo](https://img.shields.io/badge/View%20Live%20Demo-7c3aed?style=for-the-badge&logo=vercel&logoColor=white)](https://job-finder-dashboard-khaki.vercel.app/)

</div>
