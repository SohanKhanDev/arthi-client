import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import {
  MdAdminPanelSettings,
  MdPerson,
  MdBusinessCenter,
  MdCancel,
} from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import MyBtn from "../../Shared/MyBtn";

const UpdateRoleModal = ({ isOpen, closeModal, refetch, user }) => {
  const axiosSecure = useAxiosSecure();

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm({
    defaultValues: { role: "" },
    mode: "onChange",
  });

  useEffect(() => {
    if (user?.role) {
      reset({ role: user.role });
    }
  }, [user?.role, reset]);

  const onSubmit = async (data) => {
    try {
      await axiosSecure.patch(`/update-role`, {
        email: user?.email,
        role: data.role,
      });
      toast.success("Role updated successfully!");
      refetch();
    } catch {
      toast.error("Failed to update role");
    } finally {
      closeModal();
    }
  };

  const roleOptions = [
    {
      value: "borrower",
      label: "Borrower",
      icon: MdPerson,
      color: "from-blue-500 to-blue-600",
    },
    {
      value: "manager",
      label: "Manager",
      icon: MdBusinessCenter,
      color: "from-emerald-500 to-emerald-600",
    },
  ];

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50"
      onClose={closeModal}
    >
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="max-w-md w-full rounded-2xl bg-linear-to-br from-white to-slate-50 p-8 shadow-2xl ring-1 ring-black/10 transition-all duration-300">
          {/* Header */}
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-linear-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg">
            <MdAdminPanelSettings className="w-8 h-8 text-white" />
          </div>

          <DialogTitle className="text-2xl font-bold text-slate-900 text-center mb-2">
            Update Role
          </DialogTitle>

          <p className="text-slate-600 text-center mb-8 px-4 leading-relaxed">
            Select a new role for{" "}
            <strong className="text-slate-900">{user?.name}</strong>
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-4 text-center">
                Choose Role
              </label>

              <Controller
                name="role"
                control={control}
                rules={{ required: "Please select a role" }}
                render={({ field, fieldState: { error } }) => (
                  <div className="space-y-3">
                    {roleOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => field.onChange(option.value)}
                        className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                          field.value === option.value
                            ? `bg-linear-to-r ${option.color} border-transparent text-white shadow-lg`
                            : "border-slate-200 bg-slate-50 hover:border-slate-300 text-slate-900"
                        }`}
                      >
                        <option.icon className="w-5 h-5 shrink-0" />
                        <span className="font-medium">{option.label}</span>
                      </button>
                    ))}
                    {error && (
                      <p className="text-red-500 text-sm text-center font-medium">
                        {error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <MyBtn
                label="Cancel"
                icon={MdCancel}
                variant="outline"
                size="md"
                className="flex-1 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                onClick={closeModal}
              />
              <MyBtn
                label="Update Role"
                variant="primary"
                size="md"
                disabled={!isValid}
                className="flex-1 bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-50"
                type="submit"
              />
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default UpdateRoleModal;
