import { enterRoomAction } from "@/app/actions/enter-room";
import { toastError, toastWarning } from "@/helpers/toasts";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useEnterRoom = () => {
  const router = useRouter();

  const { mutateAsync: execute } = useMutation({
    mutationFn: enterRoomAction,
    onSuccess: (result) => {
      if (result.ok) {
        const { roomId } = result;

        router.push(`/my-rooms/${roomId}`);
      } else {
        const { statusCode } = result.error;

        switch (statusCode) {
          case 404:
            toastWarning(
              "Você não tem permissão para entrar nesta sala. Crie uma conta em nossa plataforma!",
            );
            break;
          case 401:
            toastWarning(
              "Ops! Este código é inválido. Adicione um código válido para entrar em uma sala.",
            );
            break;
          default:
            toastError(
              "Não foi possível entrar em uma sala. Tente novamente mais tarde!",
            );
        }
      }
    },
  });

  return {
    execute,
  };
};
