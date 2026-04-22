"use server";

import { cookies } from "next/headers";

type SendInstructorMessageRequest = {
  chatId: string;
  studentId: string;
  message: string;
};

type SendInstructorMessageResponse =
  | {
      ok: false;
      error: {
        statusCode: number;
      };
    }
  | {
      ok: true;
      instructor_message: string;
    };

export async function sendInstructorMessageAction({
  chatId,
  studentId,
  message,
}: SendInstructorMessageRequest): Promise<SendInstructorMessageResponse> {
  const appCookies = await cookies();
  const accessToken = appCookies.get("access_token")!.value;

  const response = await fetch(
    `http://localhost:3333/chats/${chatId}/students/${studentId}/messages/new`,
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

  if (response.status === 401) {
    const error401 = await response.json();

    return {
      ok: false,
      error: {
        statusCode: error401.statusCode,
      },
    };
  }

  return {
    ok: true,
    instructor_message: message,
  };
}
