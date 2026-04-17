import React from "react";
import { Typography, Button } from "../../../Common";

const GenerateHrCard = ({ onGenerate }) => {
  return (
    <div className="group relative p-12 rounded-[48px] bg-gradient-to-br from-accent-main/10 via-white/[0.02] to-accent-main/5 border border-white/10 overflow-hidden shadow-2xl transition-all hover:border-accent-main/30 mb-8 font-inter">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10 text-left">
           <div className="space-y-4">
              <Typography variant="h2" className="!mb-0 !text-3xl font-black uppercase tracking-widest leading-tight">Generate New <br />Behavioral Set</Typography>
              <Typography className="text-sm text-text-subtle opacity-70 max-w-sm font-medium">Synthesize a suite of HR and culture-fit challenges.</Typography>
           </div>
           
           <Button 
              onClick={onGenerate} 
              className="!rounded-3xl px-16 py-6 !text-xl shadow-[0_20px_50px_rgba(50,208,206,0.25)] hover:scale-105 transition-transform font-black tracking-widest"
           >
              INITIALIZE HR GENERATOR
           </Button>
        </div>
    </div>
  );
};

export default GenerateHrCard;
