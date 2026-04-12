import React from 'react';
import { Typography } from '../../../../Common';
import Tag from './Tag';
import { ListIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons';

const NavigationBar = ({ currentIndex, totalQuestions, onPrev, onNext }) => {
  return (
    <div className="flex items-center justify-between px-6 py-2 border-b border-border-main/20 bg-card/10 backdrop-blur-md z-10 shrink-0">
      <div className="flex items-center gap-6">
        <button className="flex items-center gap-2 text-text-subtle hover:text-text-main transition-colors font-bold text-[10px] uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-md border border-white/5 group">
          <ListIcon />
          <span className="group-hover:translate-x-0.5 transition-transform">Problems</span>
        </button>
        
        <div className="h-4 w-px bg-white/10"></div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={onPrev}
            disabled={currentIndex === 0}
            className="p-1 rounded hover:bg-white/5 disabled:opacity-20 disabled:cursor-not-allowed transition-all active:scale-90"
            title="Previous Problem"
          >
            <ChevronLeftIcon />
          </button>
          
          <Typography variant="body" className="font-bold font-mono tracking-tight text-[12px] min-w-[45px] text-center">
            <span className="text-accent-main">{currentIndex + 1}</span> / {totalQuestions}
          </Typography>
          
          <button 
            onClick={onNext}
            disabled={currentIndex === totalQuestions - 1}
            className="p-1 rounded hover:bg-white/5 disabled:opacity-20 disabled:cursor-not-allowed transition-all active:scale-90"
            title="Next Problem"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Tag variant="accent" className="!px-3 !py-1 shadow-lg shadow-accent-main/5 animate-pulse-slow">
          Normal Mode
        </Tag>
      </div>
    </div>
  );
};

export default NavigationBar;
