import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { IParams } from "@/lib/store/modules/listing";


export async function GET(req: Request, { params }: { params: IParams }) {
  const { listingId } = await params;
  // console.log("API listingId:", listingId);

  if (!listingId) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      include: { user: true },
    });

    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    const safeListing = {
      ...listing,
      createdAt: listing.createdAt.toString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toString(),
        updatedAt: listing.user.updatedAt.toString(),
        emailVerified: listing.user.emailVerified?.toString() || null,
      },
    };

    return NextResponse.json(safeListing);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Failed to fetch listing" }, { status: 500 });
  }
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