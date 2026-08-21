import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { JobsProvider } from './context/JobsContext';
import { SavedJobsProvider } from './context/SavedJobsContext';
import { ApplicationsProvider } from './context/ApplicationsContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Jobs from './pages/Jobs';

// Route-level code splitting: the two primary public pages (Home, Jobs) stay in
// the main bundle for instant first navigation; the detail, saved, admin, and
// fallback routes load on demand so their code — notably the large admin
// dashboard — stays out of the initial download.
const JobDetails = lazy(() => import('./pages/JobDetails'));
const SavedJobs = lazy(() => import('./pages/SavedJobs'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminAuthPreview = lazy(() => import('./pages/AdminAuthPreview'));
const NotFound = lazy(() => import('./pages/NotFound'));

function RouteFallback() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]" role="status" aria-live="polite">
      <span className="h-8 w-8 rounded-full border-2 border-purple-500/30 border-t-purple-500 animate-spin" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <JobsProvider>
          <SavedJobsProvider>
            <ApplicationsProvider>
              <div className="flex flex-col min-h-screen transition-colors duration-300 selection:bg-purple-600 selection:text-white">
                {/* Global Notification Toast Container */}
                <Toaster
                  position="bottom-right"
                  toastOptions={{
                    duration: 3000,
                    style: {
                      background: '#181524',
                      color: '#f3f4f6',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      fontSize: '14px'
                    }
                  }}
                />

                {/* Sticky Navigation Bar */}
                <Navbar />

                {/* Main App Content Body */}
                <main className="flex-1">
                  <Suspense fallback={<RouteFallback />}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/jobs" element={<Jobs />} />
                      <Route path="/jobs/:id" element={<JobDetails />} />
                      <Route path="/saved" element={<SavedJobs />} />
                      <Route path="/admin-dashboard" element={<AdminAuthPreview />} />
                      <Route path="/admin-dashboard/manage" element={<AdminDashboard />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </main>

                {/* Platform Footer */}
                <Footer />
              </div>
            </ApplicationsProvider>
          </SavedJobsProvider>
        </JobsProvider>
      </ThemeProvider>
    </Router>
  );
}
