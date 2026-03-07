import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { content, chatId } = await req.json();

  const appCookies = await cookies();
  const accessToken = appCookies.get("access_token")?.value;

  if (!accessToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  await fetch(`http://localhost:3333/chats/${chatId}/messages/save`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content,
    }),
  });

  return new Response();
}
