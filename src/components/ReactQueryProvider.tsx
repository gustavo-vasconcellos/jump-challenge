"use client"
import { ReactNode } from "react";
import { QueryClientProvider, QueryClient } from "react-query";

interface Props {
  children: ReactNode;
}

export function ReactQueryProvider({ children }: Props) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  );
}
