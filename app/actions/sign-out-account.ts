"use server";

import { cookies } from "next/headers";

export async function signOutAccountAction() {
  const appCookies = await cookies();

  appCookies.delete("access_token");
}
