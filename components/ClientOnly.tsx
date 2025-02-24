"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
}

export const ClientOnly = ({ children }: Props) => {

  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    // console.log("ClientOnly mounted");
    setHasMounted(true);
  }, [])

  if (!hasMounted) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }} // 0.8 秒内渐变
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
    // <div>{children}</div>
  )
}