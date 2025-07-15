"use client";

import { Conversion } from "@/db/rate_conversions";
import { useCallback, FormEventHandler } from "react";
import { useMutation, useQueryClient } from "react-query";
import { SelectCurrency } from "./SelectCurrency";

export function ConversionForm() {
  const client = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Conversion) =>
      fetch("/api/v1/rate-conversions", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  });

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>((ev) => {
    ev.preventDefault();
    const formElements = ev.currentTarget.elements;

    const [currency, currencyRate] = (
      formElements.namedItem("currency") as HTMLSelectElement
    )?.value.split("-");
    const value = (formElements.namedItem("value") as HTMLInputElement)?.value;

    const original = Number(value);
    const converted = Math.round(Number(value) * Number(currencyRate) * 100);

    mutate(
      {
        currency,
        original: original * 100,
        converted: converted,
      },
      {
        onSuccess: () => {
          (ev.target as HTMLFormElement).reset();
          client.invalidateQueries(["rates-conversion"]);
        },
        onError: (err) => {
          console.error(err);
          alert("An error happened while saving the conversion");
        },
      }
    );
  }, []);

  return (
    <form id="form" className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-row justify-between gap-1">
        <div className="flex flex-row gap-1 items-center">
          <label htmlFor="value">Convert</label>
          <input
            type="text"
            placeholder="USD Value"
            className="input"
            inputMode="decimal"
            name="value"
            id="value"
            required
          />
        </div>
        <SelectCurrency />
      </div>
      <button type="submit" className="btn btn-secondary">
        {isLoading ? (
          <span className="loading loading-spinner"></span>
        ) : (
          "Convert Value"
        )}
      </button>
    </form>
  );
}
