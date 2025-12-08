import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../Shared/LoadingSpinner";
import UserDataRow from "../../TableRow/UserDataRow";
import useAuth from "../../../../hooks/useAuth";
import UpdateRoleModal from "../../ModalPage/UpdateRoleModal";
import ApproveUserModal from "../../ModalPage/ApproveUserModal";
import SuspendUserModal from "../../ModalPage/SuspendUserModal";
import LoansDataRow from "../../TableRow/LoansDataRow";
import DeleteLoanModal from "../../ModalPage/DeleteLoanModal";

const ManageLoans = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading: authLoading } = useAuth();
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);

  const {
    data: loans = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["all-loans"],
    queryFn: async () => {
      const { data } = await axiosSecure("/loans");
      return data;
    },
    enabled: !!user,
  });

  if (isLoading || isFetching || authLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-emerald-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Manage Loans
          </h1>
        </div>

        <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-linear-to-r from-slate-50 to-slate-100">
                <tr>
                  <th className="tbl-header">Photo</th>
                  <th className="tbl-header">Title</th>
                  <th className="tbl-header">Interest</th>
                  <th className="tbl-header">Category</th>
                  <th className="tbl-header">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {loans.map((loan) => (
                  <LoansDataRow
                    key={loan?._id}
                    loan={loan}
                    refetch={refetch}
                    onOpenUpdate={() => {
                      setSelectedLoan(loan);
                      setIsUpdateOpen(true);
                    }}
                    onOpenApprove={() => {
                      setSelectedLoan(loan);
                      setIsApproveOpen(true);
                    }}
                    onOpenSuspend={() => {
                      setSelectedLoan(loan);
                      setIsSuspendOpen(true);
                    }}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {loans.length === 0 && (
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
                No users found
              </h3>
              <p className="text-slate-500 mb-6">
                No users to manage at the moment.
              </p>
            </div>
          )}
        </div>
      </div>

      <UpdateRoleModal
        isOpen={isUpdateOpen}
        closeModal={() => setIsUpdateOpen(false)}
        refetch={refetch}
        loan={selectedLoan}
      />

      <DeleteLoanModal
        isOpen={isDeleteOpen}
        closeModal={() => setIsDeleteOpen(false)}
        refetch={refetch}
        loan={selectedLoan}
      />
    </>
  );
};

export default ManageLoans;
