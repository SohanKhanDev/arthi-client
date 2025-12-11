import { Navigate } from "react-router";
import useDBUser from "../hooks/usedbUser";
import LoadingSpinner from "../components/Shared/LoadingSpinner";

const BorrowerRoute = ({ children }) => {
  const { dbUser, isLoading } = useDBUser();

  if (isLoading) return <LoadingSpinner />;

  if (dbUser?.role === "borrower") return children;
  return <Navigate to="/dashboard" replace="true" />;
};

export default BorrowerRoute;
