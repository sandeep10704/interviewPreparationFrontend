import React from "react";
import { Typography } from "../../../Common";

const Progress = ({ user }) => {
  const userData = user?.data || user;

  const categories = [
    { label: 'Coding', value: userData?.coding_progress || 0, color: 'from-accent-main to-cyan-400' },
    { label: 'Technical', value: userData?.technical_progress || 0, color: 'from-violet-500 to-purple-500' },
    { label: 'HR', value: userData?.hr_progress || 0, color: 'from-orange-400 to-red-400' }
  ];

  return (
    <div className="w-full bg-[#01080E]/40 backdrop-blur-md border border-white/10 p-8 rounded-[32px] space-y-8 shadow-xl relative overflow-hidden group">
      <div className="flex items-center gap-3">
         <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
               <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
         </div>
         <Typography variant="h3" className="!mb-0 uppercase tracking-widest text-sm font-black">Preparation Progress</Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((cat, i) => (
          <div key={i} className="space-y-4">
             <div className="flex justify-between items-end">
                <Typography className="text-[10px] font-black text-text-subtle uppercase tracking-widest leading-none">{cat.label}</Typography>
                <Typography className="text-xl font-black text-text-main leading-none">{cat.value}%</Typography>
             </div>
             <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div 
                   className={`h-full bg-gradient-to-r ${cat.color} transition-all duration-1000 shadow-[2px_0_10px_-2px_rgba(255,255,255,0.2)]`} 
                   style={{ width: `${cat.value}%` }}
                ></div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Progress;