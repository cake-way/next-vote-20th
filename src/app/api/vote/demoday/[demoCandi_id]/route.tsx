import { BACKEND_URL } from "@/app/constants/common";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { candidate_id: string } }
) {
  const { candidate_id } = await params;
  try {
    const token = req.headers.get("Authorization");

    if (!token) {
      console.error("Authorization header is missing");
      return NextResponse.json(
        { error: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const url = `${BACKEND_URL}/demoday/${candidate_id}`;
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      // body: JSON.stringify(body),
    });

    const data = response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to save vote" }, { status: 500 });
  }
}
