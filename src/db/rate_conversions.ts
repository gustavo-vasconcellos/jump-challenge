import { Pool } from "pg";

export function getConversionsHistory(pool: Pool) {
  return pool.query<DBConversion>(
    `SELECT 
      id, 
      currency, 
      original_value_in_cents, 
      converted_value_in_cents 
    FROM rate_conversions LIMIT 100`
  );
}

export interface Conversion {
  id?: number;
  currency: string;
  original: number;
  converted: number;
}

interface DBConversion {
  id?: number;
  currency: string;
  original_value_in_cents: number;
  converted_value_in_cents: number;
}

export function addConversion(pool: Pool, data: Conversion) {
  return pool.query(
    `INSERT INTO rate_conversions(
      currency, original_value_in_cents, converted_value_in_cents
    ) VALUES('${data.currency}', '${data.original}', '${data.converted}')`
  );
}
