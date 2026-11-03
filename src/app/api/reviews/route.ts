import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { reviews } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productSlug, author, location, rating, title, body: text } = body;

    if (!productSlug || !author || !title || !text || !rating) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const review = {
      productSlug,
      author,
      location: location || "",
      rating: Math.min(5, Math.max(1, Number(rating))),
      title,
      body: text,
      verified: false,
    };

    try {
      const [inserted] = await db.insert(reviews).values(review).returning();
      return NextResponse.json({ review: inserted });
    } catch {
      return NextResponse.json({ review: { ...review, id: Date.now(), createdAt: new Date().toISOString() } });
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }
}
