"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

type Props = {
  onChange: (value: string) => void;
  value: string;
}

export const ImageUpload = ({ onChange, value }: Props) => {
  const handleCallback = useCallback((result: any) => {
    console.log("Cloudinary 上传返回的结果:", result);

    if (result.event === "success") {
      const imageUrl = result.info.secure_url;
      console.log("图片 URL:", imageUrl);
      onChange(imageUrl);
    } else {
      console.error("Cloudinary 上传失败:", result);
    }
  }, [onChange])
  return (
    <CldUploadWidget
      onSuccess={handleCallback}
      uploadPreset="lululala666"
      options={{
        maxFiles: 1,
        cloudName: "dyycmwk8h",
      }}
    >
      {({open}) => {
        console.log("Cloudinary upload widget ready", open); 
        return (
          <div
            onClick={() => open?.()}
            className="relative flex flex-col justify-center items-center gap-4 p-20 border-2 border-dashed border-neutral-300 text-neutral-600 cursor-pointer hover:opacity-70 transition"
          >
            <TbPhotoPlus size={50}/>
            <div className="font-semibold text-lg">Click to upload</div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image 
                  alt="upload"
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                />
              </div>
            )}
          </div>
        )
      }}
    </CldUploadWidget>
  )
}