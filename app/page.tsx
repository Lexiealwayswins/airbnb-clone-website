import { ClientOnly } from "@/components/ClientOnly";
import { ListingPage } from "@/components/listing/ListingPage";
import { IListingsParams } from "@/lib/store/modules/listing";
import { div } from "framer-motion/client";
import { AppProvider } from "./AppProvider";

type Props = {
  searchParams: IListingsParams;
}

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;  
  return (
    <ClientOnly>
      <AppProvider>
        <ListingPage searchParams={params}/>
      </AppProvider>
    </ClientOnly>

  );
}
