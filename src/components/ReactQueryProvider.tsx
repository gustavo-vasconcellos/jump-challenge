"use client";
import { ReactNode } from "react";
import { QueryClientProvider, QueryClient } from "react-query";

interface Props {
  children: ReactNode;
}

export function ReactQueryProvider({ children }: Props) {
  return (
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              staleTime: 1 * 60 * 1000,
              cacheTime: 5 * 60 * 1000,
            },
          },
        })
      }
    >
      {children}
    </QueryClientProvider>
  );
}
