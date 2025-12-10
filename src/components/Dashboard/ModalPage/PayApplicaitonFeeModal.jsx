import React, { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import MyBtn from "../../Shared/MyBtn";
import { MdAttachMoney, MdCancel } from "react-icons/md";

import LoadingSpinner from "../../Shared/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";

const PayApplicationFeeModal = ({ isOpen, closeModal, application }) => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handlePayFee = async () => {
    setLoading(true);

    const paymentInfo = {
      applicationID: application?._id,
      applicant: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
    };

    const { data } = await axiosSecure.post(`/application-fee`, paymentInfo);

    window.location.href = data?.url;
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
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="p-8 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                <MdAttachMoney size={24} color="#059669" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Pay Application Fee
                </h2>
                <p className="text-slate-500 text-sm">
                  Complete payment to proceed with your application.
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-8 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-1">
                Application Information
              </h3>
              <p className="text-slate-600">
                Title: <strong>{application?.title}</strong>
              </p>
            </div>

            <div className="border-t border-slate-200 pt-4">
              <h3 className="text-lg font-semibold text-slate-800 mb-1">
                Application Fee
              </h3>
              <p className="text-slate-600 text-xl font-bold">$10.00</p>
            </div>

            <p className="text-slate-600 leading-relaxed mt-4">
              Do you want to pay the application fee now?
            </p>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
            <MyBtn
              label="Cancel"
              variant="outline"
              size="md"
              className="flex-1 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              onClick={closeModal}
              disabled={loading}
            />
            <MyBtn
              label={loading ? "Paying..." : "Pay"}
              icon={MdAttachMoney}
              variant="primary"
              size="md"
              disabled={loading}
              onClick={handlePayFee}
            />
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default PayApplicationFeeModal;
