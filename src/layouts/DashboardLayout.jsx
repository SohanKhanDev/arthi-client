import { Outlet } from "react-router";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";
import DashboardNavbar from "../components/Shared/DashboradNavbar";
import { useEffect } from "react";

const DashboardLayout = () => {
  useEffect(() => {
    document.title = "DASHBOARD | ARTHI";
  }, []);

  return (
    <div className="min-h-screen">
      <DashboardNavbar />
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr]">
        <div className="col-span-1 h-full">
          <Sidebar />
        </div>

        <div className="col-span-1 md:col-start-2 overflow-x-auto">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
