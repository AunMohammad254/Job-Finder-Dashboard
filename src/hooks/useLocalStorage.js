import { useState, useEffect, useRef } from 'react';

/**
 * Persistent state backed by localStorage.
 *
 * Consolidates the lazy-init + persist-on-change + cross-tab-sync pattern that
 * was previously reimplemented in useJobs, useApplications and useSavedJobs.
 *
 * @param {string} key                 localStorage key
 * @param {*} initialValue             fallback when nothing is stored / parse fails
 * @param {object} [options]
 * @param {boolean} [options.crossTab] keep in sync across tabs (default true)
 * @param {(v:*) => boolean} [options.validate] guard for parsed data; must be a
 *        stable reference (e.g. `Array.isArray`). Rejected values fall back to
 *        `initialValue` on read and are ignored on cross-tab updates.
 * @returns {[*, Function]} a `[value, setValue]` pair, like useState.
 */
export function useLocalStorage(key, initialValue, { crossTab = true, validate } = {}) {
  const readValue = () => {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return initialValue;
      const parsed = JSON.parse(raw);
      if (validate && !validate(parsed)) return initialValue;
      return parsed;
    } catch {
      return initialValue;
    }
  };

  const [value, setValue] = useState(readValue);

  // When a change originates from another tab we must not immediately write it
  // straight back — otherwise the two tabs ping-pong storage events forever.
  const skipNextPersist = useRef(false);

  useEffect(() => {
    if (skipNextPersist.current) {
      skipNextPersist.current = false;
      return;
    }
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn(`Failed to persist "${key}" to localStorage`, err);
    }
  }, [key, value]);

  useEffect(() => {
    if (!crossTab) return;
    const handleStorage = (e) => {
      if (e.key !== key || e.newValue == null) return;
      try {
        const parsed = JSON.parse(e.newValue);
        if (validate && !validate(parsed)) return;
        skipNextPersist.current = true;
        setValue(parsed);
      } catch (err) {
        console.warn(`Failed to parse storage event for "${key}"`, err);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [key, crossTab, validate]);

  return [value, setValue];
}

export default useLocalStorage;
