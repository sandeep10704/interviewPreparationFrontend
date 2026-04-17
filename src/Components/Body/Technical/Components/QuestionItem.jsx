import React from "react";
import { Typography } from "../../../Common";

const QuestionItem = ({ question, index, answer, onAnswerChange, showFeedback, disabled }) => {
  return (
    <div 
       className={`p-10 rounded-[48px] border transition-all duration-500 ${
          showFeedback ? 'bg-[#030E17] border-violet-500/20 shadow-2xl scale-[0.98]' : 'bg-white/[0.02] border-white/5 shadow-xl'
       }`}
    >
       <div className="space-y-8">
          <div className="flex items-start gap-6">
             <span className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-main font-black text-xs shrink-0">{index + 1}</span>
             <Typography variant="h3" className="!text-2xl font-bold leading-relaxed">{question.question}</Typography>
          </div>

          <div className="space-y-4">
             <Typography className="text-[10px] font-black text-text-subtle uppercase tracking-widest opacity-40 text-left">Your Response</Typography>
             <textarea 
                disabled={disabled || showFeedback}
                className={`w-full min-h-[150px] bg-[#01080E] border border-white/5 rounded-3xl p-8 text-white text-lg focus:border-accent-main/30 outline-none transition-all placeholder:opacity-10 text-left ${showFeedback ? "opacity-30 italic" : ""}`}
                placeholder="Synthesize your technical explanation here..."
                value={answer || (showFeedback ? "Context archived for this session." : "")}
                onChange={(e) => onAnswerChange(e.target.value)}
             />
          </div>

          {showFeedback && (
             <div className="p-8 rounded-[32px] bg-violet-500/[0.03] border border-violet-500/10 space-y-4 animate-slide-up text-left">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse shadow-[0_0_8px_#a78bfa]"></div>
                   <Typography className="text-[10px] font-black text-violet-400 uppercase tracking-widest">AI FEEDBACK INSIGHT</Typography>
                </div>
                <Typography className="text-sm text-text-subtle leading-relaxed font-medium">
                   {question.feedback}
                </Typography>
             </div>
          )}
       </div>
    </div>
  );
};

export default QuestionItem;
