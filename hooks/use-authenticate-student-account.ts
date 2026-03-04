import { authenticateStudentAccountAction } from "@/app/actions/authenticate-student-account";
import { toastError, toastWarning } from "@/helpers/toasts";
import { useAuthStore } from "@/store/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useAuthenticateStudentAccount = () => {
  const router = useRouter();
  const { addUser } = useAuthStore();

  const { mutateAsync: execute } = useMutation({
    mutationFn: authenticateStudentAccountAction,
    onSuccess: (result) => {
      if (result.ok) {
        const { student } = result;

        addUser({
          ...student,
          role: "STUDENT",
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
