import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/Shared/LoadingSpinner";

const PrivateRouteProvider = ({ children }) => {
  /*** ----------*** :: HOOKS :: ***---------- ***/
  const { user, loading } = useAuth();

  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (user && user?.email) {
    return children;
  }

  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default PrivateRouteProvider;
