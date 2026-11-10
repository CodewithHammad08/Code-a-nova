import React from 'react';

const Card = ({ children, className = '', header, footer, ...props }) => {
  return (
    <div
      className={`bg-white border border-[#E5E7EB] rounded-[7px] overflow-hidden ${className}`}
      {...props}
    >
      {header && (
        <div className="border-b border-[#E5E7EB] px-6 py-4 bg-[#FAFAFA]">
          {header}
        </div>
      )}
      <div className="p-6">{children}</div>
      {footer && (
        <div className="border-t border-[#E5E7EB] px-6 py-3.5 bg-[#FAFAFA]">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
