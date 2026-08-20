import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'jobfinder:applications';

const INITIAL_APPLICATIONS = [
  {
    id: 'app-1',
    jobId: '1',
    jobTitle: 'Senior Frontend Developer',
    company: 'PixelCraft Studios',
    applicantName: 'Hamza Tariq',
    applicantEmail: 'hamza.tariq@example.com',
    applicantResume: 'https://github.com/hamzatariq-dev',
    experienceLevel: 'Senior Engineer (3-5+ Years)',
    appliedDate: '2026-08-19',
    status: 'Interview Scheduled',
    notes: 'Strong portfolio in React 19 and Tailwind CSS. Technical interview set for Friday.'
  },
  {
    id: 'app-2',
    jobId: '3',
    jobTitle: 'UI/UX Product Designer',
    company: 'Aura Creative Lab',
    applicantName: 'Sara Khan',
    applicantEmail: 'sara.khan@designhub.io',
    applicantResume: 'https://dribbble.com/sarakhan',
    experienceLevel: 'Junior to Mid-Level (1-3 Years)',
    appliedDate: '2026-08-18',
    status: 'Under Review',
    notes: 'Impressive Figma design system tokens and mobile interaction prototypes.'
  },
  {
    id: 'app-3',
    jobId: '2',
    jobTitle: 'Full Stack Engineer (Node + React)',
    company: 'NexusByte Technologies',
    applicantName: 'Ali Raza',
    applicantEmail: 'aliraza.cs@example.com',
    applicantResume: 'https://github.com/aliraza-cs',
    experienceLevel: 'Senior Engineer (3-5+ Years)',
    appliedDate: '2026-08-17',
    status: 'Pending Review',
    notes: 'Good experience with PostgreSQL schema design and Docker pipelines.'
  },
  {
    id: 'app-4',
    jobId: '6',
    jobTitle: 'Junior React Developer (Internship)',
    company: 'InnoTech Solutions',
    applicantName: 'Bilal Ahmed',
    applicantEmail: 'bilal.ahmed@univ.edu.pk',
    applicantResume: 'https://github.com/bilalahmed-student',
    experienceLevel: 'Fresher / Entry-Level (0-1 Year)',
    appliedDate: '2026-08-20',
    status: 'Accepted',
    notes: 'Great performance in coding assessment. Offer letter sent for 6-month internship.'
  },
  {
    id: 'app-5',
    jobId: '10',
    jobTitle: 'AI & Machine Learning Engineer',
    company: 'Synthetix Dynamics',
    applicantName: 'Zainab Fatima',
    applicantEmail: 'zainab.ai@example.com',
    applicantResume: 'https://github.com/zainab-ml',
    experienceLevel: 'Lead / Staff (6+ Years)',
    appliedDate: '2026-08-16',
    status: 'Interview Scheduled',
    notes: 'Ex-FAANG researcher with LangChain and PyTorch publications.'
  }
];

export function useApplications() {
  const [applications, setApplications] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_APPLICATIONS));
      return INITIAL_APPLICATIONS;
    } catch {
      return INITIAL_APPLICATIONS;
    }
  });

  // Sync to local storage & listen for external changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
    } catch (err) {
      console.warn('Failed to save applications to LocalStorage', err);
    }

    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setApplications(JSON.parse(e.newValue));
        } catch (err) {
          console.warn('Error parsing storage event for applications', err);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [applications]);

  const addApplication = useCallback((newApp) => {
    const appWithId = {
      id: `app-${Date.now()}`,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Pending Review',
      ...newApp
    };
    setApplications((prev) => [appWithId, ...prev]);
    return appWithId;
  }, []);

  const updateApplicationStatus = useCallback((appId, newStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status: newStatus } : app))
    );
  }, []);

  const deleteApplication = useCallback((appId) => {
    setApplications((prev) => prev.filter((app) => app.id !== appId));
  }, []);

  const getApplicationsByJobId = useCallback(
    (jobId) => {
      return applications.filter((app) => String(app.jobId) === String(jobId));
    },
    [applications]
  );

  return {
    applications,
    addApplication,
    updateApplicationStatus,
    deleteApplication,
    getApplicationsByJobId
  };
}

export default useApplications;
