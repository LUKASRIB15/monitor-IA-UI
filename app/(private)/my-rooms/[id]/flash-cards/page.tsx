"use client";

import { FlashCards } from "@/components/my-rooms/flash-cards";
import { useParams } from "next/navigation";

type ParamsProps = {
  id: string;
};

export default function FlashCardsPage() {
  const { id } = useParams<ParamsProps>();

  return (
    <div>
      <FlashCards roomId={id} />
    </div>
  );
}
