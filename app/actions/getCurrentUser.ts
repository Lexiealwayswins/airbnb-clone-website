import prisma from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    console.log("Fetching session...");
    const session = await getSession();
    console.log("Session:", session);
    if (!session?.user?.email) {
      console.log("No session or email found");
      return null;
    }
    console.log("Querying user with email:", session.user.email);
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email as string },
    });
    if (!currentUser) {
      console.log("No user found in DB");
      return null;
    }
    console.log("Current User:", currentUser);
    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    return null; // 显式返回 null，避免 undefined
  }
}