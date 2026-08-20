import { forwardRef } from 'react';
import SpecularButton from './SpecularButton/SpecularButton';
import { cn } from '../lib/utils';

const variantClasses = {
  primary: 'bg-purple-600 hover:bg-purple-500 text-white font-medium shadow-lg shadow-purple-600/25 hover:shadow-purple-500/40 border border-purple-500/40 active:scale-[0.98]',
  secondary: 'bg-slate-100  hover:bg-slate-200 :bg-zinc-700/80 text-zinc-800  font-medium border border-slate-200  hover:border-slate-300 :border-zinc-600 active:scale-[0.98]',
  outline: 'bg-transparent hover:bg-purple-50 :bg-purple-950/30 text-purple-600  hover:text-purple-700 :text-purple-200 border border-purple-400/60  hover:border-purple-500 :border-purple-400 active:scale-[0.98]',
  ghost: 'bg-transparent hover:bg-slate-100 :bg-zinc-800/60 text-zinc-600  hover:text-zinc-900 :text-white active:scale-[0.98]',
  danger: 'bg-rose-50  hover:bg-rose-100 :bg-rose-900/60 text-rose-600  border border-rose-300  hover:border-rose-400 :border-rose-700 active:scale-[0.98]'
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
  md: 'px-4 py-2 text-sm rounded-xl gap-2',
  lg: 'px-6 py-3 text-base rounded-xl gap-2.5'
};

export const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  type = 'button',
  className = '',
  icon: Icon,
  ...props
}, ref) => {
  if (variant === 'specular') {
    return (
      <SpecularButton
        size={size}
        onClick={onClick}
        disabled={disabled}
        className={className}
        type={type}
        {...props}
      >
        <span className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4" />}
          {children}
        </span>
      </SpecularButton>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white :ring-offset-black',
        variantClasses[variant] || variantClasses.primary,
        sizeClasses[size] || sizeClasses.md,
        className
      )}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
