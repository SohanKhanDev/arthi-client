import { Navigate } from "react-router";
import useDBUser from "../hooks/usedbUser";
import LoadingSpinner from "../components/Shared/LoadingSpinner";

const ManagerRoute = ({ children }) => {
  const { dbUser, isLoading } = useDBUser();

  if (isLoading) return <LoadingSpinner />;

  if (dbUser?.role === "manager") return children;
  return <Navigate to="/dashboard" replace="true" />;
};

export default ManagerRoute;
