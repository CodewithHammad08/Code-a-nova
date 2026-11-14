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
    'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 focus:ring-offset-white select-none active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5 font-semibold',
    md: 'text-sm px-4.5 py-2.5 gap-2 font-semibold',
    lg: 'text-base px-6 py-3 gap-2.5 font-bold',
    icon: 'p-2.5',
  };

  const variantStyles = {
    primary:
      'bg-slate-900 hover:bg-slate-800 text-white border border-slate-900 shadow-sm hover:shadow',
    secondary:
      'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 shadow-xs hover:border-slate-300',
    outline:
      'bg-transparent text-slate-700 border border-slate-300 hover:bg-slate-100 hover:text-slate-900',
    destructive:
      'bg-rose-600 hover:bg-rose-700 text-white border border-rose-600 shadow-xs',
    ghost:
      'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent shadow-none',
    accent:
      'bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-600 font-bold shadow-sm',
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
