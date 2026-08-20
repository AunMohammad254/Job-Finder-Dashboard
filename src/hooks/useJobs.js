import { useState, useEffect, useCallback } from 'react';
import initialJobs from '../data/jobs';

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

  // Sync to local storage & listen for external changes
  useEffect(() => {
    try {
      localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(jobs));
    } catch (err) {
      console.warn('Failed to save jobs to LocalStorage', err);
    }

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
  }, [jobs]);

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

export default useJobs;
