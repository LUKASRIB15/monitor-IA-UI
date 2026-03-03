"use server";

import { cookies } from "next/headers";
import { StudentDTO } from "./dtos/student-dto";

type AuthenticateStudentAccountRequest = {
  email: string;
  password: string;
};

type AuthenticateStudentAccountResponse =
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

export async function authenticateStudentAccountAction({
  email,
  password,
}: AuthenticateStudentAccountRequest): Promise<AuthenticateStudentAccountResponse> {
  const response = await fetch("http://localhost:3333/students/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.status === 401) {
    const error401 = await response.json();

    return {
      ok: false,
      error: {
        statusCode: error401.statusCode,
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
