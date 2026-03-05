import { Separator } from "@/shared/components/separator";
import { Skeleton } from "@/shared/components/skeleton";
import { cn } from "@/lib/utils";

interface ChatBotSkeletonProps {
  className?: string;
}

function MessageSkeleton({
  align,
  widths,
}: {
  align: "left" | "right";
  widths: string[];
}) {
  const isRight = align === "right";

  return (
    <div
      className={cn(
        "flex items-end gap-2",
        isRight ? "flex-row-reverse" : "flex-row",
      )}
    >
      {!isRight && <Skeleton className="size-7 shrink-0 rounded-full" />}

      <div
        className={cn(
          "flex flex-col gap-1.5",
          isRight ? "items-end" : "items-start",
        )}
      >
        {!isRight && <Skeleton className="h-3 w-14" />}
        <div
          className={cn(
            "flex flex-col gap-1 rounded-2xl bg-muted/50 px-3.5 py-2.5",
            isRight ? "rounded-br-md" : "rounded-bl-md",
          )}
        >
          {widths.map((w, i) => (
            <Skeleton key={i} className={cn("h-3.5", w)} />
          ))}
        </div>
        <Skeleton className="h-2.5 w-10" />
      </div>
    </div>
  );
}

export function ChatBotSkeleton({ className }: ChatBotSkeletonProps) {
  return (
    <div
      className={cn(
        "flex w-full h-full flex-col overflow-hidden rounded-xl border bg-card shadow-sm",
        className,
      )}
    >
      {/* Header skeleton */}
      <div className="flex items-center justify-between px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <Skeleton className="size-8 rounded-lg" />
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        <Skeleton className="size-7 rounded-md" />
      </div>

      <Separator />

      {/* Messages skeleton */}
      <div className="flex min-h-0 flex-1 flex-col justify-end gap-4 px-5 py-4">
        <MessageSkeleton align="left" widths={["w-40"]} />
        <MessageSkeleton align="right" widths={["w-48"]} />
        <MessageSkeleton align="left" widths={["w-56", "w-32"]} />
        <MessageSkeleton align="right" widths={["w-44"]} />
        <MessageSkeleton align="left" widths={["w-36"]} />
      </div>

      <Separator />

      {/* Input skeleton */}
      <div className="flex items-end gap-2 px-4 py-3">
        <Skeleton className="size-7 shrink-0 rounded-md" />
        <Skeleton className="h-9 flex-1 rounded-lg" />
        <Skeleton className="size-8 shrink-0 rounded-md" />
      </div>
    </div>
  );
}
