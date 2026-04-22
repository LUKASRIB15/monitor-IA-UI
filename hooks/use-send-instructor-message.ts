import { sendInstructorMessageAction } from "@/app/actions/send-instructor-message";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RoomsQueryKeysEnum } from "./enums/rooms-query-keys";
import { ChatWithMessagesAndStudentDTO } from "@/app/actions/dtos/chat-with-messages-and-student-dto";

type OldDataProps = {
  room_title: string;
  chat: ChatWithMessagesAndStudentDTO;
};

export const useSendInstructorMessage = ({
  roomId,
  chatId,
}: {
  roomId: string;
  chatId: string;
}) => {
  const queryClient = useQueryClient();

  const { mutateAsync: execute } = useMutation({
    mutationFn: async ({
      message,
      studentId,
    }: {
      message: string;
      studentId: string;
    }) =>
      await sendInstructorMessageAction({
        chatId,
        studentId,
        message,
      }),

    onSuccess: (result) => {
      if (!result.ok) return;

      queryClient.setQueryData(
        [RoomsQueryKeysEnum.GET_CHAT, roomId, chatId],
        (oldData: OldDataProps) => {
          if (!oldData) return oldData;

          const instructorMessageId = crypto.randomUUID();

          const instructorMessage = {
            id: instructorMessageId,
            content: result.instructor_message,
            role: "INSTRUCTOR",
            created_at: new Date(),
          };

          return {
            ...oldData,
            chat: {
              ...oldData.chat,
              messages: [...oldData.chat.messages, instructorMessage],
            },
          };
        },
      );
    },
  });

  return {
    execute,
  };
};
