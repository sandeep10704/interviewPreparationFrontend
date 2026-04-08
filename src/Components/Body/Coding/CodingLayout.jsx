import { Link, Outlet } from "react-router-dom";

const CodingLayout = () => {
  return (
    <div>
      <h2>Coding Section</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Link to="normal">
          <button>Normal</button>
        </Link>

        <Link to="realtime">
          <button>Realtime</button>
        </Link>

        <Link to="playground">
          <button>Playground</button>
        </Link>
      </div>

      <Outlet />
    </div>
  );
};

export default CodingLayout;