"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Image from "next/image";
import { useCallback, useState } from "react";
import { MenuItem } from "./MenuItem";
import useLoginModal from "@/hook/useLoginModal";
import useRegisterModal from "@/hook/useRegisterModal";

type Props = {};
export const UserMenu = ({}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div className="px-4 py-3 rounded-full font-semibold text-sm hover:bg-neutral-100 transition cursor-pointer hidden md:block">
          Airbnb your Home
        </div>
        <div 
          onClick={toggleOpen}
          className="flex flex-row items-center gap-3 border-[1px] rounded-full p-4 md:py-1 md:px-2 cursor-pointer hover:shadow-md transition">
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

      {isOpen && (
        <div 
          onMouseLeave={toggleOpen}
          className="absolute right-0 top-13 flex flex-col p-4 bg-white w-[20vw]  md:w-3/4 shadow-md rounded-xl overflow-hidden text-sm">
          <MenuItem 
            onClick={loginModal.onOpen}
            label="Login"
          />
          <MenuItem 
            onClick={registerModal.onOpen}
            label="Register"
          />
        </div>
      )}
    </div>
  );
};