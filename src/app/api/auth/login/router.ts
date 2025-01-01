import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL;

export async function POST(req: Request) {
  try {
    const body = await req.json(); // 클라이언트로부터 받은 요청 데이터
    const response = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json({ success: false, error }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("에러 발생:", error); // 에러를 로그로 출력
    return NextResponse.json({ success: false, error: "서버 요청 실패" }, { status: 500 });
  }
}
