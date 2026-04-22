import { useQuery } from "@tanstack/react-query";
import { RoomsQueryKeysEnum } from "./enums/rooms-query-keys";
import { getChatByRoomAction } from "@/app/actions/get-chat-by-room";

export const useGetChatByRoom = ({
  roomId,
  chatId,
}: {
  roomId: string;
  chatId: string;
}) => {
  const query = useQuery({
    queryKey: [RoomsQueryKeysEnum.GET_CHAT, roomId, chatId],
    queryFn: async () => await getChatByRoomAction({ roomId, chatId }),
    enabled: Boolean(roomId) && Boolean(chatId),
  });

  return {
    room_title: query.data?.ok ? query.data.room_title : null,
    chat: query.data?.ok ? query.data.chat : null,
    isLoadingData: query.isLoading,
    isError: query.isError,
    isFetching: query.isFetching,
  };
};
