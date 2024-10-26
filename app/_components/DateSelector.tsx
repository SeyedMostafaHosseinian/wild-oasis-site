"use client";

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";

function isAlreadyBooked(range: { from: Date; to: Date }, datesArr: Date[]) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({
  cabin,
  settings,
  bookedDates,
}: {
  cabin: Record<string, any>;
  settings: Record<string, any>;
  bookedDates: Date[];
}) {
  const { range, updateRange, resetRange } = useReservation();
  const { regularPrice, discount } = cabin;
  const { minBookingLength, maxBookingLength } = settings;

  const numNights = differenceInDays(range.to as Date, range.from as Date);
  /**
   * if user select a range in cabin-2 (for example) and not complete reserve and
   * navigate to another page, we most check current selected range is valid
   * for cabin-1 based on bookedDates
   **/
  const checkedRangeForReserved = isAlreadyBooked(
    { from: range.from as Date, to: range.to as Date },
    bookedDates
  )
    ? { from: undefined, to: undefined }
    : range;

  return (
    <div className="flex flex-col justify-between border border-primary-800">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        onSelect={updateRange}
        selected={checkedRangeForReserved}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(curDate) =>
          isPast(curDate) || bookedDates.some((d) => isSameDay(d, curDate))
        }
      />
      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights &&
          /**
           * this to additional conditions is for case that
           * a user is selected range from another cabins and current range is not valid for available days for booking for this cabin
           **/
          checkedRangeForReserved.from &&
          checkedRangeForReserved.to ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">
                  ${(regularPrice - discount) * numNights}
                </span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
