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
        'bg-white rounded-[7px] overflow-hidden',
        bordered ? 'border border-[#E5E7EB]' : '',
        elevated ? 'shadow-md' : 'shadow-sm',
        hover
          ? 'transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer'
          : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {header && (
        <div className="border-b border-[#E5E7EB] px-6 py-4 bg-[#FAFAFA]">{header}</div>
      )}
      <div className={paddingMap[padding] ?? paddingMap.md}>{children}</div>
      {footer && (
        <div className="border-t border-[#E5E7EB] px-6 py-3.5 bg-[#FAFAFA]">{footer}</div>
      )}
    </div>
  );
};

export default Card;
