import { cookies } from "next/headers";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const chatId = searchParams.get("chatId");
  const message = searchParams.get("message");

  if (!chatId || !message) {
    return new Response("Missing params", { status: 400 });
  }

  const appCookies = await cookies();
  const accessToken = appCookies.get("access_token")?.value;

  if (!accessToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  const backendUrl = `http://localhost:3333/chats/${chatId}/messages/new?message=${encodeURIComponent(message)}`;

  const response = await fetch(backendUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });

  return new Response(response.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
