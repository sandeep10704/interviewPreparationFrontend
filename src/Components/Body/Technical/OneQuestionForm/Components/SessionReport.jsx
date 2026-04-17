import React from "react";
import { Typography } from "../../../../Common";

const SessionReport = ({ questions, onExit }) => {
  return (
    <div className="flex-1 flex flex-col gap-10 animate-fade-in-up">
       <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-accent-main shadow-[0_0_10px_#32d0c8]"></div>
             <Typography className="text-[10px] font-black uppercase tracking-[0.5em] text-accent-main">Neural Assessment Complete</Typography>
          </div>
          <Typography variant="h2" className="!text-4xl font-black leading-tight uppercase tracking-tight text-white">System <span className="text-white/20">Evaluation</span></Typography>
          <Typography className="text-text-subtle text-sm max-w-2xl leading-relaxed">The sequential deep dive has been localized. Below is your synchronized response matrix for architectural review.</Typography>
       </div>

       <div className="flex-1 space-y-6 overflow-y-auto pr-4 custom-scrollbar">
          {questions.map((q, idx) => (
             <div key={idx} className="p-8 rounded-[32px] bg-white/[0.03] border border-white/5 space-y-6 group hover:bg-white/[0.05] transition-all">
                <div className="flex items-start justify-between">
                   <div className="space-y-1">
                      <Typography className="text-[9px] font-black text-accent-main/40 uppercase tracking-widest">PROBE 0{idx + 1}</Typography>
                      <Typography className="text-lg font-bold text-white group-hover:text-accent-main transition-colors">{q.question}</Typography>
                   </div>
                   <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity">
                      <svg className="w-5 h-5 text-accent-main" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                   </div>
                </div>

                <div className="space-y-3">
                   <Typography className="text-[9px] font-black text-text-subtle/30 uppercase tracking-[0.2em]">Synchronized Response</Typography>
                   <div className="p-6 rounded-2xl bg-black/40 border border-white/5 text-[13px] leading-relaxed text-text-subtle italic">
                      {q.user_answer || "No signal detected for this probe."}
                   </div>
                </div>
             </div>
          ))}
       </div>

       <div className="pt-8 border-t border-white/5">
          <button 
             onClick={onExit}
             className="w-full h-16 rounded-[24px] bg-white text-black text-[11px] font-black uppercase tracking-[0.3em] hover:scale-[1.01] active:scale-[0.98] transition-all shadow-xl shadow-white/5"
          >
             Exit Sequential Arena
          </button>
       </div>
    </div>
  );
};

export default SessionReport;
