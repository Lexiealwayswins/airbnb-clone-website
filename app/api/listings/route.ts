import prisma from "@/lib/prismadb";
import { Listing } from "@prisma/client";

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);

    const userId = searchParams.get('userId');
    const guestCount = searchParams.get('guestCount');
    const roomCount = searchParams.get('roomCount');
    const bathroomCount = searchParams.get('bathroomCount');
    const locationValue = searchParams.get('locationValue');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const category = searchParams.get('category');

    let query: any = {};
    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      };
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      };
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate},
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    };

    console.log("API query:"+ query)
    const listing = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      }
    });

    const safeListings = listing.map((list: Listing) => ({
      ...list,
      createdAt: list.createdAt.toISOString(),
    }));

    return new Response(JSON.stringify(safeListings), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }); 

  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ err: 'Internal Server Error'}),{
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } 
}