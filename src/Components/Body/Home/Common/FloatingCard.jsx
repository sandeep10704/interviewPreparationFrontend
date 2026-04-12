import React from 'react';

const FloatingCard = ({ icon, title, subtitle, className = '', animationClass = 'animate-float' }) => {
  return (
    <div className={`absolute z-20 ${animationClass} shadow-2xl ${className}`}>
      <div className="bg-card/90 backdrop-blur-md border border-border-main rounded-2xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-accent-bg flex items-center justify-center text-accent-main">
          {icon}
        </div>
        <div>
          <div className="text-[10px] text-text-subtle font-bold uppercase tracking-widest leading-none mb-1">
            {title}
          </div>
          <div className="text-sm font-bold text-text-main whitespace-nowrap">
            {subtitle}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingCard;
