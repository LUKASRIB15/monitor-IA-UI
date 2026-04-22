import { MessageDTO } from "./message-dto";

export type ChatWithMessagesAndStudentDTO = {
  id: string;
  student: {
    id: string;
    name: string;
  };
  messages: MessageDTO[];
  created_at: Date;
};
