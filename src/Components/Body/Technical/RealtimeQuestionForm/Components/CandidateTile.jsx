import React from "react";
import { Typography } from "../../../../Common";

const CandidateTile = ({ user, isCamOn, isMicOn }) => {
  return (
    <div className="relative rounded-3xl bg-white/5 border border-white/10 overflow-hidden group shadow-2xl h-full transition-all hover:border-violet-500/30">
       {isCamOn ? (
           <div className="absolute inset-0 flex items-center justify-center bg-black/40">
               <div className="w-40 h-40 rounded-full bg-white/5 flex items-center justify-center border border-white/10 animate-pulse">
                   <Typography className="text-6xl opacity-10 font-black uppercase text-text-subtle">{user?.displayName?.[0] || "U"}</Typography>
               </div>
           </div>
       ) : (
           <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
               <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center text-error border border-error/20">
                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                  </div>
                  <Typography className="text-[10px] font-black uppercase tracking-widest text-error">Camera Blocked</Typography>
               </div>
           </div>
       )}
       
       <div className="absolute bottom-6 left-6 flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-white border border-white/10 flex items-center gap-3">
             <span className="w-2 h-2 rounded-full bg-violet-500 shadow-[0_0_8px_#8b5cf6]"></span>
             You ({user?.displayName || "Candidate"})
          </div>
          {!isMicOn && (
             <div className="w-8 h-8 rounded-full bg-error border border-error shadow-[0_0_15px_rgba(255,87,87,0.4)] flex items-center justify-center animate-pulse">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C10.34 2 9 3.34 9 5v7c0 1.66 1.34 3 3 3s3-1.34 3-3V5c0-1.66-1.34-3-3-3zm5 10v-1c0-.55-.45-1-1-1s-1 .45-1 1v1c0 1.66-1.34 3-3 3s-3-1.34-3-3v-1c0-.55-.45-1-1-1s-1 .45-1 1v1c0 3 2.19 5.51 5 5.91V21c0 .55.45 1 1 1s1-.45 1-1v-2.09c2.81-.4 5-2.91 5-5.91z"/></svg>
             </div>
          )}
       </div>
    </div>
  );
};

export default CandidateTile;
