import { BACKEND_URL } from "@/app/constants/common";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { demoCandi_id: string } }
) {
  const { demoCandi_id } = await params;

  try {
    const token = req.headers.get("Authorization");

    if (!token) {
      console.error("Authorization header is missing");
      return NextResponse.json(
        { error: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const url = `${BACKEND_URL}/demoday/${demoCandi_id}`;
    console.log(url);
    console.log(demoCandi_id);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      // body: JSON.stringify(body),
    });

    // 응답 내용 먼저 텍스트로 받기
    const responseText = await response.text();
    console.log("Raw response:", responseText);

    // 응답이 비어있지 않은 경우에만 JSON 파싱
    const data = responseText ? JSON.parse(responseText) : {};

    if (!response.ok) {
      return NextResponse.json(
        { error: "Backend request failed", details: data },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to save vote" }, { status: 500 });
  }
}
