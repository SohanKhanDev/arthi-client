import React, { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { MdCancel } from "react-icons/md";
import MyBtn from "../../Shared/MyBtn";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const PaymentInfoModal = ({ isOpen, closeModal, application }) => {
  const [paymentData, setPaymentData] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      try {
        const res = await axiosSecure.get(`/payment-info/${application?._id}`);
        setPaymentData(res.data);
      } catch (error) {
        toast.error("Error fetching payments data:", error);
      }
    };
    fetchPaymentInfo();
  }, [application?._id, axiosSecure]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-y-auto">
          {/* Header */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-slate-900 text-center">
              Payment Receipt
            </h2>

            {paymentData && (
              <p className="text-green-600 text-center mt-2 font-semibold">
                ✓ Payment Completed
              </p>
            )}
          </div>

          {/* Body */}
          <div className="p-6 text-slate-700">
            {paymentData ? (
              <div className="space-y-4">
                {/* Line Item */}
                <div className="space-y-3 bg-slate-50 rounded-xl p-5 border border-slate-200">
                  {[
                    ["Transaction ID", paymentData.transactionId],
                    ["Application ID", paymentData.applicationID],
                    ["Amount", `$ ${paymentData.amount || 0}`],
                    ["Status", paymentData.status],
                    ["Customer", paymentData.customer],
                    ["Payment Date", formatDate(paymentData.paymentDate)],
                    ["Payment ID", paymentData._id],
                  ].map(([label, value], idx) => (
                    <div
                      key={idx}
                      className="flex justify-between text-sm border-b last:border-none pb-2 last:pb-0"
                    >
                      <span className="text-slate-500">{label}</span>
                      <span className="font-medium text-right break-all">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-500 mb-2">
                  No payment information found
                </p>
                <p className="text-xs text-slate-400">
                  Fee may not have been paid yet
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-slate-50 border-t flex justify-end">
            <MyBtn
              label={"Close"}
              icon={MdCancel}
              variant="outline"
              size="md"
              onClick={closeModal}
              className="border-slate-300 hover:bg-slate-100"
            />
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default PaymentInfoModal;
