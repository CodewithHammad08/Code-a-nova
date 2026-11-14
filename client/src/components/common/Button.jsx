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
    'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#17243A] select-none active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 shadow-sm';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5 font-semibold',
    md: 'text-sm px-4.5 py-2.5 gap-2 font-semibold',
    lg: 'text-base px-6 py-3 gap-2.5 font-bold',
    icon: 'p-2.5',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-b from-[#243653] to-[#17243A] text-white hover:from-[#2e4569] hover:to-[#1c2c47] active:from-[#17243A] active:to-[#121c2e] border border-[#334b73]/40 shadow-[0_2px_4px_rgba(23,36,58,0.15)] hover:shadow-[0_4px_12px_rgba(23,36,58,0.25)]',
    secondary:
      'bg-white text-[#17243A] border border-[#E5E7EB] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] hover:text-[#111827] active:bg-[#F3F4F6] shadow-sm',
    outline:
      'bg-transparent text-[#17243A] border border-[#17243A]/30 hover:border-[#17243A] hover:bg-[#17243A]/5 active:bg-[#17243A]/10',
    destructive:
      'bg-gradient-to-b from-[#D44C4C] to-[#C44545] text-white hover:from-[#bd3e3e] hover:to-[#A83838] active:from-[#A83838] active:to-[#8F2E2E] border border-transparent shadow-sm',
    ghost:
      'bg-transparent text-[#6B7280] hover:text-[#17243A] hover:bg-[#17243A]/5 border border-transparent shadow-none',
    accent:
      'bg-gradient-to-b from-[#e5b765] to-[#D6A64F] text-[#17243A] hover:from-[#dab05e] hover:to-[#c49540] active:from-[#c49540] active:to-[#b5892e] border border-[#e8c075]/60 font-bold shadow-[0_2px_8px_rgba(214,166,79,0.25)] hover:shadow-[0_4px_16px_rgba(214,166,79,0.35)]',
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
