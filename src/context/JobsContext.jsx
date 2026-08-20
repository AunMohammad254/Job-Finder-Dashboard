import { createContext } from 'react';
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


export default JobsContext;
