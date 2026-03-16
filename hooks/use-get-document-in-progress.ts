import { useDocumentInProgressStore } from "@/store/document-in-progress";
import { useEffect } from "react";
import { io } from "socket.io-client";

export const useGetDocumentInProgress = (id: string | null) => {
  const {
    addCurrentProgress,
    removeActiveDocumentId,
    removeCurrentProgress,
    addActiveDocumentId,
  } = useDocumentInProgressStore();

  useEffect(() => {
    if (!id) return;

    const socket = io("http://localhost:3333");

    socket.on(`document:${id}`, (value: number) => {
      if (value < 100) {
        addActiveDocumentId(id);
        addCurrentProgress({
          progressId: id,
          value,
        });
      }

      if (value === 100) {
        setTimeout(() => {
          removeActiveDocumentId(id);
          removeCurrentProgress(id);
        }, 1000);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [id]);
};
