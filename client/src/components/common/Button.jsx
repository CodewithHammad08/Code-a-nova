import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  className = '',
  onClick,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-[#080C14] select-none active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 shadow-sm cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5 font-semibold',
    md: 'text-sm px-4.5 py-2.5 gap-2 font-semibold',
    lg: 'text-base px-6 py-3 gap-2.5 font-bold',
    icon: 'p-2.5',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600 text-white hover:from-sky-400 hover:via-cyan-400 hover:to-blue-500 border border-cyan-300/30 shadow-[0_0_20px_rgba(14,165,233,0.35)] hover:shadow-[0_0_30px_rgba(14,165,233,0.55)]',
    secondary:
      'bg-slate-800/80 hover:bg-slate-700/80 text-slate-100 border border-white/10 hover:border-cyan-500/40 hover:text-cyan-200 shadow-sm',
    outline:
      'bg-transparent text-slate-200 border border-white/20 hover:border-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10',
    destructive:
      'bg-gradient-to-r from-rose-600 to-red-600 text-white hover:from-rose-500 hover:to-red-500 border border-transparent shadow-[0_0_20px_rgba(225,29,72,0.3)]',
    ghost:
      'bg-transparent text-slate-400 hover:text-white hover:bg-white/10 border border-transparent shadow-none',
    accent:
      'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 hover:from-amber-300 hover:to-amber-500 border border-amber-300/40 font-bold shadow-[0_0_24px_rgba(245,158,11,0.35)] hover:shadow-[0_0_32px_rgba(245,158,11,0.6)]',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size] ?? sizeStyles.md} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin text-current flex-shrink-0" />}
      {children}
    </button>
  );
};

export default Button;
