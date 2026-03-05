import { useQuery } from "@tanstack/react-query";
import { RoomsQueryKeysEnum } from "./enums/rooms-query-keys";
import { getRoomWithChatAction } from "@/app/actions/get-room-with-chat";
import { RoomDTO } from "@/app/actions/dtos/room-dto";
import { ChatWithMessagesDTO } from "@/app/actions/dtos/chat-with-messages-dto";

export const useGetRoomWithChat = (roomId: string) => {
  const query = useQuery({
    queryKey: [RoomsQueryKeysEnum.GET_ROOM, roomId],
    queryFn: () => getRoomWithChatAction({ roomId }),
    enabled: Boolean(roomId),
  });

  let room: RoomDTO | null = null;
  let chat: ChatWithMessagesDTO | null = null;

  if (query.data && query.data.ok) {
    room = query.data.room;
    chat = query.data.chat;
  }

  return {
    room,
    chat,
    isLoadingData: query.isLoading,
  };
};
