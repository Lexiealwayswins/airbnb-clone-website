"use client";

import { DateRange, Range, RangeKeyDict } from "react-date-range";

import "@/style/DateSelect.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

type Props = {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
  months: number
}
export const DateSelect = ({ 
  value, 
  onChange, 
  disabledDates, 
  months
}: Props) => {
  return(
    <div className="bg-white">
      <DateRange 
        onChange={onChange}
        ranges={[value]}
        rangeColors={["#262626"]}
        date={new Date()}
        showDateDisplay={false}
        months={months}
        direction="horizontal"
        minDate={new Date()}
        className="items-center custom-date-range"
        disabledDates={disabledDates}
      />
    </div>
  )
}