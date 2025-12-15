import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Shared/LoadingSpinner";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import ApplicationDataRow from "../../TableRow/ApplicationDataRow";
import ViewApplicationModal from "../../ModalPage/ViewApplicationModal";
import CancelApplicationModal from "../../ModalPage/CancelApplicationModal";
import PayApplicaitonFeeModal from "../../ModalPage/PayApplicaitonFeeModal";
import PaymentInfoModal from "../../ModalPage/PaymentInfoModal";

const MyLoans = () => {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [isPaymentInfoOpen, setIsPaymentInfoOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const axiosSecure = useAxiosSecure();
  const { email } = useParams();

  const {
    data: loanApplications = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["loanApplications", email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/loan-applications`);
      return data;
    },
  });

  useEffect(() => {
    document.title = "MY LOANS | ARTHI";
  }, []);

  if (isLoading || isFetching) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-emerald-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-10 max-w-full mx-auto min-h-screen">
        <div>
          <h1
            className="text-4xl font-extrabold text-gray-800 mb-10 border-b pb-4 border-gray-200 dark:text-white"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-emerald-600">My</span> Loans
          </h1>
        </div>

        <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-linear-to-r from-slate-50 to-slate-100">
                <tr>
                  <th className="tbl-header">Loan ID</th>
                  <th className="tbl-header">Loan Info</th>
                  <th className="tbl-header">Amount</th>
                  <th className="tbl-header">Payment Status</th>
                  <th className="tbl-header">Status</th>
                  <th className="tbl-header">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {loanApplications.map((application) => (
                  <ApplicationDataRow
                    key={application?._id}
                    application={application}
                    refetch={refetch}
                    onOpenView={() => {
                      setSelectedApplication(application);
                      setIsViewOpen(true);
                    }}
                    onOpenCancel={() => {
                      setSelectedApplication(application);
                      setIsCancelOpen(true);
                    }}
                    onOpenPay={() => {
                      setSelectedApplication(application);
                      setIsPayOpen(true);
                    }}
                    onOpenPaymentInfo={() => {
                      setSelectedApplication(application);
                      setIsPaymentInfoOpen(true);
                    }}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {loanApplications.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-slate-100 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>

              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                No loan found
              </h3>
              <p className="text-slate-500 mb-6">
                No loan to manage at the moment.
              </p>
            </div>
          )}
        </div>
      </div>

      <PaymentInfoModal
        isOpen={isPaymentInfoOpen}
        closeModal={() => setIsPaymentInfoOpen(false)}
        application={selectedApplication}
      />

      <ViewApplicationModal
        isOpen={isViewOpen}
        closeModal={() => setIsViewOpen(false)}
        application={selectedApplication}
      />

      <CancelApplicationModal
        isOpen={isCancelOpen}
        closeModal={() => setIsCancelOpen(false)}
        refetch={refetch}
        application={selectedApplication}
      />

      <PayApplicaitonFeeModal
        isOpen={isPayOpen}
        closeModal={() => setIsPayOpen(false)}
        refetch={refetch}
        application={selectedApplication}
      />
    </>
  );
};

export default MyLoans;
