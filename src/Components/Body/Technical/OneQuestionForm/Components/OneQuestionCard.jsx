import React from "react";
import { Typography, Button } from "../../../../Common";

const OneQuestionCard = ({ question, index, answer, onAnswerChange, onNext, onPrev, onVerify, isLast }) => {
  return (
    <div className="flex-1 flex flex-col justify-between text-left">
      <div className="space-y-8">
         <div className="inline-flex px-4 py-1.5 rounded-xl bg-accent-main/10 border border-accent-main/20 text-[11px] font-black text-accent-main uppercase tracking-[0.3em] font-mono">
            Question Prototype
         </div>
         <Typography variant="h2" className="!text-4xl lg:!text-5xl font-black tracking-tighter leading-tight">
            {question.question}
         </Typography>
         
         <div className="relative">
            <textarea 
               className="w-full min-h-[220px] bg-white/[0.03] border border-white/5 rounded-[40px] p-10 text-white text-xl focus:border-accent-main/50 outline-none transition-all placeholder:opacity-5 font-medium leading-relaxed"
               placeholder="Type your synthesis here..."
               value={answer || ""}
               onChange={(e) => onAnswerChange(e.target.value)}
            />
            <div className="absolute bottom-6 right-10 text-[10px] font-mono text-white/20 tracking-widest font-black uppercase">
               Neural Capture Active
            </div>
         </div>
      </div>

      <div className="flex items-center justify-between pt-10 border-t border-white/5">
         <button 
            onClick={onPrev} 
            disabled={index === 0}
            className={`text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all ${index === 0 ? "opacity-10" : "text-text-subtle hover:text-white"}`}
         >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M15 19l-7-7 7-7"/></svg>
            Previous
         </button>
         
         {isLast ? (
            <Button 
               onClick={onVerify}
               className="!rounded-3xl px-16 py-5 shadow-[0_15px_40px_rgba(50,208,206,0.2)] font-black tracking-[0.2em]"
            >
               VERIFY & PROVIDE FEEDBACK
            </Button>
         ) : (
            <button 
               onClick={onNext}
               className="text-xs font-black uppercase tracking-widest text-accent-main flex items-center gap-2 hover:opacity-70 transition-all font-mono"
            >
               Next Prototype
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M9 5l7 7-7 7"/></svg>
            </button>
         )}
      </div>
    </div>
  );
};

export default OneQuestionCard;
