// Shared UI + domain constants used across multiple pages/components.

/**
 * Candidate experience buckets. Used both as the Apply-form dropdown options
 * (JobDetails) and as the analytics breakdown rows (AdminDashboard). Keep the
 * two in sync by sourcing them here.
 */
export const EXPERIENCE_LEVELS = [
  'Fresher / Entry-Level (0-1 Year)',
  'Junior to Mid-Level (1-3 Years)',
  'Senior Engineer (3-5+ Years)',
  'Lead / Staff (6+ Years)'
];

/**
 * Shared form-field styling (text inputs, selects, textareas). Deduplicated
 * from JobDetails + AdminDashboard which previously each declared it verbatim.
 */
export const INPUT_CLASS =
  'w-full px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors';
