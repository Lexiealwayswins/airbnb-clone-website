"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Image from "next/image";

type Props = {};
export const UserMenu = ({}: Props) => {
  return (
    <div className="">
      <div className="flex flex-row items-center gap-3">
        <div className="px-4 py-3 rounded-full font-semibold text-sm hover:bg-neutral-100 transition cursor-pointer hidden md:block">
          Airbnb your Home
        </div>
        <div className="flex flex-row items-center gap-3 border-[1px] rounded-full p-4 md:py-1 md:px-2 cursor-pointer hover:shadow-md transition">
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Image 
              className="rounded-full"
              alt="Avatar"
              src="/assets/avatar.jpg"
              height={30}
              width={30}
            />
          </div>
        </div>
      </div>
    </div>
  );
};