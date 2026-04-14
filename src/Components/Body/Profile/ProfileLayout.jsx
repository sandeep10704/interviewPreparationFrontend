import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../store/userSlice";
import { Typography } from "../../Common";

import ProfileHeader from "./Components/ProfileHeader";
import ResumeInfo from "./Components/ResumeInfo";
import Preferences from "./Components/Preferences";
import Interviews from "./Components/Interviews";
import Progress from "./Components/Progress";

const ProfileLayout = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (loading) {
     return (
        <div className="min-h-screen flex items-center justify-center bg-[#01080E]">
           <div className="flex flex-col items-center gap-6 opacity-40">
              <div className="w-12 h-12 border-4 border-accent-main/20 border-t-accent-main rounded-full animate-spin"></div>
              <Typography className="text-[10px] font-black tracking-[0.3em] uppercase text-white">Recalling Profile Neurons...</Typography>
           </div>
        </div>
     );
  }

   return (
    <div className="w-full min-h-screen bg-[#01080E] px-6 lg:px-20 py-12 space-y-12 animate-fade-in relative overflow-hidden text-left">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
         <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent-main/5 blur-[150px] -mr-64"></div>
         <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-violet-500/5 blur-[150px] -ml-64"></div>
      </div>

      <div className="relative z-10 space-y-12 max-w-7xl mx-auto">
        <ProfileHeader user={user} />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
           <div className="lg:col-span-2">
              <ResumeInfo user={user} />
           </div>
           <div className="lg:col-span-3">
              <Preferences user={user} />
           </div>
        </div>

        <Interviews user={user} />
        <Progress user={user} />
      </div>
    </div>
  );
};

export default ProfileLayout;