import { createContext, useMemo } from 'react';
import { useApplications } from '../hooks/useApplications';

const ApplicationsContext = createContext(null);

export function ApplicationsProvider({ children }) {
  const {
    applications,
    addApplication,
    updateApplicationStatus,
    deleteApplication,
    getApplicationsByJobId
  } = useApplications();

  const value = useMemo(
    () => ({
      applications,
      addApplication,
      updateApplicationStatus,
      deleteApplication,
      getApplicationsByJobId
    }),
    [applications, addApplication, updateApplicationStatus, deleteApplication, getApplicationsByJobId]
  );

  return (
    <ApplicationsContext.Provider value={value}>
      {children}
    </ApplicationsContext.Provider>
  );
}

export default ApplicationsContext;
