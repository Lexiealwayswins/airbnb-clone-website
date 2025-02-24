import { ClientOnly } from "@/components/ClientOnly";
import { ListingPage } from "@/components/listing/ListingPage";
import { IListingsParams } from "@/lib/store/modules/listing";
import { div } from "framer-motion/client";
import { AppProvider } from "./AppProvider";
import getCurrentUser from "./actions/getCurrentUser";

type Props = {
  searchParams: IListingsParams;
}

export default async function Home({ searchParams }: Props) {
  const currentUser = await getCurrentUser();
  return (
    <ClientOnly>
      <AppProvider>
        <ListingPage 
          searchParams={searchParams}
          currentUser={currentUser}
        />
      </AppProvider>
    </ClientOnly>

  );
}
