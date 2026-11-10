import React, { forwardRef } from 'react';

const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      required = false,
      type = 'text',
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-[#17243A] mb-1.5"
          >
            {label}
            {required && <span className="text-[#C44545] ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            type={type}
            className={`w-full rounded-[5px] border px-3.5 py-2 text-sm text-[#20242B] placeholder-[#9CA3AF] bg-white transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-[#17243A] ${
              error
                ? 'border-[#C44545] focus:border-[#C44545] focus:ring-[#C44545]'
                : 'border-[#E5E7EB] hover:border-[#D1D5DB] focus:border-[#17243A]'
            } disabled:bg-[#F7F7F4] disabled:text-[#9CA3AF] disabled:cursor-not-allowed ${className}`}
            {...props}
          />
        </div>
        {error ? (
          <p className="mt-1 text-xs text-[#C44545] font-medium">{error}</p>
        ) : helperText ? (
          <p className="mt-1 text-xs text-[#6B7280]">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
