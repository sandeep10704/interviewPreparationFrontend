import React from "react";
import { Typography } from "../../../../Common";

const OneQuestionHero = ({ currentIndex, totalQuestions, onAbort }) => {
  return (
    <div className="flex items-center justify-between px-4">
      <button 
         onClick={onAbort}
         className="text-[10px] font-black text-accent-main uppercase tracking-[0.3em] flex items-center gap-2 hover:opacity-70 transition-opacity"
      >
         <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M15 19l-7-7 7-7"/></svg>
         ABORT SESSION
      </button>
      <div className="flex items-center gap-3">
         {Array.from({ length: totalQuestions }).map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-700 ${
                 i === currentIndex ? "w-12 bg-accent-main" : i < currentIndex ? "w-6 bg-accent-main/40" : "w-6 bg-white/10"
              }`}
            ></div>
         ))}
      </div>
      <Typography className="text-[10px] font-black text-text-subtle uppercase tracking-[0.3em] opacity-40">STEP {currentIndex + 1} / {totalQuestions}</Typography>
    </div>
  );
};

export default OneQuestionHero;
