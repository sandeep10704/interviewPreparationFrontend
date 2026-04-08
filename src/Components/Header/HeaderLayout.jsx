import { Link } from "react-router-dom";

const HeaderLayout = () => {
  return (
    <header
      style={{
        display: "flex",
        gap: "20px",
        padding: "15px",
        background: "#111",
        color: "white"
      }}
    >
      <Link to="/" style={{ color: "white" }}>Home</Link>

      <Link to="/hr" style={{ color: "white" }}>HR</Link>

      <Link to="/technical" style={{ color: "white" }}>Technical</Link>

      <Link to="/coding" style={{ color: "white" }}>Coding</Link>

      <Link to="/profile" style={{ color: "white" }}>Profile</Link>

      <Link to="/login" style={{ color: "white", marginLeft: "auto" }}>
        Login
      </Link>

      <Link to="/signup" style={{ color: "white" }}>
        Signup
      </Link>
    </header>
  );
};

export default HeaderLayout;