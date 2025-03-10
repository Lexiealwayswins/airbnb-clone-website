"use client";

import { ClientOnly } from "@/components/ClientOnly";

import { EmptyList } from "@/components/listing/EmptyList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import { getFavorites } from "@/lib/store/modules/listing";
import { safeUser } from "@/types";
import { FavoriteListing } from "./FavoriteListing";
import Loader from "../Loader";

type Props = {
  currentUser?: safeUser | null;
};

export const FavoritePage = ({ currentUser }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.listing.safeListings) || [];
  // const currentUser = await getCurrentUser();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const res = await dispatch(getFavorites());
      setLoading(false);
    };
    fetchFavorites();
    
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

  if (!favorites || !Array.isArray(favorites) ||favorites.length === 0) {
    return (
      <ClientOnly>
        <EmptyList title="No favorites found" subtitle="Looks like you have no favorite listings."/>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoriteListing 
        favorites={favorites}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};