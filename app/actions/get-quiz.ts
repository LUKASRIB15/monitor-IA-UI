"use server";

import { cookies } from "next/headers";
import { QuizDTO } from "./dtos/quiz-dto";

type GetQuizRequest = {
  roomId: string;
};

type GetQuizResponse =
  | {
      ok: false;
      error: {
        statusCode: number;
      };
    }
  | {
      ok: true;
      quiz: QuizDTO[];
    };

export async function getQuizAction({
  roomId,
}: GetQuizRequest): Promise<GetQuizResponse> {
  const appCookies = await cookies();
  const accessToken = appCookies.get("access_token")!.value;

  const response = await fetch(`http://localhost:3333/rooms/${roomId}/quiz`, {
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
    quiz: data.quiz as QuizDTO[],
  };
}
