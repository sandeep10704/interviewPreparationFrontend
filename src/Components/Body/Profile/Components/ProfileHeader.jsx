import React from "react";
import ProfileAvatar from "./ProfileAvatar";

const ProfileHeader = ({ user }) => {
  return (
    <div className="w-full bg-slate-900 border border-slate-700 p-5 rounded-xl shadow-lg text-white">
      <ProfileAvatar />

      <div>
        <h2 className="text-xl font-semibold">
          {user?.name || "Your Name"}
        </h2>

        <p className="text-gray-600">
          {user?.email || "email@example.com"}
        </p>

        <p className="text-gray-500">
          {user?.target_role || "Target role not set"}
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;