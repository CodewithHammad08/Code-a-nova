import React from 'react';

const Badge = ({ children, variant = 'default', size = 'md', className = '' }) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  };

  const variantStyles = {
    default: 'bg-[#F7F7F4] text-[#20242B] border border-[#E5E7EB]',
    primary: 'bg-[#17243A] text-white',
    accent: 'bg-[#D6A64F]/15 text-[#9E7322] border border-[#D6A64F]/30',
    success: 'bg-[#21845B]/10 text-[#21845B] border border-[#21845B]/20 font-medium',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    error: 'bg-[#C44545]/10 text-[#C44545] border border-[#C44545]/20 font-medium',
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
