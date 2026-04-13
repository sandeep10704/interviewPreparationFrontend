import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCodingSets } from "../../../store/codingSetSlice";

const CodingLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, loading } = useSelector(
    (state) => state.codingSets
  );

  const [mode, setMode] = useState(null); // normal | realtime

  useEffect(() => {
    if (mode) {
      dispatch(getCodingSets());
    }
  }, [mode]);

  return (
    <div>
      <h2>Coding Section</h2>

      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => setMode("normal")}>
          Normal
        </button>

        <button onClick={() => setMode("realtime")}>
          Realtime
        </button>

        <button onClick={() => navigate("playground")}>
          Playground
        </button>

        <button onClick={() => navigate("generate")}>
          Generate
        </button>
      </div>

      {/* POPUP */}
      {mode && (
        <div style={overlay}>
          <div style={modal}>
            <h3>Select Coding Set</h3>

            {loading && <p>Loading...</p>}

            {data?.map((set) => (
              <div
                key={set.coding_set_id}
                style={card}
                onClick={() => {
                  navigate(
                    `/coding/${mode}/${set.coding_set_id}`
                  );
                  setMode(null);
                }}
              >
                {set.title || set.coding_set_id}
              </div>
            ))}

            <button onClick={() => setMode(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodingLayout;

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const modal = {
  background: "white",
  padding: 20,
  borderRadius: 8,
  width: 400
};

const card = {
  padding: 10,
  border: "1px solid gray",
  marginBottom: 8,
  cursor: "pointer"
};