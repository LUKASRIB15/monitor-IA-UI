import { useQuery } from "@tanstack/react-query";
import { RoomsQueryKeysEnum } from "./enums/rooms-query-keys";
import { fetchRoomsAction } from "@/app/actions/fetch-rooms";
import { RoomDTO } from "@/app/actions/dtos/room-dto";

export const useFetchRooms = () => {
  const query = useQuery({
    queryKey: [RoomsQueryKeysEnum.FETCH_ROOMS],
    queryFn: fetchRoomsAction,
  });

  let rooms: RoomDTO[] = [];

  if (query.data && query.data.ok) {
    rooms = query.data.rooms;
  }

  return {
    rooms,
    isFetchingRooms: query.isFetching,
  };
};
