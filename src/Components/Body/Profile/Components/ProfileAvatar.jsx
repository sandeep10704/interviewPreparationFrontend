import React from "react";
import { auth } from "../../../../firebase";

const ProfileAvatar = () => {
  const user = auth.currentUser;
  const photo = user?.photoURL;
  const name = user?.displayName || "User";

  return (
    <div className="relative group">
       <div className="absolute inset-0 bg-accent-main/30 blur-xl rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
       <div className="w-24 h-24 rounded-[32px] bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center overflow-hidden relative z-10 transition-transform group-hover:scale-105 duration-500 shadow-2xl">
          {photo ? (
            <img
               src={photo}
               alt="profile"
               className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-3xl font-black text-accent-main font-serif italic">
               {name.charAt(0).toUpperCase()}
            </span>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
       </div>
       
       <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-accent-main border-4 border-[#01080E] flex items-center justify-center z-20 shadow-lg">
          <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
             <path d="M5 13l4 4L19 7" />
          </svg>
       </div>
    </div>
  );
};

export default ProfileAvatar;