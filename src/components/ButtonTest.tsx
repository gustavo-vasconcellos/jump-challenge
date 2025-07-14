"use client";

import { useMutation } from "react-query";

export function ButtonTest() {
  const { mutate, isLoading } = useMutation({
    mutationFn: () => fetch("/api/v1", { method: "POST" }),
  });

  return (
    <button className="btn btn-primary" onClick={() => mutate()}>
      {isLoading ? <span className="loading loading-spinner"></span> : "Add to DB"}
    </button>
  );
}
