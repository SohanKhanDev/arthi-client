import { useState } from "react";
import { Link, NavLink } from "react-router";
import logo from "../../../assets/arthi-logo2.png";
import useAuth from "../../../hooks/useAuth";

// Icons
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import { IoHomeSharp } from "react-icons/io5";

// User Menu
import MenuItem from "./Menu/MenuItem";
import AdminMenu from "./Menu/AdminMenu";
import BorrowerMenu from "./Menu/BorrowerMenu";
import ManagerMenu from "./Menu/ManagerMenu";
import DashboardNavLink from "../../Shared/DashboardNavLink";
import useDBUser from "../../../hooks/usedbUser";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const Sidebar = () => {
  const { logOut } = useAuth;
  const [isActive, setActive] = useState(false);
  const { dbUser, isLoading } = useDBUser();

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-linear-to-br from-slate-50 to-emerald-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-linear-to-r from-emerald-600 to-teal-700 shadow-2xl">
        <div className="flex items-center justify-between p-4 h-full">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="logo"
              className="w-10 h-10 rounded-xl shadow-lg"
            />
            <span className="text-white font-bold text-lg hidden sm:block">
              Arthi
            </span>
          </Link>
          <button
            onClick={handleToggle}
            className="p-2 rounded-xl bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300"
          >
            <AiOutlineBars className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Full Height Sidebar */}
      <div
        className={`fixed pt-4  inset-0 z-40 w-72 h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 backdrop-blur-xl shadow-2xl transform transition-all duration-500 ease-in-out border-r border-slate-700/50 ${
          isActive ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:z-auto overflow-hidden`}
      >
        <div className="h-full flex flex-col overflow-hidden">
          <nav className="flex-1 px-4 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800 ">
            {/* Role-Based Menus */}
            <div className=" space-y-1">
              {dbUser?.role === "admin" && <AdminMenu />}

              {dbUser?.role === "borrower" && <BorrowerMenu />}

              {dbUser?.role === "manager" && <ManagerMenu />}
            </div>
          </nav>

          {/* Bottom Actions - Fixed */}
          <div className="p-4 border-t border-slate-700/50 shrink-0 space-y-3 bg-slate-900/50 backdrop-blur-sm">
            <DashboardNavLink
              to="/"
              icon={IoHomeSharp}
              label="Home"
              variant="home"
            />
            <DashboardNavLink
              to="/dashboard/user-profile"
              icon={FcSettings}
              label="Profile"
              variant="profile"
            />

            <DashboardNavLink
              icon={GrLogout}
              label="Logout"
              variant="logout"
              onClick={logOut}
              to="/"
            />
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isActive && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={handleToggle}
        />
      )}

      {/* Content Spacer - Full Height */}
      <div
        className={`transition-all duration-500 pointer-events-none md:block md:w-72 md:h-screen md:fixed md:left-0 md:top-0 md:z-10`}
      ></div>
    </>
  );
};

export default Sidebar;
