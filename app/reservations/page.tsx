export const dynamic = "force-dynamic";
import { ClientOnly } from "@/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { ReservationPage } from "@/components/listing/ReservationPage";

type Props = {};

export default async function ReservationsPage ({}: Props) {
  let currentUser = null;
  try {
    currentUser = await getCurrentUser();
  } catch (error) {
    console.error("Failed to fetch current user:", error);

  }
  return (
    <ClientOnly>
      <ReservationPage 
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}