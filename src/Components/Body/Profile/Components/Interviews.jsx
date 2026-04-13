import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../../store/userSlice";
import { Typography, Button } from "../../../Common";

const Interviews = ({ user }) => {
  const dispatch = useDispatch();
  const userData = user?.data || user;
  const [company, setCompany] = useState("");

  const addInterview = () => {
    if (!company.trim()) return;
    const updated = [
      ...(userData?.upcoming_interviews || []),
      { company, date: new Date().toLocaleDateString() }
    ];
    dispatch(updateUser({ upcoming_interviews: updated }));
    setCompany("");
  };

  return (
    <div className="w-full bg-[#01080E]/40 backdrop-blur-md border border-white/10 p-8 rounded-[32px] space-y-8 shadow-xl relative overflow-hidden group">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-main/10 flex items-center justify-center text-accent-main">
               <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
               </svg>
            </div>
            <Typography variant="h3" className="!mb-0 uppercase tracking-widest text-sm font-black">Upcoming Battlegrounds</Typography>
         </div>

         <div className="flex gap-2">
            <input
               value={company}
               onChange={(e) => setCompany(e.target.value)}
               placeholder="Enter target company..."
               className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-xs font-bold text-text-main focus:border-accent-main/50 outline-none transition-all placeholder:text-text-subtle/20 min-w-[200px]"
            />
            <Button 
               size="md" 
               onClick={addInterview}
               className="!rounded-2xl !px-6 bg-accent-main !text-black font-black"
            >
               ADD
            </Button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {userData?.upcoming_interviews?.length ? (
            userData.upcoming_interviews.map((item, i) => (
               <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col justify-between hover:bg-white/10 hover:border-accent-main/30 transition-all cursor-default group/card">
                  <div className="space-y-1">
                     <Typography className="text-[10px] font-black text-accent-main uppercase tracking-[0.2em] opacity-40 group-hover/card:opacity-100 transition-opacity">COMPANY</Typography>
                     <Typography className="text-lg font-black">{item.company}</Typography>
                  </div>
                  <div className="mt-6 flex items-center justify-between opacity-50">
                     <span className="text-[10px] font-black text-text-subtle">{item.date || 'TBD'}</span>
                     <div className="w-1.5 h-1.5 rounded-full bg-accent-main"></div>
                  </div>
               </div>
            ))
         ) : (
            <div className="col-span-full py-12 text-center border-2 border-dashed border-white/5 rounded-[32px] opacity-30">
               <Typography className="text-sm italic font-mono uppercase tracking-widest text-text-subtle">No active battle missions registered</Typography>
            </div>
         )}
      </div>
    </div>
  );
};

export default Interviews;