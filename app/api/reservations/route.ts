export const dynamic = 'force-dynamic';
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET (req: Request, params: any) {
  try {
    const { searchParams } = new URL(req.url);
    const listingId = searchParams.get("listingId");
    const userId = searchParams.get("userId");
    const authorId = searchParams.get("authorId");

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      }
    });

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));
    return NextResponse.json(safeReservations);
  } catch (error) {
    return NextResponse.json({ error: "Failed to get reservations" }, { status: 500 });
  }
};

export async function POST (req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const { listingId, startDate, endDate, totalPrice } = body;
  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const postReservation = await prisma.listing.update({
    where: { id: listingId },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        }
      }
    }
  });
  return NextResponse.json(postReservation);
};