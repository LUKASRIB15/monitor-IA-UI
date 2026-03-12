"use server";

import { cookies } from "next/headers";
import { InstructorDTO } from "./dtos/instructor-dto";

type AuthenticateInstructorAccountRequest = {
  email: string;
  password: string;
};

type AuthenticateInstructorAccountResponse =
  | {
      ok: false;
      error: {
        statusCode: number;
      };
    }
  | {
      ok: true;
      instructor: InstructorDTO;
    };

export async function authenticateInstructorAccountAction({
  email,
  password,
}: AuthenticateInstructorAccountRequest): Promise<AuthenticateInstructorAccountResponse> {
  try {
    const response = await fetch("http://localhost:3333/instructors/auth", {
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
      instructor: data.instructor as InstructorDTO,
    };
  } catch (error) {
    return {
      ok: false,
      error: {
        statusCode: 500,
      },
    };
  }
}
