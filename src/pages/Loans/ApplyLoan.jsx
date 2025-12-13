import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import MyBtn from "../../components/Shared/MyBtn";
import useAuth from "../../hooks/useAuth";
import useDBUser from "../../hooks/usedbUser";
import Confetti from "react-confetti";

const ApplyLoan = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [loans, setLoans] = useState([]);
  const { user } = useAuth();
  const { dbUser } = useDBUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm();

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await axiosSecure.get("/all-loans");
        setLoans(res.data);
      } catch (error) {
        console.error("Error fetching loans:", error);
      }
    };
    fetchLoans();
  }, [axiosSecure]);

  const titleValue = watch("title");
  useEffect(() => {
    if (titleValue) {
      const loan = loans.find((loan) => loan.title === titleValue);
      if (loan) {
        setValue("interestRate", loan.interestRate);
        setValue("category", loan.category);
        setValue("loanID", loan._id);
      }
    }
  }, [titleValue, loans, setValue, watch]);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const submitData = {
        title: data.title,
        interestRate: data.interestRate,
        category: data.category,
        loanId: data.loanID,
        first_name: data.fname,
        last_name: data.lname,
        address: data.address,
        contact_no: data.contactno,
        nid_no: data.nid,
        income_source: data.incomesource,
        monthly_income: data.monthlyincome,
        loan_amount: data.loanamount,
        loan_reason: data.reason,
        notes: data.notes,
        requestBy: user?.email,
      };

      await axiosSecure.post(`/apply-loan`, submitData);
      setShowConfetti(true);
      toast.success("Applied successfully!");
      setTimeout(() => setShowConfetti(false), 10000);
      reset();
    } catch (error) {
      console.error("Apply Error:", error);
      toast.error("Failed to apply for loan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "APPLY FOR LOAN | ARTHI";
  }, []);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
            Apply for Loan
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Fill out the form below to get instant approval for your loan
            application
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Loan Title *
                </label>
                <select
                  {...register("title", { required: "Loan title is required" })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm transition-all duration-200"
                >
                  <option disabled value="">
                    Select a loan type
                  </option>
                  {loans.map((loan) => (
                    <option key={loan._id} value={loan.title}>
                      {loan.title}
                    </option>
                  ))}
                </select>
                {errors.title && (
                  <p className="mt-2 text-xs text-red-600 font-medium">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Interest Rate %
                </label>
                <input
                  {...register("interestRate", {
                    required: "Interest rate is required",
                    min: { value: 0, message: "Must be positive" },
                  })}
                  type="number"
                  step="0.01"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm transition-all duration-200 bg-slate-50"
                  readOnly
                />
                {errors.interestRate && (
                  <p className="mt-2 text-xs text-red-600 font-medium">
                    {errors.interestRate.message}
                  </p>
                )}
              </div>
            </div>

            <div className="hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Category
                  </label>
                  <input
                    {...register("category", {
                      required: "Category rate is required",
                    })}
                    type="text"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm transition-all duration-200 bg-slate-50"
                    readOnly
                  />
                  {errors.category && (
                    <p className="mt-2 text-xs text-red-600 font-medium">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Loan ID
                  </label>
                  <input
                    {...register("loanID", {
                      required: "Loan ID rate is required",
                    })}
                    type="text"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm transition-all duration-200 bg-slate-50"
                    readOnly
                  />
                  {errors.loanID && (
                    <p className="mt-2 text-xs text-red-600 font-medium">
                      {errors.loanID.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Names */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  First Name *
                </label>
                <input
                  {...register("fname", { required: "First Name is required" })}
                  type="text"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm transition-all duration-200"
                />
                {errors.fname && (
                  <p className="mt-2 text-xs text-red-600 font-medium">
                    {errors.fname.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Last Name *
                </label>
                <input
                  {...register("lname", { required: "Last Name is required" })}
                  type="text"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm transition-all duration-200"
                />
                {errors.lname && (
                  <p className="mt-2 text-xs text-red-600 font-medium">
                    {errors.lname.message}
                  </p>
                )}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Address *
              </label>
              <textarea
                {...register("address", { required: "Address is required" })}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl resize-vertical focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm transition-all duration-200"
              />
              {errors.address && (
                <p className="mt-2 text-xs text-red-600 font-medium">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Contact + NID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Contact No *
                </label>
                <input
                  {...register("contactno", {
                    required: "Contact No is required",
                  })}
                  type="text"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm transition-all duration-200"
                />
                {errors.contactno && (
                  <p className="mt-2 text-xs text-red-600 font-medium">
                    {errors.contactno.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  National ID *
                </label>
                <input
                  {...register("nid", { required: "National ID is required" })}
                  type="text"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm transition-all duration-200"
                />
                {errors.nid && (
                  <p className="mt-2 text-xs text-red-600 font-medium">
                    {errors.nid.message}
                  </p>
                )}
              </div>
            </div>

            {/* Income */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Income Source *
                </label>
                <input
                  {...register("incomesource", {
                    required: "Income Source is required",
                  })}
                  type="text"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm transition-all duration-200"
                />
                {errors.incomesource && (
                  <p className="mt-2 text-xs text-red-600 font-medium">
                    {errors.incomesource.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Monthly Income (BDT) *
                </label>
                <input
                  {...register("monthlyincome", {
                    required: "Monthly Income is required",
                    min: { value: 1, message: "Must be a positive amount" },
                  })}
                  type="number"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm transition-all duration-200"
                />
                {errors.monthlyincome && (
                  <p className="mt-2 text-xs text-red-600 font-medium">
                    {errors.monthlyincome.message}
                  </p>
                )}
              </div>
            </div>

            {/* Reason + Amount */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Reason for Loan *
                </label>
                <input
                  {...register("reason", { required: "Reason is required" })}
                  type="text"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm transition-all duration-200"
                />
                {errors.reason && (
                  <p className="mt-2 text-xs text-red-600 font-medium">
                    {errors.reason.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Loan Amount (BDT) *
                </label>
                <input
                  {...register("loanamount", {
                    required: "Loan Amount is required",
                    min: { value: 1, message: "Must be a positive amount" },
                  })}
                  type="number"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm transition-all duration-200"
                />
                {errors.loanamount && (
                  <p className="mt-2 text-xs text-red-600 font-medium">
                    {errors.loanamount.message}
                  </p>
                )}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Additional Notes
              </label>
              <textarea
                {...register("notes")}
                rows={3}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl resize-vertical focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm transition-all duration-200"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-slate-200">
              <MyBtn
                label="Reset Form"
                onClick={() => reset()}
                variant="cancel"
                size="lg"
                className="flex-1 border-none"
              />
              <MyBtn
                label={
                  loading
                    ? "Applying..."
                    : dbUser?.role !== "borrower"
                    ? "Apply (Borrower Only)"
                    : "Apply"
                }
                variant="primary"
                size="lg"
                className="flex-1"
                type="submit"
                disabled={loading || dbUser?.role !== "borrower"}
              />
            </div>
          </form>
        </div>
        
        <div style={{ textAlign: "center", padding: 20 }}>
          {showConfetti && (
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              recycle={false}
              numberOfPieces={1000}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplyLoan;
