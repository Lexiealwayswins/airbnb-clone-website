"use client";

import { ClientOnly } from "@/components/ClientOnly";

import { EmptyList } from "@/components/listing/EmptyList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import { getProperties } from "@/lib/store/modules/listing";
import { PropertyListing } from "@/components/listing/PropertyListing";
import { safeUser } from "@/types";
import Loader from "../Loader";

type Props = {
  currentUser?: safeUser | null;
};

export const PropertyPage = ({ currentUser }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const properties = useSelector((state: RootState) => state.listing.safeListings) || [];
  // const currentUser = await getCurrentUser();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      const res = await dispatch(getProperties());
      setLoading(false);
    };
    fetchProperties();
    
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
      <Loader />
    );
  }

  if (!properties || !Array.isArray(properties) ||properties.length === 0) {
    return (
      <ClientOnly>
        <EmptyList title="No properties found" subtitle="Looks like you have no properties listings."/>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertyListing 
        properties={properties}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};