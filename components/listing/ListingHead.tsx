"use client";

import { safeUser } from "@/types";
import { Heading } from "../Heading";
import { useCountries } from "@/hook/useCountries";
import { motion } from "framer-motion";
import Image from "next/image";
import { HeartButton } from "./HeartButton";

type Props = {
  title: string,
  imageSrc: string,
  locationValue: string,
  id: string,
  currentUser?: safeUser | null
}

export const ListingHead = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser,
}: Props) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);
  console.log("看看image",imageSrc);
  return (
    <div className="flex flex-col gap-5">
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <motion.div
        initial={{ opacity:0, scale: 0.5 }}
        animate={{ opacity:1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease:[0, 0.71, 0.2, 1.01]
        }}
        className="relative w-full h-[60vh] overflow-hidden rounded-xl "
      >
        <Image 
          src={imageSrc}
          alt="image"
          fill
          className="w-full object-cover"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </motion.div>
    </div>
  );
};