"use client";

import { RoomCard } from "@/components/my-rooms/room-card";
import { useFetchRooms } from "@/hooks/use-fetch-rooms";
import { Button } from "@/shared/components/button";
import { DoorOpen } from "lucide-react";

export default function MyRooms() {
  const { rooms } = useFetchRooms();

  return (
    <div className="h-full">
      {rooms.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 px-6">
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              data={{ ...room, createdAt: room.created_at.toString() }}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8 text-center h-full">
          <div className="flex size-16 items-center justify-center rounded-full bg-muted">
            <DoorOpen className="size-8 text-muted-foreground" />
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Você não está em nenhuma sala
            </h2>
            <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
              Participe de uma sala para começar seus estudos autônomos sobre um
              assunto que deseja aprender.
            </p>
          </div>

          <Button>Entrar em uma sala</Button>
        </div>
      )}
    </div>
  );
}
