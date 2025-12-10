// src/pages/AllLoans.jsx
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoanCard from "./LoanCard";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const AllLoans = () => {
  const axiosSecure = useAxiosSecure();

  const { data: loans = [], isLoading } = useQuery({
    queryKey: ["all-loans"],
    queryFn: async () => {
      const { data } = await axiosSecure("/loans");
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 py-10">
      <div className=" mx-auto ">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">
              Browse loan offers
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Choose from {loans.length} curated loan products.
            </p>
          </div>
        </div>

        {/* Grid of loan cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {loans.map((loan) => (
            <LoanCard key={loan._id} loan={loan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllLoans;
