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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/shared/components/input-otp";
import { SidebarMenuButton } from "@/shared/components/sidebar";
import { IconCirclePlusFilled } from "@tabler/icons-react";
import { useAuthStore } from "@/store/auth";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEnterRoom } from "@/hooks/use-enter-room";

const enterRoomFormSchema = z.object({
  code: z.string().min(6).max(6),
});

type EnterRoomFormData = z.infer<typeof enterRoomFormSchema>;

export function EnterRoomDialog() {
  const [open, setOpen] = useState(false);
  const { userLogged } = useAuthStore();
  const enterRoom = useEnterRoom();
  const { handleSubmit, control, reset, watch } = useForm<EnterRoomFormData>({
    resolver: zodResolver(enterRoomFormSchema),
    defaultValues: {
      code: "",
    },
  });

  const isInvalidCode = watch("code").length !== 6;

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen);
    if (!isOpen) {
      reset();
    }
  }

  async function handleEnterRoom(data: EnterRoomFormData) {
    await enterRoom.execute({ ...data, code: data.code.toLocaleUpperCase() });
    setOpen(false);
    reset();
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <SidebarMenuButton
          tooltip={"Entrar em uma sala"}
          className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
        >
          <IconCirclePlusFilled />
          <span>Entrar em uma sala</span>
        </SidebarMenuButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center sm:text-center">
          <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10">
            <DoorOpen className="size-6 text-primary" />
          </div>
          <DialogTitle className="text-xl">Entrar em uma sala</DialogTitle>
          <DialogDescription>
            Digite o codigo de 6 digitos compartilhado pelo instrutor da sala.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-6 py-4">
          <Controller
            control={control}
            name="code"
            render={({ field }) => (
              <InputOTP
                maxLength={6}
                value={field.value}
                onChange={field.onChange}
                onComplete={handleSubmit}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="uppercase" />
                  <InputOTPSlot index={1} className="uppercase" />
                  <InputOTPSlot index={2} className="uppercase" />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} className="uppercase" />
                  <InputOTPSlot index={4} className="uppercase" />
                  <InputOTPSlot index={5} className="uppercase" />
                </InputOTPGroup>
              </InputOTP>
            )}
          />
        </div>

        <DialogFooter className="sm:justify-center">
          <Button
            onClick={handleSubmit(handleEnterRoom)}
            disabled={isInvalidCode}
            className="w-full sm:w-auto"
          >
            Entrar na sala
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
