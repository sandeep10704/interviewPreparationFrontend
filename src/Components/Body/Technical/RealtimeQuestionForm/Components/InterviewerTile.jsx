import React from "react";
import { Typography } from "../../../../Common";
import neuralHostImg from "../../../../../assets/neural_interviewer_clean.png";

const InterviewerTile = () => {
  return (
    <div className="relative rounded-3xl bg-black border border-white/10 overflow-hidden group shadow-2xl h-full transition-all hover:border-accent-main/30">
        <div className="absolute inset-0 flex items-center justify-center bg-black">
           {/* Pure Black background ensures the host blends perfectly */}
           <img 
              src={neuralHostImg} 
              alt="Neural Host" 
              className="h-full w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-700 brightness-90 group-hover:brightness-110 scale-110"
           />
           
           {/* Subtle Neural Pulse Glow */}
           <div className="absolute inset-0 bg-radial-gradient from-accent-main/5 to-transparent opacity-30 animate-pulse"></div>
           
           {/* Scanning Beam */}
           <div className="absolute top-0 left-0 w-full h-px bg-accent-main/40 animate-scan shadow-[0_0_20px_#32d0c8] z-20"></div>
        </div>

        {/* Status Overlay */}
        <div className="absolute bottom-6 left-6 flex items-center gap-3 z-30">
           <div className="px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-white border border-white/10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-main animate-pulse shadow-[0_0_8px_#32d0c8]"></span>
              Neural Host v4.0
           </div>
        </div>

        {/* Live Signal Indicator */}
        <div className="absolute top-6 right-6 z-30">
           <div className="flex gap-2 items-center bg-black/40 px-3 py-1 rounded-full border border-white/5 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-main shadow-[0_0_5px_#32d0c8]"></div>
              <Typography className="text-[8px] font-black text-accent-main uppercase tracking-widest">Active Link</Typography>
           </div>
        </div>
    </div>
  );
};

export default InterviewerTile;
