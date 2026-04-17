import React from "react";
import { Typography } from "../../../../Common";

const HrQuestionItem = ({ question, index, answer, onAnswerChange, disabled }) => {
  return (
    <div className="p-10 rounded-[48px] border bg-white/[0.02] border-white/5 shadow-xl transition-all duration-500 font-inter">
       <div className="space-y-8 text-left">
          <div className="flex items-start gap-6">
             <span className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-main font-black text-xs shrink-0">{index + 1}</span>
             <Typography variant="h3" className="!text-2xl font-bold leading-relaxed">{question.question}</Typography>
          </div>

          <div className="space-y-4">
             <Typography className="text-[10px] font-black text-text-subtle uppercase tracking-widest opacity-40">Your Behavioral Response</Typography>
             <textarea 
                disabled={disabled}
                className="w-full min-h-[150px] bg-[#01080E] border border-white/5 rounded-3xl p-8 text-white text-lg focus:border-accent-main/30 outline-none transition-all placeholder:opacity-10"
                placeholder="Describe your approach using the STAR method..."
                value={answer || ""}
                onChange={(e) => onAnswerChange(e.target.value)}
             />
          </div>
       </div>
    </div>
  );
};

export default HrQuestionItem;
