import { BACKEND_URL } from "@/app/constants/common";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { candidate_id: string } }
) {
  const { candidate_id } = await params;

  try {
    // const { body } = await req.json();
    // 원본 요청에서 Authorization 헤더 가져오기
    const token = req.headers.get("Authorization");

    if (!token) {
      console.error("Authorization header is missing");
      return NextResponse.json(
        { error: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const url = `${BACKEND_URL}/vote/${candidate_id}`;
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      // body: JSON.stringify(body),
    });

    // 응답 상태 체크
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Vote API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save vote" },
      { status: 500 }
    );
  }
}
