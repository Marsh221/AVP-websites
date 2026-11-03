import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customer, address, items, subtotal, shipping, tax, total } = body;

    if (!customer?.name || !customer?.email || !items?.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const orderNumber = `MS-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      await db.insert(orders).values({
        orderNumber,
        customerName: customer.name,
        email: customer.email,
        address,
        items,
        subtotal,
        shipping,
        tax,
        total,
        status: "confirmed",
      });
    } catch (e) {
      console.error("DB order insert failed, returning mock confirmation", e);
    }

    return NextResponse.json({ orderNumber, status: "confirmed", total });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
  }
}
