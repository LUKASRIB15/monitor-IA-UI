"use server";

import { cookies } from "next/headers";
import type { MessageDTO } from "./dtos/message-dto";

type SendMessageRequest = {
  message: string;
  chatId: string;
};

type SendMessageResponse =
  | {
      ok: false;
      error: {
        statusCode: number;
      };
    }
  | {
      ok: true;
      message: MessageDTO;
    };

export async function sendMessageAction({
  message,
  chatId,
}: SendMessageRequest): Promise<SendMessageResponse> {
  const appCookies = await cookies();

  const accessToken = appCookies.get("access_token")!.value;

  const response = await fetch(
    `http://localhost:3333/chats/${chatId}/messages/new`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
      }),
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
    message: data.message as MessageDTO,
  };
}
