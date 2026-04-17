import React from "react";
import { Typography, Button } from "../../../../Common";

const SessionReport = ({ questions, onExit }) => {
  return (
    <div className="flex-1 space-y-10 animate-slide-up text-left">
      <div className="flex items-center justify-between">
         <Typography variant="h2" className="!text-4xl font-black tracking-tighter">Session <span className="text-accent-main">Report</span></Typography>
         <div className="px-4 py-1.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-[10px] font-black tracking-widest text-violet-400">EVALUATION COMPLETE</div>
      </div>

      <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
         {questions.map((q, i) => (
            <div key={i} className="p-8 rounded-[32px] bg-white/5 border border-white/5 space-y-4">
               <div className="flex items-center gap-3">
                  <span className="text-xs font-black text-accent-main opacity-50">#0{i + 1}</span>
                  <Typography className="text-sm font-bold opacity-80">{q.question}</Typography>
               </div>
               <div className="p-5 rounded-2xl bg-violet-500/5 border border-violet-500/10">
                  <Typography className="text-xs text-text-subtle italic leading-relaxed">"{q.feedback}"</Typography>
               </div>
            </div>
         ))}
      </div>

      <div className="pt-6">
         <Button onClick={onExit} className="w-full !py-5 !rounded-3xl shadow-accent-main/20">BACK TO ARENA</Button>
      </div>
    </div>
  );
};

export default SessionReport;
