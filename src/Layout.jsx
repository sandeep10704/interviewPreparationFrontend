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

    <main className="min-h-[80vh] max-w-5xl mx-auto px-6 w-full">
      <Outlet />
    </main>

    {!location.pathname.startsWith('/coding') && <FooterLayout />}
  </>
);
};

export default Layout;