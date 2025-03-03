export const dynamic = "force-dynamic";
import { ClientOnly } from "@/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { AppProvider } from "../AppProvider";
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
      <AppProvider>
        <FavoritePage 
          currentUser={currentUser}
        />
      </AppProvider>
    </ClientOnly>
  );
}