"use client";

import { Button } from "../Button";
import { DateSelect } from "../inputs/DateSelect";
import { Range, RangeKeyDict } from "react-date-range";

type Props = {
  price: number,
  dateRange: Range,
  onChangeDate: (value:RangeKeyDict) => void,
  disabledDates?: Date[]
  months: number,
  disabled: boolean,
  onSubmit: () => void,
  totalPrice: number
}

export const ListingReservation = ({
  price,
  dateRange,
  onChangeDate,
  disabledDates,
  months,
  disabled,
  onSubmit,
  totalPrice
}: Props) => {
  return (
    <div className="border-[1px] border-neutral-200 overflow-hidden rounded-xl bg-white">
      <div className="flex flex-row gap-1 items-center p-4">
        <p className="flex gap-1 text-2xl font-semibold">
          $ {price}<span className="font-light text-neutral-600">night</span>
        </p>
      </div>
      <hr />
      <DateSelect 
        value={dateRange}
        onChange={onChangeDate}
        disabledDates={disabledDates}
        months={months}
      />
      <hr />
      <div className="">
        <Button disabled={disabled} label="Reserve" onClick={() => onSubmit} />
      </div>
      <hr />
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <p>Total</p>
        <p>$ {totalPrice}</p>
      </div>
    </div>
  );
};