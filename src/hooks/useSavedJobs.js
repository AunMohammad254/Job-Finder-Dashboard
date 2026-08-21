import { useCallback, useContext } from 'react';
import { useLocalStorage } from './useLocalStorage';
import SavedJobsContext from '../context/SavedJobsContext';

const STORAGE_KEY = 'jobfinder:savedJobIds';

export function useSavedJobs() {
  const [savedIds, setSavedIds] = useLocalStorage(STORAGE_KEY, [], {
    validate: Array.isArray
  });

  const isSaved = useCallback((id) => savedIds.includes(String(id)), [savedIds]);

  const toggleSave = useCallback((id) => {
    const stringId = String(id);
    setSavedIds((prev) =>
      prev.includes(stringId)
        ? prev.filter((item) => item !== stringId)
        : [...prev, stringId]
    );
  }, [setSavedIds]);

  const clearSaved = useCallback(() => setSavedIds([]), [setSavedIds]);

  return { savedIds, isSaved, toggleSave, clearSaved };
}

export function useSavedJobsContext() {
  const context = useContext(SavedJobsContext);
  if (!context) {
    throw new Error('useSavedJobsContext must be used within a SavedJobsProvider');
  }
  return context;
}

export default useSavedJobs;
