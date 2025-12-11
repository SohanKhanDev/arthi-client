import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoanCard from "./LoanCard";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import toast from "react-hot-toast";

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
  const [loans, setLoans] = useState([]);
  const [totalLoans, setTotalLoans] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const limit = 6;

  useEffect(() => {
    const skip = currentPage * limit;
    const fetchLoans = async () => {
      try {
        setLoading(true);
        const { data } = await axiosSecure(
          `/loans?limit=${limit}&skip=${skip}`
        );
        setLoans(data.result || []);
        setTotalLoans(data.total || 0);
        setTotalPages(Math.ceil((data.total || 0) / limit));
      } catch (error) {
        toast.error("Error:", error);
        setLoans([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLoans();
  }, [axiosSecure, currentPage, limit]);

  console.log({ totalLoans, totalPages, loans });

  useEffect(() => {
    document.title = "ALL LOANS | ARTHI";
  }, []);

  if (loading) {
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
            <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
              Browse loan offers
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Choose from {totalLoans} curated loan products.
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

      {/* Pagination */}
      <div className="flex justify-center flex-wrap gap-3 py-5">
        {currentPage > 0 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="btn"
          >
            Prev
          </button>
        )}

        {[...Array(totalPages).keys()].map((i) => (
          <button
            onClick={() => setCurrentPage(i)}
            className={`btn ${i === currentPage && "btn-secondary"}`}
          >
            {i}
          </button>
        ))}

        {currentPage < totalPages - 1 && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="btn"
          >
            Next
          </button>
        )}
      </div>
    </section>
  );
};

export default AllLoans;
