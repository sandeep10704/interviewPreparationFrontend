import React from "react";
import { Typography } from "../../../Common";

const HrSetCard = ({ index, onClick }) => {
  return (
    <div 
       onClick={onClick}
       className="group relative p-8 rounded-[40px] bg-[#01080E]/60 border border-white/5 hover:border-accent-main/40 transition-all cursor-pointer overflow-hidden flex flex-col justify-between h-64 text-left shadow-2xl font-inter"
    >
       <div className="space-y-6 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-main group-hover:bg-accent-main group-hover:text-black transition-all duration-300">
             <Typography className="font-black">#0{index + 1}</Typography>
          </div>
          <Typography variant="h3" className="!text-xl !mb-0 font-black leading-tight tracking-tight">Behavioral Set {index + 1}</Typography>
       </div>
       
       <div className="flex items-center justify-between relative z-10">
          <div className="text-[10px] font-black text-text-subtle uppercase tracking-widest opacity-40">Prototype Assessment</div>
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-accent-main group-hover:text-black transition-all">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
          </div>
       </div>
       <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent-main/5 blur-[50px] -mr-16 -mb-16 rounded-full group-hover:bg-accent-main/10 transition-colors"></div>
    </div>
  );
};

export default HrSetCard;
