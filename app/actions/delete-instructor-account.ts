"use server";

import { cookies } from "next/headers";

export type DeleteInstructorAccountResponse =
  | {
      ok: false;
      error: {
        statusCode: number;
      };
    }
  | {
      ok: true;
    };

export async function deleteInstructorAccountAction(): Promise<DeleteInstructorAccountResponse> {
  const appCookies = await cookies();
  const accessToken = appCookies.get("access_token")!.value;

  const response = await fetch("http://localhost:3333/instructors/delete", {
    method: "DELETE",
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

  appCookies.delete("access_token");

  return {
    ok: true,
  };
}
