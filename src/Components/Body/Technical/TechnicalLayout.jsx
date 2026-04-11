import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const TechnicalLayout = () => {
  const navigate = useNavigate();
  const [selectedSet, setSelectedSet] = useState(null);

  const sets = ["tech-201", "tech-202", "tech-203"];

  const openPopup = (id) => {
    setSelectedSet(id);
  };

  const goTo = (type) => {
    navigate(`/technical/${selectedSet}/${type}`);
    setSelectedSet(null);
  };

  return (
    <div>
      <h2>Technical Sets</h2>

      {sets.map((id) => (
        <button key={id} onClick={() => openPopup(id)}>
          {id}
        </button>
      ))}

      {selectedSet && (
        <div style={{
          position: "fixed",
          top: "40%",
          left: "40%",
          background: "white",
          padding: "20px",
          border: "1px solid black"
        }}>
          <h4>Select Type</h4>

          <button onClick={() => goTo("question-form")}>
            Question Form
          </button>

          <button onClick={() => goTo("one-question")}>
            One Question
          </button>

          <button onClick={() => goTo("realtime")}>
            Realtime
          </button>

          <button onClick={() => goTo("realtime-one")}>
            Realtime One
          </button>

          <br />
          <button onClick={() => setSelectedSet(null)}>
            Close
          </button>
        </div>
      )}

      <Outlet />
    </div>
  );
};

export default TechnicalLayout;
