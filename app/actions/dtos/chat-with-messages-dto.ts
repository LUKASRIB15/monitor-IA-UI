import { MessageDTO } from "./message-dto";

export type ChatWithMessagesDTO = {
  id: string;
  messages: MessageDTO[];
  created_at: Date;
};
