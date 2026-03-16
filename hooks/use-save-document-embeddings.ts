import { saveDocumentEmbeddingsAction } from "@/app/actions/save-document-embeddings";
import { toastError, toastSuccess, toastWarning } from "@/helpers/toasts";
import { useDocumentInProgressStore } from "@/store/document-in-progress";
import { useMutation } from "@tanstack/react-query";

export const useSaveDocumentEmbeddings = () => {
  const { addActiveDocumentId } = useDocumentInProgressStore();

  const { mutateAsync: execute, isPending } = useMutation({
    mutationFn: saveDocumentEmbeddingsAction,
    onSuccess: (result) => {
      if (result.ok) {
        const { documentInProgressId } = result;
        addActiveDocumentId(documentInProgressId);
        return toastSuccess(
          "Seu conteúdo foi salvo com successo em nossa base de dados!",
        );
      } else {
        const { statusCode } = result.error;

        switch (statusCode) {
          case 404:
            toastWarning(
              "Você não tem permissão para salvar conteúdos nesta sala!",
            );
            break;
          default:
            toastError(
              "Não foi possível salvar este conteúdo. Tente novamente mais tarde!",
            );
        }
      }
    },
  });

  return {
    execute,
    isPending,
  };
};
