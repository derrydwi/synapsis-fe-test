import { useMutation } from "@tanstack/react-query";

import { getQueryClient } from "@/lib/react-query";

import { fetchData } from "@/utils/fetcher";
import { User } from "@/utils/validations/users";

export const useCreateUser = () => {
  return useMutation({
    mutationKey: ["users/createUser"],
    mutationFn: ({ body }: { body: FormData }) => {
      return fetchData<User>(`/users`, {
        method: "POST",
        body,
      });
    },
    onSuccess: () => {
      getQueryClient().invalidateQueries({
        queryKey: ["users/getUsers"],
      });
    },
  });
};

export const useUpdateUserById = () => {
  return useMutation({
    mutationKey: ["users/updateUserById"],
    mutationFn: ({ id, body }: { id: number; body: FormData }) => {
      return fetchData<User>(`/users/${id}`, {
        method: "PATCH",
        body,
      });
    },
    onSuccess: (data) => {
      getQueryClient().invalidateQueries({
        queryKey: ["users/getUsers"],
      });
      getQueryClient().invalidateQueries({
        queryKey: ["users/getUserById", data.data.id],
      });
    },
  });
};

export const useDeleteUserById = () => {
  return useMutation({
    mutationKey: ["users/deleteUserById"],
    mutationFn: ({ id }: { id: number }) => {
      return fetchData<string>(`/users/${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      getQueryClient().invalidateQueries({
        queryKey: ["users/getUsers"],
      });
    },
  });
};
