/* eslint-disable no-unused-vars */
import React from "react";
import { NavLink } from "react-router";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";

const DashboardNavLink = ({
  to,
  icon: Icon,
  label,
  onClick,
  variant = "default",
  className = "",
}) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `group flex items-center p-3 rounded-2xl transition-all duration-300 w-full border backdrop-blur-sm shadow-lg
        ${getVariantStyles(variant)}
        ${
          isActive
            ? "bg-linear-to-r from-secondary to-teal-500/20 border-2 border-green-500 text-white shadow-xl"
            : ""
        }
        ${className}`
      }
    >
      <Icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
      <span className="ml-4 font-medium">{label}</span>
    </NavLink>
  );
};

const getVariantStyles = (variant) => {
  switch (variant) {
    case "home":
      return "bg-gradient-to-r from-orange-500/20 to-amber-500/20 border-2 border-orange-500/40 text-orange-100 hover:bg-orange-500/40 hover:text-orange-50 hover:shadow-orange-500/25 hover:scale-[1.02] active:scale-[0.98]";

    case "profile":
      return "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-2 border-indigo-500/40 text-indigo-100 hover:bg-indigo-500/40 hover:text-indigo-50 hover:shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98]";

    case "logout":
      return "bg-gradient-to-r from-rose-500/20 to-red-500/20 border-2 border-rose-500/40 text-rose-200 hover:bg-rose-500/40 hover:text-rose-100 hover:shadow-rose-500/25 hover:scale-[1.02] active:scale-[0.98]";

    case "default":
      return "bg-gradient-to-r from-slate-500/20 to-gray-500/20 border-2 border-slate-500/40 text-slate-200 hover:bg-slate-500/40 hover:text-slate-100 hover:shadow-slate-500/25 hover:scale-[1.02] active:scale-[0.98]";

    default:
      return "bg-gradient-to-r from-slate-500/20 to-gray-500/20 border-2 border-slate-500/40 text-slate-200 hover:bg-slate-500/40 hover:text-slate-100 hover:shadow-slate-500/25 hover:scale-[1.02] active:scale-[0.98]";
  }
};

export default DashboardNavLink;
