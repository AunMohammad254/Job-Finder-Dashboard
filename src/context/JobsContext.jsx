import { createContext, useContext } from 'react';
import { useJobs } from '../hooks/useJobs';

const JobsContext = createContext(null);

export function JobsProvider({ children }) {
  const jobsData = useJobs();

  return (
    <JobsContext.Provider value={jobsData}>
      {children}
    </JobsContext.Provider>
  );
}

export function useJobsContext() {
  const context = useContext(JobsContext);
  if (!context) {
    throw new Error('useJobsContext must be used within a JobsProvider');
  }
  return context;
}

export default JobsContext;
