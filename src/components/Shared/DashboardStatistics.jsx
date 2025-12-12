import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FaUsers,
  FaFileInvoice,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaChartLine,
  FaUserPlus,
} from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./LoadingSpinner";
import useDBUser from "../../hooks/usedbUser";
import AdminCharts from "../Dashboard/Charts/AdminCharts";

const cardColors = {
  emerald: {
    bgFrom: "from-emerald-50",
    bgTo: "to-emerald-100",
    iconBg: "bg-emerald-500",
  },
  blue: {
    bgFrom: "from-blue-50",
    bgTo: "to-blue-100",
    iconBg: "bg-blue-500",
  },
  purple: {
    bgFrom: "from-purple-50",
    bgTo: "to-purple-100",
    iconBg: "bg-purple-500",
  },
  orange: {
    bgFrom: "from-orange-50",
    bgTo: "to-orange-100",
    iconBg: "bg-orange-500",
  },
  green: {
    bgFrom: "from-green-50",
    bgTo: "to-green-100",
    iconBg: "bg-green-500",
  },
  red: {
    bgFrom: "from-red-50",
    bgTo: "to-red-100",
    iconBg: "bg-red-500",
  },
  indigo: {
    bgFrom: "from-indigo-50",
    bgTo: "to-indigo-100",
    iconBg: "bg-indigo-500",
  },
  teal: {
    bgFrom: "from-teal-50",
    bgTo: "to-teal-100",
    iconBg: "bg-teal-500",
  },

  gray: {
    bgFrom: "from-gray-50",
    bgTo: "to-gray-100",
    iconBg: "bg-gray-700",
  },
};

const DashboardStatistics = () => {
  const [stats, setStats] = useState({});
  const axiosSecure = useAxiosSecure();
  const { user, loading: authLoading } = useAuth();
  const { dbUser } = useDBUser();
  const role = dbUser?.role;

  const {
    data: dashboardData = {},
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["dashboardData", user?.email, role],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/dashboard/stats/${user?.email}?role=${role}`
      );
      return data;
    },
    enabled: !!user && !authLoading,
  });

  const {
    totalUsers = 0,
    totalLoans = 0,
    totalApplications = 0,
    pendingApps = 0,
    approvedApps = 0,
    rejectedApps = 0,
  } = dashboardData;

  useEffect(() => {
    if (isLoading || isFetching) return;

    if (role === "admin") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStats({
        totalUsers: totalUsers,
        totalLoans: totalLoans,
        totalApplications: totalApplications,
        pending: pendingApps,
        approved: approvedApps,
        rejected: rejectedApps,
      });
    } else if (role === "manager") {
      setStats({
        totalLoans: totalLoans,
        totalApplications: totalApplications,
        pending: pendingApps,
        approved: approvedApps,
        rejected: rejectedApps,
      });
    } else {
      // Client/User Role
      setStats({
        totalApplications: totalApplications,
        pending: pendingApps,
        approved: approvedApps,
        rejected: rejectedApps,
      });
    }
  }, [
    role,
    totalLoans,
    totalUsers,
    isLoading,
    isFetching,
    totalApplications,
    pendingApps,
    approvedApps,
    rejectedApps,
  ]);

  const StatsCard = ({ icon, title, value, colorKey }) => {
    const colors = cardColors[colorKey] || cardColors.gray;
    const initialDelay = Math.random() * 0.2;

    return (
      <motion.div
        className={`p-6 rounded-2xl shadow-xl border border-gray-100 cursor-pointer transition-all duration-300 ease-in-out
          bg-linear-to-br ${colors.bgFrom} ${colors.bgTo} 
          hover:shadow-2xl hover:scale-[1.03] transform`}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: initialDelay }}
        whileTap={{ scale: 0.98 }}
      >
        <div
          className={`w-14 h-14 ${colors.iconBg} rounded-xl flex items-center justify-center mb-4 shadow-md`}
        >
          {React.cloneElement(icon, { className: "text-white text-2xl" })}
        </div>
        <h3 className="text-sm font-semibold text-gray-500 mb-1 tracking-wider uppercase">
          {title}
        </h3>
        <p className="text-3xl font-extrabold text-gray-900 leading-none">
          {value}
        </p>
      </motion.div>
    );
  };

  const getCards = () => {
    if (role === "admin")
      return (
        <>
          <StatsCard
            icon={<FaUsers />}
            title="Total Users"
            value={stats.totalUsers}
            colorKey="emerald"
          />
          <StatsCard
            icon={<FaFileInvoice />}
            title="Total Loans"
            value={stats.totalLoans}
            colorKey="blue"
          />
          <StatsCard
            icon={<FaChartLine />}
            title="TOTAL APPLICAITON"
            value={stats.totalApplications}
            colorKey="teal"
          />
          <StatsCard
            icon={<FaClock />}
            title="PENDING APPLICATIONS"
            value={stats.pending}
            colorKey="orange"
          />
          <StatsCard
            icon={<FaCheckCircle />}
            title="APPROVED APPLICATIONS"
            value={stats.approved}
            colorKey="green"
          />
          <StatsCard
            icon={<FaTimesCircle />}
            title="REJECT APPLICAITON"
            value={stats.rejected}
            colorKey="red"
          />
        </>
      );

    if (role === "manager")
      return (
        <>
          <StatsCard
            icon={<FaFileInvoice />}
            title="TOTAL LOANS"
            value={stats.totalLoans}
            colorKey="emerald"
          />
          <StatsCard
            icon={<FaClock />}
            title="TOTAL APPLICATIONS"
            value={stats.totalLoans}
            colorKey="orange"
          />
          <StatsCard
            icon={<FaCheckCircle />}
            title="PENDING APPLICATIONS"
            value={stats.pending}
            colorKey="green"
          />
          <StatsCard
            icon={<FaTimesCircle />}
            title="APPROVED APPLICATIONS"
            value={stats.approved}
            colorKey="blue"
          />
          <StatsCard
            icon={<FaClock />}
            title="REJECT APPLICAITON"
            value={stats.rejected}
            colorKey="red"
          />
        </>
      );

    return (
      <>
        <StatsCard
          icon={<FaChartLine />}
          title="TOTAL APPLICAITON"
          value={stats.totalApplications}
          colorKey="teal"
        />
        <StatsCard
          icon={<FaClock />}
          title="PENDING APPLICATIONS"
          value={stats.pending}
          colorKey="orange"
        />
        <StatsCard
          icon={<FaCheckCircle />}
          title="APPROVED APPLICATIONS"
          value={stats.approved}
          colorKey="green"
        />
        <StatsCard
          icon={<FaTimesCircle />}
          title="REJECT APPLICAITON"
          value={stats.rejected}
          colorKey="red"
        />
      </>
    );
  };

  if (isLoading || isFetching || authLoading) {
    return (
      <div className="min-h-[500px] bg-white flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-full mx-auto min-h-screen">
      <h1
        className="text-4xl font-extrabold text-gray-800 mb-10 border-b pb-4 border-gray-200 dark:text-white"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-emerald-600">{role?.toUpperCase()}</span>{" "}
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
        {getCards()}
      </div>

      <div className="py-8">{role !== "borrower" && <AdminCharts />}</div>
    </div>
  );
};

export default DashboardStatistics;
