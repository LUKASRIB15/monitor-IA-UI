export function MessageBubbleTyping() {
  return (
    <div className="flex items-end gap-2">
      <div className="flex flex-col items-start gap-0.5">
        <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-muted px-4 py-3">
          <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:0ms]" />
          <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:150ms]" />
          <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
