import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Dialog } from "@headlessui/react";
import { toast } from "react-hot-toast";
import { RiEdit2Fill } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { imageupload } from "../../../utils";
import MyBtn from "../../Shared/MyBtn";

const EditLoanModal = ({ isOpen, closeModal, loan, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    if (isOpen && loan) {
      setValue("title", loan.title);
      setValue("description", loan.description);
      setValue("category", loan.category);
      setValue("interestRate", loan.interestRate);
      setValue("maxLoanLimit", loan.maxLoanLimit);
      setValue("emiPlans", loan.emiPlans);
      setValue("requiredDocuments", loan.requiredDocuments);
      setValue("showOnHome", loan.showOnHome);
    }
  }, [isOpen, loan, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let imgURL = loan.image;
      if (data.image && data.image[0]) {
        const imageFile = data.image[0];
        imgURL = await imageupload(imageFile);
      }

      const submitData = {
        title: data.title,
        description: data.description,
        category: data.category,
        interestRate: data.interestRate,
        maxLoanLimit: data.maxLoanLimit,
        requiredDocuments: data.requiredDocuments,
        emiPlans: data.emiPlans,
        showOnHome: data.showOnHome,
        image: imgURL,
      };

      await axiosSecure.patch(`/loans/${loan._id}`, submitData);

      toast.success("Loan updated successfully!");
      refetch();
      closeModal();
      reset();
    } catch (error) {
      toast.error("Failed to update loan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
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
                <RiEdit2Fill size={20} color="#10b981" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Edit Loan</h2>
                <p className="text-slate-500 text-sm">
                  Update loan information
                </p>
              </div>
            </div>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Loan Title *
              </label>
              <input
                {...register("title", { required: "Loan title is required" })}
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
              {errors.title && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Description *
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg resize-vertical focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
              {errors.description && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Category *
                </label>
                <select
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                >
                  <option value="">Select Category</option>
                  <option value="personal">Personal</option>
                  <option value="business">Business</option>
                  <option value="home">Home</option>
                  <option value="education">Education</option>
                  <option value="auto">Auto</option>
                </select>
                {errors.category && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.category.message}
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
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
                {errors.interestRate && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.interestRate.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Max Loan Limit *
                </label>
                <input
                  {...register("maxLoanLimit", {
                    required: "Max loan limit is required",
                    min: { value: 0, message: "Must be positive" },
                  })}
                  type="number"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
                {errors.maxLoanLimit && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.maxLoanLimit.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  EMI Plans *
                </label>
                <input
                  {...register("emiPlans", {
                    required: "EMI Plan is required",
                    min: { value: 0, message: "Must be positive" },
                  })}
                  type="number"
                  step="1"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
                {errors.emiPlans && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.emiPlans.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Required Documents
              </label>
              <textarea
                {...register("requiredDocuments")}
                rows={2}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg resize-vertical focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Loan Image (Optional - leave empty to keep current)
              </label>
              <input
                name="image"
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-500 file:text-white bg-gray-50 border border-dashed border-emerald-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
                {...register("image")}
              />
              {loan?.image && (
                <div className="mt-2 p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-slate-600">Current image:</p>
                  <img
                    src={loan.image}
                    alt="Current"
                    className="w-20 h-20 object-cover rounded mt-1"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <input
                {...register("showOnHome")}
                id="showOnHome"
                type="checkbox"
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <label
                htmlFor="showOnHome"
                className="text-sm font-medium text-slate-700"
              >
                Show on Home Page
              </label>
            </div>

            {/* Footer */}
            <div className="pt-6 border-t border-slate-200 flex justify-end gap-3">
              <MyBtn
                label="Cancel"
                icon={MdCancel}
                variant="outline"
                size="md"
                className="flex-1 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                onClick={closeModal}
                disabled={loading}
              />
              <MyBtn
                label={loading ? "Updating..." : "Update Loan"}
                variant="primary"
                size="md"
                className="flex-1"
                type="submit"
                disabled={loading}
              />
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditLoanModal;
