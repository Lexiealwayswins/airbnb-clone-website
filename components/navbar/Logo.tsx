"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import useFilter from "@/hook/useFilter";

type Props = {};

export const Logo = ({}: Props ) => {
  // const router = useRouter();
  const router = useRouter(); 
  const filter = useFilter();
  const handleClick = () => {
    router.push('/');
    filter.onClose();
  }

  return (
    <div onClick={handleClick}>
      <Image 
        alt="logo"
        className="cursor-pointer hidden md:block"
        height={100}
        width={100}
        src="/assets/logo.png"
      />
    </div>
  );
};