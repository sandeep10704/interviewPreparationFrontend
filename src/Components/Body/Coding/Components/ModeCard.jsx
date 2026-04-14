import React from "react";
import { Typography } from "../../../Common";

const ModeCard = ({ mode, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative p-8 rounded-[32px] bg-white/[0.03] border border-white/10 hover:border-accent-main/30 transition-all duration-500 cursor-pointer overflow-hidden shadow-2xl hover:shadow-accent-main/10"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${mode.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      
      <div className="relative z-10 space-y-6">
        <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center ${mode.accent} border border-white/10 group-hover:scale-110 transition-transform`}>
          {mode.icon}
        </div>
        <div className="space-y-2 text-left">
          <Typography variant="h3" className="!mb-0 group-hover:text-accent-main transition-colors">{mode.title}</Typography>
          <Typography variant="bodySmall" className="text-text-subtle/80 leading-relaxed font-medium">{mode.desc}</Typography>
        </div>
      </div>
    </div>
  );
};

export default ModeCard;
