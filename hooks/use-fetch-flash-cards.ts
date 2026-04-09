import { useQuery } from "@tanstack/react-query";
import { useGenerateNewFlashCards } from "./use-generate-new-flash-cards";
import { RoomsQueryKeysEnum } from "./enums/rooms-query-keys";
import { fetchFlashCardsAction } from "@/app/actions/fetch-flash-cards";

export const useFetchFlashCards = (roomId: string) => {
  const generateNewFlashCards = useGenerateNewFlashCards();

  const query = useQuery({
    queryKey: [RoomsQueryKeysEnum.GET_ROOM, roomId],
    queryFn: async () => {
      let result = await fetchFlashCardsAction({ roomId });

      if (!result || !result.ok) {
        await generateNewFlashCards.execute({ roomId });
        result = await fetchFlashCardsAction({ roomId });
      }

      if (!result) {
        throw new Error("Não foi possível carregar ou gerar o quiz.");
      }

      return result;
    },
    enabled: Boolean(roomId),
  });

  return {
    flash_cards: query.data?.ok ? query.data.flash_cards : null,
    isLoadingData: query.isLoading,
    isError: query.isError,
    isFetching: query.isFetching,
  };
};
