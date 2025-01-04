import { BACKEND_URL } from "@/app/constants/common";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { candidate_id: string } }
) {
  const { candidate_id } = await params;
  try {
    const { body } = await req.json();
    const url = `${BACKEND_URL}/demoday/${candidate_id}`;

    const response = await fetch(url, {
      body: body,
    });

    const data = response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to save vote" }, { status: 500 });
  }
}
