export const dynamic = "force-dynamic";
import { ClientOnly } from "@/components/ClientOnly";
import { ListingPage } from "@/components/listing/ListingPage";
import { IListingsParams } from "@/lib/store/modules/listing";
import { AppProvider } from "./AppProvider";
import getCurrentUser from "./actions/getCurrentUser";

type Props = {
  searchParams: IListingsParams;
}

export default async function Home({ searchParams }: any ) {
  let currentUser = null;
  try {
    currentUser = await getCurrentUser();
  } catch (error) {
    console.error("Failed to fetch current user:", error);
  }
  const parsedSearchParams = await searchParams || {};
  return (
    <ClientOnly>
      <AppProvider>
        <ListingPage 
          searchParams={parsedSearchParams}
          currentUser={currentUser}
        />
      </AppProvider>
    </ClientOnly>
  );
}
