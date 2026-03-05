"use client";

import { Chatbot } from "@/components/my-rooms/chatbot";
import { ChatBotSkeleton } from "@/components/my-rooms/chatbot-skeleton";
import { useGetRoomWithChat } from "@/hooks/use-get-room-with-chat";
import { notFound, useParams } from "next/navigation";

type ParamsProps = {
  id: string;
};

export default function Room() {
  const { id } = useParams<ParamsProps>();
  const { room, chat, isLoadingData } = useGetRoomWithChat(id);

  if (isLoadingData) {
    return (
      <div className="px-6 h-full">
        <ChatBotSkeleton />
      </div>
    );
  }

  if (!room || !chat) {
    return notFound();
  }

  return (
    <div className="px-6 h-full">
      <Chatbot room={room} chat={chat} />
    </div>
  );
}
