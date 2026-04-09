import { generateNewFlashCardAction } from "@/app/actions/generate-new-flash-cards";
import { toastError, toastSuccess } from "@/helpers/toasts";
import { useMutation } from "@tanstack/react-query";

export const useGenerateNewFlashCards = () => {
  const { mutateAsync: execute, isPending } = useMutation({
    mutationFn: generateNewFlashCardAction,
    onSuccess: (result) => {
      if (result.ok) {
        toastSuccess("Seus flash cards foram criados com sucesso.");
      } else {
        const { statusCode } = result.error;

        switch (statusCode) {
          case 401:
            toastError("Você não tem permissão para criar um quiz desta sala!");
          case 404:
            toastError("Você e/ou esta sala não foram encontrados!");
          default:
            toastError(
              "Não foi possível criar um quiz. Tente novamente mais tarde!",
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
