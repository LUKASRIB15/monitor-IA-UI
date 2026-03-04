import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/shared/components/card";
import { Button } from "@/shared/components/button";
import {
  DoorOpen,
  Calendar,
  Clock,
  MessageCircleCheck,
  MessageCircle,
} from "lucide-react";

type Room = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
};

interface RoomCardProps {
  data: Room;
}

function formatRelativeDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) return "Agora mesmo";
  if (diffMinutes < 60) return `${diffMinutes}min atr\u00e1s`;
  if (diffHours < 24) return `${diffHours}h atr\u00e1s`;
  if (diffDays < 7) return `${diffDays}d atr\u00e1s`;

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(dateString: string) {
  return new Date(dateString).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
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
            {formatRelativeDate(data.createdAt)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" />
            {formatTime(data.createdAt)}
          </span>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => {}}
        >
          <MessageCircle />
          Entrar na sala
        </Button>
      </CardFooter>
    </Card>
  );
}
