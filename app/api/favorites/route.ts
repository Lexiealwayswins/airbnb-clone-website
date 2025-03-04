export const dynamic = 'force-dynamic';
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export const GET = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const favorites = await prisma.listing.findMany({
    where: {
      id: {
        in: currentUser.favoriteIds,
      },
    },
  });

  const safeFavorite = (favorites).map((favorite) => ({
    ...favorite,
    createdAt: favorite.createdAt.toISOString(),
  }));

  return  NextResponse.json(safeFavorite);
};