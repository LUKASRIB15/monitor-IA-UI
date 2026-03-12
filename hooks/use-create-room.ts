import { createRoomAction } from "@/app/actions/create-room";
import { toastError, toastWarning } from "@/helpers/toasts";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useCreateRoom = () => {
  const router = useRouter();

  const { mutateAsync: execute } = useMutation({
    mutationFn: createRoomAction,
    onSuccess: (result) => {
      if (result.ok) {
        const { room } = result;

        router.push(`/my-rooms/${room.id}`);
      } else {
        const { statusCode } = result.error;

        switch (statusCode) {
          case 404:
            toastWarning(
              "Você não tem permissão para criar uma sala. Crie uma conta em nossa plataforma!",
            );
            break;
          default:
            toastError(
              "Não foi possível criar uma sala. Tente novamente mais tarde!",
            );
        }
      }
    },
  });

  return {
    execute,
  };
};
