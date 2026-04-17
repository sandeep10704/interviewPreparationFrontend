import React from "react";
import { Typography } from "../../../../Common";

const OneQuestionHero = ({ currentIndex, totalQuestions, onAbort }) => {
  return (
    <div className="flex items-center justify-between">
       <div className="space-y-1">
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-accent-main animate-pulse shadow-[0_0_8px_#32d0c8]"></div>
             <Typography className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-main">Sequential Deep Dive</Typography>
          </div>
          <Typography variant="h2" className="!text-3xl font-black uppercase tracking-tight">Technical <span className="text-white/20">Analysis</span></Typography>
       </div>

       <div className="flex items-center gap-8">
          <div className="text-right hidden sm:block">
             <Typography className="text-[10px] font-black text-text-subtle uppercase tracking-widest opacity-40 mb-1">Current Progress</Typography>
             <div className="flex items-baseline gap-2">
                <Typography className="text-2xl font-black text-white">{currentIndex + 1}</Typography>
                <Typography className="text-xs font-black text-text-subtle opacity-40">/ {totalQuestions}</Typography>
             </div>
          </div>
          
          <button 
             onClick={onAbort}
             className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-text-subtle hover:text-error hover:bg-error/10 hover:border-error/20 transition-all flex items-center gap-3 group"
          >
             <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
             Abort Session
          </button>
       </div>
    </div>
  );
};

export default OneQuestionHero;
