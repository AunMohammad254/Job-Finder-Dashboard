import { useCallback, useContext } from 'react';
import { useLocalStorage } from './useLocalStorage';
import initialJobs from '../data/jobs';
import JobsContext from '../context/JobsContext';

const JOBS_STORAGE_KEY = 'jobfinder:jobsList';

export function useJobs() {
  const [jobs, setJobs] = useLocalStorage(JOBS_STORAGE_KEY, initialJobs, {
    validate: Array.isArray
  });

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
  }, [setJobs]);

  const deleteJob = useCallback((jobId) => {
    setJobs((prev) => prev.filter((j) => String(j.id) !== String(jobId)));
  }, [setJobs]);

  const getJobById = useCallback(
    (jobId) => jobs.find((j) => String(j.id) === String(jobId)),
    [jobs]
  );

  return { jobs, addJob, deleteJob, getJobById };
}

export function useJobsContext() {
  const context = useContext(JobsContext);
  if (!context) {
    throw new Error('useJobsContext must be used within a JobsProvider');
  }
  return context;
}

export default useJobs;
