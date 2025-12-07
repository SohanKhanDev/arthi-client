import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import MyBtn from "../../Shared/MyBtn";

const ApproveUserModal = ({ isOpen, closeModal, refetch, user }) => {
  const axiosSecure = useAxiosSecure();

  const handleApprove = async () => {
    try {
      await axiosSecure.patch(`/users/approve/${user?._id}`);
      toast.success("User approved successfully!");
      refetch();
    } catch {
      toast.error("Failed to approve user");
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
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="max-w-sm w-full rounded-2xl bg-linear-to-br from-white to-slate-50 p-8 shadow-2xl ring-1 ring-black/10 transition-all duration-300">
          {/* Icon Header */}
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-2xl">
            <MdCheckCircle className="w-10 h-10 text-blue-600" />
          </div>

          {/* Title */}
          <DialogTitle className="text-2xl font-bold text-slate-900 text-center mb-2">
            Approve User
          </DialogTitle>

          {/* Subtitle */}
          <p className="text-slate-600 text-center mb-8 px-4 leading-relaxed">
            Are you sure you want to approve{" "}
            <strong className="text-slate-900 font-semibold">
              {user?.name}
            </strong>
            ?
            <br />
            <span className="text-sm text-slate-500">
              This action cannot be undone.
            </span>
          </p>

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
              label="Approve"
              variant="primary"
              size="md"
              className="flex-1 bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-50"
              type="submit"
              onClick={handleApprove}
            />
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ApproveUserModal;
