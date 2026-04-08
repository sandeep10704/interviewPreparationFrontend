import { Outlet } from "react-router-dom";

const BodyLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default BodyLayout;