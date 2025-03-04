"use client";

import { ClientOnly } from "@/components/ClientOnly";
import { Container } from "@/components/Container";
import { ListingCard } from "@/components/listing/ListingCard";
import { getListings, IListingsParams } from "@/lib/store/modules/listing";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import { EmptyList } from "@/components/listing/EmptyList";
import { safeUser } from "@/types";
import Loader from "../Loader";

type Props = {
  searchParams: IListingsParams;
  currentUser?: safeUser | null;
}

export const ListingPage = ({searchParams, currentUser }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const listing = useSelector((state: RootState) => state.listing.safeListings) || [];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      await dispatch(getListings(searchParams));
      setLoading(false);
    };
    fetchListings();
    
  }, [dispatch, searchParams]);

  if (loading) {
    return (
      <Loader />
    ); 
  }

  if (!listing || !Array.isArray(listing) ||listing.length === 0) {
    // console.log("No listings, showing EmptyList");
    return (
      <ClientOnly>
        <EmptyList showReset={true}/>
      </ClientOnly>
    );
  }
  // console.log("ListingPage rendered");
  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-8 overflow-x-hidden">
          {listing.map((item) => (
            <ListingCard 
              key={item.id}
              data={item}
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
};