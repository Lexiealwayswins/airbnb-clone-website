// test-db.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.time("Prisma connect");
    await prisma.$connect();
    console.log("Connected to MongoDB");
    console.timeEnd("Prisma connect");

    console.time("Query listings");
    const listings = await prisma.listing.findMany({ take: 4 });
    console.timeEnd("Query listings");
    console.log("Listings:", listings);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();