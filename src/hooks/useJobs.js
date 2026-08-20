import { useState, useEffect, useCallback, useContext } from 'react';
import initialJobs from '../data/jobs';
import JobsContext from '../context/JobsContext';

const JOBS_STORAGE_KEY = 'jobfinder:jobsList';

export function useJobs() {
  const [jobs, setJobs] = useState(() => {
    try {
      const stored = localStorage.getItem(JOBS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(initialJobs));
      return initialJobs;
    } catch {
      return initialJobs;
    }
  });

  // Effect 1: persist to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(jobs));
    } catch (err) {
      console.warn('Failed to save jobs to LocalStorage', err);
    }
  }, [jobs]);

  // Effect 2: set up the cross-tab storage listener once
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === JOBS_STORAGE_KEY && e.newValue) {
        try {
          setJobs(JSON.parse(e.newValue));
        } catch (err) {
          console.warn('Error parsing storage event for jobs', err);
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const addJob = useCallback((jobData) => {
    const newJob = {
      id: String(Date.now()),
      postedDate: new Date().toISOString().split('T')[0],
      featured: true,
      companyLogoColor: 'from-purple-600 to-indigo-600',
      requirements: ['Proven background in software engineering and modern architectures.'],
      benefits: ['Competitive compensation', 'Remote flexibility', 'Health coverage'],
      ...jobData
    };
    setJobs((prev) => [newJob, ...prev]);
    return newJob;
  }, []);

  const deleteJob = useCallback((jobId) => {
    setJobs((prev) => prev.filter((j) => String(j.id) !== String(jobId)));
  }, []);

  const getJobById = useCallback(
    (jobId) => {
      return jobs.find((j) => String(j.id) === String(jobId));
    },
    [jobs]
  );

  return {
    jobs,
    addJob,
    deleteJob,
    getJobById
  };
}

export function useJobsContext() {
  const context = useContext(JobsContext);
  if (!context) {
    throw new Error('useJobsContext must be used within a JobsProvider');
  }
  return context;
}

export default useJobs;
