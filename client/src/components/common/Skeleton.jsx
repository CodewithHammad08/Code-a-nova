import React from 'react';

const Skeleton = ({ className = '', variant = 'rectangular' }) => {
  const variantStyles = {
    rectangular: 'rounded-[5px]',
    circular: 'rounded-full',
    text: 'rounded-[4px] h-4',
  };

  return (
    <div
      className={`animate-pulse bg-[#E5E7EB]/80 ${variantStyles[variant]} ${className}`}
    />
  );
};

export default Skeleton;

