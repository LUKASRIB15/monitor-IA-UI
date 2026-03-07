import { Sparkles } from "lucide-react";

export function MessageBubbleTyping() {
  return (
    <div className="flex items-center py-2">
      <div className="flex items-center gap-2 rounded-2xl rounded-bl-md text-foreground bg-muted/60 px-4 py-2.5">
        <Sparkles className="size-4 animate-pulse text-primary" />
        <span className="text-sm text-muted-foreground">
          Montando uma resposta. Aguarde...
        </span>
      </div>
    </div>
  );
}
