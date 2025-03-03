export const dynamic = "force-dynamic";
import { ClientOnly } from "@/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { PropertyPage } from "@/components/listing/PropertyPage";
import { AppProvider } from "../AppProvider";

type Props = {};

export default async function PropertiesPage ({}: Props) {
  let currentUser = null;
  try {
    currentUser = await getCurrentUser();
  } catch (error) {
    console.error("Failed to fetch current user:", error);
  }
  return (
    <ClientOnly>
      <AppProvider>
        <PropertyPage 
          currentUser={currentUser}
        />
      </AppProvider>
    </ClientOnly>
  );
}