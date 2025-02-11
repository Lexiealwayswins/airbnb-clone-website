"use client";

import { BiSearch } from "react-icons/bi";

type Props = {}
export const Search = ({}: Props) => {
  return (
    <div className="border-[1px] w-full md:w-auto rounded-full py-2 shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="flex flex-row items-center justify-between text-center">
        <div className="px-6 text-sm font-semibold">Anywhere</div>
        <div className="flex-1 px-6 border-x-[1px] font-semibold hidden sm:block">AnyWeek</div>
        <div className="flex flex-row items-center gap-3 pl-6 pr-2 text-sm text-gray-600">
          <div className="hidden sm:block">
            Add Guests
          </div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  )
}