"use client";

import { DateRange, Range, RangeKeyDict } from "react-date-range";

import "@/style/DateSelect.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

type Props = {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
}
export const DateSelect = ({ value, onChange, disabledDates}: Props) => {
  return(
    <div className="bg-white">
      <DateRange 
        onChange={onChange}
        ranges={[value]}
        rangeColors={["#262626"]}
        date={new Date()}
        showDateDisplay={false}
        months={2}
        direction="horizontal"
        minDate={new Date()}
        className="custom-date-range"
      />
    </div>
  )
}