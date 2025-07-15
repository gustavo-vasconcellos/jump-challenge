import { connectDB } from "@/db/connect";
import { addConversion, getConversionsHistory } from "@/db/rate_conversions";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await connectDB();
    const { rows } = await getConversionsHistory(db);

    return NextResponse.json(
      rows.map((row) => ({
        id: row.id,
        currency: row.currency,
        original: row.original_value_in_cents / 100,
        converted: row.converted_value_in_cents / 100,
      }))
    );
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    const db = await connectDB();
    const data = await req.json();

    await addConversion(db, data);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      }
    );
  }
}
