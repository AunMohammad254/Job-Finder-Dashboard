import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className = ''
}) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className={cn('flex items-center justify-center gap-2 pt-8', className)}>
      {/* Previous Button */}
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-1.5">
        {pages.map((page) => {
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={cn(
                'min-w-[38px] h-[38px] px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer',
                isActive
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 border border-purple-500/50'
                  : 'bg-zinc-900/60 border border-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-800'
              )}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
