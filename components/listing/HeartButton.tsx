"use client";

import { useFavorite } from "@/hook/useFavorite";
import { safeUser } from "@/types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

type Props = {
  listingId: string;
  currentUser?: safeUser | null;
}

export const HeartButton = ({ listingId, currentUser }: Props) => {
  const { hasFavorite, toggleFavorite } = useFavorite({
    listingId,
    currentUser
  });
  return (
    <div
      onClick={toggleFavorite}
      className="relative cursor-pointer hover:opacity-80 transition"
    >
      <AiOutlineHeart 
        size={28}
        className="absolute fill-white -top-[2px] -right-[2px]"
      />
      <AiFillHeart 
        size={24}
        className={hasFavorite ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};