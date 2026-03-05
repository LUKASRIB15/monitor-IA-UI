"use client";

import { useGetRoomWithChat } from "@/hooks/use-get-room-with-chat";
import { Separator } from "@/shared/components/separator";
import { SidebarTrigger } from "@/shared/components/sidebar";
import { ModeToggle } from "@/theme/mode-toggle";
import { ArrowBigRight, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

const HOME_PAGE_PRIVATE_ROUTES = {
  "/my-rooms": "Minhas Salas",
} as const;

export function SiteHeader() {
  const pathname = usePathname() as keyof typeof HOME_PAGE_PRIVATE_ROUTES;

  const segments = pathname.split("/").filter(Boolean);
  const baseRoute = `/${segments[0]}` as keyof typeof HOME_PAGE_PRIVATE_ROUTES;
  const baseLabel = HOME_PAGE_PRIVATE_ROUTES[baseRoute];
  let secondSegment = segments[1] !== undefined ? "Conversa" : null;

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">
          {secondSegment ? (
            <div className="flex items-center gap-4 ">
              <span>{baseLabel}</span>
              <ChevronRight className="text-muted-foreground" />
              <span>{secondSegment}</span>
            </div>
          ) : (
            baseLabel
          )}
        </h1>
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
