import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/shared/components/avatar";
import { Bot, Sparkles } from "lucide-react";

export function MessageBubbleTyping() {
  return (
    <div className="flex items-center py-2 gap-2">
      <Avatar
        className={cn(
          "size-8 shrink-0 bg-violet-100 text-violet-600 dark:bg-violet-900 dark:text-violet-300",
        )}
      >
        <AvatarFallback className="bg-violet-100 text-violet-600 dark:bg-violet-900 dark:text-violet-300">
          <Bot className="size-4" />
        </AvatarFallback>
      </Avatar>
      <div className="flex items-center gap-2 rounded-2xl rounded-bl-md text-foreground bg-muted/60 px-4 py-2.5">
        <Sparkles className="size-4 animate-pulse text-primary" />
        <span className="text-sm text-muted-foreground">
          Montando uma resposta. Aguarde...
        </span>
      </div>
    </div>
  );
}
