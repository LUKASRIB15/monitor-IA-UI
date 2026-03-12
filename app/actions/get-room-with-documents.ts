"use server";

import { cookies } from "next/headers";
import { DocumentDTO } from "./dtos/document-dto";
import { RoomDTO } from "./dtos/room-dto";

type GetRoomWithDocumentsRequest = {
  roomId: string;
};

type GetRoomWithDocumentsResponse =
  | {
      ok: false;
      error: {
        statusCode: number;
      };
    }
  | {
      ok: true;
      room: RoomDTO;
      documents: DocumentDTO[];
    };

export async function getRoomWithDocumentsAction({
  roomId,
}: GetRoomWithDocumentsRequest): Promise<GetRoomWithDocumentsResponse> {
  const appCookies = await cookies();

  const accessToken = appCookies.get("access_token")!.value;

  const response = await fetch(
    `http://localhost:3333/instructor/rooms/${roomId}`,
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
    room: data.room as RoomDTO,
    documents: data.documents as DocumentDTO[],
  };
}
