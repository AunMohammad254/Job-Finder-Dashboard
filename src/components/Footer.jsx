import { Link } from 'react-router-dom';
import { Briefcase, Heart, Mail, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200  bg-slate-50  text-zinc-500  relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-purple-500/5  blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-linear-to-br from-purple-600 to-indigo-700 p-0.5 shadow-md shadow-purple-600/30">
                <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-purple-400" />
                </div>
              </div>
              <span className="text-lg font-bold text-zinc-900  tracking-tight">
                JobFinder<span className="text-purple-500 ">Pro</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-500  leading-relaxed">
              Pakistan's premier developer career platform. Discover verified frontend, backend, AI, and design roles with upfront salaries.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white  border border-slate-200  flex items-center justify-center text-zinc-400 hover:text-zinc-900 :text-white hover:border-purple-400/50 :border-purple-500/50 hover:bg-slate-50 :bg-zinc-800 transition-all"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white  border border-slate-200  flex items-center justify-center text-zinc-400 hover:text-zinc-900 :text-white hover:border-purple-400/50 :border-purple-500/50 hover:bg-slate-50 :bg-zinc-800 transition-all"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white  border border-slate-200  flex items-center justify-center text-zinc-400 hover:text-zinc-900 :text-white hover:border-purple-400/50 :border-purple-500/50 hover:bg-slate-50 :bg-zinc-800 transition-all"
                aria-label="X / Twitter"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="mailto:contact@jobfinder.example.com"
                className="w-9 h-9 rounded-lg bg-white  border border-slate-200  flex items-center justify-center text-zinc-400 hover:text-zinc-900 :text-white hover:border-purple-400/50 :border-purple-500/50 hover:bg-slate-50 :bg-zinc-800 transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900  tracking-wider uppercase mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-purple-600 :text-purple-400 transition-colors flex items-center gap-1 group">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="hover:text-purple-600 :text-purple-400 transition-colors flex items-center gap-1 group">
                  Browse All Jobs
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/saved" className="hover:text-purple-600 :text-purple-400 transition-colors flex items-center gap-1 group">
                  Saved Bookmarks
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Categories */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900  tracking-wider uppercase mb-4">
              Popular Roles
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/jobs?type=Remote" className="hover:text-purple-600 :text-purple-400 transition-colors">
                  Remote Engineering
                </Link>
              </li>
              <li>
                <Link to="/jobs?search=React" className="hover:text-purple-600 :text-purple-400 transition-colors">
                  React &amp; Frontend
                </Link>
              </li>
              <li>
                <Link to="/jobs?search=AI" className="hover:text-purple-600 :text-purple-400 transition-colors">
                  AI &amp; Data Science
                </Link>
              </li>
              <li>
                <Link to="/jobs?type=Internship" className="hover:text-purple-600 :text-purple-400 transition-colors">
                  Student Internships
                </Link>
              </li>
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900  tracking-wider uppercase mb-4">
              Locations
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/jobs?location=Karachi" className="hover:text-purple-600 :text-purple-400 transition-colors">
                  Jobs in Karachi
                </Link>
              </li>
              <li>
                <Link to="/jobs?location=Lahore" className="hover:text-purple-600 :text-purple-400 transition-colors">
                  Jobs in Lahore
                </Link>
              </li>
              <li>
                <Link to="/jobs?location=Islamabad" className="hover:text-purple-600 :text-purple-400 transition-colors">
                  Jobs in Islamabad
                </Link>
              </li>
              <li>
                <Link to="/jobs?location=Remote" className="hover:text-purple-600 :text-purple-400 transition-colors">
                  Global Remote
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-200  flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 ">
          <p>© {new Date().getFullYear()} JobFinder Pro. Frontend Assignment Project.</p>
          <p className="flex items-center gap-1">
            Crafted with React, Tailwind CSS &amp; <Heart className="w-3.5 h-3.5 text-rose-500 fill-current inline" />
          </p>
        </div>
      </div>
    </footer>
  );
}
