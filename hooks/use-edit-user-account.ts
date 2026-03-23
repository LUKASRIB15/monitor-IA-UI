import {
  editInstructorAccountAction,
  type EditInstructorAccountResponse,
} from "@/app/actions/edit-instructor-account";
import {
  editStudentAccountAction,
  type EditStudentAccountResponse,
} from "@/app/actions/edit-student-account";
import { getMe } from "@/app/actions/get-me";
import { toastError } from "@/helpers/toasts";
import { useAuthStore } from "@/store/auth";
import { useMutation } from "@tanstack/react-query";

type EditUserParam = {
  name: string;
};

export const useEditUserAccount = () => {
  const { addUser } = useAuthStore();

  const { mutateAsync: execute, isPending } = useMutation({
    mutationFn: async (data: EditUserParam) => {
      const me = await getMe();

      if (me!.userRole === "INSTRUCTOR") {
        return editInstructorAccountAction({ name: data.name });
      } else {
        return editStudentAccountAction({ name: data.name });
      }
    },
    onSuccess: (
      result: EditStudentAccountResponse | EditInstructorAccountResponse,
    ) => {
      if (result.ok) {
        if ("student" in result) {
          addUser({
            ...result.student,
            role: "STUDENT",
          });
        } else {
          addUser({
            ...result.instructor,
            role: "INSTRUCTOR",
          });
        }
      } else {
        return toastError(
          "Você deve estar autenticado para realizar edição de sua conta!",
        );
      }
    },
  });

  return {
    execute,
    isPending,
  };
};
