import { useState, useEffect, useCallback, useContext } from 'react';
import SavedJobsContext from '../context/SavedJobsContext';

const STORAGE_KEY = 'jobfinder:savedJobIds';

export function useSavedJobs() {
  const [savedIds, setSavedIds] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      console.warn('LocalStorage access failed, defaulting to empty saved jobs array', err);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
    } catch (err) {
      console.warn('LocalStorage write failed', err);
    }
  }, [savedIds]);

  const isSaved = useCallback((id) => {
    return savedIds.includes(String(id));
  }, [savedIds]);

  const toggleSave = useCallback((id) => {
    const stringId = String(id);
    setSavedIds((prev) => {
      const exists = prev.includes(stringId);
      if (exists) {
        return prev.filter((item) => item !== stringId);
      } else {
        return [...prev, stringId];
      }
    });
  }, []);

  const clearSaved = useCallback(() => {
    setSavedIds([]);
  }, []);

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
