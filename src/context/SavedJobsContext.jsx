import { createContext, useCallback, useMemo, useRef } from 'react';
import toast from 'react-hot-toast';
import { useSavedJobs } from '../hooks/useSavedJobs';
import { useJobsContext } from '../hooks/useJobs';

const SavedJobsContext = createContext(null);

export function SavedJobsProvider({ children }) {
  // Resolve saved jobs against the LIVE jobs list (admin-added/removed jobs
  // included), not the static seed dataset.
  const { jobs } = useJobsContext();
  const {
    savedIds,
    isSaved,
    toggleSave: toggleSaveInternal,
    clearSaved: clearSavedInternal
  } = useSavedJobs();

  // Keep the latest jobs/savedIds readable from a stable callback without
  // re-creating it. This lets `toggleSave` stay referentially stable so that
  // memo(JobCard) can skip cards whose own saved state didn't change.
  const jobsRef = useRef(jobs);
  jobsRef.current = jobs;
  const savedIdsRef = useRef(savedIds);
  savedIdsRef.current = savedIds;

  const toggleSave = useCallback((id, options = {}) => {
    const stringId = String(id);
    const currentlySaved = savedIdsRef.current.includes(stringId);
    const job = jobsRef.current.find((j) => String(j.id) === stringId);
    const jobTitle = job ? job.title : 'Job';

    toggleSaveInternal(stringId);

    if (options.silent) return;

    if (currentlySaved) {
      toast.error(`Removed "${jobTitle}" from saved jobs`, { icon: '🗑️' });
    } else {
      // Base toast style comes from the global <Toaster>; only the accent differs.
      toast.success(`Saved "${jobTitle}" to your list!`, {
        icon: '❤️',
        style: { border: '1px solid rgba(132, 0, 255, 0.3)' }
      });
    }
  }, [toggleSaveInternal]);

  const clearSaved = useCallback(() => {
    clearSavedInternal();
    toast('Cleared all saved jobs', { icon: '✨' });
  }, [clearSavedInternal]);

  const savedJobs = useMemo(
    () => jobs.filter((job) => savedIds.includes(String(job.id))),
    [jobs, savedIds]
  );

  const value = useMemo(
    () => ({
      savedIds,
      savedJobs,
      savedCount: savedIds.length,
      isSaved,
      toggleSave,
      clearSaved
    }),
    [savedIds, savedJobs, isSaved, toggleSave, clearSaved]
  );

  return (
    <SavedJobsContext.Provider value={value}>
      {children}
    </SavedJobsContext.Provider>
  );
}

export default SavedJobsContext;
