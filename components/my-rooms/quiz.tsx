"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/card";
import { Button } from "@/shared/components/button";
import { Progress } from "@/shared/components/progress";
import { Badge } from "@/shared/components/badge";
import {
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetQuiz } from "@/hooks/use-get-quiz";
import { notFound } from "next/navigation";
import { QuizSkeleton } from "./quiz-skeleton";

export interface QuizProps {
  roomId: string;
  title: string;
  description?: string;
  onComplete?: (score: number, total: number) => void;
}

type AnswerState = "unanswered" | "correct" | "incorrect";

export function Quiz({ roomId, title, description, onComplete }: QuizProps) {
  const { quiz, isLoadingData, isFetching, isError } = useGetQuiz(roomId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>("unanswered");
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = quiz?.[currentQuestionIndex];
  const progress = quiz ? ((currentQuestionIndex + 1) / quiz.length) * 100 : 0;

  const shuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffledOptions = useMemo(() => {
    if (!currentQuestion) return [];
    return shuffleArray(currentQuestion.options);
  }, [currentQuestion]);

  if (isLoadingData || isFetching) {
    return (
      <div className="flex justify-center">
        <QuizSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Erro ao carregar o quiz. Tente novamente.
        </p>
      </div>
    );
  }

  if (!quiz || !currentQuestion) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Erro ao carregar o quiz. Tente novamente.
        </p>
      </div>
    );
  }

  const handleSelectOption = (option: string) => {
    if (answerState !== "unanswered") return;
    setSelectedOption(option);
  };

  const handleConfirmAnswer = () => {
    if (!selectedOption || answerState !== "unanswered") return;

    const isCorrect = selectedOption === currentQuestion.answer;
    setAnswerState(isCorrect ? "correct" : "incorrect");

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz!.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setAnswerState("unanswered");
    } else {
      setIsFinished(true);
      onComplete?.(score, quiz!.length);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setAnswerState("unanswered");
    setScore(0);
    setIsFinished(false);
  };

  const getOptionStyles = (option: string) => {
    if (answerState === "unanswered") {
      return cn(
        "cursor-pointer border-2 transition-all hover:border-primary hover:bg-primary/5",
        selectedOption === option
          ? "border-primary bg-primary/10"
          : "border-border",
      );
    }

    const isCorrectOption = option === currentQuestion.answer;
    const isSelected = option === selectedOption;

    if (isCorrectOption) {
      return "border-2 border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100";
    }

    if (isSelected && !isCorrectOption) {
      return "border-2 border-destructive bg-destructive/10 text-destructive";
    }

    return "border-2 border-border opacity-50";
  };

  const getScoreMessage = () => {
    const percentage = (score / quiz!.length) * 100;
    if (percentage === 100) return "Perfeito! Voce acertou todas!";
    if (percentage >= 80) return "Excelente! Otimo desempenho!";
    if (percentage >= 60) return "Bom trabalho! Continue praticando.";
    if (percentage >= 40) return "Voce pode melhorar. Tente novamente!";
    return "Nao desanime! Revise o conteudo e tente de novo.";
  };

  const getScoreColor = () => {
    const percentage = (score / quiz!.length) * 100;
    if (percentage >= 80) return "text-emerald-600 dark:text-emerald-400";
    if (percentage >= 60) return "text-amber-600 dark:text-amber-400";
    return "text-destructive";
  };

  // Tela de Resultado Final
  if (isFinished) {
    const percentage = Math.round((score / quiz!.length) * 100);

    return (
      <div className="flex justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-primary/10">
              <Trophy className="size-10 text-primary" />
            </div>
            <CardTitle className="text-2xl">Quiz Finalizado!</CardTitle>
            <CardDescription>{getScoreMessage()}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="rounded-xl bg-muted/50 p-6 text-center">
              <p className="mb-2 text-sm text-muted-foreground">
                Sua pontuacao
              </p>
              <p className={cn("text-5xl font-bold", getScoreColor())}>
                {score}/{quiz!.length}
              </p>
              <p className="mt-2 text-lg text-muted-foreground">
                {percentage}% de acertos
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">
                Resumo
              </p>
              <div className="flex gap-4">
                <div className="flex flex-1 items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-800 dark:bg-emerald-950">
                  <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
                      Acertos
                    </p>
                    <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                      {score}
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-950">
                  <XCircle className="size-5 text-red-600 dark:text-red-400" />
                  <div>
                    <p className="text-sm font-medium text-red-900 dark:text-red-100">
                      Erros
                    </p>
                    <p className="text-xl font-bold text-red-600 dark:text-red-400">
                      {quiz!.length - score}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button onClick={handleRestart} className="w-full" size="lg">
              <RotateCcw className="mr-2 size-4" />
              Tentar Novamente
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-full">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="mb-4 flex items-center justify-between">
            <Badge variant="secondary">
              Pergunta {currentQuestionIndex + 1} de {quiz!.length}
            </Badge>
            <Badge variant="outline" className="gap-1">
              <CheckCircle2 className="size-3" />
              {score} acerto{score !== 1 ? "s" : ""}
            </Badge>
          </div>

          <Progress value={progress} className="mb-4 h-2" />

          <CardTitle className="text-xl">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted/50 p-4">
            <p className="text-lg font-medium">{currentQuestion.question}</p>
          </div>

          <div className="space-y-3">
            {shuffledOptions.map((option) => {
              const isCorrectOption = option === currentQuestion.answer;
              const isSelected = option === selectedOption;

              return (
                <button
                  key={option}
                  onClick={() => handleSelectOption(option)}
                  disabled={answerState !== "unanswered"}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl p-4 text-left transition-all",
                    getOptionStyles(option),
                  )}
                >
                  <div
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors",
                      answerState === "unanswered"
                        ? isSelected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-muted-foreground/30"
                        : isCorrectOption
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : isSelected
                            ? "border-destructive bg-destructive text-destructive-foreground"
                            : "border-muted-foreground/30",
                    )}
                  >
                    {answerState !== "unanswered" && isCorrectOption ? (
                      <CheckCircle2 className="size-5" />
                    ) : answerState !== "unanswered" &&
                      isSelected &&
                      !isCorrectOption ? (
                      <XCircle className="size-5" />
                    ) : (
                      String.fromCharCode(
                        65 + currentQuestion.options.indexOf(option),
                      )
                    )}
                  </div>
                  <span className="flex-1">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Feedback de resposta */}
          {answerState !== "unanswered" && (
            <div
              className={cn(
                "flex items-center gap-3 rounded-lg p-4",
                answerState === "correct"
                  ? "bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100"
                  : "bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100",
              )}
            >
              {answerState === "correct" ? (
                <>
                  <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-medium">Correto! Muito bem!</span>
                </>
              ) : (
                <>
                  <XCircle className="size-5 text-red-600 dark:text-red-400" />
                  <span className="font-medium">
                    Incorreto. A resposta certa era:{" "}
                    {currentQuestion.options.find(
                      (option) => option === currentQuestion.answer,
                    )}
                  </span>
                </>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex gap-3">
          {answerState === "unanswered" ? (
            <Button
              onClick={handleConfirmAnswer}
              disabled={!selectedOption}
              className="w-full"
              size="lg"
            >
              Confirmar Resposta
            </Button>
          ) : (
            <Button onClick={handleNextQuestion} className="w-full" size="lg">
              {currentQuestionIndex < quiz!.length - 1 ? (
                <>
                  Proxima Pergunta
                  <ChevronRight className="ml-2 size-4" />
                </>
              ) : (
                <>
                  Ver Resultado
                  <Trophy className="ml-2 size-4" />
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
