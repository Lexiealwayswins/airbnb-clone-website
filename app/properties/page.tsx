import { ClientOnly } from "@/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { PropertyPage } from "@/components/listing/PropertyPage";
import { AppProvider } from "../AppProvider";

type Props = {};

export default async function PropertiesPage ({}: Props) {
  const currentUser = await getCurrentUser();
  return (
    <ClientOnly>
      <AppProvider>
        <PropertyPage 
          currentUser={currentUser}
        />
      </AppProvider>
    </ClientOnly>
  )
}