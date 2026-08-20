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
        className="p-2.5 rounded-xl bg-white  border border-slate-200  text-zinc-500  hover:text-zinc-900 :text-white hover:border-slate-300 :border-zinc-700 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-sm "
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
                'min-w-9.5 h-9.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer',
                isActive
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 border border-purple-500/50'
                  : 'bg-white  border border-slate-200  text-zinc-600  hover:text-zinc-900 :text-white hover:bg-slate-100 :bg-zinc-800 shadow-sm '
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
        className="p-2.5 rounded-xl bg-white  border border-slate-200  text-zinc-500  hover:text-zinc-900 :text-white hover:border-slate-300 :border-zinc-700 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-sm "
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
