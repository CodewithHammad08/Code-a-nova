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
        'bg-[#0F172A]/80 backdrop-blur-md rounded-[10px] overflow-hidden text-slate-100',
        bordered ? 'border border-white/10' : '',
        elevated ? 'shadow-[0_12px_32px_rgba(0,0,0,0.45)]' : 'shadow-md',
        hover
          ? 'transition-all duration-300 hover:shadow-[0_16px_40px_rgba(56,189,248,0.12)] hover:border-cyan-500/40 hover:-translate-y-1 cursor-pointer'
          : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {header && (
        <div className="border-b border-white/10 px-6 py-4 bg-[#131C2E]/90">{header}</div>
      )}
      <div className={paddingMap[padding] ?? paddingMap.md}>{children}</div>
      {footer && (
        <div className="border-t border-white/10 px-6 py-3.5 bg-[#131C2E]/90">{footer}</div>
      )}
    </div>
  );
};

export default Card;
