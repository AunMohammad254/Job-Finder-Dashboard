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
import { useApplicationsContext } from '../context/ApplicationsContext';
import { useJobsContext } from '../context/JobsContext';
import Dropdown from '../components/Dropdown';
import Button from '../components/Button';

const STATUS_CONFIG = {
  'Pending Review': {
    color: 'bg-amber-500/15 text-amber-600  border-amber-500/30',
    dot: 'bg-amber-400'
  },
  'Under Review': {
    color: 'bg-blue-500/15 text-blue-600  border-blue-500/30',
    dot: 'bg-blue-400'
  },
  'Interview Scheduled': {
    color: 'bg-purple-500/15 text-purple-600  border-purple-500/30',
    dot: 'bg-purple-400'
  },
  'Accepted': {
    color: 'bg-emerald-500/15 text-emerald-600  border-emerald-500/30',
    dot: 'bg-emerald-400'
  },
  'Rejected': {
    color: 'bg-rose-500/15 text-rose-600  border-rose-500/30',
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

// Shared input classes for form fields
const inputClass = 'w-full px-4 py-2.5 rounded-xl bg-white  border border-slate-200  text-zinc-900  placeholder-zinc-400  focus:outline-none focus:border-purple-500 transition-colors';

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

  const getInitials = (name) => {
    return name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();
  };

  // AUTH GATE
  if (!isUnlocked) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="relative w-full max-w-md bg-white  border border-slate-200  rounded-3xl p-8 shadow-2xl shadow-purple-100/60  backdrop-blur-2xl text-center">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-purple-500/10  rounded-full blur-3xl pointer-events-none" />

          <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-500  mx-auto mb-6 shadow-xl shadow-purple-500/10">
            <Lock className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600  text-xs font-semibold mb-4">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Restricted Admin Portal</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900  tracking-tight mb-2">
            Administrator Access
          </h1>

          <div className="my-6 p-4 rounded-2xl bg-slate-50  border border-purple-500/20  text-left space-y-2">
            <div className="flex items-center gap-2 text-purple-600  text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Authentication Status
            </div>
            <p className="text-sm text-zinc-700  font-medium leading-relaxed">
              Login / Signup page implementation coming soon...
            </p>
            <p className="text-xs text-zinc-500 ">
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200 ">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-600  text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Admin Control Suite</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900  tracking-tight">
            Recruitment &amp; Applications Dashboard
          </h1>
          <p className="text-sm text-zinc-500  mt-1">
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
          { label: 'Total Applicants', value: metrics.totalApps, sub: 'Across all listings', icon: Users, color: 'text-purple-500 ' },
          { label: 'Active Jobs', value: metrics.totalJobsCount, sub: 'Published listings', icon: Briefcase, color: 'text-blue-500 ' },
          { label: 'Pending Review', value: metrics.pending, sub: 'Requires action', icon: Clock, color: 'text-amber-500 ', valueColor: 'text-amber-600 ' },
          { label: 'Interviews', value: metrics.interviewing, sub: 'Scheduled calls', icon: Calendar, color: 'text-purple-500 ', valueColor: 'text-purple-600 ' },
          { label: 'Accepted / Hired', value: metrics.accepted, sub: 'Offers accepted', icon: CheckCircle, color: 'text-emerald-500 ', valueColor: 'text-emerald-600 ', span: 'col-span-2 lg:col-span-1' }
        ].map(({ label, value, sub, icon: Icon, color, valueColor, span = '' }) => (
          <div key={label} className={`${span} p-4 sm:p-5 rounded-2xl bg-white  border border-slate-200  shadow-sm `}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-zinc-500  uppercase tracking-wider">{label}</span>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <div className={`text-2xl sm:text-3xl font-extrabold ${valueColor || 'text-zinc-900 '}`}>{value}</div>
            <div className="text-[11px] text-zinc-400 mt-1">{sub}</div>
          </div>
        ))}
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200  pb-3 mb-6">
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
                ? 'bg-purple-600/15  text-purple-600  border border-purple-500/40 shadow-sm'
                : 'text-zinc-500  hover:text-zinc-900 :text-white hover:bg-slate-100 :bg-zinc-900'
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
          <div className="relative z-30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white  border border-slate-200  shadow-sm ">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search candidate name, email, or role..."
                className="w-full bg-slate-50  border border-slate-200  rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-900  focus:outline-none transition-colors"
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
            <div className="relative z-10 bg-white  border border-slate-200  rounded-2xl overflow-hidden shadow-sm ">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-zinc-700 ">
                  <thead className="bg-slate-50  text-xs font-semibold uppercase text-zinc-500  border-b border-slate-200 ">
                    <tr>
                      <th className="px-5 py-4">Candidate</th>
                      <th className="px-5 py-4">Target Role</th>
                      <th className="px-5 py-4">Experience</th>
                      <th className="px-5 py-4">Applied Date</th>
                      <th className="px-5 py-4">Pipeline Status</th>
                      <th className="px-5 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 ">
                    {filteredApplications.map((app) => {
                      const statusStyle = STATUS_CONFIG[app.status] || STATUS_CONFIG['Pending Review'];
                      return (
                        <tr key={app.id} className="hover:bg-slate-50 :bg-zinc-850/60 transition-colors">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center font-bold text-xs text-purple-600  shrink-0">
                                {getInitials(app.applicantName)}
                              </div>
                              <div>
                                <div className="font-semibold text-zinc-900 ">{app.applicantName}</div>
                                <div className="text-xs text-zinc-500  flex items-center gap-1">
                                  <Mail className="w-3 h-3 text-zinc-400" />
                                  {app.applicantEmail}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <div className="font-medium text-zinc-900 ">{app.jobTitle}</div>
                            <div className="text-xs text-zinc-500 ">{app.company}</div>
                          </td>

                          <td className="px-5 py-4 text-xs text-zinc-600 ">
                            {app.experienceLevel || 'Not specified'}
                          </td>

                          <td className="px-5 py-4 text-xs text-zinc-500 ">
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
                              className="px-3 py-1.5 rounded-lg bg-slate-100  text-zinc-600  hover:text-zinc-900 :text-white hover:bg-slate-200 :bg-zinc-700 text-xs font-medium transition-colors cursor-pointer"
                            >
                              Details
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteApp(app.id, app.applicantName)}
                              className="p-1.5 rounded-lg text-rose-500  hover:text-rose-600 :text-rose-200 hover:bg-rose-50 :bg-rose-950/40 transition-colors cursor-pointer inline-flex items-center"
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
            <div className="text-center py-16 px-4 rounded-2xl bg-white  border border-slate-200  border-dashed shadow-sm ">
              <Users className="w-10 h-10 text-zinc-400  mx-auto mb-3" />
              <h3 className="text-base font-bold text-zinc-900  mb-1">No Applications Found</h3>
              <p className="text-xs text-zinc-500 ">
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
            <h2 className="text-xl font-bold text-zinc-900 ">
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
                <div key={job.id} className="p-5 rounded-2xl bg-white  border border-slate-200  flex flex-col justify-between gap-4 shadow-sm ">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600  border border-purple-500/25">
                          {job.jobType}
                        </span>
                        <h3 className="text-base font-bold text-zinc-900  mt-2">{job.title}</h3>
                        <p className="text-xs text-zinc-500 ">{job.company}</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-xl bg-slate-100  text-xs font-semibold text-purple-600  border border-slate-200 ">
                        {jobAppsCount} {jobAppsCount === 1 ? 'applicant' : 'applicants'}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs text-zinc-500  mt-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1 text-emerald-600 ">
                        <DollarSign className="w-3.5 h-3.5" /> {job.salary}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100  flex items-center justify-between">
                    <Link
                      to={`/jobs/${job.id}`}
                      className="text-xs text-purple-600  hover:text-purple-700 :text-purple-300 font-medium flex items-center gap-1"
                    >
                      View Live Listing <ArrowUpRight className="w-3 h-3" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDeleteJob(job.id, job.title)}
                      className="text-xs text-rose-500  hover:text-rose-600 :text-rose-300 font-medium flex items-center gap-1 p-1 cursor-pointer"
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
            <div className="p-6 rounded-2xl bg-white  border border-slate-200  shadow-sm ">
              <h3 className="text-base font-bold text-zinc-900  mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-500 " />
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
                        <span className="text-zinc-700  flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                          {status}
                        </span>
                        <span className="text-zinc-500 ">{count} ({percent}%)</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100  rounded-full overflow-hidden">
                        <div className={`h-full ${cfg.dot}`} style={{ width: `${percent}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white  border border-slate-200  shadow-sm ">
              <h3 className="text-base font-bold text-zinc-900  mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-500 " />
                Applicant Experience Levels
              </h3>
              <div className="space-y-4">
                {[
                  'Fresher / Entry-Level (0-1 Year)',
                  'Junior to Mid-Level (1-3 Years)',
                  'Senior Engineer (3-5+ Years)',
                  'Lead / Staff (6+ Years)'
                ].map((exp) => {
                  const count = applications.filter((a) => a.experienceLevel?.includes(exp.split(' ')[0])).length;
                  return (
                    <div key={exp} className="flex items-center justify-between p-3 rounded-xl bg-slate-50  border border-slate-200 ">
                      <span className="text-xs text-zinc-700  font-medium">{exp}</span>
                      <span className="text-xs font-bold text-purple-600  px-2 py-0.5 rounded-md bg-purple-500/10">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60  backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white  border border-slate-200  rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-100/60  max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelectedApp(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-zinc-400 hover:text-zinc-900 :text-white hover:bg-slate-100 :bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                {getInitials(selectedApp.applicantName)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-zinc-900 ">{selectedApp.applicantName}</h2>
                <p className="text-xs text-zinc-500 ">{selectedApp.applicantEmail}</p>
                <div className="mt-2 inline-block">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${STATUS_CONFIG[selectedApp.status]?.color}`}>
                    {selectedApp.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-zinc-700 ">
              {[
                {
                  label: 'Applied Position',
                  content: (
                    <>
                      <div className="font-semibold text-zinc-900 ">{selectedApp.jobTitle}</div>
                      <div className="text-xs text-zinc-500 ">{selectedApp.company} • Submitted on {selectedApp.appliedDate}</div>
                    </>
                  )
                },
                {
                  label: 'Experience Level',
                  content: <div className="text-zinc-700 ">{selectedApp.experienceLevel || 'Not specified'}</div>
                },
                {
                  label: 'Portfolio / Resume URL',
                  content: selectedApp.applicantResume?.startsWith('http') ? (
                    <a href={selectedApp.applicantResume} target="_blank" rel="noreferrer" className="text-purple-600  hover:text-purple-700 :text-purple-300 underline flex items-center gap-1">
                      {selectedApp.applicantResume} <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <div className="text-zinc-500 ">{selectedApp.applicantResume || 'None provided'}</div>
                  )
                }
              ].map(({ label, content }) => (
                <div key={label} className="p-3.5 rounded-xl bg-slate-50  border border-slate-200  space-y-1">
                  <div className="text-[11px] uppercase tracking-wider text-zinc-400  font-semibold">{label}</div>
                  {content}
                </div>
              ))}

              {selectedApp.notes && (
                <div className="p-3.5 rounded-xl bg-slate-50  border border-slate-200  space-y-1">
                  <div className="text-[11px] uppercase tracking-wider text-zinc-400  font-semibold">Recruiter Notes</div>
                  <p className="text-xs text-zinc-600  leading-relaxed">{selectedApp.notes}</p>
                </div>
              )}

              <div className="pt-2">
                <label className="block text-xs font-semibold text-zinc-500  uppercase tracking-wider mb-1.5">
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

            <div className="mt-8 flex items-center justify-between gap-3 pt-4 border-t border-slate-200 ">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60  backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white  border border-slate-200  rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-100/60  max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setShowPostJobModal(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-zinc-400 hover:text-zinc-900 :text-white hover:bg-slate-100 :bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <h2 className="text-xl font-bold text-zinc-900 ">Create New Job Opening</h2>
              <p className="text-xs text-zinc-500  mt-1">
                Fill in the details to publish a new developer job listing.
              </p>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-zinc-600  mb-1">
                  Job Title <span className="text-purple-500">*</span>
                </label>
                <input type="text" required value={newJobTitle} onChange={(e) => setNewJobTitle(e.target.value)} placeholder="e.g. Lead Next.js Developer" className={inputClass} />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600  mb-1">
                  Company Name <span className="text-purple-500">*</span>
                </label>
                <input type="text" required value={newJobCompany} onChange={(e) => setNewJobCompany(e.target.value)} placeholder="e.g. Velocity Labs" className={inputClass} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600  mb-1">Job Type</label>
                  <select
                    value={newJobType}
                    onChange={(e) => setNewJobType(e.target.value)}
                    className={inputClass}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Remote">Remote</option>
                    <option value="Internship">Internship</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-600  mb-1">Location</label>
                  <input type="text" value={newJobLocation} onChange={(e) => setNewJobLocation(e.target.value)} placeholder="e.g. Islamabad, Pakistan" className={inputClass} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600  mb-1">Compensation (Monthly)</label>
                <input type="text" value={newJobSalary} onChange={(e) => setNewJobSalary(e.target.value)} placeholder="e.g. PKR 180,000 - 260,000" className={inputClass} />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600  mb-1">Required Skills (Comma separated)</label>
                <input type="text" value={newJobSkills} onChange={(e) => setNewJobSkills(e.target.value)} placeholder="React, Node.js, GraphQL" className={inputClass} />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600  mb-1">Job Description</label>
                <textarea
                  rows={3}
                  value={newJobDescription}
                  onChange={(e) => setNewJobDescription(e.target.value)}
                  placeholder="Overview of the responsibilities and tech stack..."
                  className={inputClass}
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
