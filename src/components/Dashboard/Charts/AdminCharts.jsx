import React, { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import Chart from "chart.js/auto";
import useAuth from "../../../hooks/useAuth";
import useDBUser from "../../../hooks/usedbUser";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const AdminCharts = () => {
  const { user, loading: authLoading } = useAuth();
  const { dbUser } = useDBUser();
  const role = dbUser?.role;
  const axiosSecure = useAxiosSecure();
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const { data: chartData = [], isLoading } = useQuery({
    queryKey: ["loanAppsByTitle", user?.email, role],
    queryFn: async () => {
      const { data } = await axiosSecure("/dashboard/admin/charts");
      return data;
    },
  });

  useEffect(() => {
    if (chartRef.current && chartData.length > 0) {
      if (chartInstance.current) chartInstance.current.destroy();

      const labels = chartData.map((item) => item.title);
      const counts = chartData.map((item) => item.count);
      const barColor = "rgba(148, 163, 184, 0.8)";
      const borderColor = "rgba(148, 163, 184, 1)";

      chartInstance.current = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Number of Applicaitons",
              data: counts,
              backgroundColor: barColor,
              borderColor: borderColor,
              borderWidth: 2,
              borderRadius: 8,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Number of Loan Applications",
              font: { size: 18, weight: "bold" },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
            x: {},
          },
        },
      });
    }
    return () => chartInstance.current?.destroy();
  }, [chartData]);

  if (isLoading || authLoading) {
    return (
      <div className="min-h-[500px] bg-white flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="w-full p-6 bg-white rounded-xl shadow-2xl">
      <div className="h-96">
        <canvas ref={chartRef}></canvas>
      </div>
      {!chartData.length && (
        <p className="text-center text-gray-500 mt-4">No Data Found</p>
      )}
    </div>
  );
};

export default AdminCharts;
