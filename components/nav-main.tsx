"use client";

import { IconCirclePlusFilled, type Icon } from "@tabler/icons-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/sidebar";
import { useAuthStore } from "@/store/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EnterRoomDialog } from "./my-rooms/enter-room-dialog";
import { useState } from "react";
import { CreateRoomDialog } from "./my-rooms/create-room-dialog";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  const { userLogged } = useAuthStore();
  const pathname = usePathname();

  if (!userLogged) {
    return null;
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            {userLogged.role === "INSTRUCTOR" ? (
              <CreateRoomDialog />
            ) : (
              <EnterRoomDialog />
            )}
            {/* <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <IconMail />
              <span className="sr-only">Inbox</span>
            </Button> */}
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <Link key={item.title} href={item.url}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={item.title}
                  data-active={pathname.includes(item.url)}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
