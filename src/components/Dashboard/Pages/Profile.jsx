import React from "react";
import { useNavigate } from "react-router";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import useDBUser from "../../../hooks/usedbUser";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import MyBtn from "../../Shared/MyBtn";
import { RiLogoutBoxLine } from "react-icons/ri";

const Profile = () => {
  const { dbUser, isLoading } = useDBUser();
  const { logOut } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-emerald-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const createdAT = dbUser?.createdAt
    ? new Date(dbUser?.createdAt).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      })
    : "N/A";

  const lastLoggedIn = dbUser?.lastLoogedIn
    ? new Date(dbUser?.lastLoogedIn).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "No Data Found";

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/", { replace: true });
    } catch (error) {
      toast.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-emerald-50 py-12 px-6 flex justify-center">
      {" "}
      <div className="max-w-2xl mx-auto">
        <div className="relative group">
          <div className="relative bg-white/90 backdrop-blur-2xl shadow-2xl rounded-3xl border border-white/50 overflow-hidden p-8">
            <div className="h-32 bg-linear-to-br from-emerald-500 via-teal-500 to-emerald-600 relative overflow-hidden">
              {" "}
              <div className="absolute inset-0 bg-linear-to-r from-white/10 to-transparent animate-shimmer"></div>{" "}
            </div>

            {/* Profile Section */}
            <div className="flex flex-col items-center -mt-20 relative z-10">
              <div className="relative">
                <img
                  src={dbUser?.image}
                  alt={dbUser?.name}
                  className="w-32 h-32 rounded-3xl object-cover shadow-2xl border-6 border-white/80 ring-4 ring-emerald-500/30 hover:ring-emerald-500/50 transition-all duration-500 hover:scale-105"
                />
              </div>

              <div className="mt-8 text-center space-y-2">
                <h2 className="text-3xl font-bold text-slate-900 bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text">
                  {" "}
                  {/* Fixed: bg-linear-to-r */}
                  {dbUser?.name || "User"}
                </h2>
                <div className="inline-flex items-center px-4 py-1.5 bg-linear-to-r from-emerald-100 to-teal-100 text-emerald-800 text-sm font-semibold rounded-full shadow-md">
                  {" "}
                  {/* Fixed: bg-linear-to-r */}
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                  {dbUser?.role.toUpperCase() || "USER"}
                </div>
                <p className="text-slate-500 text-lg">{dbUser?.email}</p>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 gap-6 mt-12 px-4">
              <div className="bg-linear-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl border border-emerald-100/50 shadow-lg hover:shadow-xl transition-all duration-300">
                {" "}
                {/* Fixed: bg-linear-to-br */}
                <div className="text-sm font-medium text-emerald-700 uppercase tracking-wide mb-1">
                  Joined
                </div>
                <div className="text-xl font-bold text-slate-900">
                  {createdAT}
                </div>
              </div>
              <div className="bg-linear-to-br from-slate-50 to-gray-50 p-6 rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
                {" "}
                {/* Fixed: bg-linear-to-br */}
                <div className="text-sm font-medium text-slate-600 uppercase tracking-wide mb-1">
                  Last Login
                </div>
                <div className="text-xl font-bold text-slate-900">
                  {lastLoggedIn}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t border-slate-200">
              <MyBtn
                label="Logout"
                variant="primary"
                size="md"
                icon={RiLogoutBoxLine}
                onClick={handleLogout}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
