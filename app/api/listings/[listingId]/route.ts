import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

interface IParams {
  listingId?:string;
}

export async function DELETE (req: Request, { params }: { params: IParams}){
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { listingId } = await params;

  if (!listingId || typeof listingId !== "string") {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const deletedListing = await prisma.listing.deleteMany({
      where: {
        id: listingId,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(deletedListing);
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete listing" }, { status: 500 });
  }
};