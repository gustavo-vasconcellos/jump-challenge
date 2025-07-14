import { Pool } from "pg";
import {
  AuthTypes,
  Connector,
  IpAddressTypes,
} from "@google-cloud/cloud-sql-connector";

export const connectDB = async () => {
  const connector = new Connector();
  const clientOpts = await connector.getOptions({
    instanceConnectionName: `hazel-stream-465619-j4:us-central1:jump-challenge-sandbox`,
    authType: AuthTypes.IAM,
    ipType: IpAddressTypes.PUBLIC,
  });

  const pool = new Pool({
    ...clientOpts,
    user: `postgres`,
    password: "Tc;P@`;kFe^l`n*i",
    database: "postgres",
    ssl: false,
  });

  return pool;
};

export async function addTest(pool: Pool, name: string, description: string) {
  await pool.query(
    `INSERT INTO test(name, description) VALUES('${name}', '${description}')`
  );
}

export async function getTest(pool: Pool) {
  const result = await pool.query(
    `SELECT id, name, description FROM test LIMIT 100`
  );
  return result.rows;
}
