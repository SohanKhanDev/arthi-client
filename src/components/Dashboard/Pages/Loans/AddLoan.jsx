import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { imageupload } from "../../../../utils";
import MyBtn from "../../../Shared/MyBtn";

const AddLoan = () => {
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const {
      title,
      description,
      category,
      interestRate,
      maxLoanLimit,
      requiredDocuments,
      emiPlans,
      showOnHome,
      image,
    } = data;

    const imageFile = image[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    const imgURL = await imageupload(imageFile);

    const submitData = {
      title: title,
      description: description,
      category: category,
      interestRate: interestRate,
      maxLoanLimit: maxLoanLimit,
      requiredDocuments: requiredDocuments,
      emiPlans: emiPlans,
      showOnHome: showOnHome,
      image: imgURL,
    };

    try {
      const response = await axiosSecure.post("/addloans", submitData);
      if (response.status === 200 || response.status === 201) {
        toast.success("Loan added successfully!");
        reset();
      } else {
        toast.error("Failed to add loan");
      }
    } catch (error) {
      toast.error("Network error or server issue");
    }
  };

  useEffect(() => {
    document.title = "ADD LOAN | ARTHI";
  }, []);

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">
      <div>
        <h1
          className="text-4xl text-center font-extrabold text-gray-800 mb-10 border-b pb-4 border-gray-200 dark:text-white"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-emerald-600">Add</span> New Loan
        </h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-6 rounded-xl shadow-lg border border-slate-200 max-h-screen overflow-y-auto"
      >
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
            <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>
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
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Category *
            </label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
            >
              <option value="">Select</option>
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
            <label className="block text-xs font-medium text-slate-700 mb-1">
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
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Max Limit
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
            <label className="block text-xs font-medium text-slate-700 mb-1">
              EMI Plans
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
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Required Documents
          </label>
          <textarea
            {...register("requiredDocuments")}
            rows={2}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg resize-vertical focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Loan Images
          </label>

          <input
            name="image"
            type="file"
            id="image"
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-4xl file:border-0 file:text-sm file:font-semibold file:bg-[#059383] file:text-white bg-gray-100 border border-dashed border-[#059383] rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#059383] focus:border-[#059383]/10 py-2"
            {...register("image", {
              required: "Image is required",
            })}
          />
          {errors.image && (
            <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>
          )}
          <p className="mt-1 text-xs text-gray-400">
            PNG, JPG or JPEG (max 2MB)
          </p>
        </div>

        <div className="flex items-center space-x-2 pt-6">
          <input
            {...register("showOnHome")}
            id="showOnHome"
            type="checkbox"
            className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
          />
          <label
            htmlFor="showOnHome"
            className="text-xs font-medium text-slate-700"
          >
            Show on Home
          </label>
        </div>
        <MyBtn
          label="Add Loan"
          variant="[#059383]"
          size="md"
          className="w-full"
          type="submit"
        />
      </form>
    </div>
  );
};

export default AddLoan;
