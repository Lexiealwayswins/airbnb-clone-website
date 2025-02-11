"use client";

import { motion } from "framer-motion";
import { Heading } from "./Heading";
import { Button } from "./Button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


type Props = {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

export const EmptyList = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters.",
  showReset,
}: Props) => {
  const router = useRouter(); 
  const [hasMounted, setHasMounted] = useState(false);
  

  useEffect(() => {
    setHasMounted(true);
    console.log("EmptyList mounted1");
    
    return () => {
      console.log("EmptyList unmounted2");
    };
  }, []);

  if (!hasMounted) {
    return null; // 确保只在客户端渲染时渲染
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="flex flex-col gap-2 justify-center items-center h-[60vh]"
    >
      <Heading center title={title} subtitle={subtitle} />
      <div className="w-48 mt-4">
        {showReset && (
          <Button 
            outline
            label="Remove all filters"
            onClick={() => router.push('/')}
          />
        )}
      </div>
    </motion.div>
  )
}