"use client";

import { Heading } from "@/components/Heading";
import { Container } from "@/components/Container";
import { safeReservation, safeUser } from "@/types";
import { ListingCard } from "@/components/listing/ListingCard";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { delReservations } from "@/lib/store/modules/reservation";
import { AppDispatch } from "@/lib/store";

type Props = {
  reservations: safeReservation[];
  currentUser?: safeUser | null;
}

export const ReservationListing = ({reservations, currentUser}: Props) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [deletingId, setDeletingId] = useState("");

  const onDelete = useCallback((id: string) => {
    setDeletingId(id);
    dispatch(delReservations({
      reservationId: id
    }));
    router.refresh();
  }, [dispatch, router]);

  return (
    <Container>
      <Heading 
        title="Reservations"
        subtitle="Manage your resercations!"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-colds-4 xl:grid-cols-4 2xl:grid-cols-5 gap-8 mt-10">
        {reservations.map((item: any) => (
          <ListingCard
            reservation={item}
            data={item.listing}
            currentUser={currentUser}
            key={item.id}
            onAction={onDelete}
            actionLabel="Cancel guest eservations"
            disabled={deletingId === item.id}
            actionId={item.id}
          />
        ))}
      </div>
    </Container>
  );
};