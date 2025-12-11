import React from "react";
import { Link } from "react-router";
import logo from "../../assets/arthi-logo2.png";
import useAuth from "../../hooks/useAuth";
import ToggleButton from "../UI/ToggleButton/ToggleButton";
import useTheme from "../../hooks/useTheme";

const DashboardNavbar = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="border-b border-slate-700/50 shrink-0 flex items-center justify-between bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 px-6 py-4">
      <Link to="/" className="flex items-center space-x-3">
        <div className="rounded-2xl shadow-lg flex items-center justify-center">
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

      <ToggleButton theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
};

export default DashboardNavbar;
