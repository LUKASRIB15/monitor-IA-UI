"use server";

import { cookies } from "next/headers";
import type { RoomDTO } from "./dtos/room-dto";

type FetchRoomsResponse = {
  ok: true;
  rooms: RoomDTO[];
};

export async function fetchRoomsAction(): Promise<FetchRoomsResponse> {
  const appCookies = await cookies();

  const accessToken = appCookies.get("access_token")!.value;

  const response = await fetch("http://localhost:3333/rooms/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  return {
    ok: true,
    rooms: data.rooms as RoomDTO[],
  };
}
