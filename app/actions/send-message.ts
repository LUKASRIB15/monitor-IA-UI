type SendMessageToAIRequest = {
  chatId: string;
  message: string;
  onChunk: (chunk: string) => void;
};

export async function sendMessageToAIAction({
  chatId,
  message,
  onChunk,
}: SendMessageToAIRequest) {
  const url = `/api/send-message?chatId=${chatId}&message=${encodeURIComponent(message)}`;

  const eventSource = new EventSource(url);

  let aiMessage = "";

  eventSource.onmessage = (event) => {
    const chunk = event.data;

    aiMessage += chunk;
    onChunk(chunk);
  };

  eventSource.onerror = async () => {
    eventSource.close();
    await fetch("/api/save-ai-message", {
      method: "POST",
      body: JSON.stringify({
        chatId,
        content: aiMessage,
      }),
    });
  };
}
