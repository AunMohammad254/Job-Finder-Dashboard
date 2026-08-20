import { useState, useMemo } from 'react';

import { Heart, Trash2, ArrowUpDown, Briefcase, Filter as FilterIcon } from 'lucide-react';
import { useSavedJobsContext } from '../hooks/useSavedJobs';
import JobCard from '../components/JobCard';
import Dropdown from '../components/Dropdown';
import EmptyState from '../components/EmptyState';
import Button from '../components/Button';

export default function SavedJobs() {
  const { savedJobs, savedCount, clearSaved } = useSavedJobsContext();
  const [selectedType, setSelectedType] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  // Dynamically extract saved job types
  const savedTypeOptions = useMemo(() => {
    return Array.from(new Set(savedJobs.map((j) => j.jobType))).filter(Boolean);
  }, [savedJobs]);

  const sortOptions = [
    { label: 'Recently Added', value: 'recent' },
    { label: 'Title: A to Z', value: 'title-asc' },
    { label: 'Company: A to Z', value: 'company-asc' }
  ];

  // Filter & Sort
  const displayedSavedJobs = useMemo(() => {
    let list = savedJobs;
    if (selectedType) {
      list = list.filter((j) => j.jobType === selectedType);
    }
    return [...list].sort((a, b) => {
      if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
      if (sortBy === 'company-asc') return a.company.localeCompare(b.company);
      return 0; // Default order
    });
  }, [savedJobs, selectedType, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header section */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-2">
            <Heart className="w-4 h-4 fill-current" />
            <span>Persistent Bookmarks</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Saved Job Listings
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Review and track roles you've bookmarked. Stored securely in your browser's LocalStorage.
          </p>
        </div>

        {savedCount > 0 && (
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium bg-white dark:bg-zinc-900/80 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm dark:shadow-none">
              <strong className="text-purple-600 dark:text-purple-400 font-bold">{savedCount}</strong> saved {savedCount === 1 ? 'position' : 'positions'}
            </div>
            <Button
              variant="danger"
              size="sm"
              onClick={clearSaved}
              icon={Trash2}
            >
              Clear All
            </Button>
          </div>
        )}
      </div>

      {/* Optional Toolbar if multiple saved jobs */}
      {savedCount > 1 && (
        <div className="relative z-30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 p-3 rounded-2xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800/80 shadow-sm dark:shadow-none backdrop-blur-md">
          <div className="flex flex-wrap items-center gap-3">
            {savedTypeOptions.length > 1 && (
              <Dropdown
                options={savedTypeOptions}
                value={selectedType}
                onChange={setSelectedType}
                allLabel="All Types"
                placeholder="Filter Type"
                icon={Briefcase}
                className="min-w-40"
              />
            )}
            <Dropdown
              options={sortOptions}
              value={sortBy}
              onChange={(val) => setSortBy(val || 'recent')}
              allLabel="Recently Added"
              placeholder="Sort By"
              icon={ArrowUpDown}
              className="min-w-40"
            />
          </div>

          {selectedType && (
            <button
              type="button"
              onClick={() => setSelectedType('')}
              className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors self-start sm:self-auto px-2 py-1 cursor-pointer"
            >
              Clear filter
            </button>
          )}
        </div>
      )}

      {/* Grid or Empty State */}
      {savedCount > 0 ? (
        displayedSavedJobs.length > 0 ? (
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedSavedJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={FilterIcon}
            title="No Saved Jobs Matching Filter"
            message={`You have no saved jobs with type "${selectedType}".`}
            actionLabel="Reset Filter"
            onAction={() => setSelectedType('')}
          />
        )
      ) : (
        <EmptyState
          icon={Heart}
          title="No Saved Jobs Yet"
          message="You haven't bookmarked any jobs yet. When browsing positions, click the heart icon on any job card to save it for quick review here."
          actionLabel="Explore Jobs"
          actionLink="/jobs"
        />
      )}
    </div>
  );
}
