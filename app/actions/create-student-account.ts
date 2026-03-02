"use server";

import { cookies } from "next/headers";
import { StudentDTO } from "./dtos/student-dto";

type CreateStudentAccountRequest = {
  name: string;
  email: string;
  password: string;
};

type CreateStudentAccountResponse =
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

export async function createStudentAccountAction({
  name,
  email,
  password,
}: CreateStudentAccountRequest): Promise<CreateStudentAccountResponse> {
  const response = await fetch("http://localhost:3333/students/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  if (response.status === 409) {
    const error409 = await response.json();

    return {
      ok: false,
      error: {
        statusCode: error409.statusCode,
      },
    };
  }

  const data = await response.json();

  const appCookies = await cookies();

  appCookies.set("access_token", data.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  return {
    ok: true,
    student: data.student as StudentDTO,
  };
}
