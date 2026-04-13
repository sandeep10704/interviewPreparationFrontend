import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../../store/userSlice";


const Interviews = ({ user }) => {
  const dispatch = useDispatch();

  const [company, setCompany] = useState("");

  const addInterview = () => {
    const updated = [
      ...(user?.upcoming_interviews || []),
      { company }
    ];

    dispatch(
      updateUser({
        upcoming_interviews: updated
      })
    );

    setCompany("");
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-700 p-5 rounded-xl shadow-lg text-white">
      <h3 className="font-semibold mb-3">
        Upcoming Interviews
      </h3>

      <div className="flex gap-2 mb-3">
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company name"
          className="border p-2 rounded w-full"
        />

        <button
          onClick={addInterview}
          className="bg-blue-500 text-white px-3 rounded"
        >
          Add
        </button>
      </div>

      {user?.upcoming_interviews?.length ? (
        user.upcoming_interviews.map((item, i) => (
          <div key={i} className="border-b py-2">
            {item.company}
          </div>
        ))
      ) : (
        <p>No upcoming interviews</p>
      )}
    </div>
  );
};

export default Interviews;