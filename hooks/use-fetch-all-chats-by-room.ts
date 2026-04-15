import { useQuery } from "@tanstack/react-query";
import { RoomsQueryKeysEnum } from "./enums/rooms-query-keys";
import { fetchAllChatsByRoomAction } from "@/app/actions/fetch-all-chats-by-room";

export const useFetchAllChatsByRoom = (roomId: string) => {
  const query = useQuery({
    queryKey: [RoomsQueryKeysEnum.FETCH_CHATS, roomId],
    queryFn: async () => await fetchAllChatsByRoomAction({ roomId }),
    enabled: Boolean(roomId),
  });

  return {
    chats: query.data?.ok ? query.data.chats : null,
    isLoadingData: query.isLoading,
    isError: query.isError,
    isFetching: query.isFetching,
  };
};
