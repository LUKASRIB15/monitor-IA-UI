"use server";

import { cookies } from "next/headers";
import type { RoomDTO } from "./dtos/room-dto";

type CreateRoomRequest = {
  title: string;
  description: string;
};

type CreateRoomResponse =
  | {
      ok: false;
      error: {
        statusCode: number;
      };
    }
  | {
      ok: true;
      room: RoomDTO;
    };

export async function createRoomAction({
  title,
  description,
}: CreateRoomRequest): Promise<CreateRoomResponse> {
  const appCookies = await cookies();

  const accessToken = appCookies.get("access_token")?.value;

  const response = await fetch("http://localhost:3333/rooms/new", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
    }),
  });

  if (response.status === 404) {
    const error404 = await response.json();

    return {
      ok: false,
      error: {
        statusCode: error404.statusCode,
      },
    };
  }

  const data = await response.json();

  return {
    ok: true,
    room: data.room,
  };
}
