import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../../store/userSlice";
import { Typography, Button } from "../../../Common";

const Preferences = ({ user }) => {
  const dispatch = useDispatch();
  const userData = user?.data || user;

  const [editing, setEditing] = useState(false);
  const [targetRole, setTargetRole] = useState(userData?.target_role || "");
  const [locations, setLocations] = useState(
    userData?.preferred_locations?.join(", ") || ""
  );

  useEffect(() => {
     setTargetRole(userData?.target_role || "");
     setLocations(userData?.preferred_locations?.join(", ") || "");
  }, [userData]);

  const handleSave = () => {
    dispatch(
      updateUser({
        target_role: targetRole,
        preferred_locations: locations
          .split(",")
          .map((l) => l.trim())
          .filter(Boolean)
      })
    );
    setEditing(false);
  };

  return (
    <div className="w-full h-full bg-[#01080E]/40 backdrop-blur-md border border-white/10 p-8 rounded-[32px] space-y-8 shadow-xl relative overflow-hidden group">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-main/10 flex items-center justify-center text-accent-main">
               <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
               </svg>
            </div>
            <Typography variant="h3" className="!mb-0 uppercase tracking-widest text-sm font-black">Preferences</Typography>
         </div>

         {!editing ? (
           <button 
            onClick={() => setEditing(true)} 
            className="text-[10px] font-black tracking-widest text-accent-main uppercase hover:opacity-80 transition-all border-b border-accent-main/30"
           >
             Edit Mode
           </button>
         ) : (
           <div className="flex gap-4">
              <button 
               onClick={() => setEditing(false)} 
               className="text-[10px] font-black tracking-widest text-white/40 uppercase hover:text-white transition-all"
              >
                Cancel
              </button>
              <button 
               onClick={handleSave} 
               className="text-[10px] font-black tracking-widest text-accent-main uppercase hover:opacity-80 transition-all"
              >
                Save Changes
              </button>
           </div>
         )}
      </div>

      {editing ? (
        <div className="space-y-6 animate-in slide-in-from-top-4 duration-300">
           <div className="space-y-2">
              <label className="text-[10px] font-black text-text-subtle uppercase tracking-widest ml-1">Target Role</label>
              <input
                 value={targetRole}
                 onChange={(e) => setTargetRole(e.target.value)}
                 placeholder="e.g. Senior Software Engineer"
                 className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-text-main focus:border-accent-main/50 focus:bg-white/10 outline-none transition-all placeholder:text-text-subtle/20"
              />
           </div>

           <div className="space-y-2">
              <label className="text-[10px] font-black text-text-subtle uppercase tracking-widest ml-1">Preferred Locations</label>
              <input
                 value={locations}
                 onChange={(e) => setLocations(e.target.value)}
                 placeholder="Remote, NYC, London..."
                 className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-text-main focus:border-accent-main/50 focus:bg-white/10 outline-none transition-all placeholder:text-text-subtle/20"
              />
           </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
           <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-1">
              <Typography className="text-[10px] font-black text-accent-main uppercase tracking-widest opacity-40">Target Role</Typography>
              <Typography className="text-sm font-bold">{userData?.target_role || "Not specified"}</Typography>
           </div>

           <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-1">
              <Typography className="text-[10px] font-black text-violet-400 uppercase tracking-widest opacity-40">Ideal Locations</Typography>
              <div className="flex flex-wrap gap-2 mt-2">
                 {userData?.preferred_locations?.length ? (
                    userData.preferred_locations.map((loc, i) => (
                       <span key={i} className="px-3 py-1 bg-violet-400/10 text-violet-300 text-[10px] font-black uppercase rounded-lg border border-violet-400/20">{loc}</span>
                    ))
                 ) : (
                    <Typography className="text-sm font-bold text-text-subtle/30 italic">Global / Remote</Typography>
                 )}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Preferences;