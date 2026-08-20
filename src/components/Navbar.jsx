import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Briefcase, Heart, Menu, X, Sparkles, Compass } from 'lucide-react';
import { useSavedJobsContext } from '../context/SavedJobsContext';
import ThemeToggle from './ThemeToggle';
import Button from './Button';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { savedCount } = useSavedJobsContext();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Browse Jobs', path: '/jobs' },
    {
      name: 'Saved Jobs',
      path: '/saved',
      badge: savedCount > 0 ? savedCount : null
    }
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-black/75 backdrop-blur-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-800 p-0.5 shadow-lg shadow-purple-600/30 group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white flex items-center gap-1.5">
                JobFinder
                <span className="text-xs px-1.5 py-0.5 rounded-full font-semibold bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30">
                  Pro
                </span>
              </span>
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium tracking-wide">
                Career Dashboard
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 dark:bg-zinc-900/60 p-1.5 rounded-full border border-slate-200/80 dark:border-zinc-800/80 backdrop-blur-md">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'bg-purple-600/15 dark:bg-purple-600/20 text-purple-600 dark:text-purple-300 border border-purple-500/30 shadow-sm font-semibold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-zinc-800/50 border border-transparent'
                  }`
                }
              >
                {link.name === 'Saved Jobs' && (
                  <Heart className="w-3.5 h-3.5 fill-current text-rose-400" />
                )}
                {link.name}
                {link.badge !== null && link.badge !== undefined && (
                  <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold text-white bg-gradient-to-r from-rose-500 to-purple-600 rounded-full shadow-sm animate-pulse">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Action CTA & Theme Toggle & Mobile Toggle */}
          <div className="flex items-center gap-2.5">
            {/* View Transitions Circular Spread Theme Toggle */}
            <ThemeToggle />

            <Link to="/jobs" className="hidden sm:inline-flex">
              <Button
                variant="specular"
                size="md"
                className="hidden sm:inline-flex"
                icon={Compass}
              >
                Explore Jobs
              </Button>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800/80 border border-slate-200 dark:border-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden border-b border-slate-200/80 dark:border-zinc-800/80 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl ${
          mobileMenuOpen ? 'max-h-80 opacity-100 py-4 px-4' : 'max-h-0 opacity-0 py-0 px-4'
        }`}
      >
        <div className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `px-4 py-3 rounded-xl text-base font-medium transition-all flex items-center justify-between ${
                  isActive
                    ? 'bg-purple-50 dark:bg-purple-600/20 text-purple-600 dark:text-purple-300 border border-purple-200 dark:border-purple-500/40 font-semibold'
                    : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-zinc-900 border border-transparent'
                }`
              }
            >
              <div className="flex items-center gap-3">
                {link.name === 'Saved Jobs' ? (
                  <Heart className="w-4 h-4 text-rose-500 dark:text-rose-400 fill-current" />
                ) : (
                  <Sparkles className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                )}
                {link.name}
              </div>
              {link.badge !== null && link.badge !== undefined && (
                <span className="inline-flex items-center justify-center min-w-[22px] h-5 px-2 text-xs font-bold text-white bg-purple-600 rounded-full">
                  {link.badge}
                </span>
              )}
            </NavLink>
          ))}
          <div className="pt-2">
            <Link to="/jobs" onClick={closeMobileMenu} className="w-full block">
              <Button variant="primary" size="md" className="w-full justify-center">
                Explore All Jobs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
