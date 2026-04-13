import React from "react";
import { auth } from "../../../../firebase";


const ProfileAvatar = () => {
  const user = auth.currentUser;

  const photo = user?.photoURL;
  const name = user?.displayName || "User";

  if (photo) {
    return (
      <img
        src={photo}
        alt="profile"
        className="w-16 h-16 rounded-full object-cover"
      />
    );
  }

  return (
    <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-lg font-semibold">
      {name.charAt(0).toUpperCase()}
    </div>
  );
};

export default ProfileAvatar;