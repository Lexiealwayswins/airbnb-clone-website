import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}
console.log("DATABASE_URL in production:", process.env.DATABASE_URL);
const client = globalThis.prisma || new PrismaClient();

if (process.env.Node_ENV !== "production") globalThis.prisma = client;

export default client;
