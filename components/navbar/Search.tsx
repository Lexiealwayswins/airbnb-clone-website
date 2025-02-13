"use client";

import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import "@/style/search.css";

type Props = {}
export const Search = ({}: Props) => {

  const [showFilter, setShowFilter] = useState(false)

  const handleClick = () => {
    setShowFilter(true);
  }
  return (
    <div>
      <div className={showFilter ? 'hidden' : 'block'}>
        <div 
          className="border-[1px] w-full md:w-auto rounded-full py-2 shadow-sm hover:shadow-md transition cursor-pointer"
          onClick={handleClick}
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
      </div>
      <div className={showFilter ? 'block' : 'hidden'}>
        <div 
            className="border-[1px] w-full md:w-auto rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
        >
          <div className="flex flex-row items-center justify-between text-center">
            <div className="left px-8 hover:bg-neutral-200 group h-full hover:rounded-full hover:py-2 border-r-[1px]">
              <div className="font-semibold text-sm text-left group-hover:bg-neutral-200">
                Where
              </div>
              <input 
                type="text" 
                placeholder="Search destinations"
                className="group-hover:bg-neutral-200
                focus: outline-none"
              />
            </div>
            <div className="mid flex-1 px-6 py-2 hover:bg-neutral-200 group h-full hover:rounded-full">
              <div className="font-semibold text-sm text-left hidden sm:block group-hover:bg-neutral-200">
                Check in/out
              </div>
              <input 
                type="text" 
                placeholder="Add dates"
                className="group-hover:bg-neutral-200 focus: outline-none"
              />
            </div>
            <div className="right flex flex-row items-center gap-3 pl-6 pr-2 hover:py-2 text-gray-600 hover:bg-neutral-200 group h-full hover:rounded-full border-l-[1px]">
              <div className="text-left hidden sm:block">
                <div className="font-semibold text-sm text-left hidden sm:block group-hover:bg-neutral-200">
                  Who
                </div>
                <input 
                  type="text" 
                  placeholder="Add guests"
                  className="group-hover:bg-neutral-200 focus: outline-none"
                />
              </div>
              <div className="p-2 bg-rose-500 rounded-full text-white">
                <BiSearch size={18} />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  )
}