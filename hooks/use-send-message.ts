import { sendMessageAction } from "@/app/actions/send-message";
import { toastError, toastWarning } from "@/helpers/toasts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RoomsQueryKeysEnum } from "./enums/rooms-query-keys";
import { RoomDTO } from "@/app/actions/dtos/room-dto";
import { ChatWithMessagesDTO } from "@/app/actions/dtos/chat-with-messages-dto";

type OldDataProps = {
  room: RoomDTO;
  chat: ChatWithMessagesDTO;
};

type SendMessageProps = {
  message: string;
  chatId: string;
};

export const useSendMessage = (roomId: string) => {
  const queryClient = useQueryClient();

  const { mutateAsync: execute, isPending } = useMutation({
    mutationFn: async (data: SendMessageProps) => {
      queryClient.setQueryData(
        [RoomsQueryKeysEnum.GET_ROOM, roomId],
        (oldData: OldDataProps) => {
          if (!oldData) {
            return oldData;
          }

          const studentMessage = {
            id: crypto.randomUUID(),
            content: data.message,
            role: "STUDENT",
            created_at: new Date(),
          };

          return {
            ...oldData,
            chat: {
              ...oldData.chat,
              messages: [...oldData.chat.messages, studentMessage],
            },
          };
        },
      );
      return await sendMessageAction({
        message: data.message,
        chatId: data.chatId,
      });
    },

    onSuccess: (result) => {
      if (result.ok) {
        const { message } = result;

        queryClient.setQueryData(
          [RoomsQueryKeysEnum.GET_ROOM, roomId],
          (oldData: OldDataProps) => {
            if (!oldData) {
              return oldData;
            }

            return {
              ...oldData,
              chat: {
                ...oldData.chat,
                messages: [...oldData.chat.messages, message],
              },
            };
          },
        );
      } else {
        const { statusCode } = result.error;

        switch (statusCode) {
          case 404:
            toastWarning("Não foi possível enviar mensagem para este chat.");
            break;
          default:
            toastError(
              "Ops! Não foi possível enviar uma mensagem. Tente novamente mais tarde!",
            );
        }
      }
    },
  });

  return {
    execute,
    isExecuting: isPending,
  };
};
