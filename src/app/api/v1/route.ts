import { addTest, connectDB, getTest } from "@/db/connect";

export async function GET() {
  const db = await connectDB();
  const qwe = await getTest(db);
  return Response.json({ data: qwe });
}

export async function POST() {
  const db = await connectDB();
  addTest(db, "test", "This is a test");
  return Response.json({ ok: true });
}
