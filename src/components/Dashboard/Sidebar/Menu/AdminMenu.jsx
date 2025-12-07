import React from "react";
import DashboardNavLink from "../../../Shared/DashboardNavLink";
import { PiFlowerLotusDuotone } from "react-icons/pi";
import { GiPapers } from "react-icons/gi";
import { FaUserTie } from "react-icons/fa";

const AdminMenu = () => {
  return (
    <div className="flex flex-col gap-4">
      <DashboardNavLink
        to="/dashboard/loan-applications"
        icon={GiPapers}
        label="Loan Applicaitons"
        variant="default"
      />
      <DashboardNavLink
        to="/dashboard/manage-users"
        icon={FaUserTie}
        label="Manage User"
        variant="default"
      />
      <DashboardNavLink
        to="/dashboard/all-loan"
        icon={PiFlowerLotusDuotone}
        label="All Loan"
        variant="default"
      />
    </div>
  );
};

export default AdminMenu;
