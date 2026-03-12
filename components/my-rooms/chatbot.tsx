"use client";

import { useRef, useEffect, useCallback } from "react";
import { Button } from "@/shared/components/button";
import { ScrollArea } from "@/shared/components/scroll-area";
import { Separator } from "@/shared/components/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/tooltip";
import { cn } from "@/lib/utils";
import { SendHorizonal, SmilePlus, MessageSquare } from "lucide-react";
import { EmptyChatBot } from "./empty-chatbot";
import { MessageBubble } from "./chat/message-bubble";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSendMessage } from "@/hooks/use-send-message";
import { MessageBubbleTyping } from "./chat/message-bubble-typing";
import { useGetRoomWithChat } from "@/hooks/use-get-room-with-chat";
import { notFound, useRouter } from "next/navigation";
import { ChatBotSkeleton } from "./chatbot-skeleton";

const chatbotValidationSchema = z.object({
  inputText: z.string(),
});

type ChatBotData = z.infer<typeof chatbotValidationSchema>;

type ChatbotProps = {
  roomId: string;
};

export function Chatbot({ roomId }: ChatbotProps) {
  const { room, chat, isLoadingData } = useGetRoomWithChat(roomId);

  const sendMessage = useSendMessage(roomId);
  const { handleSubmit, control, watch, reset } = useForm<ChatBotData>({
    resolver: zodResolver(chatbotValidationSchema),
    defaultValues: {
      inputText: "",
    },
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const isInvalidMessage = watch("inputText").trim().length === 0;

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      const viewport = scrollRef.current.querySelector(
        "[data-slot='scroll-area-viewport']",
      );
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, []);

  async function handleSend(data: ChatBotData) {
    reset();
    const { inputText } = data;

    await sendMessage.execute({
      chatId: chat!.id,
      message: inputText,
    });

    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(handleSend)();
    }
  }

  useEffect(() => {
    if (!chat) return;

    scrollToBottom();
  }, [chat?.messages, scrollToBottom]);

  if (isLoadingData) {
    return (
      <div className=" h-full">
        <ChatBotSkeleton />
      </div>
    );
  }

  if (!room || !chat) {
    return notFound();
  }

  return (
    <div
      className={cn(
        "flex h-[calc(100vh-112px)] w-full flex-col overflow-hidden rounded-xl border bg-card shadow-sm",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
            <MessageSquare className="size-4 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground leading-tight">
              {room.title}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {/* <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label="Ver membros">
                <Users className="size-4 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Membros</TooltipContent>
          </Tooltip> */}
        </div>
      </div>

      <Separator />

      {/* Messages */}
      {chat.messages.length > 0 ? (
        <ScrollArea ref={scrollRef} className="min-h-0 flex-1 px-5">
          <div className="flex min-h-full flex-col justify-end gap-4 py-4">
            {chat.messages.map((msg, index) => (
              <div key={msg.id}>
                {msg.content.length > 0 && (
                  <MessageBubble key={index} message={msg} />
                )}
                {msg.role === "AI" && msg.content.length === 0 && (
                  <MessageBubbleTyping />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <EmptyChatBot />
      )}

      <Separator />

      {/* Input */}
      <form
        onSubmit={handleSubmit(handleSend)}
        className="flex items-end gap-2 px-4 py-3"
      >
        {/* <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="mb-0.5 shrink-0"
              aria-label="Anexar arquivo"
            >
              <Paperclip className="size-4 text-muted-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Anexar</TooltipContent>
        </Tooltip> */}

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="mb-0.5 shrink-0"
              aria-label="Adicionar emoji"
            >
              <SmilePlus className="size-4 text-muted-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Emoji</TooltipContent>
        </Tooltip>

        <div className="relative flex-1">
          <Controller
            control={control}
            name="inputText"
            render={({ field }) => (
              <textarea
                ref={inputRef}
                onKeyDown={handleKeyDown}
                placeholder="Escreva uma mensagem..."
                rows={1}
                className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <Button
          type="submit"
          size="icon"
          disabled={isInvalidMessage}
          className="mb-0.5 shrink-0"
          aria-label="Enviar mensagem"
        >
          <SendHorizonal className="size-4" />
        </Button>
      </form>
    </div>
  );
}
