import { ClientOnly } from "@/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { PropertyPage } from "@/components/listing/PropertyPage";
import { AppProvider } from "../AppProvider";
import { TripPage } from "@/components/listing/TripPage";

type Props = {};

export default async function TripsPage ({}: Props) {
  const currentUser = await getCurrentUser();
  return (
    <ClientOnly>
      <AppProvider>
        <TripPage 
          currentUser={currentUser}
        />
      </AppProvider>
    </ClientOnly>
  );
}