import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../store/userSlice";

import ProfileHeader from "./Components/ProfileHeader";
import ResumeInfo from "./Components/ResumeInfo";
import Preferences from "./Components/Preferences";
import Interviews from "./Components/Interviews";
import Progress from "./Components/Progress";

const ProfileLayout = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="w-full min-h-screen px-6 py-6 space-y-6">

      <div className="w-full">
        <ProfileHeader user={user} />
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ResumeInfo user={user} />
        <Preferences user={user} />
      </div>

      <div className="w-full">
        <Interviews user={user} />
      </div>

      <div className="w-full">
        <Progress user={user} />
      </div>

    </div>
  );
};

export default ProfileLayout;