"use client";

import type { DocumentDTO } from "@/app/actions/dtos/document-dto";
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
import { Badge } from "@/shared/components/badge";
import { Button } from "@/shared/components/button";
import { Card, CardContent } from "@/shared/components/card";
import { formatBytes } from "@/utils/format-bytes";
import { FileText, X } from "lucide-react";

type DocumentCardProps = {
  document: DocumentDTO;
  onDelete?: (id: string) => void;
};

export function DocumentCard({ document, onDelete }: DocumentCardProps) {
  return (
    <Card className="group relative transition-all hover:shadow-md">
      <CardContent className="flex items-center gap-4 p-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
          <FileText className="h-6 w-6 text-destructive" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-foreground">
            {document.name}
          </p>
          <div className="mt-1 flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {formatBytes(document.size)}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {document.size.toLocaleString()} bytes
            </span>
          </div>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 text-muted-foreground opacity-0 transition-opacity hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Excluir documento</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Excluir documento</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir &quot;{document.name}&quot;? Esta
                ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onDelete?.(document.id)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
