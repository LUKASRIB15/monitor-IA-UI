import { useQuery } from "@tanstack/react-query";
import { RoomsQueryKeysEnum } from "./enums/rooms-query-keys";
import { getRoomWithDocumentsAction } from "@/app/actions/get-room-with-documents";

export const useGetRoomWithDocuments = (roomId: string) => {
  const query = useQuery({
    queryKey: [RoomsQueryKeysEnum.GET_ROOM, roomId],
    queryFn: () => getRoomWithDocumentsAction({ roomId }),
    enabled: Boolean(roomId),
  });

  return {
    room: query.data?.ok ? query.data.room : null,
    documents: query.data?.ok ? query.data.documents : null,
    isLoadingData: query.isLoading,
  };
};
