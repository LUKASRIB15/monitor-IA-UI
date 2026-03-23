"use server";

import { cookies } from "next/headers";
import { importSPKI, jwtVerify } from "jose";

export async function getMe() {
  const appCookies = await cookies();

  const token = appCookies.get("access_token")?.value;
  if (!token) return null;

  const publicKeyInString = Buffer.from(
    process.env.NEXT_PUBLIC_JWT_PUBLIC_KEY!,
    "base64",
  );

  const publicKey = await importSPKI(publicKeyInString.toString(), "RS256");

  const { payload } = await jwtVerify(token, publicKey);

  const userId = payload.sub;
  const userRole = payload.role as "STUDENT" | "INSTRUCTOR";

  if (!userId || !userRole) {
    return null;
  }

  return {
    userId,
    userRole,
  };
}
