"use client";

import { useQuery } from "react-query";

interface Rates {
  result: string;
  provider: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  time_eol_unix: number;
  base_code: string;
  rates: Record<string, number>;
}

export function SelectCurrency() {
  const { data, isLoading } = useQuery({
    queryKey: ["currency-rates"],
    queryFn: () =>
      fetch("https://open.er-api.com/v6/latest/USD", {
        cache: "force-cache",
      }).then((res) => res.json() as Promise<Rates>),
  });

  if (isLoading || !data) return null;

  return (
    <div className="flex flex-row gap-1 items-center">
      <label htmlFor="currency">to</label>
      <select className="select" name="currency">
        <option disabled>Pick a currency</option>
        {Object.entries(data.rates).map(([key, value]) => {
          if (key === "USD") return null;

          return (
            <option value={`${key}-${value}`} key={key}>
              {key}
            </option>
          );
        })}
      </select>
    </div>
  );
}
