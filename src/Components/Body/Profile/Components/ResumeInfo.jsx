import React from "react";

const ResumeInfo = ({ user }) => {
  return (
  <div className="w-full bg-slate-900 border border-slate-700 p-5 rounded-xl shadow-lg text-white">
      <h3 className="font-semibold mb-3">Skills</h3>

      <div className="flex flex-wrap gap-2">
        {user?.skills?.length ? (
          user.skills.map((skill, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-gray-200 rounded text-sm"
            >
              {skill}
            </span>
          ))
        ) : (
          <p className="text-gray-500">No skills found</p>
        )}
      </div>
    </div>
  );
};

export default ResumeInfo;