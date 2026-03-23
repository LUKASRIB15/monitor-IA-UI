import { MessageDTO } from "@/app/actions/dtos/message-dto";
import { cn } from "@/lib/utils";
import { formatTime } from "@/utils/format-time";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

type MessageBubbleProps = {
  message: MessageDTO;
};

export function MessageBubble({ message }: MessageBubbleProps) {
  const isStudent = message.role === "STUDENT";

  return (
    <div
      className={cn(
        "flex items-end gap-2",
        isStudent ? "flex-row-reverse" : "flex-row",
      )}
    >
      <div
        className={cn(
          "flex max-w-[75%] flex-col gap-0.5",
          isStudent ? "items-end" : "items-start",
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
            isStudent
              ? "rounded-br-md bg-primary text-primary-foreground"
              : "rounded-bl-md bg-muted text-foreground",
          )}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // Títulos
              h1: ({ children }) => (
                <h1 className="mb-2 mt-3 text-base font-bold first:mt-0">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="mb-1.5 mt-2.5 text-sm font-semibold first:mt-0">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="mb-1 mt-2 text-sm font-medium first:mt-0">
                  {children}
                </h3>
              ),

              // Parágrafos
              p: ({ children }) => (
                <p className="mb-1.5 last:mb-0">{children}</p>
              ),

              // Listas
              ul: ({ children }) => (
                <ul className="mb-1.5 ml-4 list-disc space-y-0.5">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-1.5 ml-4 list-decimal space-y-0.5">
                  {children}
                </ol>
              ),

              // Código inline
              code: ({ inline, className, children, ...props }: any) => {
                const match = /language-(\w+)/.exec(className || "");
                const language = match?.[1];

                if (!inline && language) {
                  // Bloco de código com syntax highlight
                  return (
                    <div className="my-2 overflow-hidden rounded-lg text-xs">
                      <div className="flex items-center justify-between bg-zinc-800 px-3 py-1.5">
                        <span className="font-mono text-zinc-400">
                          {language}
                        </span>
                      </div>
                      <SyntaxHighlighter
                        style={oneDark}
                        language={language}
                        PreTag="div"
                        customStyle={{ margin: 0, borderRadius: 0 }}
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    </div>
                  );
                }

                // Código inline simples
                return (
                  <code
                    className={cn(
                      "rounded px-1 py-0.5 font-mono text-xs",
                      isStudent
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-muted-foreground/15 text-foreground",
                    )}
                    {...props}
                  >
                    {children}
                  </code>
                );
              },

              // Blockquote
              blockquote: ({ children }) => (
                <blockquote
                  className={cn(
                    "my-1.5 border-l-2 pl-3 italic",
                    isStudent
                      ? "border-primary-foreground/40"
                      : "border-muted-foreground/40",
                  )}
                >
                  {children}
                </blockquote>
              ),

              // Negrito e itálico
              strong: ({ children }) => (
                <strong className="font-semibold">{children}</strong>
              ),
              em: ({ children }) => <em className="italic">{children}</em>,

              // Separador
              hr: () => (
                <hr
                  className={cn(
                    "my-2 border-t",
                    isStudent
                      ? "border-primary-foreground/20"
                      : "border-muted-foreground/20",
                  )}
                />
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
        <span className="px-1 text-[10px] text-muted-foreground/70">
          {formatTime(new Date(message.created_at))}
        </span>
      </div>
    </div>
  );
}
