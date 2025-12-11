import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoanCard from "./LoanCard";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

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
    <section className="min-h-screen py-10">
      <div className="mx-auto max-w-7xl px-4">
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

        {/* Animated grid container */}
        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {loans.map((loan) => (
            <motion.div key={loan._id} variants={itemVariants}>
              <LoanCard loan={loan} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AllLoans;
