"use client";

import { useState } from "react";
import { DoorOpen } from "lucide-react";
import { Button } from "@/shared/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/shared/components/dialog";
import { Input } from "@/shared/components/input";
import { Textarea } from "@/shared/components/textarea";
import { Label } from "@/shared/components/label";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SidebarMenuButton } from "@/shared/components/sidebar";
import { IconCirclePlusFilled } from "@tabler/icons-react";
import { useCreateRoom } from "@/hooks/use-create-room";

const createRoomFormSchema = z.object({
  title: z.string(),
  description: z.string(),
});

type CreateRoomFormData = z.infer<typeof createRoomFormSchema>;

export function CreateRoomDialog() {
  const [open, setOpen] = useState(false);
  const createRoom = useCreateRoom();

  const { handleSubmit, register, watch, reset } = useForm<CreateRoomFormData>({
    resolver: zodResolver(createRoomFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const isInvalidData =
    watch("title").trim().length === 0 ||
    watch("description").trim().length === 0;

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen);
    if (!isOpen) {
      reset();
    }
  }

  async function handleCreateRoom(data: CreateRoomFormData) {
    await createRoom.execute(data);
    setOpen(false);
    reset();
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <SidebarMenuButton
          tooltip={"Criar sala"}
          className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
        >
          <IconCirclePlusFilled />
          <span>Criar sala</span>
        </SidebarMenuButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center sm:text-center">
          <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10">
            <DoorOpen className="size-6 text-primary" />
          </div>
          <DialogTitle className="text-xl">Criar uma sala</DialogTitle>
          <DialogDescription>
            Preencha as informacoes abaixo para criar uma nova sala para seus
            estudantes.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleCreateRoom)}
          className="flex flex-col gap-4 py-4"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="room-name">Nome da sala</Label>
            <Input
              id="room-name"
              placeholder="Ex: Projeto Alpha"
              autoFocus
              {...register("title")}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="room-description">Descrição </Label>
            <Textarea
              id="room-description"
              placeholder="Descreva brevemente o proposito da sala..."
              className="min-h-24 resize-none"
              {...register("description")}
            />
          </div>

          <DialogFooter className="pt-2 sm:justify-center">
            <Button
              type="submit"
              disabled={isInvalidData}
              className="w-full sm:w-auto"
            >
              Criar sala
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
