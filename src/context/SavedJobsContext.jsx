import { createContext } from 'react';
import toast from 'react-hot-toast';
import { useSavedJobs } from '../hooks/useSavedJobs';
import jobs from '../data/jobs';

const SavedJobsContext = createContext(null);

export function SavedJobsProvider({ children }) {
  const { savedIds, isSaved, toggleSave: toggleSaveInternal, clearSaved: clearSavedInternal } = useSavedJobs();

  const toggleSave = (id, options = {}) => {
    const stringId = String(id);
    const currentlySaved = isSaved(stringId);
    const job = jobs.find((j) => String(j.id) === stringId);
    const jobTitle = job ? job.title : 'Job';

    toggleSaveInternal(stringId);

    if (!options.silent) {
      if (currentlySaved) {
        toast.error(`Removed "${jobTitle}" from saved jobs`, {
          icon: '🗑️',
          style: {
            background: '#181524',
            color: '#f3f4f6',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px'
          }
        });
      } else {
        toast.success(`Saved "${jobTitle}" to your list!`, {
          icon: '❤️',
          style: {
            background: '#181524',
            color: '#f3f4f6',
            border: '1px solid rgba(132, 0, 255, 0.3)',
            borderRadius: '12px'
          }
        });
      }
    }
  };

  const clearSaved = () => {
    clearSavedInternal();
    toast('Cleared all saved jobs', {
      icon: '✨',
      style: {
        background: '#181524',
        color: '#f3f4f6',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px'
      }
    });
  };

  // Resolve saved job objects from the jobs dataset
  const savedJobs = jobs.filter((job) => savedIds.includes(String(job.id)));

  const value = {
    savedIds,
    savedJobs,
    savedCount: savedIds.length,
    isSaved,
    toggleSave,
    clearSaved
  };

  return (
    <SavedJobsContext.Provider value={value}>
      {children}
    </SavedJobsContext.Provider>
  );
}


export default SavedJobsContext;
