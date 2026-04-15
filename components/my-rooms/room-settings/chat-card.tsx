import { ChatWithMessagesAndStudentDTO } from "@/app/actions/dtos/chat-with-messages-and-student-dto";
import { Card, CardContent } from "@/shared/components/card";
import { formatRelativeDate } from "@/utils/format-relative-date";
import { ChevronRight, MessageCircle } from "lucide-react";

export function ChatCard({
  chat,
  onClick,
}: {
  chat: ChatWithMessagesAndStudentDTO;
  onClick?: (id: string) => void;
}) {
  return (
    <Card
      className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/50"
      onClick={() => onClick?.(chat.id)}
    >
      <CardContent className="flex items-center gap-4 p-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <MessageCircle className="h-6 w-6 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-foreground">
            {chat.student.name}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Criado em {formatRelativeDate(chat.created_at.toString())}
          </p>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
      </CardContent>
    </Card>
  );
}
