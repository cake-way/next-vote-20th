import { BACKEND_URL } from "@/app/constants/common";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { part: string } }
) {
  const { part } = await params;

  const { headers } = req;
  const token = headers.get("Authorization");

  try {
    if (!token) {
      console.error("Authorization header is missing");
      return NextResponse.json(
        { error: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }
    const url = `${BACKEND_URL}/${part === "team" ? "" : "leader/"}${part}`;
    console.log(url);
    const response = await fetch(url, {
      headers: { Authorization: token },
    });
    // 백엔드 응답을 JSON으로 파싱!
    const data = await response.json();

    console.log(response);
    return NextResponse.json({ success: true, data: data });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
//try catch문으로 변경
