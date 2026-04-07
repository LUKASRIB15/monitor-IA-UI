import { useQuery } from "@tanstack/react-query";
import { RoomsQueryKeysEnum } from "./enums/rooms-query-keys";
import { useGenerateNewQuiz } from "./use-generate-new-quiz";
import { getQuizAction } from "@/app/actions/get-quiz";

export const useGetQuiz = (roomId: string) => {
  const generateNewQuiz = useGenerateNewQuiz();

  const query = useQuery({
    queryKey: [RoomsQueryKeysEnum.GET_ROOM, roomId],
    queryFn: async () => {
      let result = await getQuizAction({ roomId });

      if (!result || !result.ok) {
        await generateNewQuiz.execute({ roomId });
        result = await getQuizAction({ roomId });
      }

      if (!result) {
        throw new Error("Não foi possível carregar ou gerar o quiz.");
      }

      return result;
    },
    enabled: Boolean(roomId),
  });

  return {
    quiz: query.data?.ok ? query.data.quiz : null,
    isLoadingData: query.isLoading,
    isError: query.isError,
    isFetching: query.isFetching,
  };
};
