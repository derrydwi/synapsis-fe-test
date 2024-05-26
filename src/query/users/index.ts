import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/utils/fetcher";
import { User } from "@/utils/validations/users";

export const getUsersConfig = (page: number, search?: string) => {
  return {
    queryKey: ["users/getUsers", page, search],
    queryFn: () => {
      const params = new URLSearchParams({
        page: String(page),
        ...(search && {
          name: search,
          email: search,
        }),
      });
      return fetchData<User[]>(`/users?${params.toString()}`);
    },
  };
};

export const useGetUsers = (page: number, search?: string) => {
  return useQuery(getUsersConfig(page, search));
};

export const getUserByIdConfig = (userId: number) => {
  return {
    queryKey: ["users/getUserById", userId],
    queryFn: () => fetchData<User>(`/users/${userId}`),
  };
};

export const useGetUserById = (userId: number) => {
  return useQuery(getUserByIdConfig(userId));
};
