import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Zap, TrendingUp, Search } from 'lucide-react';
import Button from './Button';

export default function Hero() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/jobs?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/jobs');
    }
  };

  const popularTags = ['React', 'Remote', 'Full-time', 'AI', 'Tailwind CSS', 'Lahore'];

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-600/10 dark:bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-indigo-600/8 dark:bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 dark:border-purple-500/30 text-purple-600 dark:text-purple-300 text-xs sm:text-sm font-medium mb-8 backdrop-blur-md animate-pulse">
          <Sparkles className="w-4 h-4 text-purple-500 dark:text-purple-400" />
          <span>Next-Gen Tech Opportunities in Pakistan &amp; Remote</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-[1.1] mb-6">
          Discover Your Dream <br />
          <span className="bg-gradient-to-r from-purple-500 via-indigo-400 to-purple-600 dark:from-purple-400 dark:via-indigo-300 dark:to-purple-500 bg-clip-text text-transparent">
            Engineering Career
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Explore curated frontend, full stack, mobile, and AI roles from top tech teams with transparent salary ranges and instant application links.
        </p>

        {/* Hero Search Box */}
        <div className="max-w-2xl mx-auto mb-6">
          <form
            onSubmit={handleSearchSubmit}
            className="p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-700/70 shadow-xl shadow-slate-200/60 dark:shadow-purple-950/40 backdrop-blur-xl flex flex-col sm:flex-row items-center gap-2"
          >
            <div className="flex items-center flex-1 w-full pl-3 sm:pl-4">
              <Search className="w-5 h-5 text-zinc-400 mr-3 flex-shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search job title, company, or skill..."
                className="w-full bg-transparent text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 text-sm sm:text-base focus:outline-none py-2"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full sm:w-auto px-6 py-3 rounded-xl sm:rounded-2xl"
            >
              Search Jobs
            </Button>
          </form>
        </div>

        {/* Popular Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          <span className="text-zinc-500 dark:text-zinc-400 font-medium">Popular:</span>
          {popularTags.map((tag) => (
            <Link
              key={tag}
              to={`/jobs?search=${encodeURIComponent(tag)}`}
              className="px-3 py-1 rounded-full bg-white dark:bg-zinc-900/70 border border-slate-200 dark:border-zinc-800 hover:border-purple-500/50 hover:text-purple-600 dark:hover:text-purple-300 text-zinc-600 dark:text-zinc-300 transition-all shadow-sm dark:shadow-none"
            >
              {tag}
            </Link>
          ))}
        </div>

        {/* Quick Highlights / Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-200 dark:border-zinc-800/60">
          <div className="flex items-center justify-center sm:justify-start gap-3 p-4 rounded-2xl bg-white/70 dark:bg-zinc-900/40 border border-slate-200 dark:border-zinc-800/60 shadow-sm dark:shadow-none">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500 dark:text-purple-400 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-zinc-900 dark:text-white">100% Verified</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">Direct employer listings</div>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 p-4 rounded-2xl bg-white/70 dark:bg-zinc-900/40 border border-slate-200 dark:border-zinc-800/60 shadow-sm dark:shadow-none">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 dark:text-emerald-400 flex-shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-zinc-900 dark:text-white">Upfront Salaries</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">No hidden compensation</div>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 p-4 rounded-2xl bg-white/70 dark:bg-zinc-900/40 border border-slate-200 dark:border-zinc-800/60 shadow-sm dark:shadow-none">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 dark:text-indigo-400 flex-shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-zinc-900 dark:text-white">Fast-Track Hiring</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">Instant application links</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
