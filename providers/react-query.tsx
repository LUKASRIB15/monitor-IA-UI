"use client";

import { useGetUserAccount } from "@/hooks/use-get-user-account";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

function UserAccountHydration() {
  useGetUserAccount();
  return null;
}

export function ReactQueryProvider({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <UserAccountHydration />
      {children}
    </QueryClientProvider>
  );
}
