import { Link } from 'react-router-dom';
import { Heart, MapPin, DollarSign, Calendar, ArrowRight } from 'lucide-react';
import { useSavedJobsContext } from '../context/SavedJobsContext';
import Button from './Button';

const jobTypeColors = {
  'Full-time': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
  'Part-time': 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
  'Remote': 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
  'Internship': 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
  'Contract': 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30'
};

export default function JobCard({ job }) {
  const { isSaved, toggleSave } = useSavedJobsContext();
  const saved = isSaved(job.id);

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div className="group relative flex flex-col justify-between bg-white dark:bg-zinc-900/70 hover:bg-slate-50 dark:hover:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800/80 hover:border-purple-400/50 dark:hover:border-purple-500/40 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:shadow-purple-100/80 dark:hover:shadow-purple-950/20 hover:-translate-y-1 backdrop-blur-sm shadow-sm dark:shadow-none">
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            {/* Company Badge */}
            <div
              className={`w-11 h-11 rounded-xl bg-gradient-to-br ${
                job.companyLogoColor || 'from-purple-600 to-indigo-600'
              } p-0.5 shadow-md flex items-center justify-center flex-shrink-0`}
            >
              <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center font-bold text-xs text-white">
                {getInitials(job.company)}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors text-base leading-snug line-clamp-1">
                <Link to={`/jobs/${job.id}`}>
                  {job.title}
                </Link>
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                {job.company}
              </p>
            </div>
          </div>

          {/* Bookmark / Save Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleSave(job.id);
            }}
            aria-label={saved ? `Unsave ${job.title}` : `Save ${job.title}`}
            className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
              saved
                ? 'bg-rose-500/15 border-rose-500/40 text-rose-500 dark:text-rose-400 shadow-sm shadow-rose-500/10'
                : 'bg-slate-100 dark:bg-zinc-800/60 hover:bg-slate-200 dark:hover:bg-zinc-800 border-slate-200 dark:border-zinc-700/60 text-zinc-400 hover:text-zinc-700 dark:hover:text-white'
            }`}
          >
            <Heart
              className={`w-4 h-4 transition-transform duration-200 active:scale-125 ${
                saved ? 'fill-current text-rose-500 dark:text-rose-400' : ''
              }`}
            />
          </button>
        </div>

        {/* Metadata badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
          <span
            className={`px-2.5 py-1 rounded-full font-medium border ${
              jobTypeColors[job.jobType] || 'bg-slate-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-slate-200 dark:border-zinc-700'
            }`}
          >
            {job.jobType}
          </span>
          <span className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 bg-slate-100 dark:bg-zinc-800/50 px-2.5 py-1 rounded-full border border-slate-200 dark:border-zinc-800">
            <MapPin className="w-3 h-3" />
            {job.location}
          </span>
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-900/50 font-medium">
            <DollarSign className="w-3 h-3" />
            {job.salary}
          </span>
        </div>

        {/* Description snippet */}
        <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-4">
          {job.description}
        </p>

        {/* Skills Chips */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {job.skills?.slice(0, 4).map((skill, idx) => (
            <span
              key={idx}
              className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700/40"
            >
              {skill}
            </span>
          ))}
          {job.skills?.length > 4 && (
            <span className="text-[11px] font-medium px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800/40 text-zinc-400 dark:text-zinc-500">
              +{job.skills.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="pt-3 border-t border-slate-200 dark:border-zinc-800/60 flex items-center justify-between gap-3">
        <span className="text-[11px] text-zinc-400 flex items-center gap-1 font-medium">
          <Calendar className="w-3 h-3" />
          {job.postedDate}
        </span>
        <Link to={`/jobs/${job.id}`}>
          <Button variant="outline" size="sm" className="group/btn text-xs py-1 px-3">
            <span>Details</span>
            <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
