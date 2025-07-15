"use client";

import { Conversion } from "@/db/rate_conversions";
import { useQuery } from "react-query";

export function ConversionsHistory() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["rates-conversion"],
    queryFn: () =>
      fetch("/api/v1/rate-conversions", {
        headers: { "Cache-Control": "stale-while-revalidate" },
      }).then((res) => res.json() as Promise<Conversion[]>),
  });

  if (isLoading && !data) {
    return (
      <div className="bg-base-100 rounded-box shadow-md p-4 w-full gap-2 text-center">
        <span className="text-secondary loading loading-spinner w-4"></span>
      </div>
    );
  }

  return (
    <ul className="list bg-base-100 rounded-box shadow-md p-4 w-full gap-2 relative">
      <li className="pb-2 text-xs opacity-60 tracking-wide">History</li>
      {data && data.length > 0 ? (
        data.map(({ currency, original, converted, id }) => (
          <li className="list-row" key={id}>
            <p className="text-nowrap">USD to {currency}</p>
            <div className="flex flex-col gap-2 items-start">
              <p className="text-nowrap">
                Original:{" "}
                {original.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
              <p className="text-nowrap">
                Converted:{" "}
                {converted.toLocaleString("en-US", {
                  style: "currency",
                  currency,
                })}
              </p>
            </div>
          </li>
        ))
      ) : (
        <li>
          <p>Do your first Convertion</p>
        </li>
      )}
      {isFetching && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-radial from-white to-transparent">
          <span className="text-secondary loading loading-spinner w-8"></span>
        </div>
      )}
    </ul>
  );
}
