"use server";

import { cookies } from "next/headers";
import { ChatWithMessagesAndStudentDTO } from "./dtos/chat-with-messages-and-student-dto";

type FetchAllChatsByRoomRequest = {
  roomId: string;
};

type FetchAllChatsByRoomResponse =
  | {
      ok: false;
      error: {
        statusCode: number;
      };
    }
  | {
      ok: true;
      chats: ChatWithMessagesAndStudentDTO[];
    };

export async function fetchAllChatsByRoomAction({
  roomId,
}: FetchAllChatsByRoomRequest): Promise<FetchAllChatsByRoomResponse> {
  const appCookies = await cookies();
  const accessToken = appCookies.get("access_token")!.value;

  const response = await fetch(`http://localhost:3333/rooms/${roomId}/chats`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
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
    chats: data.chats as ChatWithMessagesAndStudentDTO[],
  };
}
