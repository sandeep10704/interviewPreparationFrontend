import React from "react";
import { Typography, Button } from "../../../Common";

const GenerateCard = ({ onGenerate }) => {
  return (
    <div className="group relative p-12 rounded-[48px] bg-gradient-to-br from-accent-main/10 via-white/[0.02] to-violet-500/10 border border-white/10 overflow-hidden shadow-2xl transition-all hover:border-accent-main/30 mb-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
           <div className="space-y-4 text-center lg:text-left">
              <Typography variant="h2" className="!mb-0 !text-3xl font-black uppercase tracking-widest leading-tight">Generate New <br />Technical Set</Typography>
              <Typography className="text-sm text-text-subtle opacity-70 max-w-sm font-medium">Synthesize a fresh suite of technical mission challenges.</Typography>
           </div>
           
           <Button 
              onClick={onGenerate} 
              className="!rounded-3xl px-16 py-6 !text-xl shadow-[0_20px_50px_rgba(50,208,206,0.3)] hover:scale-105 transition-transform font-black tracking-widest"
           >
              INITIALIZE GENERATOR
           </Button>
        </div>
    </div>
  );
};

export default GenerateCard;
