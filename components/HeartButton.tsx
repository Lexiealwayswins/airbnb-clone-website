"use client";

import { div } from "framer-motion/client";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

type Props = {

}

export const HeartButton = ({}: Props) => {
  return (
    <div>
      <AiOutlineHeart />
      <AiFillHeart />
    </div>
  )
}