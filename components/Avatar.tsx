"use client";

import Image from "next/image";

type Props = {
  src: string | null | undefined;
  userName?: string | null | undefined;
}

export const Avatar = ({ src, userName }: Props) => {
  return (
    <div>
      {src ? (
        <Image 
          src={src}
          alt="hasImage"
          height={30}
          width={30}
          className="rounded-full"
        />
      ) : userName ? (
        <Image 
          src={`http://ui-avatars.com/api/?name=${userName}&background=random&color=fff`}
          height={30}
          width={30}
          alt="nameImage"
          className="rounded-full"
        />
      ) : (
        <Image
          className="rounded-full"
          height="30"
          width="30"
          alt="noUser"
          src="/assets/avatar.png"
        />
      )}
    </div>
  );
};