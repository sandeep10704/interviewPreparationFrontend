import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../../store/userSlice";


const Preferences = ({ user }) => {
  const dispatch = useDispatch();

  const [editing, setEditing] = useState(false);
  const [targetRole, setTargetRole] = useState(user?.target_role || "");
  const [locations, setLocations] = useState(
    user?.preferred_locations?.join(", ") || ""
  );

  const handleSave = () => {
    dispatch(
      updateUser({
        target_role: targetRole,
        preferred_locations: locations
          .split(",")
          .map((l) => l.trim())
      })
    );

    setEditing(false);
  };

  return (
   <div className="w-full bg-slate-900 border border-slate-700 p-5 rounded-xl shadow-lg text-white">
      <div className="flex justify-between mb-3">
        <h3 className="font-semibold">Preferences</h3>

        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="text-blue-500"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="text-green-600"
          >
            Save
          </button>
        )}
      </div>

      {editing ? (
        <div className="space-y-2">
          <input
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            placeholder="Target role"
            className="w-full border p-2 rounded"
          />

          <input
            value={locations}
            onChange={(e) => setLocations(e.target.value)}
            placeholder="Locations comma separated"
            className="w-full border p-2 rounded"
          />
        </div>
      ) : (
        <>
          <p>
            <strong>Target Role:</strong>{" "}
            {user?.target_role || "Not set"}
          </p>

          <p>
            <strong>Locations:</strong>{" "}
            {user?.preferred_locations?.join(", ") || "Not set"}
          </p>
        </>
      )}
    </div>
  );
};

export default Preferences;