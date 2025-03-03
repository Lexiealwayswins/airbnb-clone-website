export const dynamic = 'force-dynamic';
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export const GET = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  console.log("currentUser: ", currentUser);

  const favorites = await prisma.listing.findMany({
    where: {
      id: {
        in: currentUser.favoriteIds,
      },
    },
  });

  console.log("favorites: ", favorites);

  const safeFavorite = (favorites).map((favorite) => ({
    ...favorite,
    createdAt: favorite.createdAt.toISOString(),
  }));

  return  NextResponse.json(safeFavorite);
};