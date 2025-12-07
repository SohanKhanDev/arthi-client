import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { MdBlock, MdCancel } from "react-icons/md";
import MyBtn from "../../Shared/MyBtn";

const SuspendUserModal = ({ isOpen, closeModal, refetch, user }) => {
  const axiosSecure = useAxiosSecure();

  const handleSuspend = async () => {
    try {
      await axiosSecure.patch(`/users/suspend/${user?._id}`);
      toast.success("User suspended successfully!");
      refetch();
    } catch {
      toast.error("Failed to suspend user");
    } finally {
      closeModal();
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
        <DialogPanel className="max-w-sm w-full rounded-2xl bg-gradient-to-br from-white to-slate-50 p-8 shadow-2xl ring-1 ring-black/10 transition-all duration-300">
          {/* Warning Icon Header */}
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-lg">
            <MdBlock className="w-10 h-10 text-white" />
          </div>

          {/* Title */}
          <DialogTitle className="text-2xl font-bold text-slate-900 text-center mb-2">
            Suspend User
          </DialogTitle>

          {/* Description */}
          <div className="text-center mb-8 px-4 space-y-2">
            <p className="text-slate-700 font-semibold leading-relaxed">
              Are you sure you want to suspend{" "}
              <strong className="text-slate-900">{user?.name}</strong>?
            </p>
            <p className="text-sm text-orange-700 bg-orange-50 border border-orange-200 rounded-lg px-4 py-2">
              They will lose access to all features until reactivated.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
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
              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl active:scale-95"
              onClick={handleSuspend}
            />
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default SuspendUserModal;
