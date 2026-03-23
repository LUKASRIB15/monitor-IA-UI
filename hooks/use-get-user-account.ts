import { useQuery } from "@tanstack/react-query";
import { UsersQueryKeysEnum } from "./enums/users-query-keys";
import {
  getStudentAccountAction,
  type GetStudentAccountResponse,
} from "@/app/actions/get-student-account";
import { getMe } from "@/app/actions/get-me";
import { useAuthStore } from "@/store/auth";
import {
  getInstructorAccountAction,
  type GetInstructorAccountResponse,
} from "@/app/actions/get-instructor-account";

export const useGetUserAccount = () => {
  const { addUser } = useAuthStore();

  return useQuery({
    queryKey: [UsersQueryKeysEnum.GET_USER],
    queryFn: async () => {
      const me = await getMe();
      if (!me!.userId) {
        return null;
      }

      let result: GetStudentAccountResponse | GetInstructorAccountResponse;

      if (me!.userRole === "INSTRUCTOR") {
        result = await getInstructorAccountAction({ instructorId: me!.userId });

        if (result.ok) {
          addUser({
            ...result.instructor,
            role: "INSTRUCTOR",
          });
        }
      } else {
        result = await getStudentAccountAction({ studentId: me!.userId });

        if (result.ok) {
          addUser({
            ...result.student,
            role: "STUDENT",
          });
        }
      }

      return result;
    },
  });
};
