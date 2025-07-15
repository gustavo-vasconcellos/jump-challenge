"use client";

import { useQuery } from "react-query";

export interface Props {}

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

export function SelectCurrency(props: Props) {
  const { data, isLoading } = useQuery({
    queryFn: () =>
      fetch("https://open.er-api.com/v6/latest/USD", { cache: "force-cache" }).then((res) => res.json()),
  });

  if (isLoading || !data) return null;

  return (
    <select className="select" name="currency">
      <option disabled>
        Pick a currency to Convert
      </option>
      {Object.entries((data as unknown as Rates).rates).map(([key, value]) => (
        <option value={`${key}-${value}`} key={key}>
          {key}
        </option>
      ))}
    </select>
  );
}
