import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import UpdateRoleModal from "../ModalPage/UpdateRoleModal";
import SuspendUserModal from "../ModalPage/SuspendUserModal";
import UserDataRow from "../TableRow/UserDataRow";
import useAuth from "../../../hooks/useAuth";
import ApproveUserModal from "../ModalPage/ApproveUserModal";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading: authLoading } = useAuth();
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isSuspendOpen, setIsSuspendOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const {
    data: appUsers = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const { data } = await axiosSecure("/users");
      return data;
    },
    enabled: !!user,
  });

  useEffect(() => {
    document.title = "MANAGE USER | ARTHI";
  }, []);

  const filteredUsers = appUsers.filter((user) => {
    const matchesSearch =
      !searchTerm.trim() ||
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      user.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
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
          <h1 className="text-3xl font-bold text-slate-900 mb-2 dark:text-white">
            Manage Users
          </h1>
        </div>

        <div className="mb-6 flex flex-col lg:flex-row gap-4 items-end">
          {/* Search Input */}
          <div className="flex-1 relative min-w-[300px]">
            <input
              type="text"
              placeholder="Search by name or role..."
              className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-slate-900 placeholder-slate-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2 bg-white/80 backdrop-blur-xl p-2 rounded-2xl border border-slate-200 shadow-lg">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                statusFilter === "all"
                  ? "bg-emerald-500 text-white shadow-md"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter("approved")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                statusFilter === "approved"
                  ? "bg-emerald-500 text-white shadow-md"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              Approved
            </button>
            <button
              onClick={() => setStatusFilter("pending")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                statusFilter === "pending"
                  ? "bg-amber-500 text-white shadow-md"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setStatusFilter("suspended")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                statusFilter === "suspended"
                  ? "bg-red-500 text-white shadow-md"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              Suspended
            </button>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-linear-to-r from-slate-50 to-slate-100">
                <tr>
                  <th className="tbl-header">Photo</th>
                  <th className="tbl-header">Name</th>
                  <th className="tbl-header">Email</th>
                  <th className="tbl-header">Role</th>
                  <th className="tbl-header">Status</th>
                  <th className="tbl-header">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredUsers.map((user) => (
                  <UserDataRow
                    key={user?._id}
                    user={user}
                    refetch={refetch}
                    onOpenUpdate={() => {
                      setSelectedUser(user);
                      setIsUpdateOpen(true);
                    }}
                    onOpenApprove={() => {
                      setSelectedUser(user);
                      setIsApproveOpen(true);
                    }}
                    onOpenSuspend={() => {
                      setSelectedUser(user);
                      setIsSuspendOpen(true);
                    }}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {appUsers.length === 0 && (
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
        user={selectedUser}
      />

      <ApproveUserModal
        isOpen={isApproveOpen}
        closeModal={() => setIsApproveOpen(false)}
        refetch={refetch}
        user={selectedUser}
      />

      <SuspendUserModal
        isOpen={isSuspendOpen}
        closeModal={() => setIsSuspendOpen(false)}
        refetch={refetch}
        user={selectedUser}
      />
    </>
  );
};

export default ManageUser;
