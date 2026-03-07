import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/shared/components/card";
import { formatTime } from "@/utils/format-time";
import { formatRelativeDate } from "@/utils/format-relative-date";
import { Button } from "@/shared/components/button";
import { DoorOpen, Calendar, Clock, MessageSquare } from "lucide-react";
import Link from "next/link";

type Room = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
};

interface RoomCardProps {
  data: Room;
}

export function RoomCard({ data }: RoomCardProps) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
          <DoorOpen className="size-4 text-muted-foreground" />
        </div>
        <CardAction>
          <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
            Aberta
          </span>
        </CardAction>
        <CardTitle className="text-base">{data.title}</CardTitle>
        <CardDescription className="line-clamp-2 leading-relaxed">
          {data.description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="size-3.5" />
            Criado {formatRelativeDate(data.createdAt)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" />
            {formatTime(new Date(data.createdAt))}
          </span>
        </div>
      </CardContent>

      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link href={`/my-rooms/${data.id}`}>
            <MessageSquare />
            Entrar na sala
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
