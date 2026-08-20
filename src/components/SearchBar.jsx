import { Search, X } from 'lucide-react';

export default function SearchBar({
  value = '',
  onChange,
  onSubmit,
  placeholder = 'Search by job title, company, or skill (e.g. React, Python)...',
  className = '',
  autoFocus = false
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(value);
  };

  const handleClear = () => {
    if (onChange) {
      onChange({ target: { value: '' } });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative w-full ${className}`}>
      <div className="relative flex items-center">
        {/* Left Search Icon */}
        <div className="absolute left-4 pointer-events-none text-zinc-400">
          <Search className="w-5 h-5" />
        </div>

        {/* Search Input */}
        <input
          type="text"
          value={value}
          onChange={onChange}
          autoFocus={autoFocus}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3.5 sm:py-4 bg-white dark:bg-zinc-900/90 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 rounded-2xl border border-slate-200 dark:border-zinc-700/60 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all duration-200 text-sm sm:text-base shadow-sm dark:shadow-inner backdrop-blur-md"
        />

        {/* Clear Button */}
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 p-1 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </form>
  );
}
