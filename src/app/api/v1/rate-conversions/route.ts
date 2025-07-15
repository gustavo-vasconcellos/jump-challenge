import { addTest, connectDB, getTest } from "@/db/connect";
import { addConversion, getConversionsHistory } from "@/db/rate_conversions";

export async function GET() {
  const db = await connectDB();
  const qwe = await getConversionsHistory(db);
  return Response.json({ data: qwe });
}

export async function POST(req: Request) {
  const db = await connectDB();
  const data = await req.json();
  addConversion(db, data);
  return Response.json({ ok: true });
}
