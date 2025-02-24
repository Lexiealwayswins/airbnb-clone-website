import { safeUser } from "@/types";
import useLoginModal from "./useLoginModal";
import { useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {
  listingId: string;
  currentUser?: safeUser | null;
}

export const useFavorite = ({ listingId, currentUser }: Props) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const hasFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId])

  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (hasFavorite) {
        request = () => axios.delete(`/api/favorites/${listingId}`);
      } else {
        request = () => axios.post(`/api/favorites/${listingId}`);
      }

      await request();
      router.refresh();
      toast.success("Success");

    } catch (error: any) {
      toast.error("Something Went Wrong");
    }

  }, [currentUser, hasFavorite, listingId, loginModal])

  return {
    hasFavorite,
    toggleFavorite
  }
}