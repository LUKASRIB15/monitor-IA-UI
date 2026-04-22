"use client";

import { InstructorChatbot } from "@/components/my-rooms/instructor-chatbot";
import { useParams } from "next/navigation";

type ParamsProps = {
  id: string;
  chat_id: string;
};

export default function StudentChatPage() {
  const { id, chat_id } = useParams<ParamsProps>();

  return (
    <div className="px-6 h-full">
      <InstructorChatbot roomId={id} chatId={chat_id} />
    </div>
  );
}
