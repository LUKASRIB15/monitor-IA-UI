import { createStudentAccountAction } from "@/app/actions/create-student-account";
import { toastError, toastWarning } from "@/helpers/toasts";
import { useAuthStore } from "@/store/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useCreateStudentAccount = () => {
  const router = useRouter();
  const { addUser } = useAuthStore();

  const { mutateAsync: execute } = useMutation({
    mutationFn: createStudentAccountAction,
    onSuccess: (result) => {
      if (result.ok) {
        const { student } = result;

        addUser({
          ...student,
          role: "STUDENT",
        });
        router.push("/");
      } else {
        const { statusCode } = result.error;
        switch (statusCode) {
          case 409:
            toastWarning(
              "Este email está sendo usado por outro usuário em nossa plataforma!",
            );
            break;
          default:
            toastError(
              "Não foi possível criar sua conta. Tente novamente mais tarde!",
            );
        }
      }
    },
  });

  return {
    execute,
  };
};
