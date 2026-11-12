import React, { forwardRef } from 'react';

const Input = forwardRef(
  (
    {
      label,
      error,
      hint,
      helperText,
      required = false,
      type = 'text',
      className = '',
      id,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    // Support both `hint` and legacy `helperText`
    const hintText = hint || helperText;

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
          {LeftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#6B7280]">
              <LeftIcon className="w-4 h-4" />
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            type={type}
            className={`w-full rounded-[5px] border py-2 text-sm text-[#20242B] placeholder-[#9CA3AF] bg-white transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#17243A]/30 focus:ring-offset-0 ${
              LeftIcon ? 'pl-9' : 'pl-3.5'
            } ${RightIcon ? 'pr-9' : 'pr-3.5'} ${
              error
                ? 'border-[#C44545] focus:border-[#C44545] focus:ring-[#C44545]/20'
                : 'border-[#E5E7EB] hover:border-[#D1D5DB] focus:border-[#17243A]'
            } disabled:bg-[#F7F7F4] disabled:text-[#9CA3AF] disabled:cursor-not-allowed ${className}`}
            {...props}
          />
          {RightIcon && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[#6B7280]">
              <RightIcon className="w-4 h-4" />
            </div>
          )}
        </div>
        {error ? (
          <p className="mt-1.5 text-xs text-[#C44545] font-medium flex items-center gap-1">
            <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        ) : hintText ? (
          <p className="mt-1.5 text-xs text-[#6B7280]">{hintText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
