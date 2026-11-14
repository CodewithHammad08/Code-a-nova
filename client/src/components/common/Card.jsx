import React from 'react';

const paddingMap = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const Card = ({
  children,
  className = '',
  padding = 'md',
  bordered = true,
  elevated = false,
  hover = false,
  header,
  footer,
  ...props
}) => {
  return (
    <div
      className={[
        'bg-white rounded-xl overflow-hidden text-slate-900 transition-all duration-200',
        bordered ? 'border border-slate-200/90' : '',
        elevated
          ? 'shadow-[0_10px_25px_-5px_rgba(15,23,42,0.08),0_8px_10px_-6px_rgba(15,23,42,0.04)]'
          : 'shadow-[0_1px_3px_rgba(15,23,42,0.04),0_1px_2px_rgba(15,23,42,0.02)]',
        hover
          ? 'hover:border-slate-300 hover:shadow-[0_12px_28px_-4px_rgba(15,23,42,0.08)] hover:-translate-y-0.5 cursor-pointer'
          : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {header && (
        <div className="border-b border-slate-100 px-6 py-4 bg-slate-50/70 font-semibold">{header}</div>
      )}
      <div className={paddingMap[padding] ?? paddingMap.md}>{children}</div>
      {footer && (
        <div className="border-t border-slate-100 px-6 py-3.5 bg-slate-50/70 text-sm text-slate-600">{footer}</div>
      )}
    </div>
  );
};

export default Card;
