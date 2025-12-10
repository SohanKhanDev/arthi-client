import React, { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import MyBtn from "../../Shared/MyBtn";
import { MdCancel } from "react-icons/md";
import { ImBin } from "react-icons/im";
import toast from "react-hot-toast";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const RejectApplicationModal = ({
  isOpen,
  closeModal,
  application,
  refetch,
}) => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const handleRejectApplication = async () => {
    setLoading(true);
    const statusData = { status: "rejected" };
    try {
      await axiosSecure.patch(`/application/${application._id}`, statusData);
      refetch();
      closeModal();
      toast.success("Application rejected successfully");
    } catch {
      toast.error("Error rejecting application");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-emerald-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="p-8 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
                <ImBin size={20} color="#ff0000" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Reject Application
                </h2>
                <p className="text-slate-500 text-sm">
                  This action cannot be undone.
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-8">
            <p className="text-slate-600 leading-relaxed">
              Are you sure you want to reject{" "}
              <strong>"{application?.title}"</strong>? This action will update
              the application status to rejected.
            </p>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
            <MyBtn
              label="Cancel"
              //   icon={MdCancel}
              variant="outline"
              size="md"
              className="flex-1 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              onClick={closeModal}
            />
            <MyBtn
              label="Confirm"
              icon={MdCancel}
              variant="danger"
              size="md"
              disabled={loading}
              onClick={handleRejectApplication}
            />
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default RejectApplicationModal;
