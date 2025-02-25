import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { IGetReservationsParams } from "@/lib/store/modules/reservation";
import { NextResponse } from "next/server";

export const GET = async (req: Response, { params }: { params: IGetReservationsParams }) => {
  try {
    const { listingId, userId, authorId } = params;
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
    return safeReservations;
  } catch (error) {
    return NextResponse.json(error);
  }
}

export const POST = async (req: Request) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await req.json();

  const { listingId, startDate, endDate, totalPrice } = body;
  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
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
}