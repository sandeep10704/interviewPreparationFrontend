import React from "react";
import { Typography } from "../../../Common";

const SetCard = ({ set, index, onStandard, onRealtime, onOneByOne }) => {
  return (
    <div className="group relative p-8 rounded-[40px] bg-[#01080E]/60 border border-white/5 hover:border-accent-main/40 transition-all overflow-hidden flex flex-col justify-between h-96 text-left shadow-2xl font-inter">
       
       <div className="space-y-6 relative z-10">
          <div className="flex items-center justify-between">
             <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-main group-hover:bg-accent-main group-hover:text-black transition-all duration-300">
                <Typography className="font-black italic">#0{index + 1}</Typography>
             </div>
             {set.isAttempted ? (
                <div className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-[8px] font-black text-violet-400 uppercase tracking-widest shadow-[0_0_10px_rgba(139,92,246,0.3)]">
                   Archived
                </div>
             ) : (
                <div className="flex gap-2">
                   <div className="w-2 h-2 rounded-full bg-accent-main animate-pulse shadow-[0_0_5px_#32d0c8]"></div>
                   <Typography className="text-[8px] font-black text-accent-main uppercase tracking-widest">Active Signal</Typography>
                </div>
             )}
          </div>
          <Typography variant="h3" className="!text-xl !mb-0 font-black leading-tight tracking-tight uppercase">Technical <br/>Sector {index + 1}</Typography>
       </div>
       
       {/* Triple Choice Actions */}
       <div className="space-y-2 relative z-10 transition-all duration-500 transform translate-y-6 group-hover:translate-y-0">
          <button 
             onClick={() => onStandard(set)}
             className="w-full py-2.5 rounded-2xl bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 group/btn"
          >
             List View
          </button>
          
          <button 
             onClick={() => onOneByOne(set)}
             className="w-full py-2.5 rounded-2xl bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 group/btn"
          >
             Sequential Mode
             <svg className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 5l7 7-7 7"/></svg>
          </button>
          
          <button 
             onClick={() => onRealtime(set)}
             className="w-full py-3 rounded-2xl bg-accent-main text-black text-[9px] font-black uppercase tracking-widest hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent-main/10"
          >
             <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse"></span>
             Join Live Arena
          </button>
       </div>

       <div className="flex items-center justify-between relative z-10 mt-4 opacity-40 group-hover:opacity-100 transition-opacity">
          <div className="text-[9px] font-black text-text-subtle uppercase tracking-widest">Protocol ID: {set.id?.slice(0,10).toUpperCase()}</div>
       </div>

       <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent-main/5 blur-[50px] -mr-16 -mb-16 rounded-full group-hover:bg-accent-main/10 transition-colors"></div>
    </div>
  );
};

export default SetCard;
