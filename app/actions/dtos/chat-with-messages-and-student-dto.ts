import { MessageDTO } from "./message-dto";

export type ChatWithMessagesAndStudentDTO = {
  id: string;
  student: {
    name: string;
  };
  messages: MessageDTO[];
  created_at: Date;
};
