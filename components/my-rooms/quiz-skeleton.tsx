import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/shared/components/card";
import { Skeleton } from "@/shared/components/skeleton";

function OptionSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-4">
      <Skeleton className="size-8 shrink-0 rounded-full" />
      <Skeleton className="h-4 flex-1" />
    </div>
  );
}

interface QuizSkeletonProps {
  optionCount?: number;
}

export function QuizSkeleton({ optionCount = 4 }: QuizSkeletonProps) {
  return (
    <Card className="w-full max-w-2xl overflow-hidden">
      <CardHeader>
        {/* Badges de progresso */}
        <div className="mb-4 flex items-center justify-between">
          <Skeleton className="h-5 w-32 rounded-full" />
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>

        <Skeleton className="mb-4 h-2 w-full rounded-full" />

        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="rounded-lg bg-muted/50 p-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {Array.from({ length: optionCount }).map((_, index) => (
            <OptionSkeleton key={index} />
          ))}
        </div>
      </CardContent>

      <CardFooter>
        <Skeleton className="h-11 w-full rounded-lg" />
      </CardFooter>
    </Card>
  );
}
