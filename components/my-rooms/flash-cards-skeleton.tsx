import { Card, CardContent } from "@/shared/components/card";
import { Skeleton } from "@/shared/components/skeleton";

export function FlashCardsSkeleton() {
  return (
    <Card className="w-full max-w-2xl">
      <CardContent className="flex flex-col gap-6 p-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-5 w-72" />
        </div>

        {/* Card */}
        <div className="relative h-80 w-full rounded-xl bg-muted/50 p-8">
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <Skeleton className="h-6 w-24 rounded-full" />
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="h-6 w-64" />
              <Skeleton className="h-6 w-48" />
            </div>
            <Skeleton className="mt-4 h-4 w-40" />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <Skeleton className="h-10 w-28 rounded-md" />
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-10 w-28 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}
