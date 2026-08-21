import { createContext, useMemo } from 'react';
import { useJobs } from '../hooks/useJobs';

const JobsContext = createContext(null);

export function JobsProvider({ children }) {
  const { jobs, addJob, deleteJob, getJobById } = useJobs();

  const value = useMemo(
    () => ({ jobs, addJob, deleteJob, getJobById }),
    [jobs, addJob, deleteJob, getJobById]
  );

  return (
    <JobsContext.Provider value={value}>
      {children}
    </JobsContext.Provider>
  );
}

export default JobsContext;
