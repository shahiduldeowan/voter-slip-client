import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="relative min-h-screen md:flex">
      <Sidebar />
      <div className="flex-1">
        <div className="p-5 h-[100vh] w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
