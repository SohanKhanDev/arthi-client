import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../Shared/LoadingSpinner";
import useAuth from "../../../../hooks/useAuth";
import LoansDataRow from "../../TableRow/LoansDataRow";
import DeleteLoanModal from "../../ModalPage/DeleteLoanModal";
import EditLoanModal from "../../ModalPage/EditLoanModal";

const ManageLoans = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading: authLoading } = useAuth();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredLoans = loans.filter(
    (loan) =>
      !searchTerm.trim() ||
      loan.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <p className="text-slate-600">
            View, edit, and manage all loan products
          </p>
        </div>

        {/* Search Input */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by title or category..."
              className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-slate-900 placeholder-slate-400 min-w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {searchTerm && (
            <p className="text-sm text-slate-500 mt-1">
              Showing {filteredLoans.length} of {loans.length} loans
            </p>
          )}
        </div>

        <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-linear-to-r from-slate-50 to-slate-100">
                <tr>
                  <th className="tbl-header">Photo</th>
                  <th className="tbl-header">Title</th>
                  <th className="tbl-header">Interest Rate</th>
                  <th className="tbl-header">Max Limit</th>
                  <th className="tbl-header">Category</th>
                  <th className="tbl-header">Home Page</th>
                  <th className="tbl-header">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredLoans.map((loan) => (
                  <LoansDataRow
                    key={loan?._id}
                    loan={loan}
                    refetch={refetch}
                    onOpenDelete={() => {
                      setSelectedLoan(loan);
                      setIsDeleteOpen(true);
                    }}
                    onEditOpen={() => {
                      setSelectedLoan(loan);
                      setIsEditOpen(true);
                    }}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {filteredLoans.length === 0 && (
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
                {searchTerm ? "No matching loans found" : "No loans found"}
              </h3>
              <p className="text-slate-500 mb-6">
                {searchTerm
                  ? `No loans match "${searchTerm}". Try different keywords.`
                  : "No loans to manage at the moment."}
              </p>
            </div>
          )}
        </div>
      </div>

      <EditLoanModal
        isOpen={isEditOpen}
        closeModal={() => setIsEditOpen(false)}
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
