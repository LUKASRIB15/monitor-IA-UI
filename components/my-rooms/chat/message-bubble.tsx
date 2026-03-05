import { MessageDTO } from "@/app/actions/dtos/message-dto";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/shared/components/avatar";
import { formatTime } from "@/utils/format-time";

type MessageBubbleProps = {
  message: MessageDTO;
};

export function MessageBubble({ message }: MessageBubbleProps) {
  const isStudent = message.role === "STUDENT";

  return (
    <div
      className={cn(
        "flex items-end gap-2",
        isStudent ? "flex-row-reverse" : "flex-row",
      )}
    >
      {/* {!isStudent && (
        <Avatar className="size-7">
          <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
            {message.senderName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )} */}

      <div
        className={cn(
          "flex max-w-[75%] flex-col gap-0.5",
          isStudent ? "items-end" : "items-start",
        )}
      >
        {/* {!isStudent && (
          <span className="px-1 text-xs font-medium text-muted-foreground">
            {message.senderName}
          </span>
        )} */}
        <div
          className={cn(
            "rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
            isStudent
              ? "rounded-br-md bg-primary text-primary-foreground"
              : "rounded-bl-md bg-muted text-foreground",
          )}
        >
          {message.content}
        </div>
        <span className="px-1 text-[10px] text-muted-foreground/70">
          {formatTime(new Date(message.created_at))}
        </span>
      </div>
    </div>
  );
}
