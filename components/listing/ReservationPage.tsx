"use client";

import { ClientOnly } from "@/components/ClientOnly";

import { EmptyList } from "@/components/listing/EmptyList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import { safeUser } from "@/types";
import { getReservations } from "@/lib/store/modules/reservation";
import { ReservationListing } from "./ReservationListing";
import Loader from "../Loader";

type Props = {
  currentUser?: safeUser | null;
};

export const ReservationPage = ({ currentUser }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const reservations = useSelector((state: RootState) => state.reservation.safeReservations) || [];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      const res = await dispatch(getReservations({
        authorId: currentUser?.id
      }));
      setLoading(false);
    };
    fetchTrips();
    
  }, [dispatch, currentUser]);

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyList title="Unauthorized" subtitle="Please login"/>
      </ClientOnly>
    );
  }

  if (loading) {
    return (
      <Loader/>
    );
  }

  if (!reservations || !Array.isArray(reservations) || reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyList title="No reservations found" subtitle="Looks like your properties have no reservations listings."/>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReservationListing 
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};