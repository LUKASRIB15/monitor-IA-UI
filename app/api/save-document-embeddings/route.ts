import { cookies } from "next/headers";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  const appCookies = await cookies();
  const accessToken = appCookies.get("access_token")?.value;

  const { searchParams } = new URL(request.url);
  const roomId = searchParams.get("roomId");

  const formData = await request.formData();
  const file = formData.get("file") as File;

  const nestFormData = new FormData();
  nestFormData.append("file", file);

  const response = await fetch(
    `http://localhost:3333/rooms/${roomId}/document/save`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: "POST",
      body: nestFormData,
    },
  );

  return Response.json(await response.json());
}
