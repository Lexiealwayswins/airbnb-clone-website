// app/api/test/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  console.time("Ping MongoDB");
  await fetch("mongodb+srv://lexie:zedchC3uLB0G4hce@airbnb-dev.eo85u.mongodb.net");
  console.timeEnd("Ping MongoDB");
  return NextResponse.json({ message: "Ping complete" });
}