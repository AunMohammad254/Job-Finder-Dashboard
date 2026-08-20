import { ChevronDown } from 'lucide-react';

export default function Filter({
  label,
  options = [],
  value = '',
  onChange,
  allLabel = 'All',
  icon: Icon,
  className = ''
}) {
  return (
    <div className={`flex flex-col gap-1.5 min-w-[170px] ${className}`}>
      {label && (
        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
          {Icon && <Icon className="w-3.5 h-3.5 text-purple-400" />}
          {label}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={label || 'Filter options'}
          className="w-full appearance-none bg-zinc-900/90 text-zinc-200 text-sm py-3 pl-4 pr-10 rounded-xl border border-zinc-700/60 hover:border-zinc-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all cursor-pointer shadow-sm"
        >
          <option value="" className="bg-zinc-900 text-zinc-300">
            {allLabel}
          </option>
          {options.map((option) => (
            <option key={option} value={option} className="bg-zinc-900 text-white">
              {option}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
