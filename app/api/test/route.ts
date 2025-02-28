import { NextResponse } from "next/server";

export async function GET() {
  console.time("Function start");
  console.log("Starting /api/test");
  console.timeEnd("Function start");
  return NextResponse.json({ message: "Test complete" });
}