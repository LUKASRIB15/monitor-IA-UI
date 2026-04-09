"use server";

import { cookies } from "next/headers";
import type { FlashCardDTO } from "./dtos/flash-card-dto";

type FetchFlashCardsRequest = {
  roomId: string;
};

type FetchFlashCardsResponse =
  | {
      ok: false;
      error: {
        statusCode: number;
      };
    }
  | {
      ok: true;
      flash_cards: FlashCardDTO[];
    };

export async function fetchFlashCardsAction({
  roomId,
}: FetchFlashCardsRequest): Promise<FetchFlashCardsResponse> {
  const appCookies = await cookies();
  const accessToken = appCookies.get("access_token")!.value;

  const response = await fetch(
    `http://localhost:3333/rooms/${roomId}/flash-cards`,
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
    flash_cards: data.flash_cards as FlashCardDTO[],
  };
}
