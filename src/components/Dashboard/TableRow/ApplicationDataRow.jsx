import React from "react";
import ReportBtn from "../../Shared/ReportBtn";
import { FaEye } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";
import { LuBadgeDollarSign } from "react-icons/lu";

const ApplicationDataRow = ({ application, onOpenView }) => {
  return (
    <tr className="hover:bg-slate-50/50 transition-colors group">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-center font-semibold text-slate-900 max-w-xs">
          {application?._id}
        </div>
      </td>

      {/* Title */}
      <td className="px-6 py-4 text-center">
        <div className="text-sm font-semibold text-slate-900 max-w-xs">
          {application?.title}
        </div>
        <div className="text-xs text-slate-500 mt-1">
          Rate: {application?.interestRate}%
        </div>
      </td>

      {/* Max Loan Limit */}
      <td className="px-6 py-4 text-center">
        <div className="text-sm font-medium text-slate-900">
          Tk. {application?.loan_amount}
        </div>
      </td>

      {/* Category Badge */}
      <td className="px-6 py-4 text-center">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${
            application?.fee_status === "paid"
              ? "bg-linear-to-r from-purple-500 to-pink-500 text-white shadow-lg"
              : application?.category === "unpaid"
              ? "bg-linear-to-r from-orange-500 to-red-500 text-white shadow-lg"
              : "bg-slate-100 text-slate-800"
          }`}
        >
          {application?.fee_status?.toUpperCase()}
        </span>
      </td>

      {/* Category Badge */}
      <td className="px-6 py-4 text-center">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold inline-block 
      transition duration-300 ease-in-out ${
        application?.status === "approved"
          ? "bg-linear-to-r from-green-400 to-green-500 text-white shadow-md"
          : application?.status === "pending"
          ? "bg-linear-to-r from-red-400 to-red-500 text-white shadow-md"
          : "bg-slate-100 text-slate-800"
      }`}
        >
          {application?.status?.toUpperCase()}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 text-center">
        <div className="flex items-center justify-center gap-2  group-hover:opacity-100 transition-all duration-200">
          {application?.status === "pending" && (
            <div>
              <ReportBtn
                onClick={onOpenView}
                icon={FaEye}
                color="green"
                title="Edit"
                // children="Delete"
              />
            </div>
          )}
          {/* <ReportBtn
            onClick={onOpenDelete}
            icon={MdOutlineCancel}
            color="red"
            title="Delete"
            // children="Delete"
          /> */}
          {/* <ReportBtn
            onClick={onOpenDelete}
            icon={LuBadgeDollarSign}
            color="blue"
            title="Pay"
            // children="Delete"
          /> */}
        </div>
      </td>
    </tr>
  );
};

export default ApplicationDataRow;
