import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import ReportBtn from "../../Shared/ReportBtn";
import { FiEdit } from "react-icons/fi";
import useDBUser from "../../../hooks/usedbUser";
import { TbHome2 } from "react-icons/tb";
import { TbHomeOff } from "react-icons/tb";

const LoansDataRow = ({ loan, onOpenDelete, onEditOpen, onToggleHome }) => {
  const { dbUser } = useDBUser();

  return (
    <tr className="hover:bg-slate-50/50 transition-colors group">
      {/* Photo */}
      <td className="px-6 py-4 whitespace-nowrap">
        <img
          className="h-13 w-13 rounded-4xl object-cover shadow-sm ring-1 ring-slate-200"
          src={loan?.image || "/default-loan.png"}
          alt={loan?.title}
          onError={(e) => {
            e.target.src = "/default-loan.png";
          }}
        />
      </td>

      {/* Title */}
      <td className="px-6 py-4 text-center">
        <div className="text-sm font-semibold text-slate-900 max-w-xs">
          {loan?.title}
        </div>
      </td>

      {/* Interest Rate */}
      <td className="px-6 py-4 text-center">
        <div className="text-sm font-semibold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full inline-flex items-center gap-1">
          {loan?.interestRate}%
        </div>
      </td>

      {/* Max Loan Limit */}
      <td className="px-6 py-4 text-center">
        <div className="text-sm font-medium text-slate-900">
          Tk. {loan?.maxLoanLimit?.toLocaleString() || "N/A"}
        </div>
      </td>

      {/* Category Badge */}
      <td className="px-6 py-4 text-center">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${
            loan?.category === "home"
              ? "bg-linear-to-r from-purple-500 to-pink-500 text-white shadow-lg"
              : loan?.category === "personal"
              ? "bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
              : loan?.category === "auto"
              ? "bg-linear-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
              : loan?.category === "business"
              ? "bg-linear-to-r from-orange-500 to-red-500 text-white shadow-lg"
              : "bg-slate-100 text-slate-800"
          }`}
        >
          {loan?.category?.toUpperCase()}
        </span>
      </td>

      {/* Home Page Toggle Display */}
      <td className="px-6 py-4 text-center">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            loan?.showOnHome
              ? "bg-emerald-100 text-emerald-800"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {loan?.showOnHome ? "Yes" : "No"}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 text-center">
        <div className="flex items-center justify-center gap-2  group-hover:opacity-100 transition-all duration-200">
          <ReportBtn
            onClick={onEditOpen}
            icon={FiEdit}
            color="green"
            title="Edit"
            // children="Delete"
          />

          <ReportBtn
            onClick={onOpenDelete}
            icon={RiDeleteBin5Line}
            color="red"
            title="Delete"
            // children="Delete"
          />

          {dbUser.role === "admin" && (
            <ReportBtn
              onClick={() => onToggleHome(loan._id, !loan.showOnHome)}
              icon={loan.showOnHome ? TbHome2 : TbHomeOff}
              color={loan.showOnHome ? "green" : "blue"}
              title={loan.showOnHome ? "Remove from Home" : "Add to Home"}
            />
          )}
        </div>
      </td>
    </tr>
  );
};

export default LoansDataRow;
