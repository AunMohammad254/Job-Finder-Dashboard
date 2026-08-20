import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowRight, Lock, Sparkles, LayoutDashboard, ArrowLeft } from 'lucide-react';
import Button from '../components/Button';

export default function AdminAuthPreview() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="relative w-full max-w-md bg-zinc-900/90 border border-zinc-800 rounded-3xl p-8 shadow-2xl shadow-purple-950/40 backdrop-blur-2xl text-center">
        {/* Glow ambient */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Shield Icon */}
        <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mx-auto mb-6 shadow-xl shadow-purple-500/10">
          <Lock className="w-8 h-8" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-4">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Restricted Admin Portal</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
          Administrator Access
        </h1>

        {/* Notice Callout */}
        <div className="my-6 p-4 rounded-2xl bg-zinc-950/80 border border-purple-500/30 text-left space-y-2">
          <div className="flex items-center gap-2 text-purple-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Authentication Status
          </div>
          <p className="text-sm text-zinc-300 font-medium leading-relaxed">
            Login / Signup page implementation coming soon...
          </p>
          <p className="text-xs text-zinc-400">
            For evaluation and development review, you can directly access the full management dashboard below.
          </p>
        </div>

        {/* Access Direct CTA */}
        <div className="space-y-3">
          <Link to="/admin-dashboard" className="w-full block">
            <Button
              variant="primary"
              size="lg"
              className="w-full justify-center text-sm sm:text-base font-bold shadow-lg shadow-purple-600/30"
              icon={LayoutDashboard}
            >
              <span>Access Admin Dashboard</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>

          <Link to="/" className="w-full block">
            <Button
              variant="ghost"
              size="md"
              className="w-full justify-center text-xs text-zinc-400 hover:text-white"
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
