export const dynamic = "force-dynamic";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { ClientOnly } from "@/components/ClientOnly";
import { ListingDetail } from "@/components/listing/ListingDetail";

export default async function ListingDetailPage ({ params }: any ) {
  let currentUser = null;
  try {
    currentUser = await getCurrentUser();
  } catch (error) {
    console.error("Failed to fetch current user:", error);
  }
  const { listingId } = await params;
  return (
    <ClientOnly>
      <ListingDetail
        currentUser={currentUser}
        params={{listingId}}
      />
    </ClientOnly>
  );
}