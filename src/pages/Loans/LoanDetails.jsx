import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import ErrorPage from "../ErrorPage/ErrorPage";
import { ImSpinner9 } from "react-icons/im";
import useDBUser from "../../hooks/usedbUser";
import ApplyLoanModal from "./ApplyLoanModal";
import MyBtn from "../../components/Shared/MyBtn";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaHandsClapping } from "react-icons/fa6";

const LoanDetails = () => {
  const { id } = useParams();
  const { dbUser, isLoading: dbUserLoading } = useDBUser();
  const axiosSecure = useAxiosSecure();
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  const {
    data: loan = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["loan", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/loan/${id}`);
      return data;
    },
  });

  const handleApply = async () => {
    setIsApplyOpen(true);
  };

  useEffect(() => {
    document.title = `${loan.title} | ARTHI`;
  }, [loan.title]);

  if (isLoading || dbUserLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  return (
    <div className="min-h-screen  py-16 px-6">
      {/* Hero Section */}
      <div className=" mx-auto mb-16">
        <div className="group relative overflow-hidden rounded-4xl shadow-2xl bg-slate-900 text-white aspect-video lg:aspect-2/1">
          {/* Hero Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${loan.image})` }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/50 to-transparent" />

          {/* Category Badge */}
          <div className="absolute top-8 left-8 z-10">
            <span className="inline-flex items-center rounded-full bg-slate-900/80 px-4 py-2 text-sm font-bold text-emerald-400 backdrop-blur-xl border border-white/20 shadow-2xl">
              <span className="mr-2 h-2 w-2 rounded-full bg-emerald-400" />
              {loan.category?.toUpperCase()}
            </span>
          </div>

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col justify-end p-8 lg:p-12">
            <div className="max-w-lg">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 bg-linear-to-r from-white to-slate-200 bg-clip-text">
                {loan.title}
              </h1>
            </div>
            <p className="text-xl text-slate-300 mb-8 opacity-90 leading-relaxed">
              {loan.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className=" mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Loan Details */}
        <div className="space-y-8">
          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group p-8 rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-linear-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <span className="text-2xl font-bold text-white">%</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">
                    Interest Rate
                  </p>
                </div>
              </div>
              <div className="text-4xl lg:text-5xl font-black text-emerald-600">
                {loan.interestRate}%
              </div>
            </div>

            <div className="group p-8 rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-linear-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <span className="text-xl font-bold text-white">৳</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">
                    Max Limit
                  </p>
                </div>
              </div>
              <div className="text-4xl lg:text-5xl font-black text-purple-600">
                {loan.maxLoanLimit?.toLocaleString()}
              </div>
            </div>

            <div className="group p-8 rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-linear-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <span className="text-xl font-bold text-white">৳</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">
                    EMI Plan
                  </p>
                </div>
              </div>
              <div className="text-4xl lg:text-5xl font-black text-green-600">
                {loan.emiPlans} months
              </div>
            </div>
          </div>

          {/* Required Documents */}
          <div className="p-8 rounded-3xl  backdrop-blur-xl border border-slate-200/50 shadow-2xl">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <span className="w-10 h-10 bg-linear-to-r from-slate-500 to-slate-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg text-white">
                📋
              </span>
              Required Documents
            </h3>
            <div className="space-y-3 text-slate-700 leading-relaxed">
              {loan.requiredDocuments?.split("\n").map((doc, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 rounded-xl bg-white/60 hover:bg-white/80 backdrop-blur-sm border border-slate-200/50 transition-all group"
                >
                  <span className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-bold text-white text-xs">
                    ✓
                  </span>
                  <span className="text-sm">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - Apply Section */}
        <div className="lg:sticky lg:top-24 lg:h-fit space-y-6">
          {/* Quick Apply Card */}
          <div className="p-8 rounded-3xl bg-linear-to-br from-emerald-500 via-teal-600 to-emerald-700 text-white shadow-2xl border border-emerald-500/50 backdrop-blur-xl">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <span className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                🎯
              </span>
              Ready to Apply?
            </h3>
            <div className="space-y-4 mb-8 text-emerald-100">
              <div className="flex items-center text-lg">
                <span className="w-8 h-8 bg-white/30 rounded-xl flex items-center justify-center mr-4 font-bold">
                  ✓
                </span>
                Up to ৳{loan.maxLoanLimit?.toLocaleString()}
              </div>
              <div className="flex items-center text-lg">
                <span className="w-8 h-8 bg-white/30 rounded-xl flex items-center justify-center mr-4 font-bold">
                  ✓
                </span>
                {loan.interestRate}% Interest Rate
              </div>
              <div className="flex items-center text-lg">
                <span className="w-8 h-8 bg-white/30 rounded-xl flex items-center justify-center mr-4 font-bold">
                  ✓
                </span>
                {loan.emiPlans} Month EMI Plans
              </div>
            </div>

            {dbUser?.role === "borrower" ? (
              <MyBtn
                // to="/all-loans"
                onClick={handleApply}
                // disabled
                label="Apply Now"
                size="md"
                variant="cancel"
                className="w-full border-none"
                icon={FaHandsClapping}
              />
            ) : (
              <MyBtn
                // to="/all-loans"
                disabled
                label="Apply Now (Borrower Only)"
                size="md"
                variant="cancel"
                className="w-full border-none"
                icon={FaHandsClapping}
              />
            )}
          </div>

          {/* Back Button */}
          <MyBtn
            to="/all-loans"
            label="Back to Loans"
            size="md"
            variant="cancel"
            className="w-full border-none"
            icon={FaRegArrowAltCircleLeft}
          />

          <ApplyLoanModal
            isApplyOpen={isApplyOpen}
            closeModal={() => setIsApplyOpen(false)}
            loan={loan}
          />
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;
