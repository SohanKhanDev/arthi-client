import React from "react";
import DashboardNavLink from "../../../Shared/DashboardNavLink";
import { GiCash } from "react-icons/gi";
import useAuth from "../../../../hooks/useAuth";

const BorrowerMenu = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col gap-4">
      <DashboardNavLink
        to={`/dashboard/my-loans/${user?.email}`}
        icon={GiCash}
        label="My Loans"
        variant="default"
      />
    </div>
  );
};

export default BorrowerMenu;
