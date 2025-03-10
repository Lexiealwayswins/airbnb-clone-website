"use client";

import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { Filter } from "./Filter";
import { useSearchParams } from "next/navigation";
import useFilter from "@/hook/useFilter";

type Props = {}
export const Search = ({}: Props) => {
  const filter = useFilter();

  return (
    <div>
      { filter.isOpen ? (
        <Filter />
      ) : (
        <div 
        className="border-[1px] w-full md:w-auto rounded-full py-2 shadow-sm hover:shadow-md transition cursor-pointer"
        onClick={filter.onOpen}
        >
          <div className="flex flex-row items-center justify-between text-center">
            <div className="px-6 font-semibold text-sm hover:text-lg">Anywhere</div>
            <div className="flex-1 px-6 border-x-[1px] font-semibold hidden sm:block text-sm hover:text-lg">AnyWeek</div>
            <div className="flex flex-row items-center gap-3 pl-6 pr-2 text-gray-600 text-sm hover:text-lg">
              <div className="hidden sm:block">
                Add Guests
              </div>
              <div className="p-2 bg-rose-500 rounded-full text-white">
                <BiSearch size={18} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};