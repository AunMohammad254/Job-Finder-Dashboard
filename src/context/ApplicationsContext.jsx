import { createContext, useContext } from 'react';
import { useApplications } from '../hooks/useApplications';

const ApplicationsContext = createContext(null);

export function ApplicationsProvider({ children }) {
  const applicationUtils = useApplications();

  return (
    <ApplicationsContext.Provider value={applicationUtils}>
      {children}
    </ApplicationsContext.Provider>
  );
}

export function useApplicationsContext() {
  const context = useContext(ApplicationsContext);
  if (!context) {
    throw new Error('useApplicationsContext must be used within an ApplicationsProvider');
  }
  return context;
}

export default ApplicationsContext;
