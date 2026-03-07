import { toastError, toastWarning } from "@/helpers/toasts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RoomsQueryKeysEnum } from "./enums/rooms-query-keys";
import { RoomDTO } from "@/app/actions/dtos/room-dto";
import { ChatWithMessagesDTO } from "@/app/actions/dtos/chat-with-messages-dto";
import { sendMessageToAIAction } from "@/app/actions/send-message";

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

  const execute = async ({ message, chatId }: SendMessageProps) => {
    const studentMessage = {
      id: crypto.randomUUID(),
      content: message,
      role: "STUDENT",
      created_at: new Date(),
    };

    const aiMessageId = crypto.randomUUID();

    const aiMessage = {
      id: aiMessageId,
      content: "",
      role: "AI",
      created_at: new Date(),
    };

    // optimistic update
    queryClient.setQueryData(
      [RoomsQueryKeysEnum.GET_ROOM, roomId],
      (oldData: OldDataProps) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          chat: {
            ...oldData.chat,
            messages: [...oldData.chat.messages, studentMessage, aiMessage],
          },
        };
      },
    );

    try {
      await sendMessageToAIAction({
        chatId,
        message,
        onChunk(chunk) {
          queryClient.setQueryData(
            [RoomsQueryKeysEnum.GET_ROOM, roomId],
            (oldData: OldDataProps | undefined) => {
              if (!oldData || !oldData.chat) return oldData;

              return {
                ...oldData,
                chat: {
                  ...oldData.chat,
                  messages: oldData.chat.messages.map((msg) =>
                    msg.id === aiMessageId
                      ? { ...msg, content: msg.content + chunk }
                      : msg,
                  ),
                },
              };
            },
          );
        },
      });
    } catch {
      toastError("Erro ao gerar resposta da IA.");
    }
  };

  return {
    execute,
    // isExecuting: isPending,
  };
};
