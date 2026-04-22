"use client";

import { StudentChatbot } from "@/components/my-rooms/student-chatbot";
import { RoomSettings } from "@/components/my-rooms/room-settings/room-settings";
import { useAuthStore } from "@/store/auth";
import { useParams } from "next/navigation";

type ParamsProps = {
  id: string;
};

export default function Room() {
  const { userLogged } = useAuthStore();
  const { id } = useParams<ParamsProps>();

  if (!userLogged) {
    return null;
  }

  return (
    <div className="px-6 h-full">
      {userLogged.role === "STUDENT" ? (
        <StudentChatbot roomId={id} />
      ) : (
        <RoomSettings roomId={id} />
      )}
    </div>
  );
}
