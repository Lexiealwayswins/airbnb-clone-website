"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {};

export const Logo = ({}: Props ) => {
  // const router = useRouter();
  const router = useRouter(); 

  return (
    <div onClick={() => router.push('/')}>
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