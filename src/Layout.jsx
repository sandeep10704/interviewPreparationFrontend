import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import HeaderLayout from "./Components/Header/HeaderLayout";
import FooterLayout from "./Components/Footer/FooterLayout";

const Layout = () => {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  const publicRoutes = [
    "/",
    "/login",
    "/signup",
    "/coding/playground"
  ];

  const isPublic = publicRoutes.includes(location.pathname);

  // block private routes
  if (!user && !isPublic) {
    return <Navigate to="/login" replace />;
  }

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