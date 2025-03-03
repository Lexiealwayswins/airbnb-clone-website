export const dynamic = "force-dynamic";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { AppProvider } from "@/app/AppProvider";
import { ClientOnly } from "@/components/ClientOnly";
import { ListingDetail } from "@/components/listing/ListingDetail";

export default async function ListingDetailPage ({ params }: any ) {
  const currentUser = await getCurrentUser();
  const { listingId } = params;
  return (
    <ClientOnly>
      <AppProvider>
        <ListingDetail
          currentUser={currentUser}
          params={{listingId}}
        />
      </AppProvider>
    </ClientOnly>
  );
}