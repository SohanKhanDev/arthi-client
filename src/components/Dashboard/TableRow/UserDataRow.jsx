import MyBtn from "../../Shared/MyBtn";
import { RxUpdate } from "react-icons/rx";
import { FaCircleStop } from "react-icons/fa6";
import { FaRegCirclePlay } from "react-icons/fa6";
import ReportBtn from "../../Shared/ReportBtn";

const UserDataRow = ({ user, onOpenUpdate, onOpenSuspend, onOpenApprove }) => {
  return (
    <tr className="hover:bg-slate-50/50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <img
          className="h-13 w-13 rounded-4xl object-cover"
          src={user?.image || "/default-avatar.png"}
          alt={user?.name}
          onError={(e) => {
            e.target.src = "/default-avatar.png";
          }}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <div className="text-sm font-semibold text-slate-900">{user?.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <div className="text-sm text-slate-900 max-w-xs truncate">
          {user?.email}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-center">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            user?.role === "admin"
              ? "bg-purple-100 text-purple-800"
              : user?.role === "manager"
              ? "bg-emerald-100 text-emerald-800"
              : "bg-slate-100 text-slate-800"
          }`}
        >
          {user?.role?.toUpperCase()}
        </span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-center">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            user?.status === "approved"
              ? "bg-emerald-100 text-emerald-800"
              : user?.status === "suspended"
              ? "bg-red-100 text-red-800"
              : "bg-amber-100 text-amber-800"
          }`}
        >
          {(user?.status || "pending").toUpperCase()}
        </span>
      </td>
      <td className="flex items-center justify-center gap-2 p-2">
        <ReportBtn
          onClick={onOpenUpdate}
          icon={RxUpdate}
          color="blue"
          title="Update"
          // children="Delete"
        />

        <ReportBtn
          onClick={onOpenApprove}
          icon={FaRegCirclePlay}
          color="green"
          title="Approve"
          // children="Delete"
        />

        <ReportBtn
          onClick={onOpenSuspend}
          icon={FaCircleStop}
          color="red"
          title="Suspend"
          // children="Delete"
        />
      </td>
    </tr>
  );
};

export default UserDataRow;
