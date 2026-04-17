import React from "react";
import { Typography } from "../../../../Common";

const ControlBar = ({ 
  isMicOn, toggleMic, 
  isCamOn, toggleCam, 
  onDisconnect, 
  showSidePanel, toggleSidePanel,
  sessionId 
}) => {
  return (
    <div className="h-24 bg-black/80 backdrop-blur-2xl border-t border-white/5 flex items-center justify-between px-10 relative z-50">
       <div className="hidden lg:flex items-center gap-6">
          <div className="flex flex-col">
             <Typography className="text-sm font-black text-white leading-none">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
             </Typography>
             <Typography className="text-[10px] font-black text-text-subtle/50 uppercase tracking-[0.2em] mt-1">
                Local Signal Stable
             </Typography>
          </div>
          <div className="w-px h-8 bg-white/10"></div>
          <Typography className="text-[10px] font-black text-text-subtle uppercase tracking-[0.3em] opacity-40">
             Session: {sessionId?.slice(0, 10).toUpperCase()}
          </Typography>
       </div>

       {/* Center Action Controls */}
       <div className="flex items-center gap-5">
          <button 
             onClick={toggleMic}
             className={`w-14 h-14 rounded-full border transition-all flex items-center justify-center group ${isMicOn ? "bg-white/5 border-white/10 text-white hover:bg-white/10" : "bg-error border-error text-white shadow-[0_0_25px_rgba(255,87,87,0.4)]"}`}
          >
             {isMicOn ? (
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>
             ) : (
                <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1V7a1 1 0 011-1h1.586l4.707-4.707C10.923 1.137 12 1.253 12 2v20c0 .747-.83 1.092-1.343.614L5.586 15z"/></svg>
             )}
          </button>
          <button 
             onClick={toggleCam}
             className={`w-14 h-14 rounded-full border transition-all flex items-center justify-center group ${isCamOn ? "bg-white/5 border-white/10 text-white hover:bg-white/10" : "bg-error border-error text-white shadow-[0_0_25px_rgba(255,87,87,0.4)]"}`}
          >
             <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
          </button>
          
          <div className="w-px h-10 bg-white/10 mx-2"></div>
          
          <button 
             onClick={onDisconnect}
             className="px-10 h-14 rounded-full bg-error/90 hover:bg-error text-white text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center gap-4 shadow-[0_15px_35px_rgba(255,87,87,0.2)] group"
          >
             <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
             End Session
          </button>
       </div>

       <div className="hidden lg:flex items-center gap-8">
          <button 
             onClick={toggleSidePanel} 
             className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${showSidePanel ? "text-accent-main bg-accent-main/10 shadow-[0_0_20px_rgba(50,208,206,0.1)] border border-accent-main/20" : "text-text-subtle hover:bg-white/5 border border-white/5"}`}
          >
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </button>
          <div className="flex flex-col items-end">
             <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-main animate-pulse"></span>
                <Typography className="text-[10px] font-black text-white uppercase tracking-widest">Neural Link</Typography>
             </div>
             <Typography className="text-[8px] font-bold text-text-subtle/40 uppercase">Encrypted Assessment</Typography>
          </div>
       </div>
    </div>
  );
};

export default ControlBar;
