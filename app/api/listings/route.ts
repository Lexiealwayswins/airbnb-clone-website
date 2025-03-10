export const dynamic = 'force-dynamic';
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { Listing } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET (req: NextRequest) {
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

    const query: any = {};
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

    const listing = await prisma.listing.findMany({
      // take: 4,  // 限制返回数量
      where: query,
      orderBy: {
        createdAt: "desc",
      }
    });

    const safeListings = listing.map((list: Listing) => ({
      ...list,
      createdAt: list.createdAt.toISOString(),
    }));

    return NextResponse.json(safeListings);

    // return new Response(JSON.stringify(safeListings), {
    //   status: 200,
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // }); 

  } catch (err: any) {
    console.error("Error in /api/listings:", err);
    return NextResponse.json({ error: "Failed to fetch listings" }, { status: 500 });
    // console.error(err);
    // return new Response(JSON.stringify({ err: 'Internal Server Error'}),{
    //   status: 500,
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
  } 
};

export async function POST (req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      location,
      price,
    } = body;

    Object.keys(body).forEach((key: any) => {
      if (!body[key]) {
        return NextResponse.json({ error: `${key} is required` }, { status: 400 });
      }
    });

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue: location.value,
        price: parseInt(price, 10),
        userId: currentUser.id,
      }
    });

    return NextResponse.json({ success: true, listing }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};