import React from 'react';

const Skeleton = ({ className = '', variant = 'rectangular' }) => {
  const variantStyles = {
    rectangular: 'rounded-[6px]',
    circular: 'rounded-full',
    text: 'rounded-[4px] h-4',
  };

  return (
    <div
      className={`animate-pulse bg-white/[0.06] ${variantStyles[variant]} ${className}`}
    />
  );
};

export default Skeleton;
