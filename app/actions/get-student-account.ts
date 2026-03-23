"use server";

import { cookies } from "next/headers";
import { StudentDTO } from "./dtos/student-dto";

type GetStudentAccountRequest = {
  studentId: string;
};

export type GetStudentAccountResponse =
  | {
      ok: false;
      error: {
        statusCode: number;
      };
    }
  | {
      ok: true;
      student: StudentDTO;
    };

export async function getStudentAccountAction({
  studentId,
}: GetStudentAccountRequest): Promise<GetStudentAccountResponse> {
  const appCookies = await cookies();
  const accessToken = appCookies.get("access_token")!.value;

  const response = await fetch("http://localhost:3333/students/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 404) {
    const error404 = await response.json();

    return {
      ok: false,
      error: {
        statusCode: error404.statusCode,
      },
    };
  }

  const data = await response.json();

  return {
    ok: true,
    student: data.student as StudentDTO,
  };
}
