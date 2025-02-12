"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

type Props = {

}

export const HeartButton = ({}: Props) => {
  return (
    <div
      className="relative cursor-pointer :hover:opacity-80 transition"
    >
      <AiOutlineHeart 
        size={28}
        className="absolute fill-white -top-[2px] -right-[2px]"
      />
      <AiFillHeart 
        size={24}
        className="fill-neutral-500/70"
      />
    </div>
  )
}