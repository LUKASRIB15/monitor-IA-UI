"use server";

import { cookies } from "next/headers";
import { StudentDTO } from "./dtos/student-dto";
import { InstructorDTO } from "./dtos/instructor-dto";

type GetInstructorAccountRequest = {
  instructorId: string;
};

export type GetInstructorAccountResponse =
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

export async function getInstructorAccountAction({
  instructorId,
}: GetInstructorAccountRequest): Promise<GetInstructorAccountResponse> {
  const appCookies = await cookies();
  const accessToken = appCookies.get("access_token")!.value;

  const response = await fetch("http://localhost:3333/instructors/me", {
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
    instructor: data.instructor as InstructorDTO,
  };
}
