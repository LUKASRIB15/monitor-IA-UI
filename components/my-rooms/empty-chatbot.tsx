"use client";

import { MessageSquare } from "lucide-react";
import { Button } from "@/shared/components/button";
import { cn } from "@/lib/utils";

interface EmptyChatBotProps {
  onStartConversation?: () => void;
  className?: string;
}

export function EmptyChatBot({
  onStartConversation,
  className,
}: EmptyChatBotProps) {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-6 overflow-hidden border bg-card p-8 text-center shadow-sm",
        className,
      )}
    >
      <div className="flex size-16 items-center justify-center rounded-full bg-muted">
        <MessageSquare className="size-8 text-muted-foreground" />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Nenhuma mensagem ainda
        </h2>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          Esta sala ainda está silenciosa. Mande sua primeira mensagem e inicie
          uma conversa sobre o assunto.
        </p>
      </div>
    </div>
  );
}
