import { NextResponse } from "next/server";
export async function POST() {
  try {
  } catch (error) {
    return NextResponse.json({ error: "Failed to save vote" }, { status: 500 });
  }
}
