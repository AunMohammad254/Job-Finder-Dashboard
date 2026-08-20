import { createContext } from 'react';
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


export default ApplicationsContext;
