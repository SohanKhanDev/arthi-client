import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useDBUser = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: dbUser,
    isLoading: queryLoading,
    isFetching,
  } = useQuery({
    queryKey: ["dbUser", user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/db-user`);
      return data;
    },
  });

  const isLoading = queryLoading;

  return { dbUser, isLoading };
};

export default useDBUser;
