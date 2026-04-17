import React from "react";
import { Typography } from "../../../../Common";
import neuralHostImg from "../../../../../assets/neural_interviewer_clean.png";

const OneQuestionCard = ({ question, index, total, answer, onAnswerChange, onNext, onPrev, onVerify, isLast, user }) => {
  return (
    <div className="flex-1 flex flex-col gap-10 animate-fade-in">
       
       <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* AI Host Visual (Static Version for Deep Dive) */}
          <div className="w-full lg:w-48 space-y-4">
             <div className="aspect-square rounded-[32px] bg-black border border-white/10 overflow-hidden relative group">
                <img 
                   src={neuralHostImg} 
                   alt="Neural AI" 
                   className="w-full h-full object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-700 brightness-75 group-hover:brightness-100 scale-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="w-1.5 h-1.5 rounded-full bg-accent-main animate-ping"></div>
                </div>
             </div>
             <div>
                <Typography className="text-[10px] font-black uppercase tracking-widest text-accent-main">Neural Host v4</Typography>
                <div className="flex items-center gap-2 mt-1">
                   <span className="w-1 h-1 rounded-full bg-white/20"></span>
                   <Typography className="text-[8px] font-bold text-text-subtle/40 uppercase">Analyzing Signal...</Typography>
                </div>
             </div>
          </div>

          {/* Question Stage */}
          <div className="flex-1 space-y-8">
             <div className="space-y-4">
                <Typography className="text-[10px] font-black uppercase tracking-[0.5em] text-text-subtle/30">Protocol Probe 0{index + 1}</Typography>
                <Typography variant="h3" className="!text-3xl font-bold leading-tight text-white/90">
                   {question?.question || "Synthesizing next technical edge..."}
                </Typography>
             </div>

             <div className="space-y-3">
                <div className="flex items-center justify-between px-2">
                   <Typography className="text-[10px] font-black uppercase tracking-widest text-text-subtle/50">Your Technical Response</Typography>
                   <Typography className="text-[10px] font-black uppercase tracking-widest text-accent-main/40">{answer.length} Characters</Typography>
                </div>
                <textarea 
                   className="w-full min-h-[220px] bg-white/[0.03] border border-white/10 rounded-[40px] p-10 text-xl text-white outline-none focus:border-accent-main/40 focus:bg-white/[0.05] transition-all resize-none shadow-inner custom-scrollbar leading-relaxed"
                   placeholder="Identify the core architectural trade-offs..."
                   value={answer}
                   onChange={(e) => onAnswerChange(e.target.value)}
                />
             </div>
          </div>
       </div>

       {/* Control Footer */}
       <div className="pt-8 mt-auto flex items-center justify-between border-t border-white/5">
          <div className="flex items-center gap-4">
             <button 
                disabled={index === 0}
                onClick={onPrev}
                className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-text-subtle hover:text-white hover:bg-white/10 disabled:opacity-5 transition-all"
             >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
             </button>
             <button 
                onClick={onNext}
                disabled={isLast}
                className="px-8 h-14 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-text-subtle hover:text-white hover:bg-white/10 disabled:opacity-5 transition-all flex items-center gap-4 group"
             >
                Skip Question
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
             </button>
          </div>

          <button 
             onClick={isLast ? onVerify : onNext}
             className={`px-12 h-16 rounded-[24px] text-[11px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-4 shadow-xl ${isLast ? "bg-accent-main text-black shadow-accent-main/20 hover:scale-105" : "bg-white text-black hover:bg-white/90 hover:scale-105"}`}
          >
             {isLast ? "Compile Session" : "Execute Next Probe"}
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
          </button>
       </div>
    </div>
  );
};

export default OneQuestionCard;
