import { useQuery } from "@tanstack/react-query";
import { FetchRoomsQueryKeysEnum } from "./enums/fetch-rooms-query-keys";
import { fetchRoomsAction } from "@/app/actions/fetch-rooms";
import { RoomDTO } from "@/app/actions/dtos/room-dto";

export const useFetchRooms = () => {
  const query = useQuery({
    queryKey: [FetchRoomsQueryKeysEnum.GET_ROOMS],
    queryFn: fetchRoomsAction,
  });

  let rooms: RoomDTO[] = [];

  if (query.data && query.data.ok) {
    rooms = query.data.rooms;
  }

  return {
    rooms,
  };
};
