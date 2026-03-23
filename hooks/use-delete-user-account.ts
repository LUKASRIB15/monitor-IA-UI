import {
  deleteInstructorAccountAction,
  type DeleteInstructorAccountResponse,
} from "@/app/actions/delete-instructor-account";
import {
  deleteStudentAccountAction,
  type DeleteStudentAccountResponse,
} from "@/app/actions/delete-student-account";
import { getMe } from "@/app/actions/get-me";
import { toastError } from "@/helpers/toasts";
import { useAuthStore } from "@/store/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useDeleteUserAccount = () => {
  const { removeUser } = useAuthStore();
  const router = useRouter();

  const { mutateAsync: execute, isPending } = useMutation({
    mutationFn: async () => {
      const me = await getMe();

      if (me!.userRole === "INSTRUCTOR") {
        return deleteInstructorAccountAction();
      } else {
        return deleteStudentAccountAction();
      }
    },
    onSuccess: (
      result: DeleteInstructorAccountResponse | DeleteStudentAccountResponse,
    ) => {
      if (result.ok) {
        removeUser();
        router.refresh();
      } else {
        return toastError(
          "Você deve estar autenticado para realizar deleção de sua conta!",
        );
      }
    },
  });

  return {
    execute,
    isPending,
  };
};
