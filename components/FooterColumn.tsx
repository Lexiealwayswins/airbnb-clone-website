"use client";
import { motion } from "framer-motion";

type Props = {
  index: number;
  data: Array<string>;
}

export const FooterColumn = ({index, data}: Props) => {
  return (
    <motion.div
      initial={{ 
        x: index % 2 === 0 ? -200 : 200, 
        opacity: 0,
      }}
      transition = {{ duration: 1}}
      whileInView={{ opacity: 1, x: 0 }}
      className="space-y-4 text-xs text-gray-800"
    >
      {
        data.map((item, index) => (
          index === 0 ? <h5 key={index} className="font-bold">{item}</h5> : <p key={index}>{item}</p>
        ))
      }
    </motion.div>
  );
};