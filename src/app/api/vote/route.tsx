import { NextResponse } from "next/server";

export async function POST() {
  try {
    const { vote_id, user_id, leader_id } = await request.json();
  } catch (error) {
    return NextResponse.json({ error: "Failed to save vote" }, { status: 500 });
  }
}
