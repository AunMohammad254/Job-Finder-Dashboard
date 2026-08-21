import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Briefcase,
  Clock,
  CheckCircle,
  Search,
  SlidersHorizontal,
  ExternalLink,
  Plus,
  Trash2,
  Mail,
  Calendar,
  X,
  Sparkles,
  BarChart3,
  MapPin,
  DollarSign,
  TrendingUp,
  Layers,
  ArrowUpRight,
  Lock,
  LogOut,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  LayoutDashboard
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useApplicationsContext } from '../hooks/useApplications';
import { useJobsContext } from '../hooks/useJobs';
import { getInitials } from '../lib/utils';
import { EXPERIENCE_LEVELS, INPUT_CLASS } from '../lib/constants';
import Dropdown from '../components/Dropdown';
import Button from '../components/Button';

const STATUS_CONFIG = {
  'Pending Review': {
    color: 'bg-amber-500/15 text-amber-600 dark:text-amber-300 border-amber-500/30',
    dot: 'bg-amber-400'
  },
  'Under Review': {
    color: 'bg-blue-500/15 text-blue-600 dark:text-blue-300 border-blue-500/30',
    dot: 'bg-blue-400'
  },
  'Interview Scheduled': {
    color: 'bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-500/30',
    dot: 'bg-purple-400'
  },
  'Accepted': {
    color: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border-emerald-500/30',
    dot: 'bg-emerald-400'
  },
  'Rejected': {
    color: 'bg-rose-500/15 text-rose-600 dark:text-rose-300 border-rose-500/30',
    dot: 'bg-rose-400'
  }
};

const STATUS_OPTIONS = [
  'Pending Review',
  'Under Review',
  'Interview Scheduled',
  'Accepted',
  'Rejected'
];

