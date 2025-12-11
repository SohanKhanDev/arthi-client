import React, { useEffect } from "react";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import ErrorPage from "../ErrorPage/ErrorPage";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UserProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { email } = useParams();

  const {
    data: userData = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", email],
    queryFn: async () => {
      const result = await axiosSecure(`/users/${email}`);
      return result.data;
    },
  });

  useEffect(() => {
    document.title = "PROFILE | ARTHI";
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  const createdAt = userData.createdAt
    ? new Date(userData?.createdAt).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      })
    : "N/A";

  const lastLoggedIn = userData.lastLoogedIn
    ? new Date(userData.lastLoogedIn).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "No Data Found";

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16">
      {/* Container */}
      <div className="relative max-w-xl w-full">
        {/* Animated border wrapper */}
        <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-[#109D8C] to-[#063A59] blur-xl opacity-30 animate-pulse"></div>

        {/* Card */}
        <div className="relative z-10 bg-white/80 backdrop-blur-xl shadow-xl rounded-3xl border border-white/40 overflow-hidden">
          {/* Banner */}
          <div className="h-40 bg-linear-to-br from-[#109D8C] to-[#063A59]"></div>

          {/* Avatar */}
          <div className="flex flex-col items-center -mt-20 px-8">
            <img
              src={userData.image}
              alt={userData.name}
              className="w-36 h-36 rounded-2xl object-cover shadow-lg border-4 border-white"
            />
            <h2 className="mt-6 text-3xl font-semibold text-gray-900">
              {userData.name}
            </h2>
            <p className="text-lg text-gray-600 capitalize">{userData.role}</p>
            <p className="text-sm mt-1 text-gray-500">{userData.email}</p>
          </div>

          {/* Information section */}
          <div className="px-8 mt-8 pb-8 space-y-6">
            <div className="bg-gray-50 rounded-xl p-6 shadow-inner">
              <div className="flex justify-between text-base">
                <span className="font-medium text-gray-500">Joined</span>
                <span className="text-gray-900">{createdAt}</span>
              </div>
              <div className="flex justify-between text-base mt-3">
                <span className="font-medium text-gray-500">Last Login</span>
                <span className="text-gray-900">{lastLoggedIn}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between gap-2 pt-4">
              <Link to={`/edit-profile`} className="btn btn-secondary w-1/2">
                Edit Profile
              </Link>
              <Link to="/dashboard" className="w-1/2 btn btn-primary">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
