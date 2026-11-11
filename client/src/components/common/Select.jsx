import React, { forwardRef } from 'react';

const Select = forwardRef(
  (
    {
      label,
      error,
      helperText,
      required = false,
      options = [],
      placeholder = 'Select an option',
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-semibold uppercase tracking-wider text-[#17243A] mb-1.5"
          >
            {label}
            {required && <span className="text-[#C44545] ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={`w-full rounded-[5px] border px-3.5 py-2 text-sm text-[#20242B] bg-white transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-[#17243A] appearance-none cursor-pointer ${
              error
                ? 'border-[#C44545] focus:border-[#C44545] focus:ring-[#C44545]'
                : 'border-[#E5E7EB] hover:border-[#D1D5DB] focus:border-[#17243A]'
            } disabled:bg-[#F7F7F4] disabled:text-[#9CA3AF] disabled:cursor-not-allowed ${className}`}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => {
              const value = typeof opt === 'object' ? opt.value : opt;
              const label = typeof opt === 'object' ? opt.label : opt;
              return (
                <option key={value} value={value}>
                  {label}
                </option>
              );
            })}
          </select>
          {/* Custom subtle chevron */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#6B7280]">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
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

Select.displayName = 'Select';

export default Select;

