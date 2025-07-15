"use client"

import { ButtonTest } from "@/components/ButtonTest";
import { SelectCurrency } from "@/components/SelectCurrency";
import { Conversion } from "@/db/rate_conversions";
import { useCallback } from "react";
import { useMutation } from "react-query";

export default function Home() {
  const {mutate, isLoading} = useMutation({
    mutationFn: (data: Conversion) => fetch("/api/v1/rate-conversions", { method: "POST", data})
  })

  const handleSubmit = useCallback((ev: SubmitEvent) => {
    ev.preventDefault()
    const formElements = (document.getElementById('form') as HTMLFormElement)?.elements;
    const [currency, value] = (formElements.namedItem("currency") as HTMLSelectElement)?.value.split("-")

    mutate({
      currency;
      original: number;
      converted: number;
    })
  }, [])

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <form id="form" className="max-w-md flex flex-col gap-4" onSubmit={handleSubmit}>
          <h1 className="text-5xl font-bold">USD Rate Conversion</h1>
          <div className="flex flex-row justify-between gap-3">
            <input
              type="number"
              placeholder="Dollar Value"
              className="input"
              inputMode="numeric"
              name="value"
            />
            <SelectCurrency />
          </div>
          <ButtonTest />
        </form>
      </div>
    </div>
  );
}
