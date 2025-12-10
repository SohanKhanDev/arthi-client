import { Outlet } from "react-router";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen">
      {/* <Navbar /> */}
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] bg-white">
        <div className="col-span-1 h-full">
          <Sidebar />
        </div>

        <div className="col-span-1 md:col-start-2 overflow-x-auto">
          <Outlet />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default DashboardLayout;
