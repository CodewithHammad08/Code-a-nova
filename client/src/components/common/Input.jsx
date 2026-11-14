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
            className="block text-xs font-semibold uppercase tracking-wider text-slate-200 mb-1.5"
          >
            {label}
            {required && <span className="text-rose-400 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {LeftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <LeftIcon className="w-4 h-4" />
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            type={type}
            className={`w-full rounded-[7px] border py-2.5 text-sm text-white placeholder-slate-500 bg-[#0B0F19] transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-cyan-500/25 focus:ring-offset-0 ${
              LeftIcon ? 'pl-9' : 'pl-3.5'
            } ${RightIcon ? 'pr-9' : 'pr-3.5'} ${
              error
                ? 'border-rose-500 focus:border-rose-400 focus:ring-rose-500/20'
                : 'border-white/10 hover:border-white/20 focus:border-cyan-400'
            } disabled:bg-slate-900/60 disabled:text-slate-600 disabled:cursor-not-allowed ${className}`}
            {...props}
          />
          {RightIcon && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
              <RightIcon className="w-4 h-4" />
            </div>
          )}
        </div>
        {error ? (
          <p className="mt-1.5 text-xs text-rose-400 font-medium flex items-center gap-1">
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
