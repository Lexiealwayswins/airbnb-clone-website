"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Image from "next/image";
import { useCallback, useState } from "react";
import { MenuItem } from "./MenuItem";
import useLoginModal from "@/hook/useLoginModal";
import useRegisterModal from "@/hook/useRegisterModal";
import { safeUser } from "@/types";
import { Avatar } from "../Avatar";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import useRentModal from "@/hook/useRentModal";

type Props = {
  currentUser?: safeUser | null;
};
export const UserMenu = ({ currentUser }: Props) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    };

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div 
          onClick={onRent}
          className="px-4 py-3 rounded-full font-semibold text-sm hover:bg-neutral-100 transition cursor-pointer hidden md:block">
          Airbnb your Home
        </div>
        <div 
          onClick={toggleOpen}
          className="flex flex-row items-center gap-3 border-[1px] rounded-full p-4 md:py-1 md:px-2 cursor-pointer hover:shadow-md transition">
          <AiOutlineMenu />
          <div className="hidden md:block">
            { currentUser? (
              <Avatar
                src={currentUser?.image!} 
                userName={currentUser?.name}
              />) : (
                <Image 
                  className="rounded-full"
                  alt="Avatar"
                  src="/assets/avatar.jpg"
                  height={30}
                  width={30}
                />
              )
            }
          </div>
        </div>
      </div>

      {isOpen && (
        <div 
          onMouseLeave={toggleOpen}
          className="absolute right-0 top-13 flex flex-col p-4 bg-white w-[30vw] md:w-4/5 shadow-md rounded-xl overflow-hidden text-sm"
        >
          { currentUser ? (
            <>
              <MenuItem 
                onClick={() => router.push("/trips")}
                label="My trips"
              />
              <MenuItem 
                onClick={() => router.push("/favorites")}
                label="My favorites"
              />            
              <MenuItem 
                onClick={() => router.push("/reservations")}
                label="My reservations"
              />
              <MenuItem 
                onClick={() => router.push("/properties")}
                label="My properties"
              />
              <MenuItem 
                onClick={onRent}
                label="Airbnb your home"
              />
              <hr />
              <MenuItem
                onClick={() => signOut()}
                label="Log out"
              />
            </>
          ) : (
            <>
              <MenuItem 
                onClick={loginModal.onOpen}
                label="Login"
              />
              <MenuItem 
                onClick={registerModal.onOpen}
                label="Register"
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};