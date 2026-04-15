"use client";

import { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/card";
import { Button } from "@/shared/components/button";
import { Separator } from "@/shared/components/separator";
import { Badge } from "@/shared/components/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/alert-dialog";
import { Pencil, Trash2, FileText, Upload, X, Loader2 } from "lucide-react";
import { useGetRoomWithDocuments } from "@/hooks/use-get-with-documents";
import { notFound } from "next/navigation";
import { RoomSettingsSkeleton } from "./room-settings-skeleton";
import { useSaveDocumentEmbeddings } from "@/hooks/use-save-document-embeddings";
import { formatBytes } from "@/utils/format-bytes";
import { DocumentCard } from "./document-card";
import { RoomsQueryKeysEnum } from "@/hooks/enums/rooms-query-keys";
import { useQueryClient } from "@tanstack/react-query";
import { useFetchAllChatsByRoom } from "@/hooks/use-fetch-all-chats-by-room";
import { ChatCard } from "./chat-card";

interface RoomSettingsProps {
  roomId: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onDeleteDocument?: (documentId: string) => void;
}

export function RoomSettings({
  roomId,
  onEdit,
  onDelete,
  onDeleteDocument,
}: RoomSettingsProps) {
  const queryClient = useQueryClient();
  const {
    room,
    documents,
    isLoadingData: isLoadingRoomData,
  } = useGetRoomWithDocuments(roomId);
  const { chats, isLoadingData: isLoadingChatsData } =
    useFetchAllChatsByRoom(roomId);

  const saveDocumentEmbeddings = useSaveDocumentEmbeddings();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    }
  };

  async function handleSaveDocument() {
    if (selectedFile) {
      await saveDocumentEmbeddings.execute({
        roomId,
        file: selectedFile,
      });
      await queryClient.invalidateQueries({
        queryKey: [RoomsQueryKeysEnum.GET_ROOM, roomId],
      });
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  const handleRemoveSelected = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (isLoadingRoomData || isLoadingChatsData) {
    return (
      <div className="h-full">
        <RoomSettingsSkeleton />
      </div>
    );
  }

  if (!room) {
    return notFound();
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="space-y-1.5">
          <CardTitle className="text-2xl">{room.title}</CardTitle>
          <CardDescription className="text-base">
            {room.description}
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onEdit}
            className="h-9 w-9"
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Editar sala</span>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Excluir sala</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Excluir sala</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja excluir a sala &quot;{room.title}
                  &quot;? Todos os materiais serão removidos permanentemente.
                  Esta ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={onDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Excluir sala
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="space-y-6 pt-6">
        {/* Seção de Upload */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Adicionar material</h3>

          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileSelect}
              className="hidden"
            />
            <div className="flex flex-col items-center gap-3">
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-full transition-colors ${
                  isDragging ? "bg-primary/10" : "bg-muted"
                }`}
              >
                <Upload
                  className={`h-6 w-6 transition-colors ${
                    isDragging ? "text-primary" : "text-muted-foreground"
                  }`}
                />
              </div>
              <div>
                <p className="font-medium text-foreground">
                  {isDragging
                    ? "Solte o arquivo aqui"
                    : "Clique ou arraste um arquivo"}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Apenas arquivos PDF
                </p>
              </div>
            </div>
          </div>

          {/* Arquivo selecionado */}
          {selectedFile && (
            <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                  <FileText className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {selectedFile.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatBytes(selectedFile.size)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRemoveSelected}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          <Button
            onClick={handleSaveDocument}
            disabled={!selectedFile || saveDocumentEmbeddings.isPending}
            className="w-full"
          >
            {saveDocumentEmbeddings.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Enviar material
              </>
            )}
          </Button>
        </div>

        <Separator />

        {/* Lista de Documentos */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Materiais da sala</h3>
            <Badge variant="outline">{documents!.length} materiais</Badge>
          </div>

          {documents!.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 font-medium text-muted-foreground">
                Nenhum material ainda
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Adicione materiais usando o campo acima
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {documents!.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  document={doc}
                  onDelete={onDeleteDocument}
                  documentInProgressId={doc.progress_id}
                />
              ))}
            </div>
          )}
        </div>
        {chats && chats.length > 0 && (
          <>
            <Separator />

            {/* Lista de Chats */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Conversas dos alunos</h3>
                <Badge variant="outline">{chats.length} conversas</Badge>
              </div>

              <div className="space-y-3">
                {chats.map((chat) => (
                  <ChatCard key={chat.id} chat={chat} onClick={() => {}} />
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
