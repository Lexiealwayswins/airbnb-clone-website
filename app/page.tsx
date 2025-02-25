import { ClientOnly } from "@/components/ClientOnly";
import { ListingPage } from "@/components/listing/ListingPage";
import { IListingsParams } from "@/lib/store/modules/listing";
import { div } from "framer-motion/client";
import { AppProvider } from "./AppProvider";
import getCurrentUser from "./actions/getCurrentUser";

type Props = {
  searchParams: IListingsParams;
}

export default async function Home({ searchParams }: any ) {
  const currentUser = await getCurrentUser();
  const parsedSearchParams = searchParams && await searchParams;
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
