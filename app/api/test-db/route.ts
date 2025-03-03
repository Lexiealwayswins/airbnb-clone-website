export const dynamic = 'force-dynamic';
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Starting /api/test-db...");

    // 测试连接时间
    console.time("db-connect");
    await prisma.$connect();
    console.timeEnd("db-connect");
    console.log("Database connected");

    // 测试查询时间
    console.time("db-query");
    const userCount = await prisma.user.count();
    console.timeEnd("db-query");
    console.log("User count:", userCount);

    return NextResponse.json({
      status: "success",
      message: "Database connected",
      userCount,
    });
  } catch (error: any) {
    console.error("Database error:", error);
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  } finally {
    console.log("Disconnecting from database...");
    await prisma.$disconnect();
  }
}