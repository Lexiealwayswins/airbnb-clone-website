export const dynamic = "force-dynamic";
import { ClientOnly } from "@/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { FavoritePage } from "@/components/listing/FavoritePage";

type Props = {};

export default async function FavoritiesPage ({}: Props) {
  let currentUser = null;
  try {
    currentUser = await getCurrentUser();
  } catch (error) {
    console.error("Failed to fetch current user:", error);
  }
  return (
    <ClientOnly>
      <FavoritePage 
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}