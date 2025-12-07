import { Outlet } from "react-router";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[auto_1fr] bg-white">
      {/* Left Side: Sidebar Component - Takes automatic width (or fixed if defined in Sidebar) */}
      <div className="col-span-1 h-full">
        <Sidebar />
      </div>
      {/* Right Side: Dashboard Dynamic Content - Fills the remaining space (1fr) */}
      <div className="col-span-1 md:col-start-2 overflow-x-auto">
        {/* The content wrapper is removed since the outer div handles the sizing */}
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
