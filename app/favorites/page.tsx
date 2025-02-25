import { ClientOnly } from "@/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { AppProvider } from "../AppProvider";
import { FavoritePage } from "@/components/listing/FavoritePage";

type Props = {};

export default async function FavoritiesPage ({}: Props) {
  const currentUser = await getCurrentUser();
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