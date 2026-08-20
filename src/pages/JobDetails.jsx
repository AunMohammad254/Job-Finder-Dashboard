import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Heart,
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  CheckCircle2,
  Share2,
  Building2,
  Sparkles,
  Send,
  X,
  Gift
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useSavedJobsContext } from '../context/SavedJobsContext';
import { useApplicationsContext } from '../context/ApplicationsContext';
import { useJobsContext } from '../context/JobsContext';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import JobCard from '../components/JobCard';
import EmptyState from '../components/EmptyState';

const inputClass =
  'w-full px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors';

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs, getJobById } = useJobsContext();
  const { isSaved, toggleSave } = useSavedJobsContext();
  const { addApplication, applications } = useApplicationsContext();
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantResume, setApplicantResume] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const job = getJobById(id);

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <EmptyState
          title="Job Listing Not Found"
          message={`The job listing with ID "${id}" could not be found. It may have expired or been removed.`}
          actionLabel="Return to Jobs Directory"
          actionLink="/jobs"
        />
      </div>
    );
  }

  const saved = isSaved(job.id);

  const getInitials = (name) =>
    name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    toast.success('Job link copied to clipboard!');
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail) {
      toast.error('Please enter your name and email');
      return;
    }
    setIsSubmitted(true);
    addApplication({
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      applicantName,
      applicantEmail,
      applicantResume: applicantResume || 'Not provided',
      experienceLevel: experienceLevel || 'Not specified'
    });
    setTimeout(() => {
      setShowApplyModal(false);
      setIsSubmitted(false);
      setApplicantName('');
      setApplicantEmail('');
      setApplicantResume('');
      setExperienceLevel('');
      toast.success(`Application submitted for ${job.title}! 🎉`);
    }, 600);
  };

  const relatedJobs = jobs
    .filter((j) => j.id !== job.id && (j.jobType === job.jobType || j.location === job.location))
    .slice(0, 2);

  const existingApp = applications.find((a) => String(a.jobId) === String(job.id));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Back button */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to previous page</span>
        </button>
      </div>

      {/* Main Details Card */}
      <div className="bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-lg shadow-slate-200/60 dark:shadow-purple-950/20 mb-12">

        {/* Applied banner */}
        {existingApp && (
          <div className="mb-6 p-4 rounded-2xl bg-purple-50 dark:bg-gradient-to-r dark:from-purple-950/40 dark:via-zinc-900/60 dark:to-purple-950/30 border border-purple-200 dark:border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-purple-700 dark:text-purple-300 font-semibold">
              <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
              </div>
              <div>
                <span>You submitted an application for this role on {existingApp.appliedDate}</span>
                <p className="text-[11px] text-purple-500/70 dark:text-zinc-400 font-normal mt-0.5">Tracked and managed via Admin Dashboard</p>
              </div>
            </div>
            <span className="self-start sm:self-auto px-3 py-1 rounded-xl bg-purple-100 dark:bg-purple-600/30 text-purple-700 dark:text-purple-200 border border-purple-300 dark:border-purple-500/40 font-bold tracking-wide">
              Status: {existingApp.status}
            </span>
          </div>
        )}

        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-slate-200 dark:border-zinc-800">
          <div className="flex items-start gap-4 sm:gap-5">
            {/* Logo box */}
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${job.companyLogoColor || 'from-purple-600 to-indigo-600'} p-0.5 shadow-xl flex-shrink-0 flex items-center justify-center`}>
              <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center font-bold text-lg sm:text-xl text-white">
                {getInitials(job.company)}
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-600 dark:text-purple-300">
                  {job.jobType}
                </span>
                {job.featured && (
                  <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-600 dark:text-amber-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Featured Role
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-2">
                {job.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                <span className="flex items-center gap-1.5 font-medium text-zinc-700 dark:text-zinc-300">
                  <Building2 className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                  {job.company}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                  Posted {job.postedDate}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 self-start md:self-auto w-full md:w-auto">
            <button
              type="button"
              onClick={handleShare}
              title="Share job"
              className="p-3 rounded-xl bg-slate-100 dark:bg-zinc-800/80 hover:bg-slate-200 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <Share2 className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => toggleSave(job.id)}
              aria-label={saved ? 'Remove from saved' : 'Save job'}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                saved
                  ? 'bg-rose-50 dark:bg-rose-500/20 border-rose-300 dark:border-rose-500/40 text-rose-500 dark:text-rose-400'
                  : 'bg-slate-100 dark:bg-zinc-800/80 hover:bg-slate-200 dark:hover:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
            </button>

            <Button
              variant="specular"
              size="lg"
              onClick={() => setShowApplyModal(true)}
              className="flex-1 md:flex-none justify-center"
              icon={Send}
            >
              {existingApp ? 'Re-apply / Update' : 'Apply Now'}
            </Button>
          </div>
        </div>

        {/* Compensation Box */}
        <div className="my-8 p-5 rounded-2xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1">
              Offered Compensation (Transparent)
            </div>
            <div className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <DollarSign className="w-6 h-6" />
              {job.salary}
            </div>
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400 sm:text-right">
            Full employer-paid benefits &amp; health coverage included.
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-zinc-600 dark:text-zinc-300">
          {/* About the Role */}
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-3 tracking-tight">About the Role</h2>
            <p className="text-sm sm:text-base leading-relaxed">{job.description}</p>
          </div>

          {/* Key Requirements */}
          {job.requirements?.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-3 tracking-tight">
                Key Requirements &amp; Qualifications
              </h2>
              <ul className="space-y-3 text-sm sm:text-base">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-500 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits */}
          {job.benefits?.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-3 tracking-tight flex items-center gap-2">
                <Gift className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                Perks &amp; Benefits
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {job.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-950/40 border border-slate-200 dark:border-zinc-800/80 text-sm flex items-center gap-2.5"
                  >
                    <div className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-3 tracking-tight">
              Required Technologies &amp; Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {job.skills?.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 font-medium text-xs sm:text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 pt-8 border-t border-slate-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-zinc-500 dark:text-zinc-400 text-center sm:text-left">
            Interested in this position? Submit your application directly to the hiring team.
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={() => setShowApplyModal(true)}
            className="w-full sm:w-auto justify-center"
            icon={Send}
          >
            Apply for this Role
          </Button>
        </div>
      </div>

      {/* Related Jobs Section */}
      {relatedJobs.length > 0 && (
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
            Similar Openings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedJobs.map((relJob) => (
              <JobCard key={relJob.id} job={relJob} />
            ))}
          </div>
        </div>
      )}

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-100/60 dark:shadow-purple-950/60">
            <button
              type="button"
              onClick={() => setShowApplyModal(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-1">
                <Send className="w-3.5 h-3.5" />
                <span>Direct Application</span>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Apply for {job.title}</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                At {job.company} • {job.location}
              </p>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1.5">
                  Full Name <span className="text-purple-500">*</span>
                </label>
                <input type="text" required value={applicantName} onChange={(e) => setApplicantName(e.target.value)} placeholder="e.g. Aun Abbas" className={inputClass} />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1.5">
                  Email Address <span className="text-purple-500">*</span>
                </label>
                <input type="email" required value={applicantEmail} onChange={(e) => setApplicantEmail(e.target.value)} placeholder="e.g. aun@example.com" className={inputClass} />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1.5">
                  Portfolio / GitHub / LinkedIn URL
                </label>
                <input type="url" value={applicantResume} onChange={(e) => setApplicantResume(e.target.value)} placeholder="https://github.com/yourhandle" className={inputClass} />
              </div>

              <div>
                <Dropdown
                  label="Experience Level"
                  options={[
                    'Fresher / Entry-Level (0-1 Year)',
                    'Junior to Mid-Level (1-3 Years)',
                    'Senior Engineer (3-5+ Years)',
                    'Lead / Staff (6+ Years)'
                  ]}
                  value={experienceLevel}
                  onChange={setExperienceLevel}
                  allLabel="Select Experience Level"
                  placeholder="Select Experience Level"
                  triggerClassName="py-2.5"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <Button variant="ghost" size="md" onClick={() => setShowApplyModal(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="md" disabled={isSubmitted} className="min-w-[120px] justify-center">
                  {isSubmitted ? 'Submitting...' : 'Submit Application'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
