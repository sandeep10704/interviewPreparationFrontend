import React from "react";
import { Typography } from "../../../Common";

const ResumeInfo = ({ user }) => {
  // Ultra-robust skill detection
  const userData = user?.data || user?.user || user;
  const skills = userData?.skills || userData?.technical_skills || userData?.keywords || [];

  return (
    <div className="w-full h-full bg-[#01080E]/40 backdrop-blur-md border border-white/10 p-8 rounded-[32px] space-y-6 shadow-xl relative overflow-hidden group min-h-[300px] text-left">
      <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 blur-[50px] -mr-16 -mt-16 transition-all group-hover:bg-violet-500/10"></div>
      
      <div className="flex items-center gap-3">
         <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
               <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
         </div>
         <Typography variant="h3" className="!mb-0 uppercase tracking-widest text-sm font-black">Technical Skills</Typography>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {skills?.length ? (
          skills.map((skill, i) => (
            <span
              key={i}
              className="px-4 py-2 bg-white/[0.03] border border-white/5 hover:border-accent-main/30 hover:bg-white/[0.08] rounded-xl text-[11px] font-bold text-text-main transition-all cursor-default"
            >
              {skill}
            </span>
          ))
        ) : (
          <div className="w-full py-12 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-2xl gap-3">
             <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center animate-pulse">
                <svg className="w-5 h-5 text-white/20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                   <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
             </div>
             <Typography className="text-xs text-text-subtle/40 italic font-mono uppercase tracking-widest">No verified skills found</Typography>
             <button className="text-[10px] font-black text-accent-main hover:opacity-80 transition-opacity underline underline-offset-4">UPLOAD RESUME</button>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-white/5 mt-auto">
         <Typography className="text-[10px] uppercase font-black tracking-widest text-text-subtle opacity-40">Profile Strength</Typography>
         <div className="mt-2 w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div 
               className="h-full bg-gradient-to-r from-violet-500 to-accent-main transition-all duration-1000 shadow-[0_0_10px_rgba(50,208,200,0.5)]" 
               style={{ width: skills?.length ? `${Math.min(skills.length * 10, 100)}%` : '0%' }}
            ></div>
         </div>
      </div>
    </div>
  );
};

export default ResumeInfo;