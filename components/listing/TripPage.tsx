"use client";

import { ClientOnly } from "@/components/ClientOnly";

import { EmptyList } from "@/components/listing/EmptyList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import { safeUser } from "@/types";
import { getReservations } from "@/lib/store/modules/reservation";
import { TripListing } from "./TripListing";
import Loader from "../Loader";

type Props = {
  currentUser?: safeUser | null;
};

export const TripPage = ({ currentUser }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const trips = useSelector((state: RootState) => state.reservation.safeReservations) || [];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      const res = await dispatch(getReservations({
        userId: currentUser?.id
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

  if (!trips || !Array.isArray(trips) || trips.length === 0) {
    return (
      <ClientOnly>
        <EmptyList title="No trips found" subtitle="Looks like you have no reserved Trips listings."/>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripListing 
        trips={trips}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};