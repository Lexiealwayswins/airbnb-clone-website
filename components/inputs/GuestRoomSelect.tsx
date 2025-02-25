"use client";

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

type Props = {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}
export const GuestRoomSelect = ({ title, subtitle, value, onChange }: Props) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [value, onChange]);
  
  const onReduce = useCallback(() => {
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  }, [value, onChange]);

  return (
    <div className="flex flex-row justify-between p-4">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-400">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div 
          onClick={onReduce}
          className="w-10 h-10 border-[1px] border-neutral-400 rounded-full items-center flex justify-center cursor-pointer text-neutral-600">
          <AiOutlineMinus />
        </div>
        <div className="font-light text-xl text-neutral-600">
          {value}
        </div>
        <div 
          onClick={onAdd}
          className="w-10 h-10 border-[1px] border-neutral-400 rounded-full items-center flex justify-center cursor-pointer text-neutral-600">
          <AiOutlinePlus />
        </div>

      </div>
    </div>
  );
};