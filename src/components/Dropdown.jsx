import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, X } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Dropdown({
  label,
  options = [],
  value = '',
  onChange,
  allLabel = 'All',
  placeholder,
  icon: Icon,
  className = '',
  triggerClassName = '',
  align = 'left'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Normalize options (supports array of strings or array of { label, value })
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === 'object' && opt !== null) {
      return { label: opt.label, value: opt.value, icon: opt.icon };
    }
    return { label: opt, value: opt };
  });

  // Current active label
  const selectedOption = normalizedOptions.find((opt) => opt.value === value);
  const displayLabel = selectedOption ? selectedOption.label : (placeholder || allLabel);

  const handleSelect = (optValue) => {
    if (onChange) {
      onChange(optValue);
    }
    setIsOpen(false);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    if (onChange) {
      onChange('');
    }
  };

  return (
    <div
      className={cn(
        'relative flex flex-col gap-1.5 min-w-[170px]',
        isOpen ? 'z-50' : 'z-10',
        className
      )}
      ref={dropdownRef}
    >
      {label && (
        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 select-none">
          {Icon && <Icon className="w-3.5 h-3.5 text-purple-400" />}
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={cn(
          'w-full flex items-center justify-between gap-2.5 bg-zinc-900/90 hover:bg-zinc-850 text-left text-sm py-3 px-4 rounded-xl border transition-all duration-200 cursor-pointer backdrop-blur-md focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500',
          isOpen
            ? 'border-purple-500 shadow-lg shadow-purple-950/30 text-white ring-1 ring-purple-500/30'
            : value
              ? 'border-purple-500/50 text-zinc-100 bg-purple-950/20'
              : 'border-zinc-700/60 hover:border-zinc-600 text-zinc-300',
          triggerClassName
        )}
      >
        <div className="flex items-center gap-2 truncate">
          {!label && Icon && <Icon className="w-4 h-4 text-purple-400 flex-shrink-0" />}
          <span className={cn('truncate', !value && 'text-zinc-400 font-normal')}>
            {displayLabel}
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          {value && (
            <span
              role="button"
              tabIndex={0}
              onClick={handleClear}
              onKeyDown={(e) => e.key === 'Enter' && handleClear(e)}
              title="Clear selection"
              className="p-0.5 rounded hover:bg-zinc-700/80 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </span>
          )}
          <ChevronDown
            className={cn(
              'w-4 h-4 text-zinc-400 transition-transform duration-200',
              isOpen && 'rotate-180 text-purple-400'
            )}
          />
        </div>
      </button>

      {/* Floating Dropdown Menu Panel */}
      {isOpen && (
        <div
          role="listbox"
          className={cn(
            'absolute top-full mt-2 w-full min-w-[200px] z-[9999] bg-zinc-950/95 backdrop-blur-2xl border border-zinc-700/80 rounded-2xl p-1.5 shadow-2xl shadow-purple-950/60 ring-1 ring-purple-500/30 overflow-hidden animate-fadeIn',
            align === 'right' ? 'right-0' : 'left-0'
          )}
        >
          <div className="max-h-60 overflow-y-auto overflow-x-hidden space-y-0.5 custom-scrollbar">
            {/* "All" / Reset Option */}
            <button
              type="button"
              role="option"
              aria-selected={!value}
              onClick={() => handleSelect('')}
              className={cn(
                'w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer text-left',
                !value
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 font-semibold'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent'
              )}
            >
              <span className="truncate">{allLabel}</span>
              {!value && <Check className="w-4 h-4 text-purple-400 flex-shrink-0 ml-2" />}
            </button>

            {/* Separator */}
            <div className="h-px bg-zinc-800/80 my-1 mx-1" />

            {/* Options List */}
            {normalizedOptions.map((opt) => {
              const isSelected = value === opt.value;
              const OptIcon = opt.icon;

              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(opt.value)}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer text-left',
                    isSelected
                      ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 font-semibold'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-900 border border-transparent'
                  )}
                >
                  <div className="flex items-center gap-2 truncate">
                    {OptIcon && <OptIcon className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />}
                    <span className="truncate">{opt.label}</span>
                  </div>
                  {isSelected && (
                    <Check className="w-4 h-4 text-purple-400 flex-shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
