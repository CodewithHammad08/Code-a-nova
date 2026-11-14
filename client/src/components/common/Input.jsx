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
    const hintText = hint || helperText;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
          >
            {label}
            {required && <span className="text-rose-500 ml-1">*</span>}
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
            className={`w-full rounded-xl border py-2.5 text-sm text-slate-900 placeholder-slate-400 bg-white transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-slate-900/10 ${
              LeftIcon ? 'pl-9' : 'pl-3.5'
            } ${RightIcon ? 'pr-9' : 'pr-3.5'} ${
              error
                ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/10'
                : 'border-slate-200/90 hover:border-slate-300 focus:border-slate-800'
            } disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed ${className}`}
            {...props}
          />
          {RightIcon && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
              <RightIcon className="w-4 h-4" />
            </div>
          )}
        </div>
        {error ? (
          <p className="mt-1.5 text-xs text-rose-600 font-medium">{error}</p>
        ) : hintText ? (
          <p className="mt-1.5 text-xs text-slate-500">{hintText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
