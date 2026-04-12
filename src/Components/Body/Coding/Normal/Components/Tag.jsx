import React from 'react';

const Tag = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-white/5 text-text-subtle border-white/10',
    success: 'bg-green-500/10 text-green-500 border-green-500/10',
    error: 'bg-red-500/10 text-red-500 border-red-500/10',
    warning: 'bg-orange-500/10 text-orange-400 border-orange-500/10',
    accent: 'bg-accent-main/10 text-accent-main border-accent-main/20',
  };

  return (
    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border transition-all ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  );
};

export default Tag;
