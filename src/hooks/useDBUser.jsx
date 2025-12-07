import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useDBUser = () => {
  const { user, loading } = useAuth();

  const axiosSecure = useAxiosSecure();

  const { data: dbUser, isLoading: isRoleLoading } = useQuery({
    queryKey: ["dbUser", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/db-user`);
      return data;
    },
  });

  return { dbUser, isRoleLoading };
};

export default useDBUser;
