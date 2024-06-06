import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Main = () => {
  const { user } = useAuth();
  console.log(user?.RoleName);
  return (
    <div className="w-[100vh] h-[100vh] border">
      <div className="w-[100%] h-[100%]">
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
