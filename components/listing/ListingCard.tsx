"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { HeartButton } from "../HeartButton";
import { safeListing, safeReservation } from "@/types";

type Props = {
  data: safeListing;
  reservation?: safeReservation;
}

export const ListingCard = ({
  data,
  reservation,
}: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1}}
      transition={{ 
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01]
      }}
      className="col-span-1 cursor-ponter group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image 
            priority
            fill
            alt="listing"
            src={data.imageSrc}
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div> 
            <HeartButton />
          </div>
        </div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </motion.div>

  )
}