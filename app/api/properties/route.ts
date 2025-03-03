export const dynamic = 'force-dynamic';
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { Listing } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET (req: NextRequest) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const properties = await prisma.listing.findMany({
    where: {
      userId: currentUser.id,
    },
    orderBy: {
      createdAt: "desc",
    }
  });

  const safeProperties = properties.map((properties: Listing) => ({
    ...properties,
    createdAt: properties.createdAt.toISOString(),
  }));

  return NextResponse.json(safeProperties);
};