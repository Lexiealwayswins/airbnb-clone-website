"use client";

import { ClientOnly } from "@/components/ClientOnly";

import { EmptyList } from "@/components/listing/EmptyList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import { getProperties } from "@/lib/store/modules/listing";
import { PropertyListing } from "@/components/listing/PropertyListing";
import { safeUser } from "@/types";

type Props = {
  currentUser?: safeUser | null;
};

export const TripPage = ({ currentUser }: Props) => {
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyList title="Unauthorized" subtitle="Please login"/>
      </ClientOnly>
    )
  }
  
  const dispatch = useDispatch<AppDispatch>();
  const trips = useSelector((state: RootState) => state.reservation.safeReservations) || [];
  // const currentUser = await getCurrentUser();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      const res = await dispatch(getProperties());
      console.log("Fetched Properties:", res);
      setLoading(false);
    };
    fetchProperties();
    
  }, [dispatch, currentUser]);

  if (loading) {
    console.log("loading");
    return <div>Loading...</div>; // 或者展示一个loading组件
  }

  if (!properties || !Array.isArray(properties) ||properties.length === 0) {
    return (
      <ClientOnly>
        <EmptyList title="No properties found" subtitle="Looks like you have no properties listings."/>
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <PropertyListing 
        properties={properties}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}