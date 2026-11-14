import React from 'react';

const Badge = ({ children, variant = 'default', size = 'md', className = '' }) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-0.5',
    lg: 'text-sm px-3 py-1',
  };

  const variantStyles = {
    default: 'bg-slate-100 text-slate-700 border border-slate-200',
    primary: 'bg-slate-900 text-white border border-slate-900 font-mono',
    accent: 'bg-amber-50 text-amber-800 border border-amber-200 font-mono font-semibold',
    success: 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200 font-medium',
    error: 'bg-rose-50 text-rose-800 border border-rose-200 font-medium',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-md tracking-wide ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
