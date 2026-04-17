import React from "react";
import { Typography } from "../../../Common";

const HrHero = () => {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
         <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent-main/5 blur-[150px] -mr-64 animate-pulse"></div>
         <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-accent-main/5 blur-[150px] -ml-64 animate-pulse"></div>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
         <div className="space-y-4 text-left font-inter">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-main/10 border border-accent-main/20 mb-2">
               <span className="w-2 h-2 rounded-full bg-accent-main animate-pulse shadow-[0_0_10px_#32d0c8]"></span>
               <span className="text-[11px] font-black tracking-[0.2em] text-accent-main uppercase font-mono">Behavioral Arena</span>
            </div>
            <Typography variant="h1" className="!text-6xl font-black tracking-tighter">
               HR <span className="text-accent-main">Command</span>
            </Typography>
         </div>
      </div>
    </>
  );
};

export default HrHero;
