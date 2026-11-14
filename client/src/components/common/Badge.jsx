import React from 'react';

const Badge = ({ children, variant = 'default', size = 'md', className = '' }) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  };

  const variantStyles = {
    default: 'bg-slate-800/80 text-slate-300 border border-white/10',
    primary: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-mono shadow-[0_0_10px_rgba(56,189,248,0.15)]',
    accent: 'bg-amber-500/15 text-amber-300 border border-amber-500/30 font-mono shadow-[0_0_10px_rgba(245,158,11,0.15)]',
    success: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-medium',
    warning: 'bg-yellow-500/15 text-yellow-300 border border-yellow-500/30',
    error: 'bg-rose-500/15 text-rose-300 border border-rose-500/30 font-medium',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-[4px] tracking-wide ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;

