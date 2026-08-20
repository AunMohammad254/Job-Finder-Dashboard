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
import JobDetails from './pages/JobDetails';
import SavedJobs from './pages/SavedJobs';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

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
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/jobs/:id" element={<JobDetails />} />
                    <Route path="/saved" element={<SavedJobs />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
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
