// import { BACKEND_URL } from "@/app/constants/common";
import { NextResponse } from "next/server";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export async function GET(
  req: Request,
  { params }: { params: { part: string } }
) {
  const { part } = await params;
  // const part = await params.part;
  const { headers } = req;
  const token = headers.get("Authorization");

  console.log("Received token:", token);

  try {
    const requestHeaders: Record<string, string> = {};
    if (!token) {
      console.error("Authorization header is missing");
      return NextResponse.json(
        { error: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    if (token) {
      requestHeaders["Authorization"] = token;
    }
    const url = `http://43.200.25.35:8080/${
      part === "demoday" ? "" : "vote"
    }/${part}`;

    const results = await fetch(url, {
      headers: { ...requestHeaders },
    });

    console.log(url);

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!results.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: results.status }
      );
    }

    const data = await results.json();
    return NextResponse.json({ success: true, data: data });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
