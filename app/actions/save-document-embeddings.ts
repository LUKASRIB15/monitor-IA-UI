"use server";

import { cookies } from "next/headers";

type SaveDocumentEmbeddingsRequest = {
  roomId: string;
  file: File;
};

type SaveDocumentEmbeddingsResponse =
  | {
      ok: false;
      error: {
        statusCode: number;
      };
    }
  | {
      ok: true;
    };

export async function saveDocumentEmbeddingsAction({
  roomId,
  file,
}: SaveDocumentEmbeddingsRequest): Promise<SaveDocumentEmbeddingsResponse> {
  const appCookies = await cookies();
  const accessToken = appCookies.get("access_token")?.value;

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    `http://localhost:3333/rooms/${roomId}/document/save`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },

      body: formData,
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
  };
}
