"use client";

import { Chatbot } from "@/components/my-rooms/chatbot";
import { RoomSettings } from "@/components/my-rooms/room-settings/room-settings";
import { useAuthStore } from "@/store/auth";
import { notFound, useParams } from "next/navigation";

type ParamsProps = {
  id: string;
};

export default function Room() {
  const { userLogged } = useAuthStore();
  const { id } = useParams<ParamsProps>();

  if (!userLogged) {
    return notFound();
  }

  return (
    <div className="px-6 h-full">
      {userLogged.role === "STUDENT" ? (
        <Chatbot roomId={id} />
      ) : (
        <RoomSettings roomId={id} />
      )}
    </div>
  );
}
