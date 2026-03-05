export type MessageDTO = {
  id: string;
  content: string;
  role: "AI" | "STUDENT";
  created_at: Date;
};