export default function AdminDashboard() {
  const { applications, updateApplicationStatus, deleteApplication } = useApplicationsContext();
  const { jobs: jobsList, addJob, deleteJob } = useJobsContext();

  const [isUnlocked, setIsUnlocked] = useState(() => {
    try {
      return sessionStorage.getItem('jobfinder:adminUnlocked') === 'true';
    } catch {
      return false;
    }
  });

  const handleUnlock = () => {
    setIsUnlocked(true);
    try {
      sessionStorage.setItem('jobfinder:adminUnlocked', 'true');
    } catch (e) {
      console.warn(e);
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    try {
      sessionStorage.removeItem('jobfinder:adminUnlocked');
    } catch (e) {
      console.warn(e);
    }
  };

  const [activeTab, setActiveTab] = useState('applications');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);

  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobCompany, setNewJobCompany] = useState('');
  const [newJobLocation, setNewJobLocation] = useState('Karachi, Pakistan');
  const [newJobType, setNewJobType] = useState('Full-time');
  const [newJobSalary, setNewJobSalary] = useState('PKR 150,000 - 220,000');
  const [newJobSkills, setNewJobSkills] = useState('React, Tailwind CSS, TypeScript');
  const [newJobDescription, setNewJobDescription] = useState('');

  const metrics = useMemo(() => {
    const totalApps = applications.length;
    const pending = applications.filter((a) => a.status === 'Pending Review').length;
    const interviewing = applications.filter((a) => a.status === 'Interview Scheduled').length;
    const accepted = applications.filter((a) => a.status === 'Accepted').length;
    const totalJobsCount = jobsList.length;
    return { totalApps, pending, interviewing, accepted, totalJobsCount };
  }, [applications, jobsList]);

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        app.applicantName.toLowerCase().includes(query) ||
        app.applicantEmail.toLowerCase().includes(query) ||
        app.jobTitle.toLowerCase().includes(query) ||
        app.company.toLowerCase().includes(query);
      const matchesStatus = !statusFilter || app.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [applications, searchQuery, statusFilter]);

  const handleStatusChange = (appId, newStatus) => {
    updateApplicationStatus(appId, newStatus);
    toast.success(`Updated status to "${newStatus}"`);
  };

  const handleDeleteApp = (appId, name) => {
    deleteApplication(appId);
    if (selectedApp?.id === appId) setSelectedApp(null);
    toast.error(`Removed application from ${name}`);
  };

  const handleCreateJob = (e) => {
    e.preventDefault();
    if (!newJobTitle || !newJobCompany) {
      toast.error('Please fill required job title and company');
      return;
    }
    const createdJob = addJob({
      title: newJobTitle,
      company: newJobCompany,
      location: newJobLocation,
      jobType: newJobType,
      salary: newJobSalary,
      skills: newJobSkills.split(',').map((s) => s.trim()).filter(Boolean),
      description: newJobDescription || 'Join our high-impact team building cutting-edge web applications.',
      requirements: ['Strong foundations in modern frontend/backend software development.'],
      benefits: ['Market competitive salary', 'Health insurance', 'Flexible hours'],
      featured: true
    });
    setShowPostJobModal(false);
    setNewJobTitle('');
    setNewJobCompany('');
    setNewJobDescription('');
    toast.success(`Created job "${createdJob.title}"! 🎉`);
  };

  const handleDeleteJob = (jobId, title) => {
    deleteJob(jobId);
    toast.error(`Deleted job listing "${title}"`);
  };

  // AUTH GATE
  if (!isUnlocked) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="relative w-full max-w-md dark:bg-zinc-900/90 dark:border-zinc-800 rounded-3xl p-8 shadow-2xl dark:shadow-purple-950/40 backdrop-blur-2xl text-center">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 dark:bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center dark:text-purple-400 mx-auto mb-6 shadow-xl shadow-purple-500/10">
            <Lock className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 dark:text-amber-300 text-xs font-semibold mb-4">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Restricted Admin Portal</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold dark:text-white tracking-tight mb-2">
            Administrator Access
          </h1>

          <div className="my-6 p-4 rounded-2xl dark:bg-zinc-950/80 border dark:border-purple-500/30 text-left space-y-2">
            <div className="flex items-center gap-2 dark:text-purple-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Authentication Status
            </div>
            <p className="text-sm dark:text-zinc-300 font-medium leading-relaxed">
              Login / Signup page implementation coming soon...
            </p>
            <p className="text-xs dark:text-zinc-400">
              For evaluation and candidate management review, you can directly access the full dashboard below.
            </p>
          </div>

          <div className="space-y-3">
            <Button
              variant="primary"
              size="lg"
              onClick={handleUnlock}
              className="w-full justify-center text-sm sm:text-base font-bold shadow-lg shadow-purple-600/30"
              icon={LayoutDashboard}
            >
              <span>Access Admin Dashboard</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>

            <Link to="/" className="w-full block">
              <Button
                variant="ghost"
                size="md"
                className="w-full justify-center text-xs"
                icon={ArrowLeft}
              >
                Return to Public Site
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b dark:border-zinc-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 dark:text-purple-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Admin Control Suite</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold dark:text-white tracking-tight">
            Recruitment &amp; Applications Dashboard
          </h1>
          <p className="dark:text-zinc-400 mt-1">
            Review candidate submissions, update hiring pipelines, and manage active job listings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="primary" size="md" onClick={() => setShowPostJobModal(true)} icon={Plus}>
            Post New Job
          </Button>
          <Link to="/jobs">
            <Button variant="secondary" size="md" icon={ExternalLink}>
              View Live Site
            </Button>
          </Link>
          <Button variant="outline" size="md" onClick={handleLock} icon={LogOut} title="Lock admin session">
            Lock Session
          </Button>
        </div>
      </div>

      {/* Overview Stat Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 mb-8">
        {[
          { label: 'Total Applicants', value: metrics.totalApps, sub: 'Across all listings', icon: Users, color: 'text-purple-500 dark:text-purple-400' },
          { label: 'Active Jobs', value: metrics.totalJobsCount, sub: 'Published listings', icon: Briefcase, color: 'text-blue-500 dark:text-blue-400' },
          { label: 'Pending Review', value: metrics.pending, sub: 'Requires action', icon: Clock, color: 'text-amber-500 dark:text-amber-400', valueColor: 'text-amber-600 dark:text-amber-400' },
          { label: 'Interviews', value: metrics.interviewing, sub: 'Scheduled calls', icon: Calendar, color: 'text-purple-500 dark:text-purple-400', valueColor: 'text-purple-600 dark:text-purple-400' },
          { label: 'Accepted / Hired', value: metrics.accepted, sub: 'Offers accepted', icon: CheckCircle, color: 'text-emerald-500 dark:text-emerald-400', valueColor: 'text-emerald-600 dark:text-emerald-400', span: 'col-span-2 lg:col-span-1' }
        ].map(({ label, value, sub, icon: Icon, color, valueColor, span = '' }) => (
          <div key={label} className={`${span} p-4 sm:p-5 rounded-2xl  dark:bg-zinc-900/80 border dark:border-zinc-800 dark:shadow-none`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium dark:text-zinc-400 uppercase tracking-wider">{label}</span>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <div className={`text-2xl sm:text-3xl font-extrabold ${valueColor || 'dark:text-white'}`}>{value}</div>
            <div className="text-[11px] text-zinc-400 mt-1">{sub}</div>
          </div>
        ))}
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b dark:border-zinc-800 pb-3 mb-6">
        {[
          { id: 'applications', label: `Applications (${applications.length})`, icon: Users },
          { id: 'jobs', label: `Manage Jobs (${jobsList.length})`, icon: Briefcase },
          { id: 'analytics', label: 'Pipeline Analytics', icon: BarChart3 }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === id
                ? 'dark:bg-purple-600/20 dark:text-purple-300 border border-purple-500/40'
                : 'dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white dark:hover:bg-zinc-900'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: APPLICATIONS MANAGER */}
      {activeTab === 'applications' && (
        <div className="space-y-6">
          {/* Filter / Search Bar */}
          <div className="relative z-30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl dark:bg-zinc-900/70 border dark:border-zinc-800 dark:shadow-md">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search candidate name, email, or role..."
                className="w-full dark:bg-zinc-950/80 dark:border-zinc-700/60 rounded-xl pl-10 pr-4 py-2.5 text-sm dark:text-white focus:outline-none transition-colors"
              />
            </div>

            <div className="flex items-center gap-3">
              <Dropdown
                options={STATUS_OPTIONS}
                value={statusFilter}
                onChange={setStatusFilter}
                allLabel="All Application Statuses"
                placeholder="Filter by Status"
                icon={SlidersHorizontal}
                className="w-full sm:min-w-50"
                triggerClassName="py-2 text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Applications Table */}
          {filteredApplications.length > 0 ? (
            <div className="relative z-10 dark:bg-zinc-900/80 border dark:border-zinc-800 rounded-2xl overflow-hidden dark:shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm dark:text-zinc-300">
                  <thead className="dark:bg-zinc-950/80 text-xs font-semibold uppercase dark:text-zinc-400 border-b dark:border-zinc-800">
                    <tr>
                      <th className="px-5 py-4">Candidate</th>
                      <th className="px-5 py-4">Target Role</th>
                      <th className="px-5 py-4">Experience</th>
                      <th className="px-5 py-4">Applied Date</th>
                      <th className="px-5 py-4">Pipeline Status</th>
                      <th className="px-5 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y dark:divide-zinc-800/60">
                    {filteredApplications.map((app) => {
                      const statusStyle = STATUS_CONFIG[app.status] || STATUS_CONFIG['Pending Review'];
                      return (
                        <tr key={app.id} className="hover:bg-slate-50 dark:hover:bg-zinc-850/60 transition-colors">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center font-bold text-xs dark:text-purple-300 shrink-0">
                                {getInitials(app.applicantName)}
                              </div>
                              <div>
                                <div className="font-semibold dark:text-white">{app.applicantName}</div>
                                <div className="text-xs dark:text-zinc-400 flex items-center gap-1">
                                  <Mail className="w-3 h-3 text-zinc-400" />
                                  {app.applicantEmail}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <div className="font-medium dark:text-white">{app.jobTitle}</div>
                            <div className="text-xs dark:text-zinc-400">{app.company}</div>
                          </td>

                          <td className="px-5 py-4 text-xs dark:text-zinc-300">
                            {app.experienceLevel || 'Not specified'}
                          </td>

                          <td className="px-5 py-4 text-xs dark:text-zinc-400">
                            {app.appliedDate}
                          </td>

                          <td className="px-5 py-4">
                            <Dropdown
                              options={STATUS_OPTIONS}
                              value={app.status}
                              onChange={(newStatus) => handleStatusChange(app.id, newStatus)}
                              allLabel="Pending Review"
                              className="min-w-40"
                              triggerClassName={`py-1.5 px-3 text-xs font-semibold ${statusStyle.color}`}
                            />
                          </td>

                          <td className="px-5 py-4 text-right space-x-2">
                            <button
                              type="button"
                              onClick={() => setSelectedApp(app)}
                              className="px-3 py-1.5 rounded-lg dark:bg-zinc-800 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-zinc-700 text-xs font-medium transition-colors cursor-pointer"
                            >
                              Details
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteApp(app.id, app.applicantName)}
                              className="p-1.5 rounded-lg dark:text-rose-400 hover:text-rose-600 dark:hover:text-rose-200 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer inline-flex items-center"
                              title="Delete application"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 px-4 rounded-2xl dark:bg-zinc-900/40 border dark:border-zinc-800/80 border-dashed dark:shadow-none">
              <Users className="w-10 h-10 dark:text-zinc-500 mx-auto mb-3" />
              <h3 className="text-base font-bold dark:text-white mb-1">No Applications Found</h3>
              <p className="text-xs dark:text-zinc-400">
                Try clearing your search query or status filter.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: JOBS MANAGER */}
      {activeTab === 'jobs' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold dark:text-white">
              Published Roles ({jobsList.length})
            </h2>
            <Button variant="primary" size="sm" onClick={() => setShowPostJobModal(true)} icon={Plus}>
              Add New Job Opening
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobsList.map((job) => {
              const jobAppsCount = applications.filter((a) => String(a.jobId) === String(job.id)).length;
              return (
                <div key={job.id} className="p-5 rounded-2xl dark:bg-zinc-900/80 border dark:border-zinc-800 flex flex-col justify-between gap-4 dark:shadow-none">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/10 dark:text-purple-300 border border-purple-500/25">
                          {job.jobType}
                        </span>
                        <h3 className="text-base font-bold dark:text-white mt-2">{job.title}</h3>
                        <p className="text-xs dark:text-zinc-400">{job.company}</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-xl dark:bg-zinc-700/80 text-xs font-semibold dark:text-purple-300 border dark:border-zinc-700">
                        {jobAppsCount} {jobAppsCount === 1 ? 'applicant' : 'applicants'}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs dark:text-zinc-400 mt-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1 dark:text-emerald-400">
                        <DollarSign className="w-3.5 h-3.5" /> {job.salary}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t dark:border-zinc-800/80 flex items-center justify-between">
                    <Link
                      to={`/jobs/${job.id}`}
                      className="text-xs dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium flex items-center gap-1"
                    >
                      View Live Listing <ArrowUpRight className="w-3 h-3" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDeleteJob(job.id, job.title)}
                      className="text-xs dark:text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 font-medium flex items-center gap-1 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: PIPELINE ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl dark:bg-zinc-900/80 border dark:border-zinc-800 dark:shadow-none">
              <h3 className="text-base font-bold dark:text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 dark:text-purple-400" />
                Hiring Funnel Status
              </h3>
              <div className="space-y-3">
                {STATUS_OPTIONS.map((status) => {
                  const count = applications.filter((a) => a.status === status).length;
                  const percent = applications.length > 0 ? Math.round((count / applications.length) * 100) : 0;
                  const cfg = STATUS_CONFIG[status];
                  return (
                    <div key={status} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="dark:text-zinc-300 flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                          {status}
                        </span>
                        <span className="dark:text-zinc-400">{count} ({percent}%)</span>
                      </div>
                      <div className="w-full h-2 dark:bg-zinc-950 rounded-full overflow-hidden">
                        <div className={`h-full ${cfg.dot}`} style={{ width: `${percent}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-6 rounded-2xl dark:bg-zinc-900/80 border dark:border-zinc-800 dark:shadow-none">
              <h3 className="text-base font-bold dark:text-white mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 dark:text-indigo-400" />
                Applicant Experience Levels
              </h3>
              <div className="space-y-4">
                {EXPERIENCE_LEVELS.map((exp) => {
                  const count = applications.filter((a) => a.experienceLevel?.includes(exp.split(' ')[0])).length;
                  return (
                    <div key={exp} className="flex items-center justify-between p-3 rounded-xl dark:bg-zinc-950/60 border dark:border-zinc-800/80">
                      <span className="text-xs dark:text-zinc-300 font-medium">{exp}</span>
                      <span className="text-xs font-bold dark:text-purple-400 px-2 py-0.5 rounded-md bg-purple-500/10">
                        {count} candidates
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* APPLICANT DETAIL MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 dark:bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg dark:bg-zinc-900 border dark:border-zinc-700 rounded-3xl p-6 sm:p-8 shadow-2xl dark:shadow-purple-950/60 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelectedApp(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                {getInitials(selectedApp.applicantName)}
              </div>
              <div>
                <h2 className="text-xl font-bold dark:text-white">{selectedApp.applicantName}</h2>
                <p className="text-xs dark:text-zinc-400">{selectedApp.applicantEmail}</p>
                <div className="mt-2 inline-block">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${STATUS_CONFIG[selectedApp.status]?.color}`}>
                    {selectedApp.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm dark:text-zinc-300">
              {[
                {
                  label: 'Applied Position',
                  content: (
                    <>
                      <div className="font-semibold dark:text-white">{selectedApp.jobTitle}</div>
                      <div className="text-xs dark:text-zinc-400">{selectedApp.company} • Submitted on {selectedApp.appliedDate}</div>
                    </>
                  )
                },
                {
                  label: 'Experience Level',
                  content: <div className="dark:text-zinc-200">{selectedApp.experienceLevel || 'Not specified'}</div>
                },
                {
                  label: 'Portfolio / Resume URL',
                  content: selectedApp.applicantResume?.startsWith('http') ? (
                    <a href={selectedApp.applicantResume} target="_blank" rel="noreferrer" className="dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 underline flex items-center gap-1">
                      {selectedApp.applicantResume} <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <div className="dark:text-zinc-400">{selectedApp.applicantResume || 'None provided'}</div>
                  )
                }
              ].map(({ label, content }) => (
                <div key={label} className="p-3.5 rounded-xl dark:bg-zinc-950 border dark:border-zinc-800 space-y-1">
                  <div className="text-[11px] uppercase tracking-wider dark:text-zinc-500 font-semibold">{label}</div>
                  {content}
                </div>
              ))}

              {selectedApp.notes && (
                <div className="p-3.5 rounded-xl dark:bg-zinc-950 border dark:border-zinc-800 space-y-1">
                  <div className="text-[11px] uppercase tracking-wider dark:text-zinc-500 font-semibold">Recruiter Notes</div>
                  <p className="text-xs dark:text-zinc-300 leading-relaxed">{selectedApp.notes}</p>
                </div>
              )}

              <div className="pt-2">
                <label className="block text-xs font-semibold dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                  Update Pipeline Status
                </label>
                <Dropdown
                  options={STATUS_OPTIONS}
                  value={selectedApp.status}
                  onChange={(val) => {
                    handleStatusChange(selectedApp.id, val);
                    setSelectedApp((prev) => ({ ...prev, status: val }));
                  }}
                  allLabel="Select Status"
                />
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between gap-3 pt-4 border-t dark:border-zinc-800">
              <a
                href={`mailto:${selectedApp.applicantEmail}?subject=Application regarding ${encodeURIComponent(selectedApp.jobTitle)}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-colors"
              >
                <Mail className="w-4 h-4" />
                Contact via Email
              </a>
              <Button variant="ghost" size="sm" onClick={() => setSelectedApp(null)}>
                Close Window
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* POST NEW JOB MODAL */}
      {showPostJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 dark:bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg dark:bg-zinc-900 border dark:border-zinc-700 rounded-3xl p-6 sm:p-8 shadow-2xl dark:shadow-purple-950/60 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setShowPostJobModal(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <h2 className="text-xl font-bold dark:text-white">Create New Job Opening</h2>
              <p className="text-xs dark:text-zinc-400 mt-1">
                Fill in the details to publish a new developer job listing.
              </p>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold dark:text-zinc-300 mb-1">
                  Job Title <span className="text-purple-500">*</span>
                </label>
                <input type="text" required value={newJobTitle} onChange={(e) => setNewJobTitle(e.target.value)} placeholder="e.g. Lead Next.js Developer" className={INPUT_CLASS} />
              </div>

              <div>
                <label className="block text-xs font-semibold dark:text-zinc-300 mb-1">
                  Company Name <span className="text-purple-500">*</span>
                </label>
                <input type="text" required value={newJobCompany} onChange={(e) => setNewJobCompany(e.target.value)} placeholder="e.g. Velocity Labs" className={INPUT_CLASS} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold dark:text-zinc-300 mb-1">Job Type</label>
                  <select
                    value={newJobType}
                    onChange={(e) => setNewJobType(e.target.value)}
                    className={INPUT_CLASS}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Remote">Remote</option>
                    <option value="Internship">Internship</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold dark:text-zinc-300 mb-1">Location</label>
                  <input type="text" value={newJobLocation} onChange={(e) => setNewJobLocation(e.target.value)} placeholder="e.g. Islamabad, Pakistan" className={INPUT_CLASS} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold dark:text-zinc-300 mb-1">Compensation (Monthly)</label>
                <input type="text" value={newJobSalary} onChange={(e) => setNewJobSalary(e.target.value)} placeholder="e.g. PKR 180,000 - 260,000" className={INPUT_CLASS} />
              </div>

              <div>
                <label className="block text-xs font-semibold dark:text-zinc-300 mb-1">Required Skills (Comma separated)</label>
                <input type="text" value={newJobSkills} onChange={(e) => setNewJobSkills(e.target.value)} placeholder="React, Node.js, GraphQL" className={INPUT_CLASS} />
              </div>

              <div>
                <label className="block text-xs font-semibold dark:text-zinc-300 mb-1">Job Description</label>
                <textarea
                  rows={3}
                  value={newJobDescription}
                  onChange={(e) => setNewJobDescription(e.target.value)}
                  placeholder="Overview of the responsibilities and tech stack..."
                  className={INPUT_CLASS}
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <Button variant="ghost" size="md" onClick={() => setShowPostJobModal(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="md">Publish Listing</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
