"use server";

import { cookies } from "next/headers";
import { ChatWithMessagesDTO } from "./dtos/chat-with-messages-dto";
import { RoomDTO } from "./dtos/room-dto";

type EnterRoomRequest = {
  code: string;
};

type EnterRoomResponse =
  | {
      ok: false;
      error: {
        statusCode: number;
      };
    }
  | {
      ok: true;
      roomId: string;
    };

export async function enterRoomAction({
  code,
}: EnterRoomRequest): Promise<EnterRoomResponse> {
  const appCookies = await cookies();

  const accessToken = appCookies.get("access_token")?.value;

  const response = await fetch("http://localhost:3333/rooms/enter", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
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

  if (response.status === 401) {
    const error401 = await response.json();

    return {
      ok: false,
      error: {
        statusCode: error401.statusCode,
      },
    };
  }

  const data = await response.json();

  return {
    ok: true,
    roomId: data.roomId as string,
  };
}
