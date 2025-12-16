import React, { useEffect, useState } from "react";
import { PiRocketLaunchLight } from "react-icons/pi";
import { Link } from "react-router";
import Marquee from "react-fast-marquee";
import LoanCard from "../../pages/Loans/LoanCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import MyBtn from "../Shared/MyBtn";
import toast from "react-hot-toast";

const HomePageLoan = () => {
  const [loans, setLoans] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await axiosSecure.get("/homepage-loans");
        setLoans(res.data || []);
      } catch (error) {
        toast.error("Error fetching loans:", error);
        setLoans([]);
      }
    };
    fetchLoans();
  }, [axiosSecure]);

  return (
    <section className="my-20 container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title Section */}
      <div className="text-center mb-16">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            className="text-4xl md:text-4xl lg:text-6xl font-black mb-6 bg-linear-to-r from-slate-900 via-slate-800 to-emerald-600 bg-clip-text text-transparent dark:text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Explore <span className="text-emerald-500">Our Loans</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed dark:text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Choose from our popular loan products designed for car, home,
            education, farming, and wedding needs. Quick approval, competitive
            rates, and flexible repayment options available.
          </motion.p>
        </div>
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
          <div className="w-fit mx-auto mt-12">
            <MyBtn
              to="/all-loans"
              label="View All Loans"
              size="md"
              // icon={PiRocketLaunchLight}
            />
          </div>
        </>
      ) : (
        // Simple fallback for no loans/loading
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-200 mx-4 sm:mx-8">
          <p className="text-lg sm:text-xl text-gray-600 font-semibold mb-6">
            💰 Checking for loan products...
          </p>
          <MyBtn
            to="/apply-loan"
            label="Apply for Loan Directly"
            size="sm"
            icon={PiRocketLaunchLight}
          />
        </div>
      )}
    </section>
  );
};

export default HomePageLoan;
