"use client";

import { Heading } from "@/components/Heading";
import { Container } from "@/components/Container";
import { safeListing, safeUser } from "@/types";
import { ListingCard } from "@/components/listing/ListingCard";

export const dynamic = "force-dynamic";

type Props = {
  favorites: safeListing[];
  currentUser?: safeUser | null;
}

export const FavoriteListing = ({favorites, currentUser}: Props) => {
  return (
    <Container>
      <Heading 
        title="Favorites"
        subtitle="List of your favorite places!"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
        {favorites.map((item) => (
          <ListingCard
            data={item}
            currentUser={currentUser}
            key={item.id}
          />
        ))}
      </div>
    </Container>
  );
};