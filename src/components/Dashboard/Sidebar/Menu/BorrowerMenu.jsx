import React from "react";
import DashboardNavLink from "../../../Shared/DashboardNavLink";
import { GiCash } from "react-icons/gi";

const BorrowerMenu = () => {
  return (
    <div className="flex flex-col gap-4">
      <DashboardNavLink
        to="/dashboard/my-loans"
        icon={GiCash}
        label="My Loans"
        variant="default"
      />
    </div>
  );
};

export default BorrowerMenu;
