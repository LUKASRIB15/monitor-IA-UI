"use client";

import { useState } from "react";
import { Card, CardContent } from "@/shared/components/card";
import { Button } from "@/shared/components/button";
import { Badge } from "@/shared/components/badge";
import { ArrowLeft, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFetchFlashCards } from "@/hooks/use-fetch-flash-cards";
import { FlashCardDTO } from "@/app/actions/dtos/flash-card-dto";
import { FlashCardsSkeleton } from "./flash-cards-skeleton";
import { useRouter } from "next/navigation";

interface FlashCardProps {
  card: FlashCardDTO;
  isFlipped: boolean;
  onFlip: () => void;
}

function FlashCard({ card, isFlipped, onFlip }: FlashCardProps) {
  return (
    <div
      className="relative h-80 w-full cursor-pointer perspective-1000"
      onClick={onFlip}
    >
      <div
        className={cn(
          "relative h-full w-full transition-transform duration-500 transform-style-3d",
          isFlipped && "rotate-y-180",
        )}
      >
        {/* Frente - Pergunta */}
        <Card className="absolute inset-0 flex items-center justify-center backface-hidden border-2 bg-linear-to-br from-primary/5 to-primary/10">
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
            <Badge variant="outline" className="mb-2">
              Pergunta
            </Badge>
            <p className="text-xl font-medium leading-relaxed text-foreground">
              {card.question}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Clique para ver a resposta
            </p>
          </CardContent>
        </Card>

        {/* Verso - Resposta */}
        <Card className="absolute inset-0 flex items-center justify-center backface-hidden rotate-y-180 border-2 border-emerald-500/30 bg-linear-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/30">
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
            <Badge className="mb-2 bg-emerald-500 hover:bg-emerald-600">
              <Sparkles className="mr-1 h-3 w-3" />
              Resposta
            </Badge>
            <p className="text-xl font-medium leading-relaxed text-foreground">
              {card.answer}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Clique para voltar
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface FlashCardsProps {
  roomId: string;
  title?: string;
  description?: string;
}

export function FlashCards({
  roomId,
  title = "Flash Cards",
  description = "Clique no card para revelar a resposta",
}: FlashCardsProps) {
  const { flash_cards, isError, isFetching, isLoadingData } =
    useFetchFlashCards(roomId);

  const route = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCurrentFlipped, setIsCurrentFlipped] = useState(false);

  const currentCard = flash_cards?.[currentIndex];

  if (isLoadingData || isFetching) {
    return (
      <div className="flex justify-center">
        <FlashCardsSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Erro ao carregar os flash cards. Tente novamente.
        </p>
      </div>
    );
  }

  if (!flash_cards) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Erro ao carregar os flash cards. Tente novamente.
        </p>
      </div>
    );
  }

  const handleFlip = () => {
    setIsCurrentFlipped(!isCurrentFlipped);
  };

  const goToNext = () => {
    if (currentIndex < flash_cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsCurrentFlipped(false);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsCurrentFlipped(false);
    }
  };

  const isLastCard = currentIndex === flash_cards.length - 1;
  const isFirstCard = currentIndex === 0;

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardContent className="flex flex-col gap-6 p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold">{title}</h2>
              {/* <p className="text-muted-foreground">{description}</p> */}
            </div>
            <Button variant="ghost" size="icon" onClick={() => route.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </div>
          {/* Card */}
          <FlashCard
            card={currentCard!}
            isFlipped={isCurrentFlipped}
            onFlip={handleFlip}
          />

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              onClick={goToPrevious}
              disabled={isFirstCard}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>

            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} / {flash_cards.length}
            </span>

            <Button onClick={goToNext} disabled={isLastCard}>
              Próximo
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
