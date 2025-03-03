export const dynamic = 'force-dynamic';
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.time("db-test");
    await prisma.$connect();
    const userCount = await prisma.user.count(); // 测试一个简单查询
    console.timeEnd("db-test");

    return NextResponse.json({
      status: "success",
      message: "Database connected",
      userCount,
    });
  } catch (error: any) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}