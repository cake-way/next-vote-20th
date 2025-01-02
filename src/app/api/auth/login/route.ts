import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function POST(req: Request) {

  try {
    // 요청 데이터 확인
    const body = await req.json();

    // 백엔드 서버 요청
    const response = await fetch(`${BACKEND_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("백엔드 오류 텍스트:", errorText);
      return NextResponse.json({ success: false, error: errorText }, { status: response.status });
    }
    
    const contentType = response.headers.get('Content-Type');
    let responseBody;
    if (contentType && contentType.includes('application/json')) {
      responseBody = await response.json();
    } else {
      responseBody = await response.text(); // JSON이 아닌 경우 처리
    }
    console.log("백엔드 응답:", responseBody);
    return NextResponse.json({ success: true, data: responseBody });
  
  } catch (error) {
    console.error("에러 발생:", error);
    return NextResponse.json({ success: false, error: "서버 요청 실패" }, { status: 500 });
  }
}

