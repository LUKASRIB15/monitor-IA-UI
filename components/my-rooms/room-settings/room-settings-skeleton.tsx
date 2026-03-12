import { Card, CardContent, CardHeader } from "@/shared/components/card";
import { Separator } from "@/shared/components/separator";
import { Skeleton } from "@/shared/components/skeleton";

function DocumentCardSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-muted/50 p-4">
      <Skeleton className="size-12 shrink-0 rounded-lg" />
      <div className="min-w-0 flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <Skeleton className="size-8 rounded-md" />
    </div>
  );
}

interface RoomSettingsSkeletonProps {
  documentCount?: number;
}

export function RoomSettingsSkeleton({
  documentCount = 3,
}: RoomSettingsSkeletonProps) {
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="flex flex-1 flex-col gap-1.5">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-full max-w-sm" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="size-9 rounded-md" />
          <Skeleton className="size-9 rounded-md" />
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="space-y-6 pt-6">
        {/* Seção de Upload Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-5 w-40" />

          <div className="rounded-xl bg-muted/50 p-8">
            <div className="flex flex-col items-center gap-3">
              <Skeleton className="size-14 rounded-full" />
              <div className="flex flex-col items-center gap-1.5">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          </div>

          <Skeleton className="h-10 w-full rounded-lg" />
        </div>

        <Separator />

        {/* Lista de Documentos Skeleton */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-5 w-24 rounded-full" />
          </div>

          <div className="flex flex-col gap-3">
            {Array.from({ length: documentCount }).map((_, index) => (
              <DocumentCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
