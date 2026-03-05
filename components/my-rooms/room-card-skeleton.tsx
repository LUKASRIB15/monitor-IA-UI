import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardAction,
} from "@/shared/components/card";
import { Skeleton } from "@/shared/components/skeleton";

export function RoomCardSkeleton() {
  return (
    <Card className="animate-in fade-in duration-500">
      <CardHeader>
        <Skeleton className="size-9 rounded-lg" />
        <CardAction>
          <Skeleton className="h-5 w-14 rounded-full" />
        </CardAction>
        <Skeleton className="h-4 w-3/4" />
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-2/3" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-x-4">
          <Skeleton className="h-3.5 w-20" />
          <Skeleton className="h-3.5 w-14" />
        </div>
      </CardContent>

      <CardFooter>
        <Skeleton className="h-8 w-full rounded-md" />
      </CardFooter>
    </Card>
  );
}
