import { useMutation, useQuery } from "@tanstack/react-query";
import { getMe, syncUser } from "../api";

export const useSyncUserMutation = () => {
  return useMutation({
    mutationFn: () => syncUser(),
  });
};

export const useGetMeQuery = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => getMe(),
    enabled,
  });
};
