import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Flame, Briefcase, Zap } from 'lucide-react';
import { useJobsContext } from '../context/JobsContext';
import Hero from '../components/Hero';
import JobCard from '../components/JobCard';
import Button from '../components/Button';
import MagicBento from '../components/MagicBento/MagicBento';

export default function Home() {
  const { jobs } = useJobsContext();
  const featuredJobs = jobs.filter((job) => job.featured).slice(0, 4);

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-16">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Featured Jobs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4 text-purple-400" />
              <span>Handpicked Opportunities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Featured Job Openings
            </h2>
            <p className="text-sm text-zinc-400 mt-1">
              Top prioritized roles from verified tech teams with upfront salary ranges.
            </p>
          </div>
          <Link to="/jobs">
            <Button variant="outline" size="sm" className="group">
              <span>View All {jobs.length} Jobs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {featuredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link to="/jobs" className="w-full block">
            <Button variant="outline" size="md" className="w-full justify-center">
              Explore All {jobs.length} Positions
            </Button>
          </Link>
        </div>
      </section>

      {/* 3. MagicBento Platform Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Why Engineers Choose Us</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Built for Modern Developers
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Interactive, high-fidelity experience designed to eliminate friction in discovering and saving career-defining opportunities.
          </p>
        </div>

        {/* MagicBento Grid */}
        <div className="w-full flex justify-center">
          <MagicBento
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={14}
            glowColor="132, 0, 255"
          />
        </div>
      </section>

      {/* 4. Bottom Call-To-Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 md:p-16 border border-purple-500/30 bg-gradient-to-br from-zinc-950 via-purple-950/40 to-zinc-950 shadow-2xl shadow-purple-950/30 text-center">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5" />
              <span>Ready for your next leap?</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Start Exploring Developer Roles Today
            </h2>

            <p className="text-sm sm:text-base text-zinc-300">
              Browse transparent listings, filter by tech stack or location, and bookmark your dream roles.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link to="/jobs" className="w-full sm:w-auto">
                <Button variant="specular" size="lg" className="w-full sm:w-auto" icon={Briefcase}>
                  Browse All Jobs
                </Button>
              </Link>
              <Link to="/saved" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  View Saved Roles
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
