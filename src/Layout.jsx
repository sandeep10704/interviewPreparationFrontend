import { Outlet, useLocation } from "react-router-dom";
import HeaderLayout from "./Components/Header/HeaderLayout";
import FooterLayout from "./Components/Footer/FooterLayout";

const Layout = () => {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  if (hideLayout) {
    return <Outlet />;
  }

  return (
    <>
      <HeaderLayout />

      <main style={{ minHeight: "80vh" }}>
        <Outlet />
      </main>

      <FooterLayout />
    </>
  );
};

export default Layout;