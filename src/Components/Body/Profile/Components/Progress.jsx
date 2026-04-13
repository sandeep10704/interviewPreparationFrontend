import React from "react";

const Progress = ({ user }) => {
  return (
   <div className="w-full bg-slate-900 border border-slate-700 p-5 rounded-xl shadow-lg text-white">
      <h3 className="font-semibold mb-3">Progress</h3>

      <div className="space-y-2">
        <p>Coding: {user?.coding_progress || 0}%</p>
        <p>Technical: {user?.technical_progress || 0}%</p>
        <p>HR: {user?.hr_progress || 0}%</p>
      </div>
    </div>
  );
};

export default Progress;