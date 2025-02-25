import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { IDelReservationsParams } from "@/lib/store/modules/reservation";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE (req: NextRequest, context: any) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = context.params as { reservationId: string };

  if (!reservationId || typeof reservationId !== "string") {
    return NextResponse.error();
  }

  try {
    const delReservation = await prisma.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [{userId: currentUser.id}, { listing: {userId: currentUser.id}}]
      }
    });
    return NextResponse.json(delReservation);
  } catch (error) {
    return NextResponse.json(error);
  }
};