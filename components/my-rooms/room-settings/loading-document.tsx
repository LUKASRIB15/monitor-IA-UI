import { Download } from "lucide-react";
import { Progress } from "@/shared/components/progress";
import { useDocumentInProgressStore } from "@/store/document-in-progress";
import { useEffect, useState } from "react";

interface LoadingDocumentProps {
  documentName: string;
  progressId: string;
}

export function LoadingDocument({
  documentName,
  progressId,
}: LoadingDocumentProps) {
  const { currentProgress } = useDocumentInProgressStore();
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    const progressIndex = currentProgress.findIndex(
      (item) => item.progressId === progressId,
    );

    if (progressIndex > -1) {
      setProgress(currentProgress[progressIndex].value);
    }
  }, [currentProgress, progressId]);

  return (
    <div className="absolute inset-x-0 top-0 z-10 overflow-hidden rounded-t-lg bg-primary px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary-foreground/20">
            <Download className="size-4 animate-bounce text-primary-foreground" />
          </div>
          <p className="truncate text-sm font-medium text-primary-foreground">
            Salvando &apos;{documentName}&apos;
          </p>
        </div>
        <span className="shrink-0 text-sm font-semibold text-primary-foreground">
          {progress ? `${progress}%` : "Pendente..."}
        </span>
      </div>
      <Progress
        value={progress ?? 0}
        className="mt-2.5 h-1.5 bg-primary-foreground/20 [&>div]:bg-primary-foreground"
      />
    </div>
  );
}
