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
    'inline-flex items-center justify-center font-medium transition-colors duration-150 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#17243A] select-none disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-6 py-2.5 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-[#17243A] text-white hover:bg-[#243653] active:bg-[#121c2e] border border-transparent shadow-none',
    secondary:
      'bg-white text-[#20242B] border border-[#E5E7EB] hover:bg-[#F7F7F4] hover:border-[#D1D5DB] active:bg-[#ECECE8]',
    outline:
      'bg-transparent text-[#17243A] border border-[#17243A] hover:bg-[#17243A]/5 active:bg-[#17243A]/10',
    destructive:
      'bg-[#C44545] text-white hover:bg-[#A83838] active:bg-[#8F2E2E] border border-transparent',
    ghost:
      'bg-transparent text-[#6B7280] hover:text-[#20242B] hover:bg-[#E5E7EB]/50 border border-transparent',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin text-current" />}
      {children}
    </button>
  );
};

export default Button;

