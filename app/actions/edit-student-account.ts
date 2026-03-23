"use server";

import { cookies } from "next/headers";
import { StudentDTO } from "./dtos/student-dto";

type EditStudentAccountRequest = {
  name: string;
};

export type EditStudentAccountResponse =
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

export async function editStudentAccountAction({
  name,
}: EditStudentAccountRequest): Promise<EditStudentAccountResponse> {
  const appCookies = await cookies();
  const accessToken = appCookies.get("access_token")!.value;

  const response = await fetch("http://localhost:3333/students/edit", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
    }),
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
