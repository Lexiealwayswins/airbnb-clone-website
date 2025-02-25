import getCurrentUser from "@/app/actions/getCurrentUser";
import { AppProvider } from "@/app/AppProvider";
import { ClientOnly } from "@/components/ClientOnly";
import { ListingDetail } from "@/components/listing/ListingDetail";
import { IParams } from "@/lib/store/modules/listing";

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