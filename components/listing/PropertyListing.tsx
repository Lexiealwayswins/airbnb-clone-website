"use client";

import { Heading } from "@/components/Heading";
import { Container } from "@/components/Container";
import { safeListing, safeUser } from "@/types";
import { ListingCard } from "@/components/listing/ListingCard";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { delProperties } from "@/lib/store/modules/listing";

type Props = {
  properties: safeListing[];
  currentUser?: safeUser | null;
}

export const PropertyListing = ({properties, currentUser}: Props) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [deletingId, setDeletingId] = useState("");

  const onDelete = useCallback((id: string) => {
    setDeletingId(id);
    dispatch(delProperties({
      listingId: id
    }))
    router.refresh();
  }, [dispatch, router]);

  return (
    <Container>
      <Heading 
        title="Properties"
        subtitle="List of your properties!"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-colds-4 xl:grid-cols-4 2xl:grid-cols-5 gap-8 mt-10">
        {properties.map((item: any) => (
          <ListingCard
            data={item}
            currentUser={currentUser}
            key={item.id}
            onAction={onDelete}
            actionLabel="Delete property"
            disabled={deletingId === item.id}
            actionId={item.id}
          />
        ))}
      </div>
    </Container>
  );
};