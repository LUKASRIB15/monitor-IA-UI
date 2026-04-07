"use client";

import { Quiz } from "@/components/my-rooms/quiz";
import { useGetQuiz } from "@/hooks/use-get-quiz";
import { useParams } from "next/navigation";

type ParamsProps = {
  id: string;
};

export default function QuizPage() {
  const { id } = useParams<ParamsProps>();

  return (
    <div>
      <Quiz roomId={id} title="TextExample" />
    </div>
  );
}
