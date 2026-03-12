import { authenticateInstructorAccountAction } from "@/app/actions/authenticate-instructor-account";
import { toastError, toastWarning } from "@/helpers/toasts";
import { useAuthStore } from "@/store/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useAuthenticateInstructorAccount = () => {
  const { addUser } = useAuthStore();
  const router = useRouter();

  const { mutateAsync: execute } = useMutation({
    mutationFn: authenticateInstructorAccountAction,
    onSuccess: (result) => {
      if (result.ok) {
        const { instructor } = result;

        addUser({
          ...instructor,
          role: "INSTRUCTOR",
        });
        router.push("/my-rooms");
      } else {
        const { statusCode } = result.error;

        switch (statusCode) {
          case 401:
            toastWarning(
              "Credenciais inválidas (email e/ou senha incorretas)!",
            );
            break;
          default:
            toastError(
              "Não foi possível entrar na sua conta. Tente novamente mais tarde!",
            );
        }
      }
    },
  });

  return {
    execute,
  };
};
