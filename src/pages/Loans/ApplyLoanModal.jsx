import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Dialog } from "@headlessui/react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import MyBtn from "../../components/Shared/MyBtn";
import { FaHandsClapping } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
import Confetti from "react-confetti";

const ApplyLoanModal = ({ isApplyOpen, closeModal, loan }) => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [showConfetti, setShowConfetti] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    if (isApplyOpen && loan) {
      setValue("title", loan.title);
      setValue("interestRate", loan.interestRate);
    }
  }, [isApplyOpen, loan, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const submitData = {
        title: data.title,
        interestRate: data.interestRate,
        category: loan?.category,
        loanId: loan?._id,
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

      setTimeout(() => {
        setShowConfetti(false);
        toast.success("Applied successfully!");
        closeModal();
        reset();
      }, 5000);
    } catch (error) {
      console.error("Apply Error:", error);
      toast.error("Failed to apply for loan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isApplyOpen} onClose={closeModal} className="relative z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="p-8 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
                <FaHandsClapping size={20} color="#10b981" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Apply for Loan
                </h2>
              </div>
            </div>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Loan Title *
                </label>
                <input
                  {...register("title", { required: "Loan title is required" })}
                  type="text"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                  disabled
                />
                {errors.title && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Interest Rate %
                </label>
                <input
                  {...register("interestRate", {
                    required: "Interest rate is required",
                    min: { value: 0, message: "Must be positive" },
                  })}
                  type="number"
                  step="0.01"
                  className="w-full  px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                  disabled
                />
                {errors.interestRate && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.interestRate.message}
                  </p>
                )}
              </div>
            </div>

            {/* first name + last name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  First Name *
                </label>
                <input
                  {...register("fname", {
                    required: "First Name is required",
                  })}
                  type="text"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
                {errors.fname && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.fname.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Last Name *
                </label>
                <input
                  {...register("lname", {
                    required: "Last Name is required",
                  })}
                  type="text"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
                {errors.lname && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.lname.message}
                  </p>
                )}
              </div>
            </div>

            {/* address */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Address *
              </label>
              <textarea
                {...register("address", {
                  required: "Address is required",
                })}
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg resize-vertical focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
              {errors.address && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* contact number + national id */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Contact No *
                </label>
                <input
                  {...register("contactno", {
                    required: "Contact No is required",
                  })}
                  type="text"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
                {errors.contactno && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.contactno.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  National ID *
                </label>
                <input
                  {...register("nid", {
                    required: "National ID is required",
                  })}
                  type="text"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
                {errors.nid && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.nid.message}
                  </p>
                )}
              </div>
            </div>

            {/* income source + monthly income */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Income Source *
                </label>
                <input
                  {...register("incomesource", {
                    required: "Income Source is required",
                  })}
                  type="text"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
                {errors.incomesource && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.incomesource.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Monthly Income *
                </label>
                <input
                  {...register("monthlyincome", {
                    required: "Monthly Income is required",
                    min: { value: 1, message: "Must be a positive amount" },
                  })}
                  type="number"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
                {errors.monthlyincome && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.monthlyincome.message}
                  </p>
                )}
              </div>
            </div>

            {/* loan amount + reason for Loan */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Reason for Loan *
                </label>
                <input
                  {...register("reason")}
                  type="text"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
                {errors.reason && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.reason.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Loan Amount * (Max: Tk. {loan?.maxLoanLimit.toLocaleString()})
                </label>
                <input
                  {...register("loanamount", {
                    required: "Loan Amount is required",
                    min: { value: 1, message: "Must be a positive amount" },
                    max: {
                      value: loan?.maxLoanLimit,
                      message: `Loan amount cannot exceed $${loan?.maxLoanLimit.toLocaleString()}`,
                    },
                  })}
                  type="number"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
                {errors.loanamount && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.loanamount.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Notes
              </label>
              <textarea
                {...register("notes")}
                rows={2}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg resize-vertical focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
            </div>
            {/* Footer */}
            <div className="pt-6 border-t border-slate-200 flex justify-end gap-3">
              <MyBtn
                onClick={() => closeModal()}
                label={"Cancel"}
                variant="cancel"
                size="md"
                className="flex-1 border-none"
                // type="submit"
              />

              <MyBtn
                label={loading ? "Appling..." : "Apply"}
                variant="primary"
                size="md"
                className="flex-1"
                type="submit"
                disabled={loading}
              />
            </div>
          </form>
        </Dialog.Panel>
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
    </Dialog>
  );
};

export default ApplyLoanModal;
