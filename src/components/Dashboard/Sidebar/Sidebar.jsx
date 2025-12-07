import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import logo from "../../../assets/arthi-logo2.png";
import useAuth from "../../../hooks/useAuth";

// Icons
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";

// User Menu
import MenuItem from "./Menu/MenuItem";
import AdminMenu from "./Menu/AdminMenu";
import BorrowerMenu from "./Menu/BorrowerMenu";
import ManagerMenu from "./Menu/ManagerMenu";

const Sidebar = () => {
  const { logOut, user } = useAuth();
  const [isActive, setActive] = useState(false);
  const location = useLocation();

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
        className={`fixed inset-0 z-40 w-72 h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 backdrop-blur-xl shadow-2xl transform transition-all duration-500 ease-in-out border-r border-slate-700/50 ${
          isActive ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:z-auto overflow-hidden`}
      >
        {/* Sidebar Scroll Container */}
        <div className="h-full flex flex-col overflow-hidden">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-slate-700/50 shrink-0">
            <Link to="/" className="flex items-center space-x-3 mb-2">
              <div className=" rounded-2xl shadow-lg flex items-center justify-center">
                <img src={logo} alt="logo" className="w-16 h-16" />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent leading-tight">
                  Arthi Dashboard
                </h2>
                <p className="text-slate-400 text-sm truncate max-w-[140px]">
                  {user?.displayName}
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation Menu - Scrollable */}
          <nav className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800 space-y-1">
            {/* Statistics */}
            <MenuItem
              icon={BsGraphUp}
              label="Statistics"
              address="/dashboard"
              isActive={location.pathname === "/dashboard"}
            />

            {/* Role-Based Menus */}
            <div className="mt-6 space-y-1">
              <BorrowerMenu />
              <ManagerMenu />
              <AdminMenu />
            </div>
          </nav>

          {/* Bottom Actions - Fixed */}
          <div className="p-4 border-t border-slate-700/50 shrink-0 space-y-3 bg-slate-900/50 backdrop-blur-sm">
            <NavLink
              to="/dashboard/user-profile"
              className={`group flex items-center p-3 rounded-2xl transition-all duration-300 w-full ${
                location.pathname === "/dashboard/user-profile"
                  ? "bg-linear-to-r from-emerald-500/20 to-teal-500/20 border-2 border-emerald-500/40 backdrop-blur-sm text-emerald-100 shadow-lg"
                  : "text-slate-300 hover:bg-slate-700/70 hover:text-white hover:shadow-xl hover:border-slate-600/50 border border-transparent"
              }`}
            >
              <FcSettings className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              <span className="ml-4 font-medium">Profile</span>
            </NavLink>

            <NavLink
              onClick={logOut}
              className="w-full flex items-center p-3 rounded-2xl bg-linear-to-r from-red-500/20 to-rose-500/20 border-2 border-red-500/40 text-red-200 hover:bg-red-500/40 hover:text-red-100 backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
            >
              <GrLogout className="w-6 h-6" />
              <span className="ml-4 font-medium">Logout</span>
            </NavLink>
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
