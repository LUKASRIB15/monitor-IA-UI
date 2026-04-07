"use server";

import { cookies } from "next/headers";

type GenerateNewQuizRequest = {
  roomId: string;
};

type GenerateNewQuizResponse =
  | {
      ok: false;
      error: {
        statusCode: number;
      };
    }
  | {
      ok: true;
    };

export async function generateNewQuizAction({
  roomId,
}: GenerateNewQuizRequest): Promise<GenerateNewQuizResponse> {
  const appCookies = await cookies();
  const accessToken = appCookies.get("access_token")!.value;

  const response = await fetch(`http://localhost:3333/rooms/${roomId}/quiz`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
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
  };
}
