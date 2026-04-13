import React from "react";
import ProfileAvatar from "./ProfileAvatar";
import { Typography } from "../../../Common";

const ProfileHeader = ({ user }) => {
  // Be extremely robust: check for data, user, or flat object
  // Also check nested auth fields if needed
  const userData = user?.data || user?.user || user;
  
  const name = userData?.name || userData?.displayName || userData?.full_name || "Member Name";
  const email = userData?.email || "Connect your account";
  const role = userData?.target_role || userData?.role || "Not Defined";

  return (
    <div className="relative p-[1px] bg-gradient-to-r from-accent-main/20 via-violet-500/20 to-accent-main/20 rounded-[32px] overflow-hidden group">
      <div className="bg-[#01080E]/80 backdrop-blur-xl rounded-[31px] p-8 lg:p-12 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden text-left">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-main/5 blur-[100px] -mr-32 -mt-32 animate-pulse"></div>
        
        <div className="relative">
           <div className="absolute inset-0 bg-accent-main/20 blur-2xl rounded-full scale-110"></div>
           <ProfileAvatar />
        </div>

        <div className="flex-1 space-y-4 relative z-10">
          <div className="space-y-1">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-main/10 border border-accent-main/20 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-main animate-pulse"></span>
                <span className="text-[10px] font-black tracking-widest text-accent-main uppercase">{userData?.subscription_status || 'Verified Profile'}</span>
             </div>
             <Typography variant="h2" className="!text-4xl font-black tracking-tighter">
                {name}
             </Typography>
             <Typography variant="body" className="text-text-subtle opacity-60 font-medium">
                {email}
             </Typography>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
             <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 flex flex-col items-start min-w-[120px]">
                <span className="text-[9px] font-black text-accent-main uppercase tracking-widest opacity-50">Target Role</span>
                <span className="text-xs font-bold text-text-main">{role}</span>
             </div>
             <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 flex flex-col items-start min-w-[120px]">
                <span className="text-[9px] font-black text-violet-400 uppercase tracking-widest opacity-50">Interview Score</span>
                <span className="text-xs font-bold text-text-main">{userData?.avg_score || 0}</span>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileHeader;