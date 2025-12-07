import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { MdBlock, MdCancel } from "react-icons/md";
import MyBtn from "../../Shared/MyBtn";

const SuspendUserModal = ({ isOpen, closeModal, refetch, user }) => {
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues: {
      reason: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      await axiosSecure.patch(`/users/suspend/${user?._id}`, {
        suspendReason: data.reason,
      });
      toast.success("User suspended successfully!");
      refetch();
    } catch {
      toast.error("Failed to suspend user");
    } finally {
      closeModal();
      reset();
    }
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50"
      onClose={closeModal}
    >
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="max-w-md w-full rounded-2xl bg-gradient-to-br from-white to-slate-50 p-8 shadow-2xl ring-1 ring-black/10 transition-all duration-300">
          {/* Warning Icon Header */}
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-lg">
            <MdBlock className="w-10 h-10 text-white" />
          </div>

          {/* Title */}
          <DialogTitle className="text-2xl font-bold text-slate-900 text-center mb-2">
            Suspend User
          </DialogTitle>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Description */}
            <div className="text-center mb-6 px-4 space-y-2">
              <p className="text-slate-700 font-semibold leading-relaxed">
                Are you sure you want to suspend{" "}
                <strong className="text-slate-900">{user?.name}</strong>?
              </p>
              <p className="text-sm text-orange-700 bg-orange-50 border border-orange-200 rounded-lg px-4 py-2">
                They will lose access until reactivated.
              </p>
            </div>

            {/* Reason Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Suspension Reason <span className="text-orange-500">*</span>
              </label>
              <textarea
                {...register("reason", {
                  required: "Please provide a suspension reason",
                  minLength: {
                    value: 10,
                    message: "Reason must be at least 10 characters",
                  },
                  maxLength: {
                    value: 500,
                    message: "Reason cannot exceed 500 characters",
                  },
                })}
                rows={4}
                placeholder="Enter the reason for suspending this user (e.g., policy violation, suspicious activity, etc.)"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-vertical bg-slate-50/50 text-slate-900 transition-all duration-200"
              />
              {errors.reason && (
                <p className="text-orange-500 text-sm mt-2 font-medium">
                  {errors.reason.message}
                </p>
              )}
              <p className="text-xs text-slate-500 mt-1">
                {errors.reason
                  ? 0
                  : 500 - (register("reason").value?.length || 0)}{" "}
                characters remaining
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <MyBtn
                label="Cancel"
                icon={MdCancel}
                variant="outline"
                size="md"
                className="flex-1 border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-sm"
                onClick={closeModal}
              />
              <MyBtn
                label="Suspend User"
                variant="destructive"
                size="md"
                type="submit"
                disabled={!isValid}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default SuspendUserModal;
