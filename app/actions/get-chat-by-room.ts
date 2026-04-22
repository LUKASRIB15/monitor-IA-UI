"use server";

import { cookies } from "next/headers";
import type { ChatWithMessagesDTO } from "./dtos/chat-with-messages-dto";
import type { ChatWithMessagesAndStudentDTO } from "./dtos/chat-with-messages-and-student-dto";

type GetChatByRoomRequest = {
  roomId: string;
  chatId: string;
};

type GetChatByRoomResponse =
  | {
      ok: false;
      error: {
        statusCode: number;
      };
    }
  | {
      ok: true;
      room_title: string;
      chat: ChatWithMessagesAndStudentDTO;
    };

export async function getChatByRoomAction({
  roomId,
  chatId,
}: GetChatByRoomRequest): Promise<GetChatByRoomResponse> {
  const appCookies = await cookies();
  const accessToken = appCookies.get("access_token")!.value;

  const response = await fetch(
    `http://localhost:3333/rooms/${roomId}/chats/${chatId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

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
    room_title: data.room_title,
    chat: data.chat as ChatWithMessagesAndStudentDTO,
  };
}
