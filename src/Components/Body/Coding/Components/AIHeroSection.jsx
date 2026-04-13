import React from "react";
import { Typography, Button } from "../../../Common";

const AIHeroSection = ({ onGenerateClick }) => {
  return (
    <div className="relative p-1 bg-gradient-to-r from-cyan-500/30 via-violet-500/30 to-purple-500/30 rounded-[40px] shadow-2xl overflow-hidden group">
      <div className="bg-[#01080E] rounded-[38px] p-10 lg:p-14 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden text-left">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-main/5 blur-[120px] -mr-48 -mt-48 transition-all group-hover:bg-accent-main/10"></div>
        
        <div className="relative z-10 space-y-6 lg:max-w-xl">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-main/10 border border-accent-main/20">
              <div className="w-2 h-2 rounded-full bg-accent-main animate-pulse"></div>
              <span className="text-[10px] font-black tracking-widest text-accent-main uppercase">Neural Generation</span>
           </div>
           <Typography variant="h2" className="!text-4xl font-black tracking-tight leading-none">
              Not finding your <br />
              <span className="text-accent-main italic font-serif">Perfect Challenge?</span>
           </Typography>
           <Typography variant="body" className="text-text-subtle text-lg">
              Generate custom problems based on your target difficulty and required quantity. 
              Everything is AI-curated specifically for your needs.
           </Typography>
           <Button 
              size="lg" 
              className="!rounded-2xl !px-10 h-16 shadow-[0_20px_40px_-10px_rgba(50,208,200,0.3)] !text-lg !font-black tracking-wide"
              onClick={onGenerateClick}
           >
              Configure & Generate
           </Button>
        </div>

        <div className="relative z-10 w-full lg:w-[450px] aspect-square rounded-[40px] bg-white/[0.03] border border-white/10 p-4 shadow-inner overflow-hidden flex flex-col items-center justify-center gap-6 group">
           <div className="relative">
              <div className="absolute inset-0 bg-accent-main/20 blur-[50px] animate-pulse"></div>
              <div className="w-24 h-24 rounded-3xl bg-[#01080E] border border-white/10 flex items-center justify-center relative z-10">
                 <svg className="w-12 h-12 text-accent-main animate-spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707" />
                 </svg>
              </div>
           </div>
           <div className="text-center space-y-2">
              <Typography className="text-sm font-black tracking-widest text-accent-main uppercase tracking-[0.2em]">Ready to Compute</Typography>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AIHeroSection;
