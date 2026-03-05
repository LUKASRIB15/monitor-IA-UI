"use server";

import { cookies } from "next/headers";
import { ChatWithMessagesDTO } from "./dtos/chat-with-messages-dto";
import { RoomDTO } from "./dtos/room-dto";

type GetRoomWithChatRequest = {
  roomId: string;
};

type GetRoomWithChatResponse =
  | {
      ok: false;
      error: {
        statusCode: number;
      };
    }
  | {
      ok: true;
      room: RoomDTO;
      chat: ChatWithMessagesDTO;
    };

export async function getRoomWithChatAction({
  roomId,
}: GetRoomWithChatRequest): Promise<GetRoomWithChatResponse> {
  const appCookies = await cookies();

  const accessToken = appCookies.get("access_token")!.value;

  const response = await fetch(`http://localhost:3333/rooms/${roomId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  return {
    ok: true,
    room: data.room as RoomDTO,
    chat: data.chat as ChatWithMessagesDTO,
  };
}
