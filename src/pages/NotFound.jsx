import { Link } from 'react-router-dom';
import { Compass, Home, ArrowLeft } from 'lucide-react';
import Button from '../components/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-20 h-20 rounded-3xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6 shadow-2xl shadow-purple-500/20">
        <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: '15s' }} />
      </div>

      <div className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-2">
        Error 404
      </div>

      <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
        Page Not Found
      </h1>

      <p className="text-sm sm:text-base text-zinc-400 max-w-md mx-auto mb-8 leading-relaxed">
        The page you are looking for doesn't exist or has been moved. Use the buttons below to return to safety.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link to="/">
          <Button variant="primary" size="md" icon={Home}>
            Back to Home
          </Button>
        </Link>
        <Link to="/jobs">
          <Button variant="secondary" size="md" icon={Compass}>
            Browse Jobs
          </Button>
        </Link>
      </div>
    </div>
  );
}
