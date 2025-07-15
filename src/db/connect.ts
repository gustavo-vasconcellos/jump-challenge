import { Pool } from "pg";
import {
  AuthTypes,
  Connector,
  IpAddressTypes,
} from "@google-cloud/cloud-sql-connector";

export const connectDB = async () => {
  const connector = new Connector();
  const clientOpts = await connector.getOptions({
    instanceConnectionName: process.env.DB_CONNECTION_NAME!,
    authType: AuthTypes.IAM,
    ipType: IpAddressTypes.PUBLIC,
  });

  const pool = new Pool({
    ...clientOpts,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: false,
  });

  return pool;
};
