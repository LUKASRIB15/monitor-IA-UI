"use server";

import { cookies } from "next/headers";
import { InstructorDTO } from "./dtos/instructor-dto";

type EditInstructorAccountRequest = {
  name: string;
};

export type EditInstructorAccountResponse =
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

export async function editInstructorAccountAction({
  name,
}: EditInstructorAccountRequest): Promise<EditInstructorAccountResponse> {
  const appCookies = await cookies();
  const accessToken = appCookies.get("access_token")!.value;

  const response = await fetch("http://localhost:3333/instructors/edit", {
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
    instructor: data.instructor as InstructorDTO,
  };
}
