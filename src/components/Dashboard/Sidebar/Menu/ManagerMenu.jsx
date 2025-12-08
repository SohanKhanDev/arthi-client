import React from "react";
import DashboardNavLink from "../../../Shared/DashboardNavLink";
import { PiFlowerLotusDuotone } from "react-icons/pi";
import { IoAddCircle } from "react-icons/io5";
import { MdManageAccounts, MdOutlinePendingActions } from "react-icons/md";
import { AiOutlineFileDone } from "react-icons/ai";

const ManagerMenu = () => {
  return (
    <div className="flex flex-col gap-4">
      <DashboardNavLink
        to="/dashboard/add-loan"
        icon={IoAddCircle}
        label="Add Loan"
        variant="default"
      />

      <DashboardNavLink
        to="/dashboard/manage-loans"
        icon={MdManageAccounts}
        label="Manage Loans"
        variant="default"
      />

      <DashboardNavLink
        to="/dashboard/pending-loans"
        icon={MdOutlinePendingActions}
        label="Pending Applications"
        variant="default"
      />

      <DashboardNavLink
        to="/dashboard/approved-loans"
        icon={AiOutlineFileDone}
        label="Approved Applications"
        variant="default"
      />
    </div>
  );
};

export default ManagerMenu;
