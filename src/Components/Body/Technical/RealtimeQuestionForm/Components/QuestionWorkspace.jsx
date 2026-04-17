import React from "react";
import { Typography } from "../../../../Common";

const QuestionWorkspace = ({ questions, currentIndex, answers, onAnswerChange }) => {
  const q = questions[currentIndex] || {};

  return (
    <div className="h-full bg-white/[0.03] border border-white/10 rounded-[32px] overflow-hidden flex flex-col shadow-2xl transition-all hover:bg-white/[0.04]">
       <div className="px-8 py-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-5">
              <div className="px-3 py-1 rounded-lg bg-accent-main/10 border border-accent-main/20">
                 <Typography className="text-[10px] font-black text-accent-main uppercase tracking-widest">Active Probe</Typography>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
              <Typography className="text-[10px] font-black text-text-subtle/50 uppercase tracking-[0.2em]">Sequence 0{currentIndex + 1} of {questions.length}</Typography>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-error animate-pulse shadow-[0_0_10px_#ff5757]"></div>
             <Typography className="text-[10px] font-black text-error uppercase tracking-widest opacity-80">Signal Recording</Typography>
          </div>
       </div>
       
       <div className="p-10 flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-8">
          <div className="space-y-4">
             <Typography className="text-[10px] text-accent-main font-black uppercase tracking-[0.4em] opacity-40">Prompt Context</Typography>
             <Typography variant="h3" className="!text-2xl font-bold leading-[1.6] text-white/90">
                {q.question || q.text || "Synchronizing technical protocols..."}
             </Typography>
          </div>

          <div className="flex-1 flex flex-col gap-4">
             <Typography className="text-[10px] text-text-subtle font-black uppercase tracking-[0.4em] opacity-40">Candidate Terminal</Typography>
             <textarea 
                className="w-full h-full min-h-[120px] bg-black/40 border border-white/5 rounded-3xl p-8 text-white text-lg focus:border-accent-main/30 outline-none transition-all placeholder:text-white/5 resize-none font-inter leading-relaxed shadow-inner"
                placeholder="The system is analyzing your architectural depth..."
                value={answers[currentIndex] || ""}
                onChange={(e) => onAnswerChange(currentIndex, e.target.value)}
             />
          </div>
       </div>
    </div>
  );
};

export default QuestionWorkspace;
