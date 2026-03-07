export function formatRelativeDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) return "Agora mesmo";
  if (diffMinutes < 60) return `${diffMinutes}min atr\u00e1s`;
  if (diffHours < 24) return `${diffHours}h atr\u00e1s`;
  if (diffDays < 7) return `${diffDays}d atr\u00e1s`;

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
