import { Link } from 'react-router-dom';
import { Heart, Trash2, ArrowRight, Sparkles, Compass } from 'lucide-react';
import { useSavedJobsContext } from '../context/SavedJobsContext';
import JobCard from '../components/JobCard';
import EmptyState from '../components/EmptyState';
import Button from '../components/Button';

export default function SavedJobs() {
  const { savedJobs, savedCount, clearSaved } = useSavedJobsContext();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header section */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase tracking-wider mb-2">
            <Heart className="w-4 h-4 fill-current" />
            <span>Persistent Bookmarks</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Saved Job Listings
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Review and track roles you've bookmarked. Stored securely in your browser's LocalStorage.
          </p>
        </div>

        {savedCount > 0 && (
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="text-xs text-zinc-400 font-medium bg-zinc-900/80 px-3.5 py-2 rounded-xl border border-zinc-800">
              <strong className="text-purple-400 font-bold">{savedCount}</strong> saved {savedCount === 1 ? 'position' : 'positions'}
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

      {/* Grid or Empty State */}
      {savedCount > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
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
