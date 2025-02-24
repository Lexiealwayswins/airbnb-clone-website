"use client";

import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { CountrySelect, CountrySelectValue } from "../inputs/CountrySelect";
import { DateSelect } from "../inputs/DateSelect";
import { Range, RangeKeyDict } from "react-date-range";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { formatISO } from "date-fns";
import { GuestRoomSelect } from "../inputs/GuestRoomSelect";
import dayjs from 'dayjs';


type Props = {}
export const Filter = ({}: Props) => {
  const router = useRouter();
  const params = useSearchParams();

  const [location, setLocation] = useState<CountrySelectValue>();
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);

  let currentQuery = {};

  if (params) {
    currentQuery = qs.parse(params.toString());
  }

  const [showSelectedDate, setShowSelectedDate] = useState<string>("");

  const handleShowSelectedDate = (ranges: RangeKeyDict) => {
    const selection = ranges.selection;
    setDateRange(selection);
    setShowSelectedDate(`${dayjs(selection.startDate).format('MMM DD')} - ${dayjs(selection.endDate).format('MMM DD')}`)
  }

  const updatedQuery: any = {
    ...currentQuery,
    locationValue: location?.value,
    guestCount,
    roomCount,
    bathroomCount,
  };

  if (dateRange.startDate) {
    updatedQuery.startDate = formatISO(dateRange.startDate)
  }
  if (dateRange.endDate) {
    updatedQuery.endDate = formatISO(dateRange.endDate)
  }

  const url = qs.stringifyUrl(
    {
      url: '/',
      query: updatedQuery,
    },
    { skipNull: true }
  )

  const [showSelectedGuest, setShowSelectedGuest] = useState<string>("");
  
  const [showGuest, setShowGuest] = useState(false);
  const handleShowGuest = () => {
    setShowGuest(true);
  }
  const handleHideGuest = () => {
    setShowGuest(false);
    setShowSelectedGuest(`${guestCount} Guests`)
  }

  const [showDateRange, setShowDateRange] = useState(false);
  const handleShowDateRange = () => {
    setShowDateRange(true);
  }
  const handleHideDateRange = () => {
    setShowDateRange(false);
  }

  const [showLBg, setShowLBg] = useState(false)
  const handleLMouseEnter = () => {
    setShowLBg(true);
  }
  const handleLMouseLeave = () => {
    setShowLBg(false);
  }
  const [showRBg, setShowRBg] = useState(false)
  const handleRMouseEnter = () => {
    setShowRBg(true);
  }
  const handleRMouseLeave = () => {
    setShowRBg(false);
  }

  return (
    <div 
      className="border-[1px] w-full md:w-auto rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between text-center">          
        <div 
          onMouseEnter={handleLMouseEnter}
          onMouseLeave={handleLMouseLeave}
          className="left px-8 hover:bg-neutral-200 h-full hover:rounded-full py-2">
          <div className="font-semibold text-sm text-left hover:bg-neutral-200">
            Where
          </div>
          <CountrySelect 
            value={location}
            onChange={(value) => setLocation(value as CountrySelectValue)}
          />
        </div>
        <div className={`mid flex-1 px-6 hover:bg-neutral-200 group h-full hover:rounded-full hover:py-2 
          ${showLBg && !showRBg ? "border-r-[1px]" : "border-l-[1px]"}
          ${showRBg && !showLBg ? "border-l-[1px]" : "border-r-[1px]"}
        `}>
          <div className="font-semibold text-sm text-left hidden sm:block group-hover:bg-neutral-200">
            Check in / out
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Add dates"
              className="group-hover:bg-neutral-200 focus: outline-none"
              onFocus={handleShowDateRange}
              value={showSelectedDate}
              style={{               color:"#9CA3AF",
              fontWeight: "300"
              }}
              readOnly
            />
            <div 
              onMouseLeave={handleHideDateRange}
              className={`absolute top-[40px] -left-[250px] border-[1px] shadow-lg rounded-lg p-5 bg-white
             ${showDateRange ? 'block' : 'hidden'}
            `}>
              <DateSelect 
                onChange={handleShowSelectedDate}
                value={dateRange}
              />
            </div>
          </div>
        </div>
        <div 
          onMouseEnter={handleRMouseEnter}
          onMouseLeave={handleRMouseLeave}
          className="right flex flex-row items-center gap-3 pl-6 pr-2 py-2 text-gray-600 hover:bg-neutral-200 group h-full hover:rounded-full">
          <div className="text-left hidden sm:block">
            <div className="font-semibold text-sm text-left hidden sm:block group-hover:bg-neutral-200">
              Who
            </div>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Add guests"
                className="group-hover:bg-neutral-200 focus: outline-none"
                onFocus={handleShowGuest}
                value={showSelectedGuest}
                style={{               color:"#9CA3AF",
                  fontWeight: "300"
                }}
                readOnly
              />
              <div 
                onMouseLeave={handleHideGuest}
                className={`absolute top-[40px] -left-[270px] w-[450px] border-[1px] shadow-lg rounded-lg p-5 bg-white
               ${showGuest ? 'block' : 'hidden'}
              `}>
                <GuestRoomSelect 
                  title="Guests"
                  subtitle="How many guests are comming?"
                  value={guestCount}
                  onChange={(value) => setGuestCount(value)}
                />
                <hr />
                <GuestRoomSelect 
                  title="Rooms"
                  subtitle="How many rooms do you need?"
                  value={roomCount}
                  onChange={(value) => setRoomCount(value)}
                />
                <hr />
                <GuestRoomSelect 
                  title="Bathrooms"
                  subtitle="How many bathrooms do you need"
                  value={bathroomCount}
                  onChange={(value) => setBathroomCount(value)}
                />
              </div>
            </div>
          </div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch 
              size={18} 
              onClick={() => router.push(url)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}