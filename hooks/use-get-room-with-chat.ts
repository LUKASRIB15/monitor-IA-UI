import { useQuery } from "@tanstack/react-query";
import { RoomsQueryKeysEnum } from "./enums/rooms-query-keys";
import { getRoomWithChatAction } from "@/app/actions/get-room-with-chat";

export const useGetRoomWithChat = (roomId: string) => {
  const query = useQuery({
    queryKey: [RoomsQueryKeysEnum.GET_ROOM, roomId],
    queryFn: () => getRoomWithChatAction({ roomId }),
    enabled: Boolean(roomId),
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
  });

  return {
    room: query.data?.ok ? query.data.room : null,
    chat: query.data?.ok ? query.data.chat : null,
    isLoadingData: query.isLoading,
    isError: query.isError,
    isFetching: query.isFetching,
  };
};
