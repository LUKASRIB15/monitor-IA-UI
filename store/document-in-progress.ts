import { create } from "zustand";

type Progress = {
  progressId: string;
  value: number;
};

type DocumentInProgressState = {
  activeDocumentId: string[];
  currentProgress: Progress[];
  addActiveDocumentId: (documentId: string) => void;
  removeActiveDocumentId: (documentId: string) => void;
  addCurrentProgress: (progress: Progress) => void;
  removeCurrentProgress: (id: string) => void;
};

export const useDocumentInProgressStore = create<DocumentInProgressState>(
  (set, get) => {
    return {
      activeDocumentId: [],
      currentProgress: [],
      addActiveDocumentId: (documentId: string) => {
        if (!get().activeDocumentId.includes(documentId)) {
          set({ activeDocumentId: [...get().activeDocumentId, documentId] });
        }
      },
      removeActiveDocumentId: (documentId: string) => {
        const activeDocuments = get().activeDocumentId.filter(
          (activeDocument) => activeDocument !== documentId,
        );

        set({
          activeDocumentId: activeDocuments,
        });
      },
      addCurrentProgress: (progress: Progress) => {
        let currentProgress: Progress[];

        if (
          get().currentProgress.some(
            (item) => item.progressId === progress.progressId,
          )
        ) {
          currentProgress = get().currentProgress.map((item) => {
            if (item.progressId === progress.progressId) {
              return {
                progressId: progress.progressId,
                value: progress.value,
              };
            }

            return item;
          });
        } else {
          currentProgress = [...get().currentProgress, progress];
        }

        set({ currentProgress });
      },
      removeCurrentProgress: (id: string) => {
        const progressList = get().currentProgress.filter(
          (item) => item.progressId !== id,
        );

        set({
          currentProgress: progressList,
        });
      },
    };
  },
);
