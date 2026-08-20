import { Link } from 'react-router-dom';
import { SearchX } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
  title = 'No Results Found',
  message = 'We could not find any items matching your criteria. Try adjusting your search query or filters.',
  actionLabel,
  onAction,
  actionLink,
  icon: Icon = SearchX,
  className = ''
}) {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 border-dashed backdrop-blur-sm max-w-lg mx-auto my-8 ${className}`}>
      {/* Icon Circle with ambient glow */}
      <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-5 shadow-lg shadow-purple-500/10">
        <Icon className="w-8 h-8" />
      </div>

      <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
        {title}
      </h3>

      <p className="text-sm text-zinc-400 max-w-sm mb-6 leading-relaxed">
        {message}
      </p>

      {actionLink && actionLabel && (
        <Link to={actionLink}>
          <Button variant="primary" size="md">
            {actionLabel}
          </Button>
        </Link>
      )}

      {onAction && actionLabel && !actionLink && (
        <Button variant="primary" size="md" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
