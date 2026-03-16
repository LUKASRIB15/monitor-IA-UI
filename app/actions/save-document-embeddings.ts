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
      documentInProgressId: string;
    };

export async function saveDocumentEmbeddingsAction({
  roomId,
  file,
}: SaveDocumentEmbeddingsRequest): Promise<SaveDocumentEmbeddingsResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    `/api/save-document-embeddings?roomId=${roomId}`,
    {
      method: "POST",
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

  const data = await response.json();

  return {
    ok: true,
    documentInProgressId: data.document_in_progress_id as string,
  };
}
