import React, { useEffect, useState } from "react";

import { Link } from "react-router";
import Marquee from "react-fast-marquee";
import LoanCard from "../../pages/Loans/LoanCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const HomePageLoan = () => {
  const [loans, setLoans] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await axiosSecure.get("/homepage-loans");
        setLoans(res.data || []);
      } catch (error) {
        console.error("Error fetching loans:", error);
        setLoans([]);
      }
    };
    fetchLoans();
  }, [axiosSecure]);
  console.log(loans);

  return (
    <section className="my-20 container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title Section */}
      <div className="text-center mb-16">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-primary">Explore </span>
          <span className="text-secondary">Our Loans</span>
        </motion.h2>
        <motion.p
          className="text-xl text-slate-600 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Choose from our popular loan products designed for car, home,
          education, farming, and wedding needs. Quick approval, competitive
          rates, and flexible repayment options available.
        </motion.p>
      </div>

      {/* ----------*** :: LOANS CONTENT :: ***---------- */}
      {loans.length > 0 ? (
        <>
          {/* Mobile Grid (Hidden on large screens for Marquee) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 lg:hidden gap-6 mb-12">
            {loans.slice(0, 6).map((loan) => (
              <LoanCard key={loan._id} loan={loan} />
            ))}
          </div>

          <div className="hidden lg:block mb-16">
            <Marquee speed={50} pauseOnHover gradient={false}>
              <div className="flex gap-6">
                {loans.map((loan) => (
                  <div
                    key={loan._id}
                    className="w-[380px] lg:w-[420px] xl:w-[450px] shrink-0"
                  >
                    <LoanCard loan={loan} />
                  </div>
                ))}
              </div>
            </Marquee>
          </div>

          {/* View All Button */}
          <div className="flex justify-center mt-12">
            <Link
              to="/all-loans"
              className="inline-block bg-primary text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:opacity-90 transition-all duration-300"
            >
              View All Loans
            </Link>
          </div>
        </>
      ) : (
        // Simple fallback for no loans/loading
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-200 mx-4 sm:mx-8">
          <p className="text-lg sm:text-xl text-gray-600 font-semibold mb-6">
            💰 Checking for loan products...
          </p>
          <Link
            to="/loan-application"
            className="inline-block bg-primary text-white px-10 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all duration-300 shadow-lg"
          >
            Apply for Loan Directly
          </Link>
        </div>
      )}
    </section>
  );
};

export default HomePageLoan;
