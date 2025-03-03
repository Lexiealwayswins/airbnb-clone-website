export const dynamic = 'force-dynamic';
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("Starting /api/test-db...");
  return NextResponse.json({ status: "success", message: "API is working" });
}