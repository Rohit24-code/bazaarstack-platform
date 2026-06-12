import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { askGemini, clearChatHistory, getChatHistory } from "../api";

export const useGetChatHistoryQuery = () => {
  return useQuery({
    queryKey: ["chatbot", "history"],
    queryFn: () => getChatHistory(),
  });
};

export const useAskGeminiMutation = () => {
  return useMutation({
    mutationFn: (question: string) => askGemini(question),
  });
};

export const useClearChatHistoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => clearChatHistory(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["chatbot", "history"],
      });
    },
  });
};
